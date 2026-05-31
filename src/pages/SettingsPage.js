// src/pages/SettingsPage.js
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { FaMoon, FaSun, FaTrash, FaExclamationTriangle } from 'react-icons/fa';

const SettingsPage = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const clearAllData = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-500">Manage your application preferences</p></div>
      
      <div className="card"><h3 className="font-semibold mb-4">Appearance</h3><div className="flex items-center justify-between"><div><p className="font-medium">Dark Mode</p><p className="text-sm text-gray-500">Toggle between light and dark theme</p></div><button onClick={toggleDarkMode} className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">{darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon />}</button></div></div>
      
      <div className="card"><h3 className="font-semibold mb-4 text-red-600">Danger Zone</h3><p className="text-sm text-gray-500 mb-4">Once you delete all data, there is no going back.</p>{showClearConfirm ? (<div className="bg-red-50 p-4 rounded-lg"><p className="text-red-600 text-sm mb-3"><FaExclamationTriangle className="inline mr-2" />Are you sure? This will erase all patients, appointments, and records.</p><div className="flex gap-3"><button onClick={clearAllData} className="bg-red-600 text-white px-4 py-2 rounded-lg">Yes, Delete Everything</button><button onClick={() => setShowClearConfirm(false)} className="btn-secondary">Cancel</button></div></div>) : (<button onClick={() => setShowClearConfirm(true)} className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"><FaTrash /> Clear All Data</button>)}</div>
    </div>
  );
};

export default SettingsPage;