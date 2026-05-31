// src/context/NotificationContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { DataContext } from './DataContext';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { appointments } = useContext(DataContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load notifications from localStorage
    const stored = localStorage.getItem('khms_notifications');
    if (stored) {
      const parsed = JSON.parse(stored);
      setNotifications(parsed);
      setUnreadCount(parsed.filter(n => !n.read).length);
    }
  }, []);

  useEffect(() => {
    // Check for upcoming appointments (within next 24 hours)
    if (appointments.length > 0) {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const upcoming = appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= now && aptDate <= tomorrow && apt.status === 'Scheduled';
      });
      
      upcoming.forEach(apt => {
        const exists = notifications.some(n => n.appointmentId === apt.id);
        if (!exists) {
          addNotification({
            type: 'appointment',
            title: 'Upcoming Appointment',
            message: `Patient ${apt.patientName} has an appointment tomorrow at ${apt.time}`,
            appointmentId: apt.id,
            read: false
          });
        }
      });
    }
  }, [appointments]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notification,
      createdAt: new Date().toISOString()
    };
    const updated = [newNotification, ...notifications];
    setNotifications(updated);
    localStorage.setItem('khms_notifications', JSON.stringify(updated));
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('khms_notifications', JSON.stringify(updated));
    setUnreadCount(updated.filter(n => !n.read).length);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('khms_notifications', JSON.stringify(updated));
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.setItem('khms_notifications', JSON.stringify([]));
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};