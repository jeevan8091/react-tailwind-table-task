import { getAccent, getInitials } from './helpers';

const UserTableRow = ({ user, index }) => {
  const accent = getAccent(user.id);
  const initials = getInitials(user.name || user.username || 'User');
  const cellBg = index % 2 === 0 ? 'bg-white group-hover:bg-blue-50/20' : 'bg-slate-50/70 group-hover:bg-blue-50/20';
  const address = user.address ?? {};
  const company = user.company ?? {};
  const geo = address.geo ?? {};
  const website = user.website || '';

  return (
    <tr className="group transition-colors duration-300 ease-out">
      <td className={`px-6 py-4 font-extrabold text-slate-800 rounded-l-2xl ${accent.border} ${cellBg} transition-all duration-300`}>
        {user.id}
      </td>

      <td className={`px-6 py-4 ${cellBg} transition-all duration-300`}>
        <div className="flex items-center space-x-3.5">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm tracking-wide shadow-sm shadow-indigo-100 ${accent.avatar} text-white`}>
            {initials}
          </div>
          <div>
            <div className="font-bold text-slate-800 group-hover:text-indigo-900 transition-colors duration-200">
              {user.name || 'Unnamed user'}
            </div>
            <div className="text-xs font-semibold text-slate-400">@{user.username || 'unknown'}</div>
          </div>
        </div>
      </td>

      <td className={`px-6 py-4 ${cellBg} transition-all duration-300`}>
        {user.email ? (
          <a
            href={`mailto:${user.email}`}
            className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-indigo-700 hover:underline transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {user.email}
          </a>
        ) : (
          <span className="text-xs font-semibold text-slate-400">Email unavailable</span>
        )}
      </td>

      <td className={`px-6 py-4 text-xs font-bold text-slate-700 ${cellBg} transition-all duration-300`}>
        <div className="inline-flex items-center">
          <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {user.phone || 'Phone unavailable'}
        </div>
      </td>

      <td className={`px-6 py-4 ${cellBg} transition-all duration-300`}>
        {website ? (
          <a
            href={`https://${website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 hover:shadow-sm hover:shadow-emerald-100 transition-all duration-200"
          >
            {website}
            <svg className="w-3.5 h-3.5 ml-1 opacity-70" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <span className="text-xs font-semibold text-slate-400">Website unavailable</span>
        )}
      </td>

      <td className={`px-6 py-4 ${cellBg} max-w-xs transition-all duration-300`}>
        <div className="flex items-start">
          <svg className="w-4 h-4 mr-1.5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div>
            <div className="text-slate-800 text-xs font-semibold leading-relaxed">
              {[address.street, address.suite, address.city].filter(Boolean).join(', ') || 'Address unavailable'}
            </div>
            <div className="text-slate-400 text-[10px] font-bold tracking-wider mt-1 inline-flex items-center bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50 font-mono">
              Geo: {geo.lat ?? 'N/A'}, {geo.lng ?? 'N/A'}
            </div>
          </div>
        </div>
      </td>

      <td className={`px-6 py-4 rounded-r-2xl ${cellBg} transition-all duration-300`}>
        <div className="flex items-start">
          <svg className="w-4 h-4 mr-2 text-violet-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <div>
            <div className="font-bold text-slate-800 text-xs">{company.name || 'Company unavailable'}</div>
            <div className="text-[11px] font-medium text-slate-400 italic mt-1 leading-snug break-words max-w-[170px]">
              "{company.catchPhrase || 'No catchphrase available'}"
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
