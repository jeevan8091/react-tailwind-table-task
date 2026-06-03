const StatsCards = ({ users, filteredUsers, searchQuery }) => {
  const totalCount = users.length;
  const uniqueCompanies = new Set(users.map((u) => u.company?.name).filter(Boolean)).size;
  const uniqueWebsites = new Set(users.map((u) => u.website).filter(Boolean)).size;
  const cards = [
    {
      label: 'Total Users',
      value: searchQuery ? `${filteredUsers.length} / ${totalCount}` : totalCount,
      description: 'Active directory records',
    },
    {
      label: 'Companies',
      value: uniqueCompanies,
      description: 'Unique organizations',
    },
    {
      label: 'Websites',
      value: uniqueWebsites,
      description: 'Registered domains',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.label}</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">{card.value}</h3>
            </div>
            <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-500">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
