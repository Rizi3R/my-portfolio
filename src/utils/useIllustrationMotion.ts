import { useEffect, useRef } from 'react';

export const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

type PlayIllustration = (element: HTMLElement) => Animation[];

export function useIllustrationMotion<T extends HTMLElement>(play: PlayIllustration) {
  const ref = useRef<T>(null);
  const replay = useRef<() => void>(() => {});
  const played = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !element.animate || typeof IntersectionObserver === 'undefined') return;

    const preference = window.matchMedia(reducedMotionQuery);
    let inView = false;
    let meaningfullyVisible = false;
    let animations: Animation[] = [];

    const stop = () => {
      animations.forEach((animation) => animation.cancel());
      animations = [];
    };

    const start = () => {
      if (!inView || document.hidden || preference.matches) return;
      stop();
      animations = play(element);
    };

    const playOnce = () => {
      if (!meaningfullyVisible || document.hidden || played.current) return;
      played.current = true;
      start();
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      meaningfullyVisible = inView && entry.intersectionRatio >= 0.35;
      if (inView) playOnce();
      else stop();
    }, { threshold: [0, 0.35] });

    const handleVisibility = () => {
      if (document.hidden) stop();
      else playOnce();
    };

    const handlePreference = () => {
      if (preference.matches) stop();
    };

    replay.current = start;
    observer.observe(element);
    preference.addEventListener('change', handlePreference);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('beforeprint', stop);

    return () => {
      replay.current = () => {};
      stop();
      observer.disconnect();
      preference.removeEventListener('change', handlePreference);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('beforeprint', stop);
    };
  }, [play]);

  return { ref, replay };
}
