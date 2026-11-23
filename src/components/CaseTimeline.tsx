import { useState } from 'react';
import { Check } from 'lucide-react';

export function CaseTimeline({ id, title, stages, steps }: {
  id: string;
  title: string;
  stages: readonly string[];
  steps: readonly string[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-2.5">
      <h4 className="text-xs font-mono uppercase tracking-wider text-[#474457] font-semibold">{title}</h4>
      <ol className="grid gap-2 sm:grid-cols-3">
        {stages.map((stage, index) => (
          <li key={stage} className="min-w-0">
            <button
              type="button"
              aria-pressed={active === index}
              aria-controls={id}
              onClick={() => setActive(index)}
              className="flex w-full min-h-11 items-center gap-2 rounded-lg border border-[#CCC4B3] px-3 py-2 text-start text-sm font-medium transition-colors hover:border-[#506391] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191723] aria-pressed:border-[#506391] aria-pressed:bg-[#E8EDF9]"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[#506391] text-xs text-[#253459]" aria-hidden="true">
                {active === index && <Check size={12} />}
              </span>
              <span>{stage}</span>
            </button>
          </li>
        ))}
      </ol>
      <div role="status" id={id}>
        <p key={active} className="case-timeline-note rounded-lg border-l-2 border-[#506391] bg-[#F3F5FA] px-4 py-3 leading-relaxed">
          {steps[active]}
        </p>
      </div>
    </div>
  );
}
