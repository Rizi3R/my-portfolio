import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { useSectionEntrance } from '../utils/useSectionEntrance';
import { ChevronDown, ChevronUp, Briefcase } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const { t, content } = useI18n();
  const headingRef = useSectionEntrance();
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
      className="scroll-mt-20 bg-[#13161C] text-[#EEF4F8] py-16 sm:py-20 border-b border-[#2E3644]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#2E3644]">
          <div ref={headingRef} className="max-w-2xl space-y-2">
            <p className="text-xs label-condensed text-[#B9D6E6]">
              {t.experience.eyebrow}
            </p>
            <h2
              id="timeline-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#EEF4F8] tracking-tight"
            >
              {t.experience.heading}
            </h2>
          </div>
          <p className="text-sm text-[#B4C2CF] max-w-md leading-relaxed">
            {t.experience.intro}
          </p>
        </div>

        {/* Open Editorial Role List */}
        <div className="divide-y divide-[#2E3644]">
          {content.experiences.map((exp, idx) => {
            const isExpanded = Boolean(expandedIds[exp.id]);
            const isCurrent = idx === 0;
            const roleBadge = isCurrent
              ? t.experience.currentRoleBadge
              : exp.isInternship
              ? t.experience.internshipBadge
              : t.experience.workExperienceBadge;

            return (
              <article key={exp.id} className="py-6 sm:py-8">
                <button
                  type="button"
                  onClick={() => toggleExpand(exp.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`${exp.id}-details`}
                  className="w-full text-left grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] rounded-lg"
                >
                  {/* Left Metadata Column */}
                  <div className="lg:col-span-4 space-y-1.5">
                    <div className="inline-flex items-center gap-2 text-xs label-condensed">
                      <Briefcase className="w-3.5 h-3.5 text-[#B9D6E6] shrink-0" aria-hidden="true" />
                      <span className="text-[#B9D6E6] font-medium">{roleBadge}</span>
                    </div>
                    <div
                      className={`text-xs sm:text-sm label-condensed ${
                        isCurrent ? 'text-[#B9D6E6] font-semibold' : 'text-[#A7B5C3]'
                      }`}
                    >
                      {exp.period}
                    </div>
                    <p className="text-xs sm:text-sm text-[#B4C2CF]">
                      {exp.organization} · {exp.location}
                    </p>
                  </div>

                  {/* Right Role Summary & Toggle */}
                  <div className="lg:col-span-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1.5">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#EEF4F8]">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-[#B4C2CF] leading-relaxed max-w-2xl">
                        {exp.summary}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs label-condensed text-[#B9D6E6] shrink-0 self-start sm:self-center">
                      <span>{isExpanded ? t.experience.hide : t.experience.details}</span>
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
                    className="lg:grid lg:grid-cols-12 lg:gap-8 mt-5 pt-4 border-t border-[#2E3644]/70"
                  >
                    <div className="hidden lg:block lg:col-span-4" />
                    <div className="lg:col-span-8 space-y-4">
                      <ul className="space-y-2 text-sm text-[#DCE6EE] list-disc pl-5 leading-relaxed">
                        {exp.highlights.map((bullet, bulletIdx) => (
                          <li key={bulletIdx}>{bullet}</li>
                        ))}
                      </ul>

                      <div className="text-xs label-condensed text-[#A7B5C3]">
                        <span className="text-[#B9D6E6] mr-2">{t.common.tools}</span>
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
