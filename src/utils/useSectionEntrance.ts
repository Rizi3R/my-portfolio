import { useIllustrationMotion } from './useIllustrationMotion';

function playSectionEntrance(heading: HTMLElement): Animation[] {
  const caseId = new URLSearchParams(window.location.search).get('case');
  const anchorId = caseId || window.location.hash.slice(1);
  const destination = document.getElementById(anchorId);
  if (destination && heading.closest('section')?.contains(destination)) return [];

  return [heading.animate(
    [{ opacity: 0.88, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
    { duration: 360, easing: 'ease-out' },
  )];
}

export function useSectionEntrance() {
  return useIllustrationMotion<HTMLDivElement>(playSectionEntrance).ref;
}
