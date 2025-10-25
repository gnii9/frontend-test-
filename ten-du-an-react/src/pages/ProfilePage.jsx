import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Dữ liệu giả lập
const learnedTopics = ["Bảng chữ cái", "Số đếm", "Gia đình"];
const progress = { "Bảng chữ cái": 80, "Số đếm": 60, "Gia đình": 30 };

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <p className="text-xl mb-4">Vui lòng đăng nhập để xem hồ sơ</p>
          <Link to="/login" className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-700">Đăng nhập</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-6">
        <Link to="/" className="text-primary hover:underline mb-6 inline-block">← Quay lại</Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.[0] || user.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name || user.email}</h1>
              <p className="text-gray-600">Thành viên VSign AI</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-secondary mb-4">Khóa học đã tham gia</h2>
              {learnedTopics.length > 0 ? (
                <div className="space-y-4">
                  {learnedTopics.map((topic) => (
                    <div key={topic} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-4 sm:gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">
                          {topic === "Bảng chữ cái" ? "🔡" : topic === "Số đếm" ? "🔢" : "👨‍👩‍👧"}
                        </span>
                        <span className="font-medium">{topic}</span>
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-full sm:w-32 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-primary h-3 rounded-full transition-all"
                            style={{ width: `${progress[topic]}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-10 text-right">{progress[topic]}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Chưa tham gia khóa học nào</p>
              )}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/courses"
                className="inline-block px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-700"
              >
                Tiếp tục học
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  