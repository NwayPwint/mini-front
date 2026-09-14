import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronDown } from "lucide-react";
import { SectionHeader, FeatureCard, CtaSection, CheckpointList, StepCard } from "../../components/home";
import DynamicIcon from "../../components/ui/DynamicIcon";
import PageSkeleton from "../../components/ui/PageSkeleton";
import ErrorState from "../../components/ui/ErrorState";
import { useStudentsPage } from "../../hooks/useStudentsPage";

export default function Students() {
  const { data, loading, error, refetch } = useStudentsPage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (loading) return <PageSkeleton />;
  if (error || !data) return <ErrorState message={error || "No content available."} onRetry={refetch} />;

  const hero = data.hero;
  const programs = data.programs || [];
  const enrollmentSteps = data.enrollmentSteps || [];
  const testimonials = data.testimonials || [];
  const faqs = data.faqs || [];
  const cta = data.cta;

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold block mb-4">
                {hero?.eyebrow || "For Students"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-navy leading-[1.15] mb-5">
                {hero?.title || "Your Pathway to a Brighter Future"}
              </h1>
              <p className="text-base text-text-muted leading-relaxed max-w-lg mb-8">
                {hero?.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={hero?.primaryButton?.link || "/register"}
                  className="bg-brand-royal hover:bg-brand-royal-dark text-white px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  {hero?.primaryButton?.text || "Apply Now"}
                  <ChevronRight size={16} />
                </Link>
                <a
                  href={hero?.secondaryButton?.link || "#programs"}
                  className="border border-surface-border hover:bg-surface-ghost text-text-main px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors"
                >
                  {hero?.secondaryButton?.text || "Explore Programs"}
                </a>
              </div>
            </div>

            <CheckpointList points={hero?.checkPoints} />
          </div>
        </div>
      </section>

      {/* ── Programs Overview ── */}
      <section id="programs" className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="What You Can Study"
            title="Programs for Every Goal"
            subtitle="From degree programs to short courses, find the right fit for your ambitions and timeline."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((prog, i) => (
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

      {/* ── How to Enroll ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Getting Started"
            title="How to Enroll"
            subtitle="Three simple steps to begin your learning journey with us."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {enrollmentSteps.map((step, i) => (
              <StepCard key={i} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Student Voices"
            title="What Our Students Say"
            subtitle="Hear from learners who transformed their careers through our programs."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-custom-lg border border-surface-border p-6 relative"
              >
                <span className="text-brand-gold/30 mb-3 block text-2xl font-serif">"</span>
                <p className="text-sm text-text-muted leading-relaxed mb-5 italic">
                  {t.quote}
                </p>
                <div className="pt-4 border-t border-surface-border">
                  <span className="text-sm font-semibold text-brand-navy block">
                    {t.name}
                  </span>
                  <span className="text-xs text-text-muted">{t.program}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Questions"
            title="Frequently Asked Questions"
            subtitle="Can't find what you're looking for? Contact our admissions team."
            align="center"
          />
          <div className="mt-8 space-y-2">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="faq-item">
                  <button
                    className="faq-trigger"
                    data-open={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    {faq.question}
                    <ChevronDown size={16} />
                  </button>
                  <div className="faq-content" data-open={isOpen}>
                    <div>
                      <div className="faq-content-inner">{faq.answer}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <CtaSection cta={cta} />
    </>
  );
}
