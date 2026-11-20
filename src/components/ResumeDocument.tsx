import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { LinkedInIcon } from './LinkedInIcon';
import {
  PROFILE,
  EXPERIENCES,
  CERTIFICATIONS,
  EDUCATION,
  LEARNING_ENTRIES,
  SKILL_GROUPS,
} from '../data/universeContent';

interface ResumeDocumentProps {
  headingId?: string;
  headingAs?: 'h1' | 'h2';
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({
  headingId = 'resume-document-title',
  headingAs = 'h2',
}) => {
  const HeadingTag = headingAs;

  return (
    <div className="space-y-6 sm:space-y-7 font-sans text-[#191723] select-text">
      {/* Header */}
      <div className="border-b border-[#DDD6C7] pb-5">
        <HeadingTag
          id={headingId}
          className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-[#191723] mb-1"
        >
          {PROFILE.fullName}
        </HeadingTag>
        <p className="text-xs font-mono font-semibold text-[#474457] mb-2">
          {PROFILE.displayName}
        </p>
        <p className="text-xs sm:text-sm font-semibold font-mono text-[#191723] tracking-wide uppercase mb-3">
          {PROFILE.title}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs text-[#474457] font-mono break-words">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#474457] shrink-0" aria-hidden="true" />
            <span>{PROFILE.location}</span>
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <a
            href={`mailto:${PROFILE.email}`}
            className="flex items-center gap-1.5 text-[#191723] underline break-all sm:break-normal"
          >
            <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{PROFILE.email}</span>
          </a>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <a
            href={PROFILE.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#191723] underline"
          >
            <LinkedInIcon className="w-3.5 h-3.5 shrink-0" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>

      {/* Summary */}
      <section className="break-inside-avoid">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#191723] border-b border-[#DDD6C7] pb-1.5 mb-2.5 break-after-avoid">
          Summary
        </h3>
        <p className="text-sm text-[#474457] leading-relaxed">
          {PROFILE.resumeSummary}
        </p>
      </section>

      {/* Experience */}
      <section>
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#191723] border-b border-[#DDD6C7] pb-1.5 mb-4 break-after-avoid">
          Experience
        </h3>

        <div className="space-y-6">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="space-y-1.5 break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h4 className="text-sm font-bold font-mono text-[#191723] break-after-avoid">
                    {exp.role}
                  </h4>
                  <span className="text-xs font-semibold text-[#474457]">
                    {exp.organization} · {exp.location}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#474457] shrink-0 uppercase font-semibold">
                  {exp.period}
                </span>
              </div>

              <ul className="list-disc pl-4 text-xs sm:text-sm text-[#191723] space-y-1.5">
                {exp.highlights.map((b, i) => (
                  <li key={i} className="leading-relaxed">
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="text-xs font-mono text-[#474457] pt-1">
                <strong className="text-[#191723]">Tools:</strong>{' '}
                {exp.technologies.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Skills Summary */}
      <section className="break-inside-avoid">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#191723] border-b border-[#DDD6C7] pb-1.5 mb-3 break-after-avoid">
          Core Skills
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="space-y-1">
              <div className="font-mono font-semibold text-[#191723]">{group.title}</div>
              <p className="text-[#474457] leading-relaxed">{group.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education, Credentials & Learning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 break-inside-avoid">
        <section>
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#191723] border-b border-[#DDD6C7] pb-1.5 mb-3">
            Education
          </h3>
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold font-mono text-[#191723]">
              {EDUCATION.degree}
            </h4>
            <p className="text-xs text-[#474457] font-medium">{EDUCATION.institution}</p>
            <span className="text-xs font-mono text-[#474457] block">
              {EDUCATION.period}
            </span>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#191723] border-b border-[#DDD6C7] pb-1.5 mb-3">
            Credentials &amp; Learning
          </h3>
          <ul className="space-y-2.5 text-xs text-[#474457]">
            {CERTIFICATIONS.map((c) => (
              <li key={c.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <strong className="font-semibold text-[#191723]">{c.name}</strong>
                  <span className="text-xs font-mono text-[#474457] font-semibold shrink-0">
                    {c.kindLabel}
                  </span>
                </div>
                <span className="text-[#474457] block text-xs">{c.issuer}</span>
              </li>
            ))}
            {LEARNING_ENTRIES.map((l) => (
              <li key={l.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <strong className="font-semibold text-[#191723]">{l.topic}</strong>
                  <span className="text-xs font-mono text-[#474457] font-semibold shrink-0">
                    {l.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
