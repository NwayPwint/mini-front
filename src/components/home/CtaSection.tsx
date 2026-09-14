import { Link } from "react-router-dom";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { CtaSection as CtaSectionType } from "../../types/sanity";

interface CtaSectionProps {
  cta?: CtaSectionType;
  primaryIcon?: LucideIcon;
  primaryButtonClassName?: string;
  secondaryButtonClassName?: string;
}

export default function CtaSection({
  cta,
  primaryIcon: PrimaryIcon = ChevronRight,
  primaryButtonClassName = "bg-brand-gold hover:bg-brand-gold/90 text-brand-navy",
  secondaryButtonClassName = "border border-surface-border hover:bg-white text-text-main",
}: CtaSectionProps) {
  return (
    <section className="bg-surface-ghost">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold font-heading text-brand-navy mb-3">
          {cta?.title || "Ready to Start Your Journey?"}
        </h2>
        <p className="text-sm text-text-muted max-w-lg mx-auto mb-8">
          {cta?.subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to={cta?.primaryButtonLink || "/register"}
            className={`${primaryButtonClassName} px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors inline-flex items-center gap-2`}
          >
            {cta?.primaryButtonText || "Get Started"}
            <PrimaryIcon size={16} />
          </Link>
          <Link
            to={cta?.secondaryButtonLink || "/"}
            className={`${secondaryButtonClassName} px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors`}
          >
            {cta?.secondaryButtonText || "Browse Courses"}
          </Link>
        </div>
      </div>
    </section>
  );
}
