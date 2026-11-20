import React, { useState, useMemo, useEffect } from 'react';
import {
  EVIDENCE_META,
  UniverseNode,
  StratumType,
  EvidenceStatus,
  ConstellationCategory,
} from '../data/universeContent';
import type { MergedPortfolioContent } from '../i18n/I18nContext';
import { useI18n } from '../i18n';
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
  const { t, content, format } = useI18n();
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    initialSelectedNodeId || content.nodes[0].id
  );
  const [stratumFilter, setStratumFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('list');
  const [announcement, setAnnouncement] = useState<string>('');

  const localizedNodes = useMemo(
    () =>
      content.nodes.map((node) => ({
        ...node,
        categoryLabel:
          content.constellationCategories[node.category as ConstellationCategory] ?? node.category,
      })),
    [content.nodes, content.constellationCategories]
  );

  const stratumTitleMap = useMemo(() => {
    const map = {} as Record<StratumType, string>;
    for (const st of content.strata) {
      map[st.id] = st.title;
    }
    return map;
  }, [content.strata]);

  useEffect(() => {
    if (initialSelectedNodeId) {
      setSelectedNodeId(initialSelectedNodeId);
      const target = localizedNodes.find((n) => n.id === initialSelectedNodeId);
      if (target) {
        setAnnouncement(
          format(t.atlas.announcedInitialSelect, {
            label: target.label,
            status: content.evidenceMeta[target.status].label,
          })
        );
      }
    }
  }, [initialSelectedNodeId, localizedNodes, content.evidenceMeta, t.atlas.announcedInitialSelect, format]);

  const filteredNodes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return localizedNodes.filter((node) => {
      const matchesStratum = stratumFilter === 'all' || node.stratum === stratumFilter;
      const matchesStatus = statusFilter === 'all' || node.status === statusFilter;
      const matchesSearch =
        query === '' ||
        node.label.toLowerCase().includes(query) ||
        node.summary.toLowerCase().includes(query) ||
        node.categoryLabel.toLowerCase().includes(query) ||
        node.category.toLowerCase().includes(query);
      return matchesStratum && matchesStatus && matchesSearch;
    });
  }, [localizedNodes, stratumFilter, statusFilter, searchQuery]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredEdges = useMemo(() => {
    return content.edges.filter(
      (edge) => filteredNodeIds.has(edge.from) && filteredNodeIds.has(edge.to)
    );
  }, [filteredNodeIds, content.edges]);

  const selectedNode = useMemo(() => {
    return localizedNodes.find((n) => n.id === selectedNodeId) || filteredNodes[0] || localizedNodes[0];
  }, [localizedNodes, selectedNodeId, filteredNodes]);

  const relatedEdges = useMemo(() => {
    if (!selectedNode) return [];
    return content.edges
      .filter((edge) => edge.from === selectedNode.id || edge.to === selectedNode.id)
      .map((edge) => {
        const isOutgoing = edge.from === selectedNode.id;
        const partnerId = isOutgoing ? edge.to : edge.from;
        const partnerNode = localizedNodes.find((n) => n.id === partnerId);
        return {
          direction: isOutgoing ? 'outgoing' : 'incoming',
          partner: partnerNode,
          reason: edge.reason,
        };
      });
  }, [selectedNode, localizedNodes, content.edges]);

  const handleSelectNode = (node: UniverseNode) => {
    setSelectedNodeId(node.id);
    setAnnouncement(
      format(t.atlas.announcedSelect, {
        label: node.label,
        summary: node.summary,
      })
    );
  };

  const getStatusBadge = (status: EvidenceStatus) => {
    const meta = EVIDENCE_META[status];
    const localizedMeta = content.evidenceMeta[status];
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
        <span>{localizedMeta.label}</span>
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
              {t.atlas.eyebrow}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F6F2E9] tracking-tight">
              {t.atlas.title}
            </h1>
            <p className="mt-2 text-[#CFCAC0] font-sans text-xs sm:text-sm max-w-2xl leading-relaxed">
              {format(t.atlas.subtitle, { count: content.nodes.length })}
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
              aria-label={t.atlas.listViewAria}
            >
              <List className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.atlas.listView}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('graph')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'graph'
                  ? 'bg-[#A8C5FF] text-[#191723] font-semibold'
                  : 'text-[#9A94A8] hover:text-[#F6F2E9]'
              }`}
              aria-label={t.atlas.graphViewAria}
            >
              <Network className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.atlas.graphView}</span>
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
              placeholder={t.atlas.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12101F] border border-[#242138] rounded-lg text-[#F6F2E9] pl-9 pr-8 py-2.5 focus:outline-none focus:border-[#A8C5FF] transition-colors"
              aria-label={t.atlas.searchAriaLabel}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9A94A8] hover:text-[#F6F2E9] cursor-pointer"
                aria-label={t.atlas.clearSearch}
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
              aria-label={t.atlas.layerFilterAria}
            >
              <option value="all">{t.atlas.allLayers}</option>
              {content.strata.map((s, i) => (
                <option key={s.id} value={s.id}>
                  {format(t.atlas.layerOption, { index: i + 1, title: s.title })}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#12101F] border border-[#242138] rounded-lg text-[#CFCAC0] px-3 py-2.5 focus:outline-none focus:border-[#A8C5FF] cursor-pointer"
              aria-label={t.atlas.levelFilterAria}
            >
              <option value="all">{t.atlas.allLevels}</option>
              <option value="professional">
                {EVIDENCE_META.professional.glyph} {content.evidenceMeta.professional.label}
              </option>
              <option value="project">
                {EVIDENCE_META.project.glyph} {content.evidenceMeta.project.label}
              </option>
              <option value="learning">
                {EVIDENCE_META.learning.glyph} {content.evidenceMeta.learning.label}
              </option>
            </select>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 px-3 py-2 bg-[#12101F] border border-[#242138] rounded-lg text-[#9A94A8]">
            <span>{t.atlas.showing}</span>
            <span className="font-bold text-[#A8C5FF]">
              {format(t.atlas.itemsCount, { shown: filteredNodes.length, total: content.nodes.length })}
            </span>
          </div>
        </div>
      </div>

      {/* Main List / Graph & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 bg-[#0A0913] border border-[#242138] rounded-2xl overflow-hidden relative">
          {viewMode === 'graph' ? (
            <div className="overflow-x-auto bg-[#12101F] select-none">
              <div className="relative min-w-[540px] w-full aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 flex flex-col pointer-events-none opacity-40">
                  {content.strata.map((st, i) => (
                    <div
                      key={st.id}
                      className="flex-1 border-b border-[#242138] px-3 pt-1 text-[11px] font-mono uppercase text-[#B5B0C2]"
                    >
                      L{i + 1}: {st.title}
                    </div>
                  ))}
                </div>

                <svg
                  className="w-full h-full"
                  viewBox="0 0 160 100"
                  preserveAspectRatio="xMidYMid meet"
                  role="region"
                  aria-label={t.atlas.graphAriaLabel}
                >
                  <g className="edges" aria-hidden="true">
                    {filteredEdges.map((edge, idx) => {
                      const fromNode = localizedNodes.find((n) => n.id === edge.from);
                      const toNode = localizedNodes.find((n) => n.id === edge.to);
                      if (!fromNode || !toNode) return null;

                      const isConnectedToSelected =
                        selectedNode &&
                        (edge.from === selectedNode.id || edge.to === selectedNode.id);

                      return (
                        <line
                          key={`edge-${idx}`}
                          x1={fromNode.x * 1.44 + 8}
                          y1={fromNode.y}
                          x2={toNode.x * 1.44 + 8}
                          y2={toNode.y}
                          stroke={isConnectedToSelected ? '#A8C5FF' : '#242138'}
                          strokeWidth={isConnectedToSelected ? 0.65 : 0.3}
                          strokeDasharray={isConnectedToSelected ? undefined : '1, 1'}
                          className="transition-all duration-300"
                        />
                      );
                    })}
                  </g>

                  <g className="nodes">
                    {filteredNodes.map((node) => {
                      const isSelected = selectedNode && selectedNode.id === node.id;
                      const color = getStratumColor(node.stratum);

                      const cx = node.x * 1.44 + 8;

                      return (
                        <g
                          key={node.id}
                          transform={`translate(${cx}, ${node.y})`}
                          onClick={() => handleSelectNode(node)}
                          className="cursor-pointer focus:outline-none"
                          role="button"
                          tabIndex={0}
                          aria-pressed={isSelected}
                          aria-label={`${node.label}, ${content.evidenceMeta[node.status].label}`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSelectNode(node);
                            }
                          }}
                        >
                          <circle r="5.5" fill="transparent" stroke="transparent" />

                          {isSelected && (
                            <circle
                              r="3.2"
                              fill="none"
                              stroke="#F2A77D"
                              strokeWidth="0.45"
                              strokeDasharray="0.8, 0.8"
                            />
                          )}

                          <circle
                            r={isSelected ? 2 : 1.4}
                            fill={isSelected ? '#F2A77D' : color}
                            stroke="#0A0913"
                            strokeWidth="0.35"
                            className="transition-all duration-200"
                          />

                          <text
                            y={isSelected ? -2.8 : -2.3}
                            textAnchor="middle"
                            fill={isSelected ? '#F6F2E9' : '#A8C5FF'}
                            fillOpacity={isSelected ? 1 : 0.9}
                            fontSize={isSelected ? '2.8' : '2.25'}
                            fontFamily="JetBrains Mono, monospace"
                            fontWeight={isSelected ? 'bold' : 'normal'}
                            className="pointer-events-none select-none transition-all"
                          >
                            {node.label.length > 22 ? node.label.slice(0, 20) + '…' : node.label}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>
            </div>
          ) : (
            <div className="p-4 max-h-[540px] overflow-y-auto font-mono text-xs">
              <ol role="tree" aria-label={t.atlas.treeAriaLabel} className="divide-y divide-[#242138]">
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
          aria-label={t.atlas.inspectorAriaLabel}
        >
          {selectedNode ? (
            <>
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] text-[#9A94A8] uppercase tracking-widest">
                    {t.atlas.detailView}
                  </span>
                  {getStatusBadge(selectedNode.status)}
                </div>
                <h3 className="font-display text-xl font-bold text-[#F6F2E9] tracking-tight">
                  {selectedNode.label}
                </h3>
                <div className="mt-1 text-[#9A94A8] text-[11px] flex flex-wrap items-center gap-2">
                  <span>{selectedNode.categoryLabel}</span>
                  <span>·</span>
                  <span className="text-[#A8C5FF]">
                    {stratumTitleMap[selectedNode.stratum] ?? selectedNode.stratum}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0A0913] border border-[#242138] text-[#CFCAC0] font-sans text-xs leading-relaxed">
                {selectedNode.summary}
              </div>

              {selectedNode.evidenceRef && (
                <div className="space-y-1 text-xs">
                  <span className="text-[#9A94A8] text-[10px] uppercase tracking-wider block">
                    {t.atlas.supportingContext}
                  </span>
                  <div className="p-3 rounded-xl bg-[#0A0913] border border-[#242138] text-[#CFCAC0] flex items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-[#F6F2E9]">
                        {getEvidenceLabel(selectedNode.evidenceRef, content)}
                      </div>
                    </div>
                    {onOpenExperience && selectedNode.evidenceRef.startsWith('exp-') && (
                      <button
                        type="button"
                        onClick={() => onOpenExperience(selectedNode.evidenceRef!)}
                        className="text-[#A8C5FF] hover:text-[#F6F2E9] text-[10px] flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <span>{t.atlas.viewLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {selectedNode.usage && (
                <div className="space-y-1 text-xs">
                  <span className="text-[#9A94A8] text-[10px] uppercase tracking-wider block">
                    {t.atlas.whereApplied}
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
                  <span>{t.atlas.viewWalkthroughLayer}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}

              <div>
                <div className="flex items-center justify-between text-[#9A94A8] text-[10px] uppercase tracking-wider mb-2">
                  <span>{format(t.atlas.connectedSkills, { count: relatedEdges.length })}</span>
                </div>

                {relatedEdges.length === 0 ? (
                  <div className="text-[#9A94A8] italic p-3 rounded-xl border border-dashed border-[#242138] text-center">
                    {t.atlas.noConnections}
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
                              {stratumTitleMap[rel.partner.stratum] ?? rel.partner.stratum}
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
              {t.atlas.emptySelection}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

function getEvidenceLabel(refId: string, content: MergedPortfolioContent): string {
  const exp = content.experiences.find((e) => e.id === refId);
  if (exp) {
    return `${exp.organization} · ${exp.role}`;
  }
  if (refId === 'exp-uitm') {
    return `${content.education.institution} · ${content.education.degree}`;
  }
  const cert = content.certifications.find((c) => c.id === refId);
  if (cert) {
    return cert.name;
  }
  const cs = content.caseStudies.find((c) => c.id === refId);
  if (cs) {
    return cs.title;
  }
  return refId;
}
