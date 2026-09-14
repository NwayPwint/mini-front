import { Link } from "react-router-dom";
import { Search, Download, Eye, Bookmark, BookOpen, Video, FileText, Headphones } from "lucide-react";
import { SectionHeader, StatBlock, CtaSection } from "../../components/home";
import DynamicIcon from "../../components/ui/DynamicIcon";
import PageSkeleton from "../../components/ui/PageSkeleton";
import ErrorState from "../../components/ui/ErrorState";
import { useDigitalLibraryPage } from "../../hooks/useDigitalLibraryPage";

const typeIcons: Record<string, typeof BookOpen> = {
  "E-Book": BookOpen,
  Video: Video,
  "Practice Test": FileText,
  Audio: Headphones,
};

const typeColors: Record<string, string> = {
  "E-Book": "bg-brand-royal/5 text-brand-royal",
  Video: "bg-status-error/10 text-status-error",
  "Practice Test": "bg-status-success/10 text-status-success",
  Audio: "bg-brand-gold/10 text-brand-gold",
};

export default function DigitalLibrary() {
  const { data, loading, error, refetch } = useDigitalLibraryPage();

  if (loading) return <PageSkeleton />;
  if (error || !data) return <ErrorState message={error || "No content available."} onRetry={refetch} />;

  const hero = data.hero;
  const resourceCategories = data.resourceCategories || [];
  const featuredResources = data.featuredResources || [];
  const cta = data.cta;

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold block mb-4">
              {hero?.eyebrow || "Knowledge Repository"}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-navy leading-[1.15] mb-5">
              {hero?.title || "Your Digital Learning Library"}
            </h1>
            <p className="text-base text-text-muted leading-relaxed mb-8">
              {hero?.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <a
                href={hero?.primaryButton?.link || "#resources"}
                className="bg-brand-royal hover:bg-brand-royal-dark text-white px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors inline-flex items-center gap-2"
              >
                <Search size={16} />
                {hero?.primaryButton?.text || "Search Resources"}
              </a>
              <Link
                to={hero?.secondaryButton?.link || "/register"}
                className="border border-surface-border hover:bg-surface-ghost text-text-main px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors"
              >
                {hero?.secondaryButton?.text || "Create Account"}
              </Link>
            </div>
          </div>
          <div className="flex justify-center gap-12 md:gap-20">
            {hero?.statBlocks?.map((stat, i) => (
              <StatBlock key={i} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Resource Categories ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Browse by Type"
            title="Resource Categories"
            subtitle="Find the format that works best for your learning style."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {resourceCategories.map((cat, i) => (
              <div
                key={i}
                className="bg-surface-ghost rounded-custom-lg border border-surface-border p-6 hover:shadow-custom-sm hover:border-brand-royal/30 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-custom-md bg-brand-royal/5 text-brand-royal flex items-center justify-center mb-4 group-hover:bg-brand-royal/10 transition-colors">
                  <DynamicIcon name={cat.icon} size={20} />
                </div>
                <h3 className="text-base font-semibold text-brand-navy mb-2">
                  {cat.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-3">
                  {cat.description}
                </p>
                <span className="text-xs font-medium text-brand-royal">
                  {cat.count} resources
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Resources ── */}
      <section id="resources" className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Featured"
            title="Popular Resources"
            subtitle="Explore our most accessed and highest-rated learning materials."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredResources.map((res, i) => {
              const Icon = typeIcons[res.type || ""] || BookOpen;
              return (
                <div
                  key={i}
                  className="bg-white rounded-custom-lg border border-surface-border p-5 hover:shadow-custom-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-8 h-8 rounded-custom-sm flex items-center justify-center ${typeColors[res.type || ""] || ""}`}>
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                    <button className="text-text-muted hover:text-brand-gold transition-colors cursor-pointer">
                      <Bookmark size={16} />
                    </button>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted block mb-1">
                    {res.type}
                  </span>
                  <h3 className="text-sm font-semibold text-brand-navy leading-snug mb-2">
                    {res.title}
                  </h3>
                  <p className="text-xs text-text-muted mb-3">{res.author}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-surface-border text-xs text-text-muted">
                    <span>{res.format} · {res.pages}</span>
                    <span className="inline-flex items-center gap-1 text-brand-royal font-medium">
                      <Eye size={12} /> View
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaSection cta={cta} primaryIcon={Download} />
    </>
  );
}
