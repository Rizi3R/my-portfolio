import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/universeContent';

export type ActiveView = 'portfolio' | 'trace' | 'atlas' | 'plain';

interface NavbarProps {
  activeView: ActiveView;
  onChangeView: (view: ActiveView) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Timeline' },
  { id: 'constellation', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (activeView !== 'portfolio') {
      onChangeView('portfolio');
      setTimeout(() => onNavigateSection(sectionId), 80);
    } else {
      onNavigateSection(sectionId);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 print:hidden ${
        isScrolled
          ? 'bg-[#1B1B1D]/95 backdrop-blur-md border-b border-[#323238]'
          : 'bg-[#1B1B1D]/85 backdrop-blur-sm border-b border-[#323238]/60'
      }`}
    >
      {/* Subtle scroll progress bar in Powder Blue with Poppy Red lead edge */}
      <div
        className="h-[2px] bg-[#B0E0E6] transition-transform duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page reading progress"
      />

      {/* Strict 3-Zone Top Bar Contract: [Brand] — [5 single-line nav links] — [1 primary CTA] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onChangeView('portfolio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}
          className="font-display text-lg font-bold tracking-tight text-white hover:text-[#B0E0E6] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] rounded"
        >
          {PROFILE.displayName}
        </a>

        {/* Zone 2: Clean Single-Line Typography Nav Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#D1D5DB]"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleLinkClick(link.id)}
              className="hover:text-[#B0E0E6] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 border-b border-transparent hover:border-[#B0E0E6]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#DC343B] hover:bg-[#c52b31] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-[#D1D5DB] hover:text-white border border-[#323238] cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1B1B1D] border-b border-[#323238] px-4 py-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleLinkClick(link.id)}
              className="w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-[#D1D5DB] hover:text-[#B0E0E6] hover:bg-[#222226] transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
