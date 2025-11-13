import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { fetchProfile, updateProfile } = useAuth();
  const [form, setForm] = useState({ username: '', email:'', sex: '', dob: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile();
      if (data.user) {
        setForm({
          username: data.user.username || '',           // từ backend trả về name
          email: data.user.email || '',
          sex: (data.user.sex || '').toLowerCase(), // lowercase để select chọn đúng
          dob: data.user.date_of_birth || ''
        });
      }
      setLoading(false);
    };
    loadProfile();
  }, [fetchProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // gửi đúng key backend
    const res = await updateProfile({
      username: form.username,
      email: form.email,
      sex: form.sex,
      date_of_birth: form.dob
    });

    if (res.success) {
      setSuccess(res.message || 'Cập nhật thành công!');
      setTimeout(() => navigate('/profile'), 1000);
    } else {
      setError(res.message || 'Cập nhật thất bại!');
    }
  };

  if (loading) return <div>Đang tải profile...</div>;

  return (
    <section className="section-outer section-white">
      <div className="container-1200">
        <h1 className="text-3xl font-bold text-primary mb-6">Chỉnh sửa thông tin cá nhân</h1>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md space-y-4">
          <div>
            <label>Tên</label>
            <input type="text" className="auth-input w-full"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input type="email" className="auth-input w-full"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Giới tính</label>
            <select className="auth-input w-full"
              value={form.sex}
              onChange={e => setForm({ ...form, sex: e.target.value })}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div>
            <label>Ngày sinh</label>
            <input type="date" className="auth-input w-full"
              value={form.dob}
              onChange={e => setForm({ ...form, dob: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-primary w-full">Cập nhật</button>
        </form>
      </div>
    </section>
  );
}
