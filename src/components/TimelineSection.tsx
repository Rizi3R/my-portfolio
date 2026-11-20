import React, { useState } from 'react';
import { EXPERIENCES } from '../data/universeContent';
import { ChevronDown, ChevronUp, Briefcase } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'exp-emart24': true,
    'exp-hwc': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="experience"
      aria-labelledby="timeline-heading"
      className="scroll-mt-20 bg-[#0A0913] text-[#F6F2E9] py-16 sm:py-20 border-b border-[#242138]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#242138]">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-[#A8C5FF]">
              Work &amp; Internship History
            </p>
            <h2
              id="timeline-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#F6F2E9] tracking-tight"
            >
              Experience
            </h2>
          </div>
          <p className="text-sm text-[#CFCAC0] max-w-md leading-relaxed">
            My experience across application support, business systems, IT operations, and application development.
          </p>
        </div>

        {/* Open Editorial Role List */}
        <div className="divide-y divide-[#242138]">
          {EXPERIENCES.map((exp, idx) => {
            const isExpanded = Boolean(expandedIds[exp.id]);
            const isCurrent = idx === 0;
            const roleBadge = isCurrent
              ? 'Current Role'
              : exp.isInternship
              ? 'Diploma Internship'
              : 'Work Experience';

            return (
              <article key={exp.id} className="py-6 sm:py-8">
                <button
                  type="button"
                  onClick={() => toggleExpand(exp.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`${exp.id}-details`}
                  className="w-full text-left grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded-lg"
                >
                  {/* Left Metadata Column */}
                  <div className="lg:col-span-4 space-y-1.5">
                    <div className="inline-flex items-center gap-2 text-xs font-mono">
                      <Briefcase className="w-3.5 h-3.5 text-[#A8C5FF]" aria-hidden="true" />
                      <span className="text-[#A8C5FF] font-medium">{roleBadge}</span>
                    </div>
                    <div
                      className={`text-xs sm:text-sm font-mono ${
                        isCurrent ? 'text-[#F2A77D] font-semibold' : 'text-[#B5B0C2]'
                      }`}
                    >
                      {exp.period}
                    </div>
                    <p className="text-xs sm:text-sm text-[#CFCAC0]">
                      {exp.organization} · {exp.location}
                    </p>
                  </div>

                  {/* Right Role Summary & Toggle */}
                  <div className="lg:col-span-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1.5">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F6F2E9]">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-[#CFCAC0] leading-relaxed max-w-2xl">
                        {exp.summary}
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
                  <div
                    id={`${exp.id}-details`}
                    className="lg:grid lg:grid-cols-12 lg:gap-8 mt-5 pt-4 border-t border-[#242138]/70"
                  >
                    <div className="hidden lg:block lg:col-span-4" />
                    <div className="lg:col-span-8 space-y-4">
                      <ul className="space-y-2 text-sm text-[#E6E1D6] list-disc pl-5 leading-relaxed">
                        {exp.highlights.map((bullet, bulletIdx) => (
                          <li key={bulletIdx}>{bullet}</li>
                        ))}
                      </ul>

                      <div className="text-xs font-mono text-[#B5B0C2]">
                        <span className="text-[#A8C5FF] mr-2">Tools:</span>
                        <span>{exp.technologies.join(' · ')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
