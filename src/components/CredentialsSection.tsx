import React from 'react';
import { useI18n } from '../i18n';
import { useSectionEntrance } from '../utils/useSectionEntrance';
import { GraduationCap, Award, BookOpen, Compass } from 'lucide-react';

export const CredentialsSection: React.FC = () => {
  const { t, content } = useI18n();
  const headingRef = useSectionEntrance();

  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="scroll-mt-20 bg-[#13161C] text-[#EEF4F8] py-14 sm:py-16 border-b border-[#2E3644]"
    >
      <div id="education" className="scroll-mt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-[#2E3644] pb-6">
          <div ref={headingRef} className="max-w-2xl space-y-2">
            <p className="text-xs label-condensed text-[#B9D6E6]">
              {t.credentials.eyebrow}
            </p>
            <h2
              id="credentials-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#EEF4F8] tracking-tight"
            >
              {t.credentials.heading}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Formal Education */}
          <article className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs label-condensed">
              <span className="inline-flex items-center gap-1.5 text-[#B9D6E6] font-semibold">
                <GraduationCap className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{t.credentials.educationBadge}</span>
              </span>
              <span className="text-[#A7B5C3]">{content.education.period}</span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#EEF4F8] leading-snug">
              {content.education.degree}
            </h3>
            <p className="text-xs label-condensed text-[#B4C2CF]">{content.education.institution}</p>
            <p className="text-xs sm:text-sm text-[#B4C2CF] leading-relaxed">
              {content.education.focus}
            </p>
          </article>

          {/* Certifications & Completed Programs: visually distinguished */}
          {content.certifications.map((cert, idx) => {
            const isCertification = cert.status === 'credential';
            const Icon = isCertification ? Award : BookOpen;
            return (
              <article
                key={cert.id}
                className={`space-y-2.5 lg:border-l lg:border-[#2E3644] lg:pl-7 ${
                  idx % 2 === 0 ? 'sm:border-l sm:border-[#2E3644] sm:pl-7' : ''
                } pt-6 sm:pt-0 border-t sm:border-t-0 border-[#2E3644]`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs label-condensed">
                  {isCertification ? (
                    <span className="inline-flex items-center gap-1.5 text-[#B9D6E6] font-semibold">
                      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{cert.kindLabel}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[#A7B5C3]">
                      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{cert.kindLabel}</span>
                    </span>
                  )}
                  <span className="text-[#A7B5C3]">{cert.issuer}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#EEF4F8] leading-snug">
                  {cert.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#B4C2CF] leading-relaxed">{cert.note}</p>
              </article>
            );
          })}

          {/* Currently Learning */}
          {content.learning.map((entry) => (
            <article
              key={entry.id}
              className="space-y-2.5 sm:border-l sm:border-[#2E3644] sm:pl-7 lg:pl-7 pt-6 sm:pt-0 border-t sm:border-t-0 border-[#2E3644]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs label-condensed">
                <span className="inline-flex items-center gap-1.5 text-[#B9D6E6] font-semibold">
                  <Compass className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{entry.status}</span>
                </span>
                <span className="text-[#A7B5C3]">{t.credentials.selfStudyBadge}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#EEF4F8] leading-snug">
                {entry.topic}
              </h3>
              <p className="text-xs sm:text-sm text-[#B4C2CF] leading-relaxed">{entry.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
