// src/pages/PatientsPage.js
import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PatientsPage = () => {
  const { patients, addPatient, updatePatient, deletePatient } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '', gender: 'Male', dateOfBirth: '', nationalId: '', phone: '', email: '', address: '', emergencyContact: '', bloodGroup: 'O+', allergies: ''
  });

  const filteredPatients = patients.filter(p => 
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPatient) {
      updatePatient(editingPatient.id, formData);
    } else {
      addPatient({ ...formData, id: `P${String(patients.length + 1).padStart(3, '0')}` });
    }
    setShowModal(false);
    setEditingPatient(null);
    setFormData({ fullName: '', gender: 'Male', dateOfBirth: '', nationalId: '', phone: '', email: '', address: '', emergencyContact: '', bloodGroup: 'O+', allergies: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      deletePatient(id);
    }
  };

  const canEdit = user?.role === 'Administrator' || user?.role === 'Doctor' || user?.role === 'Receptionist';

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div><h1 className="text-2xl font-bold">Patient Management</h1><p className="text-gray-500">Manage all patient records</p></div>
        <button onClick={() => { setEditingPatient(null); setFormData({ fullName: '', gender: 'Male', dateOfBirth: '', nationalId: '', phone: '', email: '', address: '', emergencyContact: '', bloodGroup: 'O+', allergies: '' }); setShowModal(true); }} className="btn-primary flex items-center gap-2"><FaPlus /> Add Patient</button>
      </div>
      
      <div className="card">
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search by name, ID, or phone..." className="input-field pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr><th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th><th className="px-4 py-3 text-left">Name</th><th className="px-4 py-3 text-left">Gender</th><th className="px-4 py-3 text-left">Phone</th><th className="px-4 py-3 text-left">Blood Group</th><th className="px-4 py-3 text-center">Actions</th></tr>
            </thead>
            <tbody className="divide-y">
              {filteredPatients.map(patient => (
                <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-sm font-mono">{patient.id}</td>
                  <td className="px-4 py-3 font-medium">{patient.fullName}</td>
                  <td className="px-4 py-3">{patient.gender}</td>
                  <td className="px-4 py-3">{patient.phone}</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{patient.bloodGroup}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <Link to={`/patients/${patient.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FaEye /></Link>
                      {canEdit && <button onClick={() => { setEditingPatient(patient); setFormData(patient); setShowModal(true); }} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><FaEdit /></button>}
                      {user?.role === 'Administrator' && <button onClick={() => handleDelete(patient.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><FaTrash /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b"><h2 className="text-xl font-semibold">{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h2></div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="input-field" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required />
                <select className="input-field" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}><option>Male</option><option>Female</option><option>Other</option></select>
                <input type="date" placeholder="Date of Birth" className="input-field" value={formData.dateOfBirth} onChange={e => setFormData({...formData, dateOfBirth: e.target.value})} required />
                <input type="text" placeholder="National ID" className="input-field" value={formData.nationalId} onChange={e => setFormData({...formData, nationalId: e.target.value})} />
                <input type="tel" placeholder="Phone" className="input-field" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                <input type="email" placeholder="Email" className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <input type="text" placeholder="Address" className="input-field" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                <input type="text" placeholder="Emergency Contact" className="input-field" value={formData.emergencyContact} onChange={e => setFormData({...formData, emergencyContact: e.target.value})} />
                <select className="input-field" value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})}><option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option></select>
                <input type="text" placeholder="Allergies" className="input-field" value={formData.allergies} onChange={e => setFormData({...formData, allergies: e.target.value})} />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">{editingPatient ? 'Update' : 'Save'} Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;