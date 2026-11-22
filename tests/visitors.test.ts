import test, { afterEach, describe } from 'node:test';
import assert from 'node:assert/strict';
import type { IncomingMessage, ServerResponse } from 'node:http';
import handler from '../api/visitors';
import {
  createHashedIp,
  createVisitorFingerprint,
  getVisitorHashSalt,
  SEEN_PREFIX,
  TOTAL_KEY,
} from '../api/_visitorCore';

const ORIGINAL_ENV = { ...process.env };
const ORIGINAL_FETCH = globalThis.fetch;

interface MockResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: unknown;
  res: ServerResponse & {
    status: (code: number) => unknown;
    json: (data: unknown) => void;
  };
}

function createMockReq(
  method: string,
  headers: Record<string, string> = {}
): IncomingMessage & { method: string; headers: Record<string, string> } {
  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    normalized[key.toLowerCase()] = value;
  }
  return {
    method,
    headers: normalized,
  } as unknown as IncomingMessage & { method: string; headers: Record<string, string> };
}

function createMockRes(): MockResponse {
  const state: MockResponse = {
    statusCode: 200,
    headers: {},
    body: undefined,
    res: null as unknown as MockResponse['res'],
  };

  const res = {
    setHeader(name: string, value: string | string[]) {
      state.headers[name.toLowerCase()] = Array.isArray(value) ? value.join(', ') : value;
    },
    status(code: number) {
      state.statusCode = code;
      return res;
    },
    json(data: unknown) {
      state.body = data;
    },
  } as unknown as MockResponse['res'];

  state.res = res;
  return state;
}

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  globalThis.fetch = ORIGINAL_FETCH;
});

describe('getVisitorHashSalt', () => {
  test('returns null when VISITOR_HASH_SALT is missing, whitespace, or shorter than 16 chars', () => {
    assert.equal(getVisitorHashSalt({}), null);
    assert.equal(getVisitorHashSalt({ VISITOR_HASH_SALT: '   ' }), null);
    assert.equal(getVisitorHashSalt({ VISITOR_HASH_SALT: 'short-salt' }), null);
    assert.equal(getVisitorHashSalt({ VISITOR_HASH_SALT: '   123456789012345   ' }), null);
  });

  test('returns trimmed salt when length meets minimum threshold', () => {
    const validSalt = '0123456789abcdef0123456789abcdef';
    assert.equal(getVisitorHashSalt({ VISITOR_HASH_SALT: `  ${validSalt}  ` }), validSalt);
  });
});

describe('visitor handler secret & degradation behavior', () => {
  test('GET and POST safely return configured: false when VISITOR_HASH_SALT is missing even with Redis configured', async () => {
    process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token-not-real';
    delete process.env.VISITOR_HASH_SALT;

    let fetchCalled = false;
    globalThis.fetch = (async () => {
      fetchCalled = true;
      throw new Error('fetch should not be called when VISITOR_HASH_SALT is missing');
    }) as typeof fetch;

    const getReq = createMockReq('GET', { 'x-forwarded-for': '203.0.113.10' });
    const getRes = createMockRes();
    await handler(getReq, getRes.res as never);

    assert.equal(getRes.statusCode, 200);
    assert.deepEqual(getRes.body, { configured: false, count: null, deduplicated: false });
    assert.equal(fetchCalled, false);

    const postReq = createMockReq('POST', {
      'x-forwarded-for': '203.0.113.10',
      origin: 'https://aries-razak.vercel.app',
      host: 'aries-razak.vercel.app',
    });
    const postRes = createMockRes();
    await handler(postReq, postRes.res as never);

    assert.equal(postRes.statusCode, 200);
    assert.deepEqual(postRes.body, { configured: false, count: null, deduplicated: false });
    assert.equal(fetchCalled, false);
  });

  test('returns configured: false when VISITOR_HASH_SALT is too short', async () => {
    process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token-not-real';
    process.env.VISITOR_HASH_SALT = 'too-short';

    const res = createMockRes();
    await handler(createMockReq('GET'), res.res as never);

    assert.equal(res.statusCode, 200);
    assert.deepEqual(res.body, { configured: false, count: null, deduplicated: false });
  });

  test('uses HMAC-SHA256 with VISITOR_HASH_SALT and never exposes raw IP or UA to Redis', async () => {
    const saltA = 'a'.repeat(32);
    const saltB = 'b'.repeat(32);
    const rawIp = '203.0.113.42';
    const rawUa = 'CustomTestBrowser/99.1';

    assert.notEqual(createHashedIp(rawIp, saltA), createHashedIp(rawIp, saltB));
    assert.notEqual(
      createVisitorFingerprint(rawIp, rawUa, saltA),
      createVisitorFingerprint(rawIp, rawUa, saltB)
    );

    process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token-not-real';
    process.env.VISITOR_HASH_SALT = saltA;

    const commands: Array<(string | number)[]> = [];
    let seenSet = false;
    let total = 7;

    globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
      const cmd = JSON.parse(String(init?.body || '[]')) as (string | number)[];
      commands.push(cmd);

      if (cmd[0] === 'INCR' && String(cmd[1]).startsWith('aries_portfolio:visitors:rl:')) {
        return new Response(JSON.stringify({ result: 1 }), { status: 200 });
      }
      if (cmd[0] === 'EXPIRE') {
        return new Response(JSON.stringify({ result: 1 }), { status: 200 });
      }
      if (cmd[0] === 'SET' && String(cmd[1]).startsWith(SEEN_PREFIX)) {
        if (!seenSet) {
          seenSet = true;
          return new Response(JSON.stringify({ result: 'OK' }), { status: 200 });
        }
        return new Response(JSON.stringify({ result: null }), { status: 200 });
      }
      if (cmd[0] === 'INCR' && cmd[1] === TOTAL_KEY) {
        total += 1;
        return new Response(JSON.stringify({ result: total }), { status: 200 });
      }
      if (cmd[0] === 'GET' && cmd[1] === TOTAL_KEY) {
        return new Response(JSON.stringify({ result: String(total) }), { status: 200 });
      }
      return new Response(JSON.stringify({ result: null }), { status: 200 });
    }) as typeof fetch;

    const reqHeaders = {
      'x-forwarded-for': rawIp,
      'user-agent': rawUa,
      origin: 'https://aries-razak.vercel.app',
      host: 'aries-razak.vercel.app',
    };

    const firstPost = createMockRes();
    await handler(createMockReq('POST', reqHeaders), firstPost.res as never);
    assert.equal(firstPost.statusCode, 200);
    assert.deepEqual(firstPost.body, { configured: true, count: 8, deduplicated: false });

    const secondPost = createMockRes();
    await handler(createMockReq('POST', reqHeaders), secondPost.res as never);
    assert.equal(secondPost.statusCode, 200);
    assert.deepEqual(secondPost.body, { configured: true, count: 8, deduplicated: true });

    const serializedCommands = JSON.stringify(commands);
    assert.equal(serializedCommands.includes(rawIp), false);
    assert.equal(serializedCommands.includes(rawUa), false);
  });

  test('returns a generic service error when Redis times out', async () => {
    process.env.UPSTASH_REDIS_REST_URL = 'https://example.upstash.io';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
    process.env.VISITOR_HASH_SALT = 'test-only-hmac-key';
    globalThis.fetch = async () => {
      throw new DOMException('upstream timeout', 'TimeoutError');
    };

    const result = createMockRes();
    await handler(createMockReq('GET'), result.res as never);
    assert.equal(result.statusCode, 502);
    assert.deepEqual(result.body, {
      configured: true,
      count: null,
      error: 'Unable to reach visitor service.',
    });
  });

  test('enforces method, payload size, and cross-site origin guards', async () => {
    const deleteRes = createMockRes();
    await handler(createMockReq('DELETE'), deleteRes.res as never);
    assert.equal(deleteRes.statusCode, 405);

    const largeRes = createMockRes();
    await handler(
      createMockReq('POST', { 'content-length': '2048' }),
      largeRes.res as never
    );
    assert.equal(largeRes.statusCode, 413);

    const crossSiteRes = createMockRes();
    await handler(
      createMockReq('POST', {
        'sec-fetch-site': 'cross-site',
        origin: 'https://evil.example',
        host: 'aries-razak.vercel.app',
      }),
      crossSiteRes.res as never
    );
    assert.equal(crossSiteRes.statusCode, 403);
  });
});
