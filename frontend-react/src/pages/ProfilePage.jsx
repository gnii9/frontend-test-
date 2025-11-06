// src/pages/ProfilePage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirm: '' });
  const [error, setError] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirm) {
      setError('Mật khẩu mới không khớp');
      return;
    }
    setStep(2);
  };

  const confirmOTP = (e) => {
    e.preventDefault();
    // Xử lý OTP qua Gmail (giả lập)
    setError('Mật khẩu đã được thay đổi thành công!');
    setTimeout(() => {
      setStep(1);
      setForm({ oldPassword: '', newPassword: '', confirm: '' });
    }, 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Vui lòng đăng nhập để xem trang cá nhân.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-primary mb-8">Trang Cá Nhân</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Thông tin</h2>
          <p><strong>Tên:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={logout} className="btn-primary mt-4">Đăng xuất</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
          {step === 1 ? (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="auth-label">Mật khẩu cũ</label>
                <input type="password" className="auth-input" value={form.oldPassword} onChange={(e) => setForm({...form, oldPassword: e.target.value})} required />
              </div>
              <div>
                <label className="auth-label">Mật khẩu mới</label>
                <input type="password" className="auth-input" value={form.newPassword} onChange={(e) => setForm({...form, newPassword: e.target.value})} required />
              </div>
              <div>
                <label className="auth-label">Xác nhận mật khẩu mới</label>
                <input type="password" className="auth-input" value={form.confirm} onChange={(e) => setForm({...form, confirm: e.target.value})} required />
              </div>
              <button type="submit" className="btn-primary">Gửi OTP</button>
            </form>
          ) : (
            <form onSubmit={confirmOTP} className="space-y-4">
              <div>
                <label className="auth-label">Mã OTP (gửi qua Gmail)</label>
                <input type="text" className="auth-input text-center text-2xl" maxLength="4" value={form.otp} onChange={(e) => setForm({...form, otp: e.target.value.slice(0,4)})} required />
              </div>
              <button type="submit" className="btn-primary">Xác nhận & Đặt lại mật khẩu</button>
              <button type="button" onClick={() => setStep(1)} className="auth-link w-full text-left">← Quay lại</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}