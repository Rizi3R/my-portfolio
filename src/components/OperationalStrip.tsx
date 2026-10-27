import React from 'react';
import { CORE_PILLARS } from '../data/portfolioData';
import { TiltCard } from './TiltCard';

export const OperationalStrip: React.FC = () => {
  return (
    <section aria-label="Core Professional Themes" className="border-y border-slate-800/80 bg-slate-950/70 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CORE_PILLARS.map((item, idx) => (
            <TiltCard key={item.title} className="p-4 sm:p-5 flex flex-col justify-between bg-slate-900/60 border-slate-800/80">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-sky-400 mb-1.5">
                  <span className="uppercase tracking-wider">{item.theme}</span>
                  <span className="text-slate-500 text-[10px]">0{idx + 1}</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2">
                  {item.title}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
