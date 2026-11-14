import React, { useEffect, useRef, useState } from 'react';
import { Users, RefreshCw } from 'lucide-react';

interface VisitorApiResponse {
  configured: boolean;
  count: number | null;
  deduplicated?: boolean;
  error?: string;
}

interface VisitorCounterProps {
  variant?: 'card' | 'inline';
  onCountLoaded?: (count: number | null) => void;
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  variant = 'card',
  onCountLoaded,
}) => {
  const [status, setStatus] = useState<'loading' | 'ready' | 'unconfigured' | 'error'>('loading');
  const [targetCount, setTargetCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(0);
  const hasRecordedRef = useRef(false);

  const loadAndRecordVisit = async (forceCheckOnly = false) => {
    try {
      const sessionKey = 'ar_portfolio_visit_recorded';
      const alreadyRecordedInSession =
        typeof window !== 'undefined' && window.sessionStorage.getItem(sessionKey) === '1';

      const shouldIncrement = !forceCheckOnly && !alreadyRecordedInSession && !hasRecordedRef.current;
      if (shouldIncrement) {
        hasRecordedRef.current = true;
      }

      const response = await fetch('/api/visitors', {
        method: shouldIncrement ? 'POST' : 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as VisitorApiResponse;

      if (!data.configured || data.count === null) {
        setStatus('unconfigured');
        setTargetCount(null);
        onCountLoaded?.(null);
        return;
      }

      if (shouldIncrement && typeof window !== 'undefined') {
        window.sessionStorage.setItem(sessionKey, '1');
      }

      setTargetCount(data.count);
      setStatus('ready');
      onCountLoaded?.(data.count);
    } catch {
      setStatus('error');
      setTargetCount(null);
      onCountLoaded?.(null);
    }
  };

  useEffect(() => {
    loadAndRecordVisit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Smoothly animate count-up using requestAnimationFrame; respects reduced motion
  useEffect(() => {
    if (targetCount === null) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayCount(targetCount);
      return;
    }

    const startValue = displayCount;
    const endValue = targetCount;
    if (startValue === endValue) return;

    const duration = 650;
    const startTime = performance.now();
    let frameId = 0;

    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayCount(Math.round(startValue + (endValue - startValue) * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetCount]);

  if (variant === 'inline') {
    return (
      <div className="inline-flex items-center gap-2 text-xs font-mono text-[#9CA3AF]">
        <Users className="w-3.5 h-3.5 text-[#B0E0E6]" aria-hidden="true" />
        <span>People who have visited:</span>
        {status === 'loading' && <span className="text-[#B0E0E6]">...</span>}
        {status === 'ready' && targetCount !== null && (
          <span className="text-white font-semibold tabular-nums">
            {displayCount.toLocaleString()}
          </span>
        )}
        {(status === 'unconfigured' || status === 'error') && (
          <span className="text-[#9CA3AF]">Unavailable</span>
        )}
      </div>
    );
  }

  return (
    <div
      className="bg-[#222226] border border-[#323238] p-4 rounded-xl transition-colors"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-[#9CA3AF]">People who have visited</p>
          <div className="mt-1 flex items-baseline gap-2.5">
            {status === 'loading' && (
              <span className="font-mono text-2xl font-semibold text-[#B0E0E6] tabular-nums animate-pulse">
                ---
              </span>
            )}
            {status === 'ready' && targetCount !== null && (
              <span className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                {displayCount.toLocaleString()}
              </span>
            )}
            {status === 'unconfigured' && (
              <span className="text-sm font-medium text-[#D1D5DB]">
                Awaiting database setup
              </span>
            )}
            {status === 'error' && (
              <span className="text-sm font-medium text-[#D1D5DB]">
                Counter temporarily unavailable
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {status === 'error' && (
            <button
              type="button"
              onClick={() => {
                setStatus('loading');
                loadAndRecordVisit(true);
              }}
              className="p-2 rounded-lg border border-[#323238] text-[#B0E0E6] hover:border-[#B0E0E6]/60 transition-colors cursor-pointer"
              aria-label="Retry loading visitor count"
              title="Retry"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
          <div className="w-10 h-10 rounded-lg bg-[#1B1B1D] border border-[#323238] flex items-center justify-center">
            <Users className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
          </div>
        </div>
      </div>

      <p className="mt-2 text-[11px] text-[#9CA3AF] leading-snug">
        {status === 'ready'
          ? 'Persistent server count · 12-hour duplicate-visit window'
          : status === 'unconfigured'
          ? 'Visitor persistence is currently not configured.'
          : 'Privacy-conscious · No raw visitor IPs stored.'}
      </p>
    </div>
  );
};
