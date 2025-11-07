// src/pages/ProgressPage.jsx
import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './pages.css';

export default function ProgressPage() {
  const { user, addNotification } = useAuth();
  
  // Lấy dữ liệu từ user stats
  const wrongVocabulary = user?.stats?.wrongVocabulary || {};
  const wrongByTopic = useMemo(() => {
    // Group wrong vocabulary by topic (mock data - in production, get from backend)
    return {
      greetings: Object.keys(wrongVocabulary).filter(k => k.includes('greetings')).length,
      family: Object.keys(wrongVocabulary).filter(k => k.includes('family')).length,
      school: Object.keys(wrongVocabulary).filter(k => k.includes('school')).length,
    };
  }, [wrongVocabulary]);

  const reminders = useMemo(
    () => Object.entries(wrongByTopic)
      .filter(([_, count]) => count >= 3)
      .map(([topic]) => topic),
    [wrongByTopic]
  );

  // Auto reminder notification
  useEffect(() => {
    if (reminders.length > 0 && user) {
      const lastReminder = localStorage.getItem('lastProgressReminder');
      const today = new Date().toDateString();
      
      if (lastReminder !== today) {
        addNotification(
          `Nhắc nhở: Bạn có ${reminders.length} chủ đề cần ôn tập lại: ${reminders.join(', ')}`,
          'warning'
        );
        localStorage.setItem('lastProgressReminder', today);
      }
    }
  }, [reminders, user, addNotification]);

  // Weekly progress data
  const weeklyData = [
    { name: 'T2', Flashcards: 5, Tests: 2 },
    { name: 'T3', Flashcards: 8, Tests: 1 },
    { name: 'T4', Flashcards: 10, Tests: 3 },
    { name: 'T5', Flashcards: 7, Tests: 2 },
    { name: 'T6', Flashcards: 12, Tests: 4 },
    { name: 'T7', Flashcards: 9, Tests: 2 },
    { name: 'CN', Flashcards: 6, Tests: 1 },
  ];

  // Monthly progress data
  const monthlyData = [
    { name: 'Tuần 1', Điểm: 75, Flashcard: 45 },
    { name: 'Tuần 2', Điểm: 82, Flashcard: 52 },
    { name: 'Tuần 3', Điểm: 88, Flashcard: 60 },
    { name: 'Tuần 4', Điểm: 90, Flashcard: 65 },
  ];

  const topicNames = {
    greetings: 'Chào hỏi',
    family: 'Gia đình',
    school: 'Trường học',
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Vui lòng đăng nhập để xem tiến độ.</p>
          <Link to="/login" className="btn-primary">Đăng nhập</Link>
        </div>
      </div>
    );
  }

  return (
    <section className="section-outer section-white">
      <div className="container-1200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Tiến độ học tập</h1>
        <Link to="/statistics" className="text-blue-600 hover:text-blue-800 font-semibold">
          Xem thống kê chi tiết →
        </Link>
      </div>

      {/* Nhắc nhở ôn tập */}
      <section className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Nhắc nhở ôn tập tự động</h2>
        {reminders.length > 0 ? (
          <div className="space-y-3">
            <p className="text-gray-700">
              Hệ thống đã phát hiện bạn cần ôn tập lại các chủ đề sau (sai nhiều lần):
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {reminders.map((topic) => (
                <div
                  key={topic}
                  className="p-4 bg-red-50 border-2 border-red-200 rounded-lg"
                >
                  <div className="font-bold text-red-700 mb-1">
                    {topicNames[topic] || topic}
                  </div>
                  <div className="text-sm text-gray-600">
                    Đã sai: {wrongByTopic[topic]} lần
                  </div>
                  <Link
                    to={`/flashcard?topic=${topic}`}
                    className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
                  >
                    Ôn tập ngay →
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              💡 Hệ thống sẽ tự động gửi thông báo nhắc nhở bạn ôn tập các chủ đề này.
            </p>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-2"></div>
            <p className="text-gray-600">Tuyệt vời! Bạn không có chủ đề nào cần ôn tập.</p>
          </div>
        )}
      </section>

      {/* Thống kê tuần */}
      <section className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Thống kê tuần này</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Flashcards" fill="#8884d8" name="Flashcard" />
            <Bar dataKey="Tests" fill="#82ca9d" name="Bài test" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Thống kê tháng */}
      <section className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Tiến bộ theo tháng</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Điểm" stroke="#8884d8" name="Điểm trung bình" />
            <Line type="monotone" dataKey="Flashcard" stroke="#82ca9d" name="Số flashcard" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
          <div className="text-3xl font-bold">{user.stats?.flashcardsLearned || 0}</div>
          <div className="text-sm opacity-90 mt-1">Flashcard đã học</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
          <div className="text-3xl font-bold">{user.stats?.topicsCompleted || 0}</div>
          <div className="text-sm opacity-90 mt-1">Chủ đề hoàn thành</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
          <div className="text-3xl font-bold">
            {user.stats?.testScores?.length > 0
              ? Math.round(user.stats.testScores.reduce((a, b) => a + b, 0) / user.stats.testScores.length)
              : 0}%
          </div>
          <div className="text-sm opacity-90 mt-1">Điểm trung bình</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg p-6">
          <div className="text-3xl font-bold">{user.streak || 0}</div>
          <div className="text-sm opacity-90 mt-1">Ngày liên tiếp</div>
        </div>
      </div>
      </div>
    </section>
  );
}
