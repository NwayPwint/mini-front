import { Link } from "react-router-dom";
import { ChevronRight, Clock, Award } from "lucide-react";
import { SectionHeader, FeatureCard, CtaSection } from "../../components/home";
import DynamicIcon from "../../components/ui/DynamicIcon";
import PageSkeleton from "../../components/ui/PageSkeleton";
import ErrorState from "../../components/ui/ErrorState";
import { useProgramsPage } from "../../hooks/useProgramsPage";

export default function Programs() {
  const { data, loading, error, refetch } = useProgramsPage();

  if (loading) return <PageSkeleton />;
  if (error || !data) return <ErrorState message={error || "No content available."} onRetry={refetch} />;

  const hero = data.hero;
  const programTracks = data.programTracks || [];
  const programHighlights = data.programHighlights || [];
  const cta = data.cta;

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold block mb-4">
                {hero?.eyebrow || "Structured Pathways"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-navy leading-[1.15] mb-5">
                {hero?.title || "Programs Designed for Your Goals"}
              </h1>
              <p className="text-base text-text-muted leading-relaxed max-w-lg mb-8">
                {hero?.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={hero?.primaryButton?.link || "#tracks"}
                  className="bg-brand-royal hover:bg-brand-royal-dark text-white px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  {hero?.primaryButton?.text || "View Programs"}
                  <ChevronRight size={16} />
                </a>
                <Link
                  to={hero?.secondaryButton?.link || "/register"}
                  className="border border-surface-border hover:bg-surface-ghost text-text-main px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors"
                >
                  {hero?.secondaryButton?.text || "Apply Now"}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {programTracks.map((track, i) => (
                <div
                  key={i}
                  className="bg-white/80 border border-surface-border rounded-custom-md p-4 flex items-center gap-3 hover:shadow-custom-sm transition-all"
                >
                  <div className="w-9 h-9 rounded-custom-sm bg-brand-royal/5 text-brand-royal flex items-center justify-center flex-shrink-0">
                    <DynamicIcon name={track.icon} size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand-navy block leading-tight">{track.title}</span>
                    <span className="text-[10px] text-text-muted">{track.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Program Tracks ── */}
      <section id="tracks" className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Choose Your Path"
            title="Program Tracks"
            subtitle="Select the program type that aligns with your career goals and available time."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {programTracks.map((track, i) => (
              <div
                key={i}
                className="bg-white rounded-custom-lg border border-surface-border p-6 hover:shadow-custom-md transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-custom-md bg-brand-royal/5 text-brand-royal flex items-center justify-center group-hover:bg-brand-royal/10 transition-colors flex-shrink-0">
                    <DynamicIcon name={track.icon} size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-brand-navy mb-1">
                      {track.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {track.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-surface-border text-xs text-text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {track.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Award size={12} /> {track.outcome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Program Highlights ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Why Our Programs"
            title="What Sets Us Apart"
            subtitle="Designed for outcomes, not just hours — every program is built to advance your career."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programHighlights.map((item, i) => (
              <FeatureCard
                key={i}
                icon={() => <DynamicIcon name={item.icon} />}
                title={item.title || ""}
                description={item.description || ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaSection cta={cta} />
    </>
  );
}
