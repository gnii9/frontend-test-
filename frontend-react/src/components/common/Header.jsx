// src/components/common/Header.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './common.css';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openUser, setOpenUser] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-bold text-primary">Silent Speak</NavLink>

        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'text-primary font-semibold bg-blue-50' : 'text-gray-700 hover:text-primary'}`
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/flashcard"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'text-primary font-semibold bg-blue-50' : 'text-gray-700 hover:text-primary'}`
            }
          >
            Chủ đề
          </NavLink>
          <NavLink
            to="/practice"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'text-primary font-semibold bg-blue-50' : 'text-gray-700 hover:text-primary'}`
            }
          >
            Luyện tập
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'text-primary font-semibold bg-blue-50' : 'text-gray-700 hover:text-primary'}`
            }
          >
            Tiến độ
          </NavLink>
          <div className="relative">
            <button
              onClick={() => setOpenNotif(!openNotif)}
              className="px-3 py-2 rounded text-gray-700 hover:text-primary"
            >
              Thông báo
            </button>
            {openNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded shadow-md">
                <div className="p-3 text-sm text-gray-600">Không có thông báo mới</div>
                <button
                  className="w-full text-left px-3 py-2 text-primary hover:bg-blue-50"
                  onClick={() => navigate('/notifications')}
                >
                  Xem tất cả thông báo
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="relative">
          <button
            onClick={() => setOpenUser(!openUser)}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50"
          >
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <span className="text-gray-700">{user ? user.name || 'Người dùng' : 'Khách'}</span>
          </button>
          {openUser && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-md">
              {user ? (
                <>
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-gray-50"
                    onClick={() => navigate('/profile')}
                  >
                    Trang cá nhân
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-gray-50"
                    onClick={() => navigate('/settings')}
                  >
                    Cài đặt
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
                    onClick={logout}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-gray-50"
                    onClick={() => navigate('/login')}
                  >
                    Đăng nhập
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-gray-50"
                    onClick={() => navigate('/register')}
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
