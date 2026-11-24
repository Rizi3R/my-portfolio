import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { LinkedInIcon } from './LinkedInIcon';
import { useI18n } from '../i18n';

interface ResumeDocumentProps {
  headingId?: string;
  headingAs?: 'h1' | 'h2';
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({
  headingId = 'resume-document-title',
  headingAs = 'h2',
}) => {
  const { t, content } = useI18n();
  const HeadingTag = headingAs;

  return (
    <div className="space-y-6 sm:space-y-7 font-sans text-[#13161C] select-text">
      {/* Header */}
      <div className="border-b border-[#C9D6DF] pb-5">
        <HeadingTag
          id={headingId}
          className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-[#13161C] mb-1"
        >
          {content.profile.fullName}
        </HeadingTag>
        <p className="text-xs font-mono font-semibold text-[#3E4A5A] mb-2">
          {content.profile.displayName}
        </p>
        <p className="text-xs sm:text-sm font-semibold font-mono text-[#13161C] tracking-wide uppercase mb-3">
          {content.profile.title}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs text-[#3E4A5A] font-mono break-words">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#3E4A5A] shrink-0" aria-hidden="true" />
            <span>{content.profile.location}</span>
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <a
            href={`mailto:${content.profile.email}`}
            className="flex items-center gap-1.5 text-[#13161C] underline break-all sm:break-normal"
          >
            <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{content.profile.email}</span>
          </a>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <a
            href={content.profile.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#13161C] underline"
          >
            <LinkedInIcon className="w-3.5 h-3.5 shrink-0" />
            <span>{t.resume.linkedInProfile}</span>
          </a>
        </div>
      </div>

      {/* Summary */}
      <section className="break-inside-avoid">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#13161C] border-b border-[#C9D6DF] pb-1.5 mb-2.5 break-after-avoid">
          {t.resume.summaryHeading}
        </h3>
        <p className="text-sm text-[#3E4A5A] leading-relaxed">
          {content.profile.resumeSummary}
        </p>
      </section>

      {/* Experience */}
      <section>
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#13161C] border-b border-[#C9D6DF] pb-1.5 mb-4 break-after-avoid">
          {t.resume.experienceHeading}
        </h3>

        <div className="space-y-6">
          {content.experiences.map((exp) => (
            <div key={exp.id} className="space-y-1.5 break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h4 className="text-sm font-bold font-mono text-[#13161C] break-after-avoid">
                    {exp.role}
                  </h4>
                  <span className="text-xs font-semibold text-[#3E4A5A]">
                    {exp.organization} · {exp.location}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#3E4A5A] shrink-0 font-semibold">
                  {exp.period}
                </span>
              </div>

              <ul className="list-disc pl-4 text-xs sm:text-sm text-[#13161C] space-y-1.5">
                {exp.highlights.map((b, i) => (
                  <li key={i} className="leading-relaxed">
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="text-xs font-mono text-[#3E4A5A] pt-1">
                <strong className="text-[#13161C]">{t.common.tools}</strong>{' '}
                {exp.technologies.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Skills Summary */}
      <section className="break-inside-avoid">
        <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#13161C] border-b border-[#C9D6DF] pb-1.5 mb-3 break-after-avoid">
          {t.resume.coreSkillsHeading}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
          {content.skillGroups.map((group) => (
            <div key={group.id} className="space-y-1">
              <div className="font-mono font-semibold text-[#13161C]">{group.title}</div>
              <p className="text-[#3E4A5A] leading-relaxed">{group.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education, Credentials & Learning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 break-inside-avoid">
        <section>
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#13161C] border-b border-[#C9D6DF] pb-1.5 mb-3">
            {t.resume.educationHeading}
          </h3>
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold font-mono text-[#13161C]">
              {content.education.degree}
            </h4>
            <p className="text-xs text-[#3E4A5A] font-medium">{content.education.institution}</p>
            <span className="text-xs font-mono text-[#3E4A5A] block">
              {content.education.period}
            </span>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#13161C] border-b border-[#C9D6DF] pb-1.5 mb-3">
            {t.resume.credentialsLearningHeading}
          </h3>
          <ul className="space-y-2.5 text-xs text-[#3E4A5A]">
            {content.certifications.map((c) => (
              <li key={c.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <strong className="font-semibold text-[#13161C]">{c.name}</strong>
                  <span className="text-xs font-mono text-[#3E4A5A] font-semibold shrink-0">
                    {c.kindLabel}
                  </span>
                </div>
                <span className="text-[#3E4A5A] block text-xs">{c.issuer}</span>
              </li>
            ))}
            {content.learning.map((l) => (
              <li key={l.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <strong className="font-semibold text-[#13161C]">{l.topic}</strong>
                  <span className="text-xs font-mono text-[#3E4A5A] font-semibold shrink-0">
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
