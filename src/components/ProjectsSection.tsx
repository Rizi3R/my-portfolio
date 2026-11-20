import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/universeContent';
import {
  ChevronDown,
  ChevronUp,
  Link2,
  Check,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface ProjectsSectionProps {
  expandedCaseId: string | null;
  onSelectCaseId: (id: string | null) => void;
  onJumpToCase?: (id: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  expandedCaseId,
  onSelectCaseId,
  onJumpToCase,
}) => {
  const [copiedCaseId, setCopiedCaseId] = useState<string | null>(null);

  const primaryCase = CASE_STUDIES[0];
  const secondaryCases = CASE_STUDIES.slice(1);

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

  const renderCaseBody = (cs: (typeof CASE_STUDIES)[number]) => (
    <div
      id={`${cs.id}-body`}
      className="pt-5 mt-5 border-t border-[#DDD6C7] space-y-6 text-sm text-[#191723]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
            Context
          </h4>
          <p className="text-sm text-[#191723] leading-relaxed">{cs.situation}</p>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
            My role
          </h4>
          <p className="text-sm text-[#191723] leading-relaxed">{cs.responsibility}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
          Actions taken
        </h4>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#191723] leading-relaxed">
          {cs.whatIDid.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>

      {cs.triageBreakdown && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F6F2E9] border border-[#DDD6C7] rounded-xl p-4 sm:p-5">
          <div className="space-y-1.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#191723] font-bold">
              Checks I performed
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-[#191723] leading-relaxed">
              {cs.triageBreakdown.checksPerformed.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-1.5 md:border-l md:border-[#DDD6C7] md:pl-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#DDD6C7]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#191723] font-bold">
              Information I provided to the vendor
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-[#191723] leading-relaxed">
              {cs.triageBreakdown.providedToVendor.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-1.5 md:border-l md:border-[#DDD6C7] md:pl-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#DDD6C7]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#191723] font-bold">
              Findings or fixes that required vendor investigation
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-[#191723] leading-relaxed">
              {cs.triageBreakdown.vendorInvestigation.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {cs.outcome && (
        <div className="border-t border-[#DDD6C7] pt-4 space-y-1">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#191723]" aria-hidden="true" />
            <span>Outcome</span>
          </h4>
          <p className="text-sm text-[#191723] leading-relaxed">{cs.outcome}</p>
        </div>
      )}

      <div className="border-t border-[#DDD6C7] pt-4 space-y-1.5">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
          Tools used
        </h4>
        <div className="text-xs font-mono text-[#191723]">
          {cs.technologies.join(' · ')}
        </div>
      </div>

      {cs.supportingMaterial && (
        <div className="bg-[#F6F2E9] border border-[#CCC4B3] rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DDD6C7] pb-2.5">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#191723] font-bold">
                Supporting material: {cs.supportingMaterial.title}
              </h4>
              <p className="text-xs text-[#474457] mt-0.5">{cs.supportingMaterial.summary}</p>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#191723] bg-white border border-[#CCC4B3] px-2 py-0.5 rounded font-semibold shrink-0">
              {cs.supportingMaterial.label}
            </span>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm leading-relaxed">
            {cs.supportingMaterial.items.map((item) => (
              <div key={item.key}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-[#474457] font-semibold">
                  {item.key}
                </dt>
                <dd className="text-[#191723] mt-0.5">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );

  return (
    <section
      id="featured-work"
      aria-labelledby="featured-work-heading"
      className="scroll-mt-20 bg-[#F6F2E9] text-[#191723] py-14 sm:py-20 border-b border-[#DDD6C7]"
    >
      <div id="projects" className="scroll-mt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="sr-only" aria-live="polite" role="status">
          {copiedCaseId ? 'Direct link to case study copied to clipboard.' : ''}
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DDD6C7] pb-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[#474457] mb-1.5">
              Case Studies
            </p>
            <h2
              id="featured-work-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#191723] tracking-tight"
            >
              Selected Work
            </h2>
          </div>
          <p className="text-sm text-[#474457] max-w-md leading-relaxed">
            Four examples across SaaS migration leadership, third-party integration configuration, incident triage, and new-site IT readiness.
          </p>
        </div>

        {/* Lead Case Study: Google Workspace to Lark Migration */}
        {primaryCase && (
          <article
            id={primaryCase.id}
            aria-labelledby={`${primaryCase.id}-heading`}
            className="scroll-mt-24 bg-white border border-[#191723]/15 border-l-4 border-l-[#191723] rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
              <div className="space-y-2.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-mono text-[#474457]">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-[#191723] text-[#F6F2E9] font-semibold tracking-wide">
                    Case 01
                  </span>
                  <span>{primaryCase.organization}</span>
                  <span aria-hidden="true">·</span>
                  <span>{primaryCase.roleScope}</span>
                </div>

                <h3
                  id={`${primaryCase.id}-heading`}
                  className="font-display text-2xl sm:text-[2rem] font-bold text-[#191723] tracking-tight leading-tight"
                >
                  {primaryCase.title}
                </h3>

                <p className="text-sm sm:text-base text-[#191723] leading-relaxed">
                  {primaryCase.summaryLine}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => handleCopyCaseLink(e, primaryCase.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg bg-[#F6F2E9] hover:bg-[#EAE3D5] border border-[#CCC4B3] text-xs font-mono text-[#191723] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191723]"
                  aria-label={`Copy shareable link to ${primaryCase.title}`}
                >
                  {copiedCaseId === primaryCase.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copied</span>
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
                  onClick={() =>
                    onSelectCaseId(expandedCaseId === primaryCase.id ? null : primaryCase.id)
                  }
                  aria-expanded={expandedCaseId === primaryCase.id}
                  aria-controls={`${primaryCase.id}-body`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg bg-[#191723] hover:bg-[#2A273B] text-[#F6F2E9] text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191723]"
                >
                  <span>{expandedCaseId === primaryCase.id ? 'Collapse' : 'View Case Study'}</span>
                  {expandedCaseId === primaryCase.id ? (
                    <ChevronUp className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {expandedCaseId === primaryCase.id && renderCaseBody(primaryCase)}
          </article>
        )}

        {/* Secondary Case Studies */}
        <div className="divide-y divide-[#DDD6C7] border-t border-b border-[#DDD6C7]">
          {secondaryCases.map((cs, idx) => {
            const isExpanded = expandedCaseId === cs.id;
            const isCopied = copiedCaseId === cs.id;

            return (
              <article
                key={cs.id}
                id={cs.id}
                aria-labelledby={`${cs.id}-heading`}
                className="scroll-mt-24 py-6 sm:py-7"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[#474457]">
                      <span className="font-semibold text-[#191723]">Case 0{idx + 2}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cs.organization}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cs.roleScope}</span>
                    </div>

                    <h3
                      id={`${cs.id}-heading`}
                      className="font-display text-xl sm:text-2xl font-bold text-[#191723] tracking-tight"
                    >
                      <a
                        href={`#${cs.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (onJumpToCase) {
                            onJumpToCase(cs.id);
                          } else {
                            onSelectCaseId(isExpanded ? null : cs.id);
                          }
                        }}
                        className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191723] rounded"
                      >
                        {cs.title}
                      </a>
                    </h3>

                    <p className="text-sm text-[#474457] leading-relaxed">{cs.summaryLine}</p>

                    {cs.workflowSteps && cs.workflowSteps.length > 0 && (
                      <ol
                        aria-label="Integration workflow"
                        className="pt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs font-mono text-[#191723]"
                      >
                        {cs.workflowSteps.map((step, stepIdx) => (
                          <li key={step} className="inline-flex items-center gap-2">
                            <span className="font-semibold">
                              0{stepIdx + 1}. {step}
                            </span>
                            {stepIdx < cs.workflowSteps!.length - 1 && (
                              <ArrowRight
                                className="w-3.5 h-3.5 text-[#474457] shrink-0"
                                aria-hidden="true"
                              />
                            )}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleCopyCaseLink(e, cs.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg bg-white/70 hover:bg-white border border-[#DDD6C7] text-xs font-mono text-[#191723] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191723]"
                      aria-label={`Copy shareable link to ${cs.title}`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copied</span>
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
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg border border-[#191723]/30 hover:border-[#191723] text-xs font-semibold text-[#191723] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191723]"
                    >
                      <span>{isExpanded ? 'Collapse' : 'View Case Study'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                {isExpanded && renderCaseBody(cs)}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
