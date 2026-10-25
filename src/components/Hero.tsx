import React, { useState } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Activity, 
  AlertCircle, 
  Search, 
  GitPullRequest, 
  CheckCircle2, 
  BookOpen, 
  RefreshCw,
  Terminal,
  ShieldCheck,
  Server
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

interface WorkflowStep {
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  diagnosticDetail: string;
  technicalTag: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [activeStepId, setActiveStepId] = useState<string>('step-triage');

  const workflowSteps: WorkflowStep[] = [
    {
      id: 'step-report',
      number: '01',
      title: 'Store / User Report',
      icon: <AlertCircle className="w-4 h-4 text-amber-400" />,
      summary: 'Incident intake via helpdesk or direct outlet escalation',
      diagnosticDetail: 'Receiving symptom report (e.g. checkout freeze, payment decline, promo not recognized, Wi-Fi outage).',
      technicalTag: 'Helpdesk & Ticket Intake'
    },
    {
      id: 'step-triage',
      number: '02',
      title: 'Structured Diagnosis',
      icon: <Search className="w-4 h-4 text-sky-400" />,
      summary: 'Isolating root layer (App, LAN, Hardware, or Bank API)',
      diagnosticDetail: 'Differentiating local device faults from host response codes (e.g. cardholder "Do Not Honour" vs POS sync failure vs gateway timeout).',
      technicalTag: 'Xilnex POS & Network Triage'
    },
    {
      id: 'step-escalate',
      number: '03',
      title: 'Vendor & Team Coordination',
      icon: <GitPullRequest className="w-4 h-4 text-indigo-400" />,
      summary: 'Engaging software vendors with precise log parameters',
      diagnosticDetail: 'Packaging timestamped logs, terminal IDs, and reproducible steps to avoid vendor back-and-forth.',
      technicalTag: 'Vendor Management & APIs'
    },
    {
      id: 'step-validate',
      number: '04',
      title: 'UAT & Verification',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      summary: 'Pre-production validation & simulated retail test',
      diagnosticDetail: 'Conducting test transactions, settlement verification, and checking register totals before closing incident.',
      technicalTag: 'User Acceptance Testing'
    },
    {
      id: 'step-docs',
      number: '05',
      title: 'Resolution & Runbook',
      icon: <BookOpen className="w-4 h-4 text-violet-400" />,
      summary: 'Documenting findings & refining support playbook',
      diagnosticDetail: 'Recording root cause and updating outlet troubleshooting guides to prevent repeat downtime.',
      technicalTag: 'SOPs & Knowledge Base'
    }
  ];

  const currentStep = workflowSteps.find((s) => s.id === activeStepId) || workflowSteps[1];

  return (
    <section id="top" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background radial gradient accent */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-600/10 blur-[130px] pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow: Zero-pill discipline (plain text with typographic separators) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-sky-400 uppercase mb-4">
              <span>IT Support</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Application Systems</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>IT Operations</span>
            </div>

            {/* Main Headline */}
            <h1 
              style={{ textWrap: 'balance' } as React.CSSProperties}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.12] mb-6"
            >
              {PERSONAL_INFO.tagline}
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-4 max-w-2xl">
              I'm <strong className="font-semibold text-white">{PERSONAL_INFO.displayName}</strong>, a System Application Specialist at emart24 Malaysia focused on retail business applications, POS reliability, multi-site infrastructure, and disciplined IT operations.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-2xl">
              From supporting Xilnex POS systems across retail outlets to commissioning new store IT infrastructure and managing SaaS platforms, I solve practical operational problems where technology meets daily business productivity.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-md transition-all duration-150 shadow-md shadow-sky-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <span>Explore Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-4.5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>View Technical Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md"
              >
                Get In Touch
              </a>
            </div>

            {/* Honest verification markers below CTAs */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-medium">AWS Certified Cloud Practitioner</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>CS & Mathematics Diploma (UiTM)</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Based in Malaysia</span>
              </div>
            </div>
          </div>

          {/* Right Column: Original Interactive Technical Visual */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xl relative">
              {/* Header bar of visual model */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Incident & Support Lifecycle Model
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Interactive Demo
                </span>
              </div>

              {/* Step Selector Ribbon */}
              <div className="grid grid-cols-5 gap-1.5 mb-4 p-1 bg-slate-900/90 rounded-lg border border-slate-800">
                {workflowSteps.map((step) => {
                  const isActive = step.id === activeStepId;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveStepId(step.id)}
                      className={`flex flex-col items-center py-2 px-1 rounded-md transition-all text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                        isActive
                          ? 'bg-sky-500/15 border border-sky-500/40 text-sky-300 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                      aria-label={`Workflow stage ${step.number}: ${step.title}`}
                    >
                      <span className="font-mono text-[10px] opacity-75">{step.number}</span>
                      <div className="mt-1">{step.icon}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Detailed Inspection */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-4 transition-all min-h-[170px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-medium text-sky-400">
                      Phase {currentStep.number} · {currentStep.technicalTag}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Verified Playbook
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-1.5">
                    {currentStep.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentStep.diagnosticDetail}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-slate-400 italic">"{currentStep.summary}"</span>
                  <span className="text-sky-400/80 font-mono text-[10px]">Step {currentStep.number} of 05</span>
                </div>
              </div>

              {/* Technical Operational Capabilities Matrix */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-slate-900/40 rounded-md border border-slate-800/60 flex items-start gap-2.5">
                  <Server className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-200 font-medium block">Retail POS & Peripherals</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Xilnex POS, terminals & scanner sync</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-900/40 rounded-md border border-slate-800/60 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-200 font-medium block">SaaS & Access Security</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Lark Super Admin & M365 setup</span>
                  </div>
                </div>
              </div>

              {/* Caption clarifying illustration status */}
              <p className="text-[10px] text-slate-400 mt-3 text-center">
                Conceptual model illustrating structured problem isolation across enterprise retail & IT systems.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
