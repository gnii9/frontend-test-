// src/api/practiceAPI.js
import { getAccessToken } from "./authHelpers";

const API_BASE = "http://127.0.0.1:8000/api";

const authHeaders = () => {
  const token = getAccessToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// bắt đầu session practice
export const startSession = async () => {
  try {
    const res = await fetch(`${API_BASE}/start/`, {
      method: "POST",
      headers: authHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.error || "Lỗi bắt đầu session" };
    return { success: true, data };
  } catch (err) {
    console.error("Practice API error:", err);
    return { success: false, message: "Lỗi mạng hoặc server" };
  }
};

// gửi đáp án trong session
export const submitAnswer = async (sessionId, answer) => {
  try {
    const res = await fetch(`${API_BASE}/submit/`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ session_id: sessionId, answer }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.error || "Lỗi submit answer" };
    return { success: true, data };
  } catch (err) {
    console.error("Practice API error:", err);
    return { success: false, message: "Lỗi mạng hoặc server" };
  }
};

// lấy kết quả session
export const getSessionResult = async (sessionId) => {
  try {
    const res = await fetch(`${API_BASE}/result/${sessionId}/`, {
      method: "GET",
      headers: authHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.error || "Lỗi lấy kết quả" };
    return { success: true, data };
  } catch (err) {
    console.error("Practice API error:", err);
    return { success: false, message: "Lỗi mạng hoặc server" };
  }
};
