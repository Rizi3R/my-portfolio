import React, { useState, useMemo, useEffect } from 'react';
import {
  NODES,
  EDGES,
  STRATA,
  EVIDENCE_META,
  UniverseNode,
  StratumType,
  EvidenceStatus,
} from '../data/universeContent';
import { Search, X, ArrowRight, List, Network } from 'lucide-react';

interface AtlasViewProps {
  initialSelectedNodeId?: string | null;
  onJumpToStratum?: (stratumId: StratumType) => void;
  onOpenExperience?: (expId: string) => void;
}

export const AtlasView: React.FC<AtlasViewProps> = ({
  initialSelectedNodeId,
  onJumpToStratum,
  onOpenExperience,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    initialSelectedNodeId || NODES[0].id
  );
  const [stratumFilter, setStratumFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');
  const [announcement, setAnnouncement] = useState<string>('');

  useEffect(() => {
    if (initialSelectedNodeId) {
      setSelectedNodeId(initialSelectedNodeId);
      const target = NODES.find((n) => n.id === initialSelectedNodeId);
      if (target) {
        setAnnouncement(`Selected node: ${target.label}, status: ${EVIDENCE_META[target.status].label}`);
      }
    }
  }, [initialSelectedNodeId]);

  const filteredNodes = useMemo(() => {
    return NODES.filter((node) => {
      const matchesStratum = stratumFilter === 'all' || node.stratum === stratumFilter;
      const matchesStatus = statusFilter === 'all' || node.status === statusFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStratum && matchesStatus && matchesSearch;
    });
  }, [stratumFilter, statusFilter, searchQuery]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredEdges = useMemo(() => {
    return EDGES.filter((edge) => filteredNodeIds.has(edge.from) && filteredNodeIds.has(edge.to));
  }, [filteredNodeIds]);

  const selectedNode = useMemo(() => {
    return NODES.find((n) => n.id === selectedNodeId) || filteredNodes[0] || NODES[0];
  }, [selectedNodeId, filteredNodes]);

  const relatedEdges = useMemo(() => {
    if (!selectedNode) return [];
    return EDGES.filter(
      (edge) => edge.from === selectedNode.id || edge.to === selectedNode.id
    ).map((edge) => {
      const isOutgoing = edge.from === selectedNode.id;
      const partnerId = isOutgoing ? edge.to : edge.from;
      const partnerNode = NODES.find((n) => n.id === partnerId);
      return {
        direction: isOutgoing ? 'outgoing' : 'incoming',
        partner: partnerNode,
        reason: edge.reason,
      };
    });
  }, [selectedNode]);

  const handleSelectNode = (node: UniverseNode) => {
    setSelectedNodeId(node.id);
    setAnnouncement(`Inspecting ${node.label}. ${node.summary}`);
  };

  const getStatusBadge = (status: EvidenceStatus) => {
    const meta = EVIDENCE_META[status];
    const badgeStyle =
      status === 'learning'
        ? 'bg-[#F2A77D]/15 text-[#F2A77D] border-[#F2A77D]/40'
        : status === 'professional'
        ? 'bg-[#A8C5FF]/15 text-[#A8C5FF] border-[#A8C5FF]/40'
        : 'bg-[#0A0913] text-[#CFCAC0] border-[#242138]';

    return (
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border font-semibold ${badgeStyle}`}
      >
        <span aria-hidden="true">{meta.glyph}</span>
        <span>{meta.label}</span>
      </span>
    );
  };

  const getStratumColor = (stratum: StratumType) => {
    switch (stratum) {
      case 'hardware':
      case 'network':
      case 'cloud':
        return '#A8C5FF';
      case 'application':
      case 'operations':
        return '#F2A77D';
      case 'kernel':
      default:
        return '#F6F2E9';
    }
  };

  return (
    <div className="relative py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-[#F6F2E9]">
      <div className="sr-only" aria-live="polite" role="status">
        {announcement}
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#242138] pb-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#A8C5FF] mb-2">
              Skills &amp; Experience Map
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F6F2E9] tracking-tight">
              The Skill Atlas
            </h1>
            <p className="mt-2 text-[#CFCAC0] font-sans text-xs sm:text-sm max-w-2xl leading-relaxed">
              Browse all {NODES.length} documented capabilities, internship &amp; credential items, and active learning areas in list or graph format.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#12101F] border border-[#242138] rounded-lg self-start md:self-auto font-mono text-xs">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#A8C5FF] text-[#191723] font-semibold'
                  : 'text-[#9A94A8] hover:text-[#F6F2E9]'
              }`}
              aria-label="Switch to Accessible List Tree View"
            >
              <List className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Structured List</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('graph')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'graph'
                  ? 'bg-[#A8C5FF] text-[#191723] font-semibold'
                  : 'text-[#9A94A8] hover:text-[#F6F2E9]'
              }`}
              aria-label="Switch to 2D Graph Canvas View"
            >
              <Network className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Atlas Graph</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6 font-mono text-xs">
          <div className="relative">
            <Search
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9A94A8]"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12101F] border border-[#242138] rounded-lg text-[#F6F2E9] pl-9 pr-8 py-2.5 focus:outline-none focus:border-[#A8C5FF] transition-colors"
              aria-label="Search Atlas skills by title or summary"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9A94A8] hover:text-[#F6F2E9] cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div>
            <select
              value={stratumFilter}
              onChange={(e) => setStratumFilter(e.target.value)}
              className="w-full bg-[#12101F] border border-[#242138] rounded-lg text-[#CFCAC0] px-3 py-2.5 focus:outline-none focus:border-[#A8C5FF] cursor-pointer"
              aria-label="Filter skills by layer"
            >
              <option value="all">All Layers (1 to 6)</option>
              {STRATA.map((s, i) => (
                <option key={s.id} value={s.id}>
                  Layer {i + 1}: {s.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#12101F] border border-[#242138] rounded-lg text-[#CFCAC0] px-3 py-2.5 focus:outline-none focus:border-[#A8C5FF] cursor-pointer"
              aria-label="Filter skills by experience level"
            >
              <option value="all">All Levels</option>
              <option value="professional">◆ Work-Backed Experience</option>
              <option value="project">■ Internship, Academic &amp; Credential</option>
              <option value="learning">○ Currently Learning</option>
            </select>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 px-3 py-2 bg-[#12101F] border border-[#242138] rounded-lg text-[#9A94A8]">
            <span>Showing:</span>
            <span className="font-bold text-[#A8C5FF]">
              {filteredNodes.length} of {NODES.length} Items
            </span>
          </div>
        </div>
      </div>

      {/* Main List / Graph & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 bg-[#0A0913] border border-[#242138] rounded-2xl overflow-hidden relative">
          {viewMode === 'graph' ? (
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#12101F] select-none overflow-hidden">
              <div className="absolute inset-0 flex flex-col pointer-events-none opacity-35">
                {STRATA.map((st, i) => (
                  <div
                    key={st.id}
                    className="flex-1 border-b border-[#242138] px-3 pt-1 text-[9px] font-mono uppercase text-[#9A94A8]"
                  >
                    L{i + 1}: {st.title}
                  </div>
                ))}
              </div>

              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                role="region"
                aria-label="Atlas topology graph canvas"
              >
                <g className="edges" aria-hidden="true">
                  {filteredEdges.map((edge, idx) => {
                    const fromNode = NODES.find((n) => n.id === edge.from);
                    const toNode = NODES.find((n) => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const isConnectedToSelected =
                      selectedNode &&
                      (edge.from === selectedNode.id || edge.to === selectedNode.id);

                    return (
                      <line
                        key={`edge-${idx}`}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={isConnectedToSelected ? '#A8C5FF' : '#242138'}
                        strokeWidth={isConnectedToSelected ? 0.6 : 0.25}
                        strokeDasharray={isConnectedToSelected ? undefined : '0.8, 0.8'}
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </g>

                <g className="nodes">
                  {filteredNodes.map((node) => {
                    const isSelected = selectedNode && selectedNode.id === node.id;
                    const color = getStratumColor(node.stratum);

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => handleSelectNode(node)}
                        className="cursor-pointer focus:outline-none"
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        aria-label={`${node.label}, status: ${EVIDENCE_META[node.status].label}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSelectNode(node);
                          }
                        }}
                      >
                        <circle r="4.5" fill="transparent" stroke="transparent" />

                        {isSelected && (
                          <circle
                            r="2.8"
                            fill="none"
                            stroke="#F2A77D"
                            strokeWidth="0.35"
                            strokeDasharray="0.6, 0.6"
                          />
                        )}

                        <circle
                          r={isSelected ? 1.6 : 1.1}
                          fill={isSelected ? '#F2A77D' : color}
                          stroke="#0A0913"
                          strokeWidth="0.3"
                          className="transition-all duration-200"
                        />

                        <text
                          y={isSelected ? -2.2 : -1.8}
                          textAnchor="middle"
                          fill={isSelected ? '#F6F2E9' : '#A8C5FF'}
                          fillOpacity={isSelected ? 1 : 0.85}
                          fontSize={isSelected ? '2.2' : '1.75'}
                          fontFamily="JetBrains Mono, monospace"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          className="pointer-events-none select-none transition-all"
                        >
                          {node.label.length > 20 ? node.label.slice(0, 18) + '…' : node.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          ) : (
            <div className="p-4 max-h-[540px] overflow-y-auto font-mono text-xs">
              <ol role="tree" aria-label="Atlas Skills Tree" className="divide-y divide-[#242138]">
                {filteredNodes.map((node) => {
                  const isSelected = selectedNode && selectedNode.id === node.id;
                  return (
                    <li key={node.id} role="treeitem" aria-selected={isSelected}>
                      <button
                        type="button"
                        onClick={() => handleSelectNode(node)}
                        className={`w-full text-left p-3.5 cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#12101F] text-[#F6F2E9]'
                            : 'text-[#CFCAC0] hover:bg-[#12101F]/60'
                        }`}
                      >
                        <div>
                          <div className="font-bold flex items-center gap-2">
                            <span style={{ color: getStratumColor(node.stratum) }}>●</span>
                            <span>{node.label}</span>
                          </div>
                          <div className="text-[11px] text-[#9A94A8] mt-1 font-sans">
                            {node.summary}
                          </div>
                        </div>
                        <div className="ml-3 shrink-0">{getStatusBadge(node.status)}</div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>

        {/* Selected Node Inspector */}
        <aside
          className="lg:col-span-4 bg-[#12101F] border border-[#242138] rounded-2xl p-6 font-mono text-xs space-y-5"
          aria-label="Skill Details Inspector"
        >
          {selectedNode ? (
            <>
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] text-[#9A94A8] uppercase tracking-widest">
                    DETAIL VIEW
                  </span>
                  {getStatusBadge(selectedNode.status)}
                </div>
                <h3 className="font-display text-xl font-bold text-[#F6F2E9] tracking-tight">
                  {selectedNode.label}
                </h3>
                <div className="mt-1 text-[#9A94A8] text-[11px] flex flex-wrap items-center gap-2">
                  <span>{selectedNode.category}</span>
                  <span>·</span>
                  <span className="text-[#A8C5FF]">{selectedNode.stratum}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0A0913] border border-[#242138] text-[#CFCAC0] font-sans text-xs leading-relaxed">
                {selectedNode.summary}
              </div>

              {selectedNode.evidenceRef && (
                <div className="space-y-1 text-xs">
                  <span className="text-[#9A94A8] text-[10px] uppercase tracking-wider block">
                    Supporting Context
                  </span>
                  <div className="p-3 rounded-xl bg-[#0A0913] border border-[#242138] text-[#CFCAC0] flex items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-[#F6F2E9]">
                        {getEvidenceLabel(selectedNode.evidenceRef)}
                      </div>
                    </div>
                    {onOpenExperience && selectedNode.evidenceRef.startsWith('exp-') && (
                      <button
                        type="button"
                        onClick={() => onOpenExperience(selectedNode.evidenceRef!)}
                        className="text-[#A8C5FF] hover:text-[#F6F2E9] text-[10px] flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {selectedNode.usage && (
                <div className="space-y-1 text-xs">
                  <span className="text-[#9A94A8] text-[10px] uppercase tracking-wider block">
                    Where Applied
                  </span>
                  <div className="p-3 rounded-xl bg-[#0A0913] border border-[#242138] text-[#CFCAC0] font-sans text-xs leading-relaxed">
                    {selectedNode.usage}
                  </div>
                </div>
              )}

              {onJumpToStratum && (
                <button
                  type="button"
                  onClick={() => onJumpToStratum(selectedNode.stratum)}
                  className="w-full py-2.5 px-3.5 rounded-lg bg-[#0A0913] hover:bg-[#19162B] text-[#A8C5FF] border border-[#242138] hover:border-[#A8C5FF]/50 flex items-center justify-between transition-colors cursor-pointer text-xs font-semibold"
                >
                  <span>View Related Walkthrough Layer</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}

              <div>
                <div className="flex items-center justify-between text-[#9A94A8] text-[10px] uppercase tracking-wider mb-2">
                  <span>Connected Skills ({relatedEdges.length})</span>
                </div>

                {relatedEdges.length === 0 ? (
                  <div className="text-[#9A94A8] italic p-3 rounded-xl border border-dashed border-[#242138] text-center">
                    No active connections in current filter.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {relatedEdges.map((rel, idx) => {
                      if (!rel.partner) return null;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectNode(rel.partner!)}
                          className="w-full text-left p-2.5 rounded-xl bg-[#0A0913] hover:bg-[#19162B] border border-[#242138] hover:border-[#A8C5FF]/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-[#F6F2E9] mb-1">
                            <span className="flex items-center gap-1.5">
                              <span className="text-[#A8C5FF] text-[10px]">
                                {rel.direction === 'outgoing' ? '→' : '←'}
                              </span>
                              <span>{rel.partner.label}</span>
                            </span>
                            <span className="text-[9px] text-[#9A94A8] font-normal uppercase">
                              {rel.partner.stratum}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#CFCAC0] leading-snug font-sans">
                            {rel.reason}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-[#9A94A8]">
              Select any skill item to inspect details.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

function getEvidenceLabel(refId: string): string {
  switch (refId) {
    case 'exp-emart24':
      return 'emart24 Malaysia · System Application Specialist';
    case 'exp-hwc':
      return 'HWC Coffee Malaysia (Palaterium Sdn Bhd) · IT Support';
    case 'exp-mps':
      return 'Managed Print Services · IT Technician';
    case 'exp-agc':
      return 'Attorney General’s Chambers of Malaysia · IT Intern';
    case 'exp-uitm':
      return 'UiTM · Diploma in Computer Science and Mathematics';
    case 'cert-aws':
      return 'AWS Certified Cloud Practitioner';
    case 'cert-ai-teach':
      return 'Generative AI Copilot Digital Upskilling Program';
    case 'case-lark-migration':
      return 'Case Study: Leading a Google Workspace to Lark migration';
    case 'case-pos-triage':
      return 'Case Study: Application incident triage and vendor escalation';
    case 'case-store-launch':
      return 'Case Study: New-site IT readiness and an RJ45 cabling fix';
    default:
      return refId;
  }
}
