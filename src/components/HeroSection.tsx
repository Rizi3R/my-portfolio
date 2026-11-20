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
import { PROFILE } from '../data/universeContent';

interface HeroSectionProps {
  onOpenResume: (trigger?: HTMLElement | null) => void;
  onOpenCaseStudy: (caseId?: string) => void;
}

const SUPPORT_NODES = [
  {
    id: 'users',
    label: 'Users',
    detail: 'Support and adoption',
    icon: Users,
  },
  {
    id: 'access',
    label: 'Access',
    detail: 'Onboarding and offboarding',
    icon: KeyRound,
  },
  {
    id: 'integrations',
    label: 'Integrations',
    detail: 'Configuration and sync',
    icon: GitMerge,
  },
  {
    id: 'vendors',
    label: 'Vendors',
    detail: 'Incident coordination',
    icon: LifeBuoy,
  },
];

const TRIAGE_SEQUENCE = [
  'Confirm symptoms',
  'Check relevant settings',
  'Resolve or escalate',
  'Verify status',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenCaseStudy,
}) => {
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
                {PROFILE.displayName}
              </p>

              <h1
                id="hero-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-bold text-[#F6F2E9] tracking-tight leading-[1.08] max-w-[19ch]"
              >
                {PROFILE.title}
              </h1>

              <div className="h-px w-16 bg-[#F2A77D]" aria-hidden="true" />

              <p className="text-base sm:text-lg text-[#E6E1D6] leading-relaxed max-w-xl">
                {PROFILE.intro}
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
                <FolderOpen className="w-4 h-4" aria-hidden="true" />
                <span>View Case Studies</span>
              </a>

              <button
                type="button"
                onClick={(e) => onOpenResume(e.currentTarget)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-transparent hover:bg-[#12101F] text-[#F6F2E9] border border-[#F6F2E9]/35 hover:border-[#A8C5FF] hover:text-[#A8C5FF] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>View Résumé</span>
              </button>
            </div>

            {/* Identity Details: Uncramped layout keeping icons aligned to first line */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-start gap-x-7 gap-y-3 pt-4 border-t border-[#242138] text-xs sm:text-sm text-[#CFCAC0]">
              <div className="flex items-start gap-2 sm:col-span-2 lg:col-span-1">
                <Briefcase className="w-4 h-4 text-[#F2A77D] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Current Role</dt>
                  <dd className="text-[#F6F2E9] font-medium">
                    {PROFILE.currentRole} at {PROFILE.currentCompany}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A8C5FF] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Location</dt>
                  <dd>{PROFILE.location}</dd>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#A8C5FF] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Certification</dt>
                  <dd>AWS Certified Cloud Practitioner</dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Right Column: Conceptual Support Workflow Illustration */}
          <div className="lg:col-span-5">
            <figure
              aria-labelledby="hero-diagram-caption"
              className="bg-[#12101F] border border-[#242138] rounded-2xl p-5 sm:p-6 space-y-5"
            >
              <figcaption
                id="hero-diagram-caption"
                className="pb-3 border-b border-[#242138] text-xs font-mono uppercase tracking-wider text-[#A8C5FF] font-semibold"
              >
                Illustrative support workflow
              </figcaption>

              {/* Central Systems Focus */}
              <div className="rounded-xl border border-[#A8C5FF]/40 bg-[#0A0913] px-4 py-3 text-center">
                <div className="text-xs font-mono uppercase tracking-wider text-[#F2A77D]">
                  Core Focus
                </div>
                <div className="font-display text-base sm:text-lg font-bold text-[#F6F2E9] mt-0.5">
                  Business Applications &amp; SaaS
                </div>
              </div>

              {/* Clean Static Orthogonal Connectors (SVG) */}
              <svg
                className="w-full h-5 block text-[#242138]"
                viewBox="0 0 320 20"
                fill="none"
                aria-hidden="true"
              >
                <line x1="160" y1="0" x2="160" y2="10" stroke="#A8C5FF" strokeOpacity="0.55" strokeWidth="1.25" />
                <line x1="60" y1="10" x2="260" y2="10" stroke="#242138" strokeWidth="1.25" />
                <line x1="60" y1="10" x2="60" y2="20" stroke="#A8C5FF" strokeOpacity="0.45" strokeWidth="1.25" />
                <line x1="260" y1="10" x2="260" y2="20" stroke="#A8C5FF" strokeOpacity="0.45" strokeWidth="1.25" />
              </svg>

              {/* Four Connected Support Domains */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 -mt-5">
                {SUPPORT_NODES.map((node) => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={node.id}
                      className="rounded-xl border border-[#242138] bg-[#0A0913] p-3.5 space-y-1"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#F6F2E9]">
                        <Icon className="w-3.5 h-3.5 text-[#A8C5FF] shrink-0" aria-hidden="true" />
                        <span>{node.label}</span>
                      </div>
                      <p className="text-xs text-[#CFCAC0] leading-snug">{node.detail}</p>
                    </div>
                  );
                })}
              </div>

              {/* Readable Conceptual Troubleshooting Sequence */}
              <div className="pt-3 border-t border-[#242138] space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#B5B0C2]">
                  Example triage flow
                </div>
                <ol className="flex flex-wrap items-center gap-1.5 text-xs font-sans text-[#E6E1D6]">
                  {TRIAGE_SEQUENCE.map((step, index) => (
                    <li key={step} className="inline-flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#0A0913] border border-[#242138] text-[#F6F2E9]">
                        {index + 1}. {step}
                      </span>
                      {index < TRIAGE_SEQUENCE.length - 1 && (
                        <span aria-hidden="true" className="text-[#F2A77D] font-mono">
                          →
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-[#B5B0C2] leading-snug">
                  Simplified conceptual illustration. Actual paths depend on the issue and whether vendor-side investigation is required.
                </p>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
