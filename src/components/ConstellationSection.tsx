import React from 'react';
import { useI18n } from '../i18n';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CASE_METADATA } from '../data/caseExplorer';
import { CountUp } from './CountUp';

interface ConstellationSectionProps {
  onOpenFullAtlas?: (nodeId?: string) => void;
}

// Which case-study domains count as evidence for each skill group.
const GROUP_DOMAINS: Record<string, readonly string[]> = {
  'skill-application-support': ['applications'],
  'skill-business-systems': ['workplace', 'operations'],
  'skill-integration-data': ['integration', 'reporting', 'evaluation'],
  'skill-it-operations': ['infrastructure'],
};

// Bento placement: a tall hero tile, two stacked tiles beside it, one wide strip.
const TILE_LAYOUT = [
  'sm:col-span-2 lg:col-span-2 lg:row-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'sm:col-span-2 lg:col-span-4',
];

export const ConstellationSection: React.FC<ConstellationSectionProps> = ({
  onOpenFullAtlas,
}) => {
  const { t, content } = useI18n();
  const caseOrder = Object.keys(CASE_METADATA);

  return (
    <section
      id="constellation"
      aria-labelledby="constellation-heading"
      className="scroll-mt-20 bg-[#13161C] text-[#EEF4F8] py-16 sm:py-20 border-b border-[#2E3644]"
    >
      <div id="skills" className="scroll-mt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2E3644] pb-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs label-condensed text-[#B9D6E6]">
              {t.skills.eyebrow}
            </p>
            <h2
              id="constellation-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#EEF4F8] tracking-tight"
            >
              {t.skills.heading}
            </h2>
          </div>
          <p className="text-sm text-[#B4C2CF] max-w-md leading-relaxed">
            {t.skills.intro}
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.skillGroups.map((group, idx) => {
            const domains = GROUP_DOMAINS[group.id] ?? [];
            const evidence = content.caseStudies
              .filter((study) => domains.includes(CASE_METADATA[study.id]?.domain))
              .sort((a, b) => caseOrder.indexOf(a.id) - caseOrder.indexOf(b.id));
            const lead = evidence[0];
            const hero = idx === 0;

            return (
              <li
                key={group.id}
                data-glow
                data-tilt
                className={`bento-tile group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-[#2E3644] bg-[#1B2029] p-5 sm:p-6 ${TILE_LAYOUT[idx] ?? ''}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                  <div className="min-w-0 space-y-1">
                    <h3 className={`font-display font-bold text-[#EEF4F8] ${hero ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                      {group.title}
                    </h3>
                  </div>
                  {evidence.length > 0 && (
                    <p className="shrink-0 text-left sm:text-right">
                      <span className={`block font-display font-bold leading-none text-[#B9D6E6] ${hero ? 'text-5xl' : 'text-3xl'}`}>
                        <CountUp value={evidence.length} />
                      </span>
                      <span className="mt-1 block label-condensed text-[11px] text-[#B4C2CF]">
                        {t.skills.caseCount}
                      </span>
                    </p>
                  )}
                </div>

                <ul className="flex flex-wrap gap-2" aria-label={group.title}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="bento-chip rounded-full border border-[#323B49] bg-[#13161C]/60 px-3 py-1.5 text-xs text-[#DCE6EE]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {hero && evidence.length > 0 && (
                  <div className="mt-auto space-y-2 border-t border-[#2E3644] pt-4">
                    <p className="label-condensed text-[11px] text-[#B9D6E6]">{t.skills.provenIn}</p>
                    <ul className="space-y-1">
                      {evidence.slice(0, 4).map((study) => (
                        <li key={study.id}>
                          <a
                            href={`#${study.id}`}
                            className="evidence-link flex min-h-11 items-center justify-between gap-3 rounded-lg border border-transparent px-3 py-2 text-sm text-[#DCE6EE] transition-colors hover:border-[#3A4352] hover:bg-[#13161C]/60 hover:text-[#EEF4F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C]"
                          >
                            <span className="font-medium">{study.title}</span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-[#B9D6E6]" aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!hero && lead && (
                  <a
                    href={`#${lead.id}`}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-sm text-[#B4C2CF] transition-colors hover:text-[#EEF4F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C]"
                  >
                    <span className="label-condensed text-[11px] text-[#B9D6E6]">{t.skills.provenIn}</span>
                    <span className="font-medium underline decoration-[#3A4352] underline-offset-4 group-hover:decoration-[#B9D6E6]">
                      {lead.title}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {onOpenFullAtlas && (
          <div className="pt-4 border-t border-[#2E3644] flex flex-wrap items-center justify-between gap-4 text-xs label-condensed text-[#B4C2CF]">
            <span>{t.skills.atlasPrompt}</span>
            <button
              type="button"
              onClick={() => onOpenFullAtlas()}
              className="inline-flex min-h-11 items-center gap-1.5 text-[#B9D6E6] hover:text-[#EEF4F8] transition-colors cursor-pointer py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C] rounded"
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
