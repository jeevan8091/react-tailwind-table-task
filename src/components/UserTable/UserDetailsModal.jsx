const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  const address = user.address ?? {};
  const company = user.company ?? {};
  const geo = address.geo ?? {};
  const fullAddress = [address.suite, address.street, address.city].filter(Boolean).join(', ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-6">
          <div>
            <p className="text-xs font-semibold text-blue-600">User Details</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-800">{user.name || 'Unnamed user'}</h2>
            <p className="mt-1 text-sm font-normal text-slate-500">@{user.username || 'unknown'}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors duration-200"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Detail Cards Grid */}
        <div className="grid gap-3.5 px-5 py-5 sm:grid-cols-2 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="text-xs font-medium text-slate-500">Website</p>
            {user.website ? (
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-sm font-normal text-blue-600 hover:text-blue-700 hover:underline"
              >
                {user.website}
              </a>
            ) : (
              <p className="mt-2 text-sm font-normal text-slate-400">Unavailable</p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="text-xs font-medium text-slate-500">Company</p>
            <p className="mt-2 text-sm font-medium text-slate-800 truncate">{company.name || 'Unavailable'}</p>
            {company.catchPhrase && (
              <p className="mt-0.5 text-xs font-normal text-slate-400 truncate">{company.catchPhrase}</p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="text-xs font-medium text-slate-500">Address</p>
            <p className="mt-2 text-sm font-medium text-slate-800">{fullAddress || 'Unavailable'}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
            <p className="text-xs font-medium text-slate-500">Zipcode</p>
            <p className="mt-2 text-sm font-medium text-slate-800">{address.zipcode || 'Unavailable'}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:col-span-2">
            <p className="text-xs font-medium text-slate-500">Geo Location</p>
            <p className="mt-2 font-mono text-sm font-medium text-slate-700">
              Lat: {geo.lat ?? 'N/A'} &nbsp;·&nbsp; Lng: {geo.lng ?? 'N/A'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
