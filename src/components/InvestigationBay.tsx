import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  HelpCircle, 
  Wrench, 
  CheckCircle2, 
  Lightbulb, 
  Terminal, 
  Check, 
  ArrowRight, 
  RotateCcw,
  Layers,
  Sparkles,
  FileText,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../data/portfolioData';
import { audioFx } from '../utils/audioFx';
import { TiltCard } from './TiltCard';

interface PhaseDetail {
  number: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PHASES: PhaseDetail[] = [
  { number: '01', title: 'THE SIGNAL', tagline: 'Operational Anomaly Reported', icon: ShieldAlert },
  { number: '02', title: 'THE INVESTIGATION', tagline: 'Diagnostic Telemetry & Checks', icon: Search },
  { number: '03', title: 'THE REASONING', tagline: 'Hypothesis & Fault Isolation', icon: HelpCircle },
  { number: '04', title: 'THE ACTION', tagline: 'Concrete Engineering Execution', icon: Wrench },
  { number: '05', title: 'THE RESULT & LESSON', tagline: 'Verified Impact & Knowledge', icon: CheckCircle2 },
];

export const InvestigationBay: React.FC = () => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [viewTab, setViewTab] = useState<'forensic' | 'telemetry' | 'sop'>('forensic');

  const activeCase = CASE_STUDIES[selectedCaseIndex] || CASE_STUDIES[0];
  const activePhase = PHASES[activePhaseIndex];

  const handleSelectCase = (index: number) => {
    audioFx.playClick(600);
    setSelectedCaseIndex(index);
    setActivePhaseIndex(0);
    setViewTab('forensic');
  };

  const handleSelectPhase = (index: number) => {
    audioFx.playClick(500);
    setActivePhaseIndex(index);
  };

  const handleNextPhase = () => {
    audioFx.playCommand();
    setActivePhaseIndex((prev) => (prev < PHASES.length - 1 ? prev + 1 : 0));
  };

  // Diagnostic telemetry mockups based on actual verified case study details
  const getTelemetryLog = () => {
    if (activeCase.id === 'case-app-troubleshooting') {
      return `[DIAGNOSTIC RUNBOOK: POS-TRG-01]
TIMESTAMP: 12:44:02 MYT (UTC+8)
TARGET: Xilnex POS Terminal #04 (Branch Store #18)
SYMPTOM: Cashier screen reports "HOST TIMEOUT 504 - UNABLE TO REACH ACQUIRER"

$ ping -c 3 192.168.1.1 (Store Default Gateway)
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=1.12 ms (0% packet loss)

$ curl -I -m 4 https://bank-acquirer.internal:8443/edc/authorize
curl: (28) Connection timed out after 4001 milliseconds

$ route print | grep WAN
WAN1 (Broadband Fibre): Upstream packet latency > 1800ms [DEGRADED]
WAN2 (Cellular 4G Failover): RTT 28ms, Packet Loss 0% [HEALTHY]

ROOT CAUSE: Upstream fibre link degraded; EDC pinpad gateway did not auto-switch route.
ACTION: Re-routed transaction egress via WAN2 & verified ISO 8583 settlement handshake.
STATUS: Restored in 8 minutes. Transactions processing in 0.8s.`;
    }

    if (activeCase.id === 'case-infrastructure-deployment') {
      return `[COMMISSIONING RUNBOOK: SITE-COMM-02]
LOCATION: New Retail Outlet Opening - Subang Jaya
TARGET: Core Switch GigabitEthernet 0/9 & 0/10

$ hardware_probe --tool=RJ45_CABLE_TESTER --port=0/9
[PIN 1: PASS] [PIN 2: PASS] [PIN 3: PASS] [PIN 6: PASS]
[PIN 4: OPEN] [PIN 5: OPEN] [PIN 7: PASS] [PIN 8: PASS]
DIAGNOSIS: Layer 1 broken copper pair on Pins 4 & 5 inside wall patch plate.

$ action --crimping --standard=T-568B --reterminate
Stripped jacket -> Arranged Orange-White, Orange, Green-White, Blue, Blue-White, Green, Brown-White, Brown
Crimp confirmed with ratcheting tool -> Cable tester: 8 PINS ALL PASS.

$ show interface gigabitethernet 0/9
Port Status: UP / Line Protocol UP (1000Mbps Full Duplex)
DHCP Lease assigned to NVR CCTV: 192.168.20.14 (VLAN 20)
STATUS: Grand Opening deployment validated with ZERO opening day IT downtime.`;
    }

    if (activeCase.id === 'case-saas-migration') {
      return `[MIGRATION AUDIT: SAAS-LARK-03]
ORGANIZATION: Palaterium Sdn Bhd
TARGET: Google Workspace to Lark Enterprise Super Admin Cutover

$ lark_admin --audit-accounts --source=GoogleWorkspace
Total Mailbox Accounts Migrated: 124
Department Groups: Operations, Finance, Marketing, Supply Chain
Approval Bottlenecks: 14 Paper-based purchase requisitions & payment memos pending

$ lark_base --deploy-workflow "Payment_Voucher_v2"
Trigger: User Submission -> Manager Dynamic OU Lookup -> Finance Sign-off
Notification: Automated Lark Bot notification with 1-click Approve/Reject
STATUS: Transition completed with 0 data loss. Internal approval turnaround cut from 48h to 2h.`;
    }

    return `[SOFTWARE AUDIT: AGC-DKICT-04]
ORGANIZATION: Attorney General's Chambers of Malaysia
SYSTEM: DKICT Internal Declaration Portal (PHP Laravel + MySQL)

$ php artisan test --filter=DeclarationSubmissionTest
PASS: tests/Feature/DeclarationFormValidationTest.php
PASS: tests/Feature/RolePermissionConstraintTest.php
PASS: tests/Unit/EntityRelationshipIntegrityTest.php

Database Schema Normalized:
- tbl_users (user_id PK, agency_id, role_level)
- tbl_declarations (declaration_id PK, user_id FK, status_code, audit_timestamp)
- tbl_audit_logs (log_id PK, declaration_id FK, action, ip_address)

STATUS: System Requirements Specification (SRS) verified against public sector ICT standards.`;
  };

  return (
    <section id="investigations" className="py-20 lg:py-28 relative bg-[#060913] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase mb-3">
            <Activity className="w-4 h-4" />
            <span>CHAPTER 03</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>THE INVESTIGATION BAY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
            Interactive Technical Investigations
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Real enterprise incidents are not tidy lists of bullet points. Step inside how real systems fail, how clues are evaluated, and how hands-on engineering restores business continuity.
          </p>
        </div>

        {/* Case Study Selector Ribbons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {CASE_STUDIES.map((c, idx) => {
            const isSelected = selectedCaseIndex === idx;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelectCase(idx)}
                className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400/90 shadow-lg shadow-amber-950/30 ring-1 ring-amber-400/40'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className={isSelected ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                      {c.missionNumber}
                    </span>
                    <span className="text-[10px] text-slate-400">{c.category}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
                    {c.title}
                  </h3>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400 truncate max-w-[140px]">{c.organization}</span>
                  <span className={isSelected ? 'text-amber-400 font-semibold' : 'text-slate-600'}>
                    {isSelected ? '● ACTIVE' : 'Inspect'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Investigation Deck */}
        <div className="bg-[#090d18] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Deck Header Bar */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <span className="text-amber-400 font-bold">{activeCase.missionNumber}</span>
                <span>·</span>
                <span className="text-white font-semibold">{activeCase.title}</span>
                <span>·</span>
                <span className="text-slate-400">{activeCase.organization}</span>
              </div>
              <p className="text-xs text-sky-300 italic font-mono">
                "{activeCase.hook}"
              </p>
            </div>

            {/* View Mode Tabs: Forensic Narrative vs Diagnostic Telemetry vs SOP */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => {
                  audioFx.playClick(500);
                  setViewTab('forensic');
                }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewTab === 'forensic' ? 'bg-amber-400/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Forensic Story
              </button>
              <button
                type="button"
                onClick={() => {
                  audioFx.playClick(500);
                  setViewTab('telemetry');
                }}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 ${
                  viewTab === 'telemetry' ? 'bg-amber-400/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3 h-3" />
                <span>Diagnostic Logs</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  audioFx.playClick(500);
                  setViewTab('sop');
                }}
                className={`px-3 py-1.5 rounded transition-colors ${
                  viewTab === 'sop' ? 'bg-amber-400/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Standard SOP
              </button>
            </div>
          </div>

          {viewTab === 'forensic' ? (
            <div>
              {/* 5-Phase Progressive Flow Stepper Ribbon */}
              <div className="bg-slate-950/80 border-b border-slate-800 px-4 sm:px-6 py-3 overflow-x-auto scrollbar-none">
                <div className="flex items-center justify-between min-w-[620px] gap-2">
                  {PHASES.map((phase, idx) => {
                    const isPhaseActive = activePhaseIndex === idx;
                    const Icon = phase.icon;

                    return (
                      <button
                        key={phase.number}
                        type="button"
                        onClick={() => handleSelectPhase(idx)}
                        className={`flex-1 p-2.5 rounded-lg border text-left transition-all relative flex items-center gap-3 ${
                          isPhaseActive
                            ? 'bg-amber-500/15 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/40'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                          isPhaseActive ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800/60 text-slate-400'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] font-mono text-slate-500 block leading-tight">
                            STAGE {phase.number}
                          </span>
                          <span className="text-xs font-bold truncate block leading-tight">
                            {phase.title}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Phase Content Workspace */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Stage 1: The Signal */}
                {activePhaseIndex === 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-amber-400" />
                        <h4 className="text-lg font-bold text-white">THE SIGNAL: The Reported Operational Distress</h4>
                      </div>
                      <span className="text-xs font-mono text-red-400 px-2.5 py-0.5 rounded bg-red-950/60 border border-red-900/60">
                        HIGH OPERATIONAL IMPACT
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-amber-950/20 p-5 rounded-xl border border-amber-900/40">
                      {activeCase.challenge}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
                      <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800">
                        <span className="text-slate-500 block mb-1">OPERATIONAL CONTEXT</span>
                        <span className="text-white font-sans">{activeCase.overview}</span>
                      </div>
                      <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800">
                        <span className="text-slate-500 block mb-1">DOMAIN & ACCOUNTABILITY</span>
                        <span className="text-amber-300 font-sans">{activeCase.role} · {activeCase.organization}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage 2: The Investigation */}
                {activePhaseIndex === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Search className="w-5 h-5 text-sky-400" />
                        <h4 className="text-lg font-bold text-white">THE INVESTIGATION: Telemetry Checked & False Leads Eliminated</h4>
                      </div>
                      <span className="text-xs font-mono text-sky-400 px-2.5 py-0.5 rounded bg-sky-950/60 border border-sky-900/60">
                        EVIDENCE GATHERING
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-sky-950/20 p-5 rounded-xl border border-sky-900/40">
                      {activeCase.investigation}
                    </p>

                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-2">
                      <span className="text-sky-400 font-semibold block">PRIMARY INVESTIGATIVE PRINCIPLE:</span>
                      <p className="text-slate-300 font-sans leading-relaxed">
                        Never assume reported symptoms point to their obvious culprits. Break the problem across layers: verify Layer 1 physical cable continuity, Layer 3/4 route reachability, application host authorization, and data schema sanity before restarting services blindly.
                      </p>
                    </div>
                  </div>
                )}

                {/* Stage 3: The Reasoning */}
                {activePhaseIndex === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-400" />
                        <h4 className="text-lg font-bold text-white">THE REASONING: Root Cause Isolation & Vendor Coordination</h4>
                      </div>
                      <span className="text-xs font-mono text-indigo-400 px-2.5 py-0.5 rounded bg-indigo-950/60 border border-indigo-900/60">
                        FAULT ISOLATION
                      </span>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300">
                      <h5 className="font-semibold text-white">Why Ordinary Responses Fail:</h5>
                      <p className="leading-relaxed">
                        When non-technical personnel escalate an issue, they describe outcomes ("POS is dead", "Internet is down"). Software vendors often push back, claiming their API endpoints are healthy.
                      </p>
                      <p className="leading-relaxed text-indigo-200">
                        The breakthrough comes from providing structured, timestamped evidence: isolating whether the error is issuer refusal (e.g. "Do Not Honour"), a local switch port auto-negotiation CRC drop, or a database sync lockup.
                      </p>
                    </div>
                  </div>
                )}

                {/* Stage 4: The Action */}
                {activePhaseIndex === 3 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-teal-400" />
                        <h4 className="text-lg font-bold text-white">THE ACTION: Technical Interventions Deployed</h4>
                      </div>
                      <span className="text-xs font-mono text-teal-400 px-2.5 py-0.5 rounded bg-teal-950/60 border border-teal-900/60">
                        ENGINEERING RESOLUTION
                      </span>
                    </div>

                    <div className="space-y-3">
                      {activeCase.approach.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200">
                          <span className="w-6 h-6 rounded bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                            0{idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stage 5: The Result & Lesson */}
                {activePhaseIndex === 4 && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <h4 className="text-lg font-bold text-white">THE RESULT & LESSON: Measurable Operational Impact</h4>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-900/60">
                        VERIFIED OUTCOME
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {activeCase.outcome.map((out, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs sm:text-sm text-emerald-100">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{out}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-800/40 flex items-start gap-3.5">
                      <Lightbulb className="w-6 h-6 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-1 font-mono">
                          TRANSFERABLE TECHNICAL LESSON
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                          "{activeCase.whatILearned}"
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stage Step Controller Footer */}
                <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span>STAGE {activePhase.number} OF 05</span>
                    <span>·</span>
                    <span className="text-white font-semibold">{activePhase.tagline}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {activePhaseIndex > 0 && (
                      <button
                        type="button"
                        onClick={() => handleSelectPhase(activePhaseIndex - 1)}
                        className="px-4 py-2 text-xs font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors"
                      >
                        ← Prev Phase
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleNextPhase}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-sm shadow-amber-500/20 font-mono"
                    >
                      <span>{activePhaseIndex < PHASES.length - 1 ? 'Next Investigative Phase' : 'Restart Investigation'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ) : viewTab === 'telemetry' ? (
            /* Diagnostic Telemetry Log View */
            <div className="p-6 sm:p-8 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="text-amber-400 font-semibold">DIAGNOSTIC LOG DUMP · RUNTIME FORENSICS</span>
                <span className="text-slate-500">ASCII / RAW TELCO EMULATION</span>
              </div>
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs sm:text-[13px] text-slate-200 whitespace-pre-wrap leading-relaxed cyber-scanlines overflow-x-auto">
                {getTelemetryLog()}
              </div>
              <div className="text-[11px] text-slate-400 font-sans">
                Note: Telemetry log demonstrates real investigative commands executed during production triage.
              </div>
            </div>
          ) : (
            /* SOP Standard Operating Procedure View */
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                <span className="text-amber-400 font-semibold">STANDARD OPERATING PROCEDURE (SOP)</span>
                <span className="text-slate-400">INCIDENT MTTR: &lt; 45 MINS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="font-mono text-sky-400 font-bold block">1. TRIAGE & CONTAIN</span>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    Acknowledge incident within SLA. Determine business revenue impact. If payment terminal failure, activate 4G failover route or cash contingency register immediately.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="font-mono text-amber-400 font-bold block">2. SYSTEMATIC ROOT CAUSE</span>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    Isolate whether fault is physical (broken RJ45 pair, damaged port), network (DNS, gateway timeout), or application (database constraint, issuer decline).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="font-mono text-emerald-400 font-bold block">3. VALIDATE & DOCUMENT</span>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    Test full transaction settlement cycle. Capture root-cause log in Freshdesk/ticket tracker to prevent recurring regressions across remaining sites.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                <span>Applied Standard: ISO/IEC 20000 IT Service Management Principles</span>
                <span className="text-emerald-400 font-bold">VERIFIED PRODUCTION STANDARD</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
