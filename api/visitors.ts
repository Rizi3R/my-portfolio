import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  checkRedisRateLimit,
  createHashedIp,
  createVisitorFingerprint,
  DEDUP_TTL_SECONDS,
  getClientIpFromHeaders,
  getHeaderValue,
  getRedisCredentials,
  getVisitorHashSalt,
  isAllowedOriginHeaders,
  MAX_CONTENT_LENGTH_BYTES,
  RATE_LIMIT_WINDOW_SECONDS,
  runRedisCommand,
  SEEN_PREFIX,
  TOTAL_KEY,
} from './_visitorCore';

interface VercelRequest extends IncomingMessage {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => void;
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

  const contentLengthRaw = getHeaderValue(req.headers, 'content-length');
  if (contentLengthRaw) {
    const parsedLength = Number(contentLengthRaw);
    if (!Number.isFinite(parsedLength) || parsedLength < 0 || parsedLength > MAX_CONTENT_LENGTH_BYTES) {
      res.status(413).json({ error: 'Payload too large' });
      return;
    }
  }

  if (req.method === 'POST' && !isAllowedOriginHeaders(req.headers)) {
    res.status(403).json({ error: 'Cross-site request rejected' });
    return;
  }

  const creds = getRedisCredentials();
  const hashSalt = getVisitorHashSalt();
  if (!creds || !hashSalt) {
    res.status(200).json({
      configured: false,
      count: null,
      deduplicated: false,
    });
    return;
  }

  try {
    const clientIp = getClientIpFromHeaders(req.headers);
    const ipHash = createHashedIp(clientIp, hashSalt);
    const allowed = await checkRedisRateLimit(creds, req.method, ipHash);
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

    const fingerprint = createVisitorFingerprint(
      clientIp,
      getHeaderValue(req.headers, 'user-agent'),
      hashSalt
    );
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
  } catch {
    console.error('Visitor counter request failed');
    res.status(502).json({
      configured: true,
      count: null,
      error: 'Unable to reach visitor service.',
    });
  }
}
