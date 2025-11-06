import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './auth.css';

export default function ForgotPassword() {
  const { sendOtp } = useAuth();
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return setError('Vui lòng nhập email');
    const otpCode = await sendOtp(email);
    if (!otpCode) return setError('Không gửi được OTP');
    setOtpSent(otpCode);
    setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (otp !== otpSent) return setError('OTP không đúng');
    if (newPassword.length < 6) return setError('Mật khẩu mới phải ít nhất 6 ký tự');
    // TODO: gọi API đổi mật khẩu thật
    alert('Đổi mật khẩu thành công!');
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Quên mật khẩu</h1>
      {error && <div className="auth-error">{error}</div>}

      {step === 1 ? (
        <form onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Nhập email đã đăng ký"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Gửi OTP</button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="text"
            placeholder="Nhập mã OTP"
            className="auth-input text-center"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
            required
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            className="auth-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Đặt lại mật khẩu</button>
        </form>
      )}
    </div>
  );
}
