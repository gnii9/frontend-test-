// src/pages/AdminDashboard.jsx
import React from 'react';
export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-primary mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-2">Người dùng</h3>
          <p className="text-2xl text-primary">125</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-2">Bài học</h3>
          <p className="text-2xl text-secondary">48</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-2">Thống kê</h3>
          <p className="text-2xl text-accent">12,450 lượt học</p>
        </div>
      </div>
    </div>
  );
}