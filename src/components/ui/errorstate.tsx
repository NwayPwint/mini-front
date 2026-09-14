import { RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({
  message = 'Something went wrong while loading this page.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-status-error/10 flex items-center justify-center mx-auto mb-5">
          <span className="text-2xl">!</span>
        </div>
        <h2 className="text-lg font-semibold font-heading text-brand-navy mb-2">
          Unable to Load Content
        </h2>
        <p className="text-sm text-text-muted leading-relaxed mb-6">
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-brand-royal hover:bg-brand-royal-dark text-white px-5 py-2 rounded-custom-sm text-sm font-medium transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
