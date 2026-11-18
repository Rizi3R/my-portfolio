import React from 'react';
import { FileText, FolderOpen, Briefcase, Award } from 'lucide-react';
import { PROFILE } from '../data/universeContent';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenCaseStudy: (caseId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenCaseStudy,
}) => {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative bg-[#0A0913] text-[#F6F2E9] pt-8 sm:pt-12 lg:pt-14 pb-10 sm:pb-12 lg:pb-14 border-b border-[#242138] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Intro, Controlled-Measure Headline, Primary Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <p className="text-sm sm:text-base font-medium text-[#F6F2E9] tracking-wide">
                {PROFILE.displayName}
              </p>

              <h1
                id="hero-heading"
                className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#F6F2E9] tracking-tight leading-[1.08] max-w-[16ch]"
              >
                {PROFILE.title}
              </h1>

              {/* One restrained Soft Copper accent rule */}
              <div className="h-px w-16 bg-[#F2A77D]" aria-hidden="true" />

              <p className="text-base sm:text-lg text-[#E6E1D6] leading-relaxed max-w-xl">
                {PROFILE.intro}
              </p>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#A8C5FF] hover:bg-[#bfd5ff] text-[#191723] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F2E9]"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>View Résumé</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenCaseStudy()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-transparent hover:bg-[#12101F] text-[#F6F2E9] border border-[#F6F2E9]/35 hover:border-[#A8C5FF] hover:text-[#A8C5FF] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
              >
                <FolderOpen className="w-4 h-4" aria-hidden="true" />
                <span>View Case Studies</span>
              </button>
            </div>

            {/* Quiet Supporting Credentials */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 text-xs sm:text-sm text-[#CFCAC0]">
              <span className="inline-flex items-center gap-1.5 text-[#F6F2E9] font-medium">
                <Briefcase className="w-4 h-4 text-[#F2A77D]" aria-hidden="true" />
                <span>
                  {PROFILE.currentRole} at {PROFILE.currentCompany}
                </span>
              </span>
              <span aria-hidden="true" className="text-[#524E66]">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#A8C5FF]" aria-hidden="true" />
                <span>AWS Certified Cloud Practitioner</span>
              </span>
            </div>
          </div>

          {/* Right Column (Desktop Only): Three Static Overlapping Angled Glass Panels */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:col-span-5 select-none pointer-events-none"
          >
            <div className="relative w-full h-[380px] xl:h-[420px] bg-[#0A0913]">
              {/* Subtle ambient depth glow */}
              <div className="absolute inset-8 rounded-full bg-[#A8C5FF]/[0.06] blur-3xl" />

              {/* Panel 1 (Back layer) */}
              <div className="absolute top-6 left-4 w-[66%] h-[70%] -rotate-6 rounded-2xl border border-[#A8C5FF]/25 bg-gradient-to-br from-[#A8C5FF]/[0.08] via-[#12101F]/70 to-[#0A0913]/90 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(168,197,255,0.2),0_24px_48px_-16px_rgba(0,0,0,0.7)]" />

              {/* Panel 2 (Mid layer with top specular edge highlight) */}
              <div className="absolute top-12 right-2 w-[68%] h-[72%] rotate-3 rounded-2xl border border-[#A8C5FF]/35 bg-gradient-to-br from-[#A8C5FF]/[0.14] via-[#151226]/65 to-[#0A0913]/85 backdrop-blur-md shadow-[inset_0_1px_0_rgba(246,242,233,0.22),0_28px_56px_-14px_rgba(0,0,0,0.78)] overflow-hidden">
                <div className="h-px w-full bg-gradient-to-r from-[#A8C5FF]/45 via-[#F6F2E9]/20 to-transparent" />
              </div>

              {/* Panel 3 (Front layer with specular highlight & single thin Soft Copper accent) */}
              <div className="absolute bottom-4 left-12 w-[62%] h-[48%] -rotate-2 rounded-2xl border border-[#A8C5FF]/50 bg-gradient-to-tr from-[#0A0913]/80 via-[#18152B]/60 to-[#A8C5FF]/[0.18] backdrop-blur-lg shadow-[inset_0_1px_0_rgba(246,242,233,0.28),0_24px_50px_-12px_rgba(0,0,0,0.85)] overflow-hidden">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#A8C5FF]/55 to-transparent" />
                <div className="mt-7 ml-7 h-px w-16 bg-[#F2A77D]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

