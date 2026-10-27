import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Command, Volume2, VolumeX } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { audioFx } from '../utils/audioFx';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenResume, 
  onOpenCommandPalette,
  isAudioMuted,
  onToggleAudio
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Lab', href: '#lab' },
    { label: 'Systems', href: '#systems' },
    { label: 'Field Notes', href: '#experience' },
    { label: 'Case Studies', href: '#projects' },
    { label: 'Toolkit', href: '#skills' },
    { label: 'The Frontier', href: '#frontier' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    audioFx.playClick(500);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 76;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 no-print ${
        isScrolled
          ? 'bg-[#070A11]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Scroll Progress Bar at very top */}
      <div 
        className="h-[2px] bg-sky-400 transition-all duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, '#top')}
          className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-sky-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
        >
          <span className="w-7 h-7 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-mono text-xs font-semibold">
            AR
          </span>
          <span>{PERSONAL_INFO.displayName}</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-sky-400 hover:after:w-full after:transition-all after:duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 rounded-xs"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Interactive Controls (Cmd+K, Audio Toggle, Resume, Mobile Menu) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Quick HUD Search trigger */}
          <button
            type="button"
            onClick={() => {
              audioFx.playClick(600);
              onOpenCommandPalette();
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors"
            title="Search Commands & Routes (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Cmd+K</span>
          </button>

          {/* Audio FX Toggle */}
          <button
            type="button"
            onClick={() => {
              onToggleAudio();
            }}
            className={`p-1.5 rounded-md border text-xs transition-colors ${
              !isAudioMuted
                ? 'bg-sky-500/20 border-sky-500/50 text-sky-300'
                : 'bg-slate-900/80 border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={!isAudioMuted ? 'Mute Cybernetic Audio FX' : 'Enable Cybernetic Audio FX'}
            aria-label={!isAudioMuted ? 'Mute Cybernetic Audio FX' : 'Enable Cybernetic Audio FX'}
          >
            {!isAudioMuted ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Resume Viewer Button */}
          <button
            type="button"
            onClick={() => {
              audioFx.playClick(600);
              onOpenResume();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 rounded-md transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-sky-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            Connect
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => {
              audioFx.playClick(400);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0F1D] border-b border-slate-800 px-5 pt-3 pb-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 px-3 py-2.5 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center justify-between w-full text-left text-sm font-medium text-slate-200 bg-slate-800/80 px-3 py-2.5 rounded-md"
              >
                <span>View Technical Resume</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="text-center text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 py-2.5 rounded-md transition-colors"
              >
                Let's Connect
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
