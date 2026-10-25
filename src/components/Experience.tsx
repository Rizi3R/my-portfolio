import React, { useState } from 'react';
import { EXPERIENCES, Experience } from '../data/portfolioData';
import { MapPin, Calendar, ChevronDown, ChevronUp, Check, Briefcase } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  // Current role expanded by default; others can be toggled
  const [expandedId, setExpandedId] = useState<string | null>('emart24');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="py-20 lg:py-28 bg-[#070A11]/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <span>Career Progression</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Verified Timeline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            Professional Experience
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            A progression spanning retail POS application support, enterprise SaaS governance, managed infrastructure maintenance, and full-stack software development.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp: Experience, index: number) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div
                key={exp.id}
                className={`rounded-xl border transition-all duration-200 ${
                  exp.isCurrent
                    ? 'bg-slate-900/80 border-sky-500/40 shadow-lg shadow-sky-950/20'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700/80'
                }`}
              >
                {/* Header Row */}
                <div 
                  className="p-5 sm:p-6 cursor-pointer select-none"
                  onClick={() => toggleExpand(exp.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span className="text-[11px] font-mono font-medium text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                            Current Role
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span className="font-semibold text-slate-200">{exp.company}</span>
                        <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp.location}</span>
                        </span>
                        <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
                        <span className="flex items-center gap-1 font-mono text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp.period}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-white px-2.5 py-1.5 rounded bg-slate-800/50 hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(exp.id);
                        }}
                      >
                        <span>{isExpanded ? 'Less detail' : 'View responsibilities'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Summary Overview */}
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                    {exp.overview}
                  </p>

                  {/* Technologies row */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-slate-800/60">
                    <span className="text-[11px] font-mono text-slate-400 mr-1">Stack:</span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-slate-300 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/60 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable Details */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-5 bg-slate-950/40 rounded-b-xl">
                    {/* Responsibilities */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        Key Responsibilities & Operational Scope
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Confirmed Real Highlights */}
                    <div className="pt-3 border-t border-slate-800/60">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        Operational Contributions & Impact
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {exp.keyContributions.map((contrib, i) => (
                          <div 
                            key={i}
                            className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2"
                          >
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{contrib}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
