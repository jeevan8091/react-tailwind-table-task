import { NavLink } from 'react-router-dom';
import { FiLayout } from 'react-icons/fi';

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h8V3H3v10zm10 8h8V3h-8v18zM3 21h8v-6H3v6z" />
      </svg>
    ),
  },
  {
    label: 'Users',
    path: '/users',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Employee Form',
    path: '/employee-form',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    label: 'Form Designer',
    path: '/dynamic-form-builder',
    icon: <FiLayout className="h-5 w-5" />,    
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  }
];

const Sidebar = ({ isOpen, onClose }) => {
  const linkClassName = ({ isActive }) =>
    [
      'group relative flex h-11 items-center rounded-xl text-sm font-semibold transition-[background-color,color,box-shadow] duration-200 px-3 justify-start',
      isActive
        ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
    ].join(' ');

  return (
    <aside
      className={[
        'fixed inset-y-0 left-0 z-40 w-60 border-r border-slate-200 bg-white shadow-xl transition-[transform,width] duration-300 ease-in-out will-change-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
        isOpen ? 'lg:w-60' : 'lg:w-16',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
    >
      <div className="flex h-full flex-col">
        <div className="flex min-h-16 items-center border-b border-slate-100 px-3 justify-between">
          <div className="flex min-w-0 items-center">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-200">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className={`transition-opacity transition-transform duration-300 ease-in-out will-change-transform ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
              ${isOpen ? '' : 'pointer-events-none'}
            `}>
              <p className="text-base font-bold text-slate-800 leading-tight">Workforce Hub</p>
              <p className="text-xs font-semibold text-slate-500 leading-tight">Admin Dashboard</p>
            </div>
          </div>

          {isOpen && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-slate-500 transition-colors duration-200 hover:bg-slate-100 lg:hidden"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 py-4 px-2.5" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClassName} aria-label={item.label}>
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center">{item.icon}</span>
              <span className={`transition-opacity transition-transform duration-300 ease-in-out will-change-transform ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                {item.label}
              </span>
              {!isOpen && (
                <span className="pointer-events-none absolute left-[calc(100%+0.75rem)] top-1/2 z-50 -translate-y-1/2 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg shadow-slate-900/10 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:translate-x-0.5 group-focus-visible:opacity-100">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
