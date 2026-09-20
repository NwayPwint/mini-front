interface Partner {
  name?: string;
  abbr?: string;
}

interface PartnerGridProps {
  partners: Partner[];
}

export default function PartnerGrid({ partners }: PartnerGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {partners.map((partner, i) => (
        <div
          key={partner.name || `partner-${i}`}
          className="bg-white border border-surface-border rounded-custom-md p-5 flex items-center justify-center hover:shadow-custom-sm transition-all group cursor-default"
          title={partner.name || partner.abbr}
        >
          <span className="text-sm font-semibold text-text-muted group-hover:text-brand-royal transition-colors text-center leading-tight">
            {partner.abbr || partner.name}
          </span>
        </div>
      ))}
    </div>
  );
}
