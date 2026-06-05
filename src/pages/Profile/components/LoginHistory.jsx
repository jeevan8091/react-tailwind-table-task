const LoginHistory = ({ loginHistory }) => {
  const lastEntry = loginHistory[0] || {};

  const summaryItems = [
    { label: 'Date & Time', value: lastEntry.time || 'N/A' },
    { label: 'IP Address', value: lastEntry.ip || 'N/A' },
    { label: 'Device', value: lastEntry.device || 'N/A' },
    { label: 'Status', value: lastEntry.status || 'N/A' },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-[20px] font-semibold text-slate-800">Last Login</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryItems.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">{item.label}</p>
              <p className="mt-2 text-sm font-semibold text-slate-800">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-[20px] font-semibold text-slate-800">Login History</h3>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Time</th>
                <th className="py-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">IP Address</th>
                <th className="py-3 pr-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Device</th>
                <th className="py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((entry) => (
                <tr key={`${entry.time}-${entry.ip}`} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 pr-4 font-semibold text-slate-700">{entry.time}</td>
                  <td className="py-3 pr-4 font-mono text-xs font-semibold text-slate-500">{entry.ip}</td>
                  <td className="py-3 pr-4 font-semibold text-slate-700">{entry.device}</td>
                  <td className="py-3">
                    <span
                      className={[
                        'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
                        entry.status === 'Success'
                          ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                          : 'border border-red-100 bg-red-50 text-red-700',
                      ].join(' ')}
                    >
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default LoginHistory;
