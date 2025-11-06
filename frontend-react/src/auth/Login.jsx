// src/auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from './GoogleLoginButton';
import './auth.css';

export default function Login() {
  const { loginWithEmail } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const ok = await loginWithEmail(form.email, form.password);
    if (ok) navigate('/profile');
    else setError('Đăng nhập thất bại');
  };


  return (
    <div className="auth-container">
      <h1 className="auth-title">Đăng nhập</h1>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
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
        <div className="text-right">
          <Link to="/forgot-password" className="auth-link">Quên mật khẩu?</Link>
        </div>
        <button type="submit" className="auth-button">Đăng nhập</button>
      </form>

      <div className="auth-divider">Hoặc</div>

      <GoogleLoginButton />

      <p className="auth-link text-center">
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </div>
  );
}
