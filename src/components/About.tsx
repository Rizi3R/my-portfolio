import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Layers, Network, Server, Database, Code, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <span>Chapter 01</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>The Operator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug mb-5">
            I support, troubleshoot, and improve the technology that helps businesses operate.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Supporting business systems requires more than closing tickets. It demands understanding real user workflows, investigating issues systematically, communicating clearly with non-technical stakeholders and technical vendors, and rigorously validating every fix.
          </p>
        </div>

        {/* 2-Column Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              My path in technology is built on a <strong className="text-white font-medium">Diploma in Computer Science and Mathematics</strong> from Universiti Teknologi MARA (UiTM). This academic foundation gave me a structured, analytical way of thinking: understanding algorithmic logic, relational database schemas, and how data flows across distributed services.
            </p>

            <p>
              During my internship at the <strong className="text-white font-medium">Attorney General's Chambers of Malaysia</strong>, I developed internal modules for the DKICT Declaration System using Laravel and MySQL. Writing code, drafting System Requirements Specifications (SRS), and designing Entity Relationship Diagrams (ERDs) taught me how software is engineered from the inside out. When an application throws an error today, I don't just see a broken screen—I understand data validation rules, database constraints, API responses, and synchronization queues.
            </p>

            <p>
              I complemented this software foundation with practical, on-the-ground support grit. Starting as an <strong className="text-white font-medium">IT Technician</strong> in managed print environments, I diagnosed motherboards, resolved driver and firmware conflicts, and mastered physical Layer-1 network cabling. Later, as an <strong className="text-white font-medium">IT Executive at Palaterium</strong>, I administered the Lark enterprise platform as Super Admin, supported a company-wide migration from Google Workspace, automated approval workflows, and audited NetSuite imports using advanced Excel functions.
            </p>

            <p>
              Currently, as a <strong className="text-white font-medium">System Application Specialist at emart24 Malaysia</strong>, I support business-critical applications and POS systems across corporate HQ and nationwide outlets. From investigating payment gateway responses to coordinating with software vendors and commissioning new site IT infrastructure, my focus is always: <span className="text-sky-300 font-medium">systematic root-cause isolation, reliable vendor accountability, and zero operational disruption</span>.
            </p>
          </div>

          {/* Right Column: 4 Progression Stages */}
          <div className="lg:col-span-5 space-y-3.5">
            
            <div className="p-4.5 rounded-lg bg-slate-900/60 border border-slate-800/80 transition-all hover:border-slate-700">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">System Application Specialist</h3>
                  <span className="text-xs text-slate-400 font-mono">emart24 Malaysia · Sep 2025 – Present</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-11">
                Multi-site business application & POS support, incident investigation, payment API decline triage, UAT testing, new site IT commissioning, and vendor coordination.
              </p>
            </div>

            <div className="p-4.5 rounded-lg bg-slate-900/60 border border-slate-800/80 transition-all hover:border-slate-700">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">IT Executive</h3>
                  <span className="text-xs text-slate-400 font-mono">Palaterium Sdn Bhd · Apr 2024 – Aug 2025</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-11">
                L1/L2 Lark Helpdesk support, Lark Super Admin governance, Google Workspace migration assistance, workflow automation, NetSuite data auditing, and remote desktop support.
              </p>
            </div>

            <div className="p-4.5 rounded-lg bg-slate-900/60 border border-slate-800/80 transition-all hover:border-slate-700">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">IT Technician</h3>
                  <span className="text-xs text-slate-400 font-mono">Managed Print Services · Oct 2023 – Mar 2024</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-11">
                Hardware diagnostics, firmware updates, network printer integration, TCP/IP configurations, Freshdesk SLA management, and client-facing technical support.
              </p>
            </div>

            <div className="p-4.5 rounded-lg bg-slate-900/60 border border-slate-800/80 transition-all hover:border-slate-700">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">IT Intern – Full-Stack Developer</h3>
                  <span className="text-xs text-slate-400 font-mono">Attorney General's Chambers · Sep 2021 – Feb 2022</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-11">
                Web application development in PHP Laravel and MySQL, System Requirements Specification (SRS), ERD modeling, and stakeholder user testing.
              </p>
            </div>

          </div>
        </div>

        {/* Operating Philosophy Quote Box */}
        <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800 text-center max-w-4xl mx-auto">
          <p className="text-sm sm:text-base italic text-slate-300 mb-3">
            "A support professional with a software foundation doesn't just reboot servers. They trace execution logs, isolate reproducible edge cases, and deliver structured technical clarity to vendors and development teams."
          </p>
          <span className="text-xs font-mono text-sky-400 font-medium">
            — Aries Irhan · System Application Specialist
          </span>
        </div>

      </div>
    </section>
  );
};
