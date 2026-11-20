import type { LocaleMeta, SupportedLocale } from './types';

export const DEFAULT_LOCALE: SupportedLocale = 'en-MY';
export const LOCALE_STORAGE_KEY = 'portfolio-locale';
export const LOCALE_QUERY_PARAM = 'lang';

export const SUPPORTED_LOCALES: readonly LocaleMeta[] = [
  {
    code: 'en-MY',
    nativeLabel: 'English',
    englishName: 'English',
    htmlLang: 'en-MY',
    dir: 'ltr',
  },
  {
    code: 'ms-MY',
    nativeLabel: 'Bahasa Melayu',
    englishName: 'Malay',
    htmlLang: 'ms-MY',
    dir: 'ltr',
  },
  {
    code: 'zh-Hans-MY',
    nativeLabel: '中文（简体）',
    englishName: 'Simplified Chinese',
    htmlLang: 'zh-Hans-MY',
    dir: 'ltr',
  },
  {
    code: 'ta-MY',
    nativeLabel: 'தமிழ்',
    englishName: 'Tamil',
    htmlLang: 'ta-MY',
    dir: 'ltr',
  },
] as const;

const LOCALE_SET = new Set<string>(SUPPORTED_LOCALES.map((item) => item.code));

export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return typeof value === 'string' && LOCALE_SET.has(value);
}

export function getLocaleMeta(locale: SupportedLocale): LocaleMeta {
  return SUPPORTED_LOCALES.find((item) => item.code === locale) || SUPPORTED_LOCALES[0];
}

interface BrowserStorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

interface BrowserGlobalLike {
  localStorage?: BrowserStorageLike;
  location?: { search?: string };
}

function getBrowserGlobal(): BrowserGlobalLike | undefined {
  const g = globalThis as { window?: BrowserGlobalLike };
  return g.window;
}

export function readStoredLocale(
  storage?: Pick<BrowserStorageLike, 'getItem'> | null
): SupportedLocale | null {
  try {
    const targetStorage =
      storage !== undefined ? storage : getBrowserGlobal()?.localStorage ?? null;
    if (!targetStorage) return null;
    const saved = targetStorage.getItem(LOCALE_STORAGE_KEY);
    return isSupportedLocale(saved) ? saved : null;
  } catch {
    return null;
  }
}

export function writeStoredLocale(
  locale: SupportedLocale,
  storage?: Pick<BrowserStorageLike, 'setItem'> | null
): boolean {
  try {
    const targetStorage =
      storage !== undefined ? storage : getBrowserGlobal()?.localStorage ?? null;
    if (!targetStorage) return false;
    targetStorage.setItem(LOCALE_STORAGE_KEY, locale);
    return true;
  } catch {
    return false;
  }
}

export interface ResolveLocaleOptions {
  search?: string;
  storage?: Pick<BrowserStorageLike, 'getItem'> | null;
}

/**
 * Precedence:
 * 1. Valid language specified in the URL (?lang=...)
 *    - If ?lang is present with an unsupported/malformed value, safely fall back to English (DEFAULT_LOCALE).
 * 2. Valid saved preference in localStorage ('portfolio-locale')
 * 3. Default English ('en-MY')
 */
export function resolveLocale(options: ResolveLocaleOptions = {}): SupportedLocale {
  const search =
    options.search !== undefined
      ? options.search
      : getBrowserGlobal()?.location?.search ?? '';

  try {
    const params = new URLSearchParams(search);
    if (params.has(LOCALE_QUERY_PARAM)) {
      const urlLocale = params.get(LOCALE_QUERY_PARAM);
      return isSupportedLocale(urlLocale) ? urlLocale : DEFAULT_LOCALE;
    }
  } catch {
    return DEFAULT_LOCALE;
  }

  const saved = readStoredLocale(options.storage);
  if (saved) return saved;

  return DEFAULT_LOCALE;
}

/**
 * Build a URL string updating `?lang=` while preserving existing hash and unrelated query parameters.
 */
export function buildUrlWithLocale(
  currentHref: string,
  locale: SupportedLocale,
  options?: { hashOverride?: string; deleteParams?: string[] }
): string {
  const url = new URL(currentHref);
  if (options?.deleteParams) {
    for (const key of options.deleteParams) {
      url.searchParams.delete(key);
    }
  }
  url.searchParams.set(LOCALE_QUERY_PARAM, locale);
  if (options?.hashOverride !== undefined) {
    url.hash = options.hashOverride;
  }
  return url.toString();
}

/**
 * Simple template placeholder interpolator: replaces `{key}` occurrences safely.
 */
export function formatTemplate(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, key) => {
    return Object.prototype.hasOwnProperty.call(values, key)
      ? String(values[key])
      : match;
  });
}
