import React, { useState, useMemo } from 'react';
import {
  StratumType,
  PROFILE,
  EVIDENCE_META,
  EvidenceStatus,
  ConstellationCategory,
} from '../data/universeContent';
import { useI18n } from '../i18n';
import {
  Scan,
  Cpu,
  Network,
  Layers,
  Cloud,
  Users,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Briefcase,
  Award,
  MapPin,
  FlaskConical,
  ExternalLink,
  Receipt,
  Info,
  Printer,
} from 'lucide-react';

interface TraceViewProps {
  onSelectNodeInAtlas?: (nodeId: string) => void;
  onOpenLab?: (trigger?: HTMLElement | null) => void;
  onOpenReceipt?: () => void;
}

export const TraceView: React.FC<TraceViewProps> = ({
  onSelectNodeInAtlas,
  onOpenLab,
  onOpenReceipt,
}) => {
  const { t, content, format } = useI18n();
  const [activeStratum, setActiveStratum] = useState<StratumType>('hardware');
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<string | null>(null);
  const [showSampleReceipt, setShowSampleReceipt] = useState(false);

  const localizedStrata = content.strata;

  const localizedNodes = useMemo(
    () =>
      content.nodes.map((node) => ({
        ...node,
        categoryLabel:
          content.constellationCategories[node.category as ConstellationCategory] ?? node.category,
      })),
    [content.nodes, content.constellationCategories]
  );

  const localizedCaseStudies = content.caseStudies;
  const localizedLearningEntries = content.learning;

  const stratumIcons: Record<StratumType, React.ReactNode> = {
    hardware: <Scan className="w-5 h-5 text-[#B9D6E6]" />,
    kernel: <Cpu className="w-5 h-5 text-[#B9D6E6]" />,
    network: <Network className="w-5 h-5 text-[#B9D6E6]" />,
    application: <Layers className="w-5 h-5 text-[#F0583C]" />,
    cloud: <Cloud className="w-5 h-5 text-[#B9D6E6]" />,
    operations: <Users className="w-5 h-5 text-[#F0583C]" />,
  };

  const getStatusLabel = (status: EvidenceStatus) => {
    const meta = EVIDENCE_META[status];
    const localizedMeta = content.evidenceMeta[status];
    const colorClass =
      status === 'learning'
        ? 'text-[#F0583C] border-[#F0583C]/40 bg-[#F0583C]/10'
        : status === 'professional'
        ? 'text-[#B9D6E6] border-[#B9D6E6]/40 bg-[#B9D6E6]/10'
        : 'text-[#B4C2CF] border-[#2E3644] bg-[#13161C]';
    return (
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border font-medium shrink-0 ${colorClass}`}
      >
        <span aria-hidden="true">{meta.glyph}</span>
        <span>{localizedMeta.label}</span>
      </span>
    );
  };

  return (
    <div className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-[#EEF4F8]">
      {/* Header */}
      <section
        aria-labelledby="candidate-intro-heading"
        className="mb-12 pb-10 border-b border-[#2E3644]"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[#B9D6E6] mb-3">
              {format(t.trace.eyebrow, { name: PROFILE.displayName })}
            </p>

            <h1
              id="candidate-intro-heading"
              className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#EEF4F8] tracking-tight leading-tight mb-4"
            >
              {t.trace.titleMain}{' '}
              <span className="text-[#B9D6E6] font-normal">
                {t.trace.titleSub}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#B4C2CF] font-sans leading-relaxed max-w-2xl mb-6">
              {content.profile.intro}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#97A4B3]">
              <span className="inline-flex items-center gap-1.5 text-[#EEF4F8] font-medium">
                <Briefcase className="w-3.5 h-3.5 text-[#F0583C]" aria-hidden="true" />
                <span>{PROFILE.currentCompany}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#B9D6E6]" aria-hidden="true" />
                <span>{t.hero.certificationName}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#97A4B3]" aria-hidden="true" />
                <span>{content.profile.location}</span>
              </span>
            </div>
          </div>

          <div className="bg-[#1B2029] border border-[#2E3644] rounded-2xl p-5 font-mono text-xs max-w-xs shrink-0 self-start">
            <div className="flex items-center justify-between text-[#97A4B3] text-[10px] uppercase mb-2">
              <span>{t.trace.outputView}</span>
              <span className="text-[#B9D6E6]">{t.trace.printable}</span>
            </div>
            <div className="text-[#EEF4F8] font-bold mb-1">{t.trace.receiptTitle}</div>
            <p className="text-[#B4C2CF] font-sans text-xs leading-relaxed mb-3">
              {t.trace.receiptDesc}
            </p>
            <button
              type="button"
              onClick={() => onOpenReceipt?.()}
              className="inline-flex items-center gap-1.5 text-[#F0583C] hover:text-[#EEF4F8] font-bold transition-colors cursor-pointer"
            >
              <span>{t.trace.openSummaryReceipt}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Explicit Educational Walkthrough Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-[#1B2029] border border-[#B9D6E6]/40 flex items-start gap-3 text-xs sm:text-sm text-[#DCE6EE]">
          <Info className="w-4 h-4 text-[#B9D6E6] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong className="text-[#EEF4F8]">{t.trace.disclaimerTitle}</strong>{' '}
            {t.trace.disclaimerBody}
          </p>
        </div>
      </section>

      {/* Strata Navigation Rail */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#B9D6E6] font-semibold mb-1">
              {t.trace.layersEyebrow}
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#EEF4F8]">
              {t.trace.layersHeading}
            </h2>
          </div>
          <p className="text-[#97A4B3] font-mono text-xs max-w-md text-left sm:text-right">
            {t.trace.layersHelp}
          </p>
        </div>

        <nav
          aria-label={t.trace.navAriaLabel}
          className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 font-mono text-xs"
        >
          {localizedStrata.map((st, i) => (
            <a
              key={st.id}
              href={`#stratum-${st.id}`}
              onClick={() => setActiveStratum(st.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap ${
                activeStratum === st.id
                  ? 'bg-[#1B2029] text-[#B9D6E6] border-[#B9D6E6] font-semibold'
                  : 'bg-[#13161C] text-[#97A4B3] border-[#2E3644] hover:text-[#EEF4F8] hover:border-[#B9D6E6]/40'
              }`}
            >
              <span className="text-[10px] text-[#97A4B3]">0{i + 1}.</span>
              <span>{st.title}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* The 6 Vertical Strata */}
      <div className="relative border-l border-[#2E3644] ml-3 sm:ml-8 pl-5 sm:pl-10 space-y-16">
        {localizedStrata.map((st, idx) => {
          const matchingNodes = localizedNodes.filter((n) => n.stratum === st.id);
          const matchingCaseStudies = localizedCaseStudies.filter((cs) => cs.stratumFocus === st.id);

          return (
            <section
              key={st.id}
              id={`stratum-${st.id}`}
              className="relative scroll-mt-24"
              aria-labelledby={`stratum-heading-${st.id}`}
              onMouseEnter={() => setActiveStratum(st.id)}
            >
              <div
                className={`absolute -left-[27px] sm:-left-[47px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center transition-colors ${
                  activeStratum === st.id
                    ? 'bg-[#13161C] border-[#F0583C]'
                    : 'bg-[#13161C] border-[#2E3644]'
                }`}
                aria-hidden="true"
              >
                {stratumIcons[st.id]}
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#97A4B3] mb-1">
                  <span className="font-bold text-[#F0583C]">
                    {format(t.trace.layerPrefix, { index: st.index })}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#B9D6E6]">{st.subtitle}</span>
                </div>
                <h3
                  id={`stratum-heading-${st.id}`}
                  className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#EEF4F8] tracking-tight"
                >
                  {st.title}
                </h3>
                <p className="mt-2 text-[#B4C2CF] text-xs sm:text-sm font-sans leading-relaxed max-w-4xl">
                  {st.description}
                </p>
              </div>

              {/* Illustrative Layer Visualization Box */}
              <div className="bg-[#1B2029] border border-[#2E3644] rounded-2xl p-4 sm:p-6 mb-8 relative">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2E3644] pb-3 mb-4 text-xs font-mono text-[#97A4B3]">
                  <span className="text-[#EEF4F8] font-semibold">
                    {format(t.trace.layerPrefix, { index: `0${idx + 1}` })} · {st.exampleStage}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#13161C] border border-[#2E3644] text-[#B9D6E6] text-[10px] uppercase font-bold">
                    {t.trace.illustrativeConcept}
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    {st.exampleComponents.map((comp) => (
                      <div
                        key={comp}
                        className="bg-[#13161C] border border-[#2E3644] rounded-xl p-3 text-[#B4C2CF]"
                      >
                        <div className="text-[#B9D6E6] font-bold text-[11px]">{comp}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#13161C] border border-[#2E3644] rounded-xl p-3.5 space-y-1.5">
                    <div className="text-[11px] text-[#B9D6E6]">{st.examplePayload}</div>
                    <p className="font-sans text-xs text-[#B4C2CF] leading-relaxed">
                      {st.whatHappensConceptually}
                    </p>
                  </div>

                  {st.id === 'network' && onOpenLab && (
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] bg-[#13161C] p-3 rounded-xl border border-[#2E3644]">
                      <span className="text-[#B4C2CF]">
                        {t.trace.interactiveSimPrompt}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => onOpenLab(e.currentTarget)}
                        className="text-[#B9D6E6] hover:text-[#EEF4F8] flex items-center gap-1.5 text-[11px] font-bold uppercase cursor-pointer"
                      >
                        <FlaskConical className="w-3.5 h-3.5 text-[#F0583C]" aria-hidden="true" />
                        <span>{t.trace.openComputingLab}</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Related Documented Skills in this Layer */}
              {matchingNodes.length > 0 && (
                <div className="mb-8">
                  <div className="text-xs font-mono text-[#97A4B3] uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>{format(t.trace.relatedSkillsLabel, { count: matchingNodes.length })}</span>
                    <span className="text-[11px] hidden sm:inline">{t.trace.selectToOpenAtlas}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {matchingNodes.map((node) => (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => onSelectNodeInAtlas && onSelectNodeInAtlas(node.id)}
                        className="group text-left bg-[#1B2029] hover:bg-[#232935] border border-[#2E3644] hover:border-[#B9D6E6]/60 rounded-xl p-4 transition-colors cursor-pointer flex flex-col justify-between"
                      >
                        <div className="w-full">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="font-mono font-bold text-sm text-[#EEF4F8] group-hover:text-[#B9D6E6] transition-colors">
                              {node.label}
                            </span>
                            {getStatusLabel(node.status)}
                          </div>
                          <p className="text-xs text-[#B4C2CF] leading-relaxed font-sans mb-2">
                            {node.summary}
                          </p>
                          {node.usage && (
                            <div className="text-[11px] font-sans text-[#B4C2CF] bg-[#13161C] p-2.5 rounded-lg border border-[#2E3644] mb-3 leading-snug">
                              <span className="font-mono text-[10px] text-[#B9D6E6] uppercase font-semibold block mb-0.5">
                                {t.trace.whereApplied}
                              </span>
                              {node.usage}
                            </div>
                          )}
                        </div>

                        <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#97A4B3] pt-2 border-t border-[#2E3644]">
                          <span className="uppercase">{node.categoryLabel}</span>
                          <span className="text-[#B9D6E6] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-bold">
                            {t.trace.inspect} <span>→</span>
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Case Studies */}
              {matchingCaseStudies.length > 0 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#F0583C] font-semibold">
                    {t.trace.relatedCaseStudy}
                  </div>

                  {matchingCaseStudies.map((cs) => {
                    const isExpanded = expandedCaseStudy === cs.id;

                    return (
                      <article
                        key={cs.id}
                        className="bg-[#1B2029] border border-[#2E3644] hover:border-[#B9D6E6]/40 rounded-xl transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedCaseStudy(isExpanded ? null : cs.id)}
                          aria-expanded={isExpanded}
                          className="w-full text-left p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-4 rounded-xl"
                        >
                          <div>
                            <div className="text-xs font-mono text-[#97A4B3] mb-1">
                              {cs.organization}
                            </div>
                            <h4 className="font-display text-base sm:text-lg font-bold text-[#EEF4F8] hover:text-[#B9D6E6] transition-colors">
                              {cs.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-[#B4C2CF] mt-1 font-sans">
                              {cs.situation}
                            </p>
                          </div>
                          <span className="text-[#B9D6E6] p-1 font-mono text-xs flex items-center gap-1 self-center shrink-0">
                            <span>{isExpanded ? t.trace.less : t.trace.details}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" aria-hidden="true" />
                            ) : (
                              <ChevronDown className="w-4 h-4" aria-hidden="true" />
                            )}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-[#2E3644] text-xs sm:text-sm space-y-4 font-sans text-[#B4C2CF]">
                            {cs.workflowSteps && cs.workflowSteps.length > 0 && (
                              <div className="bg-[#13161C] p-3 rounded-xl border border-[#2E3644]">
                                <div className="font-mono font-semibold text-[#B9D6E6] uppercase text-[11px] mb-1.5">
                                  {t.trace.workflowLabel}
                                </div>
                                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-[#EEF4F8]">
                                  {cs.workflowSteps.map((step, stepIdx) => (
                                    <li key={step} className="inline-flex items-center gap-1.5">
                                      <span>{step}</span>
                                      {stepIdx < cs.workflowSteps!.length - 1 && (
                                        <span aria-hidden="true" className="text-[#B9D6E6]">
                                          →
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}

                            <div>
                              <div className="font-mono font-semibold text-[#B9D6E6] uppercase text-xs mb-1">
                                {t.trace.myResponsibility}
                              </div>
                              <p>{cs.responsibility}</p>
                            </div>
                            <div>
                              <div className="font-mono font-semibold text-[#B9D6E6] uppercase text-xs mb-1">
                                {t.trace.whatIDid}
                              </div>
                              <ul className="list-disc pl-5 space-y-1">
                                {cs.whatIDid.map((act, i) => (
                                  <li key={i}>{act}</li>
                                ))}
                              </ul>
                            </div>

                            {cs.outcome && (
                              <div className="bg-[#13161C] p-3.5 rounded-xl border border-[#2E3644] text-xs">
                                <span className="font-mono font-semibold text-[#B9D6E6] uppercase block mb-1">
                                  {cs.outcomeLabel}
                                </span>
                                <p>{cs.outcome}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Currently Learning */}
      <section aria-labelledby="learning-heading" className="mt-16 pt-12 border-t border-[#2E3644]">
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-[#F0583C] mb-2">
            {t.trace.activeLearning}
          </div>
          <h3 id="learning-heading" className="font-display text-xl sm:text-2xl font-bold text-[#EEF4F8]">
            {t.trace.currentlyExploring}
          </h3>
          <p className="text-xs sm:text-sm text-[#B4C2CF] font-sans mt-1 max-w-2xl leading-relaxed">
            {t.trace.activeLearningDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localizedLearningEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-xl bg-[#1B2029] border border-[#2E3644] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono font-bold text-sm text-[#EEF4F8]">{entry.topic}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#13161C] text-[#F0583C] border border-[#F0583C]/40 font-semibold shrink-0">
                    ○ {entry.status}
                  </span>
                </div>
                <p className="text-xs text-[#B4C2CF] leading-relaxed font-sans">
                  {entry.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bridge to Summary Receipt */}
      <div className="mt-20 pt-10 border-t border-[#2E3644] text-center">
        <div className="inline-block p-6 rounded-2xl bg-[#1B2029] border border-[#2E3644] max-w-xl mx-auto w-full">
          <div className="text-xs font-mono text-[#B9D6E6] uppercase tracking-wider mb-2">
            {t.trace.walkthroughComplete}
          </div>
          <div className="text-[#EEF4F8] font-sans text-sm mb-5">
            {t.trace.receiptCtaDesc}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenReceipt?.()}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#B9D6E6] hover:bg-[#cfe3ee] text-[#13161C] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Receipt className="w-4 h-4" aria-hidden="true" />
              <span>{t.trace.viewSummaryReceipt}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setShowSampleReceipt((prev) => !prev)}
              aria-expanded={showSampleReceipt}
              aria-controls="sample-test-receipt"
              className="print:hidden inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg bg-[#13161C] hover:bg-[#232935] text-[#B4C2CF] hover:text-[#EEF4F8] border border-[#2E3644] hover:border-[#B9D6E6]/40 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0583C]"
            >
              <Printer className="w-3.5 h-3.5 text-[#F0583C]" aria-hidden="true" />
              <span>{showSampleReceipt ? t.trace.hideTestReceipt : t.trace.showTestReceipt}</span>
            </button>
          </div>

          {showSampleReceipt && (
            <div
              id="sample-test-receipt"
              className="print:hidden mt-6 mx-auto max-w-xs bg-[#EEF4F8] text-[#13161C] border border-[#C9D6DF] rounded-lg px-4 py-5 font-mono text-xs text-left shadow-xl"
            >
              <div className="text-center pb-3 border-b border-dashed border-[#13161C]/35">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#3E4A5A]">
                  {t.trace.sampleReceiptHeader}
                </div>
                <div className="font-bold text-sm tracking-tight mt-0.5">
                  {t.trace.sampleReceiptPos}
                </div>
                <div className="text-[11px] text-[#3E4A5A]">
                  {t.trace.sampleReceiptSub}
                </div>
              </div>

              <div className="py-3 space-y-1.5 border-b border-dashed border-[#13161C]/35 text-[11px]">
                <div className="flex justify-between gap-2">
                  <span>1x ICED AMERICANO</span>
                  <span className="font-semibold">RM 10.90</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>1x BUTTER CROISSANT</span>
                  <span className="font-semibold">RM 8.50</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>1x OAT MILK ADD-ON</span>
                  <span className="font-semibold">RM 2.50</span>
                </div>
                <div className="flex justify-between gap-2 text-[#3E4A5A]">
                  <span>{t.trace.samplePromo}</span>
                  <span>-RM 2.19</span>
                </div>
              </div>

              <div className="py-3 space-y-1 border-b border-dashed border-[#13161C]/35 text-[11px]">
                <div className="flex justify-between gap-2">
                  <span>{t.trace.sampleSubtotal}</span>
                  <span>RM 19.71</span>
                </div>
                <div className="flex justify-between gap-2 font-bold text-xs pt-0.5">
                  <span>{t.trace.sampleTotal}</span>
                  <span>RM 19.71</span>
                </div>
                <div className="text-[10px] text-[#3E4A5A] pt-1">
                  {t.trace.sampleTender}
                </div>
              </div>

              <div className="pt-3 text-center">
                <div
                  className="thermal-barcode-mini h-7 w-full max-w-[180px] mx-auto mb-2 opacity-85"
                  aria-hidden="true"
                />
                <div className="text-[10px] text-[#3E4A5A] leading-snug">
                  {t.trace.sampleFooter}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
