// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Load user from localStorage on init
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // ✅ Thêm thông báo (defined early for use in other functions)
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      time: new Date().toLocaleString('vi-VN'),
      read: false
    };
    setNotifications((prev) => [notification, ...prev].slice(0, 100)); // Keep last 100
  };

  // Check daily reminders and streak
  useEffect(() => {
    if (!user) return;
    
    const checkDailyReminders = () => {
      const lastReminder = localStorage.getItem('lastDailyReminder');
      const today = new Date().toDateString();
      
      if (lastReminder !== today) {
        addNotification('Nhắc nhở: Đã đến lúc học tập hôm nay! Hãy hoàn thành mục tiêu của bạn.');
        localStorage.setItem('lastDailyReminder', today);
      }
    };

    checkDailyReminders();
    const interval = setInterval(checkDailyReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [user]);

  // ✅ Đăng nhập bằng email + mật khẩu
  const loginWithEmail = async (email, password) => {
    // TODO: gọi API backend để xác thực
    if (email && password) {
      const userData = {
        id: Date.now(),
        email,
        name: email.split('@')[0],
        gender: '',
        dob: '',
        avatar: '',
        goals: { flashcardPerDay: 10, testPerDay: 2 },
        favorites: { flashcards: [], videos: [], vocabulary: [] },
        streak: 0,
        lastCheckIn: null,
        checkInHistory: [],
        stats: { 
          flashcardsLearned: 120, 
          topicsCompleted: 8, 
          testScores: [80, 90, 75],
          wrongVocabulary: {} // { wordId: count }
        },
        createdAt: new Date().toISOString(),
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  // ✅ Đăng nhập bằng Google (sẽ được gọi từ GoogleLoginButton với credential)
  const loginWithGoogle = async (credentialResponse) => {
    try {
      // Decode JWT token (in production, verify with backend)
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const payload = JSON.parse(jsonPayload);
      
      const googleUser = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        avatar: payload.picture,
        gender: '',
        dob: '',
        goals: { flashcardPerDay: 15, testPerDay: 2 },
        favorites: { flashcards: [], videos: [], vocabulary: [] },
        streak: 0,
        lastCheckIn: null,
        checkInHistory: [],
        stats: { 
          flashcardsLearned: 90, 
          topicsCompleted: 5, 
          testScores: [70, 85],
          wrongVocabulary: {}
        },
        createdAt: new Date().toISOString(),
      };
      setUser(googleUser);
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    }
  };

  // ✅ Đăng ký bằng email
  const registerWithEmail = async (formData) => {
    // TODO: gửi dữ liệu lên backend để tạo tài khoản
    const userData = {
      id: Date.now(),
      email: formData.email,
      name: formData.name,
      gender: formData.gender,
      dob: formData.dob,
      avatar: '',
      goals: { flashcardPerDay: 10, testPerDay: 2 },
      favorites: { flashcards: [], videos: [], vocabulary: [] },
      streak: 0,
      lastCheckIn: null,
      checkInHistory: [],
      stats: { 
        flashcardsLearned: 0, 
        topicsCompleted: 0, 
        testScores: [],
        wrongVocabulary: {}
      },
      createdAt: new Date().toISOString(),
    };
    setUser(userData);
    return true;
  };

  // ✅ Gửi OTP qua email (mock - có thể tích hợp EmailJS)
  const sendOtp = async (email) => {
    // TODO: tích hợp EmailJS hoặc backend gửi OTP thật
    console.log(`Gửi OTP đến ${email}`);
    // Simulate sending OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    // In production, store OTP in backend with expiration
    localStorage.setItem(`otp_${email}`, JSON.stringify({ 
      code: otp, 
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    }));
    return otp;
  };

  // ✅ Xác thực OTP
  const verifyOtp = async (email, otp) => {
    const stored = localStorage.getItem(`otp_${email}`);
    if (!stored) return false;
    const { code, expires } = JSON.parse(stored);
    if (Date.now() > expires) {
      localStorage.removeItem(`otp_${email}`);
      return false;
    }
    return code === otp;
  };

  // ✅ Đổi mật khẩu
  const changePassword = async (email, newPassword) => {
    // TODO: gọi API backend để đổi mật khẩu
    addNotification('Mật khẩu đã được thay đổi thành công!');
    return true;
  };

  // ✅ Cập nhật profile
  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  // ✅ Cập nhật mục tiêu
  const updateGoals = (goals) => {
    setUser(prev => ({
      ...prev,
      goals: { ...prev.goals, ...goals }
    }));
  };

  // ✅ Thêm vào yêu thích
  const addToFavorites = (type, item) => {
    setUser(prev => {
      const favorites = { ...prev.favorites };
      if (!favorites[type].find(f => f.id === item.id)) {
        favorites[type] = [...favorites[type], item];
      }
      return { ...prev, favorites };
    });
  };

  // ✅ Xóa khỏi yêu thích
  const removeFromFavorites = (type, itemId) => {
    setUser(prev => {
      const favorites = { ...prev.favorites };
      favorites[type] = favorites[type].filter(f => f.id !== itemId);
      return { ...prev, favorites };
    });
  };

  // ✅ Điểm danh / Check-in
  const checkIn = () => {
    const today = new Date().toDateString();
    const lastCheckIn = user?.lastCheckIn;
    
    setUser(prev => {
      let newStreak = prev.streak || 0;
      const checkInHistory = [...(prev.checkInHistory || [])];
      
      // If last check-in was yesterday, increment streak
      if (lastCheckIn) {
        const lastDate = new Date(lastCheckIn);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate.toDateString() === yesterday.toDateString()) {
          newStreak += 1;
        } else if (lastDate.toDateString() !== today) {
          // Missed a day, reset streak
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }
      
      // Add today to check-in history if not already there
      if (!checkInHistory.includes(today)) {
        checkInHistory.push(today);
      }
      
      return {
        ...prev,
        streak: newStreak,
        lastCheckIn: today,
        checkInHistory: checkInHistory.slice(-30) // Keep last 30 days
      };
    });
    
    addNotification(`Điểm danh thành công! Streak hiện tại: ${user?.streak + 1 || 1} ngày 🔥`);
  };

  // ✅ Cập nhật thống kê
  const updateStats = (stats) => {
    setUser(prev => ({
      ...prev,
      stats: { ...prev.stats, ...stats }
    }));
  };

  // ✅ Thêm từ vựng sai vào danh sách cần ôn
  const addWrongVocabulary = (wordId, word) => {
    setUser(prev => {
      const wrongVocabulary = { ...prev.stats.wrongVocabulary };
      wrongVocabulary[wordId] = (wrongVocabulary[wordId] || 0) + 1;
      
      // Add notification if count >= 3
      if (wrongVocabulary[wordId] >= 3) {
        addNotification(`Bạn đã sai từ "${word}" ${wrongVocabulary[wordId]} lần. Hãy ôn tập lại!`);
      }
      
      return {
        ...prev,
        stats: { ...prev.stats, wrongVocabulary }
      };
    });
  };

  // ✅ Xóa từ vựng khỏi danh sách sai (sau khi ôn tập thành công)
  const removeWrongVocabulary = (wordId) => {
    setUser(prev => {
      const wrongVocabulary = { ...prev.stats.wrongVocabulary };
      delete wrongVocabulary[wordId];
      return {
        ...prev,
        stats: { ...prev.stats, wrongVocabulary }
      };
    });
  };

  // ✅ Đăng xuất
  const logout = () => {
    setUser(null);
    setNotifications([]);
  };

  // ✅ Đánh dấu thông báo đã đọc
  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  // ✅ Xóa thông báo
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // ✅ Đánh dấu tất cả đã đọc
  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmail,
        loginWithGoogle,
        registerWithEmail,
        sendOtp,
        verifyOtp,
        changePassword,
        updateProfile,
        updateGoals,
        addToFavorites,
        removeFromFavorites,
        checkIn,
        updateStats,
        addWrongVocabulary,
        removeWrongVocabulary,
        logout,
        notifications,
        addNotification,
        markNotificationRead,
        removeNotification,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
