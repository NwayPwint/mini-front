import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SectionHeader, CtaSection } from "../../components/home";
import DynamicIcon from "../../components/ui/DynamicIcon";
import PageSkeleton from "../../components/ui/PageSkeleton";
import ErrorState from "../../components/ui/ErrorState";
import CourseCard from "@/components/course/CourseCard";
import { type Course } from "@/types/course";
import { useGetCoursesWithEnrollment } from "@/hooks/apis/useCourseQuery";

export default function Courses() {
  const { data, isLoading, isError, error, refetch } =
    useGetCoursesWithEnrollment();

  if (isLoading) return <PageSkeleton />;
  if (isError || !data)
    return (
      <ErrorState
        message={(error as Error)?.message || "No content available."}
        onRetry={refetch}
      />
    );

  const hero = data.hero;
  const categories = data.categories || [];
  const courses = (data.courses || []) as Course[];
  const cta = data.cta;

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold block mb-4">
                {hero?.eyebrow || "Explore Learning"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-navy leading-[1.15] mb-5">
                {hero?.title || "Find the Right Course for You"}
              </h1>
              <p className="text-base text-text-muted leading-relaxed max-w-lg mb-8">
                {hero?.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={hero?.primaryButton?.link || "#catalog"}
                  className="bg-brand-royal hover:bg-brand-royal-dark text-white px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  {hero?.primaryButton?.text || "Browse Catalog"}
                  <ChevronRight size={16} />
                </a>
                <Link
                  to={hero?.secondaryButton?.link || "/register"}
                  className="border border-surface-border hover:bg-surface-ghost text-text-main px-6 py-2.5 rounded-custom-sm text-sm font-medium transition-colors"
                >
                  {hero?.secondaryButton?.text || "Create Account"}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {categories.slice(0, 4).map((cat: any, i: number) => (
                <div
                  key={cat.id || i}
                  className="bg-white/80 border border-surface-border rounded-custom-md p-4 flex items-center gap-3 hover:shadow-custom-sm transition-all"
                >
                  <div className="w-9 h-9 rounded-custom-sm bg-brand-royal/5 text-brand-royal flex items-center justify-center flex-shrink-0">
                    <DynamicIcon name={cat.icon} size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand-navy block">
                      {cat.label}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {cat.count} courses
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="Browse by Category"
            title="Course Categories"
            subtitle="Find courses organized by subject area and skill domain."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat: any, i: number) => (
              <div
                key={cat.id || i}
                className="bg-surface-ghost border border-surface-border rounded-custom-md p-5 text-center hover:shadow-custom-sm hover:border-brand-royal/30 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-custom-md bg-brand-royal/5 text-brand-royal flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-royal/10 transition-colors">
                  <DynamicIcon name={cat.icon} size={20} />
                </div>
                <span className="text-sm font-semibold text-brand-navy block mb-1">
                  {cat.label}
                </span>
                <span className="text-xs text-text-muted">
                  {cat.count} courses
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course Catalog ── */}
      <section id="catalog" className="bg-surface-ghost">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <SectionHeader
            eyebrow="All Courses"
            title="Course Catalog"
            subtitle="Explore our full range of accredited courses designed for every skill level."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-2">
            {courses.map((course, index) => {
              return (
                <CourseCard
                  key={course.id || course.slug || index}
                  course={course}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaSection cta={cta} />
    </>
  );
}
