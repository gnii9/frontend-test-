// src/pages/NotificationPage.jsx
import React from 'react';

export default function NotificationPage() {
  // Demo data; sau này lấy từ context/backend
  const notifications = [
    { id: 1, text: 'Thêm bài học mới chủ đề “Gia đình”.', time: 'Hôm nay 09:12' },
    { id: 2, text: 'Bạn cần ôn tập chủ đề “Chào hỏi”.', time: 'Hôm qua 20:31' },
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">Thông báo</h1>
      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} className="p-3 border rounded">
            <div className="font-medium">{n.text}</div>
            <div className="text-sm text-gray-500">{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
