import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
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
    <UserProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Sidebar backdrop (visual only — no click-to-close) */}
        {isSidebarOpen && (
          <div
            aria-hidden="true"
            className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden pointer-events-none"
          />
        )}

        <div className={`min-h-screen transition-all duration-300 ease-out ${isSidebarOpen ? 'lg:pl-72' : 'lg:pl-0'}`}>
          <Header onMenuClick={toggleSidebar} />
          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </UserProvider>
  );
};

export default Layout;
