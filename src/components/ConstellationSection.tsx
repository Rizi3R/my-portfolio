import React from 'react';
import { useI18n } from '../i18n';
import { ArrowRight } from 'lucide-react';

interface ConstellationSectionProps {
  onOpenFullAtlas?: (nodeId?: string) => void;
}

export const ConstellationSection: React.FC<ConstellationSectionProps> = ({
  onOpenFullAtlas,
}) => {
  const { t, content } = useI18n();

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
              {t.skills.eyebrow}
            </p>
            <h2
              id="constellation-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#F6F2E9] tracking-tight"
            >
              {t.skills.heading}
            </h2>
          </div>
          <p className="text-sm text-[#CFCAC0] max-w-md leading-relaxed">
            {t.skills.intro}
          </p>
        </div>

        {/* Clean 4-Group Grid without proficiency bars or scores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.skillGroups.map((group, idx) => (
            <div
              key={group.id}
              className={`space-y-4 ${
                idx > 0 ? 'lg:border-l lg:border-[#242138] lg:pl-7' : ''
              } ${idx % 2 === 1 ? 'sm:border-l sm:border-[#242138] sm:pl-7' : ''} pt-5 sm:pt-0 border-t sm:border-t-0 border-[#242138] first:border-t-0 first:pt-0`}
            >
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#F2A77D] uppercase tracking-wider">
                  0{idx + 1}
                </div>
                <h3 className="font-display text-xl font-bold text-[#F6F2E9]">
                  {group.title}
                </h3>
              </div>

              <ul className="space-y-2.5 text-sm text-[#E6E1D6] leading-relaxed">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#A8C5FF] font-mono text-xs mt-1 shrink-0" aria-hidden="true">
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
          <div className="pt-4 border-t border-[#242138] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#CFCAC0]">
            <span>{t.skills.atlasPrompt}</span>
            <button
              type="button"
              onClick={() => onOpenFullAtlas()}
              className="inline-flex items-center gap-1.5 text-[#A8C5FF] hover:text-[#F6F2E9] transition-colors cursor-pointer py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded"
            >
              <span>{t.skills.openAtlasCta}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
