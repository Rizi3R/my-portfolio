import React, { useEffect, useRef, useState } from 'react';
import { FileText, FolderOpen, Briefcase, Award } from 'lucide-react';
import { PROFILE } from '../data/universeContent';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenCaseStudy: (caseId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenCaseStudy,
}) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const [sculptureOffsetPx, setSculptureOffsetPx] = useState(0);
  const [imageMissing, setImageMissing] = useState(false);

  // Restrained parallax strictly on the sculpture wrapper:
  // - only while hero is visible
  // - static (0px) on < 1024px mobile/tablet viewports
  // - static (0px) when prefers-reduced-motion: reduce is set
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl || typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    let isVisible = true;
    let rafId: number | null = null;

    const updateParallax = () => {
      rafId = null;
      if (motionQuery.matches || !desktopQuery.matches || !isVisible) {
        setSculptureOffsetPx(0);
        return;
      }

      const rect = heroEl.getBoundingClientRect();
      // Progress from 0 when top sits near navbar down to 1 as hero scrolls out
      const scrolledPast = Math.max(0, 64 - rect.top);
      const maxTravel = Math.max(240, rect.height * 0.7);
      const clamped = Math.min(24, (scrolledPast / maxTravel) * 24);
      setSculptureOffsetPx(Number(clamped.toFixed(2)));
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateParallax);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = Boolean(entries[0]?.isIntersecting);
        if (!isVisible) {
          setSculptureOffsetPx(0);
        } else {
          handleScroll();
        }
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);
    window.addEventListener('scroll', handleScroll, { passive: true });
    motionQuery.addEventListener('change', updateParallax);
    desktopQuery.addEventListener('change', updateParallax);

    updateParallax();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      motionQuery.removeEventListener('change', updateParallax);
      desktopQuery.removeEventListener('change', updateParallax);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      aria-labelledby="hero-heading"
      className="relative bg-[#0A0913] text-[#F6F2E9] pt-8 sm:pt-12 lg:pt-14 pb-10 sm:pb-12 lg:pb-14 border-b border-[#242138] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Intro, Controlled-Measure Headline, Primary Actions (Always first on mobile & desktop) */}
          <div className="order-1 lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <p className="text-sm sm:text-base font-medium text-[#F6F2E9] tracking-wide">
                {PROFILE.displayName}
              </p>

              <h1
                id="hero-heading"
                className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#F6F2E9] tracking-tight leading-[1.08] max-w-[16ch]"
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

          {/* Right Column: Smoked-Glass & Titanium Ribbon Artwork Stage */}
          <div className="order-2 lg:col-span-5">
            <div
              className="relative w-full max-w-md mx-auto lg:max-w-none aspect-[4/3] sm:aspect-[16/11] lg:aspect-[5/6] lg:max-h-[540px] bg-[#0A0913] overflow-hidden select-none"
              style={{
                transform: `translate3d(0, -${sculptureOffsetPx}px, 0)`,
              }}
            >
              {!imageMissing && (
                <picture>
                  <source srcSet="/assets/hero-sculpture.avif" type="image/avif" />
                  <source srcSet="/assets/hero-sculpture.webp" type="image/webp" />
                  <img
                    src="/assets/hero-sculpture.png"
                    alt="Abstract smoked-glass and brushed titanium ribbon sculpture against a deep ink-violet backdrop"
                    width={1200}
                    height={1440}
                    decoding="async"
                    fetchPriority="high"
                    onError={() => setImageMissing(true)}
                    className="w-full h-full object-cover object-center"
                  />
                </picture>
              )}

              {/* Directional ink-violet edge blend so the artwork integrates cleanly into #0A0913 */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 54% 48%, transparent 45%, #0A0913 96%), linear-gradient(to right, #0A0913 0%, transparent 18%, transparent 88%, #0A0913 100%), linear-gradient(to bottom, #0A0913 0%, transparent 14%, transparent 84%, #0A0913 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
