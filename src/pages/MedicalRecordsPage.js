// src/pages/MedicalRecordsPage.js
import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import { FaPlus, FaSearch, FaEdit, FaFileMedical } from 'react-icons/fa';

const MedicalRecordsPage = () => {
  const { medicalRecords, patients, addMedicalRecord, updateMedicalRecord } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '', diagnosis: '', prescription: '', treatment: '', notes: '', doctor: user?.fullName || ''
  });

  const filteredRecords = medicalRecords.filter(r => 
    r.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patients.find(p => p.id === r.patientId)?.fullName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRecord) {
      updateMedicalRecord(editingRecord.id, formData);
    } else {
      addMedicalRecord(formData);
    }
    setShowModal(false);
    setEditingRecord(null);
    setFormData({ patientId: '', diagnosis: '', prescription: '', treatment: '', notes: '', doctor: user?.fullName || '' });
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold">Medical Records</h1><p className="text-gray-500">Patient medical history and treatments</p></div>
        <button onClick={() => { setEditingRecord(null); setFormData({ patientId: '', diagnosis: '', prescription: '', treatment: '', notes: '', doctor: user?.fullName }); setShowModal(true); }} className="btn-primary flex items-center gap-2"><FaPlus /> Add Record</button>
      </div>
      
      <div className="card">
        <div className="relative mb-5"><FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Search records..." className="input-field pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        
        <div className="space-y-4">
          {filteredRecords.map(record => {
            const patient = patients.find(p => p.id === record.patientId);
            return (
              <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div><h3 className="font-semibold text-lg">{patient?.fullName || 'Unknown'} <span className="text-sm text-gray-400">({record.date})</span></h3><p className="text-sm text-gray-500">Doctor: {record.doctor}</p></div>
                  <button onClick={() => { setEditingRecord(record); setFormData(record); setShowModal(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FaEdit /></button>
                </div>
                <div className="mt-3 grid md:grid-cols-2 gap-3">
                  <div><p className="text-xs text-gray-400">Diagnosis</p><p className="font-medium">{record.diagnosis}</p></div>
                  <div><p className="text-xs text-gray-400">Prescription</p><p className="font-medium">{record.prescription}</p></div>
                  <div><p className="text-xs text-gray-400">Treatment</p><p>{record.treatment}</p></div>
                  <div><p className="text-xs text-gray-400">Notes</p><p className="text-sm">{record.notes}</p></div>
                </div>
              </div>
            );
          })}
          {filteredRecords.length === 0 && <p className="text-center text-gray-400 py-8">No medical records found</p>}
        </div>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-5 border-b"><h2 className="text-xl font-semibold">{editingRecord ? 'Edit Medical Record' : 'Add Medical Record'}</h2></div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <select className="input-field" value={formData.patientId} onChange={e => setFormData({...formData, patientId: e.target.value})} required>
                <option value="">Select Patient</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.fullName} ({p.id})</option>)}
              </select>
              <input type="text" placeholder="Diagnosis" className="input-field" value={formData.diagnosis} onChange={e => setFormData({...formData, diagnosis: e.target.value})} required />
              <input type="text" placeholder="Prescription" className="input-field" value={formData.prescription} onChange={e => setFormData({...formData, prescription: e.target.value})} />
              <input type="text" placeholder="Treatment Plan" className="input-field" value={formData.treatment} onChange={e => setFormData({...formData, treatment: e.target.value})} />
              <textarea placeholder="Additional Notes" rows="3" className="input-field" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsPage;