import { Link } from "react-router-dom";
import { ChevronRight, GraduationCap } from "lucide-react";
import { SectionHeader, FeatureCard, StatBlock, PartnerGrid, CtaSection } from "../../components/home";
import DynamicIcon from "../../components/ui/DynamicIcon";
import PageSkeleton from "../../components/ui/PageSkeleton";
import ErrorState from "../../components/ui/ErrorState";
import { useHomePage } from "../../hooks/useHomePage";

export default function Index() {
  const { data, loading, error, refetch } = useHomePage();

  if (loading) return <PageSkeleton />;
  if (error || !data) return <ErrorState message={error || "No content available."} onRetry={refetch} />;

  const hero = data.hero;
  const categories = data.courseCategories || [];
  const services = data.services || [];
  const about = data.aboutAccreditations;
  const partners = data.partners || [];
  const featuredCourses = data.featuredCourses || [];
  const awards = data.awards || [];
  const whyChooseUs = data.whyChooseUs || [];
  const cta = data.cta;

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold block mb-4">
                {hero?.eyebrow || "Institutional Learning Portal"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-navy leading-[1.15] mb-5">
                {hero?.title || "Empowering Your Future Through Education"}
              </h1>
              <p className="text-base text-text-muted leading-relaxed max-w-lg mb-8">
                {hero?.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={hero?.primaryButton?.link || "/register"}
                  className="bg-brand-royal hover:bg-brand-royal-dark text-white px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  {hero?.primaryButton?.text || "Explore Courses"}
                  <ChevronRight size={16} />
                </Link>
                <Link
                  to={hero?.secondaryButton?.link || "/register"}
                  className="border border-surface-border hover:bg-surface-ghost text-text-main px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors"
                >
                  {hero?.secondaryButton?.text || "Join Now"}
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {hero?.statBlocks?.map((stat, i) => (
                <StatBlock key={i} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Courses & Programs ── */}
      <section className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Our Courses"
            title="Courses & Programs"
            subtitle="From internationally recognized degrees to career-focused certifications, find the program that fits your ambition."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <FeatureCard
                key={i}
                icon={() => <DynamicIcon name={cat.icon} />}
                title={cat.title || ""}
                description={cat.description || ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Services ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="What We Offer"
            title="Our Services"
            subtitle="Comprehensive support services to guide your educational journey from start to career."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <FeatureCard
                key={i}
                icon={() => <DynamicIcon name={svc.icon} />}
                title={svc.title || ""}
                description={svc.description || ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── About & Accreditations ── */}
      <section className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <SectionHeader
                eyebrow="About Us"
                title="Accreditations & Global Standards"
                subtitle="We maintain the highest standards of quality through rigorous accreditation processes and compliance with international education frameworks."
              />
              <p className="text-sm text-text-muted leading-relaxed mt-2">
                {about?.description}
              </p>
            </div>
            <div className="space-y-4">
              {about?.stats?.map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-surface-border rounded-custom-md p-4 flex items-center justify-between"
                >
                  <span className="text-sm text-text-muted">{item.label}</span>
                  <span className="text-sm font-semibold text-brand-royal">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Education Partners ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Collaboration"
            title="Education Partners"
            subtitle="Proudly partnered with leading international institutions and awarding bodies."
            align="center"
          />
          <div className="mt-8">
            <PartnerGrid partners={partners} />
          </div>
        </div>
      </section>

      {/* ── Featured New Courses ── */}
      <section className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="New & Featured"
            title="Featured Courses"
            subtitle="Start your learning journey with our most popular and newly launched programs."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCourses.map((course, i) => (
              <div
                key={i}
                className="bg-white rounded-custom-lg border border-surface-border overflow-hidden group hover:shadow-custom-md transition-all"
              >
                <div className="aspect-video bg-surface-institutional flex items-center justify-center">
                  <GraduationCap
                    size={32}
                    className="text-brand-royal-light"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-custom-sm inline-block mb-2">
                    {course.level}
                  </span>
                  <h3 className="text-sm font-semibold text-brand-navy leading-snug line-clamp-2 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-text-muted">{course.instructor}</p>
                  <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between">
                    <span className="text-xs font-semibold text-status-success">
                      {course.price || "Free"}
                    </span>
                    <Link
                      to={`/courses/${i}`}
                      className="text-xs font-medium text-brand-royal hover:text-brand-royal-dark transition-colors inline-flex items-center gap-1"
                    >
                      Details
                      <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards & Recognition ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Recognition"
            title="Awards & Recognition"
            subtitle="Our commitment to educational excellence has been recognized by industry leaders."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
            {awards.map((award, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-custom-lg border border-surface-border bg-surface-ghost"
              >
                <div className="w-12 h-12 rounded-full bg-brand-royal/5 text-brand-royal flex items-center justify-center mx-auto mb-4">
                  <DynamicIcon name={award.icon} size={22} />
                </div>
                <h3 className="text-sm font-semibold text-brand-navy mb-1">
                  {award.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us (Dark Section) ── */}
      <section className="bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Our Advantage"
            title="Why Choose Us?"
            subtitle="We provide more than education — we build careers and transform lives."
            align="center"
          />
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyChooseUs.map((item, i) => (
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

      {/* ── Final CTA ── */}
      <CtaSection
        cta={cta}
        primaryButtonClassName="bg-brand-royal hover:bg-brand-royal-dark text-white"
      />
    </>
  );
}
