import React, { ReactNode, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';

interface MainLayoutProps {
  children: ReactNode;
  brandName: string;
  onLogout: () => void;
}

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: 'inbox' },
  { name: 'Analytics', href: '/analytics', icon: 'chart-bar' },
  { name: 'Teams', href: '/teams', icon: 'users' },
];

const MainLayout: React.FC<MainLayoutProps> = ({ children, brandName, onLogout }) => {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const getPageTitle = () => {
    if (location.pathname.startsWith('/query/')) return 'Query Details';
    const currentNav = navItems.find(item => location.pathname.startsWith(item.href));
    return currentNav ? currentNav.name : 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-light dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <aside className={`flex-shrink-0 bg-dark dark:bg-gray-800 flex flex-col text-gray-300 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className={`h-16 flex items-center border-b border-gray-700/50 ${isSidebarCollapsed ? 'justify-center' : 'px-4'}`}>
           <a href="#/dashboard" className="text-2xl font-bold text-white flex items-center gap-2">
            <Icon name="sparkles" className="w-7 h-7 flex-shrink-0" />
            <span className={`whitespace-nowrap overflow-hidden transition-all duration-200 ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>AQMS</span>
           </a>
        </div>
        <nav className={`flex-grow py-6 transition-all duration-300 ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}>
          <span className={`px-4 text-xs font-semibold uppercase text-gray-500 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>Navigation</span>
          <ul className="mt-2">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center py-2.5 my-1 rounded-lg text-sm font-medium transition-colors ${isSidebarCollapsed ? 'px-3 justify-center' : 'px-4'} ${
                      isActive
                        ? 'bg-primary/10 text-white'
                        : 'hover:bg-primary/5'
                    }`
                  }
                >
                  <Icon name={item.icon} className={`w-5 h-5 ${isSidebarCollapsed ? '' : 'mr-3'}`} />
                  <span className={`${isSidebarCollapsed ? 'hidden' : 'inline'}`}>{item.name}</span>
                </NavLink>
                {isSidebarCollapsed && (
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-dark text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className={`p-4 border-t border-gray-700/50 whitespace-nowrap overflow-hidden transition-all duration-200 ${isSidebarCollapsed ? 'h-0 p-0 border-none' : ''}`}>
            <span className="text-sm font-medium">Brand: <span className="text-primary-300 font-bold">{brandName}</span></span>
        </div>
        {/* Sidebar Toggle Button */}
        <div className="p-2 border-t border-gray-700/50">
            <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={`w-full flex items-center p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}
                title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
                <Icon name={isSidebarCollapsed ? 'chevron-double-right' : 'chevron-double-left'} className="w-5 h-5 flex-shrink-0" />
                <span className={`ml-3 text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-200 ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                    Collapse
                </span>
            </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-dark border-b dark:border-gray-700/50 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white block">{getPageTitle()}</h2>
          </div>
          <div className="flex items-center space-x-4">
             <div className="relative">
                 <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                 <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 border rounded-lg bg-light dark:text-gray-900 dark:bg-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
             </div>
             <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2">
                    <img className="w-10 h-10 rounded-full" src="https://picsum.photos/seed/user/100/100" alt="User" />
                    <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">Admin User</span>
                    <Icon name="chevron-down" className="w-4 h-4" />
                </button>
                {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20">
                        <a href="#/login" onClick={onLogout} className="flex items-center px-4 py-2 text-sm text-danger hover:bg-gray-100 dark:hover:bg-gray-700">
                           <Icon name="logout" className="w-4 h-4 mr-2" />
                           Logout
                        </a>
                    </div>
                )}
             </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;