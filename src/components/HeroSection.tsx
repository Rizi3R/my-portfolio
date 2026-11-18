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
  FolderOpen,
} from 'lucide-react';
import { PROFILE, CASE_STUDIES, EDUCATION } from '../data/universeContent';
import { ActiveView } from './Navbar';

interface HeroSectionProps {
  activeView: ActiveView;
  onChangeView: (view: ActiveView) => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
  onOpenCaseStudy: (caseId?: string) => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeView,
  onChangeView,
  onOpenResume,
  onOpenTerminal,
  onOpenCommandPalette,
  onOpenCaseStudy,
  isAudioMuted,
  onToggleAudio,
}) => {
  const featuredCases = CASE_STUDIES.filter((cs) => cs.featuredOnHome);

  return (
    <>
      <section
        id="top"
        aria-labelledby="hero-heading"
        className="pt-8 sm:pt-12 pb-14 border-b border-[#323238]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Secondary Views & Optional Controls Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-7 mb-8 border-b border-[#323238]/70">
            <div
              role="group"
              aria-label="Portfolio and walkthrough views"
              className="inline-flex items-center p-1 bg-[#222226] border border-[#323238] rounded-lg overflow-x-auto max-w-full"
            >
              <button
                type="button"
                onClick={() => onChangeView('portfolio')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer min-h-[36px] ${
                  activeView === 'portfolio'
                    ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/40'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => onChangeView('trace')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer min-h-[36px] ${
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
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer min-h-[36px] ${
                  activeView === 'atlas'
                    ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/40'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                <Network className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Skill Atlas</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeView('plain')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer min-h-[36px] ${
                  activeView === 'plain'
                    ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/40'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Plain Spec</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleAudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/50 text-xs text-[#9CA3AF] hover:text-[#B0E0E6] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px]"
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
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/50 text-xs font-mono text-[#D1D5DB] hover:text-[#B0E0E6] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px]"
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
            {/* Left Column: Core Identity, Exact Requested Intro, Primary & Secondary CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8 animate-fade-up">
              <div>
                <p className="text-sm font-medium text-[#B0E0E6] tracking-wide mb-3">
                  {PROFILE.fullName}
                </p>

                <h1
                  id="hero-heading"
                  className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-5"
                >
                  {PROFILE.title}
                </h1>

                <p className="text-base sm:text-lg text-[#D1D5DB] leading-relaxed max-w-2xl">
                  {PROFILE.intro}
                </p>
              </div>

              {/* Grounded Facts Metadata Row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#9CA3AF]">
                <span className="inline-flex items-center gap-1.5 text-white font-medium">
                  <Briefcase className="w-4 h-4 text-[#DC343B]" aria-hidden="true" />
                  <span>
                    {PROFILE.currentRole} at {PROFILE.currentCompany}
                  </span>
                </span>
                <span aria-hidden="true" className="text-[#4B5563]">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
                  <span>AWS Certified Cloud Practitioner</span>
                </span>
                <span aria-hidden="true" className="text-[#4B5563]">
                  ·
                </span>
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
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>View Resume</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenCaseStudy()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#222226] hover:bg-[#2B2B30] text-[#B0E0E6] border border-[#B0E0E6]/40 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
                >
                  <FolderOpen className="w-4 h-4" aria-hidden="true" />
                  <span>View Case Studies</span>
                </button>

                <button
                  type="button"
                  onClick={() => onChangeView('trace')}
                  className="inline-flex items-center gap-1.5 px-3 py-3 text-sm font-medium text-[#D1D5DB] hover:text-[#B0E0E6] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Beep to Receipt</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right Column: Concise Work Snapshot (No Visitor Counter Here) */}
            <aside
              aria-label="Work and experience snapshot"
              className="lg:col-span-5 flex flex-col justify-between gap-4 bg-[#222226] border border-[#323238] rounded-2xl p-6 glow-powder"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#323238] pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6]">
                    Work Snapshot
                  </span>
                  <span className="text-xs font-mono text-[#9CA3AF]">Current &amp; Prior</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#1B1B1D] border border-[#323238]">
                    <div className="flex items-center justify-between gap-2 text-[#B0E0E6] font-mono mb-1">
                      <span>emart24 Malaysia</span>
                      <span>Sep 2025 to present</span>
                    </div>
                    <div className="text-white font-semibold text-sm mb-1">
                      System Application Specialist
                    </div>
                    <p className="text-[#D1D5DB] leading-relaxed">
                      Xilnex POS &amp; payment troubleshooting, vendor and outlet coordination, and multiple new-store setups.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#1B1B1D] border border-[#323238]">
                    <div className="flex items-center justify-between gap-2 text-[#B0E0E6] font-mono mb-1">
                      <span>Palaterium Sdn Bhd</span>
                      <span>Apr 2024 to Aug 2025</span>
                    </div>
                    <div className="text-white font-semibold text-sm mb-1">
                      IT Support &amp; Lark Migration
                    </div>
                    <p className="text-[#D1D5DB] leading-relaxed">
                      Google Workspace to Lark migration support, Lark admin and approvals, onboarding, and NetSuite Excel data prep.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#1B1B1D] border border-[#323238]">
                    <div className="text-[#9CA3AF] font-mono mb-1">Education &amp; Credential</div>
                    <div className="text-white font-semibold leading-snug">
                      {EDUCATION.degree} ({EDUCATION.institution})
                    </div>
                    <div className="text-[#B0E0E6] mt-0.5">
                      AWS Certified Cloud Practitioner
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenTerminal}
                className="w-full text-left p-3.5 rounded-xl bg-[#1B1B1D] border border-[#323238] hover:border-[#B0E0E6]/60 transition-colors font-mono text-xs group cursor-pointer"
              >
                <div className="flex items-center justify-between text-[#9CA3AF] mb-1">
                  <span className="inline-flex items-center gap-1.5 text-[#B0E0E6]">
                    <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Optional Shell</span>
                  </span>
                  <span className="text-[#DC343B] group-hover:translate-x-0.5 transition-transform">
                    Open →
                  </span>
                </div>
                <div className="text-[#D1D5DB] truncate">
                  Query skills, work history, or run commands
                </div>
              </button>
            </aside>
          </div>
        </div>
      </section>

      {/* Immediate Next-Scroll Strip: Xilnex POS & Google Workspace to Lark Case Previews */}
      <section
        id="featured-cases"
        aria-labelledby="featured-cases-heading"
        className="scroll-mt-20 py-12 sm:py-14 border-b border-[#323238] bg-[#161618]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-1">
                Featured Case Previews
              </p>
              <h2
                id="featured-cases-heading"
                className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight"
              >
                POS Support &amp; Business Systems Work
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenCaseStudy()}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B0E0E6] hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>See all {CASE_STUDIES.length} case studies</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredCases.map((cs, index) => (
              <article
                key={cs.id}
                className="bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/45 rounded-2xl p-6 flex flex-col justify-between gap-5 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#9CA3AF]">
                    <span className="text-[#B0E0E6]">Case 0{index + 1}</span>
                    <span>{cs.organization}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-[#D1D5DB] leading-relaxed">{cs.issue}</p>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    <strong className="text-white font-medium">Contribution: </strong>
                    {cs.whatIDid[0]}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#323238] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#9CA3AF]">
                    {cs.technologies.slice(0, 3).join(' · ')}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenCaseStudy(cs.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#1B1B1D] hover:bg-[#2B2B30] border border-[#B0E0E6]/45 text-[#B0E0E6] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Open Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
