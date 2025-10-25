// src/components/home/CourseSection.jsx
import { Link } from 'react-router-dom';

const courses = [
  { title: "Bảng chữ cái", rating: 4.8, reviews: 18, learners: 12, icon: "Alphabet" },
  { title: "Số đếm", rating: 4.7, reviews: 15, learners: 10, icon: "Numbers" },
  { title: "Gia đình", rating: 4.9, reviews: 20, learners: 18, icon: "Family" },
];

export default function CourseSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Khóa học phổ biến</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <Link
              key={i}
              to="/courses"
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">{course.icon}</span>
                <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
              </div>
              <div className="flex items-center mb-3">
                <span className="text-yellow-500 text-sm">Stars</span>
                <span className="text-sm text-gray-600 ml-1">
                  {course.rating} ({course.reviews} đánh giá)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">Miễn phí</span>
                <span className="text-sm text-gray-500">{course.learners} học viên</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/courses" className="text-primary font-semibold hover:underline">
            Tất cả khóa học
          </Link>
        </div>
      </div>
    </section>
  );
}