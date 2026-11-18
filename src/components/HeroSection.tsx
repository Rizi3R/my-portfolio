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
import { PROFILE, CASE_STUDIES, CORE_CAPABILITIES } from '../data/universeContent';
import { ActiveView } from './Navbar';

interface HeroSectionProps {
  onChangeView: (view: ActiveView) => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onOpenCommandPalette: () => void;
  onOpenCaseStudy: (caseId?: string) => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
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
        className="pt-6 sm:pt-9 pb-10 sm:pb-12 border-b border-[#323238]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Main 2-Column Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Aries Razak, Cross-Industry Headline, Requested Intro, Primary Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6 animate-fade-up">
              <div className="space-y-4">
                <p className="text-base sm:text-lg font-semibold text-[#B0E0E6] tracking-wide">
                  {PROFILE.displayName}
                </p>

                <h1
                  id="hero-heading"
                  className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]"
                >
                  {PROFILE.title}
                </h1>

                <p className="text-base sm:text-lg text-[#E5E7EB] leading-relaxed max-w-2xl">
                  {PROFILE.intro}
                </p>
              </div>

              {/* Clean Unboxed Context Metadata Row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-[#D1D5DB]">
                <span className="inline-flex items-center gap-1.5 text-white font-medium">
                  <Briefcase className="w-4 h-4 text-[#DC343B]" aria-hidden="true" />
                  <span>
                    {PROFILE.currentRole}, {PROFILE.currentCompany}
                  </span>
                </span>
                <span aria-hidden="true" className="text-[#6B7280]">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
                  <span>AWS Certified Cloud Practitioner</span>
                </span>
                <span aria-hidden="true" className="text-[#6B7280]">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
                  <span>{PROFILE.location}</span>
                </span>
              </div>

              {/* Primary CTAs + Quiet Secondary Links Below */}
              <div className="space-y-4 pt-1">
                <div className="flex flex-wrap items-center gap-3">
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
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#222226] hover:bg-[#2B2B30] text-[#B0E0E6] border border-[#B0E0E6]/60 hover:border-[#B0E0E6] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
                  >
                    <FolderOpen className="w-4 h-4" aria-hidden="true" />
                    <span>View Case Studies</span>
                  </button>
                </div>

                {/* Secondary Walkthrough, Atlas, Printable Summary & Quick Utilities */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 border-t border-[#323238]/80 text-xs">
                  <button
                    type="button"
                    onClick={() => onChangeView('trace')}
                    className="inline-flex items-center gap-1.5 py-1.5 font-medium text-[#E5E7EB] hover:text-[#B0E0E6] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] rounded"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
                    <span>Beep to Receipt (Educational Walkthrough)</span>
                  </button>

                  <span aria-hidden="true" className="text-[#4B5563]">
                    ·
                  </span>

                  <button
                    type="button"
                    onClick={() => onChangeView('atlas')}
                    className="inline-flex items-center gap-1.5 py-1.5 font-medium text-[#D1D5DB] hover:text-[#B0E0E6] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] rounded"
                  >
                    <Network className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
                    <span>Skill Atlas</span>
                  </button>

                  <span aria-hidden="true" className="text-[#4B5563]">
                    ·
                  </span>

                  <button
                    type="button"
                    onClick={() => onChangeView('plain')}
                    className="inline-flex items-center gap-1.5 py-1.5 font-medium text-[#D1D5DB] hover:text-[#B0E0E6] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] rounded"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#D1D5DB]" aria-hidden="true" />
                    <span>Printable Summary</span>
                  </button>

                  <span aria-hidden="true" className="text-[#4B5563]">
                    ·
                  </span>

                  <button
                    type="button"
                    onClick={onOpenTerminal}
                    className="inline-flex items-center gap-1.5 py-1.5 font-mono text-[#D1D5DB] hover:text-[#B0E0E6] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] rounded"
                  >
                    <Terminal className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
                    <span>Shell</span>
                  </button>

                  <span aria-hidden="true" className="text-[#4B5563]">
                    ·
                  </span>

                  <button
                    type="button"
                    onClick={onOpenCommandPalette}
                    className="inline-flex items-center gap-1 py-1.5 font-mono text-[#D1D5DB] hover:text-[#B0E0E6] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] rounded"
                    aria-label="Open Quick Jump Command Palette (Ctrl+K or Cmd+K)"
                  >
                    <Command className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
                    <span>⌘K</span>
                  </button>

                  <span aria-hidden="true" className="text-[#4B5563]">
                    ·
                  </span>

                  <button
                    type="button"
                    onClick={onToggleAudio}
                    className="inline-flex items-center gap-1 py-1.5 text-[#D1D5DB] hover:text-[#B0E0E6] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] rounded"
                    aria-label={isAudioMuted ? 'Enable subtle sound cues' : 'Mute sound cues'}
                  >
                    {isAudioMuted ? (
                      <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
                    )}
                    <span>{isAudioMuted ? 'Sound Off' : 'Sound On'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Three Capabilities Backed by Real Examples */}
            <aside
              aria-label="Core Capabilities"
              className="lg:col-span-5 flex flex-col justify-between gap-3 bg-[#222226] border border-[#323238] rounded-2xl p-5 sm:p-6 glow-powder"
            >
              <div className="flex items-center justify-between border-b border-[#323238] pb-3">
                <h2 className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] font-semibold">
                  Core Capabilities
                </h2>
                <span className="text-xs font-mono text-[#D1D5DB]">Xilnex · Lark · M365</span>
              </div>

              <div className="space-y-3">
                {CORE_CAPABILITIES.map((cap) => (
                  <div
                    key={cap.id}
                    className="p-3.5 rounded-xl bg-[#1B1B1D] border border-[#323238] space-y-1"
                  >
                    <div className="text-xs font-mono text-[#B0E0E6]">{cap.exampleTag}</div>
                    <h3 className="text-sm font-semibold text-white">{cap.title}</h3>
                    <p className="text-xs text-[#E5E7EB] leading-relaxed">{cap.description}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Featured Case Previews Immediately After Hero (Case 1: Lark Migration, Case 2: Xilnex Triage) */}
      <section
        id="featured-cases"
        aria-labelledby="featured-cases-heading"
        className="scroll-mt-20 py-10 sm:py-12 border-b border-[#323238] bg-[#161618]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-1">
                Featured Work
              </p>
              <h2
                id="featured-cases-heading"
                className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight"
              >
                SaaS Migration Leadership &amp; Application Support
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onOpenCaseStudy()}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B0E0E6] hover:text-white transition-colors cursor-pointer self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] rounded py-1"
            >
              <span>See all {CASE_STUDIES.length} case studies</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featuredCases.map((cs, index) => (
              <article
                key={cs.id}
                className="bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/50 rounded-2xl p-6 flex flex-col justify-between gap-5 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#D1D5DB]">
                    <span className="text-[#B0E0E6] font-semibold">Case 0{index + 1}</span>
                    <span>{cs.organization}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-[#E5E7EB] leading-relaxed">{cs.situation}</p>
                  <p className="text-xs text-[#D1D5DB] leading-relaxed">
                    <strong className="text-white font-semibold">Responsibility: </strong>
                    {cs.responsibility}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#323238] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono text-[#D1D5DB]">
                    {cs.technologies.slice(0, 3).join(' · ')}
                  </span>
                  <a
                    href={`#${cs.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenCaseStudy(cs.id);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1B1B1D] hover:bg-[#2B2B30] border border-[#B0E0E6]/60 hover:border-[#B0E0E6] text-[#B0E0E6] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
                  >
                    <span>Open Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
