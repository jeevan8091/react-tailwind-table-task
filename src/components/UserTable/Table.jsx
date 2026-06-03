import { useEffect, useMemo, useState } from 'react';
import StatsCards from './StatsCards';
import SearchBar from './SearchBar';
import UserTableHeader from './UserTableHeader';
import UserTableRow from './UserTableRow';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const getSearchText = (user) =>
  [
    user.name,
    user.username,
    user.email,
    user.company?.name,
    user.address?.city,
    user.address?.street,
    user.phone,
    user.website,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

const Table = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch(USERS_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load users. Please try again.');
        }

        return response.json();
      })
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setError('');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setError(error.message || 'Unable to load users. Please try again.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return users;

    return users.filter((user) => getSearchText(user).includes(query));
  }, [users, searchQuery]);

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="flex flex-col items-center mb-6">
          <div className="h-9 w-64 bg-slate-200 rounded-lg mb-2"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-white/70 backdrop-blur-md rounded-2xl border border-white/20 p-6"></div>
          ))}
        </div>

        <div className="h-12 w-full max-w-md mx-auto bg-white rounded-full"></div>
        <div className="h-96 bg-white rounded-3xl p-6 border border-slate-100"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div
          role="alert"
          className="bg-white/80 border border-rose-100 rounded-2xl p-6 text-center shadow-sm"
        >
          <h2 className="text-base font-bold text-slate-800">Could not load users</h2>
          <p className="mt-2 text-sm text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="text-center relative">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          User Directory
        </h1>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-3 rounded-full opacity-80"></div>
      </div>

      <StatsCards
        users={users}
        filteredUsers={filteredUsers}
        searchQuery={searchQuery}
      />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredUsers={filteredUsers}
      />

      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-100 p-4 sm:p-6 overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full border-separate border-spacing-y-3.5 text-left text-gray-600 min-w-[1000px]">
            <UserTableHeader />
            <tbody className="bg-transparent">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <UserTableRow key={user.id} user={user} index={index} />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center bg-white rounded-2xl">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="p-3 bg-red-50 text-red-500 rounded-full border border-red-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm">No matching users found</h3>
                      <p className="text-xs text-slate-400 max-w-xs">
                        Try refining your keywords or checking for spelling errors.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
