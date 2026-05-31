// src/pages/AppointmentsPage.js
import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AppointmentsPage = () => {
  const { appointments, doctors, addAppointment, updateAppointment, deleteAppointment, patients } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '', patientName: '', doctor: doctors[0]?.name || '', date: '', time: '', type: 'General Checkup', status: 'Scheduled'
  });

  const filteredAppointments = appointments.filter(a => 
    a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPatient = patients.find(p => p.id === formData.patientId);
    const appointmentData = {
      ...formData,
      patientName: selectedPatient ? selectedPatient.fullName : formData.patientName,
      id: editingAppointment ? editingAppointment.id : `A${String(appointments.length + 1).padStart(3, '0')}`
    };
    if (editingAppointment) {
      updateAppointment(editingAppointment.id, appointmentData);
    } else {
      addAppointment(appointmentData);
    }
    setShowModal(false);
    setEditingAppointment(null);
    setFormData({ patientId: '', patientName: '', doctor: doctors[0]?.name, date: '', time: '', type: 'General Checkup', status: 'Scheduled' });
  };

  const handleStatusChange = (id, newStatus) => {
    updateAppointment(id, { status: newStatus });
  };

  const canEdit = user?.role !== 'Nurse';

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold">Appointments</h1><p className="text-gray-500">Schedule and manage patient appointments</p></div>
        <button onClick={() => { setEditingAppointment(null); setFormData({ patientId: '', patientName: '', doctor: doctors[0]?.name, date: '', time: '', type: 'General Checkup', status: 'Scheduled' }); setShowModal(true); }} className="btn-primary flex items-center gap-2"><FaPlus /> New Appointment</button>
      </div>
      
      <div className="card">
        <div className="relative mb-5"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search appointments..." className="input-field pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-gray-50"><th className="px-4 py-3 text-left">Patient</th><th className="px-4 py-3 text-left">Doctor</th><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3 text-left">Time</th><th className="px-4 py-3 text-left">Type</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-center">Actions</th></tr></thead>
            <tbody>
              {filteredAppointments.map(apt => (
                <tr key={apt.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{apt.patientName}</td>
                  <td className="px-4 py-3">{apt.doctor}</td>
                  <td className="px-4 py-3">{apt.date}</td>
                  <td className="px-4 py-3">{apt.time}</td>
                  <td className="px-4 py-3">{apt.type}</td>
                  <td className="px-4 py-3">
                    <select value={apt.status} onChange={(e) => handleStatusChange(apt.id, e.target.value)} className={`text-xs rounded-full px-2 py-1 ${apt.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-700' : apt.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      <option>Scheduled</option><option>Completed</option><option>Cancelled</option><option>No-Show</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      {canEdit && <button onClick={() => { setEditingAppointment(apt); setFormData(apt); setShowModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><FaEdit /></button>}
                      {user?.role === 'Administrator' && <button onClick={() => deleteAppointment(apt.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FaTrash /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b"><h2 className="text-xl font-semibold">{editingAppointment ? 'Edit Appointment' : 'Schedule Appointment'}</h2></div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <select className="input-field" value={formData.patientId} onChange={e => setFormData({...formData, patientId: e.target.value, patientName: ''})} required>
                <option value="">Select Patient</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.fullName} ({p.id})</option>)}
              </select>
              <select className="input-field" value={formData.doctor} onChange={e => setFormData({...formData, doctor: e.target.value})} required>
                {doctors.map(d => <option key={d.id}>{d.name}</option>)}
              </select>
              <input type="date" className="input-field" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
              <input type="time" className="input-field" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
              <select className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option>General Checkup</option><option>Follow-up</option><option>Emergency</option><option>Consultation</option><option>Vaccination</option>
              </select>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;