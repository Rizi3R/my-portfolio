import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useI18n } from '../i18n';
import type { SupportedLocale } from '../i18n';

interface LanguageSelectorProps {
  variant?: 'header' | 'mobile';
  onSelected?: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
  onSelected,
}) => {
  const { locale, localeMeta, supportedLocales, setLocale, t } = useI18n();

  if (variant === 'mobile') {
    return (
      <div
        className="mb-3 pb-3 border-b border-[#242138]"
        role="group"
        aria-label={t.accessibility.languageSelectorLabel}
      >
        <div className="flex items-center gap-2 px-1 pb-2 text-xs font-mono uppercase tracking-[0.14em] text-[#9790A6]">
          <Globe className="w-3.5 h-3.5 text-[#A8C5FF]" aria-hidden="true" />
          <span>{t.navigation.languageHeading}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {supportedLocales.map((item) => {
            const isActive = item.code === locale;
            return (
              <button
                key={item.code}
                type="button"
                lang={item.htmlLang}
                aria-pressed={isActive}
                onClick={() => {
                  setLocale(item.code);
                  onSelected?.();
                }}
                className={`min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium border text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] ${
                  isActive
                    ? 'bg-[#A8C5FF]/15 border-[#A8C5FF] text-[#F6F2E9]'
                    : 'bg-[#12101F] border-[#242138] text-[#EDE7DB] hover:border-[#A8C5FF]/60 hover:text-[#F6F2E9]'
                }`}
              >
                {item.nativeLabel}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center gap-1.5 rounded-lg border border-[#242138] bg-[#12101F] px-2.5 py-2 text-[13px] font-medium text-[#EDE7DB] hover:border-[#A8C5FF]/60 hover:text-[#F6F2E9] focus-within:ring-2 focus-within:ring-[#A8C5FF] focus-within:ring-offset-2 focus-within:ring-offset-[#0A0913] transition-colors shrink-0 min-h-11">
      <Globe className="w-3.5 h-3.5 text-[#A8C5FF] shrink-0" aria-hidden="true" />
      <span lang={localeMeta.htmlLang} className="whitespace-nowrap">
        {localeMeta.nativeLabel}
      </span>
      <ChevronDown className="w-3.5 h-3.5 text-[#9790A6] shrink-0" aria-hidden="true" />
      <select
        aria-label={t.accessibility.languageSelectorLabel}
        value={locale}
        onChange={(e) => {
          setLocale(e.target.value as SupportedLocale);
          onSelected?.();
        }}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {supportedLocales.map((item) => (
          <option
            key={item.code}
            value={item.code}
            lang={item.htmlLang}
            className="bg-[#12101F] text-[#F6F2E9]"
          >
            {item.nativeLabel}
          </option>
        ))}
      </select>
    </div>
  );
};
