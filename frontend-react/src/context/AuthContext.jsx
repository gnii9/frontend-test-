import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const API_BASE = "http://127.0.0.1:8000/api/auth";

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  // ===================== EFFECTS =====================
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    else localStorage.removeItem("accessToken");
  }, [accessToken]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // ===================== UTILS =====================
  const addNotification = (msg) => setNotifications(prev => [...prev, msg]);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  });

  // ===================== AUTH API =====================
  const loginWithUsername = async (username, password) => {
    try {
      const res = await fetch(`${API_BASE}/login/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Đăng nhập thất bại");

      setUser(data.user);
      setAccessToken(data.tokens?.access);
      return { success: true, user: data.user };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  };

  const loginWithGoogle = async (credentialResponse) => {
    try {
      const res = await fetch(`${API_BASE}/google-login/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Google login thất bại");

      setUser(data.user);
      setAccessToken(data.tokens?.access);
      return { success: true, user: data.user };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  };

  const registerWithEmail = async ({ username, email, password, name }) => {
    try {
      const res = await fetch(`${API_BASE}/register/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ username, email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Đăng ký thất bại");

      setUser(data.user);
      setAccessToken(data.tokens?.access);
      return { success: true, user: data.user };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  };

  // 🟡 OTP flow
  const sendOtp = async (email, purpose) => {
    try {
      const res = await fetch(`${API_BASE}/send-otp/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ email, purpose }),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { error: "Lỗi gửi OTP" };
    }
  };

  const verifyOtp = async (otp) => {
    try {
      const res = await fetch(`${API_BASE}/verify-otp/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ otp }),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { error: "Lỗi xác thực OTP" };
    }
  };

  const changePassword = async (email, newPassword) => {
    try {
      const res = await fetch(`${API_BASE}/change-password/`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ email, new_password: newPassword }),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { error: "Lỗi đổi mật khẩu" };
    }
  };

 const fetchProfile = async () => {
  try {
    const res = await fetch(`${API_BASE}/profile/`, { headers: authHeaders() });
    const data = await res.json();

    if (data.user) {
      // Map key backend → frontend
      setUser(prev => ({
        ...prev,
        name: data.user.name || '',           // from first_name
        email: data.user.email || '',
        gender: data.user.sex || '',          // from sex
        dob: data.user.date_of_birth || ''    // from date_of_birth
      }));
    }
    return data;
  } catch (err) {
    console.error(err);
    return { error: "Không thể tải profile" };
  }
};

const updateProfile = async (updates) => {
  try {
    // Map frontend → backend key
    const backendUpdates = {
      username: updates.username,
      email: updates.email,
      sex: updates.sex,
      date_of_birth: updates.date_of_birth, // key backend
    };

    const res = await fetch(`${API_BASE}/profile/update/`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(backendUpdates),
    });
    const data = await res.json();

    if (data.success) {
      // Cập nhật state frontend với key chuẩn
      setUser(prev => ({
        ...prev,
        username: updates.username || prev.username,
        email: updates.email || prev.email,
        sex: updates.sex || prev.sex,
        dob: updates.date_of_birth || prev.dob
      }));
    }

    return data;
  } catch (err) {
    console.error(err);
    return { error: "Không thể cập nhật profile" };
  }
};


  const updateStats = (stats) => {
    setUser(prev => ({
      ...prev,
      stats: { ...prev.stats, ...stats },
    }));
  };

  const addWrongVocabulary = (wordId, word) => {
    setUser(prev => {
      const wrongVocabulary = { ...prev.stats?.wrongVocabulary };
      wrongVocabulary[wordId] = (wrongVocabulary[wordId] || 0) + 1;
      if (wrongVocabulary[wordId] >= 3)
        addNotification(`Bạn đã sai từ "${word}" ${wrongVocabulary[wordId]} lần.`);
      return { ...prev, stats: { ...prev.stats, wrongVocabulary } };
    });
  };

  const removeWrongVocabulary = (wordId) => {
    setUser(prev => {
      const wrongVocabulary = { ...prev.stats?.wrongVocabulary };
      delete wrongVocabulary[wordId];
      return { ...prev, stats: { ...prev.stats, wrongVocabulary } };
    });
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/logout/`, {
        method: "POST",
        headers: authHeaders(),
      });
    } catch (err) {
      console.warn("Server logout failed:", err);
    }
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loginWithUsername,
        loginWithGoogle,
        registerWithEmail,
        sendOtp,
        verifyOtp,
        changePassword,
        fetchProfile,
        updateProfile,
        updateStats,
        addWrongVocabulary,
        removeWrongVocabulary,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
