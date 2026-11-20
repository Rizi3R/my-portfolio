import React from 'react';
import { useI18n } from '../i18n';
import {
  Compass,
  Network,
  Terminal,
  FlaskConical,
  ArrowRight,
} from 'lucide-react';

interface AboutSectionProps {
  onOpenLab: (trigger?: HTMLElement | null) => void;
  onOpenBeepToReceipt: () => void;
  onOpenAtlas: () => void;
  onOpenTerminal: (trigger?: HTMLElement | null) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenLab,
  onOpenBeepToReceipt,
  onOpenAtlas,
  onOpenTerminal,
}) => {
  const { t } = useI18n();

  const labItems = [
    {
      id: 'lab-shell',
      title: t.interactiveLab.items.shell.title,
      description: t.interactiveLab.items.shell.description,
      cta: t.interactiveLab.items.shell.cta,
      icon: Terminal,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => onOpenTerminal(e.currentTarget),
    },
    {
      id: 'lab-atlas',
      title: t.interactiveLab.items.atlas.title,
      description: t.interactiveLab.items.atlas.description,
      cta: t.interactiveLab.items.atlas.cta,
      icon: Network,
      onClick: () => onOpenAtlas(),
    },
    {
      id: 'lab-computing',
      title: t.interactiveLab.items.lab.title,
      description: t.interactiveLab.items.lab.description,
      cta: t.interactiveLab.items.lab.cta,
      icon: FlaskConical,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => onOpenLab(e.currentTarget),
    },
    {
      id: 'lab-beep',
      title: t.interactiveLab.items.walkthrough.title,
      description: t.interactiveLab.items.walkthrough.description,
      cta: t.interactiveLab.items.walkthrough.cta,
      icon: Compass,
      onClick: () => onOpenBeepToReceipt(),
    },
  ];

  return (
    <section
      id="workbenches"
      aria-labelledby="workbenches-heading"
      className="scroll-mt-20 bg-[#0A0913] text-[#F6F2E9] py-14 sm:py-16 border-b border-[#242138]"
    >
      <div id="lab" className="scroll-mt-20" />
      <div id="about" className="scroll-mt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#242138] pb-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-[#F2A77D]">
              {t.interactiveLab.eyebrow}
            </p>
            <h2
              id="workbenches-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#F6F2E9] tracking-tight"
            >
              {t.interactiveLab.heading}
            </h2>
          </div>
          <p className="text-sm text-[#CFCAC0] max-w-md leading-relaxed">
            {t.interactiveLab.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {labItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-[#12101F] border border-[#242138] rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#A8C5FF] shrink-0" aria-hidden="true" />
                    <h3 className="font-display text-xl font-bold text-[#F6F2E9]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#CFCAC0] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#A8C5FF] hover:text-[#F6F2E9] transition-colors cursor-pointer py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF] rounded"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
