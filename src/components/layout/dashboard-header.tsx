export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-700">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#03367A] dark:text-sky-400">
            Operations overview
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            Training Management
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#84ba3f] hover:text-[#84ba3f] dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300">
            Export report
          </button>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:bg-gray-800 dark:border-gray-700">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#84ba3f] text-sm font-bold text-white flex-shrink-0"
              aria-hidden="true"
            >
              SD
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Sarah Dlamini
              </p>
              <p className="text-xs text-slate-500 dark:text-gray-400">
                Operations Manager
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
