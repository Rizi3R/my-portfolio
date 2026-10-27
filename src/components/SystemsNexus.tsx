import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Network, 
  Server, 
  ShieldCheck, 
  Layers, 
  Workflow, 
  Database, 
  Cloud, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  ExternalLink,
  RotateCcw,
  Info,
  Maximize2
} from 'lucide-react';
import { audioFx } from '../utils/audioFx';
import { CASE_STUDIES, EXPERIENCES } from '../data/portfolioData';

export interface NexusNode {
  id: string;
  label: string;
  domain: 'app_support' | 'it_ops' | 'business_systems' | 'infrastructure' | 'development' | 'cloud';
  domainLabel: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  description: string;
  productionContext: string;
  associatedRole: string;
  associatedCaseId?: string;
  connections: string[]; // target node IDs
}

const NEXUS_NODES: NexusNode[] = [
  {
    id: 'core',
    label: 'Aries Razak · Systems Core',
    domain: 'app_support',
    domainLabel: 'Central Orchestration',
    x: 50,
    y: 50,
    size: 26,
    description: 'System Application Specialist & IT Operations professional keeping business-critical technology running reliably.',
    productionContext: 'Coordinates frontline application triage, physical Layer 1-4 infrastructure, SaaS governance, and vendor accountability.',
    associatedRole: 'emart24 Malaysia · System Application Specialist',
    connections: ['xilnex', 'lark', 'network', 'laravel', 'aws', 'triage']
  },
  {
    id: 'xilnex',
    label: 'Xilnex POS & Retail Systems',
    domain: 'app_support',
    domainLabel: 'Application Support',
    x: 24,
    y: 30,
    size: 20,
    description: 'Mission-critical retail transaction engine across corporate HQ and nationwide emart24 outlets.',
    productionContext: 'Investigates register sync queues, promotional rule conflicts, SKU catalogs, and cashier terminal failures under peak retail load.',
    associatedRole: 'emart24 Malaysia (Sep 2025 – Present)',
    associatedCaseId: 'case-app-troubleshooting',
    connections: ['core', 'payment', 'triage']
  },
  {
    id: 'payment',
    label: 'Payment Gateway & EDC Pinpads',
    domain: 'app_support',
    domainLabel: 'Payment Infrastructure',
    x: 14,
    y: 48,
    size: 18,
    description: 'Hardware pinpads, DuitNow QR clearing, and merchant bank acquirer gateways.',
    productionContext: 'Diagnoses host timeout error 504, isolates bank issuer declines (Do Not Honour) from physical EDC drops, and verifies dual-WAN failover.',
    associatedRole: 'emart24 Malaysia (Sep 2025 – Present)',
    associatedCaseId: 'case-app-troubleshooting',
    connections: ['xilnex', 'network']
  },
  {
    id: 'network',
    label: 'Layer 1–4 Physical Networking',
    domain: 'infrastructure',
    domainLabel: 'Infrastructure & Cabling',
    x: 32,
    y: 72,
    size: 20,
    description: 'Physical RJ45 T-568B cabling, managed switch VLANs, DHCP scopes, and Wi-Fi AP commissioning.',
    productionContext: 'Hands-on termination and 8-wire continuity testing on site; configured isolated subnets for retail POS, NVR cameras, and guest Wi-Fi.',
    associatedRole: 'emart24 Malaysia & Managed Print Services',
    associatedCaseId: 'case-infrastructure-deployment',
    connections: ['core', 'payment', 'hardware']
  },
  {
    id: 'hardware',
    label: 'Endpoint Hardware Diagnostics',
    domain: 'infrastructure',
    domainLabel: 'Hardware & Peripherals',
    x: 18,
    y: 82,
    size: 17,
    description: 'Workstations, thermal receipt printers, barcode scanners, and commercial multifunction copiers.',
    productionContext: 'Diagnosed motherboard conflicts, firmware incompatibilities, static IP assignments, and print spooler queues under Freshdesk SLAs.',
    associatedRole: 'Managed Print Services (Oct 2023 – Mar 2024)',
    connections: ['network', 'triage']
  },
  {
    id: 'triage',
    label: 'Incident Triage & Vendor Escalation',
    domain: 'it_ops',
    domainLabel: 'IT Operations',
    x: 50,
    y: 18,
    size: 20,
    description: 'Structured root-cause analysis, ticket SLA management, and technical context translation for software vendors.',
    productionContext: 'Translates non-technical user distress into reproducible timestamped logs and exact payload errors to achieve fast hotfix deployment.',
    associatedRole: 'emart24 Malaysia & Palaterium',
    associatedCaseId: 'case-app-troubleshooting',
    connections: ['core', 'xilnex', 'lark']
  },
  {
    id: 'lark',
    label: 'Lark Super Admin & SaaS Governance',
    domain: 'business_systems',
    domainLabel: 'Business Systems',
    x: 74,
    y: 28,
    size: 20,
    description: 'Enterprise collaboration platform administration, user lifecycle, and automated paperless approval workflows.',
    productionContext: 'Supported company-wide cutover from Google Workspace to Lark; configured OU schemas, SAML access, and automated cross-departmental approval bots.',
    associatedRole: 'Palaterium Sdn Bhd (Apr 2024 – Aug 2025)',
    associatedCaseId: 'case-saas-migration',
    connections: ['core', 'netsuite', 'triage']
  },
  {
    id: 'netsuite',
    label: 'NetSuite & Data Audit Operations',
    domain: 'business_systems',
    domainLabel: 'ERP & Data Integrity',
    x: 86,
    y: 45,
    size: 18,
    description: 'ERP data imports, discrepancy auditing, and business record validation.',
    productionContext: 'Cleaned and validated multi-departmental imports using advanced Microsoft Excel functions (VLOOKUP, duplicate reconciliation) to protect ERP integrity.',
    associatedRole: 'Palaterium Sdn Bhd (Apr 2024 – Aug 2025)',
    connections: ['lark', 'laravel']
  },
  {
    id: 'laravel',
    label: 'PHP Laravel & Relational MySQL',
    domain: 'development',
    domainLabel: 'Software Engineering',
    x: 72,
    y: 72,
    size: 20,
    description: 'Relational database schema modeling (ERD), SRS authoring, and MVC application architecture.',
    productionContext: 'Engineered internal DKICT Declaration System modules during academic internship at Attorney General\'s Chambers; provides a foundational software mindset.',
    associatedRole: 'Attorney General’s Chambers of Malaysia (Sep 2021 – Feb 2022)',
    associatedCaseId: 'case-dkict-system',
    connections: ['core', 'netsuite', 'aws']
  },
  {
    id: 'aws',
    label: 'AWS Cloud Foundations',
    domain: 'cloud',
    domainLabel: 'Cloud Architecture',
    x: 52,
    y: 84,
    size: 19,
    description: 'Certified cloud architecture, IAM access policies, shared responsibility model, and cloud storage reliability.',
    productionContext: 'Formally accredited AWS Certified Cloud Practitioner; expanding competencies toward scalable cloud support and hybrid infrastructure.',
    associatedRole: 'Accreditation: AWS Certified Cloud Practitioner',
    connections: ['core', 'laravel', 'network']
  }
];

const DOMAIN_COLORS: Record<NexusNode['domain'], { border: string; glow: string; text: string; bg: string }> = {
  app_support: {
    border: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.4)',
    text: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.12)'
  },
  it_ops: {
    border: '#818cf8',
    glow: 'rgba(129, 140, 248, 0.4)',
    text: '#a5b4fc',
    bg: 'rgba(129, 140, 248, 0.12)'
  },
  business_systems: {
    border: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.4)',
    text: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.12)'
  },
  infrastructure: {
    border: '#2dd4bf',
    glow: 'rgba(45, 212, 191, 0.4)',
    text: '#2dd4bf',
    bg: 'rgba(45, 212, 191, 0.12)'
  },
  development: {
    border: '#34d399',
    glow: 'rgba(52, 211, 153, 0.4)',
    text: '#34d399',
    bg: 'rgba(52, 211, 153, 0.12)'
  },
  cloud: {
    border: '#60a5fa',
    glow: 'rgba(96, 165, 250, 0.4)',
    text: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.12)'
  }
};

export const SystemsNexus: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('core');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeFilterDomain, setActiveFilterDomain] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'canvas' | 'hierarchy'>('canvas');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedNode = useMemo(() => {
    return NEXUS_NODES.find((n) => n.id === selectedNodeId) || NEXUS_NODES[0];
  }, [selectedNodeId]);

  const activeNodeConnections = useMemo(() => {
    const active = hoveredNodeId ? NEXUS_NODES.find((n) => n.id === hoveredNodeId) : selectedNode;
    return active ? active.connections : [];
  }, [selectedNode, hoveredNodeId]);

  const handleSelectNode = (id: string) => {
    audioFx.playClick(600);
    setSelectedNodeId(id);
  };

  const handleInspectCaseStudy = (caseId?: string) => {
    if (!caseId) return;
    audioFx.playCommand();
    const element = document.getElementById(caseId) || document.getElementById('investigations') || document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="nexus" className="py-16 lg:py-24 relative overflow-hidden bg-[#070b14] border-y border-slate-800/80">
      {/* Background Subtle Coordinate Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase mb-2">
              <Network className="w-3.5 h-3.5" />
              <span>THE SYSTEMS NEXUS</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>LIVING KNOWLEDGE GRAPH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-2">
              An Interconnected Map of Operational Competencies
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              In real enterprise environments, IT systems do not exist in isolation. Explore how application support, physical networking, SaaS administration, and software foundations connect to deliver operational continuity.
            </p>
          </div>

          {/* View Mode & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  audioFx.playClick(500);
                  setViewMode('canvas');
                }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewMode === 'canvas'
                    ? 'bg-sky-500/20 text-sky-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Interactive Map
              </button>
              <button
                type="button"
                onClick={() => {
                  audioFx.playClick(500);
                  setViewMode('hierarchy');
                }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewMode === 'hierarchy'
                    ? 'bg-sky-500/20 text-sky-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Hierarchy Tree
              </button>
            </div>
          </div>
        </div>

        {/* Main Workstation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: The Visual Graph Canvas / Interactive Map */}
          <div className="lg:col-span-8 bg-[#090e1a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
            
            {/* Top Toolbar */}
            <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold">NEXUS MESH: {NEXUS_NODES.length} ACTIVE DOMAIN NODES</span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Click any node to inspect evidence & verified runbooks
              </div>
            </div>

            {viewMode === 'canvas' ? (
              <div 
                ref={containerRef}
                className="relative w-full h-[460px] sm:h-[540px] bg-[#070b14] overflow-hidden select-none"
              >
                {/* SVG Connections Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="nexus-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Render Connecting Lines */}
                  {NEXUS_NODES.map((node) => {
                    return node.connections.map((targetId) => {
                      const target = NEXUS_NODES.find((n) => n.id === targetId);
                      if (!target || node.id > target.id) return null; // Avoid duplicate lines

                      const isHighlighted =
                        (selectedNode.id === node.id && selectedNode.connections.includes(target.id)) ||
                        (selectedNode.id === target.id && target.connections.includes(node.id)) ||
                        (hoveredNodeId === node.id && node.connections.includes(target.id)) ||
                        (hoveredNodeId === target.id && target.connections.includes(node.id));

                      return (
                        <g key={`${node.id}-${target.id}`}>
                          <line
                            x1={`${node.x}%`}
                            y1={`${node.y}%`}
                            x2={`${target.x}%`}
                            y2={`${target.y}%`}
                            stroke={isHighlighted ? '#38bdf8' : 'rgba(148, 163, 184, 0.15)'}
                            strokeWidth={isHighlighted ? 2.5 : 1}
                            strokeDasharray={isHighlighted ? 'none' : '3 3'}
                            className="transition-all duration-300"
                          />
                          {isHighlighted && (
                            <circle r="2.5" fill="#38bdf8">
                              <animateMotion
                                path={`M ${node.x * 6} ${node.y * 5} L ${target.x * 6} ${target.y * 5}`}
                                dur="2.5s"
                                repeatCount="indefinite"
                              />
                            </circle>
                          )}
                        </g>
                      );
                    });
                  })}
                </svg>

                {/* Interactive HTML Nodes */}
                {NEXUS_NODES.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  const isHovered = hoveredNodeId === node.id;
                  const isConnectedToSelected = activeNodeConnections.includes(node.id);
                  const colors = DOMAIN_COLORS[node.domain];

                  return (
                    <div
                      key={node.id}
                      onClick={() => handleSelectNode(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className={`absolute cursor-pointer transition-all duration-200 group flex flex-col items-center z-10`}
                    >
                      {/* Outer Ring Pulse when Selected */}
                      {isSelected && (
                        <div
                          className="absolute -inset-3 rounded-full animate-ping pointer-events-none opacity-40"
                          style={{ backgroundColor: colors.border }}
                        />
                      )}

                      {/* Node Circle */}
                      <div
                        style={{
                          width: `${node.size * 2}px`,
                          height: `${node.size * 2}px`,
                          borderColor: isSelected || isHovered ? colors.border : isConnectedToSelected ? colors.border : '#334155',
                          backgroundColor: isSelected ? colors.bg : '#0b1329',
                          boxShadow: isSelected ? `0 0 25px ${colors.glow}` : isHovered ? `0 0 15px ${colors.glow}` : 'none'
                        }}
                        className={`rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? 'scale-110 ring-2 ring-white/30' : 'hover:scale-105'
                        }`}
                      >
                        {node.id === 'core' ? (
                          <Cpu className="w-5 h-5 text-sky-400" />
                        ) : node.domain === 'app_support' ? (
                          <Server className="w-4 h-4 text-sky-400" />
                        ) : node.domain === 'infrastructure' ? (
                          <Network className="w-4 h-4 text-teal-400" />
                        ) : node.domain === 'business_systems' ? (
                          <Workflow className="w-4 h-4 text-amber-400" />
                        ) : node.domain === 'development' ? (
                          <Database className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Cloud className="w-4 h-4 text-blue-400" />
                        )}
                      </div>

                      {/* Label Text */}
                      <div
                        className={`mt-2 px-2 py-0.5 rounded text-center transition-all pointer-events-none whitespace-nowrap text-[11px] font-mono ${
                          isSelected
                            ? 'bg-slate-900/90 text-white font-bold border border-slate-700 shadow-md'
                            : isConnectedToSelected
                            ? 'text-sky-300 font-semibold'
                            : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {node.label}
                      </div>
                    </div>
                  );
                })}

                {/* Bottom Canvas Legend */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-800 text-[10px] font-mono text-slate-400">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400" /> App Support
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal-400" /> Infrastructure
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" /> SaaS & Business
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" /> Development
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400" /> Cloud
                    </span>
                  </div>
                  <span className="text-slate-500 hidden md:inline">Click node to inspect evidence</span>
                </div>
              </div>
            ) : (
              /* Accessible Hierarchy Tree View (Ideal for mobile or linear reading) */
              <div className="p-4 sm:p-6 space-y-4 max-h-[540px] overflow-y-auto">
                {NEXUS_NODES.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  const colors = DOMAIN_COLORS[node.domain];

                  return (
                    <div
                      key={node.id}
                      onClick={() => handleSelectNode(node.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-900/90 border-sky-400 shadow-lg'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-semibold" style={{ color: colors.text }}>
                          {node.domainLabel}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {node.connections.length} connections
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{node.label}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                        {node.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Right: Deep Evidence & System Inspector Dossier */}
          <div className="lg:col-span-4 bg-[#090e1a] border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between h-full min-h-[460px] sm:min-h-[540px]">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono">
                <span className="text-slate-400 uppercase tracking-wider">SYSTEM INSPECTOR</span>
                <span 
                  className="px-2.5 py-0.5 rounded text-[11px] font-semibold border"
                  style={{ 
                    color: DOMAIN_COLORS[selectedNode.domain].text,
                    borderColor: DOMAIN_COLORS[selectedNode.domain].border,
                    backgroundColor: DOMAIN_COLORS[selectedNode.domain].bg
                  }}
                >
                  {selectedNode.domainLabel}
                </span>
              </div>

              {/* Node Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                {selectedNode.label}
              </h3>

              <div className="text-xs font-mono text-sky-400 mb-4 pb-3 border-b border-slate-800/80">
                Context: {selectedNode.associatedRole}
              </div>

              {/* Technical Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {selectedNode.description}
              </p>

              {/* Verified Production Reality */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 mb-5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                  On-the-Ground Production Reality:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedNode.productionContext}
                </p>
              </div>

              {/* Connected Systems List */}
              <div className="mb-5">
                <span className="text-[11px] font-mono text-slate-400 block mb-2">
                  Interconnected Dependencies ({selectedNode.connections.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.connections.map((connId) => {
                    const connNode = NEXUS_NODES.find((n) => n.id === connId);
                    if (!connNode) return null;
                    return (
                      <button
                        key={connId}
                        type="button"
                        onClick={() => handleSelectNode(connId)}
                        className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
                      >
                        → {connNode.label.split('·')[0].split('&')[0].trim()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions at bottom */}
            <div className="pt-4 border-t border-slate-800">
              {selectedNode.associatedCaseId ? (
                <button
                  type="button"
                  onClick={() => handleInspectCaseStudy(selectedNode.associatedCaseId)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-md transition-colors shadow-sm shadow-sky-500/20"
                >
                  <span>Explore Associated Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="text-[11px] font-mono text-slate-500 text-center py-1">
                  Core Architectural Anchor · Zero Disconnected Nodes
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
