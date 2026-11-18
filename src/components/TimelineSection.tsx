import React, { useState } from 'react';
import {
  EXPERIENCES,
  EDUCATION,
  CERTIFICATIONS,
  LEARNING_ENTRIES,
} from '../data/universeContent';
import { ChevronDown, ChevronUp, Briefcase, GraduationCap, Award, Compass } from 'lucide-react';

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
    'exp-palaterium': true,
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
        return <Briefcase className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />;
      case 'credentials':
        return <GraduationCap className="w-4 h-4 text-white" aria-hidden="true" />;
      case 'learning':
        return <Compass className="w-4 h-4 text-[#DC343B]" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="experience"
      aria-labelledby="timeline-heading"
      className="scroll-mt-20 py-16 sm:py-20 border-b border-[#323238]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-2">
              02. Career &amp; Education
            </p>
            <h2
              id="timeline-heading"
              className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Experience, Education &amp; Credentials
            </h2>
            <p className="mt-2 text-sm text-[#D1D5DB] leading-relaxed">
              Expand any role or milestone to inspect responsibilities, tools used, internship scope, education, and active learning.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter career timeline"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#222226] border border-[#323238] rounded-lg self-start"
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
                    ? 'bg-[#DC343B] text-white'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative pl-6 sm:pl-10 space-y-5">
          <div
            aria-hidden="true"
            className="absolute left-2.5 sm:left-4 top-2 bottom-2 w-px bg-[#323238]"
          />

          {visibleMilestones.map((item) => {
            const isExpanded = Boolean(expandedIds[item.id]);

            return (
              <article
                key={item.id}
                className="relative bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/45 rounded-xl transition-colors"
              >
                <div
                  aria-hidden="true"
                  className={`absolute -left-[22px] sm:-left-[34px] top-6 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border ${
                    item.isCurrent
                      ? 'bg-[#DC343B] border-[#DC343B]'
                      : 'bg-[#1B1B1D] border-[#B0E0E6]/60'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.isCurrent ? 'bg-white' : 'bg-[#B0E0E6]'
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] rounded-xl"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono">
                      <span className="inline-flex items-center gap-1.5 text-[#B0E0E6] font-medium">
                        {getKindIcon(item.kind)}
                        <span>{item.badgeText}</span>
                      </span>
                      <span aria-hidden="true" className="text-[#4B5563]">
                        ·
                      </span>
                      <span className={item.isCurrent ? 'text-[#DC343B] font-semibold' : 'text-[#9CA3AF]'}>
                        {item.period}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#D1D5DB]">
                      {item.organization}
                      {item.location ? ` · ${item.location}` : ''}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B0E0E6] shrink-0 self-start sm:self-center">
                    <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#323238] space-y-4">
                    <p className="text-sm text-[#D1D5DB] leading-relaxed">{item.summary}</p>

                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="space-y-2 text-xs sm:text-sm text-[#D1D5DB] list-disc list-inside leading-relaxed">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )}

                    {item.technologies && item.technologies.length > 0 && (
                      <div className="pt-2 border-t border-[#323238]/70 text-xs text-[#9CA3AF]">
                        <span className="font-mono text-[#B0E0E6] mr-2">Tools &amp; Focus:</span>
                        <span>{item.technologies.join(' · ')}</span>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Education & Credentials Summary Strip */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#222226] border border-[#323238] flex flex-col justify-between gap-2">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs font-mono mb-1.5">
                <span className="text-[#9CA3AF]">{EDUCATION.institution}</span>
                <span className="text-white font-semibold">{EDUCATION.period}</span>
              </div>
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-[#B0E0E6] shrink-0 mt-0.5" aria-hidden="true" />
                <h4 className="text-sm font-semibold text-white leading-snug">{EDUCATION.degree}</h4>
              </div>
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">{EDUCATION.focus}</p>
          </div>

          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl bg-[#222226] border border-[#323238] flex flex-col justify-between gap-2"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono mb-1.5">
                  <span className="text-[#9CA3AF]">{cert.issuer}</span>
                  <span className="text-[#B0E0E6] font-semibold uppercase">{cert.status}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#B0E0E6] shrink-0 mt-0.5" aria-hidden="true" />
                  <h4 className="text-sm font-semibold text-white leading-snug">{cert.name}</h4>
                </div>
              </div>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">{cert.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
