// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './pages.css';

export default function ProfilePage() {
  const { 
    user, 
    logout, 
    sendOtp, 
    verifyOtp, 
    changePassword,
    updateProfile,
    updateGoals,
    checkIn,
    removeFromFavorites
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [form, setForm] = useState({ 
    oldPassword: '', 
    newPassword: '', 
    confirm: '',
    otp: '',
    name: '',
    gender: '',
    dob: ''
  });
  const [goals, setGoals] = useState({ flashcardPerDay: 10, testPerDay: 2 });

  // Initialize form and goals when user loads
  useEffect(() => {
    if (user) {
      setForm({
        oldPassword: '',
        newPassword: '',
        confirm: '',
        otp: '',
        name: user.name || '',
        gender: user.gender || '',
        dob: user.dob || ''
      });
      setGoals(user.goals || { flashcardPerDay: 10, testPerDay: 2 });
    }
  }, [user]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Vui lòng đăng nhập để xem trang cá nhân.</p>
          <Link to="/login" className="btn-primary">Đăng nhập</Link>
        </div>
      </div>
    );
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (form.newPassword !== form.confirm) {
      setError('Mật khẩu mới không khớp');
      return;
    }
    if (form.newPassword.length < 6) {
      setError('Mật khẩu mới phải ít nhất 6 ký tự');
      return;
    }
    
    const otp = await sendOtp(user.email);
    if (otp) {
      setStep(2);
      setSuccess('OTP đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.');
    } else {
      setError('Không thể gửi OTP. Vui lòng thử lại.');
    }
  };

  const confirmOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const isValid = await verifyOtp(user.email, form.otp);
    if (!isValid) {
      setError('OTP không đúng hoặc đã hết hạn');
      return;
    }
    
    const ok = await changePassword(user.email, form.newPassword);
    if (ok) {
      setSuccess('Mật khẩu đã được thay đổi thành công!');
      setTimeout(() => {
        setStep(1);
        setForm({ ...form, oldPassword: '', newPassword: '', confirm: '', otp: '' });
        setSuccess('');
      }, 2000);
    } else {
      setError('Đổi mật khẩu thất bại');
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: form.name,
      gender: form.gender,
      dob: form.dob
    });
    setSuccess('Cập nhật thông tin thành công!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleUpdateGoals = (e) => {
    e.preventDefault();
    updateGoals(goals);
    setSuccess('Cập nhật mục tiêu thành công!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCheckIn = () => {
    checkIn();
  };

  const canCheckIn = () => {
    if (!user.lastCheckIn) return true;
    const today = new Date().toDateString();
    return user.lastCheckIn !== today;
  };

  return (
    <section className="section-outer section-white">
      <div className="container-1200">
      <h1 className="text-3xl font-bold text-primary mb-6">Trang Cá Nhân</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Thông tin cá nhân
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`px-4 py-2 font-medium ${activeTab === 'password' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Đổi mật khẩu
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          className={`px-4 py-2 font-medium ${activeTab === 'goals' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Mục tiêu
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 font-medium ${activeTab === 'favorites' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Yêu thích
        </button>
        <button
          onClick={() => setActiveTab('checkin')}
          className={`px-4 py-2 font-medium ${activeTab === 'checkin' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
        >
          Điểm danh
        </button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tên</label>
              <input
                type="text"
                className="auth-input w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="auth-input w-full"
                value={user.email}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Giới tính</label>
              <select
                className="auth-input w-full"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ngày sinh</label>
              <input
                type="date"
                className="auth-input w-full"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
              />
            </div>
            <button type="submit" className="btn-primary">Cập nhật thông tin</button>
          </form>
          <div className="mt-6 pt-6 border-t">
            <button onClick={logout} className="btn-secondary">Đăng xuất</button>
          </div>
        </div>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
          {step === 1 ? (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mật khẩu cũ</label>
                <input
                  type="password"
                  className="auth-input w-full"
                  value={form.oldPassword}
                  onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  className="auth-input w-full"
                  value={form.newPassword}
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  className="auth-input w-full"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Gửi OTP qua Email</button>
            </form>
          ) : (
            <form onSubmit={confirmOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mã OTP (đã gửi đến {user.email})</label>
                <input
                  type="text"
                  className="auth-input w-full text-center text-2xl tracking-widest"
                  maxLength="4"
                  value={form.otp}
                  onChange={(e) => setForm({ ...form, otp: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                  required
                  placeholder="0000"
                />
              </div>
              <button type="submit" className="btn-primary">Xác nhận & Đặt lại mật khẩu</button>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError('');
                  setSuccess('');
                }}
                className="text-primary hover:underline"
              >
                ← Quay lại
              </button>
            </form>
          )}
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Mục tiêu học tập</h2>
          <form onSubmit={handleUpdateGoals} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Số flashcard học mỗi ngày: {goals.flashcardPerDay}
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={goals.flashcardPerDay}
                onChange={(e) => setGoals({ ...goals, flashcardPerDay: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Số bài test làm mỗi ngày: {goals.testPerDay}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={goals.testPerDay}
                onChange={(e) => setGoals({ ...goals, testPerDay: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <button type="submit" className="btn-primary">Lưu mục tiêu</button>
          </form>
        </div>
      )}

      {/* Favorites Tab */}
      {activeTab === 'favorites' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Yêu thích</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Flashcards ({user.favorites?.flashcards?.length || 0})</h3>
              {user.favorites?.flashcards?.length > 0 ? (
                <div className="space-y-2">
                  {user.favorites.flashcards.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>{item.title || item.name || `Flashcard #${item.id}`}</span>
                      <button
                        onClick={() => removeFromFavorites('flashcards', item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Chưa có flashcard yêu thích</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Videos ({user.favorites?.videos?.length || 0})</h3>
              {user.favorites?.videos?.length > 0 ? (
                <div className="space-y-2">
                  {user.favorites.videos.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>{item.title || item.name || `Video #${item.id}`}</span>
                      <button
                        onClick={() => removeFromFavorites('videos', item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Chưa có video yêu thích</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Từ vựng ({user.favorites?.vocabulary?.length || 0})</h3>
              {user.favorites?.vocabulary?.length > 0 ? (
                <div className="space-y-2">
                  {user.favorites.vocabulary.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>{item.word || item.title || `Từ vựng #${item.id}`}</span>
                      <button
                        onClick={() => removeFromFavorites('vocabulary', item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Chưa có từ vựng yêu thích</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Check-in Tab */}
      {activeTab === 'checkin' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Điểm danh</h2>
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="text-6xl font-bold text-primary mb-2">{user.streak || 0}</div>
              <div className="text-lg text-gray-600">Ngày liên tiếp 🔥</div>
            </div>
            {canCheckIn() ? (
              <button
                onClick={handleCheckIn}
                className="btn-primary text-lg px-8 py-4"
              >
                Điểm danh hôm nay
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-green-600 font-semibold">✓ Bạn đã điểm danh hôm nay!</p>
                <p className="text-gray-600">
                  Lần điểm danh cuối: {user.lastCheckIn || 'Chưa có'}
                </p>
              </div>
            )}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Lịch sử điểm danh (30 ngày gần nhất)</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (29 - i));
                  const dateStr = date.toDateString();
                  const isChecked = user.checkInHistory?.includes(dateStr);
                  return (
                    <div
                      key={i}
                      className={`h-12 rounded flex items-center justify-center text-xs ${
                        isChecked ? 'bg-green-500 text-white' : 'bg-gray-200'
                      }`}
                      title={dateStr}
                    >
                      {date.getDate()}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
