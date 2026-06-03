import { getAccent, getInitials } from './helpers';

const UserTableRow = ({ user, index, onEdit, onDelete }) => {
  const accent = getAccent(user.id);
  const initials = getInitials(user.name || user.username || 'User');
  const cellBg = index % 2 === 0 ? 'bg-white group-hover:bg-blue-50' : 'bg-slate-50 group-hover:bg-blue-50';
  const address = user.address ?? {};
  const company = user.company ?? {};
  const geo = address.geo ?? {};
  const website = user.website || '';

  return (
    <tr className="group transition-colors duration-200 ease-out">
      <td className={`px-6 py-4 font-bold text-slate-800 rounded-l-xl ${accent.border} ${cellBg} transition-colors duration-200`}>
        {user.id}
      </td>

      <td className={`px-6 py-4 ${cellBg} transition-colors duration-200`}>
        <div className="flex items-center space-x-3.5">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm tracking-wide shadow-sm shadow-blue-100 ${accent.avatar} text-white`}>
            {initials}
          </div>
          <div>
            <div className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
              {user.name || 'Unnamed user'}
            </div>
            <div className="text-xs font-semibold text-slate-400">@{user.username || 'unknown'}</div>
          </div>
        </div>
      </td>

      <td className={`px-6 py-4 ${cellBg} transition-colors duration-200`}>
        {user.email ? (
          <a
            href={`mailto:${user.email}`}
            className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {user.email}
          </a>
        ) : (
          <span className="text-xs font-semibold text-slate-400">Email unavailable</span>
        )}
      </td>

      <td className={`px-6 py-4 text-xs font-semibold text-slate-700 ${cellBg} transition-colors duration-200`}>
        <div className="inline-flex items-center">
          <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {user.phone || 'Phone unavailable'}
        </div>
      </td>

      <td className={`px-6 py-4 ${cellBg} transition-colors duration-200`}>
        {website ? (
          <a
            href={`https://${website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
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

      <td className={`px-6 py-4 ${cellBg} max-w-xs transition-colors duration-200`}>
        <div className="flex items-start">
          <svg className="w-4 h-4 mr-1.5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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

      <td className={`px-6 py-4 ${cellBg} transition-colors duration-200`}>
        <div className="flex items-start">
          <svg className="w-4 h-4 mr-2 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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

      <td className={`px-6 py-4 rounded-r-xl ${cellBg} transition-colors duration-200`}>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onEdit(user)}
            aria-label={`Edit ${user.name || 'user'}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDelete(user)}
            aria-label={`Delete ${user.name || 'user'}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition-colors duration-200 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166M19.228 5.79L18.16 19.673A2.25 2.25 0 0115.916 21H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397M4.772 5.79c1.14-.173 2.306-.304 3.478-.397m7.5 0V4.477A1.125 1.125 0 0014.625 3h-5.25A1.125 1.125 0 008.25 4.477v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
