import React from 'react';
import { SKILL_GROUPS } from '../data/universeContent';
import { ArrowRight } from 'lucide-react';

interface ConstellationSectionProps {
  onOpenFullAtlas?: (nodeId?: string) => void;
}

export const ConstellationSection: React.FC<ConstellationSectionProps> = ({
  onOpenFullAtlas,
}) => {
  return (
    <section
      id="constellation"
      aria-labelledby="constellation-heading"
      className="scroll-mt-20 bg-[#0A0913] text-[#F6F2E9] py-16 sm:py-20 border-b border-[#242138]"
    >
      <div id="skills" className="scroll-mt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#242138] pb-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-[#A8C5FF]">
              Capabilities
            </p>
            <h2
              id="constellation-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#F6F2E9] tracking-tight"
            >
              Skills
            </h2>
          </div>
          <p className="text-sm text-[#CFCAC0] max-w-md leading-relaxed">
            Core practical areas applied across application support, SaaS administration, integration configuration, and site operations.
          </p>
        </div>

        {/* Clean 4-Group Grid without proficiency bars or scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILL_GROUPS.map((group, idx) => (
            <div
              key={group.id}
              className={`space-y-4 ${
                idx > 0 ? 'lg:border-l lg:border-[#242138] lg:pl-8' : ''
              } ${idx % 2 === 1 ? 'md:border-l md:border-[#242138] md:pl-8 lg:pl-8' : ''} pt-4 md:pt-0 border-t md:border-t-0 border-[#242138] first:border-t-0 first:pt-0`}
            >
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[#F2A77D] uppercase tracking-wider">
                  0{idx + 1}
                </div>
                <h3 className="font-display text-xl font-bold text-[#F6F2E9]">
                  {group.title}
                </h3>
              </div>

              <ul className="space-y-2.5 text-sm text-[#E6E1D6] leading-relaxed">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#A8C5FF] font-mono text-xs mt-1" aria-hidden="true">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {onOpenFullAtlas && (
          <div className="pt-2 border-t border-[#242138] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#CFCAC0]">
            <span>
              Want to inspect how these tools connect across roles?
            </span>
            <button
              type="button"
              onClick={() => onOpenFullAtlas()}
              className="inline-flex items-center gap-1.5 text-[#A8C5FF] hover:text-[#F6F2E9] transition-colors cursor-pointer py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded"
            >
              <span>Open Skill Atlas in Interactive Lab</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
