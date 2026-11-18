import React, { useState } from 'react';
import {
  EXPERIENCES,
  EDUCATION,
  CERTIFICATIONS,
  LEARNING_ENTRIES,
} from '../data/universeContent';
import { ChevronDown, ChevronUp, Briefcase, GraduationCap, Compass } from 'lucide-react';

type TimelineFilter = 'all' | 'work' | 'credentials' | 'learning';

interface TimelineMilestone {
  id: string;
  kind: 'work' | 'credentials' | 'learning';
  period: string;
  title: string;
  organization: string;
  location?: string;
  isCurrent?: boolean;
  isInternship?: boolean;
  summary: string;
  bullets?: string[];
  technologies?: string[];
  badgeText: string;
}

export const TimelineSection: React.FC = () => {
  const [filter, setFilter] = useState<TimelineFilter>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'exp-emart24': true,
    'exp-hwc': true,
  });

  const milestones: TimelineMilestone[] = [
    ...EXPERIENCES.map((exp, idx) => ({
      id: exp.id,
      kind: 'work' as const,
      period: exp.period,
      title: exp.role,
      organization: exp.organization,
      location: exp.location,
      isCurrent: idx === 0,
      isInternship: exp.isInternship,
      summary: exp.summary,
      bullets: exp.highlights,
      technologies: exp.technologies,
      badgeText: idx === 0 ? 'Current Role' : exp.isInternship ? 'Internship Experience' : 'Work Experience',
    })),
    {
      id: 'milestone-education',
      kind: 'credentials',
      period: EDUCATION.period,
      title: EDUCATION.degree,
      organization: EDUCATION.institution,
      summary: EDUCATION.focus,
      technologies: ['Computer Science', 'Mathematics', 'Databases', 'Software Fundamentals'],
      badgeText: 'Education',
    },
    {
      id: 'milestone-certs',
      kind: 'credentials',
      period: 'Credentials & Program',
      title: 'Certifications & Completed Program',
      organization: 'Amazon Web Services · AI Teach Malaysia',
      summary: 'Cloud practitioner certification alongside a completed generative AI upskilling program.',
      bullets: CERTIFICATIONS.map(
        (c) => `${c.name} (${c.issuer}, ${c.status}): ${c.note}`
      ),
      technologies: CERTIFICATIONS.map((c) => c.name),
      badgeText: 'Credentials',
    },
    {
      id: 'milestone-learning',
      kind: 'learning',
      period: 'Current Focus',
      title: 'Active Learning: UiPath & RPA',
      organization: 'Self-Directed Study',
      summary: LEARNING_ENTRIES[0].note,
      technologies: ['UiPath', 'Robotic Process Automation (RPA)'],
      badgeText: 'Currently Learning',
    },
  ];

  const visibleMilestones = milestones.filter(
    (m) => filter === 'all' || m.kind === filter
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getKindIcon = (kind: TimelineMilestone['kind']) => {
    switch (kind) {
      case 'work':
        return <Briefcase className="w-3.5 h-3.5 text-[#A8C5FF]" aria-hidden="true" />;
      case 'credentials':
        return <GraduationCap className="w-3.5 h-3.5 text-[#F6F2E9]" aria-hidden="true" />;
      case 'learning':
        return <Compass className="w-3.5 h-3.5 text-[#F2A77D]" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="experience"
      aria-labelledby="timeline-heading"
      className="scroll-mt-20 bg-[#0A0913] text-[#F6F2E9] py-16 sm:py-20 border-b border-[#242138]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#242138]">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-[#A8C5FF]">
              Experience &amp; Education
            </p>
            <h2
              id="timeline-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#F6F2E9] tracking-tight"
            >
              Career Chronology &amp; Credentials
            </h2>
            <p className="text-sm text-[#CFCAC0] leading-relaxed">
              Expand any role or milestone to inspect responsibilities, systems used, internship scope, education, and active study.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter career timeline"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#12101F] border border-[#242138] rounded-lg self-start"
          >
            {(
              [
                { id: 'all', label: 'All Entries' },
                { id: 'work', label: 'Work History' },
                { id: 'credentials', label: 'Education & Certs' },
                { id: 'learning', label: 'Learning' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#A8C5FF] text-[#191723] font-semibold'
                    : 'text-[#CFCAC0] hover:text-[#F6F2E9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Open Editorial List Separated by Thin Hairline Rules */}
        <div className="divide-y divide-[#242138]">
          {visibleMilestones.map((item) => {
            const isExpanded = Boolean(expandedIds[item.id]);

            return (
              <article key={item.id} className="py-6 sm:py-8">
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded-lg"
                >
                  {/* Left Metadata Column */}
                  <div className="lg:col-span-4 space-y-1.5">
                    <div className="inline-flex items-center gap-2 text-xs font-mono">
                      {getKindIcon(item.kind)}
                      <span className="text-[#A8C5FF] font-medium">{item.badgeText}</span>
                    </div>
                    <div
                      className={`text-xs sm:text-sm font-mono ${
                        item.isCurrent ? 'text-[#F2A77D] font-semibold' : 'text-[#9A94A8]'
                      }`}
                    >
                      {item.period}
                    </div>
                    <p className="text-xs sm:text-sm text-[#CFCAC0]">
                      {item.organization}
                      {item.location ? ` · ${item.location}` : ''}
                    </p>
                  </div>

                  {/* Right Role & Expand Control */}
                  <div className="lg:col-span-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1.5">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F6F2E9]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#CFCAC0] leading-relaxed max-w-2xl">
                        {item.summary}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A8C5FF] shrink-0 self-start sm:self-center">
                      <span>{isExpanded ? 'Hide' : 'Details'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="lg:grid lg:grid-cols-12 lg:gap-8 mt-5 pt-4 border-t border-[#242138]/70">
                    <div className="hidden lg:block lg:col-span-4" />
                    <div className="lg:col-span-8 space-y-4">
                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="space-y-2 text-sm text-[#E6E1D6] list-disc pl-5 leading-relaxed">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      )}

                      {item.technologies && item.technologies.length > 0 && (
                        <div className="text-xs font-mono text-[#9A94A8]">
                          <span className="text-[#A8C5FF] mr-2">Tools &amp; Focus:</span>
                          <span>{item.technologies.join(' · ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Open Hairline-Divided Education & Credentials Strip */}
        <div className="mt-6 pt-8 border-t border-[#242138] grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#9A94A8]">
              <span>{EDUCATION.institution}</span>
              <span className="text-[#F6F2E9]">{EDUCATION.period}</span>
            </div>
            <h4 className="font-display text-base font-bold text-[#F6F2E9] leading-snug">
              {EDUCATION.degree}
            </h4>
            <p className="text-xs text-[#CFCAC0] leading-relaxed">{EDUCATION.focus}</p>
          </div>

          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="space-y-2 md:border-l md:border-[#242138] md:pl-8"
            >
              <div className="flex items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#9A94A8]">{cert.issuer}</span>
                <span className="text-[#A8C5FF] font-semibold uppercase">{cert.status}</span>
              </div>
              <h4 className="font-display text-base font-bold text-[#F6F2E9] leading-snug">
                {cert.name}
              </h4>
              <p className="text-xs text-[#CFCAC0] leading-relaxed">{cert.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
