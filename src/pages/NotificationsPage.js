// src/pages/NotificationsPage.js
import React, { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';
import { FaBell, FaCheckDouble, FaTrash, FaCheck } from 'react-icons/fa';

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useContext(NotificationContext);

  const getIcon = (type) => {
    switch(type) {
      case 'appointment': return '📅';
      case 'patient': return '👤';
      default: return '🔔';
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold">Notifications</h1><p className="text-gray-500">Stay updated with hospital alerts</p></div>
        <div className="flex gap-2">
          <button onClick={markAllAsRead} className="btn-secondary flex items-center gap-2 text-sm"><FaCheckDouble /> Mark All Read</button>
          <button onClick={clearNotifications} className="btn-secondary flex items-center gap-2 text-sm"><FaTrash /> Clear All</button>
        </div>
      </div>
      
      <div className="card">
        {notifications.length === 0 ? (
          <div className="text-center py-12"><FaBell className="text-4xl text-gray-300 mx-auto mb-3" /><p className="text-gray-400">No notifications yet</p></div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notif => (
              <div key={notif.id} className={`p-4 rounded-lg border flex items-start justify-between transition ${notif.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200'}`}>
                <div className="flex gap-3">
                  <span className="text-2xl">{getIcon(notif.type)}</span>
                  <div><h3 className="font-semibold">{notif.title}</h3><p className="text-gray-500 text-sm">{notif.message}</p><p className="text-xs text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p></div>
                </div>
                {!notif.read && <button onClick={() => markAsRead(notif.id)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"><FaCheck /></button>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;