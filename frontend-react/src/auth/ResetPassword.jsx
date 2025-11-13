// src/auth/ResetPassword.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './auth.css';

export default function ResetPassword() {
  const { changePassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!email) return <p>Không có email, quay lại trang gửi OTP.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 6) return setError('Mật khẩu phải ít nhất 6 ký tự');
    if (newPassword !== confirm) return setError('Mật khẩu xác nhận không khớp');

    try {
      const ok = await changePassword(email, newPassword);
      if (ok) {
        setSuccess('Đặt lại mật khẩu thành công!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Đặt lại mật khẩu thất bại');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối tới server');
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Đặt mật khẩu mới</h1>
      {error && <div className="auth-error">{error}</div>}
      {success && <div className="auth-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nhập mật khẩu mới"
          className="auth-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          className="auth-input"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">Đặt lại mật khẩu</button>
      </form>
    </div>
  );
}
