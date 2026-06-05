import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';

const Dashboard = () => {
  const { users, registeredUsers, loading, error } = useUsers();

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
      label: 'Registered Users',
      value: registeredUsers.length,
      description: 'Created in this admin session',
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-blue-600">
          Welcome Admin
        </p>
        <h2 className="mt-2 text-[30px] font-bold tracking-tight text-slate-800">
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
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-100 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">{stat.label}</p>
                    <h3 className="mt-3 text-[30px] font-bold text-slate-800">{stat.value}</h3>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-500">{stat.description}</p>
              </article>
            ))}
          </div>

          <section className="mt-8 border-t border-slate-100 pt-8">
            <h3 className="text-[20px] font-semibold text-slate-800">Quick Actions</h3>
            <p className="mt-1 text-sm font-medium text-slate-500">Frequently used shortcuts for admin workflow.</p>
            <div className="mt-5 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                to="/users"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-blue-700">Go to Users</p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-400">View and manage directory</p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-slate-400 transition-colors group-hover:text-blue-600">→</span>
              </Link>

              <Link
                to="/register-user"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-indigo-700">Register User</p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-400">Create a new local record</p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-slate-400 transition-colors group-hover:text-indigo-600">→</span>
              </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
