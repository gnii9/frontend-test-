// src/pages/LoginPage.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      login(email);
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">Đăng nhập</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Nhập email (ví dụ: user@gmail.com)"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Đăng nhập ngay
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Chưa có tài khoản? <Link to="/register" className="text-primary font-medium">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
}