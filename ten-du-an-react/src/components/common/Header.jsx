import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Sửa đường dẫn
// Giả sử ThemeToggle ở cùng thư mục
// import ThemeToggle from './ThemeToggle'; 

export default function Header() {
  const { user, logout } = useAuth();

  // Giả sử bạn có một component ThemeToggle, nếu không hãy tạm ẩn nó
  // <ThemeToggle /> 

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
          <span className="text-xl font-bold">VSign AI</span>
        </Link>

        {/* MENU CHÍNH – HIỂN THỊ TRÊN MÀN HÌNH LỚN */}
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-primary transition">
            Trang chủ
          </Link>
          <Link to="/courses" className="hover:text-primary transition">
            Khóa học
          </Link>
          <Link to="/about" className="hover:text-primary transition">
            Về chúng tôi
          </Link>
          <Link to="/contact" className="hover:text-primary transition">
            Liên hệ
          </Link>
        </nav>

        {/* NÚT ĐĂNG NHẬP / HỒ SƠ / ĐĂNG XUẤT + THEME */}
        <div className="flex items-center gap-4">
          {/* <ThemeToggle /> */} {/* Tạm ẩn nếu bạn chưa có file này */}

          {user ? (
            <>
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-700 hover:text-primary transition"
              >
                Hồ sơ
              </Link>
              <button
                onClick={logout}
                className="px-5 py-2 bg-primary text-white rounded-full font-medium text-sm hover:bg-blue-700 transition shadow-md"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-primary transition"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-primary text-white rounded-full font-medium text-sm hover:bg-blue-700 transition shadow-md"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

