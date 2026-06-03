const SearchBar = ({ searchQuery, setSearchQuery, filteredUsers }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto w-full">
      <div className="relative w-full shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow duration-300 rounded-full">
        <label htmlFor="user-search" className="sr-only">
          Search users
        </label>
        <input
          id="user-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users by name, email, company, address..."
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
  );
};

export default SearchBar;
