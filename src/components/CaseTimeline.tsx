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
      <h4 className="text-xs label-condensed text-[#B4C2CF] font-semibold">{title}</h4>
      <ol className="grid gap-2 sm:grid-cols-3">
        {stages.map((stage, index) => (
          <li key={stage} className="min-w-0">
            <button
              type="button"
              aria-pressed={active === index}
              aria-controls={id}
              onClick={() => setActive(index)}
              className="flex w-full min-h-11 items-center gap-2 rounded-lg border border-[#3A4352] px-3 py-2 text-start text-sm font-medium transition-colors hover:border-[#B9D6E6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0583C] aria-pressed:border-[#B9D6E6] aria-pressed:bg-[#1E2733]"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[#7C8A9A] text-xs text-[#B9D6E6]" aria-hidden="true">
                {active === index && <Check size={12} />}
              </span>
              <span>{stage}</span>
            </button>
          </li>
        ))}
      </ol>
      <div role="status" id={id}>
        <p key={active} className="case-timeline-note rounded-lg border-l-2 border-[#7C8A9A] bg-[#232935] px-4 py-3 leading-relaxed">
          {steps[active]}
        </p>
      </div>
    </div>
  );
}
