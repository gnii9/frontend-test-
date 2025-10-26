// src/pages/RegisterPage.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
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
        <h1 className="text-3xl font-bold text-center text-primary mb-8">Đăng ký</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Họ tên"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700"
          >
            Tạo tài khoản
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Đã có tài khoản? <Link to="/login" className="text-primary font-medium">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}