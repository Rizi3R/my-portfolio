import React, { useState } from 'react';
import { PROFILE } from '../data/universeContent';
import { Mail, MapPin, Copy, Check, ArrowUpRight, FileText } from 'lucide-react';
import { LinkedInIcon } from './LinkedInIcon';
import { InteractiveTerminal } from './InteractiveTerminal';

interface ContactSectionProps {
  onOpenResume: () => void;
  onJumpToSection: (id: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenResume,
  onJumpToSection,
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
      className="py-16 sm:py-20 border-b border-[#323238]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Interactive Terminal Showcase */}
        <div id="terminal-section" className="scroll-mt-24 space-y-5">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-2">
              05. Interactive Terminal
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Explore via Command Line
            </h2>
            <p className="mt-1.5 text-sm text-[#D1D5DB] leading-relaxed">
              An optional technology-themed sandbox shell. Query my background, skills, education, or run a few hidden commands—or skip straight to direct contact below.
            </p>
          </div>

          <InteractiveTerminal
            onOpenResume={onOpenResume}
            onJumpToSection={onJumpToSection}
          />
        </div>

        {/* Direct Contact & Recruiter Dispatch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          <div className="lg:col-span-6 space-y-5 flex flex-col justify-between bg-[#222226] border border-[#323238] rounded-2xl p-6 sm:p-8">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-[#DC343B]">
                06. Contact & Opportunities
              </p>
              <h2
                id="contact-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
              >
                Let’s talk systems, support, and engineering.
              </h2>
              <p className="text-sm text-[#D1D5DB] leading-relaxed">
                Open to conversations around Application Support, IT Operations, Business Systems Administration, and Infrastructure roles—as well as technical projects and collaborations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#DC343B] hover:bg-[#c52b31] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Send Email</span>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1B1B1D] border border-[#B0E0E6]/40 hover:border-[#B0E0E6] text-[#B0E0E6] text-sm font-semibold transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>View ATS Resume</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#222226] border border-[#323238] rounded-2xl p-6 flex flex-col justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-[#B0E0E6] mb-1">Direct Email</div>
                <div className="text-sm font-semibold text-white break-all">{PROFILE.email}</div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D1D5DB] hover:text-[#B0E0E6] transition-colors cursor-pointer self-start"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
                    <span className="text-[#B0E0E6]">Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy address</span>
                  </>
                )}
              </button>
            </div>

            <a
              href={PROFILE.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/50 rounded-2xl p-6 flex flex-col justify-between gap-4 transition-colors"
            >
              <div>
                <div className="text-xs font-mono text-[#B0E0E6] mb-1">LinkedIn</div>
                <div className="text-sm font-semibold text-white">Aries Razak Profile</div>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D1D5DB]">
                <LinkedInIcon className="w-3.5 h-3.5 text-[#B0E0E6]" />
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </a>

            <div className="sm:col-span-2 bg-[#222226] border border-[#323238] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#D1D5DB]">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#DC343B]" aria-hidden="true" />
                <span>Based in {PROFILE.location}</span>
              </span>
              <span className="font-mono text-[#9CA3AF]">
                Role: {PROFILE.currentRole} · {PROFILE.currentCompany}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
