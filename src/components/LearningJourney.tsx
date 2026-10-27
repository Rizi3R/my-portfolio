import React from 'react';
import { CAREER_INTERESTS, PERSONAL_INFO } from '../data/portfolioData';
import { Compass, ArrowRight, ShieldCheck, Server, Cloud, Network, Workflow, CheckCircle2 } from 'lucide-react';
import { audioFx } from '../utils/audioFx';
import { TiltCard } from './TiltCard';

export const LearningJourneySection: React.FC = () => {
  const interestIcons: Record<string, React.ReactNode> = {
    'Application Support & Systems': <Server className="w-5 h-5 text-sky-400" />,
    'IT Operations & Service Desk': <ShieldCheck className="w-5 h-5 text-indigo-400" />,
    'Business Systems & Integrations': <Workflow className="w-5 h-5 text-amber-400" />,
    'Cloud Support & Operations': <Cloud className="w-5 h-5 text-cyan-400" />,
    'Infrastructure & Network Support': <Network className="w-5 h-5 text-teal-400" />
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    audioFx.playClick(500);
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="roadmap" className="py-20 lg:py-28 bg-[#070A11]/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-400 uppercase mb-3">
            <span>Career Direction & Growth</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Target Roles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            Building toward what's next.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            I am actively expanding my technical foundation to take on greater responsibility across application systems, IT operations, SaaS administration, and cloud environments. These targeted directions build directly on my hands-on support experience and computer science background.
          </p>
        </div>

        {/* 5 Career Interest Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CAREER_INTERESTS.map((item, index) => (
            <TiltCard
              key={item.category}
              className="p-5 sm:p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span className="text-sky-400 font-semibold">DIRECTION 0{index + 1}</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
                    {interestIcons[item.category] || <Compass className="w-4 h-4 text-sky-400" />}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors mb-2 leading-snug">
                  {item.category}
                </h3>

                <span className="text-xs font-semibold text-slate-300 block mb-2">
                  Target: {item.title}
                </span>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Existing Foundation:
                </span>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  {item.transferableFoundation}
                </p>
              </div>
            </TiltCard>
          ))}

          {/* Core Philosophy Card as 6th Tile */}
          <TiltCard className="p-5 sm:p-6 bg-gradient-to-br from-slate-900/90 to-sky-950/40 border-sky-500/30 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-sky-400 mb-2 font-semibold">
                Unified Thread
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Operational Reliability First
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether diagnosing a desktop network issue, validating database records in MySQL, or provisioning cloud IAM policies, the objective remains constant: helping businesses operate without technical interruptions.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center gap-2 text-xs font-mono text-sky-300">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Available for Technical Roles in Malaysia</span>
            </div>
          </TiltCard>
        </div>

        {/* Alignment Callout */}
        <TiltCard interactive={false} className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900 border-slate-800">
          <div className="max-w-2xl">
            <h4 className="text-base sm:text-lg font-bold text-white mb-1.5">
              Ready to Contribute to Your Technical Team
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Open to conversations for roles in <strong className="text-white">Application Support</strong>, <strong className="text-white">IT Operations</strong>, <strong className="text-white">Systems Support</strong>, <strong className="text-white">SaaS Administration</strong>, and <strong className="text-white">Junior Cloud Support</strong>.
            </p>
          </div>

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-md transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            <span>Let's Discuss Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </TiltCard>

      </div>
    </section>
  );
};
