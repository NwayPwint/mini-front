import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-institutional flex items-center justify-center px-4 py-12">
      <div className="max-w-sm w-full text-center">
        <h1 className="text-6xl font-light font-heading text-brand-navy tracking-tight">
          404
        </h1>

        <div className="mt-4 mb-6 border-t border-surface-border" />

        <h2 className="text-lg font-medium text-text-main mb-2">
          Page Not Found
        </h2>

        <p className="text-text-muted text-sm leading-relaxed mb-10">
          The page you're looking for may have been removed, relocated, or is no longer available.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-brand-royal hover:bg-brand-royal-dark text-white font-medium py-2 px-6 rounded-custom-sm transition-all text-sm shadow-custom-sm"
        >
          Go to Homepage
        </Link>

        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-main text-sm transition-colors"
          >
            <ArrowLeft size={14} />
            Go Back
          </button>
        </div>

        <p className="text-xs text-text-muted mt-12">
          Learning Management System (LMS) © 2026. All rights reserved.
        </p>
      </div>
    </div>
  );
}
