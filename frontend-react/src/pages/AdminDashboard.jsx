export default function AdminDashboard() {
  const users = 1250;
  const courses = 48;
  const revenue = "$12,450";

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-primary mb-8">Bảng điều khiển quản trị</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">Tổng người dùng</h3>
          <p className="text-3xl font-bold text-primary mt-2">{users.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">Khóa học</h3>
          <p className="text-3xl font-bold text-primary mt-2">{courses}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600">Doanh thu</h3>
          <p className="text-3xl font-bold text-primary mt-2">{revenue}</p>
        </div>
      </div>
    </div>
  );
}