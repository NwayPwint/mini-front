import { useState } from "react";
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
  FileText,
  Lock,
} from "lucide-react";
import { useGetCourseBySlug } from "@/hooks/apis/useCourseQuery";
import ErrorState from "@/components/ui/ErrorState";

interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl?: string;
  content?: string;
  isFreePreview?: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function LearningPage() {
  const { slug } = useParams<{ slug: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<
    Record<string, boolean>
  >({});
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const {
    data: course,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCourseBySlug(slug as string);

  const modules: Module[] = course?.modules || [];
  const allLessons = modules.flatMap((m) => m.lessons || []);

  const activeLesson = selectedLesson || allLessons[0] || null;

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId],
    );
  };

  const currentIndex = allLessons.findIndex((l) => l.id === activeLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const progressPercent =
    allLessons.length > 0
      ? Math.round((completedLessonIds.length / allLessons.length) * 100)
      : 0;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-brand-navy">
        <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ErrorState
          message={
            (error as Error)?.message || "Course classroom failed to load."
          }
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white overflow-hidden">
      <header className="h-14 bg-brand-navy border-b border-slate-800 px-4 flex items-center justify-between z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to={`/courses/${slug}`}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <ChevronLeft size={20} />
          </Link>
          <h1 className="font-semibold text-sm md:text-base line-clamp-1">
            {course.title}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div
                className="bg-brand-gold h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs text-slate-300 font-medium">
              {progressPercent}% Complete
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-300 hover:text-white lg:hidden rounded-md bg-slate-800"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-6 flex flex-col">
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden border border-slate-800 shadow-2xl relative flex items-center justify-center">
              {activeLesson?.videoUrl ? (
                <iframe
                  src={activeLesson.videoUrl}
                  title={activeLesson.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-6">
                  <PlayCircle
                    size={48}
                    className="mx-auto mb-3 text-brand-gold opacity-80"
                  />
                  <p className="text-slate-400 text-sm">
                    No video source specified for this lesson.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    {activeLesson?.title || "Select a lesson"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Duration: {activeLesson?.durationMinutes || 0} mins
                  </p>
                </div>

                {activeLesson && (
                  <button
                    onClick={() => toggleLessonCompletion(activeLesson.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
                      completedLessonIds.includes(activeLesson.id)
                        ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-brand-royal hover:bg-brand-royal/80 text-white"
                    }`}
                  >
                    <CheckCircle2 size={16} />
                    {completedLessonIds.includes(activeLesson.id)
                      ? "Completed"
                      : "Mark as Completed"}
                  </button>
                )}
              </div>

              {activeLesson?.content && (
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-xs md:text-sm text-slate-300 space-y-2">
                  <h3 className="font-semibold text-white flex items-center gap-1.5">
                    <FileText size={16} className="text-brand-gold" />
                    Lesson Notes
                  </h3>
                  <p className="leading-relaxed">{activeLesson.content}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <button
                  disabled={!prevLesson}
                  onClick={() => prevLesson && setSelectedLesson(prevLesson)}
                  className="flex items-center gap-2 px-3 py-2 rounded text-xs font-medium bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft size={14} /> Previous
                </button>

                <button
                  disabled={!nextLesson}
                  onClick={() => nextLesson && setSelectedLesson(nextLesson)}
                  className="flex items-center gap-2 px-3 py-2 rounded text-xs font-medium bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </main>

        <aside
          className={`w-80 bg-brand-navy border-l border-slate-800 flex flex-col absolute lg:relative right-0 top-0 bottom-0 z-10 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 border-b border-slate-800 font-bold text-sm text-white flex justify-between items-center">
            <span>Course Outline</span>
            <span className="text-xs text-slate-400 font-normal">
              {allLessons.length} Lessons
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {modules.map((module) => {
              const isExpanded = expandedModules[module.id] ?? true;
              return (
                <div key={module.id} className="bg-brand-navy">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="font-semibold text-xs text-slate-200">
                      {module.title}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={14} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={14} className="text-slate-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="bg-slate-950/40 divide-y divide-slate-800/40">
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
                                ? "bg-brand-royal/20 text-brand-gold font-medium border-l-2 border-brand-gold"
                                : "text-slate-300 hover:bg-slate-800/40"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 line-clamp-1">
                              {isCompleted ? (
                                <CheckCircle2
                                  size={14}
                                  className="text-emerald-400 flex-shrink-0"
                                />
                              ) : (
                                <PlayCircle
                                  size={14}
                                  className="text-slate-500 flex-shrink-0"
                                />
                              )}
                              <span className="line-clamp-1">
                                {lesson.title}
                              </span>
                            </div>

                            <span className="text-[10px] text-slate-500 ml-2">
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
      </div>
    </div>
  );
}
