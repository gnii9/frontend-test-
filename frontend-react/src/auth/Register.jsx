import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';
import './auth.css';

export default function Register() {
  const { sendOtp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    gender: '',
    dob: '',
    password: '',
    confirm: ''
  });
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra password
    if (form.password !== form.confirm) {
      return setError('Mật khẩu không khớp');
    }
    if (form.password.length < 6) {
      return setError('Mật khẩu phải ít nhất 6 ký tự');
    }

    // Kiểm tra email + gender + dob
    if (!form.email || !form.gender || !form.dob || !form.name) {
      return setError('Vui lòng điền đầy đủ thông tin');
    }

    try {
      // Gửi OTP với purpose = "register"
      const res = await sendOtp(form.email, "register");
      if (res.success || res.message?.includes("OTP")) {
        // Chuyển sang trang nhập OTP, kèm dữ liệu form
        navigate('/verifyOTP', { state: { email: form.email, userData: form } });
      } else {
        setError(res.message || 'Lỗi gửi OTP');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối tới server');
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Đăng ký tài khoản</h1>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSendOtp}>
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
          placeholder="Email"
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
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
          <option value="other">Khác</option>
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
        <button type="submit" className="auth-button">Đăng ký</button>
      </form>

      <div className="auth-divider">Hoặc</div>
      <GoogleLoginButton />
      <p className="auth-link text-center">
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
}
