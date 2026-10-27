import React, { useState } from 'react';
import { audioFx } from '../utils/audioFx';
import { 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  Play, 
  RotateCcw, 
  Shield, 
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  Cpu
} from 'lucide-react';
import { TiltCard } from './TiltCard';

interface DiagnosticTool {
  id: string;
  name: string;
  action: string;
  output: string;
}

interface IncidentScenario {
  id: string;
  ticketId: string;
  category: 'Application Support' | 'Infrastructure' | 'Business Systems';
  title: string;
  organization: string;
  urgency: 'HIGH' | 'CRITICAL';
  initialState: string;
  diagnosticTools: DiagnosticTool[];
  solutions: {
    id: string;
    description: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  operationalTakeaway: string;
}

const INCIDENT_SCENARIOS: IncidentScenario[] = [
  {
    id: 'pos-triage',
    ticketId: 'INC-2041',
    category: 'Application Support',
    title: 'POS Payment Gateway Host Timeout during Peak Hours',
    organization: 'emart24 Malaysia',
    urgency: 'CRITICAL',
    initialState: 'Store #18 POS registers cannot process card/QR transactions. Cashier screen reports "HOST TIMEOUT 504 - UNABLE TO REACH ACQUIRER". Lunch queue forming.',
    diagnosticTools: [
      {
        id: 'ping-gateway',
        name: 'Ping Local & Bank Gateway',
        action: 'ping -c 4 192.168.1.1 && ping -c 4 203.0.113.84:8443',
        output: 'Local Switch (192.168.1.1): 0% packet loss, 1.2ms avg.\nBank Acquirer Gateway (203.0.113.84): 100% packet loss, destination unreachable.\nDNS lookup: Payment host resolved, but egress port 8443 rejected.'
      },
      {
        id: 'inspect-logs',
        name: 'Inspect Xilnex POS Transaction Logs',
        action: 'cat /logs/xilnex/edc_transport.log | tail -n 20',
        output: '[WARN] Handshake SSL timeout on primary broadband line.\n[ERR] SocketException: Connection timed out to primary bank endpoint.\n[INFO] Secondary 4G failover APN is online and responding at 10.42.0.1.'
      },
      {
        id: 'test-failover',
        name: 'Check Telco Dual-WAN Router Status',
        action: 'route print && ip link show wan2',
        output: 'WAN1 (Fibre): Active, but high latency / upstream packet drop detected.\nWAN2 (Cellular Backup): Online, 0% packet loss, steady 38ms latency to bank subnet.'
      }
    ],
    solutions: [
      {
        id: 'sol-reboot',
        description: 'Hard power-cycle the entire POS cash register',
        isCorrect: false,
        explanation: 'Power cycling the register causes a 4-minute boot delay without fixing the upstream WAN1 broadband routing failure.'
      },
      {
        id: 'sol-wan-failover',
        description: 'Force EDC gateway traffic over verified secondary 4G cellular WAN route & re-initialize settlement handshake',
        isCorrect: true,
        explanation: 'Success! Payment gateway re-routed through healthy 4G WAN. Card and DuitNow QR authorization restored with 0.8s response time. Store operations normalized.'
      },
      {
        id: 'sol-replace-printer',
        description: 'Swap receipt printer and clear print spooler queue',
        isCorrect: false,
        explanation: 'The receipt printer is functioning properly; the issue is Layer 3/4 network egress to the payment acquirer.'
      }
    ],
    operationalTakeaway: 'When retail payment pipelines stall, isolate whether the fault is local hardware or upstream egress before restarting endpoints. Failing over to secondary cellular paths preserves peak revenue.'
  },
  {
    id: 'infra-cabling',
    ticketId: 'INC-1182',
    category: 'Infrastructure',
    title: 'New Store Launch — Switch Port Inactive & CCTV Link Fault',
    organization: 'emart24 Multi-Site Commissioning',
    urgency: 'HIGH',
    initialState: 'Store opening scheduled in 4 hours. Core switch ports 9 and 10 display orange fault LEDs. CCTV NVR cameras and back-office PC have zero IP connectivity.',
    diagnosticTools: [
      {
        id: 'cable-tester',
        name: 'Run 8-Wire RJ45 Pin Continuity Tester',
        action: 'hardware_probe --tester=RJ45_CONTINUITY --port=9',
        output: 'TEST RESULT: Pins 1, 2, 3, 6 [PASS].\nPins 4 & 5 [OPEN / NO SIGNAL].\nDiagnosis: Physical cable termination fault inside wall patch plate.'
      },
      {
        id: 'switch-status',
        name: 'Query Switch Port Link Statistics',
        action: 'show interface gigabitethernet 0/9 detail',
        output: 'Port 0/9: Down / Line Protocol Down.\nRX_Errors: 412 CRC alignment errors.\nDuplex: Unknown. Auto-negotiation failed due to broken wire pair.'
      },
      {
        id: 'dhcp-scope',
        name: 'Verify DHCP Lease Pool Status',
        action: 'show ip dhcp binding',
        output: 'DHCP Pool (VLAN 20): 192.168.1.100 - 192.168.1.200 available. 18 leases active, 82 free. Subnet is healthy.'
      }
    ],
    solutions: [
      {
        id: 'sol-telco-ticket',
        description: 'Submit an external contractor ticket to recable the store next week',
        isCorrect: false,
        explanation: 'The grand opening is today! Waiting for external contractor visit results in opening day compliance failure.'
      },
      {
        id: 'sol-recrimp',
        description: 'Cut damaged connector, re-strip casing, re-terminate RJ45 with T-568B pinout, and re-test with cable tester',
        isCorrect: true,
        explanation: 'Success! 8-wire cable tester confirms full 8-pin continuity. Switch port negotiated 1000Mbps Full Duplex. NVR cameras online with crystal-clear stream.'
      },
      {
        id: 'sol-change-ip',
        description: 'Change the IP address of the CCTV cameras to static subnet',
        isCorrect: false,
        explanation: 'IP re-assignment cannot solve broken copper continuity on Pins 4 and 5.'
      }
    ],
    operationalTakeaway: 'Layer 1 physical infrastructure troubleshooting requires hands-on readiness. Carrying punch-down tools and a cable tester prevents costly contractor delays.'
  },
  {
    id: 'saas-migration',
    ticketId: 'INC-0947',
    category: 'Business Systems',
    title: 'SaaS Migration — Departmental Approval Workflow Desync',
    organization: 'Palaterium Sdn Bhd',
    urgency: 'HIGH',
    initialState: 'Following cutover from Google Workspace to Lark, 14 department heads cannot approve electronic payment vouchers. Lark approval bot rejects requests with "403 Forbidden: Identity Unmapped".',
    diagnosticTools: [
      {
        id: 'super-admin-audit',
        name: 'Audit Lark Super Admin User Directory',
        action: 'lark_admin --query-ou --department="Operations, Finance"',
        output: 'Found 14 user accounts migrated from legacy Google accounts.\nIssue: Users assigned to Default Root OU rather than "Finance Department" role group.\nMissing attribute: "Approver_Tier_1" permission scope.'
      },
      {
        id: 'inspect-workflow',
        name: 'Inspect Lark Base Approval Automation Rule',
        action: 'cat /workflows/payment_voucher_v2.json',
        output: 'Trigger: New Voucher Submission -> Approver Lookup by Email.\nError: Rule expecting legacy "@company.com" alias, but Lark user ID is formatted as "ou_finance_manager_id".'
      },
      {
        id: 'sso-status',
        name: 'Check SAML / 2FA Security Enforcement',
        action: 'security_audit --auth=SAML --mfa=ENFORCED',
        output: 'MFA active for all 14 accounts. No credential compromise. Access token rejection is strictly due to OU schema mismatch.'
      }
    ],
    solutions: [
      {
        id: 'sol-paper-memo',
        description: 'Print paper authorization slips and pause the Lark migration',
        isCorrect: false,
        explanation: 'Reverting to paper workflows creates auditing backlogs and breaks migration milestones.'
      },
      {
        id: 'sol-fix-ou-schema',
        description: 'Re-assign users to Finance OU in Lark Super Admin, map Lark User IDs in Base workflow, and test approval loop',
        isCorrect: true,
        explanation: 'Success! Workflow automation successfully mapped the department managers. Pending approval queue cleared in 12 minutes with automated Lark bot notifications.'
      },
      {
        id: 'sol-reset-passwords',
        description: 'Reset passwords for all 14 department heads',
        isCorrect: false,
        explanation: 'Password resets do not fix directory Organization Unit (OU) schema misalignments in the approval workflow engine.'
      }
    ],
    operationalTakeaway: 'SaaS platform cutovers succeed when identity schemas and automated workflow triggers are thoroughly validated across real organizational hierarchies.'
  }
];

export const IncidentSimulator: React.FC = () => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number>(0);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string>('Select a diagnostic tool to run on-site investigation.');
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [attemptedWrong, setAttemptedWrong] = useState<string | null>(null);

  const scenario = INCIDENT_SCENARIOS[activeScenarioIndex];

  const handleSelectScenario = (index: number) => {
    audioFx.playAlert();
    setActiveScenarioIndex(index);
    setActiveToolId(null);
    setSelectedSolutionId(null);
    setIsResolved(false);
    setAttemptedWrong(null);
    setConsoleOutput('Select a diagnostic tool to run on-site investigation.');
  };

  const handleRunTool = (tool: DiagnosticTool) => {
    audioFx.playCommand();
    setActiveToolId(tool.id);
    setConsoleOutput(`$ ${tool.action}\n\n${tool.output}`);
  };

  const handleSelectSolution = (solId: string) => {
    setSelectedSolutionId(solId);
    const chosen = scenario.solutions.find(s => s.id === solId);
    if (!chosen) return;

    if (chosen.isCorrect) {
      audioFx.playSuccess();
      setIsResolved(true);
      setAttemptedWrong(null);
      setConsoleOutput(`>>> RESOLUTION VERIFIED BY SYSTEM <<<\n\n${chosen.explanation}`);
    } else {
      audioFx.playClick(300);
      setIsResolved(false);
      setAttemptedWrong(chosen.explanation);
      setConsoleOutput(`>>> DIAGNOSTIC FAILURE <<<\n\n${chosen.explanation}`);
    }
  };

  const handleReset = () => {
    audioFx.playClick(400);
    setActiveToolId(null);
    setSelectedSolutionId(null);
    setIsResolved(false);
    setAttemptedWrong(null);
    setConsoleOutput('Select a diagnostic tool to run on-site investigation.');
  };

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden bg-[#060913] border-y border-slate-800/80">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[400px] bg-sky-950/20 blur-[140px] pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <span>Interactive Simulator</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Real-World Incident Resolution</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug mb-3">
            Step into the diagnostic bay.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Test how real incidents are triaged in production. Select an actual ticket from my career, execute Layer 1–4 diagnostics, and deploy the verified technical fix.
          </p>
        </div>

        {/* Interactive Scenario Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-900/80 border border-slate-800 rounded-lg max-w-4xl">
          {INCIDENT_SCENARIOS.map((scen, idx) => {
            const isActive = activeScenarioIndex === idx;
            return (
              <button
                key={scen.id}
                type="button"
                onClick={() => handleSelectScenario(idx)}
                className={`flex-1 min-w-[200px] text-left px-3.5 py-2.5 rounded-md transition-all text-xs font-mono ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{scen.ticketId}</span>
                  <span className="text-[10px] text-slate-400">{scen.category}</span>
                </div>
                <div className="font-sans text-[11px] text-slate-300 truncate font-medium">
                  {scen.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Incident Ticket & Diagnostic Tools */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Active Ticket Brief Card */}
            <TiltCard interactive={false} className="p-5 bg-[#090E1C] border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="text-white font-bold">{scenario.ticketId}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">{scenario.organization}</span>
                </div>
                <span className="text-red-400 font-semibold tracking-wider text-[11px] px-2 py-0.5 rounded bg-red-950/60 border border-red-900/60">
                  {scenario.urgency} PRIORITY
                </span>
              </div>

              <h3 className="text-base font-semibold text-white mb-2 font-sans">
                {scenario.title}
              </h3>

              <div className="p-3 bg-slate-950/70 border border-slate-800/60 rounded text-xs text-slate-300 leading-relaxed font-sans mb-4">
                <strong className="text-amber-300 block mb-1 font-mono text-[11px]">REPORTED SYMPTOM:</strong>
                {scenario.initialState}
              </div>

              {/* Diagnostic Tools Panel */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  Available Diagnostic Probes (Click to Run):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {scenario.diagnosticTools.map((tool) => {
                    const isToolActive = activeToolId === tool.id;
                    return (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => handleRunTool(tool)}
                        className={`px-3 py-2.5 rounded text-left border transition-all text-xs font-mono flex flex-col justify-between ${
                          isToolActive
                            ? 'bg-sky-500/20 border-sky-400 text-sky-200 shadow-sm shadow-sky-500/10 ring-1 ring-sky-400/40'
                            : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <span className="font-semibold text-[11px] mb-1 flex items-center justify-between">
                          {tool.name}
                          <Play className="w-2.5 h-2.5 text-sky-400 opacity-80" />
                        </span>
                        <span className="text-[9px] text-slate-400 truncate font-mono">
                          {tool.action}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </TiltCard>

            {/* Resolution Action Card */}
            <TiltCard interactive={false} className="p-5 bg-[#090E1C] border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-sky-400 font-semibold tracking-wider">
                  SELECT RESOLUTION ACTION:
                </span>
                {isResolved && (
                  <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>VERIFIED RESOLVED</span>
                  </span>
                )}
              </div>

              <div className="space-y-2.5">
                {scenario.solutions.map((sol) => {
                  const isSelected = selectedSolutionId === sol.id;
                  return (
                    <button
                      key={sol.id}
                      type="button"
                      onClick={() => handleSelectSolution(sol.id)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${
                        isSelected && sol.isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-100 shadow-md shadow-emerald-950/50 ring-1 ring-emerald-500/50'
                          : isSelected && !sol.isCorrect
                          ? 'bg-red-950/40 border-red-500/80 text-red-200'
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isSelected && sol.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : isSelected && !sol.isCorrect ? (
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                        ) : (
                          <Wrench className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium block leading-snug">{sol.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {attemptedWrong && (
                <div className="mt-3 p-2.5 bg-red-950/40 border border-red-900/60 rounded text-[11px] text-red-300">
                  {attemptedWrong}
                </div>
              )}
            </TiltCard>

          </div>

          {/* Right Column: Live Diagnostic Console & Verified Takeaway */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Terminal Output Screen */}
            <div className="bg-[#050811] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
              <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-semibold text-slate-200">DIAGNOSTIC TELEMETRY CONSOLE</span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="hover:text-slate-200 flex items-center gap-1 text-[10px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Test</span>
                </button>
              </div>

              <div className="p-4 sm:p-5 text-slate-200 min-h-[220px] max-h-[280px] overflow-y-auto whitespace-pre-wrap leading-relaxed text-[11px] cyber-scanlines">
                {consoleOutput}
              </div>

              <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between">
                <span>SYSTEM STATUS: {isResolved ? 'ALL TESTS PASSED' : 'INVESTIGATION ACTIVE'}</span>
                <span className={isResolved ? 'text-emerald-400 font-bold' : 'text-sky-400'}>
                  {isResolved ? 'STABLE' : 'PENDING ACTION'}
                </span>
              </div>
            </div>

            {/* Operational Takeaway Card */}
            <TiltCard interactive={false} className="p-5 bg-slate-900/60 border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
                <Shield className="w-4 h-4" />
                <span className="font-semibold uppercase tracking-wider">Aries's Production Standard:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-3">
                "{scenario.operationalTakeaway}"
              </p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Domain: {scenario.category}</span>
                <span className="text-emerald-400 font-semibold">Verified SOP</span>
              </div>
            </TiltCard>

          </div>

        </div>

      </div>
    </section>
  );
};
