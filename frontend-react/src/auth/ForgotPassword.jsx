import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './auth.css';

export default function ForgotPassword() {
  const { sendOtp, verifyOtp, changePassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email) return setError('Vui lòng nhập email');
    const otpCode = await sendOtp(email);
    if (!otpCode) return setError('Không gửi được OTP');
    setSuccess('OTP đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.');
    setStep(2);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword.length < 6) return setError('Mật khẩu mới phải ít nhất 6 ký tự');
    
    const isValid = await verifyOtp(email, otp);
    if (!isValid) return setError('OTP không đúng hoặc đã hết hạn');
    
    const ok = await changePassword(email, newPassword);
    if (ok) {
      setSuccess('Đổi mật khẩu thành công!');
      setTimeout(() => {
        setStep(1);
        setEmail('');
        setOtp('');
        setNewPassword('');
        setSuccess('');
      }, 2000);
    } else {
      setError('Đổi mật khẩu thất bại');
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Quên mật khẩu</h1>
      {error && <div className="auth-error">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

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
