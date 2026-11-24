import React, { useEffect, useRef, useState } from 'react';
import { buildUrlWithLocale, useI18n } from '../i18n';
import { useSectionEntrance } from '../utils/useSectionEntrance';
import type { CaseStudy } from '../data/universeContent';
import { copyTextToClipboard } from '../utils/clipboard';
import { MigrationIllustration } from './MigrationIllustration';
import { CaseTimeline } from './CaseTimeline';
import { CASE_DOMAINS, CASE_METADATA, CASE_TYPES, EMPTY_CASE_FILTERS, findCases } from '../data/caseExplorer';
import {
  ChevronDown,
  ChevronUp,
  Link2,
  Check,
  CheckCircle2,
  Search,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

const FEATURED_CASES = new Set([
  'case-voucher-configuration',
  'case-transaction-recovery',
  'case-lark-migration',
  'case-m365-access-sync',
]);

function CaseDisclosure({ id, expanded, render }: {
  id: string;
  expanded: boolean;
  render: () => React.ReactNode;
}) {
  const [opened, setOpened] = useState(expanded);

  useEffect(() => {
    if (expanded) setOpened(true);
  }, [expanded]);

  return (
    <div id={id} className="case-disclosure" inert={!expanded}>
      <div>{(expanded || opened) && render()}</div>
    </div>
  );
}

interface ProjectsSectionProps {
  expandedCaseId: string | null;
  onSelectCaseId: (id: string | null) => void;
  navigationVersion: number;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  expandedCaseId,
  onSelectCaseId,
  navigationVersion,
}) => {
  const { locale, t, content, format } = useI18n();
  const headingRef = useSectionEntrance();
  const searchRef = useRef<HTMLInputElement>(null);
  const [copiedCaseId, setCopiedCaseId] = useState<string | null>(null);
  const [copyErrorCaseId, setCopyErrorCaseId] = useState<string | null>(null);
  const [copyAnnouncement, setCopyAnnouncement] = useState('');

  const [selection, setSelection] = useState({ navigationVersion, filters: EMPTY_CASE_FILTERS });
  const filters = selection.navigationVersion === navigationVersion ? selection.filters : EMPTY_CASE_FILTERS;
  const updateFilters = (patch: Partial<typeof filters>) =>
    setSelection({ navigationVersion, filters: { ...filters, ...patch } });

  const explorer = t.caseExplorer;
  const skillLabels = new Map(content.nodes.map((node) => [node.id, node.label]));
  const matches = findCases(content.caseStudies, filters, (metadata) => [
    explorer.domains[metadata.domain],
    ...metadata.skills.map((id) => skillLabels.get(id) ?? ''),
    ...metadata.roles.map((role) => explorer.rolesById[role]),
  ]);
  const [browseAll, setBrowseAll] = useState(false);
  const hasFilters = Boolean(filters.query || filters.domain || filters.type);
  const outsideFeatured = expandedCaseId !== null && !FEATURED_CASES.has(expandedCaseId);
  useEffect(() => {
    if (outsideFeatured) setBrowseAll(true);
  }, [outsideFeatured]);

  const showAll = browseAll || hasFilters || outsideFeatured;
  const visibleCases = showAll ? matches : matches.filter((study) => FEATURED_CASES.has(study.id));
  const majorCases = visibleCases.filter((study) => !showAll || !CASE_METADATA[study.id].compact);
  const compactCases = showAll ? visibleCases.filter((study) => CASE_METADATA[study.id].compact) : [];

  const sectionHeadingRef = useRef<HTMLHeadingElement>(null);
  const toggleCaseList = () => {
    if (showAll) {
      updateFilters(EMPTY_CASE_FILTERS);
      if (outsideFeatured) onSelectCaseId(null);
      // The filter panel unmounts; return focus to the section start.
      requestAnimationFrame(() => {
        sectionHeadingRef.current?.focus({ preventScroll: true });
        sectionHeadingRef.current?.scrollIntoView({ block: 'start' });
      });
    } else {
      // The filter panel mounts above the full list; move focus into it.
      requestAnimationFrame(() => searchRef.current?.focus());
    }
    setBrowseAll(!showAll);
  };

  const handleCopyCaseLink = async (caseId: string, title: string) => {
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

  const renderCaseOutcome = (cs: CaseStudy) => {
    const evidence = CASE_METADATA[cs.id].evidence;
    const findings = evidence === 'investigation' || evidence === 'assessment';
    const Icon = findings ? Search : CheckCircle2;

    return (
      <div className="flex max-w-3xl items-start gap-2.5 rounded-lg border border-[#2E3644] bg-[#232935] px-3.5 py-3">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#EEF4F8]" aria-hidden="true" />
        <div className="space-y-1">
          <p className="text-xs label-condensed text-[#B4C2CF] font-semibold">
            {findings ? explorer.findings : cs.outcomeLabel}
          </p>
          <p className="text-sm leading-relaxed text-[#EEF4F8]">{cs.outcome}</p>
        </div>
      </div>
    );
  };

  const renderCaseBody = (cs: CaseStudy, compact: boolean) => {
    const { timeline } = CASE_METADATA[cs.id];
    const DetailHeading = compact ? 'h5' : 'h4';

    return (
      <div className="pt-5 mt-5 border-t border-[#2E3644] space-y-6 text-sm text-[#EEF4F8]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <DetailHeading className="text-xs label-condensed text-[#B4C2CF] font-semibold">
              {t.caseStudies.contextLabel}
            </DetailHeading>
            <p className="text-sm text-[#EEF4F8] leading-relaxed">{cs.situation}</p>
          </div>

          <div className="space-y-1.5">
            <DetailHeading className="text-xs label-condensed text-[#B4C2CF] font-semibold">
              {t.caseStudies.myRoleLabel}
            </DetailHeading>
            <p className="text-sm text-[#EEF4F8] leading-relaxed">{cs.responsibility}</p>
          </div>
        </div>

        {timeline ? (
          <CaseTimeline
            id={`${cs.id}-timeline-note`}
            title={explorer.timeline}
            stages={timeline.map((stage) => explorer.stages[stage])}
            steps={cs.whatIDid}
          />
        ) : (
          <div className="space-y-2">
            <DetailHeading className="text-xs label-condensed text-[#B4C2CF] font-semibold">
              {t.caseStudies.actionsTakenLabel}
            </DetailHeading>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#EEF4F8] leading-relaxed">
              {cs.whatIDid.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {cs.explorationNotes?.length ? (
          <div className="space-y-2 rounded-lg border border-[#2E3644] bg-[#232935] p-4">
            <DetailHeading className="text-xs label-condensed font-semibold">
              {explorer.exploration}
            </DetailHeading>
            <ul className="list-disc space-y-1.5 pl-5 leading-relaxed">
              {cs.explorationNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>
        ) : null}

        {cs.triageBreakdown && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#232935] border border-[#2E3644] rounded-xl p-4 sm:p-5">
            <div className="space-y-1.5">
              <DetailHeading className="text-xs label-condensed text-[#EEF4F8] font-bold">
                {t.caseStudies.checksPerformedLabel}
              </DetailHeading>
              <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-[#EEF4F8] leading-relaxed">
                {cs.triageBreakdown.checksPerformed.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5 md:border-l md:border-[#2E3644] md:pl-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#2E3644]">
              <DetailHeading className="text-xs label-condensed text-[#EEF4F8] font-bold">
                {t.caseStudies.providedToVendorLabel}
              </DetailHeading>
              <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-[#EEF4F8] leading-relaxed">
                {cs.triageBreakdown.providedToVendor.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5 md:border-l md:border-[#2E3644] md:pl-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#2E3644]">
              <DetailHeading className="text-xs label-condensed text-[#EEF4F8] font-bold">
                {t.caseStudies.vendorScopeLabel}
              </DetailHeading>
              <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-[#EEF4F8] leading-relaxed">
                {cs.triageBreakdown.vendorInvestigation.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="border-t border-[#2E3644] pt-4 space-y-1.5">
          <DetailHeading className="text-xs label-condensed text-[#B4C2CF] font-semibold">
            {t.caseStudies.toolsUsedLabel}
          </DetailHeading>
          <div className="text-xs label-condensed text-[#EEF4F8]">{cs.technologies.join(' · ')}</div>
        </div>
      </div>
    );
  };

  const renderCase = (study: CaseStudy, compact: boolean) => {
    const metadata = CASE_METADATA[study.id];
    const expanded = expandedCaseId === study.id;
    const Heading = compact ? 'h4' : 'h3';
    const isMigration = study.id === 'case-lark-migration';
    const copied = copiedCaseId === study.id;
    const copyFallback = copyErrorCaseId === study.id;

    return (
      <article
        id={study.id}
        key={study.id}
        aria-labelledby={`${study.id}-heading`}
        data-glow
        className={`case-panel min-w-0 scroll-mt-24 border border-[#2E3644] bg-[#1B2029] ${compact
          ? 'rounded-xl px-4 py-4 sm:px-5'
          : 'rounded-2xl p-5 sm:p-6 shadow-sm'} ${isMigration && showAll ? 'lg:col-span-2' : ''}`}
      >
        {isMigration && <MigrationIllustration />}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#B4C2CF]">
          <span className="font-medium">{study.organization}</span>
          <span aria-hidden="true">·</span>
          <span>{explorer.domains[metadata.domain]}</span>
          <span className="rounded border border-[#2E3644] bg-[#232935] px-2 py-0.5 text-[#B9D6E6]">
            {explorer.evidence[metadata.evidence]}
          </span>
        </div>

        <Heading id={`${study.id}-heading`} tabIndex={-1} className={`mt-2 font-display font-bold tracking-tight [overflow-wrap:anywhere] focus:outline-2 focus:outline-offset-4 focus:outline-[#B9D6E6] ${compact ? 'text-lg' : 'text-2xl'}`}>
          <a href={`#${study.id}`} onClick={(event) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            onSelectCaseId(study.id);
          }} className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
            {study.title}
          </a>
        </Heading>
        <p className="mt-1.5 text-xs font-medium text-[#B4C2CF]">{study.roleScope}</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed">{study.summaryLine}</p>
        {study.workflowSteps?.length ? (
          <ol aria-label={t.caseStudies.workflowLabel} className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#B4C2CF]">
            {study.workflowSteps.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                {index > 0 && <ArrowRight size={12} aria-hidden="true" />}{step}
              </li>
            ))}
          </ol>
        ) : null}
        <div className="mt-3">{renderCaseOutcome(study)}</div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={`${study.id}-body`}
            onClick={() => onSelectCaseId(expanded ? null : study.id)}
            className="motion-control inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#B9D6E6] px-3.5 py-2 text-xs font-semibold text-[#13161C] hover:bg-[#C9DFEB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0583C]"
          >
            {expanded ? t.caseStudies.collapse : explorer.deepDive}
            {expanded ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => void handleCopyCaseLink(study.id, study.title)}
            className="motion-control inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#3A4352] px-3 py-2 text-xs font-medium hover:bg-[#232935] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0583C]"
          >
            {copied ? <Check size={14} aria-hidden="true" /> : copyFallback
              ? <AlertCircle size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
            {copied ? t.caseStudies.copied : copyFallback ? t.caseStudies.urlUpdated : t.caseStudies.copyLink}
            <span className="sr-only"> {study.title}</span>
          </button>
        </div>

        <CaseDisclosure id={`${study.id}-body`} expanded={expanded} render={() => (
          <>
            {renderCaseBody(study, compact)}
            <dl className="mt-4 grid gap-4 border-t border-[#2E3644] pt-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold">{explorer.skills}</dt>
                <dd className="mt-1 text-[#B4C2CF]">{metadata.skills.map((id) => skillLabels.get(id)).join(' · ')}</dd>
              </div>
              <div>
                <dt className="font-semibold">{explorer.roles}</dt>
                <dd className="mt-1 text-[#B4C2CF]">{metadata.roles.map((role) => explorer.rolesById[role]).join(' · ')}</dd>
              </div>
            </dl>
          </>
        )} />
      </article>
    );
  };

  const controlClass = 'mt-1.5 min-h-11 w-full rounded-lg border border-[#3A4352] bg-[#13161C] text-[#EEF4F8] px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0583C]';

  return (
    <section id="featured-work" aria-labelledby="featured-work-heading"
      className="scroll-mt-20 border-b border-[#2E3644] bg-[#13161C] py-14 text-[#EEF4F8] sm:py-20">
      <div id="projects" className="scroll-mt-20" />

      <div className="mx-auto max-w-7xl space-y-7 px-4 sm:px-6 lg:px-8">
        <div className="sr-only" role="status">{copyAnnouncement}</div>
        <div ref={headingRef} className="flex flex-col justify-between gap-4 border-b border-[#2E3644] pb-6 md:flex-row md:items-end">
          <div>
            <p className="mb-1.5 label-condensed text-xs font-medium text-[#B4C2CF]">{t.caseStudies.eyebrow}</p>
            <h2 id="featured-work-heading" ref={sectionHeadingRef} tabIndex={-1} className="scroll-mt-24 font-display text-3xl font-bold tracking-tight focus:outline-none sm:text-4xl">
              {t.caseStudies.heading}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#B4C2CF]">{t.caseStudies.intro}</p>
        </div>

        {showAll && <div className="rounded-2xl border border-[#2E3644] bg-[#1B2029] p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr]">
            <label className="min-w-0 text-sm font-semibold">
              {explorer.search}
              <input ref={searchRef} type="search" className={controlClass} value={filters.query}
                onChange={(event) => updateFilters({ query: event.target.value })} />
            </label>
            <label className="min-w-0 text-sm font-semibold">
              {explorer.domain}
              <select className={controlClass} value={filters.domain}
                onChange={(event) => updateFilters({ domain: event.target.value })}>
                <option value="">{explorer.allDomains}</option>
                {CASE_DOMAINS.map((domain) => <option key={domain} value={domain}>{explorer.domains[domain]}</option>)}
              </select>
            </label>
            <label className="min-w-0 text-sm font-semibold">
              {explorer.type}
              <select className={controlClass} value={filters.type}
                onChange={(event) => updateFilters({ type: event.target.value })}>
                <option value="">{explorer.allTypes}</option>
                {CASE_TYPES.map((type) => <option key={type} value={type}>{explorer.types[type]}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-2 flex min-h-10 flex-wrap items-center justify-between gap-x-3 text-sm">
            <p role="status" aria-atomic="true" className="font-medium text-[#B4C2CF]">
              {format(explorer.count, { count: String(visibleCases.length) })}
            </p>
            <div className="flex flex-wrap items-center gap-x-3">
              {hasFilters && (
                <button type="button" onClick={() => {
                  updateFilters(EMPTY_CASE_FILTERS);
                  searchRef.current?.focus();
                }} className="min-h-11 rounded px-2 font-semibold text-[#B9D6E6] underline underline-offset-4 focus-visible:outline-2">
                  {explorer.clear}
                </button>
              )}
              <button type="button" aria-controls="case-results" aria-expanded={showAll}
                onClick={toggleCaseList}
                className="motion-control min-h-11 rounded-lg bg-[#B9D6E6] px-3 py-2 font-semibold text-[#13161C] hover:bg-[#C9DFEB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0583C]">
                {showAll ? explorer.showFeatured : format(explorer.showAll, { count: String(content.caseStudies.length) })}
              </button>
            </div>
          </div>
        </div>}

        <div id="case-results" className="space-y-7">
          {visibleCases.length === 0 && (
            <p className="rounded-xl border border-[#2E3644] bg-[#1B2029] px-5 py-8 text-center text-sm">{explorer.empty}</p>
          )}
          {majorCases.length > 0 && (
            <div className="grid items-start gap-5 lg:grid-cols-2">{majorCases.map((study) => renderCase(study, false))}</div>
          )}
          {compactCases.length > 0 && (
            <section aria-labelledby="case-collection-heading" className="space-y-3 border-t border-[#2E3644] pt-6">
              <h3 id="case-collection-heading" className="font-display text-xl font-bold">{explorer.collection}</h3>
              <div className="grid items-start gap-3 lg:grid-cols-2">{compactCases.map((study) => renderCase(study, true))}</div>
            </section>
          )}
        </div>

        {!showAll && (
          <div className="flex justify-center border-t border-[#2E3644] pt-6">
            <button type="button" aria-controls="case-results" aria-expanded={false}
              onClick={toggleCaseList}
              className="motion-control inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#3A4352] px-4 py-2 text-sm font-semibold text-[#EEF4F8] hover:border-[#B9D6E6] hover:bg-[#232935] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0583C]">
              <Search size={15} aria-hidden="true" />
              {format(explorer.showAll, { count: String(content.caseStudies.length) })}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
