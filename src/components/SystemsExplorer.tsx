import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  Server, 
  Workflow, 
  Database, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  CreditCard, 
  Wifi, 
  Lock, 
  Cpu,
  Info
} from 'lucide-react';
import { audioFx } from '../utils/audioFx';
import { TiltCard } from './TiltCard';

interface ArchitectureStage {
  id: string;
  number: string;
  title: string;
  component: string;
  protocol: string;
  responsibility: string;
  failureMode: string;
  mitigation: string;
}

interface ArchitecturePipeline {
  id: string;
  name: string;
  tagline: string;
  context: string;
  stages: ArchitectureStage[];
}

const ARCHITECTURE_PIPELINES: ArchitecturePipeline[] = [
  {
    id: 'retail-pos',
    name: 'Retail Transaction & Branch Connectivity Pipeline',
    tagline: 'Multi-site store checkout flow, payment clearing, and dual-WAN failover.',
    context: 'Reflects real production support at emart24 Malaysia across HQ and nationwide store outlets.',
    stages: [
      {
        id: 'stage-pos',
        number: '01',
        title: 'Frontline Terminal',
        component: 'Xilnex POS Register Terminal',
        protocol: 'Local IPC / Serial RS-232 & USB',
        responsibility: 'Captures scanned barcode SKUs, validates promotional discounts, totals cart, and dispatches payment authorization trigger.',
        failureMode: 'Register software freezing, cash drawer kick failure, or local SQLite database lock.',
        mitigation: 'Implemented automated transaction rollback and hot-standby cashier register failover.'
      },
      {
        id: 'stage-edc',
        number: '02',
        title: 'Payment Integration',
        component: 'Ingenico EDC Payment Pinpad & DuitNow QR',
        protocol: 'ISO 8583 Financial Protocol (TCP 8443)',
        responsibility: 'Encrypts EMV chip cryptogram and customer PIN block; dispatches settlement request to merchant bank acquirer.',
        failureMode: 'Host Timeout 504 during lunch queue peaks or bank issuer "Do Not Honour" declines.',
        mitigation: 'Standardized cashier triage SOP to isolate physical PIN-pad network drops from bank issuer rejections.'
      },
      {
        id: 'stage-switch',
        number: '03',
        title: 'Local Infrastructure',
        component: 'Managed Layer-2 Switch (802.1Q VLANs)',
        protocol: 'VLAN 10 (POS) / VLAN 20 (NVR) / VLAN 30 (Guest)',
        responsibility: 'Isolates PCI-DSS sensitive transaction traffic from public customer Wi-Fi and back-office store PC traffic.',
        failureMode: 'Broadcast storm or copper cabling patch drop (tested via RJ45 continuity tool).',
        mitigation: 'STP (Spanning Tree Protocol) configured; verified 8-pin T-568B termination during store opening.'
      },
      {
        id: 'stage-gateway',
        number: '04',
        title: 'Resilient WAN Egress',
        component: 'Dual-WAN Gateway Router (Fibre + 4G LTE)',
        protocol: 'BGP / Policy-Based Routing / IPSec Tunnel',
        responsibility: 'Monitors broadband link health. Automatically switches traffic to secondary 4G cellular WAN in < 2 seconds if fibre degrades.',
        failureMode: 'Fibre upstream degradation causing silent packet loss while link state remains physically UP.',
        mitigation: 'Configured ping heartbeat probes to 1.1.1.1 to detect degraded latency and trigger seamless route failover.'
      },
      {
        id: 'stage-cloud',
        number: '05',
        title: 'Central Cloud Sync',
        component: 'Enterprise Cloud Transaction Hub',
        protocol: 'RESTful JSON / HTTPS TLS 1.3',
        responsibility: 'Ingests hourly store settlements, synchronizes nationwide inventory quantities, and feeds ERP accounting ledgers.',
        failureMode: 'Synchronization backlog caused by temporary store offline state.',
        mitigation: 'Store POS operates with offline queue buffering; transactions re-sync idempotently when connection returns.'
      }
    ]
  },
  {
    id: 'saas-governance',
    name: 'Enterprise SaaS, Identity & Workflow Governance',
    tagline: 'Employee identity lifecycle, single sign-on, and automated approval bots.',
    context: 'Reflects Super Admin administration at Palaterium Sdn Bhd migrating from Google Workspace to Lark.',
    stages: [
      {
        id: 'saas-id',
        number: '01',
        title: 'User Identity Ingestion',
        component: 'Organizational Unit (OU) Directory',
        protocol: 'SAML 2.0 / SCIM Provisioning',
        responsibility: 'Creates employee accounts based on validated onboarding notices. Enforces department hierarchy and role access.',
        failureMode: 'Orphaned user accounts post-departure or misassigned department permission scopes.',
        mitigation: 'Established strict offboarding checklists and automated session revocation within Lark Super Admin.'
      },
      {
        id: 'saas-sso',
        number: '02',
        title: 'Federated Access',
        component: 'Single Sign-On (SSO) & MFA Gate',
        protocol: 'OIDC / Multi-Factor Authenticator',
        responsibility: 'Authenticates employee mobile and desktop clients with time-based OTP or biometric prompt.',
        failureMode: 'Session expiry during business travel or lockout due to lost mobile authentication devices.',
        mitigation: 'Administered recovery OTP codes through verified IT service desk ticketing protocols.'
      },
      {
        id: 'saas-bot',
        number: '03',
        title: 'Approval Automation',
        component: 'Lark Base Automated Workflow Engine',
        protocol: 'Webhooks / JSON Event Triggers',
        responsibility: 'Replaced paper-based requisition memos with paperless multi-tier approval chains (Employee -> Manager -> Finance).',
        failureMode: 'Approval bottlenecks when designated managers take leave or approval conditions conflict.',
        mitigation: 'Engineered auto-delegation triggers and real-time Lark Bot notifications with 1-click decision buttons.'
      },
      {
        id: 'saas-audit',
        number: '04',
        title: 'Data Integrity Gate',
        component: 'NetSuite ERP Reconciliation & Audit',
        protocol: 'CSV Batch Import & Advanced Excel Validation',
        responsibility: 'Audits multi-department transaction data before ingestion into NetSuite to maintain financial reporting accuracy.',
        failureMode: 'Mismatched SKU codes, duplicate vendor invoices, or malformed currency fields.',
        mitigation: 'Authored Excel VLOOKUP and discrepancy audit models, slashing manual correction hours and protecting ledger integrity.'
      }
    ]
  },
  {
    id: 'software-mvc',
    name: 'Full-Stack MVC & Relational Database Pipeline',
    tagline: 'Model-View-Controller architecture, validation rules, and relational schemas.',
    context: 'Reflects development foundations from the Attorney General\'s Chambers of Malaysia and CS diploma.',
    stages: [
      {
        id: 'mvc-client',
        number: '01',
        title: 'User Client View',
        component: 'Responsive Web Interface (Blade / JS)',
        protocol: 'HTTPS TLS 1.3 / DOM Events',
        responsibility: 'Renders form inputs, handles client-side form validation, and displays accessible feedback states.',
        failureMode: 'Malformed input payloads or CSRF token expiration.',
        mitigation: 'Enforced CSRF protection tokens and semantic form constraints across all user endpoints.'
      },
      {
        id: 'mvc-router',
        number: '02',
        title: 'Reverse Proxy & Ingress',
        component: 'NGINX Web Server & FastCGI',
        protocol: 'Unix Domain Socket / HTTP/2',
        responsibility: 'Terminates TLS, serves static asset caches, and proxies PHP-FPM requests to backend workers.',
        failureMode: '502 Bad Gateway when PHP-FPM process pools become saturated under sudden request spikes.',
        mitigation: 'Tuned pm.max_children and request timeouts based on available server RAM.'
      },
      {
        id: 'mvc-controller',
        number: '03',
        title: 'Business Logic Kernel',
        component: 'PHP Laravel MVC Controller & Middleware',
        protocol: 'PHP 8.x Runtime Execution',
        responsibility: 'Validates authenticated sessions, checks role permissions (RBAC), applies business rules, and calls database models.',
        failureMode: 'Uncaught exceptions or unvalidated user inputs creating SQL injection vulnerabilities.',
        mitigation: 'Utilized Laravel Eloquent ORM parameterized queries and strict FormRequest validation rules.'
      },
      {
        id: 'mvc-database',
        number: '04',
        title: 'Relational Storage',
        component: 'MySQL 8.0 Engine (Normalized ERD)',
        protocol: 'TCP 3306 / InnoDB ACID Transactions',
        responsibility: 'Persists records across third-normal-form (3NF) tables with foreign key constraints and indexed lookup keys.',
        failureMode: 'Slow table full-scans or deadlocks during concurrent record updates.',
        mitigation: 'Designed composite indexes on foreign keys (user_id, status_code) and drafted comprehensive ERD documentation.'
      }
    ]
  }
];

export const SystemsExplorer: React.FC = () => {
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('retail-pos');
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const activePipeline = ARCHITECTURE_PIPELINES.find((p) => p.id === selectedPipelineId) || ARCHITECTURE_PIPELINES[0];
  const activeStage = activePipeline.stages[activeStageIndex] || activePipeline.stages[0];

  const handleSelectPipeline = (id: string) => {
    audioFx.playClick(500);
    setSelectedPipelineId(id);
    setActiveStageIndex(0);
  };

  const handleSelectStage = (idx: number) => {
    audioFx.playClick(600);
    setActiveStageIndex(idx);
  };

  return (
    <section id="systems" className="py-20 lg:py-28 relative bg-[#060913] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>SPACE 02</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>SYSTEMS ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug mb-3">
            How Business Technology Actually Connects
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            In enterprise environments, systems are never standalone boxes. Explore real end-to-end architectures I support and work with—from retail point-of-sale pipelines and SaaS identity governance to full-stack MVC software engines.
          </p>
        </div>

        {/* Pipeline Selector Ribbon */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl">
          {ARCHITECTURE_PIPELINES.map((pipeline) => {
            const isSelected = selectedPipelineId === pipeline.id;
            return (
              <button
                key={pipeline.id}
                type="button"
                onClick={() => handleSelectPipeline(pipeline.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  isSelected
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{pipeline.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pipeline Dossier */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-2xl space-y-8">
          
          {/* Pipeline Context Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-sky-400 uppercase block mb-1">
                PIPELINE OVERVIEW
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activePipeline.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {activePipeline.tagline}
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800">
              {activePipeline.context}
            </div>
          </div>

          {/* Interactive Stepper Navigation (Horizontal Timeline) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {activePipeline.stages.map((stage, idx) => {
              const isSelected = activeStageIndex === idx;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => handleSelectStage(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-sky-500/15 border-sky-400 text-white shadow-lg shadow-sky-500/10'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-sky-400 font-bold">STAGE {stage.number}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                  </div>
                  <div className="text-xs font-bold text-white truncate">
                    {stage.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5 font-mono">
                    {stage.protocol.split('/')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Stage Deep-Dive Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Stage Left: Component & Protocol */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase mb-1">
                  <span>STAGE {activeStage.number} SPECIFICATION</span>
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {activeStage.component}
                </h4>
                <span className="inline-block mt-2 text-xs font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                  Protocol: {activeStage.protocol}
                </span>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase block mb-1.5">
                  OPERATIONAL RESPONSIBILITY:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/70 p-3.5 rounded-lg border border-slate-800/80">
                  {activeStage.responsibility}
                </p>
              </div>
            </div>

            {/* Stage Right: Real Failure Modes & Practical Mitigation */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/30 text-xs space-y-1.5">
                <span className="font-mono text-red-400 font-semibold block uppercase">
                  COMMON PRODUCTION FAILURE MODE:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {activeStage.failureMode}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-xs space-y-1.5">
                <span className="font-mono text-emerald-400 font-semibold block uppercase">
                  HOW I MITIGATE & RESOLVE THIS:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {activeStage.mitigation}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
