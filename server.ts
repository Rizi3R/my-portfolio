import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createServer as createHttpServer } from 'node:http';

dotenv.config({ path: '.env.local' });
dotenv.config();

const PORT = Number(process.env.PORT || 3000);
const TOTAL_KEY = 'aries_portfolio:visitors:total';
const SEEN_PREFIX = 'aries_portfolio:visitors:seen:';
const RATE_LIMIT_PREFIX = 'aries_portfolio:visitors:rl:';
const DEDUP_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours
const DEDUP_TTL_SECONDS = 60 * 60 * 12;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_WINDOW_SECONDS = 60;
const POST_RATE_LIMIT_MAX = 10;
const GET_RATE_LIMIT_MAX = 30;
const REDIS_TIMEOUT_MS = 4000;
const MAX_CONTENT_LENGTH_BYTES = 1024;
const LOCAL_STORE_PATH = path.resolve(process.cwd(), '.data', 'visitor-counter.json');

interface LocalStore {
  count: number;
  seen: Record<string, number>;
}

const memoryRateLimiter = new Map<string, { count: number; resetAt: number }>();

function getRedisCredentials(): { url: string; token: string } | null {
  const url = (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '').trim();
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '').trim();
  if (!url || !token || !url.startsWith('https://')) {
    return null;
  }
  return { url: url.replace(/\/$/, ''), token };
}

async function runRedisCommand(
  creds: { url: string; token: string },
  command: (string | number)[]
): Promise<unknown> {
  const response = await fetch(creds.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${creds.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
    signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Redis REST status ${response.status}`);
  }

  const data = (await response.json()) as { result?: unknown; error?: string };
  if (data.error) {
    throw new Error('Redis command failed');
  }
  return data.result;
}

function getHashSalt(): string {
  return process.env.VISITOR_HASH_SALT || 'aries-razak-portfolio-salt';
}

function getClientIp(req: express.Request): string {
  const forwarded = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() || '';
  const realIp = (req.headers['x-real-ip'] as string | undefined)?.trim() || '';
  return forwarded || realIp || req.socket.remoteAddress || 'unknown';
}

function createHashedIp(ip: string): string {
  return createHash('sha256')
    .update(`${getHashSalt()}:rl:${ip}`)
    .digest('hex')
    .slice(0, 24);
}

function createVisitorFingerprint(req: express.Request): string {
  const ip = getClientIp(req);
  const ua = (req.headers['user-agent'] || '').slice(0, 200);
  const dayBucket = new Date().toISOString().slice(0, 10);

  return createHash('sha256')
    .update(`${getHashSalt()}:${ip}:${ua}:${dayBucket}`)
    .digest('hex')
    .slice(0, 32);
}

function isAllowedOrigin(req: express.Request): boolean {
  const secFetchSite = String(req.headers['sec-fetch-site'] || '').toLowerCase();
  if (secFetchSite === 'cross-site') {
    return false;
  }

  const origin = String(req.headers.origin || '').trim();
  if (!origin) {
    return true;
  }

  try {
    const parsedOrigin = new URL(origin);
    const originHost = parsedOrigin.hostname.toLowerCase();
    const requestHostHeader = String(req.headers.host || '').split(':')[0]?.toLowerCase() || '';

    if (requestHostHeader && originHost === requestHostHeader) {
      return true;
    }

    return (
      originHost === 'aries-razak.vercel.app' ||
      originHost === 'localhost' ||
      originHost === '127.0.0.1' ||
      originHost.endsWith('.run.app')
    );
  } catch {
    return false;
  }
}

function checkMemoryRateLimit(method: 'GET' | 'POST', ipHash: string): boolean {
  const now = Date.now();
  const key = `${method}:${ipHash}`;
  const maxRequests = method === 'POST' ? POST_RATE_LIMIT_MAX : GET_RATE_LIMIT_MAX;

  if (memoryRateLimiter.size > 2000) {
    for (const [entryKey, entry] of memoryRateLimiter.entries()) {
      if (entry.resetAt <= now) {
        memoryRateLimiter.delete(entryKey);
      }
    }
  }

  const existing = memoryRateLimiter.get(key);
  if (!existing || existing.resetAt <= now) {
    memoryRateLimiter.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  existing.count += 1;
  return existing.count <= maxRequests;
}

async function checkRedisRateLimit(
  creds: { url: string; token: string },
  method: 'GET' | 'POST',
  ipHash: string
): Promise<boolean> {
  const minuteBucket = Math.floor(Date.now() / RATE_LIMIT_WINDOW_MS);
  const rateKey = `${RATE_LIMIT_PREFIX}${method}:${ipHash}:${minuteBucket}`;
  const maxRequests = method === 'POST' ? POST_RATE_LIMIT_MAX : GET_RATE_LIMIT_MAX;

  const currentCount = Number(await runRedisCommand(creds, ['INCR', rateKey]));
  if (currentCount === 1) {
    await runRedisCommand(creds, ['EXPIRE', rateKey, RATE_LIMIT_WINDOW_SECONDS]);
  }
  return currentCount <= maxRequests;
}

let writeLock: Promise<void> = Promise.resolve();

async function readLocalStore(): Promise<LocalStore> {
  try {
    const raw = await fs.readFile(LOCAL_STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as Partial<LocalStore>;
    return {
      count: typeof parsed.count === 'number' && Number.isFinite(parsed.count) ? parsed.count : 0,
      seen: parsed.seen && typeof parsed.seen === 'object' ? parsed.seen : {},
    };
  } catch {
    return { count: 0, seen: {} };
  }
}

async function writeLocalStore(store: LocalStore): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_STORE_PATH), { recursive: true });
  await fs.writeFile(LOCAL_STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

async function startServer() {
  const app = express();
  const httpServer = createHttpServer(app);
  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  const isProd = process.env.NODE_ENV === 'production';

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope()'
    );
    if (isProd) {
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=63072000; includeSubDomains; preload'
      );
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
      );
    }
    next();
  });

  app.use('/api/visitors', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');

    if (req.method !== 'GET' && req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const contentLengthRaw = req.headers['content-length'];
    if (contentLengthRaw !== undefined) {
      const parsedLength = Number(contentLengthRaw);
      if (!Number.isFinite(parsedLength) || parsedLength < 0 || parsedLength > MAX_CONTENT_LENGTH_BYTES) {
        res.status(413).json({ error: 'Payload too large' });
        return;
      }
    }

    if (req.method === 'POST' && !isAllowedOrigin(req)) {
      res.status(403).json({ error: 'Cross-site request rejected' });
      return;
    }

    next();
  });

  app.get('/api/visitors', async (req, res) => {
    const creds = getRedisCredentials();
    const ipHash = createHashedIp(getClientIp(req));

    try {
      const allowed = creds
        ? await checkRedisRateLimit(creds, 'GET', ipHash)
        : checkMemoryRateLimit('GET', ipHash);

      if (!allowed) {
        res.setHeader('Retry-After', String(RATE_LIMIT_WINDOW_SECONDS));
        res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
        return;
      }

      if (creds) {
        const raw = await runRedisCommand(creds, ['GET', TOTAL_KEY]);
        const count = raw !== null && raw !== undefined ? Number(raw) : 0;
        res.json({
          configured: true,
          count: Number.isFinite(count) ? count : 0,
          deduplicated: false,
        });
        return;
      }

      const store = await readLocalStore();
      res.json({
        configured: true,
        count: store.count,
        deduplicated: false,
      });
    } catch (error) {
      console.error(
        'GET /api/visitors error:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      res.status(502).json({
        configured: Boolean(creds),
        count: null,
        error: 'Unable to fetch visitor count.',
      });
    }
  });

  app.post('/api/visitors', async (req, res) => {
    const creds = getRedisCredentials();
    const ipHash = createHashedIp(getClientIp(req));
    const fingerprint = createVisitorFingerprint(req);

    try {
      const allowed = creds
        ? await checkRedisRateLimit(creds, 'POST', ipHash)
        : checkMemoryRateLimit('POST', ipHash);

      if (!allowed) {
        res.setHeader('Retry-After', String(RATE_LIMIT_WINDOW_SECONDS));
        res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
        return;
      }

      if (creds) {
        const seenKey = `${SEEN_PREFIX}${fingerprint}`;
        const setResult = await runRedisCommand(creds, [
          'SET',
          seenKey,
          '1',
          'EX',
          DEDUP_TTL_SECONDS,
          'NX',
        ]);

        if (setResult === 'OK') {
          const incremented = await runRedisCommand(creds, ['INCR', TOTAL_KEY]);
          const count = Number(incremented);
          res.json({
            configured: true,
            count: Number.isFinite(count) ? count : 1,
            deduplicated: false,
          });
          return;
        }

        const existing = await runRedisCommand(creds, ['GET', TOTAL_KEY]);
        const count = existing !== null && existing !== undefined ? Number(existing) : 0;
        res.json({
          configured: true,
          count: Number.isFinite(count) ? count : 0,
          deduplicated: true,
        });
        return;
      }

      // Serialized local persistent counter for development/preview when Upstash isn't configured
      let resultPayload = {
        configured: true,
        count: 0,
        deduplicated: false,
      };

      const task = writeLock.then(async () => {
        const now = Date.now();
        const store = await readLocalStore();

        for (const [key, expiresAt] of Object.entries(store.seen)) {
          if (expiresAt <= now) {
            delete store.seen[key];
          }
        }

        if (store.seen[fingerprint] && store.seen[fingerprint] > now) {
          resultPayload = {
            configured: true,
            count: store.count,
            deduplicated: true,
          };
        } else {
          store.count += 1;
          store.seen[fingerprint] = now + DEDUP_TTL_MS;
          await writeLocalStore(store);
          resultPayload = {
            configured: true,
            count: store.count,
            deduplicated: false,
          };
        }
      });

      writeLock = task.catch(() => {});
      await task;
      res.json(resultPayload);
    } catch (error) {
      console.error(
        'POST /api/visitors error:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      res.status(502).json({
        configured: Boolean(creds),
        count: null,
        error: 'Unable to record visit.',
      });
    }
  });

  if (!isProd) {
    const publicDir = path.resolve(process.cwd(), 'public');
    app.use('/assets', async (req, res, next) => {
      const requested = path.normalize(req.path).replace(/^(\.\.[/\\])+/, '');
      const fullPath = path.join(publicDir, 'assets', requested);
      if (!fullPath.startsWith(path.join(publicDir, 'assets'))) {
        res.status(404).end();
        return;
      }
      try {
        await fs.access(fullPath);
        next();
      } catch {
        res.status(404).end();
      }
    });

    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true,
        ws: {
          server: httpServer,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (req, res) => {
      if (req.path.startsWith('/assets/') || path.extname(req.path)) {
        res.status(404).end();
        return;
      }
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
