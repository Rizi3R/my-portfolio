import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
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
  const { t, content } = useI18n();
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
    <footer className="bg-[#13161C] border-t border-[#2E3644] py-8 relative no-print text-xs text-[#B4C2CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="font-display text-sm font-bold text-[#EEF4F8]">
            {content.profile.displayName}
          </span>
          <span aria-hidden="true" className="text-[#A7B5C3]">
            ·
          </span>
          <span>
            © {currentYear} {content.profile.fullName}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={`mailto:${content.profile.email}`}
            className="inline-flex min-h-11 items-center gap-1.5 text-[#B4C2CF] hover:text-[#B9D6E6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] rounded py-1"
          >
            <Mail className="w-3.5 h-3.5 text-[#B9D6E6]" aria-hidden="true" />
            <span>{t.footer.email}</span>
          </a>

          <a
            href={content.profile.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-[#B4C2CF] hover:text-[#B9D6E6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] rounded py-1"
          >
            <LinkedInIcon className="w-3.5 h-3.5 text-[#B9D6E6]" />
            <span>{t.footer.linkedIn}</span>
          </a>

          <button
            type="button"
            onClick={(e) => onOpenResume(e.currentTarget)}
            className="inline-flex min-h-11 items-center gap-1.5 text-[#B4C2CF] hover:text-[#B9D6E6] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] rounded py-1"
          >
            <FileText className="w-3.5 h-3.5 text-[#B9D6E6]" aria-hidden="true" />
            <span>{t.footer.resume}</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeView('plain')}
            className="inline-flex min-h-11 items-center gap-1.5 text-[#B4C2CF] hover:text-[#B9D6E6] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] rounded py-1"
          >
            <span>{t.footer.printableSummary}</span>
          </button>

          <button
            type="button"
            onClick={(e) => onOpenCommandPalette(e.currentTarget)}
            className="inline-flex min-h-11 items-center gap-1 text-[#B9D6E6] hover:text-[#EEF4F8] transition-colors cursor-pointer label-condensed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] rounded py-1"
          >
            <Command className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Cmd/Ctrl + K</span>
          </button>

          {showBackToTop && (
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex min-h-11 items-center gap-1 text-[#B9D6E6] hover:text-[#EEF4F8] transition-colors cursor-pointer label-condensed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] rounded py-1"
              aria-label={t.accessibility.backToTop}
            >
              <span>{t.footer.top}</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
