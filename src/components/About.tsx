import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Layers, Network, Server, Database, Code, CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <span>About</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Professional Journey</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug mb-5">
            Technology is only useful when it works for people.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            I approach IT not as isolated tickets to close, but as the operational backbone that keeps staff productive, cash registers moving, and retail outlets running smoothly.
          </p>
        </div>

        {/* 2-Column Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              My path in technology started with a <strong className="text-white font-medium">Diploma in Computer Science and Mathematics</strong> from Universiti Teknologi MARA (UiTM). This academic grounding trained me to analyze systems logically: understanding how algorithms branch, how relational schemas store state, and how mathematical rigor applies to troubleshooting.
            </p>

            <p>
              During my internship at the <strong className="text-white font-medium">Attorney General's Chambers of Malaysia</strong>, I wrote code in Laravel and queried MySQL databases for the DKICT Declaration System. Experiencing software development firsthand fundamentally shaped how I troubleshoot application incidents today. When a retail system fails, I don't just guess at the user interface—I understand data flows, relational constraints, HTTP status responses, and synchronization queues.
            </p>

            <p>
              Before specializing in applications, I built practical grit on the ground as an <strong className="text-white font-medium">IT Technician</strong> in managed print environments and as an <strong className="text-white font-medium">IT Executive at Palaterium</strong>. I terminated physical RJ45 cables, configured static IPs, debugged printer firmware, administered Lark as Super Admin, and supported a major enterprise migration from Google Workspace.
            </p>

            <p>
              Today at <strong className="text-white font-medium">emart24 Malaysia</strong>, I support Xilnex POS and retail business applications across nationwide outlets. Whether coordinating with payment partners on decline codes, validating promotions with merchandising teams, or commissioning IT hardware for store openings, my focus remains constant: <span className="text-sky-300 font-medium">disciplined problem resolution, clear vendor communication, and zero disruption to daily trade</span>.
            </p>
          </div>

          {/* Right Column: 3 Pillars of Experience */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800/80 transition-all hover:border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Application & POS Specialization</h3>
                  <span className="text-xs text-slate-400">emart24 Malaysia · Present</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Frontline and Tier 2 application support for Xilnex POS, payment terminals, promotional engine validation, new-store IT deployments, and vendor technical escalations.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800/80 transition-all hover:border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">SaaS Administration & Operations</h3>
                  <span className="text-xs text-slate-400">Palaterium Sdn Bhd · 2024–2025</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lark Super Admin governance, user lifecycle management, Google Workspace-to-Lark migration support, workflow automation, and NetSuite data auditing with Excel.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800/80 transition-all hover:border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Software & Hardware Foundation</h3>
                  <span className="text-xs text-slate-400">AGC Malaysia & Managed Print · 2021–2024</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Laravel & MySQL development, requirements engineering (SRS/ERD), combined with hands-on client hardware repair, print servers, and physical RJ45 network cabling.
              </p>
            </div>

          </div>
        </div>

        {/* Operating Philosophy Quote Box */}
        <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800 text-center max-w-4xl mx-auto">
          <p className="text-sm sm:text-base italic text-slate-300 mb-3">
            "A support engineer with a developer's foundation doesn't just reboot machines—they understand data flows, identify reproducible fault patterns, and give vendors the precise technical context they need to fix root causes."
          </p>
          <span className="text-xs font-mono text-sky-400 font-medium">
            — Aries Irhan · System Application Specialist
          </span>
        </div>

      </div>
    </section>
  );
};
