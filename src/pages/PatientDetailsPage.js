// src/pages/PatientDetailsPage.js
import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { FaArrowLeft, FaCalendarAlt, FaNotesMedical, FaPrescriptionBottle } from 'react-icons/fa';

const PatientDetailsPage = () => {
  const { id } = useParams();
  const { patients, medicalRecords, appointments } = useContext(DataContext);
  const [patient, setPatient] = useState(null);
  const [patientRecords, setPatientRecords] = useState([]);
  const [patientAppointments, setPatientAppointments] = useState([]);

  useEffect(() => {
    const found = patients.find(p => p.id === id);
    setPatient(found);
    setPatientRecords(medicalRecords.filter(r => r.patientId === id));
    setPatientAppointments(appointments.filter(a => a.patientId === id));
  }, [id, patients, medicalRecords, appointments]);

  if (!patient) return <div className="text-center py-12">Patient not found</div>;

  return (
    <div className="space-y-5">
      <Link to="/patients" className="inline-flex items-center gap-2 text-blue-600 hover:underline"><FaArrowLeft /> Back to Patients</Link>
      
      <div className="card"><div className="flex justify-between items-start"><div><h1 className="text-2xl font-bold">{patient.fullName}</h1><p className="text-gray-500">Patient ID: {patient.id}</p></div><div className="text-right"><p className="text-sm">Blood Group: <span className="font-mono bg-blue-100 px-2 py-1 rounded">{patient.bloodGroup}</span></p></div></div><div className="grid md:grid-cols-2 gap-4 mt-4"><div><p><strong>Gender:</strong> {patient.gender}</p><p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p><p><strong>National ID:</strong> {patient.nationalId}</p></div><div><p><strong>Phone:</strong> {patient.phone}</p><p><strong>Email:</strong> {patient.email}</p><p><strong>Address:</strong> {patient.address}</p></div><div className="col-span-2"><p><strong>Emergency Contact:</strong> {patient.emergencyContact}</p><p><strong>Allergies:</strong> {patient.allergies || 'None'}</p></div></div></div>
      
      <div className="card"><h2 className="text-xl font-semibold mb-4">Medical History</h2>{patientRecords.length > 0 ? patientRecords.map(rec => (<div key={rec.id} className="border-l-4 border-blue-500 pl-4 mb-3"><p className="font-medium">{rec.diagnosis}</p><p className="text-sm text-gray-500">{rec.date} - Dr. {rec.doctor}</p><p className="text-sm mt-1">{rec.treatment}</p></div>)) : <p className="text-gray-400">No medical records found</p>}</div>
      
      <div className="card"><h2 className="text-xl font-semibold mb-4">Appointment History</h2>{patientAppointments.length > 0 ? patientAppointments.map(apt => (<div key={apt.id} className="flex justify-between items-center border-b py-2"><div><p className="font-medium">{apt.date} at {apt.time}</p><p className="text-sm text-gray-500">{apt.type} with {apt.doctor}</p></div><span className={`px-2 py-1 rounded-full text-xs ${apt.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{apt.status}</span></div>)) : <p className="text-gray-400">No appointments found</p>}</div>
    </div>
  );
};

export default PatientDetailsPage;