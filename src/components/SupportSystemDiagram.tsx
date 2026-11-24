import { ArrowUpRight, GitMerge, KeyRound, LifeBuoy, RotateCcw, Users } from 'lucide-react';
import { useI18n } from '../i18n';
import { useIllustrationMotion } from '../utils/useIllustrationMotion';

const supportAreas = [
  { id: 'users', caseId: 'case-lark-migration', icon: Users, route: 'M50 0 V28 H31' },
  { id: 'access', caseId: 'case-lark-migration', icon: KeyRound, route: 'M50 0 V28 H69' },
  { id: 'integrations', caseId: 'case-integrations', icon: GitMerge, route: 'M50 0 V76 H31' },
  { id: 'vendors', caseId: 'case-pos-triage', icon: LifeBuoy, route: 'M50 0 V76 H69' },
] as const;

function playSupportDiagram(element: HTMLElement): Animation[] {
  const routes = Array.from(element.querySelectorAll('.support-system-branch'));
  const pulses = Array.from(element.querySelectorAll('.support-system-pulse'));
  const cards = Array.from(element.querySelectorAll('.support-map-link'));

  return [
    ...routes.map((route, index) => route.animate(
      [{ strokeDashoffset: 100 }, { strokeDashoffset: 0 }],
      { duration: 800, delay: index * 45, easing: 'ease-out', fill: 'backwards' },
    )),
    ...cards.map((card, index) => card.animate(
      [{ opacity: 0.86, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }],
      { duration: 350, delay: 80 + index * 60, easing: 'ease-out' },
    )),
    ...pulses.map((pulse, index) => pulse.animate(
      [
        { strokeDashoffset: 5, opacity: 0 },
        { opacity: 1, offset: 0.18 },
        { opacity: 1, offset: 0.82 },
        { strokeDashoffset: -100, opacity: 0 },
      ],
      { duration: 980, delay: 790 + index * 165, easing: 'linear' },
    )),
  ];
}

export function SupportSystemDiagram({ onOpenCaseStudy }: {
  onOpenCaseStudy: (caseId: string) => void;
}) {
  const { t, content } = useI18n();
  const { ref, replay } = useIllustrationMotion<HTMLDivElement>(playSupportDiagram);

  return (
    <div ref={ref} className="support-system">
      <div className="support-system-hub rounded-xl border border-[#B9D6E6]/40 bg-[#13161C] px-4 py-3 text-center">
        <div className="text-xs font-mono uppercase tracking-wider text-[#F0583C]">
          {t.hero.coreFocus}
        </div>
        <div className="font-display text-base sm:text-lg font-bold text-[#EEF4F8] mt-0.5 leading-snug">
          {t.hero.coreFocusTitle}
        </div>
      </div>

      <div className="support-system-grid">
        <svg className="support-system-routes" viewBox="0 0 100 100" preserveAspectRatio="none"
          aria-hidden="true" focusable="false">
          {supportAreas.map(({ id, route }) => (
            <g key={id} data-support-branch={id}>
              <path className="support-system-branch" d={route} pathLength="100" />
              <path className="support-system-pulse" d={route} pathLength="100" />
            </g>
          ))}
        </svg>

        {supportAreas.map(({ id, caseId, icon: Icon }) => (
          <a
            key={id}
            data-support-area={id}
            href={`#${caseId}`}
            onClick={(event) => {
              if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              onOpenCaseStudy(caseId);
            }}
            className="support-map-link rounded-xl border border-[#343C4A] bg-[#13161C] px-2.5 py-2.5 sm:px-3 min-w-0 flex flex-col justify-center gap-1"
          >
            <div className="flex items-start gap-1.5 text-xs sm:text-[13px] sm:font-mono font-semibold text-[#EEF4F8] leading-snug">
              <Icon className="w-3.5 h-3.5 text-[#B9D6E6] shrink-0 mt-0.5" aria-hidden="true" />
              <span className="min-w-0 [overflow-wrap:anywhere]">{t.hero.nodes[id].label}</span>
              <ArrowUpRight size={12} className="ml-auto shrink-0 text-[#B9D6E6]" aria-hidden="true" />
            </div>
            <p className="text-xs sm:text-[13px] text-[#DCE6EE] leading-relaxed [overflow-wrap:anywhere]">
              {t.hero.nodes[id].detail}
            </p>
            <span className="sr-only">{content.caseStudies.find((study) => study.id === caseId)?.title}</span>
          </a>
        ))}
      </div>
      <button type="button" className="motion-replay motion-control" onClick={() => replay.current()}>
        <RotateCcw size={14} aria-hidden="true" />
        {t.hero.replayAnimation}
      </button>
    </div>
  );
}
