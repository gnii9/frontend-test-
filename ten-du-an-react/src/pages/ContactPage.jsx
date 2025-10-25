// src/pages/CoursesPage.jsx
import { Link } from 'react-router-dom';

const topics = [
  { name: "Bảng chữ cái", phrases: 29, icon: "Alphabet" },
  { name: "Số đếm", phrases: 15, icon: "Numbers" },
  { name: "Gia đình", phrases: 12, icon: "Family" },
  { name: "Cảm xúc", phrases: 10, icon: "Emotions" },
  { name: "Màu sắc", phrases: 8, icon: "Colors" },
  { name: "Thực phẩm", phrases: 10, icon: "Food" },
  { name: "Thời gian", phrases: 6, icon: "Clock" },
  { name: "Chào hỏi", phrases: 5, icon: "Hello" },
  { name: "Cơ thể", phrases: 3, icon: "Body" },
  { name: "Trường học", phrases: 2, icon: "School" },
];

export default function CoursesPage() {
  const totalPhrases = topics.reduce((sum, t) => sum + t.phrases, 0); // 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-6">
        <Link to="/" className="text-primary hover:underline mb-6 inline-block">← Quay lại</Link>
        
        <h1 className="text-4xl font-bold text-center text-primary mb-4">
          10 Chủ Đề – 100 Cụm Từ Ký Hiệu
        </h1>
        <p className="text-center text-lg text-gray-700 mb-12">
          Học <strong>miễn phí</strong>, thực tế, dành cho người mới bắt đầu.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {topics.map((topic, i) => (
            <Link
              key={i}
              to="/chat"
              state={{ topic: topic.name }}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{topic.icon}</span>
                <h3 className="font-bold text-lg">{topic.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{topic.phrases} cụm từ</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
          <p className="text-3xl font-bold text-primary">{totalPhrases}</p>
          <p className="text-gray-700">Tổng số cụm từ có sẵn</p>
        </div>
      </div>
    </div>
  );
}