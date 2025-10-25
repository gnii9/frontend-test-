export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          <span className="text-primary tracking-tight">Chạm Để Hiểu,</span>
          <br />
          <span className="text-gray-900 tracking-tight">Nhìn Để Yêu Thương</span>
          <br />
          <span className="text-secondary tracking-tight">Bắt Đầu Ngay!</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Một thế giới mới đang chờ bạn: <strong>thật dễ dàng, miễn phí và luôn thấu hiểu</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <input type="text" placeholder="Tìm kiếm ký hiệu..." className="w-full sm:w-96 px-6 py-3 rounded-full border" />
          <button className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-700">
            Tìm kiếm
          </button>
        </div>
        <div className="flex justify-center gap-12">
          <div><p className="text-4xl font-bold text-primary">25,000+</p><p>Ký hiệu</p></div>
          <div><p className="text-4xl font-bold text-secondary">450,000+</p><p>Học viên</p></div>
          <div><p className="text-4xl font-bold text-accent">5,000+</p><p>Chuyên gia</p></div>
        </div>
        <p className="mt-8 text-sm text-gray-500">Hoàn toàn <strong>miễn phí</strong> • Dành cho cộng đồng khiếm thính</p>
      </div>
    </section>
  );
}