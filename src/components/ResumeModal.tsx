import React, { useEffect, useRef } from 'react';
import { X, Printer, Mail, MapPin } from 'lucide-react';
import { LinkedInIcon } from './LinkedInIcon';
import {
  PROFILE,
  EXPERIENCES,
  CERTIFICATIONS,
  EDUCATION,
  LEARNING_ENTRIES,
} from '../data/universeContent';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 40);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-6 bg-[#0A0913]/88 backdrop-blur-md resume-print-overlay"
      onClick={onClose}
    >
      <div
        className="bg-white text-[#191723] rounded-xl border border-[#242138] max-w-4xl w-full max-h-[calc(100dvh-1rem)] sm:max-h-[90dvh] flex flex-col overflow-hidden shadow-2xl relative resume-print-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Control Bar inside modal (always reachable while scrolling on mobile; hidden in print) */}
        <div className="shrink-0 z-20 bg-[#0A0913] text-[#F6F2E9] px-4 sm:px-6 py-3 flex items-center justify-between gap-2 border-b border-[#242138] no-print font-mono text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-[#A8C5FF]">Résumé</span>
            <span className="text-[#524E66] hidden sm:inline">·</span>
            <span className="text-[#CFCAC0] hidden sm:inline">Selectable &amp; Printable View</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold bg-[#A8C5FF] hover:bg-[#bfd5ff] text-[#191723] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F2E9]"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Print / Save PDF</span>
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close résumé viewer"
              className="p-2 rounded-lg text-[#CFCAC0] hover:text-[#F6F2E9] border border-[#242138] hover:border-[#A8C5FF]/50 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Selectable & Scrollable Résumé Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-7 font-sans text-[#191723] select-text resume-print-body">
          {/* Header */}
          <div className="border-b border-[#DDD6C7] pb-5">
            <h1
              id="resume-modal-title"
              className="text-xl sm:text-3xl font-bold font-display tracking-tight text-[#191723] mb-1"
            >
              {PROFILE.fullName}
            </h1>
            <p className="text-xs font-mono font-semibold text-[#474457] mb-2">
              {PROFILE.displayName}
            </p>
            <p className="text-xs sm:text-sm font-semibold font-mono text-[#191723] tracking-wide uppercase mb-3">
              {PROFILE.title}
            </p>

            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs text-[#474457] font-mono break-words">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#474457] shrink-0" aria-hidden="true" />
                <span>{PROFILE.location}</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-1 text-[#191723] underline break-all sm:break-normal"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{PROFILE.email}</span>
              </a>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <a
                href={PROFILE.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#191723] underline"
              >
                <LinkedInIcon className="w-3.5 h-3.5 shrink-0" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Summary */}
          <div className="break-inside-avoid">
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-[#191723] border-b border-[#DDD6C7] pb-1 mb-2 break-after-avoid">
              Summary
            </h2>
            <p className="text-xs sm:text-sm text-[#474457] leading-relaxed">
              {PROFILE.resumeSummary}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-[#191723] border-b border-[#DDD6C7] pb-1 mb-4 break-after-avoid">
              Experience
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-1.5 break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-sm font-bold font-mono text-[#191723] break-after-avoid">
                        {exp.role}
                        {exp.isInternship ? ' (Internship)' : ''}
                      </h3>
                      <span className="text-xs font-semibold text-[#474457]">
                        {exp.organization} · {exp.location}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#474457] shrink-0 uppercase font-semibold">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="list-disc pl-4 text-xs text-[#191723] space-y-1.5">
                    {exp.highlights.map((b, i) => (
                      <li key={i} className="leading-relaxed">
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-[11px] font-mono text-[#474457] pt-1">
                    <strong className="text-[#191723]">Tools &amp; Scope:</strong>{' '}
                    {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 break-inside-avoid">
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-[#191723] border-b border-[#DDD6C7] pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold font-mono text-[#191723]">
                  {EDUCATION.degree}
                </h3>
                <p className="text-xs text-[#474457] font-medium">{EDUCATION.institution}</p>
                <span className="text-xs font-mono text-[#474457] block">
                  {EDUCATION.period}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-[#191723] border-b border-[#DDD6C7] pb-1 mb-3">
                Credentials &amp; Learning
              </h2>
              <ul className="space-y-2.5 text-xs text-[#474457]">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.id}>
                    <div className="flex items-baseline justify-between gap-2">
                      <strong className="font-semibold text-[#191723]">{c.name}</strong>
                      <span className="text-[11px] font-mono text-[#474457] uppercase font-bold shrink-0">
                        {c.status}
                      </span>
                    </div>
                    <span className="text-[#474457] block text-[11px]">{c.issuer}</span>
                  </li>
                ))}
                {LEARNING_ENTRIES.map((l) => (
                  <li key={l.id}>
                    <div className="flex items-baseline justify-between gap-2">
                      <strong className="font-semibold text-[#191723]">{l.topic}</strong>
                      <span className="text-[11px] font-mono text-[#474457] uppercase font-bold shrink-0">
                        {l.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
