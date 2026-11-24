import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { useI18n } from '../i18n';
import { LanguageSelector } from './LanguageSelector';

export type ActiveView = 'portfolio' | 'trace' | 'atlas' | 'plain' | 'receipt';

interface NavbarProps {
  activeView: ActiveView;
  onChangeView: (view: ActiveView) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenResume: (trigger?: HTMLElement | null) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onChangeView,
  onNavigateSection,
  onOpenResume,
}) => {
  const { t, content } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const navLinks = [
    { id: 'featured-work', label: t.navigation.work },
    { id: 'experience', label: t.navigation.experience },
    { id: 'constellation', label: t.navigation.skills },
    { id: 'contact', label: t.navigation.contact },
  ];

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
          ? 'bg-[#13161C]/95 backdrop-blur-md border-b border-[#2E3644]'
          : 'bg-[#13161C]/92 backdrop-blur-sm border-b border-[#2E3644]/70'
      }`}
    >
      <div
        className="h-[2px] bg-[#B9D6E6] transition-transform duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t.accessibility.readingProgressLabel}
      />

      {/* Clean 3-Zone Editorial Bar: [Aries Razak] - [Work / Experience / Skills / Contact] - [Language + Résumé] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
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
          className="inline-flex min-h-11 items-center font-display text-lg font-bold tracking-tight text-[#EEF4F8] hover:text-[#B9D6E6] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] rounded px-1 py-1"
        >
          {content.profile.displayName}
        </a>

        <nav
          aria-label={t.accessibility.primaryNavLabel}
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#DCE6EE]"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="hover:text-[#B9D6E6] transition-colors whitespace-nowrap shrink-0 py-1.5 border-b border-transparent hover:border-[#B9D6E6]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:inline-flex">
            <LanguageSelector variant="header" />
          </div>

          <button
            type="button"
            onClick={(e) => {
              setMobileMenuOpen(false);
              onOpenResume(e.currentTarget);
            }}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 min-h-11 rounded-lg bg-[#B9D6E6] hover:bg-[#cfe3ee] active:bg-[#a6c8db] text-[#13161C] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EEF4F8]"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{t.navigation.resume}</span>
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-[#EEF4F8] hover:text-[#B9D6E6] border border-[#2E3644] cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C]"
            aria-label={mobileMenuOpen ? t.accessibility.closeMenu : t.accessibility.openMenu}
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
          aria-label={t.accessibility.mobileNavLabel}
          className="md:hidden bg-[#13161C] border-b border-[#2E3644] px-4 py-3 space-y-1 max-h-[82dvh] overflow-y-auto"
        >
          <LanguageSelector
            variant="mobile"
            onSelected={() => setMobileMenuOpen(false)}
          />
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="block w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-[#EEF4F8] hover:text-[#B9D6E6] hover:bg-[#1B2029] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
