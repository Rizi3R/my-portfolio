import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Server, Shield, Network, Database, Cloud, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    'Application & POS Support': <Server className="w-5 h-5 text-sky-400" />,
    'IT Operations & Service Desk': <Shield className="w-5 h-5 text-indigo-400" />,
    'Networking & Physical Infrastructure': <Network className="w-5 h-5 text-teal-400" />,
    'Business Applications & Data': <Database className="w-5 h-5 text-amber-400" />,
    'Development & Cloud Foundations': <Cloud className="w-5 h-5 text-cyan-400" />
  };

  const levels = ['All', 'Professional', 'Working Knowledge', 'Foundational / Certified'];

  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
              <span>Technical Capabilities</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Truthful Competency Map</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
              Skills & Systems Inventory
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Every tool and methodology listed reflects verified production experience or accredited coursework—no fabricated skills or arbitrary percentage bars.
            </p>
          </div>

          {/* Interactive filter for proficiency tiers */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
            {levels.map((lvl) => {
              const active = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                    active
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {lvl === 'All' ? 'All Competencies' : lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5-Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category) => {
            const filteredSkills = category.skills.filter((s) => {
              if (selectedLevel === 'All') return true;
              return s.level === selectedLevel;
            });

            if (filteredSkills.length === 0) return null;

            return (
              <div
                key={category.title}
                className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5 sm:p-6 flex flex-col justify-between hover:border-slate-700/80 transition-colors"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0">
                      {categoryIcons[category.title] || <CheckCircle2 className="w-5 h-5 text-sky-400" />}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills List */}
                  <ul className="space-y-2.5">
                    {filteredSkills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center justify-between gap-3 text-xs py-1 border-b border-slate-800/40 last:border-0"
                      >
                        <span className="font-medium text-slate-200 leading-snug">
                          {skill.name}
                        </span>
                        
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 whitespace-nowrap ${
                            skill.level === 'Professional'
                              ? 'text-sky-300 bg-sky-950/60 border border-sky-800/40'
                              : skill.level === 'Working Knowledge'
                              ? 'text-indigo-300 bg-indigo-950/60 border border-indigo-800/40'
                              : 'text-emerald-300 bg-emerald-950/60 border border-emerald-800/40'
                          }`}
                        >
                          {skill.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span>{filteredSkills.length} competencies</span>
                  <span className="text-slate-400">Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Level Legend */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-500/20 border border-sky-500/60 inline-block" />
            <span><strong className="text-slate-300">Professional</strong>: Applied routinely in production environments</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500/20 border border-indigo-500/60 inline-block" />
            <span><strong className="text-slate-300">Working Knowledge</strong>: Hands-on implementation & diagnostic competency</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/20 border border-emerald-500/60 inline-block" />
            <span><strong className="text-slate-300">Foundational / Certified</strong>: Formally accredited or academic grounding</span>
          </div>
        </div>

      </div>
    </section>
  );
};
