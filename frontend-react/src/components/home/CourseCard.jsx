export default function CourseCard({ title, rating, reviews, learners, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">{icon}</span>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="flex items-center mb-3">
        <span className="text-yellow-500 text-sm">★★★★★</span>
        <span className="text-sm text-gray-600 ml-1">{rating} ({reviews} đánh giá)</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-primary">Miễn phí</span>
        <span className="text-sm text-gray-500">{learners.toLocaleString()} học viên</span>
      </div>
    </div>
  );
}