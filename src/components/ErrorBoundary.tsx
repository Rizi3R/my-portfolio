import React from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onResetView?: () => void;
  fallbackTitle?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

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
        <div
          role="alert"
          className="max-w-xl mx-auto my-12 p-6 rounded-2xl bg-[#12101F] border border-[#242138] text-[#F6F2E9] space-y-4 font-sans"
        >
          <h2 className="font-display text-xl font-bold text-[#F6F2E9]">
            {this.props.fallbackTitle || 'Unable to load this section'}
          </h2>
          <p className="text-sm text-[#CFCAC0] leading-relaxed">
            An unexpected error interrupted loading this view. You can retry loading it or return to the main overview.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg bg-[#A8C5FF] hover:bg-[#bfd5ff] text-[#191723] text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F2E9]"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Retry</span>
            </button>
            {this.props.onResetView && (
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false });
                  this.props.onResetView?.();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg border border-[#242138] hover:border-[#A8C5FF]/60 text-[#F6F2E9] text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8C5FF]"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to Overview</span>
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
