import type { ComponentType } from "react";

type CardIcon = ComponentType<{
  size?: number | string;
  strokeWidth?: number | string;
}>;

interface FeatureCardProps {
  icon: CardIcon;
  title: string;
  description: string;
  variant?: "light" | "dark";
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  variant = "light",
}: FeatureCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`p-6 rounded-custom-lg border transition-all duration-200 group ${
        isDark
          ? "bg-white/5 border-white/10 hover:bg-white/10"
          : "bg-white border-surface-border hover:shadow-custom-md"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-custom-md flex items-center justify-center mb-4 transition-colors ${
          isDark
            ? "bg-brand-gold/20 text-brand-gold"
            : "bg-brand-royal/5 text-brand-royal group-hover:bg-brand-royal/10"
        }`}
      >
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <h3
        className={`text-base font-semibold mb-2 ${
          isDark ? "text-white" : "text-brand-navy"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed ${
          isDark ? "text-white/60" : "text-text-muted"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
