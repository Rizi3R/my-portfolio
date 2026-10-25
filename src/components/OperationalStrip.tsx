import React from 'react';
import { OPERATIONAL_METRICS } from '../data/portfolioData';

export const OperationalStrip: React.FC = () => {
  return (
    <section aria-label="Operational Pillars" className="border-y border-slate-800/80 bg-slate-950/60 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {OPERATIONAL_METRICS.map((item, index) => (
            <div key={item.label} className="flex flex-col">
              <span className="text-xs font-mono text-sky-400/90 tracking-wide uppercase mb-1">
                0{index + 1} · {item.label}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1.5">
                {item.value}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
