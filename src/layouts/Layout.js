// src/layouts/Layout.js
import React, { useContext, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';
import { ThemeContext } from '../context/ThemeContext';
import { 
  FaUserMd, FaCalendarAlt, FaNotesMedical, FaChartBar, 
  FaBell, FaUserCircle, FaSignOutAlt, FaBars, FaTimes,
  FaMoon, FaSun, FaUsers, FaHome, FaUser
} from 'react-icons/fa';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const { unreadCount } = useContext(NotificationContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaHome /> },
    { path: '/patients', name: 'Patients', icon: <FaUsers /> },
    { path: '/appointments', name: 'Appointments', icon: <FaCalendarAlt /> },
    { path: '/medical-records', name: 'Medical Records', icon: <FaNotesMedical /> },
    { path: '/reports', name: 'Reports', icon: <FaChartBar /> },
    { path: '/notifications', name: 'Notifications', icon: <FaBell />, badge: unreadCount },
    { path: '/profile', name: 'Profile', icon: <FaUserCircle /> },
    { path: '/settings', name: 'Settings', icon: <FaUser /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-full transition-all duration-300 bg-white dark:bg-gray-800 shadow-xl ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FaUserMd className="text-white text-xl" />
              </div>
              <span className="font-bold text-gray-800 dark:text-white">Kiambu Hospital</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} ${!sidebarOpen ? 'justify-center' : ''}`}>
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="flex-1">{item.name}</span>}
              {sidebarOpen && item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{item.badge}</span>
              )}
            </NavLink>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            {sidebarOpen && <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>}
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon />}
            </button>
          </div>
          <button onClick={logout} className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all ${!sidebarOpen && 'justify-center'}`}>
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Welcome back, {user?.fullName?.split(' ')[0]}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</span>
            <button onClick={() => navigate('/profile')} className="flex items-center gap-2">
              <img src={user?.avatar} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-blue-500" />
            </button>
          </div>
        </header>
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;