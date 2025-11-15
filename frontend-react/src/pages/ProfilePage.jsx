import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';

export default function ProfilePage() {
  const { user, fetchProfile, logout } = useAuth();
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', gender: '', dob: '' });

  // =========================
  // 1. Map API → value React
  // =========================
  const API_TO_VALUE = {
    male: "male",
    female: "female",
    other: "other",

    // Có thể backend trả NAM / NỮ / KHÁC
    nam: "male",
    nữ: "female",
    nu: "female",
    khac: "other",
    khác: "other",

    // Viết hoa/thường/viết sai
    Nam: "male",
    Nữ: "female",
    Nu: "female",
    Khác: "other",
    Khac: "other",
  };

  const normalizeApiSexToValue = (raw) => {
    if (!raw) return "";
    const key = raw.toLowerCase();
    return API_TO_VALUE[key] || "";
  };

  // =========================
  // 2. Map value React → API
  // =========================
  const VALUE_TO_API = {
    male: "male",
    female: "female",
    other: "other"
  };

  const mapValueToApiSex = (value) => VALUE_TO_API[value] || value;

  // =========================
  // 3. Load profile
  // =========================
  useEffect(() => {
    const load = async () => {
      const data = await fetchProfile();

      if (data.user) {
        setForm({
          username: data.user.username || '',
          email: data.user.email || '',
          gender: normalizeApiSexToValue(data.user.sex || ''), // convert sex API → React value
          dob: data.user.date_of_birth || ''
        });
      }
      setReady(true);
    };

    load();
  }, [fetchProfile]);

  if (!user) return <Navigate to="/login" replace />;
  if (!ready) return <div>Đang tải profile...</div>;

  // =========================
  // 4. UI hiển thị
  // =========================
  return (
    <section className="section-outer section-white">
      <div className="container-1200">
        <h1 className="text-3xl font-bold text-primary mb-6">Thông tin cá nhân</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-md space-y-2">
          <p><strong>Tên:</strong> {form.username}</p>
          <p><strong>Email:</strong> {form.email}</p>

          <p>
            <strong>Giới tính:</strong>{" "}
            {form.gender === "male"
              ? "Nam"
              : form.gender === "female"
              ? "Nữ"
              : form.gender === "other"
              ? "Khác"
              : "Không có dữ liệu"}
          </p>

          <p><strong>Ngày sinh:</strong> {form.dob}</p>

          <div className="mt-4 flex flex-col space-y-2">
            <Link to="/profile/edit" className="btn-primary w-full text-center">
              Chỉnh sửa thông tin
            </Link>
            <button onClick={logout} className="btn-secondary w-full">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
