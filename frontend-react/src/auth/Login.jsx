import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleLoginButton from './GoogleLoginButton';
import './auth.css';

export default function Login() {
  const { loginWithUsername } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  // Nếu user đến từ trang bị bảo vệ (PrivateRoute), sẽ có location.state.from
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.username || !form.password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      const ok = await loginWithUsername(form.username, form.password);
      if (ok) {
        // Quay lại trang trước hoặc trang chủ
        navigate(from, { replace: true });
      } else {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối tới server');
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Đăng nhập</h1>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          className="auth-input"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
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

        <button type="submit" className="auth-button">Đăng nhập</button>
        <div className="text-right">
          <Link to="/forgot-password" className="auth-link">Quên mật khẩu?</Link>
        </div>        
      </form>

      <div className="auth-divider">Hoặc</div>

      <GoogleLoginButton />

      <p className="auth-link text-center">
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </div>
  );
}
