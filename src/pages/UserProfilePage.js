// src/pages/UserProfilePage.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit, FaSave } from 'react-icons/fa';

const UserProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('khms_user', JSON.stringify(updatedUser));
    setIsEditing(false);
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card text-center">
        <img src={user?.avatar} alt="Profile" className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500 mb-4" />
        {isEditing ? (
          <div className="space-y-4 max-w-md mx-auto">
            <input type="text" className="input-field" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
            <input type="email" className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <input type="tel" className="input-field" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            <button onClick={handleSave} className="btn-primary flex items-center gap-2 mx-auto"><FaSave /> Save Changes</button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold">{user?.fullName}</h2>
            <p className="text-blue-600 font-medium">{user?.role}</p>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2"><FaEnvelope className="text-gray-400" /><span>{user?.email}</span></div>
              <div className="flex items-center gap-2"><FaPhone className="text-gray-400" /><span>{user?.phone}</span></div>
              <div className="flex items-center gap-2"><FaCalendarAlt className="text-gray-400" /><span>Joined {user?.createdAt}</span></div>
            </div>
            <button onClick={() => setIsEditing(true)} className="mt-6 btn-secondary flex items-center gap-2 mx-auto"><FaEdit /> Edit Profile</button>
          </>
        )}
      </div>
      
      <div className="card"><h3 className="font-semibold mb-3">Account Information</h3><p><strong>Username:</strong> {user?.username}</p><p><strong>User ID:</strong> {user?.id}</p></div>
    </div>
  );
};

export default UserProfilePage;