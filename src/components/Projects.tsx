import React, { useState, useEffect } from 'react';
import { CASE_STUDIES, CaseStudy, ExplorationRoute } from '../data/portfolioData';
import { 
  ArrowUpRight, 
  X, 
  Check, 
  Building2, 
  Calendar, 
  User, 
  ShieldAlert, 
  Lightbulb, 
  Search, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ProjectsProps {
  activeRoute: ExplorationRoute;
}

export const ProjectsSection: React.FC<ProjectsProps> = ({ activeRoute }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalCase, setActiveModalCase] = useState<CaseStudy | null>(null);

  const categories = [
    'All',
    'Application Support',
    'IT Operations',
    'SaaS & Systems',
    'Infrastructure',
    'Development & Data'
  ];

  const filteredCases = CASE_STUDIES.filter((c) => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalCase(null);
      }
    };
    if (activeModalCase) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeModalCase]);

  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Chapter Label */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
              <span>Chapter 03</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>The Problem Solver</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
              Technical Case Studies
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Real operational investigations, site commissioning workflows, SaaS migrations, and development projects—documented with structured methodology, verifiable facts, and transferable lessons.
            </p>
          </div>

          {/* Interactive Category Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                    active
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseStudy) => {
            const isRouteMatched = activeRoute !== 'all' && caseStudy.relevantRoutes.includes(activeRoute);

            return (
              <article
                key={caseStudy.id}
                className={`rounded-xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-2xl hover:shadow-black/40 group relative ${
                  isRouteMatched
                    ? 'bg-slate-900/90 border-sky-400/80 shadow-md shadow-sky-950/30 ring-1 ring-sky-400/40'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Route highlight badge */}
                {isRouteMatched && (
                  <div className="absolute -top-2.5 right-4 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-sky-400 text-slate-950 flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Relevant to Selected Route</span>
                  </div>
                )}

                <div>
                  {/* Mission Number & Category */}
                  <div className="flex items-center justify-between text-xs font-mono text-sky-400 mb-2.5">
                    <span className="font-bold tracking-wider">{caseStudy.missionNumber}</span>
                    <span className="text-slate-400 font-sans">{caseStudy.category}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-2 leading-snug">
                    {caseStudy.title}
                  </h3>

                  <p className="text-xs text-sky-300/90 italic mb-4 leading-relaxed">
                    "{caseStudy.hook}"
                  </p>

                  {/* Challenge Snapshot */}
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/70 mb-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 mb-1">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      <span>The Challenge</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {caseStudy.challenge}
                    </p>
                  </div>

                  {/* Investigation Snapshot */}
                  <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/50 mb-5">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-sky-400 mb-1">
                      <Search className="w-3.5 h-3.5 shrink-0" />
                      <span>Investigation Flow</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {caseStudy.investigation}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-slate-800/60">
                    {caseStudy.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/60"
                      >
                        {t}
                      </span>
                    ))}
                    {caseStudy.technologies.length > 3 && (
                      <span className="text-[11px] font-mono text-slate-400 px-1 py-0.5">
                        +{caseStudy.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Open Modal CTA */}
                  <button
                    type="button"
                    onClick={() => setActiveModalCase(caseStudy)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <span>Inspect Full Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {activeModalCase && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setActiveModalCase(null)}
        >
          <div
            className="bg-[#0B1120] border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveModalCase(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pr-10 mb-6 border-b border-slate-800 pb-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-2">
                <span>{activeModalCase.missionNumber}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{activeModalCase.category}</span>
              </div>
              <h2 id="case-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                {activeModalCase.title}
              </h2>
              <p className="text-xs sm:text-sm text-sky-300 italic mb-4">
                "{activeModalCase.hook}"
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-200 font-medium">{activeModalCase.role}</span>
                </div>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activeModalCase.organization}</span>
                </div>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <div className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activeModalCase.period}</span>
                </div>
              </div>
            </div>

            {/* Modal Body: Structured Technical Sections */}
            <div className="space-y-6 text-sm text-slate-300">
              
              {/* 1. THE CHALLENGE */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>The Challenge</span>
                </h3>
                <p className="leading-relaxed text-slate-200 bg-amber-950/20 p-4 rounded-lg border border-amber-900/40">
                  {activeModalCase.challenge}
                </p>
              </div>

              {/* 2. THE INVESTIGATION */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2 mb-2">
                  <Search className="w-4 h-4" />
                  <span>The Investigation</span>
                </h3>
                <p className="leading-relaxed text-slate-200 bg-sky-950/20 p-4 rounded-lg border border-sky-900/40">
                  {activeModalCase.investigation}
                </p>
              </div>

              {/* 3. THE APPROACH */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  The Technical Actions & Approach
                </h3>
                <ul className="space-y-2.5">
                  {activeModalCase.approach.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="font-mono text-xs text-sky-400 font-semibold mt-0.5 shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. THE OUTCOME */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The Verified Outcome</span>
                </h3>
                <div className="space-y-2">
                  {activeModalCase.outcome.map((out, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. WHAT I LEARNED */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-slate-900 to-sky-950/40 border border-sky-800/40 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-1">
                    What I Learned (Transferable Lesson)
                  </h4>
                  <p className="text-xs text-slate-200 italic leading-relaxed">
                    "{activeModalCase.whatILearned}"
                  </p>
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-400 mr-2">Technologies Involved:</span>
                {activeModalCase.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModalCase(null)}
                className="px-5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
