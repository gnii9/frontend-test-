// src/api/chatAPI.js
import { getAccessToken } from "./authHelpers"; // helper lấy access token

const API_BASE = "http://127.0.0.1:8000/api/chatbot";

// helper tạo headers
const authHeaders = () => {
  const token = getAccessToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// gửi tin nhắn chat
export const sendMessage = async (message) => {
  try {
    const res = await fetch(`${API_BASE}/`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ query: message }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.error || "Lỗi chat" };
    return { success: true, data };
  } catch (err) {
    console.error("Chat API error:", err);
    return { success: false, message: "Lỗi mạng hoặc server" };
  }
};

// lấy danh sách topic + flashcards
export const getTopicsAndFlashcards = async () => {
  try {
    const res = await fetch(`${API_BASE}/topics/`, {
      method: "GET",
      headers: authHeaders(),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.error || "Lỗi lấy topics" };
    return { success: true, data };
  } catch (err) {
    console.error("Chat API error:", err);
    return { success: false, message: "Lỗi mạng hoặc server" };
  }
};
