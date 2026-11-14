import React from 'react';
import {
  ArrowRight,
  Terminal,
  Command,
  FileText,
  Compass,
  Network,
  Volume2,
  VolumeX,
  Briefcase,
  MapPin,
  Award,
} from 'lucide-react';
import { PROFILE } from '../data/universeContent';
import { VisitorCounter } from './VisitorCounter';
import { ActiveView } from './Navbar';

interface HeroSectionProps {
  activeView: ActiveView;
  onChangeView: (view: ActiveView) => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
  onNavigateSection: (id: string) => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeView,
  onChangeView,
  onOpenResume,
  onOpenTerminal,
  onOpenCommandPalette,
  onNavigateSection,
  isAudioMuted,
  onToggleAudio,
}) => {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="pt-8 sm:pt-12 pb-14 border-b border-[#323238]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Workspace Perspective Toolbar (Lives in Hero below top bar) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 mb-8 border-b border-[#323238]/70">
          <div
            role="group"
            aria-label="Workspace experience mode"
            className="inline-flex items-center p-1 bg-[#222226] border border-[#323238] rounded-lg overflow-x-auto max-w-full"
          >
            <button
              type="button"
              onClick={() => onChangeView('portfolio')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeView === 'portfolio'
                  ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/40'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              Universe Overview
            </button>
            <button
              type="button"
              onClick={() => onChangeView('trace')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeView === 'trace'
                  ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/40'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Beep to Receipt</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeView('atlas')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeView === 'atlas'
                  ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/40'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Full Atlas</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeView('plain')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeView === 'plain'
                  ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/40'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Print Spec</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleAudio}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/50 text-xs text-[#9CA3AF] hover:text-[#B0E0E6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={isAudioMuted ? 'Enable subtle sound cues' : 'Mute sound cues'}
            >
              {isAudioMuted ? (
                <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">{isAudioMuted ? 'Sound Off' : 'Sound On'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/50 text-xs font-mono text-[#D1D5DB] hover:text-[#B0E0E6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Open Command Palette (Ctrl+K or Cmd+K)"
            >
              <Command className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
              <span>Quick Jump</span>
              <kbd className="text-[11px] text-[#9CA3AF]">⌘K</kbd>
            </button>
          </div>
        </div>

        {/* Main 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Clear Identity, Headline, Recruiter Context, Primary Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 animate-fade-up">
            <div>
              <p className="text-sm font-medium text-[#B0E0E6] tracking-wide mb-3">
                {PROFILE.fullName} · {PROFILE.title}
              </p>

              <h1
                id="hero-heading"
                className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.12] mb-5"
              >
                Keeping business systems running.{' '}
                <span className="text-[#B0E0E6]">Exploring computing</span> beneath the surface.
              </h1>

              <p className="text-base sm:text-lg text-[#D1D5DB] leading-relaxed max-w-2xl">
                {PROFILE.recruiterSummary}
              </p>
            </div>

            {/* Clean Unboxed Metadata Row (Zero Pills) */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#9CA3AF]">
              <span className="inline-flex items-center gap-1.5 text-white font-medium">
                <Briefcase className="w-4 h-4 text-[#DC343B]" aria-hidden="true" />
                <span>{PROFILE.currentRole} at {PROFILE.currentCompany}</span>
              </span>
              <span aria-hidden="true" className="text-[#4B5563]">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
                <span>AWS Certified Cloud Practitioner</span>
              </span>
              <span aria-hidden="true" className="text-[#4B5563]">·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#9CA3AF]" aria-hidden="true" />
                <span>{PROFILE.location}</span>
              </span>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#DC343B] hover:bg-[#c52b31] text-white text-sm font-semibold transition-colors glow-poppy cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
              >
                <span>Open Resume</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#222226] hover:bg-[#2B2B30] text-[#B0E0E6] border border-[#B0E0E6]/40 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
              >
                <Terminal className="w-4 h-4" aria-hidden="true" />
                <span>Launch Terminal</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('constellation')}
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-[#D1D5DB] hover:text-[#B0E0E6] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Explore Tech Constellation</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Right Column: Personal Technology Dashboard & Genuine Visitor Counter */}
          <aside
            aria-label="Personal Technology Snapshot"
            className="lg:col-span-5 flex flex-col justify-between gap-4 bg-[#222226] border border-[#323238] rounded-2xl p-6 glow-powder"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#323238] pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6]">
                  Portfolio Dossier
                </span>
                <span className="text-xs font-mono text-[#9CA3AF]">
                  Selangor / KL · MY
                </span>
              </div>

              {/* Genuine Server-Backed Visitor Counter */}
              <VisitorCounter variant="card" />

              {/* Factual Snapshot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#1B1B1D] border border-[#323238]">
                  <div className="text-[#9CA3AF] mb-1">Primary Focus</div>
                  <div className="text-white font-semibold leading-snug">
                    POS Systems, App Triage & IT Operations
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1B1B1D] border border-[#323238]">
                  <div className="text-[#9CA3AF] mb-1">Academic Grounding</div>
                  <div className="text-white font-semibold leading-snug">
                    Diploma in CS & Mathematics (UiTM)
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1B1B1D] border border-[#323238]">
                  <div className="text-[#9CA3AF] mb-1">Active Study</div>
                  <div className="text-[#B0E0E6] font-semibold leading-snug">
                    UiPath RPA · ITIL 4 · Linux Internals
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1B1B1D] border border-[#323238]">
                  <div className="text-[#9CA3AF] mb-1">Architecture Motif</div>
                  <div className="text-white font-semibold leading-snug">
                    Beep to Receipt (6 Layers)
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Preview Trigger */}
            <button
              type="button"
              onClick={onOpenTerminal}
              className="w-full text-left p-3.5 rounded-xl bg-[#1B1B1D] border border-[#323238] hover:border-[#B0E0E6]/60 transition-colors font-mono text-xs group cursor-pointer"
            >
              <div className="flex items-center justify-between text-[#9CA3AF] mb-1.5">
                <span className="text-[#B0E0E6]">aries@universe:~$</span>
                <span className="text-[#DC343B] group-hover:translate-x-0.5 transition-transform">
                  Open Shell →
                </span>
              </div>
              <div className="text-[#D1D5DB] truncate">
                help · about · skills · experience · projects
              </div>
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};
