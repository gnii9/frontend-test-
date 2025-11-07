// src/pages/StatisticsPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './pages.css';

export default function StatisticsPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Vui lòng đăng nhập để xem thống kê.</p>
          <Link to="/login" className="btn-primary">Đăng nhập</Link>
        </div>
      </div>
    );
  }

  const stats = user.stats || {};
  const testScores = stats.testScores || [];
  const averageScore = testScores.length > 0
    ? Math.round(testScores.reduce((a, b) => a + b, 0) / testScores.length)
    : 0;

  // Prepare data for charts
  const testScoreData = testScores.map((score, index) => ({
    name: `Bài ${index + 1}`,
    Điểm: score
  }));

  const wrongVocabularyCount = Object.keys(stats.wrongVocabulary || {}).length;
  const wrongVocabularyList = Object.entries(stats.wrongVocabulary || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10 từ sai nhiều nhất

  // Weekly progress data (mock - in production, get from backend)
  const weeklyData = [
    { name: 'T2', Flashcards: 5, Tests: 2 },
    { name: 'T3', Flashcards: 8, Tests: 1 },
    { name: 'T4', Flashcards: 10, Tests: 3 },
    { name: 'T5', Flashcards: 7, Tests: 2 },
    { name: 'T6', Flashcards: 12, Tests: 4 },
    { name: 'T7', Flashcards: 9, Tests: 2 },
    { name: 'CN', Flashcards: 6, Tests: 1 },
  ];

  return (
    <section className="section-outer section-white">
      <div className="container-1200">
      <h1 className="text-3xl font-bold text-primary mb-6">Thống kê cá nhân</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl font-bold text-blue-600">{stats.flashcardsLearned || 0}</div>
          <div className="text-gray-600 mt-1">Flashcard đã học</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl font-bold text-green-600">{stats.topicsCompleted || 0}</div>
          <div className="text-gray-600 mt-1">Chủ đề đã hoàn thành</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl font-bold text-purple-600">{averageScore}</div>
          <div className="text-gray-600 mt-1">Điểm trung bình</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-3xl font-bold text-orange-600">{user.streak || 0}</div>
          <div className="text-gray-600 mt-1">Ngày liên tiếp</div>
        </div>
      </div>

      {/* Test Scores Chart */}
      {testScores.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Điểm số các bài test</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={testScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Điểm" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Weekly Progress */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Tiến độ tuần này</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Flashcards" stroke="#8884d8" />
            <Line type="monotone" dataKey="Tests" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Wrong Vocabulary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Từ vựng cần ôn tập</h2>
        {wrongVocabularyCount > 0 ? (
          <div>
            <p className="text-gray-600 mb-4">
              Bạn có {wrongVocabularyCount} từ vựng cần ôn tập lại
            </p>
            <div className="space-y-2">
              {wrongVocabularyList.map(([wordId, count]) => (
                <div
                  key={wordId}
                  className="flex justify-between items-center p-3 bg-red-50 rounded border border-red-200"
                >
                  <span className="font-medium">
                    {wordId} <span className="text-gray-500">(ID: {wordId})</span>
                  </span>
                  <span className="text-red-600 font-semibold">
                    Sai {count} lần
                  </span>
                </div>
              ))}
            </div>
            {wrongVocabularyCount > 10 && (
              <p className="text-sm text-gray-500 mt-4">
                Và {wrongVocabularyCount - 10} từ vựng khác...
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Tuyệt vời! Bạn không có từ vựng nào cần ôn tập.</p>
        )}
      </div>

      {/* Goals Progress */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Mục tiêu hôm nay</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>Flashcard: 0 / {user.goals?.flashcardPerDay || 10}</span>
              <span className="text-gray-500">
                {Math.round((0 / (user.goals?.flashcardPerDay || 10)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${Math.min((0 / (user.goals?.flashcardPerDay || 10)) * 100, 100)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span>Bài test: 0 / {user.goals?.testPerDay || 2}</span>
              <span className="text-gray-500">
                {Math.round((0 / (user.goals?.testPerDay || 2)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${Math.min((0 / (user.goals?.testPerDay || 2)) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

