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
  CheckCircle2,
  Activity,
  MapPin,
  Briefcase,
  Award,
  FlaskConical,
  ExternalLink,
  Receipt,
} from 'lucide-react';

interface TraceViewProps {
  onSelectNodeInAtlas?: (nodeId: string) => void;
  onOpenLab?: () => void;
}

export const TraceView: React.FC<TraceViewProps> = ({ onSelectNodeInAtlas, onOpenLab }) => {
  const [activeStratum, setActiveStratum] = useState<StratumType>('hardware');
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<string | null>(null);

  const nodeMap = new Map(NODES.map((n) => [n.id, n]));

  const stratumIcons: Record<StratumType, React.ReactNode> = {
    hardware: <Scan className="w-5 h-5 text-[#B0E0E6]" />,
    os: <Cpu className="w-5 h-5 text-[#B0E0E6]" />,
    network: <Network className="w-5 h-5 text-[#B0E0E6]" />,
    application: <Layers className="w-5 h-5 text-[#DC343B]" />,
    'cloud-automation': <Cloud className="w-5 h-5 text-[#B0E0E6]" />,
    'people-process': <Users className="w-5 h-5 text-[#DC343B]" />,
  };

  const getStatusLabel = (status: EvidenceStatus) => {
    const meta = EVIDENCE_META[status];
    const colorClass =
      status === 'learning'
        ? 'text-[#DC343B] border-[#DC343B]/40 bg-[#DC343B]/10'
        : status === 'professional'
        ? 'text-[#B0E0E6] border-[#B0E0E6]/40 bg-[#B0E0E6]/10'
        : 'text-[#D1D5DB] border-[#323238] bg-[#1B1B1D]';
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
    <div className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <section
        aria-labelledby="candidate-intro-heading"
        className="mb-14 pb-12 border-b border-[#323238]"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-3">
              {PROFILE.displayName} · System Application Specialist · Architecture Trace
            </p>

            <h1
              id="candidate-intro-heading"
              className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4"
            >
              Solving retail systems by day.{' '}
              <span className="text-[#B0E0E6] font-normal">
                Exploring computing depth by night.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#D1D5DB] font-sans leading-relaxed max-w-2xl mb-6">
              {PROFILE.intro} I specialize in multi-store retail POS infrastructure, enterprise SaaS
              migrations, and Layer 1–4 troubleshooting—grounded in curiosity for how kernels,
              networks, and distributed systems work.
            </p>

            {/* Unboxed Clean Metadata Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#9CA3AF]">
              <span className="inline-flex items-center gap-1.5 text-white font-medium">
                <Briefcase className="w-3.5 h-3.5 text-[#DC343B]" aria-hidden="true" />
                <span>emart24 Malaysia</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
                <span>AWS Certified Cloud Practitioner</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#9CA3AF]" aria-hidden="true" />
                <span>Kuala Lumpur, Malaysia</span>
              </span>
            </div>
          </div>

          <div className="bg-[#222226] border border-[#323238] rounded-2xl p-5 font-mono text-xs max-w-xs shrink-0 self-start">
            <div className="flex items-center justify-between text-[#9CA3AF] text-[10px] uppercase mb-2">
              <span>Artifact Output</span>
              <span className="text-[#B0E0E6]">VERIFIED</span>
            </div>
            <div className="text-white font-bold mb-1">THE THERMAL RECEIPT</div>
            <p className="text-[#D1D5DB] font-sans text-xs leading-relaxed mb-3">
              Full career chronology, degrees, and contact details printed on thermal paper at the
              bottom of the trace.
            </p>
            <a
              href="#receipt"
              className="inline-flex items-center gap-1.5 text-[#DC343B] hover:text-white font-bold transition-colors"
            >
              <span>Jump to Receipt</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Beep to Receipt Strata Navigation Rail */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] font-semibold mb-1">
              THE 6 COMPUTING STRATA
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              One Scan. Six Layers.
            </h2>
          </div>
          <p className="text-[#9CA3AF] font-mono text-xs max-w-md text-left sm:text-right">
            Follow a checkout barcode scan down from physical optics through device drivers, VLAN
            routing, and transactional databases.
          </p>
        </div>

        <nav
          aria-label="Strata Step Navigation"
          className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 font-mono text-xs"
        >
          {STRATA.map((st, i) => (
            <a
              key={st.id}
              href={`#stratum-${st.id}`}
              onClick={() => setActiveStratum(st.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                activeStratum === st.id
                  ? 'bg-[#222226] text-[#B0E0E6] border-[#B0E0E6] font-semibold'
                  : 'bg-[#151517] text-[#9CA3AF] border-[#323238] hover:text-white hover:border-[#B0E0E6]/40'
              }`}
            >
              <span className="text-[10px] text-[#9CA3AF]">0{i + 1}.</span>
              <span>{st.title.split(' ')[0]}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* The 6 Vertical Strata */}
      <div className="relative border-l border-[#323238] ml-3 sm:ml-8 pl-5 sm:pl-10 space-y-16">
        {STRATA.map((st, idx) => {
          const matchingCaseStudies = CASE_STUDIES.filter((cs) => cs.stratum === st.id);

          return (
            <section
              key={st.id}
              id={`stratum-${st.id}`}
              className="relative scroll-mt-24"
              aria-labelledby={`stratum-heading-${st.id}`}
              onMouseEnter={() => setActiveStratum(st.id)}
            >
              {/* Stratum Icon Pin */}
              <div
                className={`absolute -left-[27px] sm:-left-[47px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center transition-colors ${
                  activeStratum === st.id
                    ? 'bg-[#1B1B1D] border-[#DC343B]'
                    : 'bg-[#1B1B1D] border-[#323238]'
                }`}
                aria-hidden="true"
              >
                {stratumIcons[st.id]}
              </div>

              {/* Stratum Header */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9CA3AF] mb-1">
                  <span className="font-bold text-[#DC343B]">{st.number}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#B0E0E6]">{st.tagline}</span>
                </div>
                <h3
                  id={`stratum-heading-${st.id}`}
                  className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight"
                >
                  {st.title}
                </h3>
                <p className="mt-2 text-[#D1D5DB] text-xs sm:text-sm font-sans leading-relaxed max-w-4xl">
                  {st.stepDescription}
                </p>
              </div>

              {/* Architecture Visualization Box */}
              <div className="bg-[#222226] border border-[#323238] rounded-2xl p-4 sm:p-6 mb-8 relative">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#323238] pb-3 mb-4 text-xs font-mono text-[#9CA3AF]">
                  <span className="flex items-center gap-2 text-white">
                    <Activity className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
                    <span>STRATUM 0{idx + 1} ARCHITECTURE VISUALIZATION</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#1B1B1D] border border-[#323238] text-[#B0E0E6] text-[10px] uppercase font-bold">
                    ILLUSTRATIVE SYSTEM STATE
                  </span>
                </div>

                {renderStratumVisual(st.id, onOpenLab)}
              </div>

              {/* Annotated Nodes */}
              <div className="mb-8">
                <div className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Annotated Technical Competencies ({st.annotationNodeIds.length} Nodes)</span>
                  <span className="text-[11px] hidden sm:inline">Click node to inspect in Atlas</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {st.annotationNodeIds.map((nodeId) => {
                    const node = nodeMap.get(nodeId);
                    if (!node) return null;

                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => onSelectNodeInAtlas && onSelectNodeInAtlas(node.id)}
                        className="group text-left bg-[#222226] hover:bg-[#2B2B30] border border-[#323238] hover:border-[#B0E0E6]/60 rounded-xl p-4 transition-colors cursor-pointer flex flex-col justify-between"
                      >
                        <div className="w-full">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="font-mono font-bold text-sm text-white group-hover:text-[#B0E0E6] transition-colors">
                              {node.label}
                            </span>
                            {getStatusLabel(node.status)}
                          </div>
                          <p className="text-xs text-[#D1D5DB] leading-relaxed font-sans mb-2">
                            {node.summary}
                          </p>
                          {node.usage && (
                            <div className="text-[11px] font-sans text-[#D1D5DB] bg-[#1B1B1D] p-2.5 rounded-lg border border-[#323238] mb-3 leading-snug">
                              <span className="font-mono text-[10px] text-[#B0E0E6] uppercase font-semibold block mb-0.5">
                                Applied Usage:
                              </span>
                              {node.usage}
                            </div>
                          )}
                        </div>

                        <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#9CA3AF] pt-2 border-t border-[#323238]">
                          <span className="uppercase">{node.category}</span>
                          <span className="text-[#B0E0E6] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-bold">
                            Inspect <span>→</span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Operational Case Studies in this Stratum */}
              {matchingCaseStudies.length > 0 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#DC343B] font-semibold">
                    Operational Field Case Studies ({matchingCaseStudies.length})
                  </div>

                  {matchingCaseStudies.map((cs) => {
                    const isExpanded = expandedCaseStudy === cs.id;

                    return (
                      <article
                        key={cs.id}
                        className="bg-[#222226] border border-[#323238] hover:border-[#B0E0E6]/40 rounded-xl transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedCaseStudy(isExpanded ? null : cs.id)}
                          aria-expanded={isExpanded}
                          className="w-full text-left p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-4 rounded-xl"
                        >
                          <div>
                            <div className="text-xs font-mono text-[#9CA3AF] mb-1">
                              {cs.organization} · {cs.period}
                            </div>
                            <h4 className="font-display text-base sm:text-lg font-bold text-white hover:text-[#B0E0E6] transition-colors">
                              {cs.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-[#D1D5DB] mt-1 font-sans">
                              {cs.hook}
                            </p>
                          </div>
                          <span className="text-[#B0E0E6] p-1 font-mono text-xs flex items-center gap-1 self-center shrink-0">
                            <span>{isExpanded ? 'Less' : 'Dossier'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" aria-hidden="true" />
                            ) : (
                              <ChevronDown className="w-4 h-4" aria-hidden="true" />
                            )}
                          </span>
                        </button>

                        {isExpanded && (
                          <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-[#323238] text-xs sm:text-sm space-y-4 font-sans text-[#D1D5DB]">
                            <div>
                              <div className="font-mono font-semibold text-[#B0E0E6] uppercase text-xs mb-1">
                                The Challenge
                              </div>
                              <p className="leading-relaxed">{cs.challenge}</p>
                            </div>

                            <div>
                              <div className="font-mono font-semibold text-[#B0E0E6] uppercase text-xs mb-1">
                                Investigation Methodology
                              </div>
                              <p className="leading-relaxed">{cs.investigation}</p>
                            </div>

                            <div>
                              <div className="font-mono font-semibold text-[#B0E0E6] uppercase text-xs mb-1">
                                Actions Taken
                              </div>
                              <ul className="list-disc list-inside space-y-1">
                                {cs.actions.map((act, i) => (
                                  <li key={i}>{act}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-[#1B1B1D] p-4 rounded-xl border border-[#323238]">
                              <div className="font-mono font-semibold text-[#B0E0E6] uppercase text-xs mb-1.5 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
                                <span>Verified Outcomes</span>
                              </div>
                              <ul className="space-y-1 text-[#D1D5DB] text-xs">
                                {cs.outcome.map((out, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-[#DC343B] font-bold">✓</span>
                                    <span>{out}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-3.5 rounded-xl bg-[#1B1B1D] border border-[#B0E0E6]/35 text-xs font-mono text-[#B0E0E6]">
                              <span className="font-bold uppercase tracking-wider text-white">
                                Takeaway:{' '}
                              </span>
                              {cs.takeaway}
                            </div>
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
      <section aria-labelledby="learning-heading" className="mt-16 pt-12 border-t border-[#323238]">
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-[#DC343B] mb-2">
            Active Study Frontiers · Early Stage
          </div>
          <h3 id="learning-heading" className="font-display text-xl sm:text-2xl font-bold text-white">
            Currently Learning & Active Explorations
          </h3>
          <p className="text-xs sm:text-sm text-[#D1D5DB] font-sans mt-1 max-w-2xl leading-relaxed">
            Honest boundaries: technologies I am actively investigating and learning without
            claiming early exploration as production expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LEARNING_ENTRIES.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-xl bg-[#222226] border border-[#323238] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono font-bold text-sm text-white">{entry.topic}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1B1B1D] text-[#DC343B] border border-[#DC343B]/40 font-semibold shrink-0">
                    ○ Learning
                  </span>
                </div>
                <p className="text-xs text-[#D1D5DB] leading-relaxed font-sans mb-3">
                  {entry.note}
                </p>
              </div>
              <div className="pt-2 border-t border-[#323238] text-[10px] font-mono text-[#9CA3AF]">
                <span className="uppercase font-semibold text-[#B0E0E6]">Context: </span>
                <span>{entry.context}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Culmination Bridge to Thermal Receipt */}
      <div className="mt-20 pt-10 border-t border-[#323238] text-center">
        <div className="inline-block p-6 rounded-2xl bg-[#222226] border border-[#323238] max-w-xl mx-auto">
          <div className="text-xs font-mono text-[#B0E0E6] uppercase tracking-wider mb-2">
            6 Strata Traversed · Loop Complete
          </div>
          <div className="text-white font-sans text-sm mb-4">
            The data packet is committed, inventory validated, and the thermal receipt printed.
          </div>
          <a
            href="#receipt"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#DC343B] hover:bg-[#c52b31] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Receipt className="w-4 h-4" aria-hidden="true" />
            <span>Proceed to Thermal Receipt Output</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

function renderStratumVisual(stratum: StratumType, onOpenLab?: () => void) {
  switch (stratum) {
    case 'hardware':
      return (
        <div className="space-y-3 font-mono text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="bg-[#1B1B1D] border border-[#323238] rounded-xl p-3">
              <div className="text-[#B0E0E6] font-bold mb-1">OPTICAL SCANNER</div>
              <div className="text-[10px] text-[#9CA3AF]">650nm Laser Photodiode</div>
              <div className="mt-1.5 text-[10px] text-[#D1D5DB]">RS-232 / HID</div>
            </div>
            <div className="bg-[#1B1B1D] border border-[#323238] rounded-xl p-3">
              <div className="text-[#B0E0E6] font-bold mb-1">TERMINAL PC</div>
              <div className="text-[10px] text-[#9CA3AF]">Intel Core / Embedded</div>
              <div className="mt-1.5 text-[10px] text-[#D1D5DB]">COM1 - COM4</div>
            </div>
            <div className="bg-[#1B1B1D] border border-[#323238] rounded-xl p-3">
              <div className="text-[#B0E0E6] font-bold mb-1">EDC PINPAD</div>
              <div className="text-[10px] text-[#9CA3AF]">EMV Chip / NFC Reader</div>
              <div className="mt-1.5 text-[10px] text-[#D1D5DB]">Serial 115200 bps</div>
            </div>
            <div className="bg-[#1B1B1D] border border-[#323238] rounded-xl p-3">
              <div className="text-[#B0E0E6] font-bold mb-1">THERMAL PRINTER</div>
              <div className="text-[10px] text-[#9CA3AF]">80mm Direct Thermal</div>
              <div className="mt-1.5 text-[10px] text-[#D1D5DB]">ESC/POS Raster</div>
            </div>
          </div>
          <div className="bg-[#1B1B1D] p-3 rounded-xl border border-[#323238] text-[11px] text-[#D1D5DB]">
            <span className="text-[#B0E0E6] font-bold">Physical Continuity Check:</span> Pin 2
            (RX), pin 3 (TX), pin 5 (GND) verified on DB9 cable. RJ45 patch cables tested with
            8P8C wire map tester for 1000BASE-T link integrity.
          </div>
        </div>
      );

    case 'os':
      return (
        <div className="font-mono text-xs space-y-2">
          <div className="bg-[#151517] p-3.5 rounded-xl border border-[#323238] text-[#D1D5DB]">
            <div className="flex justify-between items-center text-[11px] text-[#9CA3AF] border-b border-[#323238] pb-1.5 mb-2">
              <span>KERNEL DEVICE NODE & PROCESS TABLE</span>
              <span className="text-[#B0E0E6]">SIMULATED OS INTERRUPT</span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div>
                <span className="text-[#9CA3AF]">IRQ 04:</span> serial8250 /dev/ttyS0 [38400 8N1]
                - <span className="text-[#B0E0E6]">Interrupt Handler Tripped</span>
              </div>
              <div>
                <span className="text-[#9CA3AF]">BUF_IN:</span> 0x39 0x35 0x35 0x35 0x30 0x31 0x38
                0x34 0x32 0x0D <span className="text-white">("955501842\r")</span>
              </div>
              <div>
                <span className="text-[#9CA3AF]">PID 1142:</span> /usr/bin/pos_daemon
                --store-id=084 --station=01 (<span className="text-[#B0E0E6]">22.4 MB RSS</span>)
              </div>
              <div>
                <span className="text-[#9CA3AF]">PERMISSIONS:</span> crw-rw---- 1 root dialout 4,
                64 /dev/ttyS0
              </div>
            </div>
          </div>
          <div className="text-[11px] text-[#9CA3AF]">
            Hardware interrupt triggers kernel serial buffer; POS daemon reads unbuffered bytes
            through non-blocking select() poll loop.
          </div>
        </div>
      );

    case 'network':
      return (
        <div className="font-mono text-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3.5 rounded-xl bg-[#1B1B1D] border border-[#323238]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#222226] text-[#B0E0E6] border border-[#323238] text-[10px]">
                VLAN 10: POS
              </span>
              <span className="text-[#9CA3AF]">→</span>
              <span className="px-2 py-0.5 rounded bg-[#222226] text-white border border-[#323238] text-[10px]">
                Managed Switch
              </span>
              <span className="text-[#9CA3AF]">→</span>
              <span className="px-2 py-0.5 rounded bg-[#DC343B]/15 text-[#DC343B] border border-[#DC343B]/40 text-[10px]">
                Dual-WAN Router
              </span>
            </div>
            <div className="text-[10px] text-[#B0E0E6] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B0E0E6] inline-block" aria-hidden="true" />
              <span>WAN1 Active (Fibre) · WAN2 Standby (4G)</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] bg-[#1B1B1D] p-3 rounded-xl border border-[#323238]">
            <span className="text-[#D1D5DB]">
              Interactive Simulation: Packet hop routing & TCP handshake
            </span>
            {onOpenLab && (
              <button
                type="button"
                onClick={onOpenLab}
                className="text-[#B0E0E6] hover:text-white flex items-center gap-1.5 text-[11px] font-bold uppercase cursor-pointer"
              >
                <FlaskConical className="w-3.5 h-3.5 text-[#DC343B]" aria-hidden="true" />
                <span>Open Packet Hop Workbench</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      );

    case 'application':
      return (
        <div className="font-mono text-xs space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-[#1B1B1D] p-3 rounded-xl border border-[#323238]">
              <div className="text-[#9CA3AF] text-[10px] uppercase mb-1">
                SKU Cache Eviction Policy
              </div>
              <div className="text-white text-xs">SKU #955501842: In-Memory Hit</div>
              <div className="text-[10px] text-[#B0E0E6] mt-1">
                Lookup latency: 0.42ms · Cache Hit Ratio: 94.2%
              </div>
            </div>
            <div className="bg-[#1B1B1D] p-3 rounded-xl border border-[#323238]">
              <div className="text-[#9CA3AF] text-[10px] uppercase mb-1">
                ISO 8583 Payment Message
              </div>
              <div className="text-white text-xs">MTI 0100: Auth Request</div>
              <div className="text-[10px] text-[#B0E0E6] mt-1">
                Field 03: 000000 (Purchase) · Field 04: MYR 14.80
              </div>
            </div>
          </div>
          <div className="text-[11px] text-[#9CA3AF]">
            Application calculates multi-item bundle promotion, validates tax breakdown, and
            serializes transaction envelope for acquirer gateway.
          </div>
        </div>
      );

    case 'cloud-automation':
      return (
        <div className="font-mono text-xs space-y-2">
          <div className="bg-[#1B1B1D] p-3.5 rounded-xl border border-[#323238] space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-[#9CA3AF] border-b border-[#323238] pb-1.5">
              <span>PLATFORM ORCHESTRATION PIPELINE</span>
              <span className="text-[#B0E0E6]">LARK BASE + NETSUITE SYNC</span>
            </div>
            <div className="text-[11px] text-[#D1D5DB] flex items-center justify-between">
              <span>1. Store Inventory Deducted</span>
              <span className="text-[#B0E0E6] font-bold">ACK 200 OK</span>
            </div>
            <div className="text-[11px] text-[#D1D5DB] flex items-center justify-between">
              <span>2. Lark Approval Bot Triggered</span>
              <span className="text-white">THRESHOLD &gt; 90% (No alert)</span>
            </div>
            <div className="text-[11px] text-[#D1D5DB] flex items-center justify-between">
              <span>3. Financial Batch Reconciliation</span>
              <span className="text-[#B0E0E6]">NetSuite Scheduled Batch</span>
            </div>
          </div>
        </div>
      );

    case 'people-process':
      return (
        <div className="font-mono text-xs space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="bg-[#1B1B1D] p-3 rounded-xl border border-[#323238]">
              <div className="text-[#DC343B] font-bold mb-0.5">COMMISSIONING RUNBOOK</div>
              <div className="text-[#D1D5DB] text-[10px]">
                Checklist for hardware signoff, switch VLAN tagging, and POS test transactions.
              </div>
            </div>
            <div className="bg-[#1B1B1D] p-3 rounded-xl border border-[#323238]">
              <div className="text-[#DC343B] font-bold mb-0.5">VENDOR SLA TRIAGE</div>
              <div className="text-[#D1D5DB] text-[10px]">
                Severity 1 response &lt; 30 mins; Acquirer and ISP failover coordination.
              </div>
            </div>
            <div className="bg-[#1B1B1D] p-3 rounded-xl border border-[#323238]">
              <div className="text-[#DC343B] font-bold mb-0.5">ITIL 4 POSTMORTEM</div>
              <div className="text-[#D1D5DB] text-[10px]">
                Root cause analysis logs, knowledge base articles, and incident prevention.
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
