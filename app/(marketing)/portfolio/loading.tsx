export default function PortfolioLoading() {
  return (
    <main className="min-h-screen bg-[color:var(--ww-bg)] pt-24 pb-16">
      <div className="container-wide">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="skeleton h-10 w-48 mb-3" />
          <div className="skeleton h-4 w-72" />
        </div>

        {/* Filter skeleton */}
        <div className="flex gap-2 mb-10">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="skeleton h-8 rounded-full"
              style={{ width: `${60 + i * 8}px` }}
            />
          ))}
        </div>

        {/* Masonry skeleton — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2].map((col) => (
            <div key={col} className="flex flex-col gap-4">
              {[0.667, 1.333, 0.75, 1.0].map((ratio, i) => (
                <div
                  key={i}
                  className="skeleton rounded-lg"
                  style={{ paddingBottom: `${ratio * 100}%` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
