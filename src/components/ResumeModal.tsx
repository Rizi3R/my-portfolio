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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto resume-print-overlay"
      onClick={onClose}
    >
      <div
        className="bg-white text-stone-900 rounded-xl border border-[#323238] max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-6 resume-print-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Control Bar inside modal (hidden in print) */}
        <div className="sticky top-0 z-20 bg-[#1B1B1D] text-white px-6 py-3.5 flex items-center justify-between border-b border-[#323238] no-print font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#B0E0E6]">Résumé</span>
            <span className="text-[#4B5563]">·</span>
            <span className="text-[#D1D5DB] hidden sm:inline">Selectable &amp; Printable View</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#DC343B] hover:bg-[#c52b31] text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Print / Save PDF</span>
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close résumé viewer"
              className="p-2 rounded-lg text-[#D1D5DB] hover:text-white border border-[#323238] hover:border-[#B0E0E6]/50 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0E0E6]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Selectable Résumé Content */}
        <div className="p-6 sm:p-10 space-y-7 font-sans text-stone-800 select-text">
          {/* Header */}
          <div className="border-b border-stone-300 pb-5">
            <h1
              id="resume-modal-title"
              className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-stone-950 mb-1"
            >
              {PROFILE.fullName}
            </h1>
            <p className="text-xs font-mono font-semibold text-stone-600 mb-2">
              {PROFILE.displayName}
            </p>
            <p className="text-sm font-semibold font-mono text-[#B91C1C] tracking-wide uppercase mb-3">
              {PROFILE.title}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-700 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-600" aria-hidden="true" />
                <span>{PROFILE.location}</span>
              </span>
              <span aria-hidden="true">·</span>
              <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-1 text-stone-900 underline">
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{PROFILE.email}</span>
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={PROFILE.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-stone-900 underline"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1 mb-2">
              Summary
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">{PROFILE.intro}</p>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1 mb-4">
              Experience
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-1.5 break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-sm font-bold font-mono text-stone-950">
                        {exp.role}
                        {exp.isInternship ? ' (Internship)' : ''}
                      </h3>
                      <span className="text-xs font-semibold text-stone-700">
                        {exp.organization} · {exp.location}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-stone-600 shrink-0 uppercase font-semibold">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="list-disc list-inside text-xs text-stone-800 space-y-1 pl-1">
                    {exp.highlights.map((b, i) => (
                      <li key={i} className="leading-relaxed">
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-[11px] font-mono text-stone-600 pt-1">
                    <strong className="text-stone-900">Tools &amp; Scope:</strong>{' '}
                    {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 break-inside-avoid">
            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold font-mono text-stone-900">
                  {EDUCATION.degree}
                </h3>
                <p className="text-xs text-stone-700 font-medium">{EDUCATION.institution}</p>
                <span className="text-xs font-mono text-stone-600 block">
                  {EDUCATION.period}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1 mb-3">
                Credentials &amp; Learning
              </h2>
              <ul className="space-y-2.5 text-xs text-stone-700">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.id}>
                    <div className="flex items-baseline justify-between gap-2">
                      <strong className="font-semibold text-stone-900">{c.name}</strong>
                      <span className="text-[11px] font-mono text-stone-700 uppercase font-bold shrink-0">
                        {c.status}
                      </span>
                    </div>
                    <span className="text-stone-600 block text-[11px]">{c.issuer}</span>
                  </li>
                ))}
                {LEARNING_ENTRIES.map((l) => (
                  <li key={l.id}>
                    <div className="flex items-baseline justify-between gap-2">
                      <strong className="font-semibold text-stone-900">{l.topic}</strong>
                      <span className="text-[11px] font-mono text-stone-700 uppercase font-bold shrink-0">
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
