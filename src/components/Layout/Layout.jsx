import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from '../../context/UserContext';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      // Auto-open/close sidebar on transition across desktop breakpoint
      setIsSidebarOpen(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((current) => !current);

  return (
    <UserProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {isSidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={closeSidebar}
            className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
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
