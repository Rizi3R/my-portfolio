import React, { useState } from 'react';
import { EXPERIENCES, Experience, ExplorationRoute } from '../data/portfolioData';
import { MapPin, Calendar, Check, ArrowUpRight, Sparkles, Terminal, Activity } from 'lucide-react';
import { audioFx } from '../utils/audioFx';
import { TiltCard } from './TiltCard';
import { ScrambleText } from './ScrambleText';

interface ExperienceProps {
  activeRoute: ExplorationRoute;
}

export const ExperienceSection: React.FC<ExperienceProps> = ({ activeRoute }) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('emart24');

  const selectedExp = EXPERIENCES.find((e) => e.id === selectedRoleId) || EXPERIENCES[0];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    audioFx.playClick(500);
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 76;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="experience" className="py-20 lg:py-28 bg-[#070A11]/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Chapter Label */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <span>Chapter 02</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>The Journey</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            <ScrambleText text="Interactive Career Progression" />
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            A continuous progression from hands-on hardware and network troubleshooting to enterprise SaaS administration, software development, and multi-site application operations.
          </p>
        </div>

        {/* Interactive Stepper Tabs (Desktop & Tablet) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
          {EXPERIENCES.map((exp, index) => {
            const isSelected = selectedRoleId === exp.id;
            const isRouteMatched = activeRoute !== 'all' && exp.relevantRoutes.includes(activeRoute);

            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => {
                  audioFx.playClick(600);
                  setSelectedRoleId(exp.id);
                }}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isSelected
                    ? 'bg-slate-900 border-sky-400 shadow-lg shadow-sky-950/40 ring-1 ring-sky-400/50'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30'
                }`}
                aria-pressed={isSelected}
              >
                {/* Route match badge */}
                {isRouteMatched && (
                  <span className="absolute -top-2 right-2 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-sky-500 text-slate-950 shadow-sm flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Relevant to Route</span>
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>STAGE 0{index + 1}</span>
                    <span className="text-slate-500">{exp.period.split('–')[0].trim()}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1">
                    {exp.role}
                  </h3>
                  <span className="text-xs text-sky-400 font-medium line-clamp-1">
                    {exp.company}
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{exp.technologies.length} core tools</span>
                  <span className={isSelected ? 'text-sky-300 font-bold' : 'text-slate-600'}>
                    {isSelected ? '● ACTIVE' : 'Select'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Role Interactive Detailed Dossier */}
        <TiltCard interactive={false} className="p-6 sm:p-8 bg-slate-900/90 border-slate-800 shadow-2xl">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  <ScrambleText text={selectedExp.role} />
                </h3>
                {selectedExp.isCurrent && (
                  <span className="text-[11px] font-mono font-semibold text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded border border-emerald-800/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Current Position</span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                <span className="font-semibold text-slate-200 text-sm">{selectedExp.company}</span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{selectedExp.location}</span>
                </span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span className="flex items-center gap-1 font-mono text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{selectedExp.period}</span>
                </span>
              </div>
            </div>

            {/* Quick jump to case studies */}
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, '#projects')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-400 hover:text-white bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 rounded-md transition-colors self-start md:self-auto shrink-0"
            >
              <span>Explore Related Mission</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Overview Statement */}
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed my-5">
            {selectedExp.overview}
          </p>

          {/* 2-Column Responsibilities & Contributions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-800/80">
            
            {/* Responsibilities */}
            <div className="lg:col-span-7 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span>Operational Scope & Core Duties</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {selectedExp.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0 shadow-xs shadow-sky-400/50" />
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contributions & Systems */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Verified Operational Contributions
                </h4>
                <div className="space-y-2.5">
                  {selectedExp.keyContributions.map((contrib, i) => (
                    <div 
                      key={i}
                      className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
                    >
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{contrib}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Systems & Applied Tools
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedExp.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </TiltCard>

      </div>
    </section>
  );
};
