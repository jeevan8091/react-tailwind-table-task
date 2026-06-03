import { useUsers } from '../../hooks/useUsers';

const Dashboard = () => {
  const { users, addedUsers, loading, error } = useUsers();

  const stats = [
    {
      label: 'Total Users',
      value: users.length,
      description: 'All API and locally added records',
    },
    {
      label: 'Total Companies',
      value: new Set(users.map((user) => user.company?.name).filter(Boolean)).size,
      description: 'Unique organizations',
    },
    {
      label: 'Total Websites',
      value: new Set(users.map((user) => user.website).filter(Boolean)).size,
      description: 'Registered domains',
    },
    {
      label: 'Added Users',
      value: addedUsers.length,
      description: 'Created in this admin session',
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
          Welcome Admin 👋
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-800">
          User Directory Dashboard
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
          Monitor users, companies, websites, and locally added directory records from one workspace.
        </p>
      </section>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-white shadow-sm"></div>
          ))}
        </div>
      )}

      {error && (
        <div role="alert" className="rounded-2xl border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-600 shadow-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-100 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
                  <h3 className="mt-3 text-3xl font-black text-slate-800">{stat.value}</h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                </div>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-500">{stat.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
