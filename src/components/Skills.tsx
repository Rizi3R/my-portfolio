import React, { useState, useMemo } from 'react';
import { SKILL_CATEGORIES, SkillCategory, ExplorationRoute } from '../data/portfolioData';
import { Server, Shield, Network, Database, Cloud, Search, Check, Sparkles } from 'lucide-react';
import { audioFx } from '../utils/audioFx';
import { TiltCard } from './TiltCard';

interface SkillsProps {
  activeRoute: ExplorationRoute;
}

export const SkillsSection: React.FC<SkillsProps> = ({ activeRoute }) => {
  const [selectedCatId, setSelectedCatId] = useState<string>('skills-app-support');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    'skills-app-support': <Server className="w-5 h-5 text-sky-400" />,
    'skills-it-ops': <Shield className="w-5 h-5 text-indigo-400" />,
    'skills-infra': <Network className="w-5 h-5 text-teal-400" />,
    'skills-business-systems': <Database className="w-5 h-5 text-amber-400" />,
    'skills-development-cloud': <Cloud className="w-5 h-5 text-cyan-400" />
  };

  const selectedCategory = SKILL_CATEGORIES.find((c) => c.id === selectedCatId) || SKILL_CATEGORIES[0];

  // Filter skills by search query if entered
  const displayedSkills = useMemo(() => {
    if (!searchQuery.trim()) {
      return selectedCategory.skills;
    }
    const q = searchQuery.toLowerCase();
    return selectedCategory.skills.filter(
      (s) => s.name.toLowerCase().includes(q) || (s.practicalExample && s.practicalExample.toLowerCase().includes(q))
    );
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-20 lg:py-28 bg-[#070A11]/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Chapter Label */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <span>SPACE 05</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>THE TOOLKIT & DAILY DRIVERS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
            Technical Capabilities & Tools
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Select an operational domain below to inspect practical production examples, verified toolings, and honest proficiency levels—clearly distinguishing daily production drivers from active foundational studies.
          </p>
        </div>

        {/* 5 Category Selector Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 mb-8">
          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = selectedCatId === cat.id;
            const isRouteMatched = activeRoute !== 'all' && cat.relevantRoutes.includes(activeRoute);

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  audioFx.playClick(600);
                  setSelectedCatId(cat.id);
                  setSearchQuery('');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isSelected
                    ? 'bg-slate-900 border-sky-400 shadow-lg shadow-sky-950/40 ring-1 ring-sky-400/50'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30'
                }`}
                aria-pressed={isSelected}
              >
                {/* Route badge */}
                {isRouteMatched && (
                  <span className="absolute -top-2 right-2 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-sky-500 text-slate-950 flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Route Focus</span>
                  </span>
                )}

                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0">
                    {categoryIcons[cat.id]}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    {cat.skills.length} skills
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
                  {cat.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Selected Category Dossier */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 shadow-2xl">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-7 h-7 rounded bg-sky-500/10 border border-sky-500/25 flex items-center justify-center">
                  {categoryIcons[selectedCategory.id]}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {selectedCategory.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {selectedCategory.description}
              </p>
            </div>

            {/* Quick Live Search Filter Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter tools / examples..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-400 font-mono"
              />
            </div>
          </div>

          {/* Practical Context Banner */}
          <div className="my-4 p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 font-mono flex items-center justify-between">
            <div>
              <span className="text-sky-400 font-semibold mr-2">PRACTICAL CONTEXT:</span>
              <span className="text-slate-300 font-sans">{selectedCategory.practicalContext}</span>
            </div>
            <span className="text-slate-500 text-[11px] hidden sm:inline">
              Showing {displayedSkills.length} of {selectedCategory.skills.length}
            </span>
          </div>

          {/* Interactive Skills Grid with Practical Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {displayedSkills.map((skill) => (
              <TiltCard
                key={skill.name}
                className="p-4 bg-slate-950/60 border-slate-800/80 hover:border-slate-700/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-sm font-semibold text-white leading-snug">
                      {skill.name}
                    </h4>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 whitespace-nowrap font-medium ${
                        skill.level === 'Professional Experience'
                          ? 'text-sky-300 bg-sky-950/70 border border-sky-700/50'
                          : skill.level === 'Working Knowledge'
                          ? 'text-indigo-300 bg-indigo-950/70 border border-indigo-700/50'
                          : skill.level === 'Foundational Knowledge'
                          ? 'text-emerald-300 bg-emerald-950/70 border border-emerald-700/50'
                          : 'text-amber-300 bg-amber-950/70 border border-amber-700/50'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  {skill.practicalExample && (
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed flex items-start gap-2">
                      <span className="text-slate-500 font-mono shrink-0">e.g.</span>
                      <span>{skill.practicalExample}</span>
                    </p>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Experience Tiers Legend */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-500/20 border border-sky-500/60 inline-block" />
                <span><strong className="text-slate-300">Professional Experience:</strong> Daily production use</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500/20 border border-indigo-500/60 inline-block" />
                <span><strong className="text-slate-300">Working Knowledge:</strong> Hands-on implementation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/20 border border-emerald-500/60 inline-block" />
                <span><strong className="text-slate-300">Foundational Knowledge:</strong> Formal academic / certified</span>
              </div>
            </div>

            <span className="font-mono text-[11px] text-slate-500">100% Truthful Competency Mapping</span>
          </div>

        </div>

      </div>
    </section>
  );
};
