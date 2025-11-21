// src/pages/EditProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./pages.css";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user, fetchProfile, updateProfile } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    sex: "",
    dob: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const convertToISODate = (raw) => {
  if (!raw) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw; // ISO rồi
  const parts = raw.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return "";
};

  // Khi load profile từ backend
  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile();
      if (data.user) {
        setForm({
          username: data.user.username || "",
          email: data.user.email || "",
          sex: data.user.sex || "",
          dob: convertToISODate(data.user.date_of_birth || ""),
        });
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Gửi dữ liệu đã điền
    const res = await updateProfile({
      username: form.username,
      email: form.email,
      sex: form.sex,
      dob: form.dob,
    });

    if (res.success) {
      setSuccess("Cập nhật thành công!");
      // cập nhật lại form từ backend (normalized)
      setForm(prev => ({
        ...prev,
        username: res.user.username || prev.username,
        email: res.user.email ?? prev.email,
        sex: res.user.sex ?? prev.sex,
        dob: res.user.date_of_birth ?? prev.dob,
      }));
      setTimeout(() => navigate("/profile"), 800);
    } else {
      setError(res.message || "Cập nhật thất bại!");
    }
  };

  if (loading) return <div>Đang tải profile...</div>;

  return (
    <section className="section-outer section-white">
      <div className="container-1200">
        <h1 className="text-3xl font-bold text-primary mb-6">Chỉnh sửa thông tin cá nhân</h1>

        {error && <div className="bg-red-200 text-red-700 px-4 py-2 rounded">{error}</div>}
        {success && <div className="bg-green-200 text-green-700 px-4 py-2 rounded">{success}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md space-y-4">
          <div>
            <label>Tên</label>
            <input
              type="text"
              className="auth-input w-full"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              readOnly
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              className="auth-input w-full"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Giới tính</label>
            <select
              className="auth-input w-full"
              value={form.sex || ""}
              onChange={e => setForm({ ...form, sex: e.target.value })}
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div>
            <label>Ngày sinh</label>
            <input
              type="date"
              className="auth-input w-full"
              value={form.dob || ""}
              onChange={e => setForm({ ...form, dob: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full">Cập nhật</button>
        </form>
      </div>
    </section>
  );
}
