export default function PageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <section className="hero-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            <div className="space-y-4">
              <div className="h-3 w-32 bg-surface-border rounded" />
              <div className="h-10 w-3/4 bg-surface-border rounded" />
              <div className="h-4 w-full bg-surface-border rounded" />
              <div className="h-4 w-2/3 bg-surface-border rounded" />
              <div className="flex gap-3 pt-2">
                <div className="h-10 w-32 bg-surface-border rounded-custom-sm" />
                <div className="h-10 w-28 bg-surface-border rounded-custom-sm" />
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-surface-border rounded-custom-md" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content sections skeleton */}
      {[1, 2, 3].map((section) => (
        <section
          key={section}
          className={section % 2 === 0 ? 'bg-white' : 'bg-surface-ghost'}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
            <div className="text-center mb-10">
              <div className="h-3 w-20 bg-surface-border rounded mx-auto mb-3" />
              <div className="h-7 w-48 bg-surface-border rounded mx-auto mb-2" />
              <div className="h-4 w-64 bg-surface-border rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((card) => (
                <div
                  key={card}
                  className="bg-surface-ghost rounded-custom-lg border border-surface-border p-6 space-y-3"
                >
                  <div className="w-10 h-10 bg-surface-border rounded-custom-md" />
                  <div className="h-5 w-3/4 bg-surface-border rounded" />
                  <div className="h-3 w-full bg-surface-border rounded" />
                  <div className="h-3 w-2/3 bg-surface-border rounded" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
