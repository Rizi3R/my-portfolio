import React, { useState, useMemo } from 'react';
import {
  NODES,
  EDGES,
  CONSTELLATION_CATEGORIES,
  EVIDENCE_META,
  EvidenceStatus,
  ConstellationCategory,
} from '../data/universeContent';
import { Network, List, Search, X, ArrowRight } from 'lucide-react';

interface ConstellationSectionProps {
  onOpenFullAtlas?: (nodeId?: string) => void;
}

export const ConstellationSection: React.FC<ConstellationSectionProps> = ({
  onOpenFullAtlas,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ConstellationCategory>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | EvidenceStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string>(NODES[0].id);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  // Default to the scannable structured list first; interactive atlas stays optional
  const [viewMode, setViewMode] = useState<'list' | 'constellation'>('list');

  const filteredNodes = useMemo(() => {
    return NODES.filter((node) => {
      const matchCat = selectedCategory === 'All' || node.category === selectedCategory;
      const matchStatus = statusFilter === 'all' || node.status === statusFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        q === '' ||
        node.label.toLowerCase().includes(q) ||
        node.summary.toLowerCase().includes(q) ||
        node.category.toLowerCase().includes(q);
      return matchCat && matchStatus && matchSearch;
    });
  }, [selectedCategory, statusFilter, searchQuery]);

  const filteredIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredEdges = useMemo(() => {
    return EDGES.filter((e) => filteredIds.has(e.from) && filteredIds.has(e.to));
  }, [filteredIds]);

  const activeNode = useMemo(() => {
    const focusId = hoveredNodeId || selectedNodeId;
    return NODES.find((n) => n.id === focusId) || filteredNodes[0] || NODES[0];
  }, [hoveredNodeId, selectedNodeId, filteredNodes]);

  const relatedEdges = useMemo(() => {
    if (!activeNode) return [];
    return EDGES.filter((e) => e.from === activeNode.id || e.to === activeNode.id).map((edge) => {
      const isOut = edge.from === activeNode.id;
      const partner = NODES.find((n) => n.id === (isOut ? edge.to : edge.from));
      return {
        direction: isOut ? 'to' : 'from',
        partner,
        reason: edge.reason,
      };
    });
  }, [activeNode]);

  const getStatusColor = (status: EvidenceStatus) => {
    switch (status) {
      case 'professional':
        return '#B0E0E6';
      case 'project':
        return '#FFFFFF';
      case 'learning':
        return '#DC343B';
    }
  };

  return (
    <section
      id="constellation"
      aria-labelledby="constellation-heading"
      className="scroll-mt-20 py-16 sm:py-20 border-b border-[#323238]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-2">
              03. Skills &amp; Systems Map
            </p>
            <h2
              id="constellation-heading"
              className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Work-Backed Skills &amp; Active Learning
            </h2>
            <p className="mt-2 text-sm text-[#D1D5DB] leading-relaxed">
              Practical skills used at work appear first, followed by internship/academic grounding and active learning in UiPath RPA. Switch to the interactive atlas view anytime.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start">
            <div
              role="group"
              aria-label="Skills display mode"
              className="inline-flex p-1 bg-[#222226] border border-[#323238] rounded-lg text-xs"
            >
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/40'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Structured List</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('constellation')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'constellation'
                    ? 'bg-[#1B1B1D] text-[#B0E0E6] border border-[#B0E0E6]/40'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                <Network className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Skill Atlas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div
          role="group"
          aria-label="Filter by experience level"
          className="flex flex-wrap items-center gap-2 mb-5 text-xs"
        >
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              statusFilter === 'all'
                ? 'bg-[#DC343B] border-[#DC343B] text-white'
                : 'bg-[#222226] border-[#323238] text-[#D1D5DB] hover:border-[#B0E0E6]/40'
            }`}
          >
            All ({NODES.length})
          </button>
          {(['professional', 'project', 'learning'] as EvidenceStatus[]).map((status) => {
            const meta = EVIDENCE_META[status];
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(isActive ? 'all' : status)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1B1B1D] border-[#B0E0E6] text-[#B0E0E6]'
                    : 'bg-[#222226] border-[#323238] text-[#D1D5DB] hover:border-[#B0E0E6]/40'
                }`}
              >
                <span style={{ color: getStatusColor(status) }} aria-hidden="true">
                  {meta.glyph}
                </span>
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>

        {/* Domain Filter & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 text-xs">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#B0E0E6] text-[#1B1B1D] border-[#B0E0E6] font-semibold'
                  : 'bg-[#222226] text-[#9CA3AF] border-[#323238] hover:text-white'
              }`}
            >
              All Areas
            </button>
            {CONSTELLATION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#B0E0E6] text-[#1B1B1D] border-[#B0E0E6] font-semibold'
                    : 'bg-[#222226] text-[#9CA3AF] border-[#323238] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-64 shrink-0">
            <Search
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills..."
              aria-label="Filter skills and tools"
              className="w-full bg-[#222226] border border-[#323238] focus:border-[#B0E0E6] rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-[#9CA3AF] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Structured List First + Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-[#151517] border border-[#323238] rounded-2xl overflow-hidden">
            {viewMode === 'list' ? (
              <div className="p-4 sm:p-5 max-h-[540px] overflow-y-auto space-y-2">
                {filteredNodes.length === 0 ? (
                  <p className="py-10 text-center text-sm text-[#9CA3AF]">
                    No matching skills found for this filter.
                  </p>
                ) : (
                  <ol role="tree" aria-label="Skills List" className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredNodes.map((node) => {
                      const isSelected = activeNode?.id === node.id;
                      const meta = EVIDENCE_META[node.status];
                      return (
                        <li key={node.id} role="treeitem" aria-selected={isSelected}>
                          <button
                            type="button"
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`w-full text-left p-3.5 rounded-xl border cursor-pointer transition-colors flex flex-col justify-between gap-2 h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] ${
                              isSelected
                                ? 'bg-[#222226] border-[#B0E0E6] text-white'
                                : 'bg-[#1B1B1D] border-[#323238] text-[#D1D5DB] hover:border-[#B0E0E6]/40'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-sm font-semibold text-white">
                                  {node.label}
                                </span>
                                <span
                                  style={{ color: getStatusColor(node.status) }}
                                  aria-hidden="true"
                                  className="text-xs font-mono shrink-0"
                                >
                                  {meta.glyph}
                                </span>
                              </div>
                              <p className="text-xs text-[#9CA3AF] leading-relaxed line-clamp-2">
                                {node.summary}
                              </p>
                            </div>
                            <div className="text-[11px] font-mono text-[#B0E0E6]/90">
                              {node.category}
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
            ) : (
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] cyber-grid select-none">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  role="region"
                  aria-label="Interactive skill atlas map"
                >
                  <g aria-hidden="true">
                    {filteredEdges.map((edge, idx) => {
                      const fromNode = NODES.find((n) => n.id === edge.from);
                      const toNode = NODES.find((n) => n.id === edge.to);
                      if (!fromNode || !toNode) return null;

                      const isConnected =
                        activeNode &&
                        (edge.from === activeNode.id || edge.to === activeNode.id);

                      return (
                        <line
                          key={idx}
                          x1={fromNode.x}
                          y1={fromNode.y}
                          x2={toNode.x}
                          y2={toNode.y}
                          stroke={isConnected ? '#B0E0E6' : '#323238'}
                          strokeWidth={isConnected ? 0.55 : 0.25}
                          strokeDasharray={isConnected ? undefined : '0.8, 0.8'}
                        />
                      );
                    })}
                  </g>

                  <g>
                    {filteredNodes.map((node) => {
                      const isSelected = activeNode?.id === node.id;
                      const color = getStatusColor(node.status);

                      return (
                        <g
                          key={node.id}
                          transform={`translate(${node.x}, ${node.y})`}
                          onClick={() => setSelectedNodeId(node.id)}
                          onMouseEnter={() => setHoveredNodeId(node.id)}
                          onMouseLeave={() => setHoveredNodeId(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedNodeId(node.id);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          aria-pressed={isSelected}
                          aria-label={`${node.label}, ${EVIDENCE_META[node.status].label}`}
                          className="cursor-pointer focus:outline-none"
                        >
                          <circle r="4.5" fill="transparent" />
                          {isSelected && (
                            <circle
                              r="2.9"
                              fill="none"
                              stroke="#DC343B"
                              strokeWidth="0.35"
                            />
                          )}
                          <circle
                            r={isSelected ? 1.55 : 1.05}
                            fill={isSelected ? '#DC343B' : color}
                            stroke="#1B1B1D"
                            strokeWidth="0.25"
                          />
                          <text
                            y={isSelected ? -2.3 : -1.8}
                            textAnchor="middle"
                            fill={isSelected ? '#FFFFFF' : '#B0E0E6'}
                            fillOpacity={isSelected ? 1 : 0.85}
                            fontSize={isSelected ? '2.1' : '1.65'}
                            fontFamily="JetBrains Mono, monospace"
                            fontWeight={isSelected ? '700' : '400'}
                            className="pointer-events-none select-none"
                          >
                            {node.label.length > 22 ? node.label.slice(0, 20) + '…' : node.label}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                </svg>

                {filteredNodes.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-[#9CA3AF]">
                    No skill nodes match this filter.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right 4 Cols: Selected Skill Inspector */}
          <aside
            aria-label="Selected skill inspector"
            className="lg:col-span-4 bg-[#222226] border border-[#323238] rounded-2xl p-6 space-y-5"
          >
            {activeNode && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#B0E0E6]">{activeNode.category}</span>
                    <span style={{ color: getStatusColor(activeNode.status) }}>
                      {EVIDENCE_META[activeNode.status].glyph} {EVIDENCE_META[activeNode.status].label}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {activeNode.label}
                  </h3>
                  <p className="text-xs text-[#9CA3AF]">
                    {EVIDENCE_META[activeNode.status].description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#1B1B1D] border border-[#323238] text-sm text-[#D1D5DB] leading-relaxed">
                  {activeNode.summary}
                </div>

                {activeNode.usage && (
                  <div className="space-y-1.5">
                    <div className="text-xs font-mono text-[#B0E0E6]">Where Applied</div>
                    <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                      {activeNode.usage}
                    </p>
                  </div>
                )}

                {relatedEdges.length > 0 && (
                  <div className="pt-3 border-t border-[#323238] space-y-2.5">
                    <div className="text-xs font-mono text-[#9CA3AF]">
                      Related Capabilities ({relatedEdges.length})
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {relatedEdges.map((rel, i) =>
                        rel.partner ? (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedNodeId(rel.partner!.id)}
                            className="w-full text-left p-2.5 rounded-lg bg-[#1B1B1D] border border-[#323238] hover:border-[#B0E0E6]/50 transition-colors cursor-pointer"
                          >
                            <div className="text-xs font-semibold text-[#B0E0E6]">
                              {rel.direction === 'to' ? '→' : '←'} {rel.partner.label}
                            </div>
                            <div className="text-[11px] text-[#9CA3AF] mt-0.5 leading-snug">
                              {rel.reason}
                            </div>
                          </button>
                        ) : null
                      )}
                    </div>
                  </div>
                )}

                {onOpenFullAtlas && (
                  <button
                    type="button"
                    onClick={() => onOpenFullAtlas(activeNode.id)}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#1B1B1D] hover:bg-[#2B2B30] border border-[#323238] hover:border-[#B0E0E6]/50 text-xs font-semibold text-[#B0E0E6] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Open Full Skill Atlas</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};
