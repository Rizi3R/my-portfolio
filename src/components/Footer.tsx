import React, { useState, useEffect } from 'react';
import { PROFILE } from '../data/universeContent';
import { ArrowUp, Mail, FileText, Command } from 'lucide-react';
import { LinkedInIcon } from './LinkedInIcon';
import { ActiveView } from './Navbar';

interface FooterProps {
  onOpenResume: (trigger?: HTMLElement | null) => void;
  onOpenCommandPalette: (trigger?: HTMLElement | null) => void;
  onChangeView: (view: ActiveView) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenResume,
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
    <footer className="bg-[#0A0913] border-t border-[#242138] py-8 relative no-print text-xs text-[#CFCAC0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="font-display text-sm font-bold text-[#F6F2E9]">
            {PROFILE.displayName}
          </span>
          <span aria-hidden="true" className="text-[#B5B0C2]">
            ·
          </span>
          <span>
            © {currentYear} {PROFILE.fullName}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-1.5 text-[#CFCAC0] hover:text-[#A8C5FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded py-1"
          >
            <Mail className="w-3.5 h-3.5 text-[#A8C5FF]" aria-hidden="true" />
            <span>Email</span>
          </a>

          <a
            href={PROFILE.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#CFCAC0] hover:text-[#A8C5FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded py-1"
          >
            <LinkedInIcon className="w-3.5 h-3.5 text-[#A8C5FF]" />
            <span>LinkedIn</span>
          </a>

          <button
            type="button"
            onClick={(e) => onOpenResume(e.currentTarget)}
            className="inline-flex items-center gap-1.5 text-[#CFCAC0] hover:text-[#A8C5FF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded py-1"
          >
            <FileText className="w-3.5 h-3.5 text-[#F2A77D]" aria-hidden="true" />
            <span>Résumé</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeView('plain')}
            className="inline-flex items-center gap-1.5 text-[#CFCAC0] hover:text-[#A8C5FF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded py-1"
          >
            <span>Printable Summary</span>
          </button>

          <button
            type="button"
            onClick={(e) => onOpenCommandPalette(e.currentTarget)}
            className="inline-flex items-center gap-1 text-[#A8C5FF] hover:text-[#F6F2E9] transition-colors cursor-pointer font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded py-1"
          >
            <Command className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Cmd/Ctrl + K</span>
          </button>

          {showBackToTop && (
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#A8C5FF] hover:text-[#F6F2E9] transition-colors cursor-pointer font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded py-1"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
