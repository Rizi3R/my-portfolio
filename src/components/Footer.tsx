import React, { useState, useEffect } from 'react';
import { PROFILE, STRATA } from '../data/universeContent';
import { ArrowUp, Mail, Linkedin, Receipt, Compass, Network, FileText } from 'lucide-react';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800 py-12 relative no-print font-mono text-xs text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-stone-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-stone-900 border border-stone-700 text-cyan-400 flex items-center justify-center text-xs font-bold">
                AR
              </span>
              <span className="text-sm font-bold text-stone-100 tracking-tight">
                {PROFILE.fullName}
              </span>
            </div>
            <p className="text-stone-400 text-xs font-sans max-w-md">
              {PROFILE.title} · Selangor / Kuala Lumpur, Malaysia
            </p>
            <p className="text-stone-500 text-[11px]">
              "Beep to Receipt": Tracing the 6 vertical strata of computing from laser photodiode to thermal printer head.
            </p>
          </div>

          {/* Social & Contact Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{PROFILE.email}</span>
            </a>

            <a
              href={PROFILE.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href="#receipt"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-colors"
            >
              <Receipt className="w-3.5 h-3.5 text-amber-400" />
              <span>Thermal Receipt</span>
            </a>
          </div>
        </div>

        {/* Strata Links & Navigation Grid */}
        <div className="py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-[11px] border-b border-stone-800">
          {STRATA.map((st, i) => (
            <a
              key={st.id}
              href={`#stratum-${st.id}`}
              className="p-2 bg-stone-900/40 hover:bg-stone-900 border border-stone-800/80 hover:border-cyan-500/40 transition-colors"
            >
              <div className="text-cyan-400 font-bold mb-0.5">S0{i + 1}</div>
              <div className="text-stone-200 font-semibold truncate">{st.title.split(' ')[0]}</div>
              <div className="text-stone-500 text-[10px] truncate">{st.tagline}</div>
            </a>
          ))}
        </div>

        {/* Bottom Credits & Verification */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {currentYear} {PROFILE.displayName} · Zero external trackers · Static React/TypeScript build
          </div>

          <div className="flex items-center gap-4">
            <span className="text-emerald-400">✓ 100% Truthful Provenance</span>
            {showBackToTop && (
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-1 text-stone-400 hover:text-cyan-300 transition-colors cursor-pointer"
                aria-label="Scroll back to top"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
