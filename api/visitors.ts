import { createHash } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

interface VercelRequest extends IncomingMessage {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => void;
}

const TOTAL_KEY = 'aries_portfolio:visitors:total';
const SEEN_PREFIX = 'aries_portfolio:visitors:seen:';
const RATE_LIMIT_PREFIX = 'aries_portfolio:visitors:rl:';
const DEDUP_TTL_SECONDS = 60 * 60 * 12; // 12-hour duplicate-visit prevention window
const RATE_LIMIT_WINDOW_SECONDS = 60;
const POST_RATE_LIMIT_MAX = 10;
const GET_RATE_LIMIT_MAX = 30;
const REDIS_TIMEOUT_MS = 4000;
const MAX_CONTENT_LENGTH_BYTES = 1024;

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

function getHeader(req: VercelRequest, name: string): string {
  const value = req.headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0] || '';
  return value || '';
}

function getClientIp(req: VercelRequest): string {
  const forwarded = getHeader(req, 'x-forwarded-for').split(',')[0]?.trim() || '';
  const realIp = getHeader(req, 'x-real-ip').trim();
  return forwarded || realIp || 'unknown';
}

function getHashSalt(): string {
  return process.env.VISITOR_HASH_SALT || 'aries-razak-portfolio-salt';
}

function createHashedIp(ip: string): string {
  return createHash('sha256')
    .update(`${getHashSalt()}:rl:${ip}`)
    .digest('hex')
    .slice(0, 24);
}

function createVisitorFingerprint(req: VercelRequest): string {
  const ip = getClientIp(req);
  const ua = getHeader(req, 'user-agent').slice(0, 200);
  const dayBucket = new Date().toISOString().slice(0, 10);

  // One-way SHA-256 digest: never persists raw IP addresses or user-agent strings
  return createHash('sha256')
    .update(`${getHashSalt()}:${ip}:${ua}:${dayBucket}`)
    .digest('hex')
    .slice(0, 32);
}

function isAllowedOrigin(req: VercelRequest): boolean {
  const secFetchSite = getHeader(req, 'sec-fetch-site').toLowerCase();
  if (secFetchSite === 'cross-site') {
    return false;
  }

  const origin = getHeader(req, 'origin').trim();
  if (!origin) {
    return true;
  }

  try {
    const parsedOrigin = new URL(origin);
    const originHost = parsedOrigin.hostname.toLowerCase();
    const requestHostHeader = getHeader(req, 'host').split(':')[0]?.toLowerCase() || '';

    if (requestHostHeader && originHost === requestHostHeader) {
      return true;
    }

    return (
      originHost === 'aries-razak.vercel.app' ||
      originHost === 'localhost' ||
      originHost === '127.0.0.1'
    );
  } catch {
    return false;
  }
}

async function checkRateLimit(
  creds: { url: string; token: string },
  method: 'GET' | 'POST',
  ipHash: string
): Promise<boolean> {
  const minuteBucket = Math.floor(Date.now() / (RATE_LIMIT_WINDOW_SECONDS * 1000));
  const rateKey = `${RATE_LIMIT_PREFIX}${method}:${ipHash}:${minuteBucket}`;
  const maxRequests = method === 'POST' ? POST_RATE_LIMIT_MAX : GET_RATE_LIMIT_MAX;

  const currentCount = Number(await runRedisCommand(creds, ['INCR', rateKey]));
  if (currentCount === 1) {
    await runRedisCommand(creds, ['EXPIRE', rateKey, RATE_LIMIT_WINDOW_SECONDS]);
  }
  return currentCount <= maxRequests;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const contentLengthRaw = getHeader(req, 'content-length');
  if (contentLengthRaw) {
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

  const creds = getRedisCredentials();
  if (!creds) {
    res.status(200).json({
      configured: false,
      count: null,
      deduplicated: false,
    });
    return;
  }

  try {
    const ipHash = createHashedIp(getClientIp(req));
    const allowed = await checkRateLimit(creds, req.method, ipHash);
    if (!allowed) {
      res.setHeader('Retry-After', String(RATE_LIMIT_WINDOW_SECONDS));
      res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
      return;
    }

    if (req.method === 'GET') {
      const raw = await runRedisCommand(creds, ['GET', TOTAL_KEY]);
      const count = raw !== null && raw !== undefined ? Number(raw) : 0;
      res.status(200).json({
        configured: true,
        count: Number.isFinite(count) ? count : 0,
        deduplicated: false,
      });
      return;
    }

    const fingerprint = createVisitorFingerprint(req);
    const seenKey = `${SEEN_PREFIX}${fingerprint}`;

    // Atomically set deduplication key with NX + EX (12 hours)
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
      res.status(200).json({
        configured: true,
        count: Number.isFinite(count) ? count : 1,
        deduplicated: false,
      });
      return;
    }

    const existing = await runRedisCommand(creds, ['GET', TOTAL_KEY]);
    const count = existing !== null && existing !== undefined ? Number(existing) : 0;
    res.status(200).json({
      configured: true,
      count: Number.isFinite(count) ? count : 0,
      deduplicated: true,
    });
  } catch (error) {
    console.error(
      'Visitor counter error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    res.status(502).json({
      configured: true,
      count: null,
      error: 'Unable to reach visitor service.',
    });
  }
}
