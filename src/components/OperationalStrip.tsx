import React from 'react';
import { CORE_PILLARS } from '../data/portfolioData';

export const OperationalStrip: React.FC = () => {
  return (
    <section aria-label="Core Professional Themes" className="border-y border-slate-800/80 bg-slate-950/60 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CORE_PILLARS.map((item) => (
            <div key={item.title} className="flex flex-col">
              <span className="text-xs font-mono text-sky-400/90 tracking-wide uppercase mb-1">
                {item.theme}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1.5">
                {item.title}
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
