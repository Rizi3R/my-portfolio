/**
 * Pointer-driven surface effects, delegated from one document listener.
 *
 * - `data-glow`: sets --mx / --my (px) so CSS can paint a spotlight that
 *   follows the cursor (see `[data-glow]` in index.css).
 * - `data-tilt`: adds a subtle 3D tilt toward the cursor (max 5deg).
 *
 * Only runs for fine pointers (mouse/trackpad) and when the visitor has not
 * asked for reduced motion; otherwise surfaces stay static.
 */
const MAX_TILT_DEG = 5;

export function initInteractiveSurfaces(): () => void {
  if (typeof window === 'undefined') return () => {};
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  let tilted: HTMLElement | null = null;
  let frame = 0;
  let last: PointerEvent | null = null;

  const resetTilt = () => {
    if (tilted) tilted.style.transform = '';
    tilted = null;
  };

  const apply = () => {
    frame = 0;
    const event = last;
    if (!event || !finePointer.matches || reduceMotion.matches) return;
    const target = event.target instanceof Element ? event.target : null;

    const glow = target?.closest<HTMLElement>('[data-glow]');
    if (glow) {
      const rect = glow.getBoundingClientRect();
      glow.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      glow.style.setProperty('--my', `${event.clientY - rect.top}px`);
    }

    const tilt = target?.closest<HTMLElement>('[data-tilt]') ?? null;
    if (tilt !== tilted) resetTilt();
    if (tilt) {
      const rect = tilt.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tilt.style.transform =
        `perspective(900px) rotateX(${(-y * MAX_TILT_DEG).toFixed(2)}deg) rotateY(${(x * MAX_TILT_DEG).toFixed(2)}deg) translateY(-2px)`;
      tilted = tilt;
    }
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    last = event;
    if (!frame) frame = requestAnimationFrame(apply);
  };

  // Pointer left the window entirely (relatedTarget is null).
  const onOut = (event: PointerEvent) => {
    if (!event.relatedTarget) resetTilt();
  };

  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerout', onOut);
  // Scrolling moves surfaces out from under a still cursor.
  window.addEventListener('scroll', resetTilt, { passive: true });
  window.addEventListener('blur', resetTilt);
  reduceMotion.addEventListener?.('change', resetTilt);

  return () => {
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerout', onOut);
    window.removeEventListener('scroll', resetTilt);
    window.removeEventListener('blur', resetTilt);
    reduceMotion.removeEventListener?.('change', resetTilt);
    if (frame) cancelAnimationFrame(frame);
    resetTilt();
  };
}
