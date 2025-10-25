import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-6">
        <Link to="/" className="text-primary hover:underline mb-6 inline-block">← Quay lại</Link>

        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-8">
          Về VSign AI
        </h1>

        <div className="max-w-4xl mx-auto space-y-12">
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary mb-4">Tầm nhìn</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Xây dựng một thế giới nơi <strong>mọi người khiếm thính</strong> đều được tiếp cận giáo dục 
              chất lượng cao, miễn phí, thông qua công nghệ AI và ngôn ngữ ký hiệu.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary mb-4">Sứ mệnh</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Cung cấp <strong>hàng ngàn ký hiệu</strong>, công cụ học tập thông minh (camera AI, chatbot, quiz), 
              giúp người khiếm thính và người thân giao tiếp dễ dàng hơn.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-secondary mb-6">Cam kết của chúng tôi</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="text-4xl mb-2">100% Miễn phí</div>
                <p className="text-gray-600">Không quảng cáo, không phí ẩn</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">Dành cho người khiếm thính</div>
                <p className="text-gray-600">Thiết kế thân thiện, độ tương phản cao</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">Cập nhật liên tục</div>
                <p className="text-gray-600">Thêm ký hiệu mới hàng tuần</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}