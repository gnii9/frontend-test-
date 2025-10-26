export default function ProgressPage() {
  const stats = [
    { label: "Ký hiệu đã học", value: "87", color: "bg-green-500" },
    { label: "Bài kiểm tra", value: "12", color: "bg-blue-500" },
    { label: "Điểm trung bình", value: "94%", color: "bg-purple-500" },
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-primary mb-8">Tiến độ học tập</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className={`w-16 h-16 ${stat.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
              {stat.value}
            </div>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">Lịch sử học tập</h3>
        <div className="space-y-3">
          {["Hôm nay", "Hôm qua", "3 ngày trước"].map((day, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>{day}</span>
              <span className="text-primary font-semibold">10 ký hiệu</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}