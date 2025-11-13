import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';

export default function ProfilePage() {
  const { user, fetchProfile, logout } = useAuth();
     if (!user) {
      return <Navigate to="/login" replace />;
    }
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({ username: '', email:'', gender: '', dob: '' });

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile();
      if (data.user) {
        setForm({
          username: data.user.username || '',
          email: data.user.email || '',
          gender: data.user.sex || '',
          dob: data.user.date_of_birth || ''
        });
      }
      setReady(true);
    };
    loadProfile();
  }, [fetchProfile]);

  if (!ready) return <div>Đang tải profile...</div>;

  return (
    <section className="section-outer section-white">
      <div className="container-1200">
        <h1 className="text-3xl font-bold text-primary mb-6">Thông tin cá nhân</h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-md space-y-2">
          <p><strong>Tên:</strong> {form.username}</p>
          <p><strong>Email:</strong> {form.email}</p>
          <p><strong>Giới tính:</strong> {form.gender}</p>
          <p><strong>Ngày sinh:</strong> {form.dob}</p>

          <div className="mt-4 flex flex-col space-y-2">
            <Link to="/profile/edit" className="btn-primary w-full text-center">Chỉnh sửa thông tin</Link>
            <button onClick={logout} className="btn-secondary w-full">Đăng xuất</button>
          </div>
        </div>
      </div>
    </section>
  );
}
