import { useState, useEffect } from 'react';

const Table = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // API loading sequence for User list data
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Filter users based on multi-field search query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.company.name.toLowerCase().includes(query) ||
      user.address.city.toLowerCase().includes(query) ||
      user.address.street.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query) ||
      user.website.toLowerCase().includes(query)
    );
  });

  // Extract initials from first and last name
  const getInitials = (name) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Dynamic row border accent mapping
  const getAccent = (id) => {
    const accentCycle = id % 5;
    const styles = [
      {
        border: 'border-l-4 border-l-blue-500 group-hover:border-l-blue-600',
        text: 'text-blue-600',
        glow: 'group-hover:shadow-blue-50/50 group-hover:shadow-md',
        avatar: 'bg-gradient-to-tr from-blue-500 to-indigo-600',
      },
      {
        border: 'border-l-4 border-l-emerald-500 group-hover:border-l-emerald-600',
        text: 'text-emerald-600',
        glow: 'group-hover:shadow-emerald-50/50 group-hover:shadow-md',
        avatar: 'bg-gradient-to-tr from-emerald-500 to-teal-600',
      },
      {
        border: 'border-l-4 border-l-purple-500 group-hover:border-l-purple-600',
        text: 'text-purple-600',
        glow: 'group-hover:shadow-purple-50/50 group-hover:shadow-md',
        avatar: 'bg-gradient-to-tr from-purple-500 to-pink-600',
      },
      {
        border: 'border-l-4 border-l-orange-500 group-hover:border-l-orange-600',
        text: 'text-orange-600',
        glow: 'group-hover:shadow-orange-50/50 group-hover:shadow-md',
        avatar: 'bg-gradient-to-tr from-orange-500 to-amber-600',
      },
      {
        border: 'border-l-4 border-l-pink-500 group-hover:border-l-pink-600',
        text: 'text-pink-600',
        glow: 'group-hover:shadow-pink-50/50 group-hover:shadow-md',
        avatar: 'bg-gradient-to-tr from-pink-500 to-rose-600',
      },
    ];
    return styles[accentCycle];
  };

  // Render a loading skeleton to create a premium experience
  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Title skeleton */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-9 w-64 bg-slate-200 rounded-lg mb-2"></div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-white/70 backdrop-blur-md rounded-2xl border border-white/20 p-6"></div>
          ))}
        </div>

        {/* Search skeleton */}
        <div className="h-12 w-full max-w-md mx-auto bg-white rounded-full"></div>

        {/* Table skeleton */}
        <div className="h-96 bg-white rounded-3xl p-6 border border-slate-100"></div>
      </div>
    );
  }

  // Calculate live statistics
  const totalCount = users.length;
  const uniqueCompanies = new Set(users.map((u) => u.company.name)).size;
  const uniqueWebsites = new Set(users.map((u) => u.website)).size;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 select-none">
      {/* Title Section */}
      <div className="text-center relative">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          User Directory
        </h1>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-3 rounded-full opacity-80"></div>
      </div>

      {/* Modern Dashboard Statistics Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Card 1: Total Users */}
        <div className="group relative overflow-hidden backdrop-blur-md bg-white/75 border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-blue-500/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125"></div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-md shadow-indigo-200/50 transition-transform duration-300 group-hover:rotate-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Directory size</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">
                {searchQuery ? `${filteredUsers.length} / ${totalCount}` : totalCount}
              </h3>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-indigo-500 font-medium">
            <span>Fetched via dynamic API</span>
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
          </div>
        </div>

        {/* Card 3: Unique Companies */}
        <div className="group relative overflow-hidden backdrop-blur-md bg-white/75 border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-purple-100/50 hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125"></div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl shadow-md shadow-purple-200/50 transition-transform duration-300 group-hover:rotate-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Corporate Hubs</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{uniqueCompanies}</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-purple-600 font-medium">
            <span>Unique corporate groups</span>
          </div>
        </div>

        {/* Card 4: Web Portals */}
        <div className="group relative overflow-hidden backdrop-blur-md bg-white/75 border border-white/40 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-orange-100/50 hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125"></div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-xl shadow-md shadow-orange-200/50 transition-transform duration-300 group-hover:rotate-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registered Domains</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{uniqueWebsites}</h3>
            </div>
          </div>
          <div className="mt-4 text-xs text-orange-600 font-medium">
            <span>Verified digital portals</span>
          </div>
        </div>
      </div>

      {/* Modern Search bar Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto w-full">
        <div className="relative w-full shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow duration-300 rounded-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search users by name, email, company, address..."
            className="w-full bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full pl-12 pr-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        {searchQuery && (
          <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100 animate-fade-in whitespace-nowrap">
            Found {filteredUsers.length} users
          </div>
        )}
      </div>

      {/* Floating Card Container for the Responsive Table */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-100/50 border border-slate-100 p-6 overflow-hidden transition-all duration-300">
        <div className="overflow-x-auto rounded-2xl scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
          <table className="w-full border-separate border-spacing-y-3.5 text-left text-gray-600 min-w-[1000px]">
            <thead>
              <tr className="text-xs text-white uppercase bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 tracking-wider">
                <th className="px-6 py-4 font-black rounded-l-2xl">ID</th>
                <th className="px-6 py-4 font-black">User Details</th>
                <th className="px-6 py-4 font-black">Email Address</th>
                <th className="px-6 py-4 font-black">Phone Number</th>
                <th className="px-6 py-4 font-black">Website</th>
                <th className="px-6 py-4 font-black">Full Address</th>
                <th className="px-6 py-4 font-black rounded-r-2xl">Company details</th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => {
                  const accent = getAccent(user.id);
                  const initials = getInitials(user.name);
                  const cellBg = index % 2 === 0 ? 'bg-white group-hover:bg-blue-50/20' : 'bg-slate-50/70 group-hover:bg-blue-50/20';

                  return (
                    <tr
                      key={user.id}
                      className="group transition-all duration-300 ease-out hover:scale-[1.005] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-100/70"
                    >
                      {/* ID Row Card with Left border accent */}
                      <td
                        className={`px-6 py-4 font-extrabold text-slate-800 rounded-l-2xl border-l-4 ${accent.border} ${cellBg} transition-all duration-300`}
                      >
                        {user.id}
                      </td>

                      {/* User Profile Card Identity block */}
                      <td className={`px-6 py-4 ${cellBg} transition-all duration-300`}>
                        <div className="flex items-center space-x-3.5">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm tracking-wide shadow-sm shadow-indigo-100 ${accent.avatar} text-white`}
                          >
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 group-hover:text-indigo-900 transition-colors duration-200">
                              {user.name}
                            </div>
                            <div className="text-xs font-semibold text-slate-400">@{user.username}</div>
                          </div>
                        </div>
                      </td>

                      {/* Email Badging Block */}
                      <td className={`px-6 py-4 ${cellBg} transition-all duration-300`}>
                        <a
                          href={`mailto:${user.email}`}
                          className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-indigo-700 hover:underline transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-indigo-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {user.email}
                        </a>
                      </td>

                      {/* Phone Badging Block */}
                      <td className={`px-6 py-4 text-xs font-bold text-slate-700 ${cellBg} transition-all duration-300`}>
                        <div className="inline-flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          {user.phone}
                        </div>
                      </td>

                      {/* Website Badging Block */}
                      <td className={`px-6 py-4 ${cellBg} transition-all duration-300`}>
                        <a
                          href={`https://${user.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 hover:shadow-sm hover:shadow-emerald-100 transition-all duration-200"
                        >
                          <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          {user.website}
                          <svg className="w-3.5 h-3.5 ml-1 opacity-70" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </td>

                      {/* Location Coordinate Badging block */}
                      <td className={`px-6 py-4 ${cellBg} max-w-xs transition-all duration-300`}>
                        <div className="flex items-start">
                          <svg
                            className="w-4 h-4 mr-1.5 text-rose-500 shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <div className="text-slate-800 text-xs font-semibold leading-relaxed">
                              {`${user.address.street}, ${user.address.suite}, ${user.address.city}`}
                            </div>
                            <div className="text-slate-400 text-[10px] font-bold tracking-wider mt-1 inline-flex items-center bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50 font-mono">
                              📍 Geo: {user.address.geo.lat}, {user.address.geo.lng}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Corporate Identity block */}
                      <td className={`px-6 py-4 rounded-r-2xl ${cellBg} transition-all duration-300`}>
                        <div className="flex items-start">
                          <svg
                            className="w-4 h-4 mr-2 text-violet-500 shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <div>
                            <div className="font-bold text-slate-800 text-xs">{user.company.name}</div>
                            <div className="text-[11px] font-medium text-slate-400 italic mt-1 leading-snug break-words max-w-[170px]">
                              "{user.company.catchPhrase}"
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
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