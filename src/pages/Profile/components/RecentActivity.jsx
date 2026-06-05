const RecentActivity = ({ recentActions, sessionDetails }) => (
  <div className="grid gap-6 xl:grid-cols-2">
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-[20px] font-semibold text-slate-800">Recent Actions</h3>
      <div className="mt-5 space-y-3">
        {recentActions.map((item) => (
          <div key={`${item.action}-${item.time}`} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-800">{item.action}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">{item.time}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-[20px] font-semibold text-slate-800">Session Information</h3>
      <div className="mt-5 space-y-4">
        {sessionDetails.map((item) => (
          <div key={item.label} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
            <span className="text-sm font-semibold text-slate-500">{item.label}</span>
            <span className="text-sm font-semibold text-slate-800">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default RecentActivity;
