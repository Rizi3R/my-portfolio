import React, { useState, useEffect } from 'react';
import { PROFILE } from '../data/universeContent';
import { ArrowUp, Mail, FileText, Terminal, Command, Compass } from 'lucide-react';
import { LinkedInIcon } from './LinkedInIcon';
import { ActiveView } from './Navbar';

interface FooterProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
  onChangeView: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenResume,
  onOpenTerminal,
  onOpenCommandPalette,
  onChangeView,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <footer className="bg-[#0A0913] border-t border-[#242138] py-10 relative no-print text-xs text-[#CFCAC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#242138]">
          <div className="space-y-1.5">
            <div className="font-display text-base font-bold text-[#F6F2E9]">
              {PROFILE.fullName} ({PROFILE.displayName})
            </div>
            <p className="text-xs text-[#E6E1D6]">
              {PROFILE.title} · {PROFILE.location}
            </p>
            <p className="text-xs text-[#9A94A8]">
              Application support, IT operations, SaaS administration, and business systems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#12101F] hover:bg-[#19162B] text-[#F6F2E9] border border-[#242138] hover:border-[#A8C5FF]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
            >
              <Mail className="w-3.5 h-3.5 text-[#A8C5FF]" aria-hidden="true" />
              <span>{PROFILE.email}</span>
            </a>

            <a
              href={PROFILE.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#12101F] hover:bg-[#19162B] text-[#F6F2E9] border border-[#242138] hover:border-[#A8C5FF]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-[#A8C5FF]" />
              <span>LinkedIn</span>
            </a>

            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#12101F] hover:bg-[#19162B] text-[#F6F2E9] border border-[#242138] hover:border-[#A8C5FF]/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
            >
              <FileText className="w-3.5 h-3.5 text-[#F2A77D]" aria-hidden="true" />
              <span>View Résumé</span>
            </button>

            <button
              type="button"
              onClick={() => onChangeView('plain')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#12101F] hover:bg-[#19162B] text-[#CFCAC0] hover:text-[#A8C5FF] border border-[#242138] hover:border-[#A8C5FF]/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Printable Summary</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© {currentYear} {PROFILE.displayName}</span>
            <span aria-hidden="true" className="text-[#524E66]">
              ·
            </span>
            <button
              type="button"
              onClick={() => onChangeView('trace')}
              className="inline-flex items-center gap-1 text-[#CFCAC0] hover:text-[#A8C5FF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded"
            >
              <Compass className="w-3.5 h-3.5 text-[#A8C5FF]" aria-hidden="true" />
              <span>Beep to Receipt</span>
            </button>
            <span aria-hidden="true" className="text-[#524E66]">
              ·
            </span>
            <button
              type="button"
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1 text-[#CFCAC0] hover:text-[#A8C5FF] transition-colors cursor-pointer font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded"
            >
              <Terminal className="w-3.5 h-3.5 text-[#A8C5FF]" aria-hidden="true" />
              <span>Shell</span>
            </button>
            <span aria-hidden="true" className="text-[#524E66]">
              ·
            </span>
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-1 text-[#A8C5FF] hover:text-[#F6F2E9] transition-colors cursor-pointer font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded"
            >
              <Command className="w-3 h-3" aria-hidden="true" />
              <span>Cmd/Ctrl + K</span>
            </button>
          </div>

          {showBackToTop && (
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#A8C5FF] hover:text-[#F6F2E9] transition-colors cursor-pointer font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
