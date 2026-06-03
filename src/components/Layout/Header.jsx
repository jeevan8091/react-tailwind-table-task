const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open sidebar"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 lg:hidden"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <div>
            <p className="hidden text-xs font-bold uppercase tracking-[0.18em] text-blue-600 sm:block">
              Admin Portal
            </p>
            <h1 className="text-base font-black tracking-tight text-slate-800 sm:mt-1 sm:text-lg">
              User Directory Dashboard
            </h1>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500 sm:px-4 sm:text-sm">
          Welcome Admin 👋
        </div>
      </div>
    </header>
  );
};

export default Header;
