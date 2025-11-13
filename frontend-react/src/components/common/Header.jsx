// src/components/common/Header.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../components.css';
import './common.css';
import { useAuth } from '../../context/AuthContext';
import { FiLogIn } from 'react-icons/fi';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openUser, setOpenUser] = useState(false);

  // Hàm kiểm tra quyền truy cập trang
  const handleNavClick = (path) => {
    if (!user && path !== '/') {
      navigate('/login'); // guest chỉ được vào trang chủ
    } else {
      navigate(path);
    }
    setOpenUser(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-bold text-primary text-xl cursor-pointer" onClick={() => handleNavClick('/')}>
          Silent Speak
        </div>

        <nav className="flex items-center gap-2">
          {['/', '/flashcard', '/practice', '/progress'].map((path) => {
            const labelMap = {
              '/': 'Trang chủ',
              '/flashcard': 'Chủ đề',
              '/practice': 'Luyện tập',
              '/progress': 'Tiến độ',
            };
            return (
              <button
                key={path}
                onClick={() => handleNavClick(path)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  window.location.pathname === path
                    ? 'text-blue-600 font-semibold bg-blue-100 border-2 border-blue-500'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {labelMap[path]}
              </button>
            );
          })}
        </nav>

        <div className="relative">
          <button
            onClick={() => setOpenUser(!openUser)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {user ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                {user.username?.[0]?.toUpperCase() || 'U'}
              </div>
            ) : null}

            <span className="text-gray-700 font-medium flex items-center gap-1">
              {user ? user.username : <FiLogIn className="w-5 h-5 text-gray-700" />}
            </span>
          </button>

          {openUser && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {user ? (
                <>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => handleNavClick('/profile')}
                  >
                    Trang cá nhân
                  </button>
                  <hr className="my-1" />
                  <button
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => {
                      logout();
                      setOpenUser(false);
                      handleNavClick('/');
                    }}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      navigate('/login');
                      setOpenUser(false);
                    }}
                  >
                    Đăng nhập
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      navigate('/register');
                      setOpenUser(false);
                    }}
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
