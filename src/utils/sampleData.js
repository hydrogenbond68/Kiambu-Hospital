// src/utils/sampleData.js
export const generateSampleData = () => {
  const patients = [
    { id: 'P001', fullName: 'John Mburu', gender: 'Male', dateOfBirth: '1985-06-15', nationalId: '12345678', phone: '+254712345678', email: 'john@email.com', address: 'Nairobi', emergencyContact: '+254723456789', bloodGroup: 'O+', allergies: 'None' },
    { id: 'P002', fullName: 'Mary Wanjiku', gender: 'Female', dateOfBirth: '1990-09-22', nationalId: '87654321', phone: '+254734567890', email: 'mary@email.com', address: 'Kiambu', emergencyContact: '+254745678901', bloodGroup: 'A+', allergies: 'Penicillin' },
    { id: 'P003', fullName: 'Peter Omondi', gender: 'Male', dateOfBirth: '1978-03-10', nationalId: '11223344', phone: '+254756789012', email: 'peter@email.com', address: 'Thika', emergencyContact: '+254767890123', bloodGroup: 'B+', allergies: 'None' },
    { id: 'P004', fullName: 'Grace Achieng', gender: 'Female', dateOfBirth: '1995-11-30', nationalId: '44332211', phone: '+254778901234', email: 'grace@email.com', address: 'Ruiru', emergencyContact: '+254789012345', bloodGroup: 'AB+', allergies: 'Sulfa' },
  ];
  
  const appointments = [
    { id: 'A001', patientId: 'P001', patientName: 'John Mburu', doctor: 'Dr. James Mwangi', date: '2024-12-20', time: '10:00 AM', status: 'Scheduled', type: 'General Checkup' },
    { id: 'A002', patientId: 'P002', patientName: 'Mary Wanjiku', doctor: 'Dr. Sarah Kariuki', date: '2024-12-21', time: '11:30 AM', status: 'Scheduled', type: 'Pediatric' },
    { id: 'A003', patientId: 'P003', patientName: 'Peter Omondi', doctor: 'Dr. Michael Otieno', date: '2024-12-19', time: '02:00 PM', status: 'Completed', type: 'Orthopedic' },
    { id: 'A004', patientId: 'P004', patientName: 'Grace Achieng', doctor: 'Dr. James Mwangi', date: '2024-12-22', time: '09:00 AM', status: 'Scheduled', type: 'Cardiology' },
  ];
  
  const medicalRecords = [
    { id: 'R001', patientId: 'P001', diagnosis: 'Hypertension', prescription: 'Lisinopril 10mg', treatment: 'Blood pressure monitoring', date: '2024-11-15', doctor: 'Dr. James Mwangi', notes: 'Follow up in 2 weeks' },
    { id: 'R002', patientId: 'P002', diagnosis: 'Malaria', prescription: 'Artemether/Lumefantrine', treatment: 'Antimalarial course', date: '2024-12-01', doctor: 'Dr. Sarah Kariuki', notes: 'Complete dosage' },
    { id: 'R003', patientId: 'P003', diagnosis: 'Fractured Arm', prescription: 'Pain relievers', treatment: 'Cast applied', date: '2024-12-10', doctor: 'Dr. Michael Otieno', notes: 'Review in 4 weeks' },
  ];
  
  return { patients, appointments, medicalRecords };
};