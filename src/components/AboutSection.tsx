import React, { useState } from 'react';
import {
  PROFILE,
  LEARNING_ENTRIES,
  CERTIFICATIONS,
  EDUCATION,
} from '../data/universeContent';
import {
  Layers,
  Terminal,
  Cpu,
  FlaskConical,
  ArrowRight,
  BookOpen,
  Sparkles,
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

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 py-16 sm:py-20 border-b border-[#323238]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-2">
            01. About &amp; Scope
          </p>
          <h2
            id="about-heading"
            className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4"
          >
            Practical IT operations, application support, and steady troubleshooting.
          </h2>
          <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
            {PROFILE.intro} Outside daily operations, I enjoy exploring how systems connect, learning automation workflows with UiPath, and building small browser simulations to test networking and caching concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-[#222226] border border-[#323238] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#323238]">
                <h3 className="font-display text-lg font-semibold text-white">
                  Where I Contribute Day to Day
                </h3>
                <span className="text-xs font-mono text-[#9CA3AF]">Work Scope</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#B0E0E6]">
                    <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Xilnex POS &amp; App Triage</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                    Supporting Xilnex POS for HQ and outlets, troubleshooting sync, promotion, and payment issues, and coordinating vendor escalation when needed.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#B0E0E6]">
                    <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Business Systems &amp; Lark</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                    Helping with a Google Workspace to Lark migration, Lark administration, approvals and workflow support, onboarding/offboarding, and NetSuite Excel data preparation.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#B0E0E6]">
                    <Terminal className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>New-Store Setup &amp; Hardware</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                    Helping set up and check POS devices, payment terminals, peripherals, and LAN/Wi-Fi links, plus onsite printer, copier, and workstation troubleshooting.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#B0E0E6]">
                    <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Foundations &amp; Documentation</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                    UiTM Diploma in Computer Science and Mathematics, IT internship work with Laravel, MySQL, SRS, and ERDs, plus AWS Certified Cloud Practitioner.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-[#323238] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenBeepToReceipt}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1B1B1D] border border-[#B0E0E6]/40 hover:border-[#B0E0E6] text-[#B0E0E6] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>Beep to Receipt Walkthrough</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onOpenLab}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#D1D5DB] hover:text-white transition-colors cursor-pointer"
                >
                  <FlaskConical className="w-4 h-4" aria-hidden="true" />
                  <span>Open Computing Lab</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleParityEasterEgg}
                className="text-xs font-mono text-[#9CA3AF] hover:text-[#DC343B] transition-colors cursor-pointer"
                title="Try clicking this or typing 'beep' in the terminal"
              >
                {parityChecked ? '✓ Scanner Beep Triggered' : 'Test Scanner Beep'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#222226] border border-[#323238] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#323238]">
                <h3 className="font-display text-lg font-semibold text-white">
                  Currently Exploring
                </h3>
                <span className="text-xs font-mono text-[#DC343B]">Active Learning</span>
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
                    <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                      {entry.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#323238] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#9CA3AF]">
                <span>Education</span>
                <span className="text-white font-medium">
                  {EDUCATION.institution} ({EDUCATION.period})
                </span>
              </div>
              <div className="flex items-center justify-between text-[#9CA3AF]">
                <span>Credentials &amp; Programs</span>
                <span className="text-[#B0E0E6] font-medium">
                  {CERTIFICATIONS.length} Listed
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenTerminal}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-mono text-[#B0E0E6] hover:text-white transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DC343B]" aria-hidden="true" />
                <span>Optional: Explore via Terminal Shell</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
