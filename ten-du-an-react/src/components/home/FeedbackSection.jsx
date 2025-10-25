export default function FeedbackSection() {
  const feedbacks = [
    {
      quote: "Tôi đã có trải nghiệm học tập tuyệt vời! Khóa học giúp tôi giao tiếp tốt hơn với người khiếm thính.",
      name: "Cameron Williamson",
      role: "Học viên",
      avatar: "Person"
    },
    {
      quote: "Ứng dụng tuyệt vời để cải thiện kỹ năng ký hiệu. Rất khuyến khích!",
      name: "Jane Cooper",
      role: "Học viên",
      avatar: "Person"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Phản hồi từ học viên</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {feedbacks.map((fb, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="text-gray-700 italic mb-4 leading-relaxed">"{fb.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                  {fb.avatar}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-800">{fb.name}</p>
                  <p className="text-sm text-gray-500">{fb.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}