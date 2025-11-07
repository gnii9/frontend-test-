// src/components/common/Header.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../components.css';
import './common.css';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logout, notifications } = useAuth();
  const navigate = useNavigate();
  const [openUser, setOpenUser] = useState(false);
  
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-bold text-primary text-xl">Silent Speak</NavLink>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 font-semibold bg-blue-100 border-2 border-blue-500' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/flashcard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 font-semibold bg-blue-100 border-2 border-blue-500' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            Chủ đề
          </NavLink>
          <NavLink
            to="/practice"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 font-semibold bg-blue-100 border-2 border-blue-500' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            Luyện tập
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 font-semibold bg-blue-100 border-2 border-blue-500' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            Tiến độ
          </NavLink>
          {user && (
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-colors relative ${
                  isActive 
                    ? 'text-blue-600 font-semibold bg-blue-100 border-2 border-blue-500' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`
              }
            >
              Thông báo
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </NavLink>
          )}
        </nav>

        <div className="relative">
          <button
            onClick={() => setOpenUser(!openUser)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                {user ? (user.name?.[0]?.toUpperCase() || 'U') : 'G'}
              </div>
            )}
            <span className="text-gray-700 font-medium">{user ? user.name || 'Người dùng' : 'Khách'}</span>
            <span className="text-gray-500 text-sm">Tùy chọn</span>
          </button>
          {openUser && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {user ? (
                <>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      navigate('/profile');
                      setOpenUser(false);
                    }}
                  >
                    Trang cá nhân
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      navigate('/settings');
                      setOpenUser(false);
                    }}
                  >
                    Cài đặt
                  </button>
                  <hr className="my-1" />
                  <button
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => {
                      logout();
                      setOpenUser(false);
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
