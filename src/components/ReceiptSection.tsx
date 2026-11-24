import React, { useState } from 'react';
import { PROFILE } from '../data/universeContent';
import { useI18n } from '../i18n';
import { Copy, Check, Printer, ExternalLink, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { copyTextToClipboard } from '../utils/clipboard';

export const ReceiptSection: React.FC = () => {
  const { t, content, format } = useI18n();
  const [copied, setCopied] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');

  const handleCopyEmail = async () => {
    const ok = await copyTextToClipboard(PROFILE.email);
    if (ok) {
      setCopied(true);
      setCopyFeedback(format(t.receipt.copySuccess, { email: PROFILE.email }));
      setTimeout(() => {
        setCopied(false);
        setCopyFeedback('');
      }, 3000);
    } else {
      setCopied(false);
      setCopyFeedback(format(t.receipt.copyFailed, { email: PROFILE.email }));
      setTimeout(() => setCopyFeedback(''), 3500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const firstLearningTopic = content.learning[0]?.topic ?? '';

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
        <p className="text-xs font-mono uppercase tracking-wider text-[#B9D6E6] mb-2">
          {t.receipt.eyebrow}
        </p>
        <h2
          id="receipt-heading"
          className="font-display text-3xl sm:text-4xl font-bold text-[#EEF4F8] tracking-tight"
        >
          {t.receipt.heading}
        </h2>
        <p className="text-[#B4C2CF] text-sm max-w-xl mx-auto mt-2 leading-relaxed">
          {t.receipt.intro}
        </p>
      </div>

      {/* Quick Action Bar (Screen Only) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto mb-8 print:hidden">
        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#1B2029] hover:bg-[#232935] text-[#EEF4F8] border border-[#2E3644] hover:border-[#B9D6E6]/50 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          aria-label={t.receipt.copyEmailAria}
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#B9D6E6]" aria-hidden="true" />
          ) : (
            <Copy className="w-4 h-4 text-[#B9D6E6]" aria-hidden="true" />
          )}
          <span>{copied ? t.receipt.copied : t.receipt.copyEmail}</span>
        </button>

        <a
          href={PROFILE.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#1B2029] hover:bg-[#232935] text-[#EEF4F8] border border-[#2E3644] hover:border-[#B9D6E6]/50 font-mono text-xs uppercase tracking-wider transition-colors"
          aria-label={t.receipt.linkedInAria}
        >
          <ExternalLink className="w-4 h-4 text-[#B9D6E6]" aria-hidden="true" />
          <span>{t.receipt.linkedIn}</span>
        </a>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#B9D6E6] hover:bg-[#cfe3ee] text-[#13161C] font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          aria-label={t.receipt.printAria}
        >
          <Printer className="w-4 h-4" aria-hidden="true" />
          <span>{t.receipt.printSavePdf}</span>
        </button>
      </div>

      {/* Warm Ivory Paper Container */}
      <div
        className="relative bg-[#EEF4F8] text-[#13161C] border-x border-[#C9D6DF] shadow-2xl mx-auto max-w-2xl px-4 py-7 sm:px-10 sm:py-12 font-mono text-xs sm:text-sm selection:bg-[#13161C] selection:text-[#EEF4F8]"
        style={{
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.75)',
        }}
      >
        {/* Top Serrated Edge Pattern */}
        <div
          className="absolute -top-3 left-0 right-0 h-3 overflow-hidden select-none pointer-events-none print:hidden"
          style={{
            backgroundImage:
              'radial-gradient(circle, transparent, transparent 50%, #EEF4F8 50%, #EEF4F8 100%)',
            backgroundSize: '12px 12px',
          }}
          aria-hidden="true"
        />

        {/* Receipt Header */}
        <div className="text-center pb-6 border-b border-dashed border-[#13161C]/40">
          <div className="text-lg sm:text-xl font-bold tracking-widest uppercase mb-1">
            {PROFILE.fullName}
          </div>
          <div className="font-semibold text-[#3E4A5A] tracking-wider text-xs uppercase">
            {content.profile.title}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#3E4A5A] mt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#3E4A5A]" aria-hidden="true" />
              {content.profile.location}
            </span>
            <span className="flex items-center gap-1 break-all sm:break-normal">
              <Mail className="w-3 h-3 text-[#3E4A5A] shrink-0" aria-hidden="true" />
              <span>{PROFILE.email}</span>
            </span>
          </div>
          <div className="mt-3 text-[11px] text-[#3E4A5A] uppercase tracking-widest">
            {t.receipt.subtitleBanner}
          </div>
        </div>

        {/* Intro */}
        <div className="py-4 border-b border-dashed border-[#13161C]/40 text-[#13161C] leading-relaxed text-center sm:text-left text-xs font-sans">
          {content.profile.resumeSummary}
        </div>

        {/* Work History */}
        <div className="py-5 border-b border-dashed border-[#13161C]/40">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#13161C] mb-4 pb-1 border-b border-[#C9D6DF]">
            <span>{t.receipt.workHistoryCol}</span>
            <span>{t.receipt.periodCol}</span>
          </div>

          <div className="space-y-6">
            {content.experiences.map((exp) => (
              <div key={exp.id} className="text-xs break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-[#13161C] gap-1">
                  <span className="text-sm uppercase tracking-wide">{exp.role}</span>
                  <span className="text-[#3E4A5A] font-mono text-[11px] uppercase">
                    {exp.period}
                  </span>
                </div>
                <div className="text-[#3E4A5A] font-semibold mb-2">
                  {exp.organization} · {exp.location}
                </div>

                <ul className="space-y-1.5 list-disc pl-5 text-[#13161C]">
                  {exp.highlights.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span className="font-sans font-normal text-[#13161C] text-xs">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-2.5 flex flex-wrap gap-1.5 pt-1">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 bg-[#DCEBF3] text-[#13161C] border border-[#C9D6DF] text-[10px] font-mono uppercase"
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
        <div className="py-5 border-b border-dashed border-[#13161C]/40 break-inside-avoid">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#13161C] mb-3 pb-1 border-b border-[#C9D6DF]">
            <span>{t.receipt.educationCol}</span>
            <span>{t.receipt.statusCol}</span>
          </div>

          <div className="space-y-3">
            <div className="pb-2 border-b border-[#C9D6DF] flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-xs">
              <div>
                <div className="font-bold text-[#13161C]">{content.education.degree}</div>
                <div className="text-[#3E4A5A] text-[11px]">
                  {content.education.institution} · {content.education.period}
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#13161C] bg-[#DCEBF3] px-2 py-0.5 self-start sm:self-auto uppercase">
                {t.receipt.diplomaBadge}
              </span>
            </div>

            {content.certifications.map((cert) => {
              const statusLabel =
                cert.status === 'credential'
                  ? t.receipt.credentialStatusBadge
                  : t.receipt.completedStatusBadge;
              return (
                <div
                  key={cert.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-xs"
                >
                  <div>
                    <div className="font-bold text-[#13161C] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#3E4A5A]" aria-hidden="true" />
                      <span>{cert.name}</span>
                    </div>
                    <div className="text-[#3E4A5A] text-[11px]">{cert.issuer}</div>
                  </div>
                  <span className="text-[11px] font-bold text-[#13161C] bg-[#DCEBF3] px-2 py-0.5 self-start sm:self-auto uppercase">
                    {statusLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Totals */}
        <div className="py-4 border-b border-dashed border-[#13161C]/40 font-mono text-xs break-inside-avoid">
          <div className="flex justify-between py-1">
            <span>{t.receipt.totalRolesLabel}</span>
            <span className="font-bold">
              {format(t.receipt.rolesUnit, { count: content.experiences.length })}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span>{t.receipt.totalSkillsLabel}</span>
            <span className="font-bold">
              {format(t.receipt.itemsUnit, { count: content.nodes.length })}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span>{t.receipt.activeLearningLabel}</span>
            <span className="font-bold">{firstLearningTopic}</span>
          </div>
        </div>

        {/* Barcode & Footer */}
        <div className="pt-6 pb-2 text-center">
          <div
            className="h-12 w-full max-w-sm mx-auto mb-2 opacity-85 select-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, #13161C 0px, #13161C 2px, transparent 2px, transparent 4px, #13161C 4px, #13161C 5px, transparent 5px, transparent 8px, #13161C 8px, #13161C 11px, transparent 11px, transparent 13px, #13161C 13px, #13161C 15px, transparent 15px, transparent 17px)',
            }}
            aria-hidden="true"
          />
          <div className="text-[11px] tracking-widest text-[#3E4A5A] font-mono">
            {t.receipt.barcodeFooter}
          </div>
        </div>

        {/* Bottom Serrated Edge Pattern */}
        <div
          className="absolute -bottom-3 left-0 right-0 h-3 overflow-hidden select-none pointer-events-none print:hidden"
          style={{
            backgroundImage:
              'radial-gradient(circle, transparent, transparent 50%, #EEF4F8 50%, #EEF4F8 100%)',
            backgroundSize: '12px 12px',
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
};
