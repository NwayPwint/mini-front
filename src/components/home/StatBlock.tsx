interface StatBlockProps {
  value: string;
  label: string;
}

export default function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div className="text-left">
      <span className="text-3xl md:text-4xl font-bold font-heading text-brand-royal block leading-none">
        {value}
      </span>
      <span className="text-xs text-text-muted mt-1 block">{label}</span>
    </div>
  );
}
