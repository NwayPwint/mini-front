import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SectionHeader, FeatureCard, PartnerGrid, CtaSection, CheckpointList } from "../../components/home";
import DynamicIcon from "../../components/ui/DynamicIcon";
import PageSkeleton from "../../components/ui/PageSkeleton";
import ErrorState from "../../components/ui/ErrorState";
import { useBusinessPage } from "../../hooks/useBusinessPage";

export default function Business() {
  const { data, loading, error, refetch } = useBusinessPage();

  if (loading) return <PageSkeleton />;
  if (error || !data) return <ErrorState message={error || "No content available."} onRetry={refetch} />;

  const hero = data.hero;
  const trainingSolutions = data.trainingSolutions || [];
  const whyPartner = data.whyPartner || [];
  const enterpriseFeatures = data.enterpriseFeatures || [];
  const partners = data.partners || [];
  const cta = data.cta;

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold block mb-4">
                {hero?.eyebrow || "For Business"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-navy leading-[1.15] mb-5">
                {hero?.title || "Transform Your Workforce with Enterprise Training"}
              </h1>
              <p className="text-base text-text-muted leading-relaxed max-w-lg mb-8">
                {hero?.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={hero?.primaryButton?.link || "/register"}
                  className="bg-brand-royal hover:bg-brand-royal-dark text-white px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  {hero?.primaryButton?.text || "Partner With Us"}
                  <ChevronRight size={16} />
                </Link>
                <Link
                  to={hero?.secondaryButton?.link || "/register"}
                  className="border border-surface-border hover:bg-surface-ghost text-text-main px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors"
                >
                  {hero?.secondaryButton?.text || "Request Enterprise Demo"}
                </Link>
              </div>
            </div>

            <CheckpointList points={hero?.checkPoints} />
          </div>
        </div>
      </section>

      {/* ── Corporate Training Solutions ── */}
      <section className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="What We Offer"
            title="Corporate Training Solutions"
            subtitle="Specialized programs designed to build capable, compliant, and competitive teams."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trainingSolutions.map((sol, i) => (
              <FeatureCard
                key={i}
                icon={() => <DynamicIcon name={sol.icon} />}
                title={sol.title || ""}
                description={sol.description || ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Partner With Us ── */}
      <section className="bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="The Advantage"
            title="Why Partner With Us?"
            subtitle="We deliver more than courses — we build training infrastructure that scales with your organization."
            align="center"
          />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyPartner.map((item, i) => (
              <FeatureCard
                key={i}
                icon={() => <DynamicIcon name={item.icon} />}
                title={item.title || ""}
                description={item.description || ""}
                variant="dark"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Enterprise LMS Features ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Platform Capabilities"
            title="Enterprise LMS Features"
            subtitle="Powerful tools to manage, track, and optimize your organization's learning programs."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {enterpriseFeatures.map((feat, i) => (
              <FeatureCard
                key={i}
                icon={() => <DynamicIcon name={feat.icon} />}
                title={feat.title || ""}
                description={feat.description || ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Logos ── */}
      <section className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Trusted By"
            title="Our Corporate Partners"
            subtitle="Leading financial institutions and organizations trust us to train their teams."
            align="center"
          />
          <div className="mt-8">
            <PartnerGrid partners={partners} />
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <CtaSection cta={cta} />
    </>
  );
}
