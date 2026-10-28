import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  NODES, 
  EDGES, 
  STRATA, 
  EXPERIENCES, 
  CASE_STUDIES, 
  UniverseNode, 
  StratumType, 
  EvidenceStatus 
} from '../data/universeContent';
import { 
  Search, 
  X, 
  Filter, 
  ArrowRight, 
  Layers, 
  ExternalLink, 
  Info,
  Maximize2,
  List,
  Network
} from 'lucide-react';

interface AtlasViewProps {
  initialSelectedNodeId?: string | null;
  onJumpToStratum?: (stratumId: StratumType) => void;
  onOpenExperience?: (expId: string) => void;
}

export const AtlasView: React.FC<AtlasViewProps> = ({ 
  initialSelectedNodeId, 
  onJumpToStratum,
  onOpenExperience 
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(initialSelectedNodeId || NODES[0].id);
  const [stratumFilter, setStratumFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'graph' | 'list'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'list';
    }
    return 'graph';
  });
  const [announcement, setAnnouncement] = useState<string>('');

  // Update selectedNodeId if initialSelectedNodeId changes
  useEffect(() => {
    if (initialSelectedNodeId) {
      setSelectedNodeId(initialSelectedNodeId);
      const target = NODES.find(n => n.id === initialSelectedNodeId);
      if (target) {
        setAnnouncement(`Selected node: ${target.label}, status: ${target.status}`);
      }
    }
  }, [initialSelectedNodeId]);

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return NODES.filter(node => {
      const matchesStratum = stratumFilter === 'all' || node.stratum === stratumFilter;
      const matchesStatus = statusFilter === 'all' || node.status === statusFilter;
      const matchesSearch = searchQuery.trim() === '' || 
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStratum && matchesStatus && matchesSearch;
    });
  }, [stratumFilter, statusFilter, searchQuery]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map(n => n.id)), [filteredNodes]);

  // Filtered edges (both endpoints must be in filtered nodes)
  const filteredEdges = useMemo(() => {
    return EDGES.filter(edge => filteredNodeIds.has(edge.from) && filteredNodeIds.has(edge.to));
  }, [filteredNodeIds]);

  const selectedNode = useMemo(() => {
    return NODES.find(n => n.id === selectedNodeId) || filteredNodes[0] || NODES[0];
  }, [selectedNodeId, filteredNodes]);

  // Related edges for selected node
  const relatedEdges = useMemo(() => {
    if (!selectedNode) return [];
    return EDGES.filter(edge => edge.from === selectedNode.id || edge.to === selectedNode.id).map(edge => {
      const isOutgoing = edge.from === selectedNode.id;
      const partnerId = isOutgoing ? edge.to : edge.from;
      const partnerNode = NODES.find(n => n.id === partnerId);
      return {
        direction: isOutgoing ? 'outgoing' : 'incoming',
        partner: partnerNode,
        reason: edge.reason
      };
    });
  }, [selectedNode]);

  const handleSelectNode = (node: UniverseNode) => {
    setSelectedNodeId(node.id);
    setAnnouncement(`Inspecting ${node.label}. ${node.summary}`);
  };

  const getStatusBadge = (status: EvidenceStatus) => {
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

  const getStratumColor = (stratum: StratumType) => {
    switch (stratum) {
      case 'hardware': return '#22d3ee'; // cyan-400
      case 'os': return '#34d399'; // emerald-400
      case 'network': return '#38bdf8'; // sky-400
      case 'application': return '#fbbf24'; // amber-400
      case 'cloud-automation': return '#c084fc'; // purple-400
      case 'people-process': return '#fb7185'; // rose-400
      default: return '#a8a29e';
    }
  };

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hidden announcer for screen readers */}
      <div className="sr-only" aria-live="polite" role="status">
        {announcement}
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-900 border border-stone-800 text-stone-300 text-xs font-mono uppercase tracking-widest mb-3">
              <span>◆</span>
              <span>Deterministic Knowledge Topology</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-mono font-bold text-stone-100 tracking-tight">
              THE ATLAS GRAPH
            </h1>
            <p className="mt-2 text-stone-400 font-mono text-xs sm:text-sm max-w-2xl leading-relaxed">
              Explore all 30 verified technologies, tools, and protocols across 6 computing strata. Every node contains verifiable evidence; every edge represents a documented technical interaction.
            </p>
          </div>

          {/* Graph / List View Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto font-mono text-xs">
            <button
              onClick={() => setViewMode('graph')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 border transition-colors cursor-pointer ${
                viewMode === 'graph' 
                  ? 'bg-stone-800 text-cyan-300 border-cyan-500' 
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
              aria-label="Switch to 2D Graph Canvas View"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Canvas Graph</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 border transition-colors cursor-pointer ${
                viewMode === 'list' 
                  ? 'bg-stone-800 text-cyan-300 border-cyan-500' 
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
              aria-label="Switch to Accessible List Tree View"
            >
              <List className="w-3.5 h-3.5" />
              <span>Accessible List</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6 font-mono text-xs">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-200 pl-9 pr-8 py-2 focus:outline-none focus:border-cyan-500 transition-colors"
              aria-label="Search Atlas nodes by title or summary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Stratum Filter */}
          <div>
            <select
              value={stratumFilter}
              onChange={(e) => setStratumFilter(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-300 px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
              aria-label="Filter nodes by stratum"
            >
              <option value="all">All Strata (1–6)</option>
              {STRATA.map((s, i) => (
                <option key={s.id} value={s.id}>
                  Stratum {i + 1}: {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-300 px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
              aria-label="Filter nodes by evidence status"
            >
              <option value="all">All Evidence Types</option>
              <option value="professional">◆ Professional (Verified Role)</option>
              <option value="project">■ Project (Implemented Code)</option>
              <option value="experiment">△ Experiment (Sandbox Simulation)</option>
              <option value="foundation">⊕ Foundation (Degree Curriculum)</option>
              <option value="learning">○ Learning (Active Study)</option>
            </select>
          </div>

          {/* Active Node Counter */}
          <div className="flex items-center justify-between sm:justify-end gap-3 px-3 py-2 bg-stone-900/50 border border-stone-800 text-stone-400">
            <span>Showing:</span>
            <span className="font-bold text-stone-200">{filteredNodes.length} of {NODES.length} Nodes</span>
          </div>
        </div>
      </div>

      {/* Main Graph & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Canvas or List View Area (8 cols on desktop) */}
        <div className="lg:col-span-8 bg-stone-950 border border-stone-800 overflow-hidden relative">
          {viewMode === 'graph' ? (
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#07090E] select-none overflow-hidden">
              {/* Background Coordinate Grid */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
                aria-hidden="true"
              />

              {/* Strata Division Visual Guides */}
              <div className="absolute inset-0 flex flex-col pointer-events-none opacity-20">
                {STRATA.map((st, i) => (
                  <div key={st.id} className="flex-1 border-b border-stone-700/60 px-3 pt-1 text-[9px] font-mono uppercase text-stone-500">
                    S{i+1}: {st.title}
                  </div>
                ))}
              </div>

              {/* SVG Canvas for Edges and Nodes */}
              <svg 
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                role="region"
                aria-label="Atlas topology graph canvas"
              >
                {/* Edges */}
                <g className="edges" aria-hidden="true">
                  {filteredEdges.map((edge, idx) => {
                    const fromNode = NODES.find(n => n.id === edge.from);
                    const toNode = NODES.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const isConnectedToSelected = selectedNode && (edge.from === selectedNode.id || edge.to === selectedNode.id);

                    return (
                      <line
                        key={`edge-${idx}`}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={isConnectedToSelected ? '#22d3ee' : '#334155'}
                        strokeWidth={isConnectedToSelected ? 0.6 : 0.25}
                        strokeDasharray={isConnectedToSelected ? undefined : '0.8, 0.8'}
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </g>

                {/* Nodes */}
                <g className="nodes">
                  {filteredNodes.map(node => {
                    const isSelected = selectedNode && selectedNode.id === node.id;
                    const color = getStratumColor(node.stratum);

                    return (
                      <g 
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => handleSelectNode(node)}
                        className="cursor-pointer"
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        aria-label={`${node.label}, status: ${node.status}, stratum: ${node.stratum}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSelectNode(node);
                          }
                        }}
                      >
                        {/* Generous invisible touch/pointer hit target (44px equivalent in SVG scale) */}
                        <circle
                          r="4.5"
                          fill="transparent"
                          stroke="transparent"
                        />

                        {/* Node Outer Selection Ring */}
                        {isSelected && (
                          <circle
                            r="2.8"
                            fill="none"
                            stroke="#22d3ee"
                            strokeWidth="0.35"
                            strokeDasharray="0.6, 0.6"
                          />
                        )}

                        {/* Node Center Dot */}
                        <circle
                          r={isSelected ? 1.6 : 1.1}
                          fill={isSelected ? '#22d3ee' : color}
                          stroke="#07090E"
                          strokeWidth="0.3"
                          className="transition-all duration-200"
                        />

                        {/* Node Label Text */}
                        <text
                          y={isSelected ? -2.2 : -1.8}
                          textAnchor="middle"
                          fill={isSelected ? '#f8fafc' : '#94a3b8'}
                          fontSize={isSelected ? '2.2' : '1.8'}
                          fontFamily="monospace"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          className="pointer-events-none select-none transition-all"
                        >
                          {node.label.length > 18 ? node.label.slice(0, 16) + '…' : node.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          ) : (
            /* Accessible Tree List View */
            <div className="p-4 max-h-[500px] overflow-y-auto font-mono text-xs">
              <ol role="tree" aria-label="Atlas Nodes Tree" className="space-y-2">
                {filteredNodes.map(node => {
                  const isSelected = selectedNode && selectedNode.id === node.id;
                  return (
                    <li
                      key={node.id}
                      role="treeitem"
                      aria-selected={isSelected}
                      onClick={() => handleSelectNode(node)}
                      className={`p-3 border cursor-pointer transition-colors flex items-center justify-between ${
                        isSelected 
                          ? 'bg-stone-900 border-cyan-500 text-stone-100' 
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        <div className="font-bold flex items-center gap-2">
                          <span style={{ color: getStratumColor(node.stratum) }}>●</span>
                          <span>{node.label}</span>
                        </div>
                        <div className="text-[11px] text-stone-500 mt-1 line-clamp-1">
                          {node.summary}
                        </div>
                      </div>
                      <div className="ml-3 shrink-0">
                        {getStatusBadge(node.status)}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>

        {/* Selected Node Detail Inspector (4 cols on desktop) */}
        <aside 
          className="lg:col-span-4 bg-stone-950 border border-stone-800 p-5 font-mono text-xs space-y-5"
          aria-label="Node Details Inspector"
        >
          {selectedNode ? (
            <>
              {/* Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest">
                    NODE INSPECTOR
                  </span>
                  {getStatusBadge(selectedNode.status)}
                </div>
                <h3 className="text-xl font-bold text-stone-100 tracking-tight">
                  {selectedNode.label}
                </h3>
                <div className="mt-1 text-stone-400 text-[11px] flex items-center gap-2">
                  <span className="capitalize">Stratum:</span>
                  <span className="text-stone-200 font-semibold">{selectedNode.stratum}</span>
                  <span>·</span>
                  <span className="capitalize">Kind: {selectedNode.kind}</span>
                </div>
              </div>

              {/* Verified Summary */}
              <div className="p-3 bg-stone-900/60 border border-stone-800 text-stone-300 font-sans text-xs leading-relaxed">
                "{selectedNode.summary}"
              </div>

              {/* Evidence Provenance Reference */}
              {selectedNode.evidenceRef && (
                <div className="space-y-1 text-xs">
                  <span className="text-stone-500 text-[10px] uppercase tracking-wider block">
                    [EVIDENCE_PROVENANCE]
                  </span>
                  <div className="p-2.5 bg-stone-900 border border-stone-800 text-stone-300 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-stone-200">
                        {getEvidenceLabel(selectedNode.evidenceRef)}
                      </div>
                      <div className="text-[10px] text-stone-500">Ref ID: {selectedNode.evidenceRef}</div>
                    </div>
                    {onOpenExperience && selectedNode.evidenceRef.startsWith('exp-') && (
                      <button
                        onClick={() => onOpenExperience(selectedNode.evidenceRef!)}
                        className="text-cyan-400 hover:text-cyan-300 text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Factual Applied Professional Usage */}
              {selectedNode.usage && (
                <div className="space-y-1 text-xs">
                  <span className="text-stone-500 text-[10px] uppercase tracking-wider block">
                    [APPLIED_OPERATIONAL_USAGE]
                  </span>
                  <div className="p-2.5 bg-stone-900/60 border border-stone-800 text-stone-300 font-sans text-xs leading-relaxed">
                    {selectedNode.usage}
                  </div>
                </div>
              )}

              {/* Stratum Deep Dive Navigation */}
              {onJumpToStratum && (
                <div>
                  <button
                    onClick={() => onJumpToStratum(selectedNode.stratum)}
                    className="w-full py-2 px-3 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 flex items-center justify-between transition-colors cursor-pointer text-xs"
                  >
                    <span>View Stratum Journey Step</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              )}

              {/* Connected Relationships with Technical Reason */}
              <div>
                <div className="flex items-center justify-between text-stone-500 text-[10px] uppercase tracking-wider mb-2">
                  <span>Connected Topology ({relatedEdges.length})</span>
                  <span>Protocol Interaction</span>
                </div>

                {relatedEdges.length === 0 ? (
                  <div className="text-stone-500 italic p-2 border border-dashed border-stone-800 text-center">
                    No active edges in current filter.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {relatedEdges.map((rel, idx) => {
                      if (!rel.partner) return null;
                      return (
                        <div 
                          key={idx}
                          onClick={() => handleSelectNode(rel.partner!)}
                          className="p-2.5 bg-stone-900/50 hover:bg-stone-900 border border-stone-800/80 hover:border-cyan-500/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-stone-200 mb-1">
                            <span className="flex items-center gap-1.5">
                              <span className="text-cyan-400 text-[10px]">
                                {rel.direction === 'outgoing' ? '→' : '←'}
                              </span>
                              <span>{rel.partner.label}</span>
                            </span>
                            <span className="text-[9px] text-stone-500 font-normal uppercase">
                              {rel.partner.stratum}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-400 leading-snug font-sans">
                            {rel.reason}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-stone-500">
              Select any node in the graph or list to inspect its operational evidence.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

function getEvidenceLabel(refId: string): string {
  switch (refId) {
    case 'exp-emart24': return 'emart24 Malaysia · System Application Specialist';
    case 'exp-palaterium': return 'Palaterium Sdn Bhd · IT Executive';
    case 'exp-mps': return 'Managed Print Services · IT Technician';
    case 'exp-agc': return 'Attorney General’s Chambers · IT Intern';
    case 'exp-uitm': return 'UiTM · Diploma in Computer Science & Mathematics';
    case 'cert-aws': return 'AWS Certified Cloud Practitioner';
    case 'sim-network': return 'Deterministic Packet Hop Lab';
    case 'sim-cache': return 'Cache Eviction Simulation';
    case 'sim-incident': return 'Operational Triage Simulator';
    case 'case-emart24-rollout': return 'Case Study: Multi-Store POS Rollout';
    case 'case-palaterium-failover': return 'Case Study: Dual-WAN Failover';
    case 'case-lark-migration': return 'Case Study: Google Workspace to Lark Cutover';
    case 'case-dkict-system': return 'Case Study: Internal MVC Compliance Portal';
    default: return refId;
  }
}
