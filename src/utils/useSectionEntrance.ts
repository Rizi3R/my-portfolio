import { useIllustrationMotion } from './useIllustrationMotion';

// Section headings no longer animate in: the hero's queue stamps are the page's single motion moment.
function playSectionEntrance(_heading: HTMLElement): Animation[] {
  return [];
}


export function useSectionEntrance() {
  return useIllustrationMotion<HTMLDivElement>(playSectionEntrance).ref;
}
