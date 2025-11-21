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

  const authHeaders = () => {
    const accessToken = localStorage.getItem("access"); // lấy access token hiện tại
    return {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };
  };
 // ===================== HELPERS =====================
  const normalizeSex = (raw) => {
    if (!raw) return "";
    const map = { nam: "male", "nữ": "female", nu: "female", khác: "other", khac: "other" };
    return map[raw.toLowerCase()] || raw.toLowerCase() || "";
  };

  const normalizeDate = (raw) => {
    if (!raw) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
    const parts = raw.split("/");
    if (parts.length !== 3) return "";
    const [day, month, year] = parts;
    if (!day || !month || !year) return "";
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const convertToApiDate = (iso) => {
    if (!iso) return "";
    const parts = iso.split("-");
    if (parts.length !== 3) return "";
    const [year, month, day] = parts;
    if (!year || !month || !day) return "";
    return `${day}/${month}/${year}`;
  };


  // ===================== AUTH API =====================
const loginWithUsername = async (username, password) => {
  try {
    const res = await fetch(`${API_BASE}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Login failed:", data.error);
      return { success: false, message: data.error };
    }

    // ✅ Lưu access + refresh token đúng key
    localStorage.setItem("access", data.tokens.access);
    localStorage.setItem("refresh", data.tokens.refresh);

    // ✅ Lưu thông tin user vào state
    setUser(data.user);

    return { success: true, message: data.message };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, message: "Login error" };
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
    const res = await fetch(`${API_BASE}/profile/`, {
      headers: authHeaders()
    });

    const data = await res.json();

    if (data.user) {
      setUser(prev => ({
        ...prev,
        username: data.user.username || "",
        email: data.user.email || "",
        sex: normalizeSex(data.user.sex),
        dob: normalizeDate(data.user.date_of_birth)
      }));
    }

    return data;
  } catch (err) {
    console.error(err);
    return { error: "Không thể tải profile" };
  }
};

const updateProfile = async ({ username, email, sex, dob }) => {
  try {
    const res = await fetch(`${API_BASE}/profile/update/`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        username,
        email,
        sex,
        date_of_birth: convertToApiDate(dob)
      }),
    });

    const data = await res.json();

    if (!data.success) throw new Error(data.message || "Cập nhật thất bại");

    // Cập nhật user trong context
    setUser(prev => ({
      ...prev,
      username: data.user.username,
      email: data.user.email,
      sex: normalizeSex(data.user.sex),
      dob: normalizeDate(data.user.date_of_birth)
    }));

    return { success: true, message: "Cập nhật thành công!" };
  } catch (err) {
    return { success: false, message: err.message || "Không thể cập nhật profile" };
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
  const refresh = localStorage.getItem("refresh");

  if (!refresh) {
    console.warn("No refresh token found. Logging out locally.");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      console.log("Logout thành công:", data.message);
    } else {
      console.error("Logout thất bại:", data.message);
    }
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    // Luôn xóa token localStorage
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  }
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
