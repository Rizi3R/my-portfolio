import { createHmac } from 'node:crypto';

export const TOTAL_KEY = 'aries_portfolio:visitors:total';
export const SEEN_PREFIX = 'aries_portfolio:visitors:seen:';
export const RATE_LIMIT_PREFIX = 'aries_portfolio:visitors:rl:';
export const DEDUP_TTL_SECONDS = 60 * 60 * 12; // 12-hour duplicate-visit prevention window
export const DEDUP_TTL_MS = DEDUP_TTL_SECONDS * 1000;
export const RATE_LIMIT_WINDOW_SECONDS = 60;
export const RATE_LIMIT_WINDOW_MS = RATE_LIMIT_WINDOW_SECONDS * 1000;
export const POST_RATE_LIMIT_MAX = 10;
export const GET_RATE_LIMIT_MAX = 30;
export const REDIS_TIMEOUT_MS = 4000;
export const MAX_CONTENT_LENGTH_BYTES = 1024;
export const MIN_VISITOR_HASH_SALT_LENGTH = 16;

export interface RedisCredentials {
  url: string;
  token: string;
}

export type HeaderMap = Record<string, string | string[] | undefined>;

export function getHeaderValue(headers: HeaderMap, name: string): string {
  const value = headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0] || '';
  return value || '';
}

export function getClientIpFromHeaders(headers: HeaderMap, fallbackAddress = ''): string {
  const forwarded = getHeaderValue(headers, 'x-forwarded-for').split(',')[0]?.trim() || '';
  const realIp = getHeaderValue(headers, 'x-real-ip').trim();
  return forwarded || realIp || fallbackAddress || 'unknown';
}

export function getRedisCredentials(env: NodeJS.ProcessEnv = process.env): RedisCredentials | null {
  const url = (env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL || '').trim();
  const token = (env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN || '').trim();
  if (!url || !token || !url.startsWith('https://')) {
    return null;
  }
  return { url: url.replace(/\/$/, ''), token };
}

/**
 * Returns the configured HMAC key from VISITOR_HASH_SALT when present and at least
 * MIN_VISITOR_HASH_SALT_LENGTH characters after trimming, or null if unconfigured/weak.
 * Never falls back to a hardcoded public literal.
 */
export function getVisitorHashSalt(env: NodeJS.ProcessEnv = process.env): string | null {
  const raw = (env.VISITOR_HASH_SALT || '').trim();
  if (raw.length < MIN_VISITOR_HASH_SALT_LENGTH) {
    return null;
  }
  return raw;
}

export function createHashedIp(ip: string, salt: string): string {
  return createHmac('sha256', salt).update(`rl:${ip}`).digest('hex').slice(0, 24);
}

export function createVisitorFingerprint(
  ip: string,
  userAgent: string,
  salt: string,
  now: Date = new Date()
): string {
  const ua = userAgent.slice(0, 200);
  const dayBucket = now.toISOString().slice(0, 10);

  // One-way HMAC-SHA256 digest: never persists raw IP addresses or user-agent strings
  return createHmac('sha256', salt)
    .update(`visit:${ip}:${ua}:${dayBucket}`)
    .digest('hex')
    .slice(0, 32);
}

export function isAllowedOriginHeaders(
  headers: HeaderMap,
  options: { allowRunApp?: boolean } = {}
): boolean {
  const secFetchSite = getHeaderValue(headers, 'sec-fetch-site').toLowerCase();
  if (secFetchSite === 'cross-site') {
    return false;
  }

  const origin = getHeaderValue(headers, 'origin').trim();
  if (!origin) {
    return true;
  }

  try {
    const parsedOrigin = new URL(origin);
    const originHost = parsedOrigin.hostname.toLowerCase();
    const requestHostHeader = getHeaderValue(headers, 'host').split(':')[0]?.toLowerCase() || '';

    if (requestHostHeader && originHost === requestHostHeader) {
      return true;
    }

    if (
      originHost === 'aries-razak.vercel.app' ||
      originHost === 'localhost' ||
      originHost === '127.0.0.1'
    ) {
      return true;
    }

    return Boolean(options.allowRunApp && originHost.endsWith('.run.app'));
  } catch {
    return false;
  }
}

export async function runRedisCommand(
  creds: RedisCredentials,
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

export async function checkRedisRateLimit(
  creds: RedisCredentials,
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
