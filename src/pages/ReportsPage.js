// src/pages/ReportsPage.js
import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { FaFilePdf, FaFileCsv, FaChartPie } from 'react-icons/fa';

const ReportsPage = () => {
  const { patients, appointments, medicalRecords } = useContext(DataContext);
  const [reportType, setReportType] = useState('patients');

  const exportCSV = (data, filename) => {
    const headers = Object.keys(data[0] || {});
    const csv = [headers.join(','), ...data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    // Simple print-based PDF export
    const printContent = document.getElementById('report-content');
    const originalTitle = document.title;
    document.title = `KHMS_Report_${reportType}`;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html><head><title>Kiambu Hospital Report</title>
      <style>body{font-family:Arial;padding:20px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#2563EB;color:white}</style>
      </head><body>${printContent?.innerHTML || ''}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
    document.title = originalTitle;
  };

  const getReportData = () => {
    switch(reportType) {
      case 'patients': return patients.map(p => ({ ID: p.id, Name: p.fullName, Gender: p.gender, Phone: p.phone, BloodGroup: p.bloodGroup }));
      case 'appointments': return appointments.map(a => ({ ID: a.id, Patient: a.patientName, Doctor: a.doctor, Date: a.date, Status: a.status }));
      case 'treatments': return medicalRecords.map(r => ({ ID: r.id, PatientId: r.patientId, Diagnosis: r.diagnosis, Date: r.date, Doctor: r.doctor }));
      default: return patients;
    }
  };

  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-bold">Reports</h1><p className="text-gray-500">Generate and export hospital reports</p></div>
      
      <div className="card">
        <div className="flex flex-wrap gap-4 mb-6">
          <select className="input-field w-48" value={reportType} onChange={e => setReportType(e.target.value)}>
            <option value="patients">Patient Report</option><option value="appointments">Appointment Report</option><option value="treatments">Treatment Report</option>
          </select>
          <button onClick={() => exportCSV(getReportData(), `${reportType}_report`)} className="btn-secondary flex items-center gap-2"><FaFileCsv /> Export CSV</button>
          <button onClick={exportPDF} className="btn-secondary flex items-center gap-2"><FaFilePdf /> Export PDF</button>
        </div>
        
        <div id="report-content">
          <h2 className="text-xl font-bold mb-4">Kiambu Hospital - {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h2>
          <p className="text-gray-500 mb-4">Generated on: {new Date().toLocaleString()}</p>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-blue-600 text-white"><tr>{Object.keys(getReportData()[0] || {}).map(key => <th key={key} className="p-2 text-left">{key}</th>)}</tr></thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;