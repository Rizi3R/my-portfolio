import React, { useState } from 'react';
import { PROFILE } from '../data/universeContent';
import { Mail, MapPin, Copy, Check, ArrowUpRight, FileText, Terminal } from 'lucide-react';
import { LinkedInIcon } from './LinkedInIcon';

interface ContactSectionProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenResume,
  onOpenTerminal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PROFILE.email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = PROFILE.email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignored gracefully
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 bg-[#0A0913] text-[#F6F2E9] py-16 sm:py-20 border-b border-[#242138]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 7 Cols: Contact Headline & Primary Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-[#F2A77D]">
                Contact &amp; Roles
              </p>
              <h2
                id="contact-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#F6F2E9] tracking-tight max-w-2xl"
              >
                Open to Application Support, IT Operations &amp; Business Systems conversations.
              </h2>
              <p className="text-sm sm:text-base text-[#CFCAC0] leading-relaxed max-w-xl">
                {PROFILE.availabilityNote} Reach out anytime by email or LinkedIn, or review and save a printable résumé directly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#A8C5FF] hover:bg-[#bfd5ff] text-[#191723] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F2E9]"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Send Email</span>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-transparent border border-[#F6F2E9]/35 hover:border-[#A8C5FF] hover:text-[#A8C5FF] text-[#F6F2E9] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>View Résumé</span>
              </button>

              <button
                type="button"
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-mono text-[#CFCAC0] hover:text-[#A8C5FF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
              >
                <Terminal className="w-3.5 h-3.5 text-[#A8C5FF]" aria-hidden="true" />
                <span>Open Shell</span>
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Rule-Divided Direct Details */}
          <div className="lg:col-span-5 divide-y divide-[#242138] border-y border-[#242138]">
            <div className="py-5 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#9A94A8] uppercase tracking-wider">
                  Direct Email
                </div>
                <div className="text-sm font-semibold text-[#F6F2E9] break-all">
                  {PROFILE.email}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12101F] border border-[#242138] hover:border-[#A8C5FF]/60 text-xs font-mono text-[#A8C5FF] transition-colors cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <a
              href={PROFILE.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="py-5 flex items-center justify-between gap-4 group transition-colors"
            >
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#9A94A8] uppercase tracking-wider">
                  LinkedIn
                </div>
                <div className="text-sm font-semibold text-[#F6F2E9] group-hover:text-[#A8C5FF] transition-colors">
                  Aries Razak Profile
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A8C5FF] shrink-0">
                <LinkedInIcon className="w-3.5 h-3.5" />
                <span>Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </a>

            <div className="py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#CFCAC0]">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F2A77D]" aria-hidden="true" />
                <span>Based in {PROFILE.location}</span>
              </span>
              <span className="font-mono text-[#9A94A8]">
                {PROFILE.currentRole} · {PROFILE.currentCompany}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
