import React, { useState } from 'react';
import { PROFILE } from '../data/universeContent';
import { copyTextToClipboard } from '../utils/clipboard';
import { Mail, MapPin, Copy, Check, ArrowUpRight, FileText, AlertCircle } from 'lucide-react';
import { LinkedInIcon } from './LinkedInIcon';

interface ContactSectionProps {
  onOpenResume: (trigger?: HTMLElement | null) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const [copyAnnouncement, setCopyAnnouncement] = useState('');

  const handleCopyEmail = async () => {
    const ok = await copyTextToClipboard(PROFILE.email);
    if (ok) {
      setCopyState('copied');
      setCopyAnnouncement(`Email copied to clipboard: ${PROFILE.email}`);
      setTimeout(() => {
        setCopyState('idle');
        setCopyAnnouncement('');
      }, 2500);
    } else {
      setCopyState('error');
      setCopyAnnouncement(`Unable to copy automatically. Email address is ${PROFILE.email}`);
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
      className="scroll-mt-20 bg-[#0A0913] text-[#F6F2E9] py-16 sm:py-20 border-b border-[#242138]"
    >
      <div className="sr-only" aria-live="polite" role="status">
        {copyAnnouncement}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 7 Cols: Contact Headline & Primary Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-[#F2A77D]">
                Contact
              </p>
              <h2
                id="contact-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#F6F2E9] tracking-tight max-w-2xl"
              >
                Let’s talk about how I can support your team.
              </h2>
              <p className="text-sm sm:text-base text-[#CFCAC0] leading-relaxed max-w-xl">
                {PROFILE.availabilityNote}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-[#A8C5FF] hover:bg-[#bfd5ff] active:bg-[#9bb9fa] text-[#191723] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F2E9]"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Send Email</span>
              </a>

              <button
                type="button"
                onClick={(e) => onOpenResume(e.currentTarget)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-transparent border border-[#F6F2E9]/35 hover:border-[#A8C5FF] hover:text-[#A8C5FF] text-[#F6F2E9] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>View Résumé</span>
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Rule-Divided Direct Details (single LinkedIn link, no duplication) */}
          <div className="lg:col-span-5 divide-y divide-[#242138] border-y border-[#242138]">
            <div className="py-5 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="text-xs font-mono text-[#B5B0C2] uppercase tracking-wider">
                    Direct Email
                  </div>
                  <div className="text-sm font-semibold text-[#F6F2E9] break-all">
                    {PROFILE.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address to clipboard"
                  className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg bg-[#12101F] border border-[#242138] hover:border-[#A8C5FF]/60 text-xs font-mono text-[#A8C5FF] transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
                >
                  {copyState === 'copied' ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : copyState === 'error' ? (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 text-[#F2A77D]" aria-hidden="true" />
                      <span>Copy failed</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              {copyState === 'error' && (
                <p className="text-xs text-[#F2A77D]">
                  Copy failed automatically. Please select or click {PROFILE.email}.
                </p>
              )}
            </div>

            <a
              href={PROFILE.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="py-5 flex items-center justify-between gap-4 group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded"
            >
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#B5B0C2] uppercase tracking-wider">
                  LinkedIn
                </div>
                <div className="text-sm font-semibold text-[#F6F2E9] group-hover:text-[#A8C5FF] transition-colors">
                  Aries Razak Profile
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A8C5FF] shrink-0">
                <LinkedInIcon className="w-3.5 h-3.5" />
                <span>Open</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </a>

            <div className="py-5 flex items-center gap-2 text-xs sm:text-sm text-[#CFCAC0]">
              <MapPin className="w-4 h-4 text-[#F2A77D] shrink-0" aria-hidden="true" />
              <span>{PROFILE.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
