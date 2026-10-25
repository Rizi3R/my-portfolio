import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Terminal as TerminalIcon, 
  CheckCircle2, 
  Play, 
  RotateCcw,
  Sparkles,
  Command,
  HelpCircle,
  Mail
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [activeCommand, setActiveCommand] = useState<string>('profile');
  const [terminalOutput, setTerminalOutput] = useState<string>('default');

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
    <section id="top" className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
      {/* Background radial gradient accent */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-600/10 blur-[130px] pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Introduction */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Eyebrow: Zero-pill discipline (plain text with typographic separators) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-sky-400 uppercase mb-4">
              <span>IT Support</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Application Systems</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>IT Operations</span>
            </div>

            {/* Main Headline */}
            <h1 
              style={{ textWrap: 'balance' } as React.CSSProperties}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.12] mb-6"
            >
              {PERSONAL_INFO.tagline}
            </h1>

            {/* Prominent Name & Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-4 max-w-2xl">
              I'm <strong className="font-bold text-white">{PERSONAL_INFO.displayName}</strong>. {PERSONAL_INFO.shortBio}
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-2xl">
              From application support and multi-site POS systems to enterprise SaaS governance and hands-on networking, I investigate root causes, translate user issues into actionable technical clarity, and help technology operate reliably.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#projects"
                onClick={(e) => handleLinkClick(e, '#projects')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-md transition-all duration-150 shadow-md shadow-sky-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <span>Get In Touch</span>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Resume</span>
              </button>
            </div>

            {/* Verified Credentials Bar */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-medium">AWS Certified Cloud Practitioner</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>CS & Mathematics (UiTM)</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Compact Interactive Terminal Panel */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#090D18] border border-slate-800 rounded-xl shadow-2xl overflow-hidden font-mono text-xs">
              
              {/* Terminal Title Bar */}
              <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                  </div>
                  <span className="text-slate-400 text-[11px] ml-2">
                    ARIES.EXE / PROFESSIONAL PROFILE
                  </span>
                </div>
                <span className="text-[10px] text-sky-400 font-semibold">
                  v2.6-PROD
                </span>
              </div>

              {/* Terminal Body Content */}
              <div className="p-5 space-y-4 text-slate-300">
                
                {/* Fixed Profile Overview Table */}
                <div className="space-y-1.5 text-xs pb-3 border-b border-slate-800/80">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Application Support</span>
                    <span className="text-emerald-400 font-semibold">EXPERIENCE</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">IT Operations</span>
                    <span className="text-emerald-400 font-semibold">EXPERIENCE</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Business Systems</span>
                    <span className="text-emerald-400 font-semibold">EXPERIENCE</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Infrastructure Support</span>
                    <span className="text-emerald-400 font-semibold">EXPERIENCE</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Cloud Technologies</span>
                    <span className="text-sky-400 font-semibold">LEARNING</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-400">STATUS:</span>
                  <span className="text-sky-300 font-bold tracking-wider">
                    READY TO EXPLORE
                  </span>
                </div>

                {/* Interactive Command Prompt Output Area */}
                <div className="bg-slate-950/80 rounded-md p-3 border border-slate-800 text-[11px] min-h-[92px] flex flex-col justify-between">
                  {activeCommand === 'profile' && (
                    <div>
                      <span className="text-slate-500">$ aries --positioning</span>
                      <p className="text-slate-200 mt-1 leading-relaxed">
                        "I support, troubleshoot, and improve the technology that helps businesses operate."
                      </p>
                    </div>
                  )}
                  {activeCommand === 'stack' && (
                    <div>
                      <span className="text-slate-500">$ aries --stack</span>
                      <p className="text-sky-300 mt-1 leading-relaxed">
                        Xilnex POS · Lark Super Admin · Microsoft 365 · TCP/IP · Freshdesk · TeamViewer · MySQL · Laravel · AWS Cloud Practitioner
                      </p>
                    </div>
                  )}
                  {activeCommand === 'contact' && (
                    <div>
                      <span className="text-slate-500">$ aries --contact</span>
                      <p className="text-emerald-300 mt-1 leading-relaxed">
                        Email: ariesirhan25@gmail.com | LinkedIn: /in/aries-razak-a36045256
                      </p>
                    </div>
                  )}
                  {activeCommand === 'help' && (
                    <div>
                      <span className="text-slate-500">$ aries --help</span>
                      <p className="text-slate-300 mt-1 leading-relaxed">
                        Click buttons below or scroll to explore 5 real technical missions & interactive timeline.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-slate-500 pt-2 text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    <span>Interactive console demo (non-blocking)</span>
                  </div>
                </div>

                {/* Interactive Command Prompt Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-slate-500 text-[10px] mr-1">RUN:</span>
                  <button
                    type="button"
                    onClick={() => setActiveCommand('profile')}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeCommand === 'profile'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    --profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCommand('stack')}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeCommand === 'stack'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    --stack
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCommand('contact')}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeCommand === 'contact'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    --contact
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCommand('help')}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeCommand === 'help'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    --help
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
