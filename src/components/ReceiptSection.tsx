import React, { useState } from 'react';
import {
  PROFILE,
  EXPERIENCES,
  CERTIFICATIONS,
  EDUCATION,
  NODES,
  LEARNING_ENTRIES,
} from '../data/universeContent';
import { Copy, Check, Printer, ExternalLink, ShieldCheck, Mail, MapPin } from 'lucide-react';

export const ReceiptSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PROFILE.email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = PROFILE.email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setCopyFeedback('Email copied to clipboard: ' + PROFILE.email);
      setTimeout(() => {
        setCopied(false);
        setCopyFeedback('');
      }, 3000);
    } catch {
      setCopyFeedback('Direct copy failed. Email is: ' + PROFILE.email);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="receipt"
      aria-labelledby="receipt-heading"
      className="scroll-mt-20 relative py-20 px-4 sm:px-6 max-w-4xl mx-auto"
    >
      <div className="sr-only" aria-live="polite" role="status">
        {copyFeedback}
      </div>

      <div className="text-center mb-8 print:hidden">
        <p className="text-xs font-mono uppercase tracking-wider text-[#B0E0E6] mb-2">
          07. Printable Summary
        </p>
        <h2
          id="receipt-heading"
          className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight"
        >
          The Summary Receipt
        </h2>
        <p className="text-[#D1D5DB] text-sm max-w-xl mx-auto mt-2 leading-relaxed">
          Experience history, education, credentials, and direct contact info formatted as a printable receipt.
        </p>
      </div>

      {/* Quick Action Bar (Screen Only) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto mb-8 print:hidden">
        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#222226] hover:bg-[#2B2B30] text-white border border-[#323238] hover:border-[#B0E0E6]/50 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          aria-label="Copy Aries Razak email address to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
          ) : (
            <Copy className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
          )}
          <span>{copied ? 'Copied' : 'Copy Email'}</span>
        </button>

        <a
          href={PROFILE.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#222226] hover:bg-[#2B2B30] text-white border border-[#323238] hover:border-[#B0E0E6]/50 font-mono text-xs uppercase tracking-wider transition-colors"
          aria-label="Open LinkedIn profile in new tab"
        >
          <ExternalLink className="w-4 h-4 text-[#B0E0E6]" aria-hidden="true" />
          <span>LinkedIn</span>
        </a>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#DC343B] hover:bg-[#c52b31] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          aria-label="Print or save summary receipt as PDF"
        >
          <Printer className="w-4 h-4" aria-hidden="true" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Thermal Paper Container */}
      <div
        className="relative bg-[#F9F7F1] text-stone-900 border-x border-stone-400 shadow-2xl mx-auto max-w-2xl px-4 py-7 sm:px-10 sm:py-12 font-mono text-xs sm:text-sm selection:bg-stone-900 selection:text-white"
        style={{
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.75), 0 0 0 1px rgba(176,224,230,0.12)',
        }}
      >
        {/* Top Serrated Edge Pattern */}
        <div
          className="absolute -top-3 left-0 right-0 h-3 overflow-hidden select-none pointer-events-none print:hidden"
          style={{
            backgroundImage:
              'radial-gradient(circle, transparent, transparent 50%, #F9F7F1 50%, #F9F7F1 100%)',
            backgroundSize: '12px 12px',
          }}
          aria-hidden="true"
        />

        {/* Receipt Header */}
        <div className="text-center pb-6 border-b border-dashed border-stone-800/60">
          <div className="text-lg sm:text-xl font-bold tracking-widest uppercase mb-1">
            {PROFILE.fullName}
          </div>
          <div className="font-semibold text-stone-700 tracking-wider text-xs uppercase">
            {PROFILE.title}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-stone-700 mt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-stone-700" aria-hidden="true" />
              {PROFILE.location}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-stone-700" aria-hidden="true" />
              {PROFILE.email}
            </span>
          </div>
          <div className="mt-3 text-[11px] text-stone-600 uppercase tracking-widest">
            SUMMARY RECEIPT · APPLICATION SUPPORT &amp; IT OPERATIONS
          </div>
        </div>

        {/* Intro */}
        <div className="py-4 border-b border-dashed border-stone-800/60 text-stone-800 leading-relaxed text-center sm:text-left text-xs font-sans">
          {PROFILE.intro}
        </div>

        {/* Work History */}
        <div className="py-5 border-b border-dashed border-stone-800/60">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-stone-900 mb-4 pb-1 border-b border-stone-400">
            <span>WORK &amp; INTERNSHIP HISTORY</span>
            <span>PERIOD</span>
          </div>

          <div className="space-y-6">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="text-xs break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-stone-900 gap-1">
                  <span className="text-sm uppercase tracking-wide">
                    {exp.role}
                    {exp.isInternship ? ' (Internship)' : ''}
                  </span>
                  <span className="text-stone-700 font-mono text-[11px] uppercase">
                    {exp.period}
                  </span>
                </div>
                <div className="text-stone-700 font-semibold mb-2">
                  {exp.organization} · {exp.location}
                </div>

                <ul className="space-y-1.5 list-disc list-inside text-stone-800 pl-1">
                  {exp.highlights.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span className="font-sans font-normal text-stone-800 text-xs">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-2.5 flex flex-wrap gap-1.5 pt-1">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 bg-stone-200/80 text-stone-800 border border-stone-300 text-[10px] font-mono uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials & Education */}
        <div className="py-5 border-b border-dashed border-stone-800/60 break-inside-avoid">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 pb-1 border-b border-stone-400">
            <span>EDUCATION &amp; CREDENTIALS</span>
            <span>STATUS</span>
          </div>

          <div className="space-y-3">
            <div className="pb-2 border-b border-stone-300/80 flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-xs">
              <div>
                <div className="font-bold text-stone-900">{EDUCATION.degree}</div>
                <div className="text-stone-600 text-[11px]">
                  {EDUCATION.institution} · {EDUCATION.period}
                </div>
              </div>
              <span className="text-[11px] font-bold text-stone-800 bg-stone-200 px-2 py-0.5 self-start sm:self-auto uppercase">
                Diploma
              </span>
            </div>

            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-xs"
              >
                <div>
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone-700" aria-hidden="true" />
                    <span>{cert.name}</span>
                  </div>
                  <div className="text-stone-600 text-[11px]">{cert.issuer}</div>
                </div>
                <span className="text-[11px] font-bold text-stone-800 bg-stone-200 px-2 py-0.5 self-start sm:self-auto uppercase">
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Totals (Factual Counts Only) */}
        <div className="py-4 border-b border-dashed border-stone-800/60 font-mono text-xs break-inside-avoid">
          <div className="flex justify-between py-1">
            <span>WORK &amp; INTERNSHIP ENTRIES</span>
            <span className="font-bold">0{EXPERIENCES.length} ROLES</span>
          </div>
          <div className="flex justify-between py-1">
            <span>DOCUMENTED SKILLS</span>
            <span className="font-bold">{NODES.length} ITEMS</span>
          </div>
          <div className="flex justify-between py-1">
            <span>ACTIVE LEARNING</span>
            <span className="font-bold">{LEARNING_ENTRIES[0].topic}</span>
          </div>
        </div>

        {/* Barcode & Footer */}
        <div className="pt-6 pb-2 text-center">
          <div
            className="h-12 w-full max-w-sm mx-auto mb-2 opacity-85 select-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #1c1917 0px, #1c1917 2px, transparent 2px, transparent 4px, #1c1917 4px, #1c1917 5px, transparent 5px, transparent 8px, #1c1917 8px, #1c1917 11px, transparent 11px, transparent 13px, #1c1917 13px, #1c1917 15px, transparent 15px, transparent 17px)',
            }}
            aria-hidden="true"
          />
          <div className="text-[11px] tracking-widest text-stone-700 font-mono">
            ARIES RAZAK · PORTFOLIO RECEIPT
          </div>
        </div>

        {/* Bottom Serrated Edge Pattern */}
        <div
          className="absolute -bottom-3 left-0 right-0 h-3 overflow-hidden select-none pointer-events-none print:hidden"
          style={{
            backgroundImage:
              'radial-gradient(circle, transparent, transparent 50%, #F9F7F1 50%, #F9F7F1 100%)',
            backgroundSize: '12px 12px',
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
};
