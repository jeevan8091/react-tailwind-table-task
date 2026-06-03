// Stats cards: Directory size, Corporate Hubs, Registered Domains
const StatsCards = ({ users, filteredUsers, searchQuery }) => {
  const totalCount = users.length;
  const uniqueCompanies = new Set(users.map((u) => u.company.name)).size;
  const uniqueWebsites = new Set(users.map((u) => u.website)).size;

  return (
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

      {/* Card 2: Unique Companies */}
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

      {/* Card 3: Web Portals */}
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
  );
};

export default StatsCards;
