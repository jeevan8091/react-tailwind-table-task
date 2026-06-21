import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const SIDEBAR_STATE_KEY = 'userDirectorySidebarOpen';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const savedValue = localStorage.getItem(SIDEBAR_STATE_KEY);
    if (savedValue !== null) {
      return savedValue === 'true';
    }

    return window.innerWidth >= 1024;
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_KEY, String(isSidebarOpen));
  }, [isSidebarOpen]);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((current) => !current);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Sidebar backdrop (visual only — no click-to-close) */}
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden pointer-events-none transition-opacity duration-300 ease-in-out ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out">
          <Header onMenuClick={toggleSidebar} />
          <main className="px-6 pt-3 pb-6">
            <Outlet />
          </main>
        </div>
    </div>
  );
};

export default Layout;
