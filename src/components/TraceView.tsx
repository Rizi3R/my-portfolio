import React, { useState } from 'react';
import { 
  STRATA, 
  NODES, 
  CASE_STUDIES, 
  StratumType, 
  PROFILE 
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
  ShieldCheck, 
  FlaskConical,
  ExternalLink,
  Receipt
} from 'lucide-react';

interface TraceViewProps {
  onSelectNodeInAtlas?: (nodeId: string) => void;
  onOpenLab?: () => void;
}

export const TraceView: React.FC<TraceViewProps> = ({ onSelectNodeInAtlas, onOpenLab }) => {
  const [activeStratum, setActiveStratum] = useState<StratumType>('hardware');
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<string | null>(null);

  // Quick lookup map for nodes
  const nodeMap = new Map(NODES.map(n => [n.id, n]));

  // Stratum icons mapping
  const stratumIcons: Record<StratumType, React.ReactNode> = {
    'hardware': <Scan className="w-5 h-5 text-cyan-400" />,
    'os': <Cpu className="w-5 h-5 text-emerald-400" />,
    'network': <Network className="w-5 h-5 text-sky-400" />,
    'application': <Layers className="w-5 h-5 text-amber-400" />,
    'cloud-automation': <Cloud className="w-5 h-5 text-purple-400" />,
    'people-process': <Users className="w-5 h-5 text-rose-400" />
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'professional':
        return <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-semibold"><span>◆</span> [PROFESSIONAL]</span>;
      case 'project':
        return <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 bg-sky-950/80 text-sky-300 border border-sky-700/60 font-semibold"><span>■</span> [PROJECT]</span>;
      case 'experiment':
        return <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 bg-amber-950/80 text-amber-300 border border-amber-700/60 font-semibold"><span>△</span> [EXPERIMENT]</span>;
      case 'foundation':
        return <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 bg-teal-950/80 text-teal-300 border border-teal-700/60 font-semibold"><span>⊕</span> [FOUNDATION]</span>;
      case 'learning':
        return <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 bg-stone-900 text-stone-300 border border-stone-600 font-semibold"><span>○</span> [LEARNING]</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 bg-stone-800 text-stone-300 border border-stone-600"><span>◇</span> [EXPLORING]</span>;
    }
  };

  return (
    <div className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* =========================================================================
         1. CANDIDATE PROFILE HERO HEADER (Dual Identity: Operations + Curiosity)
         ========================================================================= */}
      <section 
        aria-labelledby="candidate-intro-heading"
        className="mb-14 pb-12 border-b border-stone-800/80"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-3xl">
            {/* Identity Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 bg-stone-900/90 border border-stone-700/80 text-stone-300 text-xs font-mono uppercase tracking-widest mb-4">
              <span className="text-cyan-400">◆</span>
              <span className="font-bold text-stone-100">{PROFILE.displayName}</span>
              <span className="text-stone-600">·</span>
              <span className="text-cyan-300">System Application Specialist</span>
            </div>

            {/* Main Headline */}
            <h1 
              id="candidate-intro-heading"
              className="text-2xl sm:text-4xl lg:text-5xl font-mono font-bold text-stone-100 tracking-tight leading-tight mb-4"
            >
              Solving retail systems by day.<br />
              <span className="text-stone-400 font-normal">Exploring computing depth by night.</span>
            </h1>

            {/* Core Philosophy & Grounding */}
            <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed max-w-2xl mb-6">
              {PROFILE.intro} I specialize in multi-store retail POS infrastructure, enterprise SaaS migrations, and Layer 1–4 troubleshooting—grounded in curiosity for how compilers, kernels, and network stacks genuinely operate.
            </p>

            {/* Verified Credentials Pills */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-stone-400">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-900 border border-stone-800 text-stone-300">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                <span>emart24 Malaysia</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-900 border border-stone-800 text-stone-300">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>AWS Certified Cloud Practitioner</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-900 border border-stone-800 text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                <span>Kuala Lumpur, Malaysia</span>
              </span>
            </div>
          </div>

          {/* Quick Anchor Card to Receipt */}
          <div className="bg-stone-950 border border-stone-800 p-4 font-mono text-xs max-w-xs shrink-0 self-start">
            <div className="flex items-center justify-between text-stone-400 text-[10px] uppercase mb-2">
              <span>Artifact Output</span>
              <span className="text-cyan-400">VERIFIED</span>
            </div>
            <div className="text-stone-200 font-bold mb-1">THE THERMAL RECEIPT</div>
            <p className="text-stone-400 text-[11px] leading-relaxed mb-3">
              Full career chronology, degrees, and contact details printed on thermal paper at the bottom of the journey.
            </p>
            <a
              href="#receipt"
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
            >
              <span>Jump to Receipt</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. "BEEP TO RECEIPT" JOURNEY PREMISE & MOBILE RAIL
         ========================================================================= */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
              THE 6 COMPUTING STRATA
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-stone-100">
              One Scan. Six Layers.
            </h2>
          </div>
          <p className="text-stone-400 font-mono text-xs max-w-md text-left sm:text-right">
            Follow a checkout barcode scan down from physical optics through device drivers, VLAN routing, and transactional databases.
          </p>
        </div>

        {/* Mobile Horizontal Scrollable Strata Rail (No awkward wrapping) */}
        <nav 
          aria-label="Strata Step Navigation" 
          className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 font-mono text-xs scrollbar-none"
        >
          {STRATA.map((st, i) => (
            <a
              key={st.id}
              href={`#stratum-${st.id}`}
              onClick={() => setActiveStratum(st.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 border transition-all ${
                activeStratum === st.id
                  ? 'bg-stone-800 text-cyan-300 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.2)] font-bold'
                  : 'bg-stone-950/80 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700'
              }`}
            >
              <span className="text-[10px] text-stone-500">0{i + 1}.</span>
              <span>{st.title.split(' ')[0]}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* =========================================================================
         3. THE 6 VERTICAL STRATA
         ========================================================================= */}
      <div className="relative border-l-2 border-stone-800 ml-3 sm:ml-8 pl-5 sm:pl-10 space-y-18">
        {STRATA.map((st, idx) => {
          const matchingCaseStudies = CASE_STUDIES.filter(cs => cs.stratum === st.id);

          return (
            <section
              key={st.id}
              id={`stratum-${st.id}`}
              className="relative scroll-mt-24"
              aria-labelledby={`stratum-heading-${st.id}`}
              onMouseEnter={() => setActiveStratum(st.id)}
            >
              {/* Stratum Pin / Node Icon on Left Timeline */}
              <div 
                className={`absolute -left-[27px] sm:-left-[47px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 border flex items-center justify-center transition-colors ${
                  activeStratum === st.id 
                    ? 'bg-stone-950 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.35)]' 
                    : 'bg-stone-950 border-stone-700 text-stone-400'
                }`}
                aria-hidden="true"
              >
                {stratumIcons[st.id]}
              </div>

              {/* Stratum Header */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500 mb-1">
                  <span className="font-bold text-stone-400">{st.number}</span>
                  <span>·</span>
                  <span className="text-cyan-400/90">{st.tagline}</span>
                </div>
                <h3 
                  id={`stratum-heading-${st.id}`}
                  className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-stone-100 tracking-tight"
                >
                  {st.title}
                </h3>
                <p className="mt-2 text-stone-300 text-xs sm:text-sm font-sans leading-relaxed max-w-4xl">
                  {st.stepDescription}
                </p>
              </div>

              {/* Stratum Technical Architecture Visualization Box */}
              <div className="bg-stone-950/90 border border-stone-800 p-4 sm:p-6 mb-8 relative">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3 mb-4 text-xs font-mono text-stone-400">
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>STRATUM 0{idx + 1} ARCHITECTURE VISUALIZATION</span>
                  </span>
                  <span className="px-2 py-0.5 bg-stone-900 border border-stone-700 text-stone-400 text-[10px] uppercase font-bold">
                    [ILLUSTRATIVE_SYSTEM_STATE]
                  </span>
                </div>

                {/* Technical visualizer */}
                {renderStratumVisual(st.id, onOpenLab)}
              </div>

              {/* Annotated Topology Nodes in this Stratum */}
              <div className="mb-8">
                <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Annotated Technical Competencies ({st.annotationNodeIds.length} Nodes)</span>
                  <span className="text-[11px] text-stone-500 hidden sm:inline">Click node to inspect in Atlas</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {st.annotationNodeIds.map(nodeId => {
                    const node = nodeMap.get(nodeId);
                    if (!node) return null;

                    return (
                      <div
                        key={node.id}
                        onClick={() => onSelectNodeInAtlas && onSelectNodeInAtlas(node.id)}
                        className="group bg-stone-900/40 hover:bg-stone-900 border border-stone-800 hover:border-cyan-500/60 p-4 transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="font-mono font-bold text-sm text-stone-100 group-hover:text-cyan-300 transition-colors">
                              {node.label}
                            </span>
                            {getStatusBadge(node.status)}
                          </div>
                          <p className="text-xs text-stone-400 leading-relaxed font-sans mb-3">
                            {node.summary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pt-2 border-t border-stone-800/60">
                          <span className="uppercase">Kind: {node.kind}</span>
                          <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-bold">
                            Inspect <span>→</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Real Operational Case Studies in this Stratum */}
              {matchingCaseStudies.length > 0 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
                    <span>Operational Field Case Studies ({matchingCaseStudies.length})</span>
                  </div>

                  {matchingCaseStudies.map(cs => {
                    const isExpanded = expandedCaseStudy === cs.id;

                    return (
                      <article 
                        key={cs.id}
                        className="bg-stone-900/60 border border-stone-800 hover:border-stone-700 transition-colors"
                      >
                        <div 
                          onClick={() => setExpandedCaseStudy(isExpanded ? null : cs.id)}
                          className="p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-4"
                        >
                          <div>
                            <div className="text-xs font-mono text-stone-400 mb-1">
                              {cs.organization}
                            </div>
                            <h4 className="text-base sm:text-lg font-mono font-bold text-stone-100 hover:text-cyan-300 transition-colors">
                              {cs.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-stone-300 mt-1 font-sans">
                              {cs.hook}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="text-stone-400 hover:text-stone-200 p-1 font-mono text-xs flex items-center gap-1 self-center shrink-0 cursor-pointer"
                            aria-expanded={isExpanded}
                            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} case study: ${cs.title}`}
                          >
                            <span>{isExpanded ? 'Less' : 'Dossier'}</span>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Collapsible Deep Dive */}
                        {isExpanded && (
                          <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-stone-800 text-xs sm:text-sm space-y-4 font-sans text-stone-300">
                            <div>
                              <div className="font-mono font-semibold text-stone-200 uppercase text-xs mb-1">
                                [THE_CHALLENGE]
                              </div>
                              <p className="leading-relaxed text-stone-300">
                                {cs.challenge}
                              </p>
                            </div>

                            <div>
                              <div className="font-mono font-semibold text-stone-200 uppercase text-xs mb-1">
                                [INVESTIGATION_METHODOLOGY]
                              </div>
                              <p className="leading-relaxed text-stone-300">
                                {cs.investigation}
                              </p>
                            </div>

                            <div>
                              <div className="font-mono font-semibold text-stone-200 uppercase text-xs mb-1">
                                [KEY_ACTIONS_TAKEN]
                              </div>
                              <ul className="list-disc list-inside space-y-1 text-stone-300">
                                {cs.actions.map((act, i) => (
                                  <li key={i}>{act}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-stone-950 p-4 border border-stone-800">
                              <div className="font-mono font-semibold text-emerald-400 uppercase text-xs mb-1.5 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span>[VERIFIABLE_OUTCOMES]</span>
                              </div>
                              <ul className="space-y-1 text-stone-300 text-xs font-mono">
                                {cs.outcome.map((out, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <span>{out}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-3 bg-cyan-950/30 border-l-2 border-cyan-500 text-xs font-mono text-cyan-200">
                              <span className="font-bold uppercase tracking-wider">[TAKEAWAY]: </span>
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

      {/* Culmination Bridge to the Thermal Receipt */}
      <div className="mt-20 pt-10 border-t border-stone-800 text-center">
        <div className="inline-block p-5 bg-stone-950 border border-stone-800 max-w-xl mx-auto">
          <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-2">
            6 Strata Traversed · Loop Complete
          </div>
          <div className="text-stone-200 font-mono text-sm mb-4">
            The data packet is committed, the inventory threshold checked, and the thermal receipt printed.
          </div>
          <a
            href="#receipt"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 hover:bg-white text-stone-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Receipt className="w-4 h-4 text-stone-950" />
            <span>Proceed to Thermal Receipt Output</span>
            <ArrowRight className="w-4 h-4 text-stone-950" />
          </a>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   TECHNICAL STRATUM VISUALIZERS (100% Truthful, Illustrative System State)
   ========================================================================= */

function renderStratumVisual(stratum: StratumType, onOpenLab?: () => void) {
  switch (stratum) {
    case 'hardware':
      return (
        <div className="space-y-3 font-mono text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="bg-stone-900 border border-stone-800 p-2.5">
              <div className="text-cyan-400 font-bold mb-1">OPTICAL SCANNER</div>
              <div className="text-[10px] text-stone-400">650nm Laser Photodiode</div>
              <div className="mt-1 text-[9px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-1 py-0.5">RS-232 / HID</div>
            </div>
            <div className="bg-stone-900 border border-stone-800 p-2.5">
              <div className="text-cyan-400 font-bold mb-1">TERMINAL PC</div>
              <div className="text-[10px] text-stone-400">Intel Core / Embedded</div>
              <div className="mt-1 text-[9px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-1 py-0.5">COM1 - COM4</div>
            </div>
            <div className="bg-stone-900 border border-stone-800 p-2.5">
              <div className="text-cyan-400 font-bold mb-1">EDC PINPAD</div>
              <div className="text-[10px] text-stone-400">EMV Chip / NFC Reader</div>
              <div className="mt-1 text-[9px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-1 py-0.5">Serial 115200 bps</div>
            </div>
            <div className="bg-stone-900 border border-stone-800 p-2.5">
              <div className="text-cyan-400 font-bold mb-1">THERMAL PRINTER</div>
              <div className="text-[10px] text-stone-400">80mm Direct Thermal</div>
              <div className="mt-1 text-[9px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-1 py-0.5">ESC/POS Raster</div>
            </div>
          </div>
          <div className="bg-stone-900/60 p-3 border border-stone-800 text-[11px] text-stone-300">
            <span className="text-cyan-400 font-bold">Physical Continuity Check:</span> Pin 2 (RX), pin 3 (TX), pin 5 (GND) verified on DB9 cable. RJ45 patch cables tested with 8P8C wire map tester for 1000BASE-T link integrity.
          </div>
        </div>
      );

    case 'os':
      return (
        <div className="font-mono text-xs space-y-2">
          <div className="bg-black/90 p-3 border border-stone-800 text-stone-300">
            <div className="flex justify-between items-center text-[11px] text-stone-500 border-b border-stone-800 pb-1 mb-2">
              <span>KERNEL DEVICE NODE & PROCESS TABLE</span>
              <span className="text-emerald-400">SIMULATED OS INTERRUPT</span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div><span className="text-stone-500">IRQ 04:</span> serial8250 /dev/ttyS0 [38400 8N1] - <span className="text-cyan-300">Interrupt Handler Tripped</span></div>
              <div><span className="text-stone-500">BUF_IN:</span> 0x39 0x35 0x35 0x35 0x30 0x31 0x38 0x34 0x32 0x0D <span className="text-emerald-400">("955501842\r")</span></div>
              <div><span className="text-stone-500">PID 1142:</span> /usr/bin/pos_daemon --store-id=084 --station=01 (<span className="text-sky-300">22.4 MB RSS</span>)</div>
              <div><span className="text-stone-500">PERMISSIONS:</span> crw-rw---- 1 root dialout 4, 64 /dev/ttyS0</div>
            </div>
          </div>
          <div className="text-[11px] text-stone-400">
            Hardware interrupt triggers kernel serial buffer; POS daemon reads unbuffered bytes through non-blocking select() poll loop.
          </div>
        </div>
      );

    case 'network':
      return (
        <div className="font-mono text-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-stone-900/80 border border-stone-800">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-sky-950 text-sky-300 border border-sky-800 text-[10px]">VLAN 10: POS</span>
              <span className="text-stone-500">→</span>
              <span className="px-2 py-0.5 bg-stone-800 text-stone-300 border border-stone-700 text-[10px]">Managed Switch</span>
              <span className="text-stone-500">→</span>
              <span className="px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 text-[10px]">Dual-WAN Router</span>
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
              <span>WAN1 Active (Fibre) · WAN2 Standby (4G)</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] bg-stone-950 p-2.5 border border-stone-800">
            <span className="text-stone-300">Interactive Simulation: Packet hop routing & TCP handshake</span>
            {onOpenLab && (
              <button
                onClick={onOpenLab}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px] font-bold uppercase cursor-pointer"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Open Packet Hop Workbench</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </button>
            )}
          </div>
        </div>
      );

    case 'application':
      return (
        <div className="font-mono text-xs space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-stone-900 p-2.5 border border-stone-800">
              <div className="text-stone-400 text-[10px] uppercase mb-1">SKU Cache Eviction Policy</div>
              <div className="text-stone-200 text-xs">SKU #955501842: In-Memory Hit</div>
              <div className="text-[10px] text-emerald-400 mt-1">Lookup latency: 0.42ms · Cache Hit Ratio: 94.2%</div>
            </div>
            <div className="bg-stone-900 p-2.5 border border-stone-800">
              <div className="text-stone-400 text-[10px] uppercase mb-1">ISO 8583 Payment Message</div>
              <div className="text-stone-200 text-xs">MTI 0100: Auth Request</div>
              <div className="text-[10px] text-cyan-400 mt-1">Field 03: 000000 (Purchase) · Field 04: MYR 14.80</div>
            </div>
          </div>
          <div className="text-[11px] text-stone-400">
            Application calculates multi-item bundle promotion, validates tax breakdown, and serializes transaction envelope for acquirer gateway.
          </div>
        </div>
      );

    case 'cloud-automation':
      return (
        <div className="font-mono text-xs space-y-2">
          <div className="bg-stone-900 p-3 border border-stone-800 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-stone-400 border-b border-stone-800 pb-1">
              <span>PLATFORM ORCHESTRATION PIPELINE</span>
              <span className="text-purple-400">LARK BASE + NETSUITE SYNC</span>
            </div>
            <div className="text-[11px] text-stone-300 flex items-center justify-between">
              <span>1. Store Inventory Deducted</span>
              <span className="text-emerald-400 font-bold">ACK 200 OK</span>
            </div>
            <div className="text-[11px] text-stone-300 flex items-center justify-between">
              <span>2. Lark Approval Bot Triggered</span>
              <span className="text-purple-300">THRESHOLD &gt; 90% (No alert)</span>
            </div>
            <div className="text-[11px] text-stone-300 flex items-center justify-between">
              <span>3. Financial Batch Reconciliation</span>
              <span className="text-cyan-300">NetSuite Scheduled Batch</span>
            </div>
          </div>
        </div>
      );

    case 'people-process':
      return (
        <div className="font-mono text-xs space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="bg-stone-900 p-2 border border-stone-800">
              <div className="text-rose-400 font-bold mb-0.5">COMMISSIONING RUNBOOK</div>
              <div className="text-stone-400 text-[10px]">Checklist for hardware signoff, switch VLAN tagging, and POS test transactions.</div>
            </div>
            <div className="bg-stone-900 p-2 border border-stone-800">
              <div className="text-rose-400 font-bold mb-0.5">VENDOR SLA TRIAGE</div>
              <div className="text-stone-400 text-[10px]">Severity 1 response &lt; 30 mins; Acquirer and ISP failover coordination.</div>
            </div>
            <div className="bg-stone-900 p-2 border border-stone-800">
              <div className="text-rose-400 font-bold mb-0.5">ITIL 4 POSTMORTEM</div>
              <div className="text-stone-400 text-[10px]">Root cause analysis logs, knowledge base articles, and incident prevention.</div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
