// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaHospitalUser } from 'react-icons/fa';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', username: '', email: '', phone: '', password: '', confirmPassword: '', role: 'Patient'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name required';
    if (!formData.username) newErrors.username = 'Username required';
    if (!formData.email) newErrors.email = 'Email required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone) newErrors.phone = 'Phone required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      const authContext = { register: () => {} };
      // Simulate registration
      const existingUsers = JSON.parse(localStorage.getItem('khms_users') || '[]');
      if (existingUsers.some(u => u.email === formData.email || u.username === formData.username)) {
        setServerError('User already exists');
        return;
      }
      
      const newUser = {
        id: Date.now().toString(),
        ...formData,
        avatar: `https://ui-avatars.com/api/?background=2563EB&color=fff&name=${encodeURIComponent(formData.fullName)}`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      delete newUser.confirmPassword;
      existingUsers.push(newUser);
      localStorage.setItem('khms_users', JSON.stringify(existingUsers));
      
      // Auto login
      localStorage.setItem('khms_user', JSON.stringify(newUser));
      localStorage.setItem('khms_token', 'mock-token');
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
              <FaHospitalUser className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="mt-3 text-2xl font-bold">Create Account</h2>
          <p className="text-gray-500 text-sm">Join Kiambu Hospital RMS</p>
        </div>
        
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {serverError && <div className="bg-red-50 text-red-700 p-2 rounded text-sm">{serverError}</div>}
          
          <div>
            <input type="text" placeholder="Full Name" className="input-field" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input type="text" placeholder="Username" className="input-field" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
              {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
            </div>
            <div>
              <input type="email" placeholder="Email" className="input-field" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input type="tel" placeholder="Phone" className="input-field" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>
            <div>
              <select className="input-field" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                <option>Patient</option>
                <option>Doctor</option>
                <option>Nurse</option>
                <option>Receptionist</option>
              </select>
            </div>
          </div>
          
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="input-field pr-10" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2"><FaEye /></button>
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
          
          <div className="relative">
            <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" className="input-field pr-10" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2"><FaEye /></button>
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
          </div>
          
          <button type="submit" className="btn-primary w-full py-2.5">Register</button>
          
          <p className="text-center text-sm">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;