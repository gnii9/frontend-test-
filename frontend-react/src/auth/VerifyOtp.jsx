import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import './auth.css';

export default function VerifyOTP() {
  const { verifyOtp, registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { email, userData } = location.state || {};

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!email || !userData) {
    return <div>Không có dữ liệu để xác thực OTP.</div>;
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await verifyOtp({ email, otp });
      if (res.success) {
        // OTP hợp lệ → đăng ký tài khoản
        const regRes = await registerWithEmail({
          username: userData.name,
          email: email,
          password: userData.password,
          name: userData.name,
        });

        if (regRes.success) {
          navigate('/login', { replace: true });
        } else {
          setError(regRes.message || 'Đăng ký thất bại');
        }
      } else {
        setError(res.message || 'OTP không hợp lệ');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối tới server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Xác thực OTP</h1>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleVerifyOtp}>
        <input
          type="text"
          placeholder="Nhập mã OTP"
          className="auth-input"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Đang xác thực...' : 'Xác thực OTP'}
        </button>
      </form>
    </div>
  );
}
