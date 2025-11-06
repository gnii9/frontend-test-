// src/auth/GoogleLoginButton.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function GoogleLoginButton() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    const ok = await loginWithGoogle();
    if (ok) navigate('/profile');
    else alert('Đăng nhập Google thất bại');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
    >
      <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path
          fill="#EA4335"
          d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.6 2.4 30.2 0 24 0 14.6 0 6.6 5.8 2.7 14.1l8.1 6.3C12.8 13.1 17.9 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.1 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.5c-.5 2.7-2.1 5-4.4 6.5l7 5.4c4.1-3.8 6.5-9.4 6.5-16.2z"
        />
        <path
          fill="#FBBC05"
          d="M10.8 28.4c-.6-1.8-.9-3.7-.9-5.6s.3-3.8.9-5.6l-8.1-6.3C1.1 14.5 0 19.1 0 24s1.1 9.5 2.7 13.1l8.1-6.3z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.2 0 11.4-2 15.2-5.5l-7-5.4c-2 1.4-4.6 2.2-8.2 2.2-6.1 0-11.2-3.6-13.2-8.7l-8.1 6.3C6.6 42.2 14.6 48 24 48z"
        />
        <path fill="none" d="M0 0h48v48H0z" />
      </svg>
      <span className="text-sm font-medium text-gray-700">Đăng nhập bằng Google</span>
    </button>
  );
}
