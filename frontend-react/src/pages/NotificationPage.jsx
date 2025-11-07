// src/pages/NotificationPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import './pages.css';

export default function NotificationPage() {
  const {
    notifications,
    markNotificationRead,
    removeNotification,
    markAllNotificationsRead,
    user
  } = useAuth();

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Vui lòng đăng nhập để xem thông báo.</p>
      </div>
    );
  }

  return (
    <section className="section-outer section-white">
      <div className="container-1200 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Thông báo</h1>
        {unreadCount > 0 && (
          <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-600">
              {unreadCount} thông báo chưa đọc
            </span>
            <button
              onClick={markAllNotificationsRead}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Đánh dấu tất cả đã đọc
            </button>
          </div>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500">Chưa có thông báo nào</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
                notification.read
                  ? 'border-gray-300 opacity-75'
                  : notification.type === 'error'
                  ? 'border-red-500'
                  : notification.type === 'success'
                  ? 'border-green-500'
                  : 'border-blue-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className={`${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  {!notification.read && (
                    <button
                      onClick={() => markNotificationRead(notification.id)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                      title="Đánh dấu đã đọc"
                    >
                      ✓
                    </button>
                  )}
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="text-xs text-red-600 hover:text-red-800"
                    title="Xóa"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </section>
  );
}
