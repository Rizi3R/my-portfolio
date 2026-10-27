import React, { useState } from 'react';
import { PROJECTS_SHOWCASE, ProjectShowcaseItem, ExplorationRoute } from '../data/portfolioData';
import { ExternalLink, Layers, ArrowUpRight, Check, Code, Sparkles, Building, Calendar } from 'lucide-react';
import { audioFx } from '../utils/audioFx';
import { TiltCard } from './TiltCard';
import { ScrambleText } from './ScrambleText';

interface ProjectShowcaseProps {
  activeRoute: ExplorationRoute;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ activeRoute }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterOptions = ['All', 'Professional Experience', 'Academic Internship', 'Cloud Foundation', 'Personal Project'];

  const filteredProjects = PROJECTS_SHOWCASE.filter((p) => {
    if (selectedFilter === 'All') return true;
    return p.type === selectedFilter;
  });

  return (
    <section id="showcase" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Chapter Label */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
              <span>Chapter 05</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>The Builder</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
              <ScrambleText text="Projects & Technical Implementations" />
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Tangible systems, migration deliveries, compliance software, and infrastructure frameworks built across professional roles and technical studies.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
            {filterOptions.map((opt) => {
              const active = selectedFilter === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    audioFx.playClick(500);
                    setSelectedFilter(opt);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                    active
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isRouteMatched = activeRoute !== 'all' && project.relevantRoutes.includes(activeRoute);

            return (
              <TiltCard
                key={project.id}
                className={`p-6 flex flex-col justify-between group ${
                  isRouteMatched
                    ? 'border-sky-400/80 shadow-md shadow-sky-950/30 ring-1 ring-sky-400/40'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Route badge */}
                {isRouteMatched && (
                  <span className="absolute -top-2.5 right-4 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-sky-500 text-slate-950 flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Relevant to Route</span>
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2.5">
                    <span className="text-sky-400 font-semibold">{project.type}</span>
                    <span className="text-slate-500">{project.period}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-2 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-sky-300/90 italic mb-4 leading-relaxed">
                    "{project.tagline}"
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                      Key Highlights:
                    </span>
                    {project.keyHighlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Technologies row */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] font-mono text-slate-400 px-1 py-0.5">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {project.link ? (
                    <a
                      href={project.link.url}
                      target={project.link.isExternal ? '_blank' : '_self'}
                      rel={project.link.isExternal ? 'noopener noreferrer' : ''}
                      onClick={() => audioFx.playClick(600)}
                      className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-md transition-colors shadow-sm"
                    >
                      <span>{project.link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="text-[11px] font-mono text-slate-500 text-center py-1">
                      Organization: {project.organization}
                    </div>
                  )}
                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
