import React, { useRef, useState } from 'react';
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
  const majorCases = matches.filter((study) => !CASE_METADATA[study.id].compact);
  const compactCases = matches.filter((study) => CASE_METADATA[study.id].compact);
  const hasFilters = Boolean(filters.query || filters.domain || filters.type);

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
      <div className="flex max-w-3xl items-start gap-2.5 rounded-lg border border-[#DDD6C7] bg-[#F6F2E9] px-3.5 py-3">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#191723]" aria-hidden="true" />
        <div className="space-y-1">
          <p className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
            {findings ? explorer.findings : cs.outcomeLabel}
          </p>
          <p className="text-sm leading-relaxed text-[#191723]">{cs.outcome}</p>
        </div>
      </div>
    );
  };

  const renderCaseBody = (cs: CaseStudy) => {
    const { timeline, compact } = CASE_METADATA[cs.id];
    const DetailHeading = compact ? 'h5' : 'h4';

    return (
      <div className="pt-5 mt-5 border-t border-[#DDD6C7] space-y-6 text-sm text-[#191723]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <DetailHeading className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
              {t.caseStudies.contextLabel}
            </DetailHeading>
            <p className="text-sm text-[#191723] leading-relaxed">{cs.situation}</p>
          </div>

          <div className="space-y-1.5">
            <DetailHeading className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
              {t.caseStudies.myRoleLabel}
            </DetailHeading>
            <p className="text-sm text-[#191723] leading-relaxed">{cs.responsibility}</p>
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
            <DetailHeading className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
              {t.caseStudies.actionsTakenLabel}
            </DetailHeading>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#191723] leading-relaxed">
              {cs.whatIDid.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {cs.explorationNotes?.length ? (
          <div className="space-y-2 rounded-lg border border-[#DDD6C7] bg-[#F6F2E9] p-4">
            <DetailHeading className="text-xs font-mono uppercase tracking-wider font-semibold">
              {explorer.exploration}
            </DetailHeading>
            <ul className="list-disc space-y-1.5 pl-5 leading-relaxed">
              {cs.explorationNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </div>
        ) : null}

        {cs.triageBreakdown && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F6F2E9] border border-[#DDD6C7] rounded-xl p-4 sm:p-5">
            <div className="space-y-1.5">
              <DetailHeading className="text-xs font-mono uppercase tracking-wider text-[#191723] font-bold">
                {t.caseStudies.checksPerformedLabel}
              </DetailHeading>
              <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-[#191723] leading-relaxed">
                {cs.triageBreakdown.checksPerformed.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5 md:border-l md:border-[#DDD6C7] md:pl-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#DDD6C7]">
              <DetailHeading className="text-xs font-mono uppercase tracking-wider text-[#191723] font-bold">
                {t.caseStudies.providedToVendorLabel}
              </DetailHeading>
              <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-[#191723] leading-relaxed">
                {cs.triageBreakdown.providedToVendor.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5 md:border-l md:border-[#DDD6C7] md:pl-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#DDD6C7]">
              <DetailHeading className="text-xs font-mono uppercase tracking-wider text-[#191723] font-bold">
                {t.caseStudies.vendorScopeLabel}
              </DetailHeading>
              <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-[#191723] leading-relaxed">
                {cs.triageBreakdown.vendorInvestigation.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="border-t border-[#DDD6C7] pt-4 space-y-1.5">
          <DetailHeading className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">
            {t.caseStudies.toolsUsedLabel}
          </DetailHeading>
          <div className="text-xs font-mono text-[#191723]">{cs.technologies.join(' · ')}</div>
        </div>
      </div>
    );
  };

  const renderCase = (study: CaseStudy) => {
    const metadata = CASE_METADATA[study.id];
    const expanded = expandedCaseId === study.id;
    const Heading = metadata.compact ? 'h4' : 'h3';
    const isMigration = study.id === 'case-lark-migration';
    const copied = copiedCaseId === study.id;
    const copyFallback = copyErrorCaseId === study.id;

    return (
      <article
        id={study.id}
        key={study.id}
        aria-labelledby={`${study.id}-heading`}
        className={`case-panel min-w-0 scroll-mt-24 border border-[#D8D2C5] bg-white ${metadata.compact
          ? 'rounded-xl px-4 py-4 sm:px-5'
          : 'rounded-2xl p-5 sm:p-6 shadow-sm'} ${isMigration ? 'lg:col-span-2' : ''}`}
      >
        {isMigration && <MigrationIllustration />}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#474457]">
          <span className="font-medium">{study.organization}</span>
          <span aria-hidden="true">·</span>
          <span>{explorer.domains[metadata.domain]}</span>
          <span className="rounded border border-[#D8D2C5] bg-[#F5F1E8] px-2 py-0.5 text-[#253459]">
            {explorer.evidence[metadata.evidence]}
          </span>
        </div>

        <Heading id={`${study.id}-heading`} tabIndex={-1} className={`mt-2 font-display font-bold tracking-tight [overflow-wrap:anywhere] focus:outline-2 focus:outline-offset-4 focus:outline-[#506391] ${metadata.compact ? 'text-lg' : 'text-2xl'}`}>
          <a href={`#${study.id}`} onClick={(event) => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            onSelectCaseId(study.id);
          }} className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
            {study.title}
          </a>
        </Heading>
        <p className="mt-1.5 text-xs font-medium text-[#474457]">{study.roleScope}</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed">{study.summaryLine}</p>
        {study.workflowSteps?.length ? (
          <ol aria-label={t.caseStudies.workflowLabel} className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#474457]">
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
            className="motion-control inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#191723] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#37334B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191723]"
          >
            {expanded ? t.caseStudies.collapse : explorer.deepDive}
            {expanded ? <ChevronUp size={15} aria-hidden="true" /> : <ChevronDown size={15} aria-hidden="true" />}
          </button>
          <button
            type="button"
            aria-label={format(t.accessibility.copyCaseLinkLabel, { title: study.title })}
            onClick={() => void handleCopyCaseLink(study.id, study.title)}
            className="motion-control inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#CCC4B3] px-3 py-2 text-xs font-medium hover:bg-[#F6F2E9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191723]"
          >
            {copied ? <Check size={14} aria-hidden="true" /> : copyFallback
              ? <AlertCircle size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
            {copied ? t.caseStudies.copied : copyFallback ? t.caseStudies.urlUpdated : t.caseStudies.copyLink}
          </button>
        </div>

        <div id={`${study.id}-body`} className="case-disclosure" inert={!expanded}>
          <div>
            {renderCaseBody(study)}
            <dl className="mt-4 grid gap-4 border-t border-[#DDD6C7] pt-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold">{explorer.skills}</dt>
                <dd className="mt-1 text-[#474457]">{metadata.skills.map((id) => skillLabels.get(id)).join(' · ')}</dd>
              </div>
              <div>
                <dt className="font-semibold">{explorer.roles}</dt>
                <dd className="mt-1 text-[#474457]">{metadata.roles.map((role) => explorer.rolesById[role]).join(' · ')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </article>
    );
  };

  const controlClass = 'mt-1.5 min-h-11 w-full rounded-lg border border-[#BDB6AA] bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#253459]';

  return (
    <section id="featured-work" aria-labelledby="featured-work-heading"
      className="scroll-mt-20 border-b border-[#DDD6C7] bg-[#F6F2E9] py-14 text-[#191723] sm:py-20">
      <div id="projects" className="scroll-mt-20" />

      <div className="mx-auto max-w-7xl space-y-7 px-4 sm:px-6 lg:px-8">
        <div className="sr-only" role="status">{copyAnnouncement}</div>
        <div ref={headingRef} className="flex flex-col justify-between gap-4 border-b border-[#DDD6C7] pb-6 md:flex-row md:items-end">
          <div>
            <p className="mb-1.5 font-mono text-xs font-medium uppercase tracking-wider text-[#474457]">{t.caseStudies.eyebrow}</p>
            <h2 id="featured-work-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t.caseStudies.heading}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#474457]">{t.caseStudies.intro}</p>
        </div>

        <div className="rounded-2xl border border-[#D8D2C5] bg-[#EFE9DF] p-4 sm:p-5">
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
            <p role="status" aria-atomic="true" className="font-medium text-[#474457]">
              {format(explorer.count, { count: String(matches.length) })}
            </p>
            <button type="button" disabled={!hasFilters} onClick={() => {
              updateFilters(EMPTY_CASE_FILTERS);
              searchRef.current?.focus();
            }}
              className="min-h-10 rounded px-2 font-semibold text-[#253459] underline underline-offset-4 hover:text-[#191723] focus-visible:outline-2 disabled:opacity-55">
              {explorer.clear}
            </button>
          </div>
        </div>

        {matches.length === 0 && (
          <p className="rounded-xl border border-[#D8D2C5] bg-white px-5 py-8 text-center text-sm">{explorer.empty}</p>
        )}
        {majorCases.length > 0 && <div className="grid items-start gap-5 lg:grid-cols-2">{majorCases.map(renderCase)}</div>}
        {compactCases.length > 0 && (
          <section aria-labelledby="case-collection-heading" className="space-y-3 border-t border-[#DDD6C7] pt-6">
            <h3 id="case-collection-heading" className="font-display text-xl font-bold">{explorer.collection}</h3>
            <div className="grid items-start gap-3 lg:grid-cols-2">{compactCases.map(renderCase)}</div>
          </section>
        )}
      </div>
    </section>
  );
};
