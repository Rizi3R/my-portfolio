import React from 'react';
import {
  FileText,
  FolderOpen,
  Briefcase,
  MapPin,
  Award,
} from 'lucide-react';
import { useI18n } from '../i18n';
import { SupportSystemDiagram } from './SupportSystemDiagram';

interface HeroSectionProps {
  onOpenResume: (trigger?: HTMLElement | null) => void;
  onOpenCaseStudy: (caseId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenCaseStudy,
}) => {
  const { t, content, format } = useI18n();

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="portfolio-hero scroll-mt-16 bg-[#0A0913] text-[#F6F2E9] pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-18 border-b border-[#242138]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Clear Positioning, Intro, CTAs, Deliberate Identity Strip */}
          <div className="relative z-10 lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <p className="text-sm sm:text-base font-medium text-[#A8C5FF] tracking-wide">
                {content.profile.displayName}
              </p>

              <h1
                id="hero-heading"
                className="font-display text-[2.4rem] sm:text-5xl xl:text-6xl font-bold text-[#F6F2E9] tracking-tight leading-[1.08] max-w-[20ch]"
              >
                {t.hero.positioningTitle.split(' ').map((word, i, words) => (
                  <span key={`${word}-${i}`} className="hero-word" style={{ '--i': i } as React.CSSProperties}>
                    {i < words.length - 1 ? `${word} ` : word}
                  </span>
                ))}
              </h1>

              <div className="h-px w-16 bg-[#F2A77D]" aria-hidden="true" />

              <p className="text-base sm:text-lg text-[#E6E1D6] leading-relaxed max-w-xl">
                {content.profile.intro}
              </p>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#featured-work"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenCaseStudy();
                }}
                className="motion-control inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-[#A8C5FF] hover:bg-[#bfd5ff] active:bg-[#9bb9fa] text-[#191723] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F2E9]"
              >
                <FolderOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.hero.viewCaseStudies}</span>
              </a>

              <button
                type="button"
                onClick={(e) => onOpenResume(e.currentTarget)}
                className="motion-control inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-transparent hover:bg-[#12101F] text-[#F6F2E9] border border-[#F6F2E9]/35 hover:border-[#A8C5FF] hover:text-[#A8C5FF] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
              >
                <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.hero.viewResume}</span>
              </button>
            </div>

            {/* Identity Details: Uncramped layout keeping icons aligned to first line */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-start gap-x-7 gap-y-3 pt-4 border-t border-[#242138] text-xs sm:text-sm text-[#CFCAC0]">
              <div className="sm:col-span-2 lg:col-span-1">
                <dt className="sr-only">{t.hero.currentRoleTerm}</dt>
                <dd className="flex items-start gap-2 font-medium text-[#F6F2E9]">
                  <Briefcase className="mt-0.5 size-4 shrink-0 text-[#F2A77D]" aria-hidden="true" />
                  {format(t.hero.currentRoleFormat, {
                    role: content.profile.currentRole,
                    company: content.profile.currentCompany,
                  })}
                </dd>
              </div>
              <div>
                <dt className="sr-only">{t.hero.locationTerm}</dt>
                <dd className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[#A8C5FF]" aria-hidden="true" />
                  {content.profile.location}
                </dd>
              </div>
              <div>
                <dt className="sr-only">{t.hero.certificationTerm}</dt>
                <dd className="flex items-start gap-2">
                  <Award className="mt-0.5 size-4 shrink-0 text-[#A8C5FF]" aria-hidden="true" />
                  {t.hero.certificationName}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Conceptual Support Workflow Illustration */}
          <div className="lg:col-span-5">
            <figure
              aria-labelledby="hero-diagram-caption"
              className="bg-[#12101F] border border-[#242138] rounded-2xl p-4 sm:p-5 space-y-3"
            >
              <figcaption
                id="hero-diagram-caption"
                className="pb-3 border-b border-[#242138] text-xs font-mono uppercase tracking-wider text-[#A8C5FF] font-semibold"
              >
                {t.hero.workflowCaption}
              </figcaption>

              <SupportSystemDiagram onOpenCaseStudy={onOpenCaseStudy} />

              {/* Readable Conceptual Troubleshooting Sequence */}
              <div className="pt-3.5 border-t border-[#242138] space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#CFCAC0]">
                  {t.hero.triageFlowLabel}
                </div>
                <ol className="list-decimal pl-6 space-y-1 text-xs sm:text-[13px] font-sans text-[#F6F2E9]">
                  {t.hero.triageSteps.map((step, index) => (
                    <li key={index} className="pl-1 leading-relaxed marker:text-[#F2A77D]">
                      {step}
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-[#CFCAC0] leading-relaxed">
                  {t.hero.diagramDisclaimer}
                </p>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
