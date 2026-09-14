import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface AuthLayoutProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  icon: Icon,
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-custom-lg shadow-custom-lg border border-surface-border overflow-hidden auth-card">
          <div className="h-1.5 auth-gradient" />
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-9 h-9 rounded-full auth-icon flex items-center justify-center">
                <Icon size={18} className="text-brand-royal" />
              </div>
              <h1 className="text-lg font-semibold font-heading text-brand-navy">
                {title}
              </h1>
            </div>
            <p className="text-center text-xs text-text-muted mb-5">
              {subtitle}
            </p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
