// src/auth/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';
import './auth.css';

export default function Register() {
  const { sendOtp, registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', gender: '', dob: '', password: '', confirm: '', otp: ''
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Mật khẩu không khớp');
    if (form.password.length < 6) return setError('Mật khẩu phải ít nhất 6 ký tự');
    const otp = await sendOtp(form.email);
    if (!otp) return setError('Lỗi gửi OTP. Vui lòng thử lại.');
    setOtpSent(otp);
    setStep(2);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (form.otp !== otpSent) return setError('OTP không đúng');
    const ok = await registerWithEmail(form);
    if (ok) navigate('/profile');
    else setError('Đăng ký thất bại');
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">{step === 1 ? 'Đăng ký tài khoản' : 'Xác nhận OTP'}</h1>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={step === 1 ? handleSendOtp : handleRegister}>
        {step === 1 ? (
          <>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="auth-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Gmail"
              className="auth-input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <select
              className="auth-input"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
              <option value="khac">Khác</option>
            </select>
            <input
              type="date"
              className="auth-input"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="auth-input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              className="auth-input"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
            />
            <button type="submit" className="auth-button">Gửi OTP</button>
          </>
        ) : (
          <>
            <p className="auth-info">Nhập mã OTP (4 số) đã gửi đến <strong>{form.email}</strong></p>
            <input
              type="text"
              className="auth-input text-center"
              maxLength="4"
              value={form.otp}
              onChange={(e) => setForm({ ...form, otp: e.target.value.replace(/\D/g, '').slice(0, 4) })}
              required
            />
            <button type="submit" className="auth-button">Xác nhận & Đăng ký</button>
            <button type="button" onClick={() => setStep(1)} className="auth-link">← Quay lại</button>
          </>
        )}
      </form>

      {step === 1 && (
        <>
          <div className="auth-divider">Hoặc</div>
          <GoogleLoginButton />
          <p className="auth-link text-center">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </>
      )}
    </div>
  );
}
