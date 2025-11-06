// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // ✅ Đăng nhập bằng email + mật khẩu
  const loginWithEmail = async (email, password) => {
    // TODO: gọi API backend để xác thực
    if (email && password) {
      setUser({
        email,
        name: email.split('@')[0],
        goals: { flashcardPerDay: 10 },
        favorites: { flashcards: [], videos: [] },
        streak: 5,
        stats: { flashcardsLearned: 120, topicsCompleted: 8, testScores: [80, 90, 75] },
      });
      return true;
    }
    return false;
  };

  // ✅ Đăng nhập bằng Google (mock)
  const loginWithGoogle = async () => {
    // TODO: tích hợp Google OAuth thật
    const googleUser = {
      email: 'googleuser@gmail.com',
      name: 'GoogleUser',
      goals: { flashcardPerDay: 15 },
      favorites: { flashcards: [], videos: [] },
      streak: 3,
      stats: { flashcardsLearned: 90, topicsCompleted: 5, testScores: [70, 85] },
    };
    setUser(googleUser);
    return true;
  };

  // ✅ Đăng ký bằng email
  const registerWithEmail = async (formData) => {
    // TODO: gửi dữ liệu lên backend để tạo tài khoản
    setUser({
      email: formData.email,
      name: formData.name,
      gender: formData.gender,
      dob: formData.dob,
      goals: { flashcardPerDay: 10 },
      favorites: { flashcards: [], videos: [] },
      streak: 1,
      stats: { flashcardsLearned: 0, topicsCompleted: 0, testScores: [] },
    });
    return true;
  };

  // ✅ Gửi OTP qua email (mock)
  const sendOtp = async (email) => {
    // TODO: tích hợp EmailJS hoặc backend gửi OTP thật
    console.log(`Gửi OTP đến ${email}`);
    return Math.floor(1000 + Math.random() * 9000).toString(); // trả về OTP giả
  };

  // ✅ Đăng xuất
  const logout = () => setUser(null);

  // ✅ Thêm thông báo
  const addNotification = (message) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), message, time: new Date().toLocaleString() },
    ]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmail,
        loginWithGoogle,
        registerWithEmail,
        sendOtp,
        logout,
        notifications,
        addNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
