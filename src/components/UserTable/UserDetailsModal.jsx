const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  const address = user.address ?? {};
  const company = user.company ?? {};
  const geo = address.geo ?? {};
  const fullAddress = [address.street, address.suite, address.city].filter(Boolean).join(', ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-blue-600">User Details</p>
            <h2 className="mt-1 text-[20px] font-semibold text-slate-800">{user.name || 'Unnamed user'}</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">@{user.username || 'unknown'}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Website</p>
            {user.website ? (
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                {user.website}
              </a>
            ) : (
              <p className="mt-2 text-sm font-medium text-slate-500">Website unavailable</p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Company</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">{company.name || 'Company unavailable'}</p>
            <p className="mt-1 text-xs font-medium italic text-slate-500">
              {company.catchPhrase || 'No catchphrase available'}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Address</p>
            <p className="mt-2 text-sm font-medium text-slate-800">{fullAddress || 'Address unavailable'}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Geo Location</p>
            <p className="mt-2 font-mono text-sm font-medium text-slate-700">
              Lat: {geo.lat ?? 'N/A'} · Lng: {geo.lng ?? 'N/A'}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:bg-blue-700 sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
