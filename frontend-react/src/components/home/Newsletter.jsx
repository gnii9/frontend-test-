export default function Newsletter() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Đăng ký nhận bản tin</h2>
        <p className="mb-8">Nhận cập nhật mới nhất và trở thành thành viên cộng đồng học tập</p>
        <div className="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Nhập email..." 
            className="flex-1 px-6 py-3 rounded-l-full text-gray-900"
          />
          <button className="bg-white text-primary px-6 py-3 rounded-r-full font-semibold hover:bg-gray-100">
            Đăng ký
          </button>
        </div>
      </div>
    </section>
  )
}