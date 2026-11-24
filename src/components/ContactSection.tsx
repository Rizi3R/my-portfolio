import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { copyTextToClipboard } from '../utils/clipboard';
import { Mail, MapPin, Copy, Check, ArrowUpRight, FileText, AlertCircle } from 'lucide-react';
import { LinkedInIcon } from './LinkedInIcon';

interface ContactSectionProps {
  onOpenResume: (trigger?: HTMLElement | null) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const { t, content, format } = useI18n();
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const [copyAnnouncement, setCopyAnnouncement] = useState('');

  const handleCopyEmail = async () => {
    const ok = await copyTextToClipboard(content.profile.email);
    if (ok) {
      setCopyState('copied');
      setCopyAnnouncement(format(t.contact.copySuccessAnnouncement, { email: content.profile.email }));
      setTimeout(() => {
        setCopyState('idle');
        setCopyAnnouncement('');
      }, 2500);
    } else {
      setCopyState('error');
      setCopyAnnouncement(format(t.contact.copyErrorAnnouncement, { email: content.profile.email }));
      setTimeout(() => {
        setCopyState('idle');
        setCopyAnnouncement('');
      }, 3500);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 bg-[#13161C] text-[#EEF4F8] py-16 sm:py-20 border-b border-[#2E3644]"
    >
      <div className="sr-only" aria-live="polite" role="status">
        {copyAnnouncement}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 7 Cols: Contact Headline & Primary Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="text-xs label-condensed text-[#B9D6E6]">
                {t.contact.eyebrow}
              </p>
              <h2
                id="contact-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#EEF4F8] tracking-tight max-w-2xl"
              >
                {t.contact.heading}
              </h2>
              <p className="text-sm sm:text-base text-[#B4C2CF] leading-relaxed max-w-xl">
                {content.profile.availabilityNote}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`mailto:${content.profile.email}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-[#B9D6E6] hover:bg-[#cfe3ee] active:bg-[#a6c8db] text-[#13161C] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EEF4F8]"
              >
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.contact.sendEmail}</span>
              </a>

              <button
                type="button"
                onClick={(e) => onOpenResume(e.currentTarget)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-transparent border border-[#EEF4F8]/35 hover:border-[#B9D6E6] hover:text-[#B9D6E6] text-[#EEF4F8] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C]"
              >
                <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.contact.viewResume}</span>
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Rule-Divided Direct Details */}
          <div className="lg:col-span-5 divide-y divide-[#2E3644] border-y border-[#2E3644]">
            <div className="py-5 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="text-xs label-condensed text-[#A7B5C3]">
                    {t.contact.directEmailLabel}
                  </div>
                  <div className="text-sm font-semibold text-[#EEF4F8] break-all">
                    {content.profile.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label={t.accessibility.copyEmailLabel}
                  className="inline-flex items-center gap-1.5 px-3 py-2 min-h-11 rounded-lg bg-[#1B2029] border border-[#2E3644] hover:border-[#B9D6E6]/60 text-xs label-condensed text-[#B9D6E6] transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C]"
                >
                  {copyState === 'copied' ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.contact.copied}</span>
                    </>
                  ) : copyState === 'error' ? (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 text-[#B9D6E6]" aria-hidden="true" />
                      <span>{t.contact.copyFailed}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.contact.copy}</span>
                    </>
                  )}
                </button>
              </div>
              {copyState === 'error' && (
                <p className="text-xs text-[#B9D6E6]">
                  {format(t.contact.copyErrorNotice, { email: content.profile.email })}
                </p>
              )}
            </div>

            <a
              href={content.profile.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="py-5 flex items-center justify-between gap-4 group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] rounded"
            >
              <div className="space-y-1">
                <div className="text-xs label-condensed text-[#A7B5C3]">
                  {t.contact.linkedInLabel}
                </div>
                <div className="text-sm font-semibold text-[#EEF4F8] group-hover:text-[#B9D6E6] transition-colors">
                  {t.contact.linkedInValue}
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs label-condensed text-[#B9D6E6] shrink-0">
                <LinkedInIcon className="w-3.5 h-3.5" />
                <span>{t.contact.open}</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </a>

            <div className="py-5 flex items-center gap-2 text-xs sm:text-sm text-[#B4C2CF]">
              <MapPin className="w-4 h-4 text-[#B9D6E6] shrink-0" aria-hidden="true" />
              <span>{content.profile.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
