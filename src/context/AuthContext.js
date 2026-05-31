// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const SAMPLE_USERS = [
  {
    id: '1',
    fullName: 'Dr. James Mwangi',
    username: 'admin',
    email: 'admin@kiambuhospital.co.ke',
    phone: '+254712345678',
    password: 'admin123',
    role: 'Administrator',
    avatar: 'https://ui-avatars.com/api/?background=2563EB&color=fff&name=Dr.+James+MW',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    fullName: 'Dr. Sarah Kariuki',
    username: 'doctor',
    email: 'doctor@kiambuhospital.co.ke',
    phone: '+254723456789',
    password: 'doctor123',
    role: 'Doctor',
    avatar: 'https://ui-avatars.com/api/?background=0891B2&color=fff&name=Dr.+Sarah+K',
    createdAt: '2024-02-10'
  },
  {
    id: '3',
    fullName: 'Nurse Ann Wanjiku',
    username: 'nurse',
    email: 'nurse@kiambuhospital.co.ke',
    phone: '+254734567890',
    password: 'nurse123',
    role: 'Nurse',
    avatar: 'https://ui-avatars.com/api/?background=059669&color=fff&name=Ann+Wanjiku',
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    fullName: 'Peter Maina',
    username: 'receptionist',
    email: 'reception@kiambuhospital.co.ke',
    phone: '+254745678901',
    password: 'reception123',
    role: 'Receptionist',
    avatar: 'https://ui-avatars.com/api/?background=7C3AED&color=fff&name=Peter+Maina',
    createdAt: '2024-02-05'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('khms_user');
    const token = localStorage.getItem('khms_token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const register = (userData) => {
    const existingUsers = JSON.parse(localStorage.getItem('khms_users') || '[]');
    const userExists = existingUsers.some(u => u.email === userData.email || u.username === userData.username);
    
    if (userExists) {
      throw new Error('User already exists with this email or username');
    }
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: `https://ui-avatars.com/api/?background=2563EB&color=fff&name=${encodeURIComponent(userData.fullName)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    delete newUser.confirmPassword;
    existingUsers.push(newUser);
    localStorage.setItem('khms_users', JSON.stringify(existingUsers));
    
    // Auto login after registration
    login({ username: userData.username, password: userData.password });
  };

  const login = (credentials) => {
    const allUsers = [...SAMPLE_USERS, ...JSON.parse(localStorage.getItem('khms_users') || '[]')];
    const foundUser = allUsers.find(
      u => (u.username === credentials.username || u.email === credentials.username) && u.password === credentials.password
    );
    
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }
    
    const { password, ...userWithoutPassword } = foundUser;
    const token = 'mock-jwt-token-' + Date.now();
    
    localStorage.setItem('khms_user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('khms_token', token);
    
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('khms_user');
    localStorage.removeItem('khms_token');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};