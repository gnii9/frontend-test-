import { Link } from 'react-router-dom';

const courses = [
  { title: "Bảng chữ cái", icon: "Alphabet", desc: "Học 29 chữ cái bằng ngôn ngữ ký hiệu", learners: 1789 },
  { title: "Số đếm", icon: "Numbers", desc: "Từ 1 đến 1000 và hơn nữa", learners: 3789 },
  { title: "Gia đình", icon: "Family", desc: "Mẹ, bố, anh chị em, ông bà", learners: 5789 },
  { title: "Cảm xúc", icon: "Emotions", desc: "Vui, buồn, giận, yêu", learners: 2890 },
  { title: "Thực phẩm", icon: "Food", desc: "Cơm, nước, bánh mì, trái cây", learners: 4123 },
  { title: "Màu sắc", icon: "Colors", desc: "Đỏ, xanh, vàng, tím", learners: 3567 },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-6">
        <Link to="/" className="text-primary hover:underline mb-6 inline-block">← Quay lại trang chủ</Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          Tất Cả Khóa Học
        </h1>
        <p className="text-center text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          Hoàn toàn <strong>miễn phí</strong>, học bất cứ lúc nào, dành riêng cho cộng đồng khiếm thính.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <Link
              key={i}
              to="/chat"
              state={{ topic: course.title }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{course.icon}</span>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary">
                  {course.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{course.desc}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-primary font-semibold">Miễn phí</span>
                <span className="text-gray-500">{course.learners.toLocaleString()} học viên</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/chat"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Bắt đầu học ngay
          </Link>
        </div>
      </div>
    </div>
  );
}