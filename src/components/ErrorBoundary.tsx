import React from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onResetView?: () => void;
  fallbackTitle?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

const ErrorFallback: React.FC<{
  fallbackTitle?: string;
  onRetry: () => void;
  onResetView?: () => void;
}> = ({ fallbackTitle, onRetry, onResetView }) => {
  const { t } = useI18n();

  return (
    <div
      role="alert"
      className="max-w-xl mx-auto my-12 p-6 rounded-2xl bg-[#12101F] border border-[#242138] text-[#F6F2E9] space-y-4 font-sans"
    >
      <h2 className="font-display text-xl font-bold text-[#F6F2E9]">
        {fallbackTitle || t.common.errorBoundaryTitle}
      </h2>
      <p className="text-sm text-[#CFCAC0] leading-relaxed">
        {t.common.errorBoundaryDescription}
      </p>
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 min-h-11 rounded-lg bg-[#A8C5FF] hover:bg-[#bfd5ff] text-[#191723] text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F2E9]"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t.common.retry}</span>
        </button>
        {onResetView && (
          <button
            type="button"
            onClick={onResetView}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-11 rounded-lg border border-[#242138] hover:border-[#A8C5FF]/60 text-[#F6F2E9] text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.accessibility.backToOverview}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          fallbackTitle={this.props.fallbackTitle}
          onRetry={this.handleRetry}
          onResetView={
            this.props.onResetView
              ? () => {
                  this.setState({ hasError: false });
                  this.props.onResetView?.();
                }
              : undefined
          }
        />
      );
    }

    return this.props.children;
  }
}
