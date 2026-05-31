// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHospitalUser, FaCalendarCheck, FaFileMedical, FaChartLine, FaShieldAlt, FaUserMd } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                <FaHospitalUser className="text-white text-xl" />
              </div>
              <span className="font-bold text-xl text-gray-800">Kiambu Hospital</span>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full ml-2">RMS</span>
            </div>
            <div className="flex gap-3">
              <Link to="/login" className="px-5 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition">Login</Link>
              <Link to="/register" className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm">Register</Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Modern <span className="text-blue-600">Hospital Record</span> Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Streamline patient records, appointments, and medical history with our comprehensive digital solution for Kiambu Hospital.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg">
              Get Started Free
            </Link>
            <Link to="/login" className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
              Sign In
            </Link>
          </div>
        </div>
        
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaUserMd className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Patient Management</h3>
            <p className="text-gray-500">Register, update, and track all patient information securely.</p>
          </div>
          <div className="card text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaCalendarCheck className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Appointment Scheduling</h3>
            <p className="text-gray-500">Manage appointments with automated reminders.</p>
          </div>
          <div className="card text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaFileMedical className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Medical Records</h3>
            <p className="text-gray-500">Secure digital storage of diagnoses and prescriptions.</p>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our System?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <FaShieldAlt className="text-blue-600 text-3xl flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Secure & Reliable</h3>
                <p className="text-gray-500">All data stored locally with encryption and role-based access control.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <FaChartLine className="text-blue-600 text-3xl flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Analytics & Reports</h3>
                <p className="text-gray-500">Generate detailed reports for better decision making.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>&copy; 2024 Kiambu Hospital Record Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;