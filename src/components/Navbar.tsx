import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Command, Volume2, VolumeX, FileText, Network, Compass, Receipt } from 'lucide-react';
import { PROFILE } from '../data/universeContent';
import { audioFx } from '../utils/audioFx';

export type ActiveView = 'trace' | 'atlas' | 'plain';

interface NavbarProps {
  activeView: ActiveView;
  onChangeView: (view: ActiveView) => void;
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeView,
  onChangeView,
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

  const handleSelectView = (view: ActiveView) => {
    audioFx.playClick(500);
    onChangeView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 print:hidden ${
        isScrolled
          ? 'bg-[#050811]/95 backdrop-blur-md border-b border-stone-800/90 shadow-xl shadow-black/40'
          : 'bg-[#050811]/80 backdrop-blur-sm border-b border-stone-800/50'
      }`}
    >
      {/* Scroll Progress Bar at very top */}
      <div 
        className="h-[2px] bg-cyan-400 transition-all duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleSelectView('trace')}
            className="flex items-center gap-2.5 text-stone-100 hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 font-mono text-sm sm:text-base font-bold cursor-pointer"
            aria-label="Aries Razak - Return to Top Trace View"
          >
            <span className="w-7 h-7 bg-stone-900 border border-stone-700 text-cyan-400 flex items-center justify-center text-xs font-bold">
              AR
            </span>
            <span className="hidden sm:inline">{PROFILE.displayName}</span>
          </button>
          <span className="hidden md:inline text-stone-600 font-mono text-xs">/</span>
          <span className="hidden md:inline text-stone-400 font-mono text-xs">Technology Universe</span>
        </div>

        {/* 3 Primary View Switchers (Trace · Atlas · Plain) */}
        <nav
          aria-label="Universe Perspectives"
          className="hidden md:flex items-center bg-stone-950 p-1 border border-stone-800 font-mono text-xs"
        >
          <button
            onClick={() => handleSelectView('trace')}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition-all cursor-pointer ${
              activeView === 'trace'
                ? 'bg-stone-800 text-cyan-300 border border-stone-700 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            aria-pressed={activeView === 'trace'}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Trace (Journey)</span>
          </button>

          <button
            onClick={() => handleSelectView('atlas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition-all cursor-pointer ${
              activeView === 'atlas'
                ? 'bg-stone-800 text-cyan-300 border border-stone-700 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            aria-pressed={activeView === 'atlas'}
          >
            <Network className="w-3.5 h-3.5 text-sky-400" />
            <span>Atlas (Graph)</span>
          </button>

          <button
            onClick={() => handleSelectView('plain')}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition-all cursor-pointer ${
              activeView === 'plain'
                ? 'bg-stone-800 text-cyan-300 border border-stone-700 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            aria-pressed={activeView === 'plain'}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Plain (Spec)</span>
          </button>
        </nav>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Quick Jump to Receipt */}
          <a
            href="#receipt"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-colors"
          >
            <Receipt className="w-3.5 h-3.5 text-cyan-400" />
            <span>Receipt</span>
          </a>

          {/* Audio Synthesizer Mute Toggle */}
          <button
            onClick={onToggleAudio}
            className="p-1.5 text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700 transition-colors cursor-pointer"
            aria-label={isAudioMuted ? 'Unmute Audio Cues' : 'Mute Audio Cues'}
            title={isAudioMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
            aria-label="Open Command Search Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5" />
            <span className="text-[10px] text-stone-500">⌘K</span>
          </button>

          {/* Verified Dossier Button */}
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-700/60 transition-colors cursor-pointer font-bold"
            aria-label="Open Verified ATS Resume Modal"
          >
            <span>Dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-400 hover:text-stone-100 border border-stone-800 cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050811] border-b border-stone-800 px-4 py-4 space-y-3 font-mono text-xs">
          <div className="text-[10px] uppercase text-stone-500 tracking-wider">
            Switch Perspective
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSelectView('trace')}
              className={`p-2.5 text-center border ${
                activeView === 'trace' ? 'bg-stone-800 text-cyan-300 border-cyan-500' : 'bg-stone-950 text-stone-400 border-stone-800'
              }`}
            >
              Trace (Journey)
            </button>
            <button
              onClick={() => handleSelectView('atlas')}
              className={`p-2.5 text-center border ${
                activeView === 'atlas' ? 'bg-stone-800 text-cyan-300 border-cyan-500' : 'bg-stone-950 text-stone-400 border-stone-800'
              }`}
            >
              Atlas (Graph)
            </button>
            <button
              onClick={() => handleSelectView('plain')}
              className={`p-2.5 text-center border ${
                activeView === 'plain' ? 'bg-stone-800 text-cyan-300 border-cyan-500' : 'bg-stone-950 text-stone-400 border-stone-800'
              }`}
            >
              Plain (Spec)
            </button>
          </div>

          <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
            <a
              href="#receipt"
              onClick={() => setMobileMenuOpen(false)}
              className="text-stone-300 hover:text-cyan-300 flex items-center gap-1.5 py-1"
            >
              <Receipt className="w-4 h-4 text-cyan-400" />
              <span>Thermal Receipt Output</span>
            </a>
            <button
              onClick={onOpenResume}
              className="text-cyan-400 font-bold"
            >
              Full Dossier →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
