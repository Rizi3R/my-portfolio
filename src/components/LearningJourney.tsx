import React from 'react';
import { LEARNING_JOURNEY } from '../data/portfolioData';
import { Compass, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';

export const LearningJourneySection: React.FC = () => {
  return (
    <section id="roadmap" className="py-20 lg:py-28 bg-[#070A11]/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <span>Continuous Improvement</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Professional Growth</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            Always building beyond the ticket.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            I don't treat IT support as a closed box. I'm actively expanding my technical foundation to transition from operational support into deeper application architecture, system reliability, and cloud operations.
          </p>
        </div>

        {/* Learning Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {LEARNING_JOURNEY.map((item, index) => (
            <div
              key={item.area}
              className="p-5 sm:p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Track 0{index + 1}</span>
                  <span className="text-sky-400 font-medium">{item.status}</span>
                </div>

                <h3 className="text-base font-bold text-white mb-3 leading-snug">
                  {item.area}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.focus}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center gap-2 text-[11px] text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
                <span>Targeted Technical Advancement</span>
              </div>
            </div>
          ))}
        </div>

        {/* Alignment Callout */}
        <div className="rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="text-base sm:text-lg font-bold text-white mb-1.5">
              Targeted Career Trajectory
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Seeking opportunities across <strong className="text-white">Application Support Engineering</strong>, <strong className="text-white">IT Operations Analysis</strong>, <strong className="text-white">Systems Support</strong>, and <strong className="text-white">Regional Retail IT</strong> where I can contribute to reliable services while continuing to deepen infrastructure automation and cloud competencies.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-md transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            <span>Discuss Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
