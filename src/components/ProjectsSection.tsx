import React from 'react';
import { CASE_STUDIES } from '../data/universeContent';
import { ChevronDown, ChevronUp, FlaskConical, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProjectsSectionProps {
  expandedCaseId: string | null;
  onSelectCaseId: (id: string | null) => void;
  onOpenLab: () => void;
  onOpenBeepToReceipt: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  expandedCaseId,
  onSelectCaseId,
  onOpenLab,
  onOpenBeepToReceipt,
}) => {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 py-16 sm:py-20 border-b border-[#323238]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-2">
              04. Case Studies &amp; Experiments
            </p>
            <h2
              id="projects-heading"
              className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Case Studies &amp; Interactive Walkthroughs
            </h2>
            <p className="mt-2 text-sm text-[#D1D5DB] leading-relaxed">
              Three focused examples of hands-on application support, Google Workspace to Lark migration assistance, and new-store readiness, alongside optional illustrative computing tools.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start">
            <button
              type="button"
              onClick={onOpenBeepToReceipt}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/50 text-[#B0E0E6] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Beep to Receipt</span>
            </button>
            <button
              type="button"
              onClick={onOpenLab}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#DC343B] hover:bg-[#c52b31] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <FlaskConical className="w-4 h-4" aria-hidden="true" />
              <span>Computing Lab</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {CASE_STUDIES.map((cs, index) => {
            const isExpanded = expandedCaseId === cs.id;

            return (
              <article
                key={cs.id}
                id={cs.id}
                className="scroll-mt-24 bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/40 rounded-2xl transition-colors"
              >
                <button
                  type="button"
                  onClick={() => onSelectCaseId(isExpanded ? null : cs.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
                >
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#9CA3AF]">
                      <span className="text-[#B0E0E6] font-semibold">Case 0{index + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cs.organization}</span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                      {cs.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                      {cs.issue}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B0E0E6] shrink-0 self-start sm:self-center">
                    <span>{isExpanded ? 'Collapse' : 'Read Case Study'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-4 border-t border-[#323238] grid grid-cols-1 lg:grid-cols-12 gap-6 text-sm">
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-1">
                          Context &amp; Issue
                        </h4>
                        <p className="text-[#D1D5DB] leading-relaxed text-xs sm:text-sm">
                          {cs.issue}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-1.5">
                          What I Did
                        </h4>
                        <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                          {cs.whatIDid.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-[#1B1B1D] border border-[#323238] rounded-xl p-5">
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
                          <span>Completed Scope &amp; Status</span>
                        </h4>
                        <p className="text-xs text-[#D1D5DB] leading-relaxed">
                          {cs.outcomeOrStatus}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#323238] text-xs font-mono text-[#9CA3AF]">
                        {cs.technologies.join(' · ')}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Optional Educational Computing Lab Strip */}
        <div className="bg-[#222226] border border-[#323238] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono text-[#DC343B] uppercase tracking-wider">
              Illustrative Client-Side Simulations
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Interactive Computing Workbench
            </h3>
            <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
              Optional educational simulations exploring packet routing steps, LRU vs. FIFO cache eviction, and UNIX permission bitmasks directly in the browser.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenLab}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1B1B1D] border border-[#B0E0E6]/50 hover:border-[#B0E0E6] text-[#B0E0E6] text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0"
          >
            <span>Open Computing Lab</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
