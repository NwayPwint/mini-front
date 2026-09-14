interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold block mb-3">
        {eyebrow}
      </span>
      <h2 className="text-2xl md:text-3xl font-semibold font-heading text-brand-navy leading-tight">
        {title}
      </h2>
      <div
        className={`w-5 h-[1.5px] bg-brand-gold mt-4 mb-4 ${align === "center" ? "mx-auto" : ""}`}
      />
      {subtitle && (
        <p className="text-sm text-text-muted leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
