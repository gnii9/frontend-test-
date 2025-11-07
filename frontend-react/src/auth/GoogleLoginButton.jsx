// src/auth/GoogleLoginButton.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function GoogleLoginButton() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const ok = await loginWithGoogle(credentialResponse);
      if (ok) {
        navigate('/profile');
      } else {
        alert('Đăng nhập Google thất bại');
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('Đăng nhập Google thất bại. Vui lòng thử lại.');
    }
  };

  const handleError = () => {
    alert('Đăng nhập Google thất bại');
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        locale="vi"
      />
    </div>
  );
}
