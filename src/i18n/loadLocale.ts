import { enMYBundle } from './translations/en-MY';
import type { LocaleBundle, SupportedLocale } from './types';

const loaders = {
  'ms-MY': () => import('./translations/ms-MY').then((module) => module.msMYBundle),
  'zh-Hans-MY': () => import('./translations/zh-Hans-MY').then((module) => module.zhHansMYBundle),
  'ta-MY': () => import('./translations/ta-MY').then((module) => module.taMYBundle),
};

export function loadLocale(locale: SupportedLocale): Promise<LocaleBundle> {
  return locale === 'en-MY' ? Promise.resolve(enMYBundle) : loaders[locale]();
}
