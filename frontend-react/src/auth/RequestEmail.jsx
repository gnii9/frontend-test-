// src/auth/RequestEmail.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './auth.css';

export default function RequestEmail() {
  const { sendOtp } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) return setError('Vui lòng nhập email hoặc username');

    try {
      const otp = await sendOtp(email);
      if (!otp) return setError('Không gửi được OTP hoặc tài khoản không tồn tại');
      setSuccess('OTP đã được gửi. Chuyển tới trang nhập OTP...');
      setTimeout(() => navigate('/forgot-password/verify-otp', { state: { email, otp } }), 1500);
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối tới server');
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Xác nhận tài khoản</h1>
      {error && <div className="auth-error">{error}</div>}
      {success && <div className="auth-success">{success}</div>}
      <form onSubmit={handleSendOtp}>
        <input
          type="text"
          placeholder="Email hoặc Username"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">Gửi OTP</button>
      </form>
    </div>
  );
}
