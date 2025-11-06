// src/pages/SettingPage.jsx
import React, { useState } from 'react';

export default function SettingPage() {
  const [theme, setTheme] = useState('light');
  const [offline, setOffline] = useState(false);

  const saveFlashcardOffline = () => {
    // TODO: lưu vào IndexedDB/LocalStorage
    alert('Flashcard đã được lưu offline.');
  };

  const saveVideoOffline = () => {
    // TODO: lưu blob video vào IndexedDB
    alert('Video đã được lưu offline.');
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">Cài đặt</h1>

      <div className="space-y-6">
        <div>
          <h2 className="font-semibold mb-2">Giao diện</h2>
          <select
            className="border rounded px-3 py-2"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Sáng</option>
            <option value="dark">Tối</option>
            <option value="custom">Tùy chỉnh</option>
          </select>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Offline mode</h2>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={offline} onChange={(e) => setOffline(e.target.checked)} />
            Bật chế độ học offline
          </label>
          <div className="mt-3 flex gap-2">
            <button className="px-4 py-2 border rounded" onClick={saveFlashcardOffline}>Lưu flashcard</button>
            <button className="px-4 py-2 border rounded" onClick={saveVideoOffline}>Lưu video</button>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Quản trị</h2>
          <a href="/admin" className="text-primary underline">Mở Admin Dashboard</a>
        </div>
      </div>
    </div>
  );
}
