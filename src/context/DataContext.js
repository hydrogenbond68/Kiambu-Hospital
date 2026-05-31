// src/context/DataContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { generateSampleData } from '../utils/sampleData';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize or load from localStorage
    const storedPatients = localStorage.getItem('khms_patients');
    const storedAppointments = localStorage.getItem('khms_appointments');
    const storedRecords = localStorage.getItem('khms_medical_records');
    
    if (!storedPatients) {
      const sampleData = generateSampleData();
      localStorage.setItem('khms_patients', JSON.stringify(sampleData.patients));
      localStorage.setItem('khms_appointments', JSON.stringify(sampleData.appointments));
      localStorage.setItem('khms_medical_records', JSON.stringify(sampleData.medicalRecords));
      setPatients(sampleData.patients);
      setAppointments(sampleData.appointments);
      setMedicalRecords(sampleData.medicalRecords);
    } else {
      setPatients(JSON.parse(storedPatients));
      setAppointments(JSON.parse(storedAppointments));
      //setMedicalRecords(JSON.parse(storedMedicalRecords));
    }
    
    // Set doctors from sample users with Doctor role
    const allUsers = JSON.parse(localStorage.getItem('khms_users') || '[]');
    const sampleDoctors = [
      { id: 'doc1', name: 'Dr. James Mwangi', specialty: 'Cardiology', phone: '+254712345678' },
      { id: 'doc2', name: 'Dr. Sarah Kariuki', specialty: 'Pediatrics', phone: '+254723456789' },
      { id: 'doc3', name: 'Dr. Michael Otieno', specialty: 'Orthopedics', phone: '+254734567890' },
    ];
    setDoctors(sampleDoctors);
    setLoading(false);
  }, []);

  // Helper functions
  const addPatient = (patient) => {
    const newPatient = { ...patient, id: Date.now().toString(), createdAt: new Date().toISOString() };
    const updated = [...patients, newPatient];
    setPatients(updated);
    localStorage.setItem('khms_patients', JSON.stringify(updated));
    return newPatient;
  };

  const updatePatient = (id, updatedData) => {
    const updated = patients.map(p => p.id === id ? { ...p, ...updatedData } : p);
    setPatients(updated);
    localStorage.setItem('khms_patients', JSON.stringify(updated));
  };

  const deletePatient = (id) => {
    const updated = patients.filter(p => p.id !== id);
    setPatients(updated);
    localStorage.setItem('khms_patients', JSON.stringify(updated));
  };

  const addAppointment = (appointment) => {
    const newAppointment = { ...appointment, id: Date.now().toString(), status: 'Scheduled', createdAt: new Date().toISOString() };
    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    localStorage.setItem('khms_appointments', JSON.stringify(updated));
    return newAppointment;
  };

  const updateAppointment = (id, updatedData) => {
    const updated = appointments.map(a => a.id === id ? { ...a, ...updatedData } : a);
    setAppointments(updated);
    localStorage.setItem('khms_appointments', JSON.stringify(updated));
  };

  const deleteAppointment = (id) => {
    const updated = appointments.filter(a => a.id !== id);
    setAppointments(updated);
    localStorage.setItem('khms_appointments', JSON.stringify(updated));
  };

  const addMedicalRecord = (record) => {
    const newRecord = { ...record, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] };
    const updated = [...medicalRecords, newRecord];
    setMedicalRecords(updated);
    localStorage.setItem('khms_medical_records', JSON.stringify(updated));
    return newRecord;
  };

  const updateMedicalRecord = (id, updatedData) => {
    const updated = medicalRecords.map(r => r.id === id ? { ...r, ...updatedData } : r);
    setMedicalRecords(updated);
    localStorage.setItem('khms_medical_records', JSON.stringify(updated));
  };

  return (
    <DataContext.Provider value={{
      patients, setPatients,
      appointments, setAppointments,
      medicalRecords, setMedicalRecords,
      doctors,
      loading,
      addPatient, updatePatient, deletePatient,
      addAppointment, updateAppointment, deleteAppointment,
      addMedicalRecord, updateMedicalRecord
    }}>
      {children}
    </DataContext.Provider>
  );
};