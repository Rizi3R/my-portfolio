import React, { useEffect, useRef } from 'react';
import { X, Printer } from 'lucide-react';
import { ResumeDocument } from './ResumeDocument';
import { useDialogFocusTrap } from '../utils/useDialogFocusTrap';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useDialogFocusTrap(sheetRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
        ref={sheetRef}
        className="bg-white text-[#191723] rounded-xl border border-[#242138] max-w-4xl w-full max-h-[calc(100dvh-1rem)] sm:max-h-[90dvh] flex flex-col overflow-hidden shadow-2xl relative resume-print-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pinned Control Bar inside modal (always reachable while scrolling on mobile; hidden in print) */}
        <div className="shrink-0 z-20 bg-[#0A0913] text-[#F6F2E9] px-4 sm:px-6 py-3 flex items-center justify-between gap-2 border-b border-[#242138] no-print font-mono text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-[#A8C5FF]">Résumé</span>
            <span className="text-[#B5B0C2] hidden sm:inline">·</span>
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
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-8 md:p-10 resume-print-body">
          <ResumeDocument headingId="resume-modal-title" headingAs="h2" />
        </div>
      </div>
    </div>
  );
};
