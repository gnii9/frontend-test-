// src/pages/SettingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';

export default function SettingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [offline, setOffline] = useState(() => {
    return localStorage.getItem('offlineMode') === 'true';
  });
  const [offlineFlashcards, setOfflineFlashcards] = useState([]);
  const [offlineVideos, setOfflineVideos] = useState([]);

  useEffect(() => {
    // Apply theme: only toggle 'dark' class; 'auto' follows system
    const root = document.documentElement;
    const apply = () => {
      root.classList.remove('dark');
      if (theme === 'dark') root.classList.add('dark');
      if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      }
    };
    apply();
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Load offline content
    const savedFlashcards = localStorage.getItem('offline_flashcards');
    const savedVideos = localStorage.getItem('offline_videos');
    if (savedFlashcards) setOfflineFlashcards(JSON.parse(savedFlashcards));
    if (savedVideos) setOfflineVideos(JSON.parse(savedVideos));
  }, []);

  const saveFlashcardOffline = () => {
    // TODO: Lưu flashcard vào IndexedDB/LocalStorage
    const flashcards = [
      { id: 1, topic: 'Chào hỏi', count: 5 },
      { id: 2, topic: 'Gia đình', count: 5 },
    ];
    localStorage.setItem('offline_flashcards', JSON.stringify(flashcards));
    setOfflineFlashcards(flashcards);
    alert('Flashcard đã được lưu offline. Bạn có thể học khi không có internet.');
  };

  const saveVideoOffline = () => {
    // TODO: Lưu video vào IndexedDB
    const videos = [
      { id: 1, title: 'Video hướng dẫn chào hỏi', size: '2.5 MB' },
      { id: 2, title: 'Video hướng dẫn gia đình', size: '3.1 MB' },
    ];
    localStorage.setItem('offline_videos', JSON.stringify(videos));
    setOfflineVideos(videos);
    alert('Video đã được lưu offline.');
  };

  const clearOfflineData = () => {
    if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu offline?')) {
      localStorage.removeItem('offline_flashcards');
      localStorage.removeItem('offline_videos');
      setOfflineFlashcards([]);
      setOfflineVideos([]);
      alert('Đã xóa dữ liệu offline.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Vui lòng đăng nhập để xem cài đặt.</p>
      </div>
    );
  }

  const isAdmin = user.email?.includes('admin') || user.role === 'admin';

  return (
    <section className="section-outer section-white">
      <div className="container-1200 max-w-4xl">
      <h1 className="text-3xl font-bold text-primary mb-8">Cài đặt</h1>

      <div className="space-y-8">
        {/* Theme Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Giao diện</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Chế độ màu</label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-sm mb-2">Chế độ sáng</div>
                  <div className="font-semibold">Sáng</div>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-sm mb-2">Chế độ tối</div>
                  <div className="font-semibold">Tối</div>
                </button>
                <button
                  onClick={() => setTheme('auto')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === 'auto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-sm mb-2">Tự động theo hệ thống</div>
                  <div className="font-semibold">Tự động</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Offline Mode */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Chế độ Offline</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={offline}
                onChange={(e) => {
                  setOffline(e.target.checked);
                  localStorage.setItem('offlineMode', e.target.checked.toString());
                }}
                className="w-5 h-5"
              />
              <span className="font-medium">Bật chế độ học offline</span>
            </label>
            <p className="text-sm text-gray-600">
              Khi bật, bạn có thể tải flashcard và video về để học khi không có internet.
            </p>

            {offline && (
              <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold mb-2">Flashcard đã lưu</h3>
                  {offlineFlashcards.length > 0 ? (
                    <div className="space-y-2">
                      {offlineFlashcards.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded">
                          <span>{item.topic}</span>
                          <span className="text-sm text-gray-600">{item.count} thẻ</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Chưa có flashcard nào được lưu</p>
                  )}
                  <button
                    onClick={saveFlashcardOffline}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Tải flashcard về
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Video đã lưu</h3>
                  {offlineVideos.length > 0 ? (
                    <div className="space-y-2">
                      {offlineVideos.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded">
                          <span>{item.title}</span>
                          <span className="text-sm text-gray-600">{item.size}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Chưa có video nào được lưu</p>
                  )}
                  <button
                    onClick={saveVideoOffline}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Tải video về
                  </button>
                </div>

                {(offlineFlashcards.length > 0 || offlineVideos.length > 0) && (
                  <button
                    onClick={clearOfflineData}
                    className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Xóa tất cả dữ liệu offline
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Admin Dashboard */}
        {isAdmin && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Quản trị</h2>
            <p className="text-gray-600 mb-4">
              Truy cập Admin Dashboard để quản lý người dùng, bài học, flashcard và xem thống kê.
            </p>
            <button
              onClick={() => navigate('/admin')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg font-semibold"
            >
              Mở Admin Dashboard
            </button>
          </div>
        )}

        {/* Account Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Thông tin tài khoản</h2>
          <div className="space-y-2">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Tên:</strong> {user.name}</p>
            <p><strong>Ngày tham gia:</strong> {new Date(user.createdAt).toLocaleDateString('vi-VN')}</p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
