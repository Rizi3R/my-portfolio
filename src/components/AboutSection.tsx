import React, { useState } from 'react';
import { ABOUT_APPROACH } from '../data/universeContent';
import {
  Compass,
  Network,
  Terminal,
  FlaskConical,
  FileText,
  ArrowRight,
  Volume2,
} from 'lucide-react';
import { audioFx } from '../utils/audioFx';

interface AboutSectionProps {
  onOpenLab: () => void;
  onOpenBeepToReceipt: () => void;
  onOpenAtlas: () => void;
  onOpenTerminal: () => void;
  onOpenPlainSummary: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenLab,
  onOpenBeepToReceipt,
  onOpenAtlas,
  onOpenTerminal,
  onOpenPlainSummary,
}) => {
  const [beepPlayed, setBeepPlayed] = useState(false);

  const handleSampleBeep = () => {
    audioFx.playSuccess();
    setBeepPlayed((prev) => !prev);
  };

  const workbenches = [
    {
      id: 'wb-trace',
      title: 'Beep to Receipt',
      tag: 'Illustrative Educational Walkthrough',
      description:
        'Step-by-step generic educational model showing how a counter barcode scan passes through hardware, OS drivers, local network, application logic, ERP, and support teams.',
      cta: 'Open Walkthrough',
      icon: Compass,
      onClick: onOpenBeepToReceipt,
    },
    {
      id: 'wb-atlas',
      title: 'Full Skill Atlas',
      tag: 'Interactive Node Graph & List',
      description:
        'Inspect connections between work-backed support systems, credentials, internship experience, and active learning areas.',
      cta: 'Open Skill Atlas',
      icon: Network,
      onClick: onOpenAtlas,
    },
    {
      id: 'wb-terminal',
      title: 'Interactive Portfolio Shell',
      tag: 'Read-Only Command Line',
      description:
        'Query roles, education, skills, and contact channels using shell commands or click-to-run shortcuts.',
      cta: 'Launch Shell',
      icon: Terminal,
      onClick: onOpenTerminal,
    },
    {
      id: 'wb-lab',
      title: 'Computing Lab',
      tag: 'Browser-Native Simulations',
      description:
        'Experiment interactively with packet flight hops, LRU/FIFO cache eviction, and UNIX chmod permission bitmasks.',
      cta: 'Open Lab',
      icon: FlaskConical,
      onClick: onOpenLab,
    },
    {
      id: 'wb-plain',
      title: 'Printable Summary',
      tag: 'High-Contrast Document',
      description:
        'Single-document career chronology, case studies, credentials, and educational walkthrough ready for printing or PDF export.',
      cta: 'Open Summary',
      icon: FileText,
      onClick: onOpenPlainSummary,
    },
  ];

  return (
    <section
      id="workbenches"
      aria-labelledby="workbenches-heading"
      className="scroll-mt-20 bg-[#0A0913] text-[#F6F2E9] py-16 sm:py-20 border-b border-[#242138]"
    >
      {/* Keep #about anchor alias cleanly resolving without extra height */}
      <div id="about" className="scroll-mt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#242138] pb-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-[#A8C5FF]">
              Workbenches &amp; Practice
            </p>
            <h2
              id="workbenches-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#F6F2E9] tracking-tight"
            >
              Supporting Tools &amp; Interactive Views
            </h2>
            <p className="text-sm text-[#CFCAC0] leading-relaxed">
              Optional interactive views kept secondary to the core work history and case studies above.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSampleBeep}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#CFCAC0] hover:text-[#F2A77D] transition-colors cursor-pointer self-start md:self-auto"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#F2A77D]" aria-hidden="true" />
            <span>{beepPlayed ? 'Scanner beep played' : 'Test scanner audio cue'}</span>
          </button>
        </div>

        {/* Open Rule-Divided Workbenches Table/List */}
        <div className="divide-y divide-[#242138] border-b border-[#242138]">
          {workbenches.map((wb) => {
            const Icon = wb.icon;
            return (
              <div
                key={wb.id}
                className="py-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
              >
                <div className="lg:col-span-4 flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#A8C5FF] shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#F6F2E9]">
                      {wb.title}
                    </h3>
                    <div className="text-[11px] font-mono text-[#F2A77D]">{wb.tag}</div>
                  </div>
                </div>

                <p className="lg:col-span-6 text-xs sm:text-sm text-[#CFCAC0] leading-relaxed">
                  {wb.description}
                </p>

                <div className="lg:col-span-2 lg:text-right">
                  <button
                    type="button"
                    onClick={wb.onClick}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#A8C5FF] hover:text-[#F6F2E9] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded py-1"
                  >
                    <span>{wb.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Concise How I Work Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {ABOUT_APPROACH.map((item, idx) => (
            <div
              key={item.id}
              className={`space-y-1.5 ${idx > 0 ? 'md:border-l md:border-[#242138] md:pl-8' : ''}`}
            >
              <div className="text-[11px] font-mono text-[#9A94A8] uppercase tracking-wider">
                Approach 0{idx + 1}
              </div>
              <h3 className="text-sm font-semibold text-[#F6F2E9]">{item.title}</h3>
              <p className="text-xs sm:text-sm text-[#CFCAC0] leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
