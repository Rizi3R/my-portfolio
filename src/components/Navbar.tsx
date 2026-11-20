import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { PROFILE } from '../data/universeContent';

export type ActiveView = 'portfolio' | 'trace' | 'atlas' | 'plain' | 'receipt';

interface NavbarProps {
  activeView: ActiveView;
  onChangeView: (view: ActiveView) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenResume: (trigger?: HTMLElement | null) => void;
}

const NAV_LINKS = [
  { id: 'featured-work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'constellation', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onChangeView,
  onNavigateSection,
  onOpenResume,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setTimeout(() => menuButtonRef.current?.focus(), 20);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (activeView !== 'portfolio') {
      onChangeView('portfolio');
      setTimeout(() => onNavigateSection(sectionId), 90);
    } else {
      onNavigateSection(sectionId);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 print:hidden ${
        isScrolled
          ? 'bg-[#0A0913]/95 backdrop-blur-md border-b border-[#242138]'
          : 'bg-[#0A0913]/92 backdrop-blur-sm border-b border-[#242138]/70'
      }`}
    >
      <div
        className="h-[2px] bg-[#A8C5FF] transition-transform duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page reading progress"
      />

      {/* Clean 3-Zone Editorial Bar: [Aries Razak] - [Work / Experience / Skills / Contact] - [Résumé] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            if (activeView !== 'portfolio') {
              onChangeView('portfolio');
            } else {
              onNavigateSection('top');
            }
          }}
          className="font-display text-lg font-bold tracking-tight text-[#F6F2E9] hover:text-[#A8C5FF] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded px-1 py-1"
        >
          {PROFILE.displayName}
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-[#E6E1D6]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="hover:text-[#A8C5FF] transition-colors whitespace-nowrap shrink-0 py-1.5 border-b border-transparent hover:border-[#A8C5FF]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              setMobileMenuOpen(false);
              onOpenResume(e.currentTarget);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-lg bg-[#A8C5FF] hover:bg-[#bfd5ff] active:bg-[#9bb9fa] text-[#191723] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F2E9]"
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Résumé</span>
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-[#F6F2E9] hover:text-[#A8C5FF] border border-[#242138] cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-primary-nav"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-primary-nav"
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#0A0913] border-b border-[#242138] px-4 py-3 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="block w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-[#F6F2E9] hover:text-[#A8C5FF] hover:bg-[#12101F] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
