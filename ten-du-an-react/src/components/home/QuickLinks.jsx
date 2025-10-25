import { Link } from 'react-router-dom';

export default function QuickLinks() {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          
          {/* LIÊN KẾT NHANH */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-primary transition">
              Trang chủ
            </Link>
            <Link to="/about" className="hover:text-primary transition">
              Về chúng tôi
            </Link>
            <Link to="/courses" className="hover:text-primary transition">
              Khóa học
            </Link>
            <Link to="/contact" className="hover:text-primary transition">
              Liên hệ
            </Link>
          </div>

          {/* NÚT CHATBOT NỔI BẬT */}
          <div className="mt-4">
            <Link
              to="/chat"
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Bắt đầu học với Chatbot AI
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}