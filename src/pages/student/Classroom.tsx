import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Loader2,
  ChevronLeft,
  CheckCircle2,
  PlayCircle,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import {
  useGetClassroom,
  useUpdateLessonProgress,
} from "@/hooks/apis/useStudentQuery";
import type { ClassroomLesson, ClassroomModule } from "@/types/student";

export default function CourseClassroom() {
  const { slug } = useParams<{ slug: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<
    Record<string, boolean>
  >({});
  const [selectedLesson, setSelectedLesson] =
    useState<ClassroomLesson | null>(null);

  const {
    data: classroomData,
    isLoading,
    isError,
    error,
  } = useGetClassroom(slug as string);

  const updateProgress = useUpdateLessonProgress(slug);

  const course = classroomData?.course;
  const modules: ClassroomModule[] = course?.modules || [];
  const allLessons = modules.flatMap((m) => m.lessons || []);

  const activeLesson = selectedLesson || allLessons[0] || null;
  const completedLessonIds = allLessons
    .filter((l) => l.isCompleted)
    .map((l) => l.id);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const reportWatched = (lesson: ClassroomLesson, watchedSec: number) => {
    if (!lesson.id || watchedSec <= 0) return;
    updateProgress.mutate({ lessonId: lesson.id, watchedSec });
  };

  const toggleLessonCompletion = (lesson: ClassroomLesson) => {
    const isCompleted = !lesson.isCompleted;
    updateProgress.mutate({ lessonId: lesson.id, watchedSec: lesson.watchedSec, isCompleted });
  };

  useEffect(() => {
    if (!activeLesson?.videoUrl || !activeLesson.id) return;

    const timer = window.setInterval(() => {
      reportWatched(
        activeLesson,
        Math.min(activeLesson.watchedSec + 15, activeLesson.durationMinutes * 60),
      );
    }, 15000);

    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLesson?.id, activeLesson?.videoUrl, slug]);

  const currentIndex = allLessons.findIndex((l) => l.id === activeLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const progressPercent =
    classroomData?.enrollment?.progress ??
    (allLessons.length > 0
      ? Math.round((completedLessonIds.length / allLessons.length) * 100)
      : 0);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-ghost">
        <Loader2 className="h-8 w-8 animate-spin text-brand-royal" />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-surface-ghost text-text-main p-4">
        <p className="text-status-error mb-4 font-medium">
          {(error as Error)?.message || "Failed to load classroom context."}
        </p>
        <Link
          to="/student/dashboard"
          className="px-4 py-2 bg-brand-royal text-xs rounded-md text-white font-semibold"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-surface-ghost text-text-main overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-surface-border px-4 flex items-center justify-between z-20 flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/student/dashboard"
            className="text-text-muted hover:text-brand-royal p-1 rounded-md transition-colors"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="font-semibold text-sm md:text-base line-clamp-1 text-brand-navy">
            {course.title}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-32 bg-surface-light rounded-full h-2 overflow-hidden">
              <div
                className="bg-brand-gold h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs text-text-muted font-medium">
              {progressPercent}% Complete
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-text-muted hover:text-brand-royal lg:hidden rounded-md bg-surface-ghost border border-surface-border"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Main Classroom Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Lessons List Drawer / Sidebar (left) */}
        <aside
          className={`w-80 bg-white border-r border-surface-border flex flex-col absolute lg:relative left-0 top-0 bottom-0 z-10 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 border-b border-surface-border font-bold text-sm text-brand-navy flex justify-between items-center">
            <span>Course Content</span>
            <span className="text-xs text-text-muted font-normal">
              {allLessons.length} Lessons
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-surface-border">
            {modules.map((module) => {
              const isExpanded = expandedModules[module.id] ?? true;
              return (
                <div key={module.id} className="bg-white">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-surface-soft transition-colors"
                  >
                    <span className="font-semibold text-xs text-text-main">
                      {module.title}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={14} className="text-text-muted" />
                    ) : (
                      <ChevronDown size={14} className="text-text-muted" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="bg-surface-soft divide-y divide-surface-border">
                      {module.lessons?.map((lesson) => {
                        const isActive = activeLesson?.id === lesson.id;
                        const isCompleted = completedLessonIds.includes(
                          lesson.id,
                        );

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setSelectedLesson(lesson)}
                            className={`w-full px-4 py-2.5 flex items-center justify-between text-left text-xs transition-colors ${
                              isActive
                                ? "bg-brand-royal/10 text-brand-royal font-medium border-l-2 border-brand-royal"
                                : "text-text-muted hover:bg-surface-ghost"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 line-clamp-1">
                              {isCompleted ? (
                                <CheckCircle2
                                  size={14}
                                  className="text-status-success flex-shrink-0"
                                />
                              ) : (
                                <PlayCircle
                                  size={14}
                                  className="text-surface-light flex-shrink-0"
                                />
                              )}
                              <span className="line-clamp-1">
                                {lesson.title}
                              </span>
                            </div>

                            <span className="text-[10px] text-text-muted ml-2">
                              {lesson.durationMinutes}m
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-surface-ghost p-4 md:p-6 flex flex-col">
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            {/* Video Container */}
            <div className="w-full bg-black h-[40vh] sm:h-[45vh] lg:h-[50vh] flex items-center justify-center rounded-custom-md overflow-hidden shadow-custom-md">
              {activeLesson?.videoUrl ? (
                <iframe
                  src={activeLesson.videoUrl}
                  title={activeLesson.title}
                  className="w-full h-full object-contain"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-6">
                  <PlayCircle
                    size={44}
                    className="mx-auto mb-2 text-white/70"
                  />
                  <p className="text-white/60 text-sm">
                    No video source specified for this lesson.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-4">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-brand-navy">
                    {activeLesson?.title || "Select a lesson"}
                  </h2>
                  <p className="text-xs text-text-muted mt-1">
                    Duration: {activeLesson?.durationMinutes || 0} mins
                  </p>
                </div>

                {activeLesson && (
                  <button
                    onClick={() => toggleLessonCompletion(activeLesson)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-colors border ${
                      activeLesson.isCompleted
                        ? "bg-status-success/10 text-status-success border-status-success/30"
                        : "bg-brand-royal hover:bg-brand-royal-dark text-white border-transparent"
                    }`}
                  >
                    <CheckCircle2 size={16} />
                    {activeLesson.isCompleted ? "Completed" : "Mark as Completed"}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  disabled={!prevLesson}
                  onClick={() => prevLesson && setSelectedLesson(prevLesson)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium bg-white border border-surface-border text-text-main hover:bg-surface-soft disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft size={14} /> Previous
                </button>

                <button
                  disabled={!nextLesson}
                  onClick={() => nextLesson && setSelectedLesson(nextLesson)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium bg-white border border-surface-border text-text-main hover:bg-surface-soft disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}