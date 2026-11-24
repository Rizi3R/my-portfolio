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
                className={`bento-tile group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-[#242138] bg-[#12101F] p-5 sm:p-6 ${TILE_LAYOUT[idx] ?? ''}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                  <div className="min-w-0 space-y-1">
                    <div className="text-xs font-mono text-[#F2A77D] uppercase tracking-wider">0{idx + 1}</div>
                    <h3 className={`font-display font-bold text-[#F6F2E9] ${hero ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                      {group.title}
                    </h3>
                  </div>
                  {evidence.length > 0 && (
                    <p className="shrink-0 text-left sm:text-right">
                      <span className={`block font-display font-bold leading-none text-[#A8C5FF] ${hero ? 'text-5xl' : 'text-3xl'}`}>
                        <CountUp value={evidence.length} />
                      </span>
                      <span className="mt-1 block font-mono text-[11px] uppercase tracking-wider text-[#CFCAC0]">
                        {t.skills.caseCount}
                      </span>
                    </p>
                  )}
                </div>

                <ul className="flex flex-wrap gap-2" aria-label={group.title}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="bento-chip rounded-full border border-[#2E2A47] bg-[#0A0913]/60 px-3 py-1.5 text-xs text-[#E6E1D6]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {hero && evidence.length > 0 && (
                  <div className="mt-auto space-y-2 border-t border-[#242138] pt-4">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#F2A77D]">{t.skills.provenIn}</p>
                    <ul className="space-y-1">
                      {evidence.slice(0, 4).map((study) => (
                        <li key={study.id}>
                          <a
                            href={`#${study.id}`}
                            className="evidence-link flex min-h-11 items-center justify-between gap-3 rounded-lg border border-transparent px-3 py-2 text-sm text-[#E6E1D6] transition-colors hover:border-[#3A3654] hover:bg-[#0A0913]/60 hover:text-[#F6F2E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
                          >
                            <span className="font-medium">{study.title}</span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-[#A8C5FF]" aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!hero && lead && (
                  <a
                    href={`#${lead.id}`}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-sm text-[#CFCAC0] transition-colors hover:text-[#F6F2E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#F2A77D]">{t.skills.provenIn}</span>
                    <span className="font-medium underline decoration-[#3A3654] underline-offset-4 group-hover:decoration-[#A8C5FF]">
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
          <div className="pt-4 border-t border-[#242138] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#CFCAC0]">
            <span>{t.skills.atlasPrompt}</span>
            <button
              type="button"
              onClick={() => onOpenFullAtlas()}
              className="inline-flex min-h-11 items-center gap-1.5 text-[#A8C5FF] hover:text-[#F6F2E9] transition-colors cursor-pointer py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded"
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
