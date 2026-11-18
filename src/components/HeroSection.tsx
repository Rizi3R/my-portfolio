import React, { useEffect, useRef } from 'react';
import { FileText, FolderOpen, Briefcase, Award } from 'lucide-react';
import { PROFILE } from '../data/universeContent';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenCaseStudy: (caseId?: string) => void;
}

const clampUnit = (value: number) => Math.max(-1, Math.min(1, value));

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenCaseStudy,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const canTrackRef = useRef(false);
  const pointerTargetRef = useRef({ nx: 0, ny: 0, active: false });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const resetStage = () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      pointerTargetRef.current = { nx: 0, ny: 0, active: false };
      const stageEl = stageRef.current;
      if (stageEl) {
        stageEl.style.setProperty('--hero-nx', '0');
        stageEl.style.setProperty('--hero-ny', '0');
        stageEl.style.setProperty('--hero-active', '0');
        stageEl.dataset.active = 'false';
      }
    };

    const updateCapability = () => {
      canTrackRef.current = hoverQuery.matches && !motionQuery.matches;
      if (!canTrackRef.current) {
        resetStage();
      }
    };

    updateCapability();
    hoverQuery.addEventListener('change', updateCapability);
    motionQuery.addEventListener('change', updateCapability);

    return () => {
      hoverQuery.removeEventListener('change', updateCapability);
      motionQuery.removeEventListener('change', updateCapability);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  const scheduleCommit = () => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = window.requestAnimationFrame(() => {
      rafIdRef.current = null;
      const stageEl = stageRef.current;
      if (!stageEl) return;
      const { nx, ny, active } = pointerTargetRef.current;
      stageEl.style.setProperty('--hero-nx', nx.toFixed(4));
      stageEl.style.setProperty('--hero-ny', ny.toFixed(4));
      stageEl.style.setProperty('--hero-active', active ? '1' : '0');
      stageEl.dataset.active = active ? 'true' : 'false';
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canTrackRef.current || event.pointerType === 'touch') return;
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const rect = stageEl.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const nx = clampUnit(((event.clientX - rect.left) / rect.width) * 2 - 1);
    const ny = clampUnit(((event.clientY - rect.top) / rect.height) * 2 - 1);

    pointerTargetRef.current = { nx, ny, active: true };
    scheduleCommit();
  };

  const handlePointerLeave = () => {
    pointerTargetRef.current = { nx: 0, ny: 0, active: false };
    scheduleCommit();
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative bg-[#0A0913] text-[#F6F2E9] pt-8 sm:pt-12 lg:pt-14 pb-10 sm:pb-12 lg:pb-14 border-b border-[#242138] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Intro, Controlled-Measure Headline, Primary Actions */}
          <div className="relative z-10 lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <p className="text-sm sm:text-base font-medium text-[#F6F2E9] tracking-wide">
                {PROFILE.displayName}
              </p>

              <h1
                id="hero-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#F6F2E9] tracking-tight leading-[1.09] max-w-[19ch]"
              >
                {PROFILE.title}
              </h1>

              {/* One restrained Soft Copper accent rule */}
              <div className="h-px w-16 bg-[#F2A77D]" aria-hidden="true" />

              <p className="text-base sm:text-lg text-[#E6E1D6] leading-relaxed max-w-xl">
                {PROFILE.intro}
              </p>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#A8C5FF] hover:bg-[#bfd5ff] text-[#191723] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F2E9]"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>View Résumé</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenCaseStudy()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-transparent hover:bg-[#12101F] text-[#F6F2E9] border border-[#F6F2E9]/35 hover:border-[#A8C5FF] hover:text-[#A8C5FF] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
              >
                <FolderOpen className="w-4 h-4" aria-hidden="true" />
                <span>View Case Studies</span>
              </button>
            </div>

            {/* Quiet Supporting Credentials */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 text-xs sm:text-sm text-[#CFCAC0]">
              <span className="inline-flex items-center gap-1.5 text-[#F6F2E9] font-medium">
                <Briefcase className="w-4 h-4 text-[#F2A77D]" aria-hidden="true" />
                <span>
                  {PROFILE.currentRole} at {PROFILE.currentCompany}
                </span>
              </span>
              <span aria-hidden="true" className="text-[#524E66]">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#A8C5FF]" aria-hidden="true" />
                <span>AWS Certified Cloud Practitioner</span>
              </span>
            </div>
          </div>

          {/* Right Column (Desktop Only): Three Overlapping Angled Glass Panels as One Physical Sculpture */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:col-span-5 select-none"
          >
            <div
              ref={stageRef}
              data-active="false"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onPointerCancel={handlePointerLeave}
              className="hero-sculpture-stage relative w-full h-[380px] xl:h-[420px] bg-[#0A0913]"
            >
              {/* Subtle ambient depth glow */}
              <div className="absolute inset-8 rounded-full bg-[#A8C5FF]/[0.06] blur-3xl pointer-events-none" />

              {/* Shared 3D rig tilting all 3 panes around a common center */}
              <div className="hero-sculpture-rig relative w-full h-full pointer-events-none">
                {/* Panel 1 (Back layer - subtle parallax depth) */}
                <div className="hero-glass-layer hero-glass-layer--back absolute top-[6%] left-[4%] w-[66%] h-[70%]">
                  <div className="relative w-full h-full -rotate-6 rounded-2xl border border-[#A8C5FF]/25 bg-gradient-to-br from-[#A8C5FF]/[0.08] via-[#12101F]/70 to-[#0A0913]/90 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(168,197,255,0.2),0_24px_48px_-16px_rgba(0,0,0,0.7)] overflow-hidden">
                    <div className="absolute inset-0 rotate-6">
                      <div className="absolute w-[151.515%] h-[142.857%] -left-[6.061%] -top-[8.571%]">
                        <div className="hero-copper-beam hero-copper-beam--back absolute left-1/2 top-1/2 w-[132px] h-[220%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel 2 (Mid layer with top specular edge highlight & mid parallax depth) */}
                <div className="hero-glass-layer hero-glass-layer--mid absolute top-[12%] left-[30%] w-[68%] h-[72%]">
                  <div className="relative w-full h-full rotate-3 rounded-2xl border border-[#A8C5FF]/35 bg-gradient-to-br from-[#A8C5FF]/[0.14] via-[#151226]/65 to-[#0A0913]/85 backdrop-blur-md shadow-[inset_0_1px_0_rgba(246,242,233,0.22),0_28px_56px_-14px_rgba(0,0,0,0.78)] overflow-hidden">
                    <div className="relative z-10 h-px w-full bg-gradient-to-r from-[#A8C5FF]/45 via-[#F6F2E9]/20 to-transparent" />
                    <div className="absolute inset-0 -rotate-3">
                      <div className="absolute w-[147.059%] h-[138.889%] -left-[44.118%] -top-[16.667%]">
                        <div className="hero-copper-beam hero-copper-beam--mid absolute left-1/2 top-1/2 w-[132px] h-[220%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel 3 (Front layer with strongest parallax, specular edge & thin Soft Copper accent) */}
                <div className="hero-glass-layer hero-glass-layer--front absolute top-[48%] left-[11%] w-[62%] h-[48%]">
                  <div className="relative w-full h-full -rotate-2 rounded-2xl border border-[#A8C5FF]/50 bg-gradient-to-tr from-[#0A0913]/80 via-[#18152B]/60 to-[#A8C5FF]/[0.18] backdrop-blur-lg shadow-[inset_0_1px_0_rgba(246,242,233,0.28),0_24px_50px_-12px_rgba(0,0,0,0.85)] overflow-hidden">
                    <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-[#A8C5FF]/55 to-transparent" />
                    <div className="relative z-10 mt-7 ml-7 h-px w-16 bg-[#F2A77D]" />
                    <div className="absolute inset-0 rotate-2">
                      <div className="absolute w-[161.29%] h-[208.333%] -left-[17.742%] -top-[100%]">
                        <div className="hero-copper-beam hero-copper-beam--front absolute left-1/2 top-1/2 w-[132px] h-[220%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

