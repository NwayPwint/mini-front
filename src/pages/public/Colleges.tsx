import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SectionHeader, FeatureCard, PartnerGrid, CtaSection, CheckpointList, StepCard } from "../../components/home";
import DynamicIcon from "../../components/ui/DynamicIcon";
import PageSkeleton from "../../components/ui/PageSkeleton";
import ErrorState from "../../components/ui/ErrorState";
import { useCollegesPage } from "../../hooks/useCollegesPage";

export default function Colleges() {
  const { data, loading, error, refetch } = useCollegesPage();

  if (loading) return <PageSkeleton />;
  if (error || !data) return <ErrorState message={error || "No content available."} onRetry={refetch} />;

  const hero = data.hero;
  const academicPrograms = data.academicPrograms || [];
  const partnershipBenefits = data.partnershipBenefits || [];
  const howItWorks = data.howItWorks || [];
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
                {hero?.eyebrow || "For Colleges & Universities"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-navy leading-[1.15] mb-5">
                {hero?.title || "Bridge Education and Industry"}
              </h1>
              <p className="text-base text-text-muted leading-relaxed max-w-lg mb-8">
                {hero?.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={hero?.primaryButton?.link || "/register"}
                  className="bg-brand-royal hover:bg-brand-royal-dark text-white px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  {hero?.primaryButton?.text || "Become a Partner"}
                  <ChevronRight size={16} />
                </Link>
                <a
                  href={hero?.secondaryButton?.link || "#programs"}
                  className="border border-surface-border hover:bg-surface-ghost text-text-main px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors"
                >
                  {hero?.secondaryButton?.text || "Browse Courses"}
                </a>
              </div>
            </div>

            <CheckpointList points={hero?.checkPoints} />
          </div>
        </div>
      </section>

      {/* ── Academic Programs ── */}
      <section id="programs" className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="What Students Learn"
            title="Academic Programs"
            subtitle="Industry-relevant courses that complement your institution's curriculum and prepare students for the real world."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {academicPrograms.map((prog, i) => (
              <FeatureCard
                key={i}
                icon={() => <DynamicIcon name={prog.icon} />}
                title={prog.title || ""}
                description={prog.description || ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnership Benefits ── */}
      <section className="bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Why Partner"
            title="Partnership Benefits"
            subtitle="We help institutions deliver cutting-edge education while maintaining academic standards."
            align="center"
          />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partnershipBenefits.map((item, i) => (
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

      {/* ── How It Works ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Getting Started"
            title="How It Works"
            subtitle="Three steps to establish an academic partnership with Mahar Pyinnyar Bank."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {howItWorks.map((step, i) => (
              <StepCard key={i} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Universities ── */}
      <section className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Our Network"
            title="Partner Universities"
            subtitle="Leading institutions that trust our platform to enhance their academic programs."
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
