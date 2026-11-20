import React from 'react';
import { Printer } from 'lucide-react';
import { ResumeDocument } from './ResumeDocument';
import { PROFILE } from '../data/universeContent';

export const PlainView: React.FC = () => {
  return (
    <article className="max-w-4xl mx-auto py-8 sm:py-12 px-5 sm:px-10 bg-white text-[#191723] font-sans selection:bg-[#191723] selection:text-white min-h-screen">
      {/* Top Document Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DDD6C7] pb-4 mb-8 font-mono text-xs print:hidden">
        <span className="font-semibold text-[#191723]">
          Printable Summary · {PROFILE.displayName}
        </span>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg bg-[#191723] hover:bg-[#2A273B] text-[#F6F2E9] text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#191723]"
        >
          <Printer className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      <ResumeDocument headingId="printable-summary-title" headingAs="h1" />

      <footer className="pt-8 mt-10 border-t border-[#DDD6C7] font-mono text-xs text-[#474457] text-center">
        <div>
          {PROFILE.displayName} · {PROFILE.title}
        </div>
      </footer>
    </article>
  );
};
