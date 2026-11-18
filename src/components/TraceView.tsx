import React, { useState } from 'react';
import {
  STRATA,
  NODES,
  CASE_STUDIES,
  StratumType,
  PROFILE,
  LEARNING_ENTRIES,
  EVIDENCE_META,
  EvidenceStatus,
} from '../data/universeContent';
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
} from 'lucide-react';

interface TraceViewProps {
  onSelectNodeInAtlas?: (nodeId: string) => void;
  onOpenLab?: () => void;
}

export const TraceView: React.FC<TraceViewProps> = ({ onSelectNodeInAtlas, onOpenLab }) => {
  const [activeStratum, setActiveStratum] = useState<StratumType>('hardware');
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<string | null>(null);

  const stratumIcons: Record<StratumType, React.ReactNode> = {
    hardware: <Scan className="w-5 h-5 text-[#A8C5FF]" />,
    kernel: <Cpu className="w-5 h-5 text-[#A8C5FF]" />,
    network: <Network className="w-5 h-5 text-[#A8C5FF]" />,
    application: <Layers className="w-5 h-5 text-[#F2A77D]" />,
    cloud: <Cloud className="w-5 h-5 text-[#A8C5FF]" />,
    operations: <Users className="w-5 h-5 text-[#F2A77D]" />,
  };

  const getStatusLabel = (status: EvidenceStatus) => {
    const meta = EVIDENCE_META[status];
    const colorClass =
      status === 'learning'
        ? 'text-[#F2A77D] border-[#F2A77D]/40 bg-[#F2A77D]/10'
        : status === 'professional'
        ? 'text-[#A8C5FF] border-[#A8C5FF]/40 bg-[#A8C5FF]/10'
        : 'text-[#CFCAC0] border-[#242138] bg-[#0A0913]';
    return (
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border font-medium shrink-0 ${colorClass}`}
      >
        <span aria-hidden="true">{meta.glyph}</span>
        <span>{meta.label}</span>
      </span>
    );
  };

  return (
    <div className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-[#F6F2E9]">
      {/* Header */}
      <section
        aria-labelledby="candidate-intro-heading"
        className="mb-12 pb-10 border-b border-[#242138]"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[#A8C5FF] mb-3">
              {PROFILE.displayName} · Educational Walkthrough
            </p>

            <h1
              id="candidate-intro-heading"
              className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6F2E9] tracking-tight leading-tight mb-4"
            >
              Beep to Receipt:{' '}
              <span className="text-[#A8C5FF] font-normal">
                an educational walkthrough across 6 layers.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#CFCAC0] font-sans leading-relaxed max-w-2xl mb-6">
              {PROFILE.intro}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#9A94A8]">
              <span className="inline-flex items-center gap-1.5 text-[#F6F2E9] font-medium">
                <Briefcase className="w-3.5 h-3.5 text-[#F2A77D]" aria-hidden="true" />
                <span>{PROFILE.currentCompany}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#A8C5FF]" aria-hidden="true" />
                <span>AWS Certified Cloud Practitioner</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#9A94A8]" aria-hidden="true" />
                <span>{PROFILE.location}</span>
              </span>
            </div>
          </div>

          <div className="bg-[#12101F] border border-[#242138] rounded-2xl p-5 font-mono text-xs max-w-xs shrink-0 self-start">
            <div className="flex items-center justify-between text-[#9A94A8] text-[10px] uppercase mb-2">
              <span>Output View</span>
              <span className="text-[#A8C5FF]">PRINTABLE</span>
            </div>
            <div className="text-[#F6F2E9] font-bold mb-1">Summary Receipt</div>
            <p className="text-[#CFCAC0] font-sans text-xs leading-relaxed mb-3">
              Full work history, education, credentials, and contact links formatted as a receipt at the bottom of the page.
            </p>
            <a
              href="#receipt"
              className="inline-flex items-center gap-1.5 text-[#F2A77D] hover:text-[#F6F2E9] font-bold transition-colors"
            >
              <span>Jump to Receipt</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Explicit Educational Walkthrough Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-[#12101F] border border-[#A8C5FF]/40 flex items-start gap-3 text-xs sm:text-sm text-[#E6E1D6]">
          <Info className="w-4 h-4 text-[#A8C5FF] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong className="text-[#F6F2E9]">Educational Walkthrough:</strong> The six layers below provide an illustrative generic model of how a retail barcode scan can travel from counter peripherals to business applications and human support teams. Simulated payloads depict general concepts rather than any employer’s production environment.
          </p>
        </div>
      </section>

      {/* Strata Navigation Rail */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#A8C5FF] font-semibold mb-1">
              6 Illustrative Computing Layers
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#F6F2E9]">
              From Scan Input to Printed Receipt
            </h2>
          </div>
          <p className="text-[#9A94A8] font-mono text-xs max-w-md text-left sm:text-right">
            Select a layer below to inspect conceptual steps and related areas from my experience.
          </p>
        </div>

        <nav
          aria-label="Checkout layer step navigation"
          className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 font-mono text-xs"
        >
          {STRATA.map((st, i) => (
            <a
              key={st.id}
              href={`#stratum-${st.id}`}
              onClick={() => setActiveStratum(st.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                activeStratum === st.id
                  ? 'bg-[#12101F] text-[#A8C5FF] border-[#A8C5FF] font-semibold'
                  : 'bg-[#0A0913] text-[#9A94A8] border-[#242138] hover:text-[#F6F2E9] hover:border-[#A8C5FF]/40'
              }`}
            >
              <span className="text-[10px] text-[#9A94A8]">0{i + 1}.</span>
              <span>{st.title.split(' ')[0]}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* The 6 Vertical Strata */}
      <div className="relative border-l border-[#242138] ml-3 sm:ml-8 pl-5 sm:pl-10 space-y-16">
        {STRATA.map((st, idx) => {
          const matchingNodes = NODES.filter((n) => n.stratum === st.id);
          const matchingCaseStudies = CASE_STUDIES.filter((cs) => cs.stratumFocus === st.id);

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
                    ? 'bg-[#0A0913] border-[#F2A77D]'
                    : 'bg-[#0A0913] border-[#242138]'
                }`}
                aria-hidden="true"
              >
                {stratumIcons[st.id]}
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9A94A8] mb-1">
                  <span className="font-bold text-[#F2A77D]">Layer {st.index}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#A8C5FF]">{st.subtitle}</span>
                </div>
                <h3
                  id={`stratum-heading-${st.id}`}
                  className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#F6F2E9] tracking-tight"
                >
                  {st.title}
                </h3>
                <p className="mt-2 text-[#CFCAC0] text-xs sm:text-sm font-sans leading-relaxed max-w-4xl">
                  {st.description}
                </p>
              </div>

              {/* Illustrative Layer Visualization Box */}
              <div className="bg-[#12101F] border border-[#242138] rounded-2xl p-4 sm:p-6 mb-8 relative">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#242138] pb-3 mb-4 text-xs font-mono text-[#9A94A8]">
                  <span className="text-[#F6F2E9] font-semibold">
                    Layer 0{idx + 1} · {st.exampleStage}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#0A0913] border border-[#242138] text-[#A8C5FF] text-[10px] uppercase font-bold">
                    ILLUSTRATIVE CONCEPT
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    {st.exampleComponents.map((comp) => (
                      <div
                        key={comp}
                        className="bg-[#0A0913] border border-[#242138] rounded-xl p-3 text-[#CFCAC0]"
                      >
                        <div className="text-[#A8C5FF] font-bold text-[11px]">{comp}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#0A0913] border border-[#242138] rounded-xl p-3.5 space-y-1.5">
                    <div className="text-[11px] text-[#A8C5FF]">{st.examplePayload}</div>
                    <p className="font-sans text-xs text-[#CFCAC0] leading-relaxed">
                      {st.whatHappensConceptually}
                    </p>
                  </div>

                  {st.id === 'network' && onOpenLab && (
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] bg-[#0A0913] p-3 rounded-xl border border-[#242138]">
                      <span className="text-[#CFCAC0]">
                        Interactive Simulation: Inspect sample packet hops in the browser
                      </span>
                      <button
                        type="button"
                        onClick={onOpenLab}
                        className="text-[#A8C5FF] hover:text-[#F6F2E9] flex items-center gap-1.5 text-[11px] font-bold uppercase cursor-pointer"
                      >
                        <FlaskConical className="w-3.5 h-3.5 text-[#F2A77D]" aria-hidden="true" />
                        <span>Open Computing Lab</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Related Documented Skills in this Layer */}
              {matchingNodes.length > 0 && (
                <div className="mb-8">
                  <div className="text-xs font-mono text-[#9A94A8] uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>Related Skills in This Layer ({matchingNodes.length})</span>
                    <span className="text-[11px] hidden sm:inline">Select to open in Skill Atlas</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {matchingNodes.map((node) => (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => onSelectNodeInAtlas && onSelectNodeInAtlas(node.id)}
                        className="group text-left bg-[#12101F] hover:bg-[#19162B] border border-[#242138] hover:border-[#A8C5FF]/60 rounded-xl p-4 transition-colors cursor-pointer flex flex-col justify-between"
                      >
                        <div className="w-full">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="font-mono font-bold text-sm text-[#F6F2E9] group-hover:text-[#A8C5FF] transition-colors">
                              {node.label}
                            </span>
                            {getStatusLabel(node.status)}
                          </div>
                          <p className="text-xs text-[#CFCAC0] leading-relaxed font-sans mb-2">
                            {node.summary}
                          </p>
                          {node.usage && (
                            <div className="text-[11px] font-sans text-[#CFCAC0] bg-[#0A0913] p-2.5 rounded-lg border border-[#242138] mb-3 leading-snug">
                              <span className="font-mono text-[10px] text-[#A8C5FF] uppercase font-semibold block mb-0.5">
                                Where Applied:
                              </span>
                              {node.usage}
                            </div>
                          )}
                        </div>

                        <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#9A94A8] pt-2 border-t border-[#242138]">
                          <span className="uppercase">{node.category}</span>
                          <span className="text-[#A8C5FF] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-bold">
                            Inspect <span>→</span>
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
                  <div className="text-xs font-mono uppercase tracking-wider text-[#F2A77D] font-semibold">
                    Related Case Study
                  </div>

                  {matchingCaseStudies.map((cs) => {
                    const isExpanded = expandedCaseStudy === cs.id;

                    return (
                      <article
                        key={cs.id}
                        className="bg-[#12101F] border border-[#242138] hover:border-[#A8C5FF]/40 rounded-xl transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedCaseStudy(isExpanded ? null : cs.id)}
                          aria-expanded={isExpanded}
                          className="w-full text-left p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-4 rounded-xl"
                        >
                          <div>
                            <div className="text-xs font-mono text-[#9A94A8] mb-1">
                              {cs.organization}
                            </div>
                            <h4 className="font-display text-base sm:text-lg font-bold text-[#F6F2E9] hover:text-[#A8C5FF] transition-colors">
                              {cs.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-[#CFCAC0] mt-1 font-sans">
                              {cs.situation}
                            </p>
                          </div>
                          <span className="text-[#A8C5FF] p-1 font-mono text-xs flex items-center gap-1 self-center shrink-0">
                            <span>{isExpanded ? 'Less' : 'Details'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" aria-hidden="true" />
                            ) : (
                              <ChevronDown className="w-4 h-4" aria-hidden="true" />
                            )}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-[#242138] text-xs sm:text-sm space-y-4 font-sans text-[#CFCAC0]">
                            <div>
                              <div className="font-mono font-semibold text-[#A8C5FF] uppercase text-xs mb-1">
                                My Responsibility
                              </div>
                              <p>{cs.responsibility}</p>
                            </div>
                            <div>
                              <div className="font-mono font-semibold text-[#A8C5FF] uppercase text-xs mb-1">
                                What I Did
                              </div>
                              <ul className="list-disc list-inside space-y-1">
                                {cs.whatIDid.map((act, i) => (
                                  <li key={i}>{act}</li>
                                ))}
                              </ul>
                            </div>

                            {cs.outcome && (
                              <div className="bg-[#0A0913] p-3.5 rounded-xl border border-[#242138] text-xs">
                                <span className="font-mono font-semibold text-[#A8C5FF] uppercase block mb-1">
                                  Outcome
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
      <section aria-labelledby="learning-heading" className="mt-16 pt-12 border-t border-[#242138]">
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-[#F2A77D] mb-2">
            Active Learning
          </div>
          <h3 id="learning-heading" className="font-display text-xl sm:text-2xl font-bold text-[#F6F2E9]">
            Currently Exploring
          </h3>
          <p className="text-xs sm:text-sm text-[#CFCAC0] font-sans mt-1 max-w-2xl leading-relaxed">
            Areas I am actively studying outside production experience claims.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LEARNING_ENTRIES.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-xl bg-[#12101F] border border-[#242138] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono font-bold text-sm text-[#F6F2E9]">{entry.topic}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A0913] text-[#F2A77D] border border-[#F2A77D]/40 font-semibold shrink-0">
                    ○ {entry.status}
                  </span>
                </div>
                <p className="text-xs text-[#CFCAC0] leading-relaxed font-sans">
                  {entry.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bridge to Summary Receipt */}
      <div className="mt-20 pt-10 border-t border-[#242138] text-center">
        <div className="inline-block p-6 rounded-2xl bg-[#12101F] border border-[#242138] max-w-xl mx-auto">
          <div className="text-xs font-mono text-[#A8C5FF] uppercase tracking-wider mb-2">
            Walkthrough Complete
          </div>
          <div className="text-[#F6F2E9] font-sans text-sm mb-4">
            Scroll down or jump directly to the printable experience summary receipt.
          </div>
          <a
            href="#receipt"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#A8C5FF] hover:bg-[#bfd5ff] text-[#191723] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Receipt className="w-4 h-4" aria-hidden="true" />
            <span>View Summary Receipt</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
