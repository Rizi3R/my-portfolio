import React from 'react';
import {
  FileText,
  FolderOpen,
  Briefcase,
  MapPin,
  Award,
} from 'lucide-react';
import { useI18n } from '../i18n';
import { CASE_METADATA } from '../data/caseExplorer';

interface HeroSectionProps {
  onOpenResume: (trigger?: HTMLElement | null) => void;
  onOpenCaseStudy: (caseId?: string) => void;
}

// Evidence states where the work reached a verified end. Investigations and
// assessments stay "open" in the queue so the page never overstates an outcome.
const CLOSED_EVIDENCE = new Set(['resolved', 'vendorRecovery', 'delivered']);

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenCaseStudy,
}) => {
  const { t, content, format } = useI18n();
  const explorer = t.caseExplorer;
  const studiesById = new Map(content.caseStudies.map((study) => [study.id, study]));
  const queue = Object.entries(CASE_METADATA).flatMap(([id, metadata]) => {
    const study = studiesById.get(id);
    return study ? [{ study, metadata }] : [];
  });

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="portfolio-hero scroll-mt-16 text-[#EEF4F8] pt-10 sm:pt-14 lg:pt-20 pb-14 sm:pb-20 border-b border-[#2E3644]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-base sm:text-lg font-medium text-[#B9D6E6]">
          {content.profile.displayName}
        </p>

        <h1
          id="hero-heading"
          className="display-wide mt-3 text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-[5.75rem] text-[#EEF4F8] max-w-[16ch]"
        >
          {t.hero.positioningTitle}
        </h1>

        <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base sm:text-lg text-[#DCE6EE] leading-relaxed max-w-[62ch]">
              {content.profile.intro}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#featured-work"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenCaseStudy();
                }}
                className="motion-control inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-md bg-[#B9D6E6] hover:bg-[#CFE3EE] active:bg-[#A6C8DB] text-[#13161C] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#13161C]"
              >
                <FolderOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.hero.viewCaseStudies}</span>
              </a>

              <button
                type="button"
                onClick={(e) => onOpenResume(e.currentTarget)}
                className="motion-control inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-md bg-transparent hover:bg-[#1B2029] text-[#EEF4F8] border border-[#EEF4F8]/35 hover:border-[#B9D6E6] hover:text-[#B9D6E6] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#13161C]"
              >
                <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.hero.viewResume}</span>
              </button>
            </div>
          </div>

          <dl className="lg:col-span-5 grid gap-3 text-sm text-[#B4C2CF] lg:border-l lg:border-[#2E3644] lg:pl-8">
            <div>
              <dt className="sr-only">{t.hero.currentRoleTerm}</dt>
              <dd className="flex items-start gap-2 font-medium text-[#EEF4F8]">
                <Briefcase className="mt-0.5 size-4 shrink-0 text-[#B9D6E6]" aria-hidden="true" />
                {format(t.hero.currentRoleFormat, {
                  role: content.profile.currentRole,
                  company: content.profile.currentCompany,
                })}
              </dd>
            </div>
            <div>
              <dt className="sr-only">{t.hero.locationTerm}</dt>
              <dd className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#B9D6E6]" aria-hidden="true" />
                {content.profile.location}
              </dd>
            </div>
            <div>
              <dt className="sr-only">{t.hero.certificationTerm}</dt>
              <dd className="flex items-start gap-2">
                <Award className="mt-0.5 size-4 shrink-0 text-[#B9D6E6]" aria-hidden="true" />
                {t.hero.certificationName}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-14 lg:mt-16" aria-labelledby="hero-queue-heading" role="region">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-8 pb-4">
            <h2
              id="hero-queue-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#EEF4F8] [font-stretch:87.5%]"
            >
              {t.hero.queueHeading}
            </h2>
            <p className="text-sm text-[#B4C2CF] max-w-[52ch] sm:text-right">
              {t.hero.queueIntro}
            </p>
          </div>

          <ul className="border-b border-[#2E3644]">
            {queue.map(({ study, metadata }, index) => (
              <li key={study.id}>
                <button
                  type="button"
                  className="queue-row"
                  onClick={() => onOpenCaseStudy(study.id)}
                >
                  <span className="queue-domain label-condensed text-sm text-[#97A4B3]">
                    {explorer.domains[metadata.domain]}
                  </span>
                  <span className="queue-title">{study.title}</span>
                  <span
                    className="queue-stamp"
                    data-closed={CLOSED_EVIDENCE.has(metadata.evidence) ? 'true' : 'false'}
                    style={{ '--i': index } as React.CSSProperties}
                  >
                    {explorer.evidence[metadata.evidence]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
