import React, { useState } from 'react';
import { buildUrlWithLocale, useI18n } from '../i18n';
import { useSectionEntrance } from '../utils/useSectionEntrance';
import type { CaseStudy } from '../data/universeContent';
import { copyTextToClipboard } from '../utils/clipboard';
import { MigrationIllustration } from './MigrationIllustration';
import {
  ChevronDown,
  ChevronUp,
  Link2,
  Check,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
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
  const { locale, t, content, format } = useI18n();
  const headingRef = useSectionEntrance();
  const [copiedCaseId, setCopiedCaseId] = useState<string | null>(null);
  const [copyErrorCaseId, setCopyErrorCaseId] = useState<string | null>(null);
  const [copyAnnouncement, setCopyAnnouncement] = useState('');

  const primaryCase = content.caseStudies[0];
  const secondaryCases = content.caseStudies.slice(1);

  const handleCopyCaseLink = async (e: React.MouseEvent, caseId: string, title: string) => {
    e.stopPropagation();
    const shareUrl = buildUrlWithLocale(window.location.href, locale, {
      hashOverride: `#${caseId}`,
      deleteParams: ['view', 'case'],
    });

    const ok = await copyTextToClipboard(shareUrl);
    if (ok) {
      setCopyErrorCaseId(null);
      setCopiedCaseId(caseId);
      setCopyAnnouncement(format(t.caseStudies.copiedAnnouncement, { title }));
      setTimeout(() => {
        setCopiedCaseId(null);
        setCopyAnnouncement('');
      }, 2400);
    } else {
      window.history.replaceState({}, '', shareUrl);
      setCopiedCaseId(null);
      setCopyErrorCaseId(caseId);
      setCopyAnnouncement(format(t.caseStudies.copyFallbackAnnouncement, { id: caseId }));
      setTimeout(() => {
        setCopyErrorCaseId(null);
        setCopyAnnouncement('');
      }, 3000);
    }
  };

  const renderCaseOutcome = (cs: CaseStudy) => cs.outcome && (
    <div className="flex max-w-3xl items-start gap-2.5 rounded-lg border border-[#DDD6C7] bg-[#F6F2E9] px-3.5 py-3">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#191723]" aria-hidden="true" />
      <div className="space-y-1">
        <p className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
          {cs.outcomeLabel}
        </p>
        <p className="text-sm leading-relaxed text-[#191723]">{cs.outcome}</p>
      </div>
    </div>
  );

  const renderCaseBody = (cs: CaseStudy) => (
    <div className="pt-5 mt-5 border-t border-[#DDD6C7] space-y-6 text-sm text-[#191723]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
            {t.caseStudies.contextLabel}
          </h4>
          <p className="text-sm text-[#191723] leading-relaxed">{cs.situation}</p>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
            {t.caseStudies.myRoleLabel}
          </h4>
          <p className="text-sm text-[#191723] leading-relaxed">{cs.responsibility}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
          {t.caseStudies.actionsTakenLabel}
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
              {t.caseStudies.checksPerformedLabel}
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-[#191723] leading-relaxed">
              {cs.triageBreakdown.checksPerformed.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-1.5 md:border-l md:border-[#DDD6C7] md:pl-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#DDD6C7]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#191723] font-bold">
              {t.caseStudies.providedToVendorLabel}
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-[#191723] leading-relaxed">
              {cs.triageBreakdown.providedToVendor.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-1.5 md:border-l md:border-[#DDD6C7] md:pl-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#DDD6C7]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#191723] font-bold">
              {t.caseStudies.vendorScopeLabel}
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-[#191723] leading-relaxed">
              {cs.triageBreakdown.vendorInvestigation.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="border-t border-[#DDD6C7] pt-4 space-y-1.5">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
          {t.caseStudies.toolsUsedLabel}
        </h4>
        <div className="text-xs font-mono text-[#191723]">{cs.technologies.join(' · ')}</div>
      </div>
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
          {copyAnnouncement}
        </div>

        {/* Section Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#DDD6C7] pb-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[#474457] mb-1.5">
              {t.caseStudies.eyebrow}
            </p>
            <h2
              id="featured-work-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#191723] tracking-tight"
            >
              {t.caseStudies.heading}
            </h2>
          </div>
          <p className="text-sm text-[#474457] max-w-md leading-relaxed">
            {t.caseStudies.intro}
          </p>
        </div>

        {/* Lead Case Study: Google Workspace to Lark Migration */}
        {primaryCase && (
          <article
            id={primaryCase.id}
            aria-labelledby={`${primaryCase.id}-heading`}
            className="scroll-mt-24 bg-white border border-[#191723]/15 rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            {primaryCase.id === 'case-lark-migration' && <MigrationIllustration />}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
              <div className="space-y-2.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#474457]">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-[#191723] text-[#F6F2E9] font-mono font-semibold tracking-wide">
                    {format(t.caseStudies.caseLabelPrefix, { number: '01' })}
                  </span>
                  <span className="font-medium text-[#191723]">{primaryCase.organization}</span>
                </div>

                <h3
                  id={`${primaryCase.id}-heading`}
                  className="font-display text-2xl sm:text-[2rem] font-bold text-[#191723] tracking-tight leading-tight"
                >
                  <a
                    href={`#${primaryCase.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onJumpToCase) {
                        onJumpToCase(primaryCase.id);
                      } else {
                        onSelectCaseId(expandedCaseId === primaryCase.id ? null : primaryCase.id);
                      }
                    }}
                    className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191723] rounded"
                  >
                    {primaryCase.title}
                  </a>
                </h3>

                <p className="text-xs font-mono text-[#474457]">
                  {t.common.scope} {primaryCase.roleScope}
                </p>

                <p className="text-sm sm:text-base text-[#191723] leading-relaxed">
                  {primaryCase.summaryLine}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => handleCopyCaseLink(e, primaryCase.id, primaryCase.title)}
                  className="motion-control inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg bg-[#F6F2E9] hover:bg-[#EAE3D5] border border-[#CCC4B3] text-xs font-mono text-[#191723] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191723]"
                  aria-label={format(t.accessibility.copyCaseLinkLabel, { title: primaryCase.title })}
                >
                  {copiedCaseId === primaryCase.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.caseStudies.copied}</span>
                    </>
                  ) : copyErrorCaseId === primaryCase.id ? (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.caseStudies.urlUpdated}</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.caseStudies.copyLink}</span>
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
                  className="motion-control inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg bg-[#191723] hover:bg-[#2A273B] text-[#F6F2E9] text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191723]"
                >
                  <span>
                    {expandedCaseId === primaryCase.id
                      ? t.caseStudies.collapse
                      : t.caseStudies.viewCaseStudy}
                  </span>
                  {expandedCaseId === primaryCase.id ? (
                    <ChevronUp className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4">{renderCaseOutcome(primaryCase)}</div>
            <div id={`${primaryCase.id}-body`} className="case-disclosure" inert={expandedCaseId !== primaryCase.id}>
              <div>{renderCaseBody(primaryCase)}</div>
            </div>
          </article>
        )}

        {/* Secondary Case Studies */}
        <div className="grid items-start gap-5 lg:grid-cols-2">
          {secondaryCases.map((cs, idx) => {
            const isExpanded = expandedCaseId === cs.id;
            const isCopied = copiedCaseId === cs.id;
            const hasCopyErr = copyErrorCaseId === cs.id;

            return (
              <article
                key={cs.id}
                id={cs.id}
                aria-labelledby={`${cs.id}-heading`}
                className="case-panel scroll-mt-24 rounded-2xl border border-[#D8D2C5] bg-white p-5 sm:p-6"
              >
                <div className="flex flex-col gap-4">
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#474457]">
                      <span className="font-mono font-semibold text-[#191723]">
                        {format(t.caseStudies.caseLabelPrefix, { number: `0${idx + 2}` })}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-[#191723]">{cs.organization}</span>
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

                    <p className="text-xs font-mono text-[#474457]">
                      {t.common.scope} {cs.roleScope}
                    </p>

                    <p className="text-sm text-[#474457] leading-relaxed">{cs.summaryLine}</p>

                    {cs.workflowSteps && cs.workflowSteps.length > 0 && (
                      <ol
                        aria-label={t.caseStudies.workflowLabel}
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

                  <div className="flex flex-wrap items-center gap-2 shrink-0 md:pt-1">
                    <button
                      type="button"
                      onClick={(e) => handleCopyCaseLink(e, cs.id, cs.title)}
                      className="motion-control inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg bg-white/80 hover:bg-white border border-[#CCC4B3] text-xs font-mono text-[#191723] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191723]"
                      aria-label={format(t.accessibility.copyCaseLinkLabel, { title: cs.title })}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t.caseStudies.copied}</span>
                        </>
                      ) : hasCopyErr ? (
                        <>
                          <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t.caseStudies.urlUpdated}</span>
                        </>
                      ) : (
                        <>
                          <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{t.caseStudies.copyLink}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectCaseId(isExpanded ? null : cs.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`${cs.id}-body`}
                      className="motion-control inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg border border-[#191723]/30 hover:border-[#191723] text-xs font-semibold text-[#191723] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191723]"
                    >
                      <span>{isExpanded ? t.caseStudies.collapse : t.caseStudies.viewCaseStudy}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-4">{renderCaseOutcome(cs)}</div>
                <div id={`${cs.id}-body`} className="case-disclosure" inert={!isExpanded}>
                  <div>{renderCaseBody(cs)}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
