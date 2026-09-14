import { Link } from "react-router-dom";
import { ChevronRight, CheckCircle, Award } from "lucide-react";
import { SectionHeader, FeatureCard, StatBlock, CtaSection } from "../../components/home";
import PageSkeleton from "../../components/ui/PageSkeleton";
import ErrorState from "../../components/ui/ErrorState";
import { useCertificatesPage } from "../../hooks/useCertificatesPage";

export default function Certificates() {
  const { data, loading, error, refetch } = useCertificatesPage();

  if (loading) return <PageSkeleton />;
  if (error || !data) return <ErrorState message={error || "No content available."} onRetry={refetch} />;

  const hero = data.hero;
  const certificateTypes = data.certificateTypes || [];
  const certificateFeatures = data.certificateFeatures || [];
  const sampleCertificates = data.sampleCertificates || [];
  const cta = data.cta;

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold block mb-4">
              {hero?.eyebrow || "Credentials"}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-navy leading-[1.15] mb-5">
              {hero?.title || "Earn Industry-Recognized Certificates"}
            </h1>
            <p className="text-base text-text-muted leading-relaxed mb-8">
              {hero?.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <a
                href={hero?.primaryButton?.link || "#types"}
                className="bg-brand-royal hover:bg-brand-royal-dark text-white px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors inline-flex items-center gap-2"
              >
                {hero?.primaryButton?.text || "View Certificates"}
                <ChevronRight size={16} />
              </a>
              <Link
                to={hero?.secondaryButton?.link || "/register"}
                className="border border-surface-border hover:bg-surface-ghost text-text-main px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors"
              >
                {hero?.secondaryButton?.text || "Get Started"}
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

      {/* ── Certificate Types ── */}
      <section id="types" className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="What You Can Earn"
            title="Certificate Types"
            subtitle="Choose the credential that matches your learning goals and career stage."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {certificateTypes.map((cert, i) => (
              <FeatureCard
                key={i}
                icon={() => <Award size={20} strokeWidth={1.5} />}
                title={cert.title || ""}
                description={cert.description || ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Certificate Features ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Why Our Certificates"
            title="What Makes Them Valuable"
            subtitle="Not just a PDF — our certificates carry real weight with employers and institutions."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {certificateFeatures.map((feat, i) => (
              <FeatureCard
                key={i}
                icon={() => <Award size={20} strokeWidth={1.5} />}
                title={feat.title || ""}
                description={feat.description || ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample Certificates ── */}
      <section className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Examples"
            title="Popular Certificates"
            subtitle="Browse some of our most sought-after certification programs."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sampleCertificates.map((cert, i) => (
              <div
                key={i}
                className="bg-white rounded-custom-lg border border-surface-border p-6 hover:shadow-custom-md transition-all"
              >
                <div className="w-10 h-10 rounded-custom-md bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-4">
                  <Award size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-brand-navy mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-text-muted mb-4">{cert.issuer}</p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium bg-surface-ghost text-text-muted px-2 py-1 rounded-custom-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-surface-border flex items-center gap-1 text-xs font-medium text-brand-royal">
                  <CheckCircle size={14} />
                  Verifiable Credential
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaSection cta={cta} />
    </>
  );
}
