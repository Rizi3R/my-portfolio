import React from 'react';
import { EDUCATION, CERTIFICATIONS, LEARNING_ENTRIES } from '../data/universeContent';
import { GraduationCap, Award, BookOpen, Compass } from 'lucide-react';

export const CredentialsSection: React.FC = () => {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="scroll-mt-20 bg-[#0A0913] text-[#F6F2E9] py-14 sm:py-16 border-b border-[#242138]"
    >
      <div id="education" className="scroll-mt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#242138] pb-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-[#A8C5FF]">
              Foundations &amp; Credentials
            </p>
            <h2
              id="credentials-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#F6F2E9] tracking-tight"
            >
              Education &amp; Credentials
            </h2>
          </div>
          <p className="text-sm text-[#CFCAC0] max-w-md leading-relaxed">
            Formal computer science diploma, cloud certification, completed training, and active automation study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Formal Education */}
          <article className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 text-[#A8C5FF]">
                <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Education</span>
              </span>
              <span className="text-[#9A94A8]">{EDUCATION.period}</span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#F6F2E9] leading-snug">
              {EDUCATION.degree}
            </h3>
            <p className="text-xs font-mono text-[#CFCAC0]">{EDUCATION.institution}</p>
            <p className="text-xs sm:text-sm text-[#CFCAC0] leading-relaxed">{EDUCATION.focus}</p>
          </article>

          {/* Certifications & Completed Programs */}
          {CERTIFICATIONS.map((cert) => {
            const Icon = cert.status === 'credential' ? Award : BookOpen;
            return (
              <article
                key={cert.id}
                className="space-y-2.5 md:border-l md:border-[#242138] md:pl-6 lg:pl-8 pt-6 md:pt-0 border-t md:border-t-0 border-[#242138]"
              >
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span className="inline-flex items-center gap-1.5 text-[#A8C5FF]">
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{cert.kindLabel}</span>
                  </span>
                  <span className="text-[#9A94A8]">{cert.issuer}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-[#F6F2E9] leading-snug">
                  {cert.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#CFCAC0] leading-relaxed">{cert.note}</p>
              </article>
            );
          })}

          {/* Currently Learning */}
          {LEARNING_ENTRIES.map((entry) => (
            <article
              key={entry.id}
              className="space-y-2.5 md:border-l md:border-[#242138] md:pl-6 lg:pl-8 pt-6 md:pt-0 border-t md:border-t-0 border-[#242138]"
            >
              <div className="flex items-center justify-between gap-2 text-xs font-mono">
                <span className="inline-flex items-center gap-1.5 text-[#F2A77D]">
                  <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{entry.status}</span>
                </span>
                <span className="text-[#9A94A8]">Self-study</span>
              </div>
              <h3 className="font-display text-lg font-bold text-[#F6F2E9] leading-snug">
                {entry.topic}
              </h3>
              <p className="text-xs sm:text-sm text-[#CFCAC0] leading-relaxed">{entry.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
