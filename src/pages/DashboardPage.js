// src/pages/DashboardPage.js
import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { FaUsers, FaUserMd, FaCalendarAlt, FaClipboardList, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const DashboardPage = () => {
  const { patients, appointments, medicalRecords } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 4,
    totalAppointments: 0,
    totalTreatments: 0,
    recentActivities: [],
    upcomingAppointments: []
  });

  useEffect(() => {
    const today = new Date();
    const upcoming = appointments.filter(apt => new Date(apt.date) >= today && apt.status === 'Scheduled').slice(0, 5);
    
    setStats({
      totalPatients: patients.length,
      totalDoctors: 4,
      totalAppointments: appointments.length,
      totalTreatments: medicalRecords.length,
      upcomingAppointments: upcoming,
      recentActivities: [
        { id: 1, action: 'New patient registered', time: '2 mins ago', user: 'Receptionist' },
        { id: 2, action: 'Appointment scheduled', time: '1 hour ago', user: 'Dr. James' },
        { id: 3, action: 'Medical record updated', time: '3 hours ago', user: 'Nurse Ann' },
      ]
    });
  }, [patients, appointments, medicalRecords]);

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Patients', data: [45, 52, 68, 74, 89, patients.length], backgroundColor: '#3B82F6', borderRadius: 8 },
      { label: 'Appointments', data: [38, 42, 55, 61, 72, appointments.length], backgroundColor: '#10B981', borderRadius: 8 }
    ]
  };

  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{ label: 'Treatments', data: [28, 35, 42, medicalRecords.length], borderColor: '#F59E0B', tension: 0.4, fill: true, backgroundColor: 'rgba(245,158,11,0.1)' }]
  };

  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user?.fullName}</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="card flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Patients</p>
            <p className="text-3xl font-bold">{stats.totalPatients}</p>
            <span className="text-green-500 text-xs flex items-center mt-1"><FaArrowUp className="mr-1" /> +12%</span>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center"><FaUsers className="text-blue-600 text-xl" /></div>
        </div>
        
        <div className="card flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Doctors</p>
            <p className="text-3xl font-bold">{stats.totalDoctors}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center"><FaUserMd className="text-green-600 text-xl" /></div>
        </div>
        
        <div className="card flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Appointments</p>
            <p className="text-3xl font-bold">{stats.totalAppointments}</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center"><FaCalendarAlt className="text-purple-600 text-xl" /></div>
        </div>
        
        <div className="card flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Treatments</p>
            <p className="text-3xl font-bold">{stats.totalTreatments}</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center"><FaClipboardList className="text-orange-600 text-xl" /></div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-4">Patient & Appointment Trends</h3>
          <div className="h-64"><Bar data={barChartData} options={chartOptions} /></div>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-4">Treatment Activity</h3>
          <div className="h-64"><Line data={lineChartData} options={chartOptions} /></div>
        </div>
      </div>
      
      {/* Recent Activity & Upcoming Appointments */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {stats.recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b">
                <div><p className="font-medium">{activity.action}</p><p className="text-xs text-gray-400">{activity.user}</p></div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h3 className="font-semibold mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            {stats.upcomingAppointments.length > 0 ? stats.upcomingAppointments.map(apt => (
              <div key={apt.id} className="flex justify-between items-center py-2 border-b">
                <div><p className="font-medium">{apt.patientName}</p><p className="text-xs text-gray-400">{apt.date} at {apt.time}</p></div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{apt.doctor}</span>
              </div>
            )) : <p className="text-gray-400 text-center py-4">No upcoming appointments</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;