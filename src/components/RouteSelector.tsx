import React from 'react';
import { EXPLORATION_ROUTES, ExplorationRoute } from '../data/portfolioData';
import { Compass, Check, Sparkles, Filter, X } from 'lucide-react';

interface RouteSelectorProps {
  activeRoute: ExplorationRoute;
  onRouteChange: (route: ExplorationRoute) => void;
}

export const RouteSelector: React.FC<RouteSelectorProps> = ({ activeRoute, onRouteChange }) => {
  const currentRouteDef = EXPLORATION_ROUTES.find((r) => r.id === activeRoute) || EXPLORATION_ROUTES[0];

  return (
    <div className="sticky top-18 z-30 bg-[#070A11]/95 backdrop-blur-md border-b border-slate-800/80 py-2.5 px-4 sm:px-6 lg:px-8 transition-all no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Indicator & Description */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded bg-sky-500/10 border border-sky-500/25 flex items-center justify-center shrink-0">
            <Compass className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Choose Your Route:
              </span>
              <span className="text-xs font-semibold text-white truncate">
                {currentRouteDef.targetRole}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden lg:block truncate max-w-xl">
              {currentRouteDef.description}
            </p>
          </div>
        </div>

        {/* Right: Route Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none shrink-0 max-w-full">
          {EXPLORATION_ROUTES.map((route) => {
            const isActive = activeRoute === route.id;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => onRouteChange(route.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                  isActive
                    ? 'bg-sky-400 text-slate-950 font-semibold shadow-sm shadow-sky-400/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
                aria-pressed={isActive}
              >
                {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                <span>{route.shortLabel}</span>
              </button>
            );
          })}

          {activeRoute !== 'all' && (
            <button
              type="button"
              onClick={() => onRouteChange('all')}
              title="Reset to view everything"
              className="p-1 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800/60 transition-colors ml-1"
              aria-label="Reset route filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
