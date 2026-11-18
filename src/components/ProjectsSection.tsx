import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/universeContent';
import {
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Compass,
  ArrowRight,
  Link2,
  Check,
  CheckCircle2,
} from 'lucide-react';

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
  const [copiedCaseId, setCopiedCaseId] = useState<string | null>(null);

  const handleCopyCaseLink = async (e: React.MouseEvent, caseId: string) => {
    e.stopPropagation();
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    url.searchParams.delete('case');
    url.hash = `#${caseId}`;
    const shareUrl = url.toString();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedCaseId(caseId);
      setTimeout(() => setCopiedCaseId(null), 2200);
    } catch {
      window.history.replaceState({}, '', `#${caseId}`);
    }
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 py-14 sm:py-16 border-b border-[#323238]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="sr-only" aria-live="polite" role="status">
          {copiedCaseId ? 'Direct link to case study copied to clipboard.' : ''}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-2">
              04. Case Studies &amp; Walkthroughs
            </p>
            <h2
              id="projects-heading"
              className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Case Studies &amp; Educational Walkthroughs
            </h2>
            <p className="mt-2 text-sm text-[#E5E7EB] leading-relaxed">
              Practical examples covering SaaS migration leadership, recurring POS application triage, and new-site IT readiness, alongside interactive learning tools.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start">
            <button
              type="button"
              onClick={onOpenBeepToReceipt}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#222226] border border-[#B0E0E6]/45 hover:border-[#B0E0E6] text-[#B0E0E6] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Beep to Receipt (Walkthrough)</span>
            </button>
            <button
              type="button"
              onClick={onOpenLab}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#DC343B] hover:bg-[#c52b31] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
            >
              <FlaskConical className="w-4 h-4" aria-hidden="true" />
              <span>Computing Lab</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {CASE_STUDIES.map((cs, index) => {
            const isExpanded = expandedCaseId === cs.id;
            const isCopied = copiedCaseId === cs.id;

            return (
              <article
                key={cs.id}
                id={cs.id}
                aria-labelledby={`${cs.id}-heading`}
                className="scroll-mt-24 bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/45 rounded-2xl transition-colors"
              >
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => onSelectCaseId(isExpanded ? null : cs.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`${cs.id}-body`}
                    className="flex-1 text-left space-y-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] rounded-lg"
                  >
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#D1D5DB]">
                      <span className="text-[#B0E0E6] font-semibold">Case 0{index + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cs.organization}</span>
                    </div>

                    <h3
                      id={`${cs.id}-heading`}
                      className="font-display text-lg sm:text-xl font-bold text-white"
                    >
                      {cs.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#E5E7EB] leading-relaxed max-w-3xl">
                      {cs.situation}
                    </p>
                  </button>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={(e) => handleCopyCaseLink(e, cs.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1B1B1D] border border-[#323238] hover:border-[#B0E0E6]/60 text-xs font-mono text-[#D1D5DB] hover:text-[#B0E0E6] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
                      aria-label={`Copy shareable link to ${cs.title}`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
                          <span className="text-[#B0E0E6]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectCaseId(isExpanded ? null : cs.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`${cs.id}-body`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1B1B1D] border border-[#323238] hover:border-[#B0E0E6]/60 text-xs font-mono text-[#B0E0E6] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
                    >
                      <span>{isExpanded ? 'Collapse' : 'Read Case'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div
                    id={`${cs.id}-body`}
                    className="px-5 sm:px-6 pb-6 pt-5 border-t border-[#323238] space-y-5 text-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6]">
                          The Situation
                        </h4>
                        <p className="text-[#E5E7EB] leading-relaxed text-xs sm:text-sm">
                          {cs.situation}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6]">
                          My Responsibility
                        </h4>
                        <p className="text-[#E5E7EB] leading-relaxed text-xs sm:text-sm">
                          {cs.responsibility}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6]">
                        What I Did
                      </h4>
                      <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#E5E7EB] leading-relaxed">
                        {cs.whatIDid.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>

                    {cs.outcome && (
                      <div className="bg-[#1B1B1D] border border-[#323238] rounded-xl p-4 space-y-1.5">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
                          <span>Outcome</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-[#E5E7EB] leading-relaxed">
                          {cs.outcome}
                        </p>
                      </div>
                    )}

                    <div className="pt-3 border-t border-[#323238] text-xs font-mono text-[#D1D5DB]">
                      {cs.technologies.join(' · ')}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Educational Walkthrough & Computing Lab Strip */}
        <div className="bg-[#222226] border border-[#323238] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono text-[#B0E0E6] uppercase tracking-wider">
              Educational Walkthrough &amp; Interactive Sandbox
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              Beep to Receipt &amp; Computing Workbench
            </h3>
            <p className="text-xs sm:text-sm text-[#E5E7EB] leading-relaxed">
              Separate from employer experience: explore an educational 6-layer retail checkout model or test client-side routing, cache eviction, and permission bitmask simulations in the browser.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenBeepToReceipt}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1B1B1D] border border-[#B0E0E6]/60 hover:border-[#B0E0E6] text-[#B0E0E6] text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
            >
              <span>Beep to Receipt</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onOpenLab}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1B1B1D] border border-[#323238] hover:border-[#B0E0E6]/60 text-white hover:text-[#B0E0E6] text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
            >
              <span>Open Computing Lab</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
