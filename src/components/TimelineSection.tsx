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
  summary: string;
  bullets?: string[];
  technologies?: string[];
  badgeText: string;
}

export const TimelineSection: React.FC = () => {
  const [filter, setFilter] = useState<TimelineFilter>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'exp-emart24': true,
  });

  const milestones: TimelineMilestone[] = [
    ...EXPERIENCES.map((exp) => ({
      id: exp.id,
      kind: 'work' as const,
      period: exp.period,
      title: exp.role,
      organization: exp.organization,
      location: exp.location,
      isCurrent: exp.isCurrent,
      summary: exp.overview,
      bullets: exp.bullets,
      technologies: exp.technologies,
      badgeText: exp.isCurrent ? 'Current Role' : 'Professional Experience',
    })),
    {
      id: 'milestone-certs',
      kind: 'credentials',
      period: 'Verified & Ongoing',
      title: 'Industry Certifications & Technical Upskilling',
      organization: 'AWS · AI Teach Malaysia · ITIL 4',
      summary: 'Formal cloud certification, generative AI productivity upskilling, and active IT service management study.',
      bullets: CERTIFICATIONS.map(
        (c) => `${c.name} (${c.issuer}) — ${c.status}: ${c.credentialNote}`
      ),
      technologies: CERTIFICATIONS.map((c) => c.name),
      badgeText: 'Certifications',
    },
    {
      id: 'milestone-learning',
      kind: 'learning',
      period: 'Ongoing Study',
      title: 'Active Learning Milestones (UiPath RPA · ITIL 4 · Linux)',
      organization: 'Independent Technical Exploration',
      summary: 'Self-directed study frontiers complementing daily IT support and application operations.',
      bullets: LEARNING_ENTRIES.map((l) => `${l.topic}: ${l.note}`),
      technologies: LEARNING_ENTRIES.map((l) => l.topic),
      badgeText: 'Currently Learning',
    },
    {
      id: 'milestone-education',
      kind: 'credentials',
      period: EDUCATION.period,
      title: EDUCATION.degree,
      organization: EDUCATION.institution,
      location: EDUCATION.location,
      summary: 'Foundational computer science, relational database systems, networking, and discrete mathematics education.',
      bullets: EDUCATION.highlights,
      technologies: ['OOP', 'Database Systems', 'Computer Networks', 'Discrete Mathematics'],
      badgeText: 'Academic Foundation',
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
    <section id="experience" aria-labelledby="timeline-heading" className="py-16 sm:py-20 border-b border-[#323238]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-2">
              02. Career Timeline
            </p>
            <h2
              id="timeline-heading"
              className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Verified Experience & Milestones
            </h2>
            <p className="mt-2 text-sm text-[#D1D5DB] leading-relaxed">
              Expand any role or milestone to inspect detailed operational responsibilities, technologies used, and educational grounding.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            role="group"
            aria-label="Filter career timeline"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#222226] border border-[#323238] rounded-lg self-start"
          >
            {(
              [
                { id: 'all', label: 'All Milestones' },
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

        {/* Vertical Interactive Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-5">
          {/* Vertical Spine */}
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
                {/* Timeline Node Marker */}
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

                {/* Clickable Header */}
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
                      <span aria-hidden="true" className="text-[#4B5563]">·</span>
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
                    <span>{isExpanded ? 'Hide Details' : 'Inspect Role'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    )}
                  </div>
                </button>

                {/* Collapsible Details Body */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#323238] space-y-4">
                    <p className="text-sm text-[#D1D5DB] leading-relaxed">
                      {item.summary}
                    </p>

                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="space-y-2 text-xs sm:text-sm text-[#D1D5DB] list-disc list-inside leading-relaxed">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )}

                    {item.technologies && item.technologies.length > 0 && (
                      <div className="pt-2 border-t border-[#323238]/70 text-xs text-[#9CA3AF]">
                        <span className="font-mono text-[#B0E0E6] mr-2">Tools & Focus:</span>
                        <span>{item.technologies.join(' · ')}</span>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Compact Verified Credentials Footer Strip */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.name}
              className="p-4 rounded-xl bg-[#222226] border border-[#323238] flex flex-col justify-between gap-2"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono mb-1.5">
                  <span className="text-[#9CA3AF]">{cert.issuer}</span>
                  <span
                    className={
                      cert.status === 'Certified'
                        ? 'text-[#B0E0E6] font-semibold'
                        : cert.status === 'Completed'
                        ? 'text-white font-semibold'
                        : 'text-[#DC343B] font-semibold'
                    }
                  >
                    {cert.status}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#B0E0E6] shrink-0 mt-0.5" aria-hidden="true" />
                  <h4 className="text-sm font-semibold text-white leading-snug">{cert.name}</h4>
                </div>
              </div>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">{cert.credentialNote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
