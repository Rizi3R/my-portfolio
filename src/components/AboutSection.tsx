import React, { useState } from 'react';
import {
  ABOUT_SUMMARY,
  ABOUT_APPROACH,
  LEARNING_ENTRIES,
  CERTIFICATIONS,
  EDUCATION,
} from '../data/universeContent';
import {
  MessageSquare,
  SearchCheck,
  Share2,
  FlaskConical,
  Compass,
  Terminal,
  ArrowRight,
} from 'lucide-react';
import { audioFx } from '../utils/audioFx';

interface AboutSectionProps {
  onOpenLab: () => void;
  onOpenBeepToReceipt: () => void;
  onOpenTerminal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenLab,
  onOpenBeepToReceipt,
  onOpenTerminal,
}) => {
  const [parityChecked, setParityChecked] = useState(false);

  const handleParityEasterEgg = () => {
    audioFx.playSuccess();
    setParityChecked((prev) => !prev);
  };

  const approachIcons = [MessageSquare, SearchCheck, Share2];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 py-14 sm:py-16 border-b border-[#323238]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-2">
            01. How I Work
          </p>
          <h2
            id="about-heading"
            className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4"
          >
            Working calmly with users, isolating issues, and coordinating escalation.
          </h2>
          <p className="text-sm sm:text-base text-[#E5E7EB] leading-relaxed">
            {ABOUT_SUMMARY}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-[#222226] border border-[#323238] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#323238]">
                <h3 className="font-display text-lg font-semibold text-white">
                  Practical Support Approach
                </h3>
                <span className="text-xs font-mono text-[#D1D5DB]">Users · Triage · Vendors</span>
              </div>

              <div className="space-y-4">
                {ABOUT_APPROACH.map((item, idx) => {
                  const Icon = approachIcons[idx % approachIcons.length];
                  return (
                    <div key={item.id} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-[#B0E0E6] shrink-0 mt-1" aria-hidden="true" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-5 border-t border-[#323238] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenBeepToReceipt}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B1B1D] border border-[#B0E0E6]/50 hover:border-[#B0E0E6] text-[#B0E0E6] text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
                >
                  <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Beep to Receipt (Walkthrough)</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onOpenLab}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#E5E7EB] hover:text-[#B0E0E6] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] rounded"
                >
                  <FlaskConical className="w-4 h-4" aria-hidden="true" />
                  <span>Computing Lab</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleParityEasterEgg}
                className="text-xs font-mono text-[#D1D5DB] hover:text-[#DC343B] transition-colors cursor-pointer py-1"
                title="Try clicking this or typing 'beep' in the shell"
              >
                {parityChecked ? '✓ Scanner Beep Triggered' : 'Test Scanner Beep'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#222226] border border-[#323238] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#323238]">
                <h3 className="font-display text-lg font-semibold text-white">
                  Currently Exploring
                </h3>
                <span className="text-xs font-mono text-[#DC343B]">Current Learning</span>
              </div>

              <div className="space-y-4">
                {LEARNING_ENTRIES.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 rounded-xl bg-[#1B1B1D] border border-[#323238]"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-sm font-semibold text-white">{entry.topic}</span>
                      <span className="text-[11px] font-mono text-[#B0E0E6] shrink-0">
                        ○ Learning
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#E5E7EB] leading-relaxed">
                      {entry.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#323238] space-y-2.5 text-xs">
              <div className="flex items-center justify-between gap-2 text-[#D1D5DB]">
                <span>Education</span>
                <span className="text-white font-medium text-right">
                  {EDUCATION.institution} ({EDUCATION.period})
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 text-[#D1D5DB]">
                <span>Credential &amp; Program</span>
                <span className="text-[#B0E0E6] font-medium text-right">
                  {CERTIFICATIONS[0].name}
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenTerminal}
                className="pt-1 inline-flex items-center gap-1.5 text-xs font-mono text-[#B0E0E6] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6] rounded"
              >
                <Terminal className="w-3.5 h-3.5 text-[#DC343B]" aria-hidden="true" />
                <span>Explore details via Interactive Shell</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
