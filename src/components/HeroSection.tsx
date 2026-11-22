import React from 'react';
import {
  FileText,
  FolderOpen,
  Briefcase,
  MapPin,
  Award,
  Users,
  KeyRound,
  GitMerge,
  LifeBuoy,
} from 'lucide-react';
import { useI18n } from '../i18n';

interface HeroSectionProps {
  onOpenResume: (trigger?: HTMLElement | null) => void;
  onOpenCaseStudy: (caseId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenCaseStudy,
}) => {
  const { t, content, format } = useI18n();

  const supportNodes = [
    {
      id: 'users' as const,
      caseId: 'case-lark-migration',
      label: t.hero.nodes.users.label,
      detail: t.hero.nodes.users.detail,
      icon: Users,
    },
    {
      id: 'access' as const,
      caseId: 'case-lark-migration',
      label: t.hero.nodes.access.label,
      detail: t.hero.nodes.access.detail,
      icon: KeyRound,
    },
    {
      id: 'integrations' as const,
      caseId: 'case-integrations',
      label: t.hero.nodes.integrations.label,
      detail: t.hero.nodes.integrations.detail,
      icon: GitMerge,
    },
    {
      id: 'vendors' as const,
      caseId: 'case-pos-triage',
      label: t.hero.nodes.vendors.label,
      detail: t.hero.nodes.vendors.detail,
      icon: LifeBuoy,
    },
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="scroll-mt-16 bg-[#0A0913] text-[#F6F2E9] pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-18 border-b border-[#242138]"
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
                className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#F6F2E9] tracking-tight leading-[1.08] max-w-[20ch]"
              >
                {content.profile.title}
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
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-[#A8C5FF] hover:bg-[#bfd5ff] active:bg-[#9bb9fa] text-[#191723] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F2E9]"
              >
                <FolderOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.hero.viewCaseStudies}</span>
              </a>

              <button
                type="button"
                onClick={(e) => onOpenResume(e.currentTarget)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-transparent hover:bg-[#12101F] text-[#F6F2E9] border border-[#F6F2E9]/35 hover:border-[#A8C5FF] hover:text-[#A8C5FF] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
              >
                <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.hero.viewResume}</span>
              </button>
            </div>

            {/* Identity Details: Uncramped layout keeping icons aligned to first line */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-start gap-x-7 gap-y-3 pt-4 border-t border-[#242138] text-xs sm:text-sm text-[#CFCAC0]">
              <div className="flex items-start gap-2 sm:col-span-2 lg:col-span-1">
                <Briefcase className="w-4 h-4 text-[#F2A77D] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">{t.hero.currentRoleTerm}</dt>
                  <dd className="text-[#F6F2E9] font-medium">
                    {format(t.hero.currentRoleFormat, {
                      role: content.profile.currentRole,
                      company: content.profile.currentCompany,
                    })}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A8C5FF] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">{t.hero.locationTerm}</dt>
                  <dd>{content.profile.location}</dd>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#A8C5FF] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">{t.hero.certificationTerm}</dt>
                  <dd>{t.hero.certificationName}</dd>
                </div>
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

              {/* Central Systems Focus + Clean Connectors */}
              <div>
                <div className="rounded-xl border border-[#A8C5FF]/40 bg-[#0A0913] px-4 py-3 text-center">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#F2A77D]">
                    {t.hero.coreFocus}
                  </div>
                  <div className="font-display text-base sm:text-lg font-bold text-[#F6F2E9] mt-0.5 leading-snug">
                    {t.hero.coreFocusTitle}
                  </div>
                </div>

                {/* Desktop/Tablet 2-branch orthogonal connector */}
                <svg
                  className="hidden sm:block w-full h-5 text-[#242138]"
                  viewBox="0 0 320 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <line x1="160" y1="0" x2="160" y2="10" stroke="#A8C5FF" strokeOpacity="0.65" strokeWidth="1.5" />
                  <line x1="60" y1="10" x2="260" y2="10" stroke="#A8C5FF" strokeOpacity="0.35" strokeWidth="1.25" />
                  <line x1="60" y1="10" x2="60" y2="20" stroke="#A8C5FF" strokeOpacity="0.55" strokeWidth="1.5" />
                  <line x1="260" y1="10" x2="260" y2="20" stroke="#A8C5FF" strokeOpacity="0.55" strokeWidth="1.5" />
                </svg>

                {/* Mobile single vertical stem */}
                <div className="sm:hidden w-px h-3.5 mx-auto bg-[#A8C5FF]/55" aria-hidden="true" />

                {/* Four Connected Support Domains */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-stretch">
                  {supportNodes.map((node) => {
                    const Icon = node.icon;
                    return (
                      <a
                        href={`#${node.caseId}`}
                        onClick={(event) => {
                          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                          event.preventDefault();
                          onOpenCaseStudy(node.caseId);
                        }}
                        onPointerMove={(event) => {
                          if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                          const card = event.currentTarget;
                          const bounds = card.getBoundingClientRect();
                          card.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
                          card.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
                        }}
                        key={node.id}
                        className="support-map-link rounded-xl border border-[#242138] bg-[#0A0913] p-3 space-y-1 min-w-0 flex flex-col justify-start"
                      >
                        <div className="flex items-start gap-2 text-xs sm:text-[13px] font-mono font-semibold text-[#F6F2E9] leading-snug">
                          <Icon className="w-3.5 h-3.5 text-[#A8C5FF] shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="break-words min-w-0">{node.label}</span>
                          <span aria-hidden="true" className="ml-auto text-[#A8C5FF]">↗</span>
                        </div>
                        <p className="text-xs sm:text-[13px] text-[#E6E1D6] leading-relaxed break-words">
                          {node.detail}
                        </p>
                        <span className="sr-only">{content.caseStudies.find((study) => study.id === node.caseId)?.title}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

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
