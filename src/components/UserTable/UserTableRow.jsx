import { getAccent, getInitials } from './helpers';

import { FiEdit, FiTrash } from 'react-icons/fi';

const UserTableRow = ({ user, index, onEdit, onDelete, onViewDetails }) => {
  const accent = getAccent(user.id);
  const initials = getInitials(user.name || user.username || 'User');
  const cellBg = index % 2 === 0 ? 'bg-white group-hover:bg-blue-50' : 'bg-slate-50 group-hover:bg-blue-50';
  const company = user.company ?? {};

  return (
    <tr className="group transition-colors duration-200 ease-out">
      <td className={`rounded-l-xl px-4 py-4 text-sm font-bold text-slate-800 ${accent.border} ${cellBg} transition-colors duration-200`}>
        {user.id}
      </td>

      <td className={`px-4 py-4 ${cellBg} transition-colors duration-200`}>
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold tracking-wide text-white shadow-sm shadow-blue-100 ${accent.avatar}`}>
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-800 transition-colors duration-200 group-hover:text-blue-700">
              {user.name || 'Unnamed user'}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-xs font-semibold text-slate-400">@{user.username || 'unknown'}</span>
              <button
                type="button"
                onClick={() => onViewDetails(user)}
                className="text-xs font-bold text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </td>

      <td className={`px-4 py-4 ${cellBg} transition-colors duration-200`}>
        {user.email ? (
          <a
            href={`mailto:${user.email}`}
            className="block max-w-[180px] truncate text-sm font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline"
          >
            {user.email}
          </a>
        ) : (
          <span className="text-sm font-semibold text-slate-400">Email unavailable</span>
        )}
      </td>

      <td className={`px-4 py-4 ${cellBg} transition-colors duration-200`}>
        <span className="block max-w-[170px] truncate text-sm font-semibold text-slate-700">
          {user.phone || 'Phone unavailable'}
        </span>
      </td>

      <td className={`px-4 py-4 ${cellBg} transition-colors duration-200`}>
        <div className="max-w-[210px]">
          <span className="block max-w-[150px] truncate text-sm font-semibold text-slate-700">{company.name || 'Company unavailable'}</span>
          <p className="mt-1 truncate text-xs font-medium text-slate-400">
            {company.catchPhrase || 'No catchphrase available'}
          </p>
        </div>
      </td>

      <td className={`rounded-r-xl px-4 py-4 ${cellBg} transition-colors duration-200`}>
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(user)}
            aria-label={`Edit ${user.name || 'user'}`}
            title="Edit"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition-colors duration-200 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            <FiEdit />
          </button>
          <button
            type="button"
            onClick={() => onDelete(user)}
            aria-label={`Delete ${user.name || 'user'}`}
            title="Delete"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition-colors duration-200 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          >
            <FiTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
