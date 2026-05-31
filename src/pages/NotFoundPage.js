// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaSearch className="text-blue-600 text-4xl" />
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-gray-500 mb-6">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2"><FaHome /> Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;