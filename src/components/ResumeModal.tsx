import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, Linkedin, MapPin, CheckCircle, Award, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION_DATA, CERTIFICATIONS, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white text-slate-900 rounded-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-6 resume-print-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Control Bar inside modal (hidden in print) */}
        <div className="sticky top-0 z-20 bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800 rounded-t-xl no-print">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-sky-400">
              Verified Technical Resume
            </span>
            <span className="text-slate-500 text-xs hidden sm:inline">·</span>
            <span className="text-xs text-slate-300 hidden sm:inline">
              ATS-Optimized Format
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-8 sm:p-12 space-y-8 font-sans text-slate-800">
          
          {/* Header */}
          <div className="border-b border-slate-200 pb-6">
            <h1 id="resume-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-1">
              {PERSONAL_INFO.fullName}
            </h1>
            <p className="text-sm font-semibold text-sky-700 tracking-wide uppercase mb-3">
              {PERSONAL_INFO.headline}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span>·</span>
              <span className="text-slate-600 font-medium">
                Phone: {PERSONAL_INFO.phone}
              </span>
              <span>·</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1 text-sky-700 hover:underline">
                <Mail className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <span>·</span>
              <a href={PERSONAL_INFO.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sky-700 hover:underline">
                <Linkedin className="w-3.5 h-3.5" />
                <span>linkedin.com/in/aries-razak-a36045256</span>
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {PERSONAL_INFO.shortBio}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-4">
              Professional Experience
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {exp.role}
                      </h3>
                      <span className="text-xs font-semibold text-slate-700">
                        {exp.company} — {exp.location}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-600 shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 italic">
                    {exp.overview}
                  </p>

                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                    {exp.responsibilities.slice(0, 4).map((r, i) => (
                      <li key={i} className="leading-relaxed">
                        <span className="-ml-1">{r}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-[11px] font-mono text-slate-600 pt-1">
                    <strong className="text-slate-800">Key Tools:</strong> {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Education
              </h2>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {EDUCATION_DATA.degree}
                </h3>
                <p className="text-xs text-slate-700 font-medium">
                  {EDUCATION_DATA.institution}
                </p>
                <span className="text-xs font-mono text-slate-500">
                  {EDUCATION_DATA.period} · {EDUCATION_DATA.location}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Certifications & Accreditations
              </h2>
              <ul className="space-y-2 text-xs text-slate-700">
                {CERTIFICATIONS.map((c) => (
                  <li key={c.name}>
                    <div className="flex items-baseline justify-between">
                      <strong className="font-semibold text-slate-900">{c.name}</strong>
                      <span className="text-[11px] font-mono text-slate-500">{c.dateOrStatus}</span>
                    </div>
                    <span className="text-slate-600 block">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Core Technical Competencies */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
              Technical Competencies Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900">Retail & Applications:</strong> Xilnex POS, Payment Gateways, UAT Testing, Promotion Setup.
              </div>
              <div>
                <strong className="text-slate-900">SaaS & Administration:</strong> Lark Super Admin, Microsoft 365, Google Workspace, TeamViewer.
              </div>
              <div>
                <strong className="text-slate-900">Networking & Physical:</strong> TCP/IP, LAN/Wi-Fi, RJ45 Termination, Cable Testing, Switch Ports.
              </div>
              <div>
                <strong className="text-slate-900">Data & Development:</strong> MySQL, SQL Queries, Laravel, Microsoft Excel Validation, Git Basics.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
