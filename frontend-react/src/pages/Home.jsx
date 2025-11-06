// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../components/home/home.css';

export default function Home() {
  return (
    <div className="pt-20 min-h-screen"> {/* Đẩy nội dung xuống dưới header */}
      {/* Hero */}
      <section className="hero text-center py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-primary">Chạm Để Hiểu</span>
            <br />
            <span className="text-gray-900">Ngôn Ngữ Khiếm Thính</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Học ngôn ngữ ký hiệu <strong className="text-primary">miễn phí</strong>, dễ dàng với AI, camera và chatbot thông minh.
          </p>
          <Link to="/practice" className="btn-primary text-lg px-10 py-4">
            Bắt đầu học ngay
          </Link>
        </div>
      </section>

      {/* Giới thiệu */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-8">Silent Speak là gì?</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Silent Speak là nền tảng học ngôn ngữ ký hiệu đầu tiên tại Việt Nam, 
            được thiết kế dành riêng cho cộng đồng người khiếm thính. 
            Với giao diện thân thiện, độ tương phản cao và nội dung dễ tiếp cận, 
            chúng tôi giúp bạn học ký hiệu một cách tự nhiên và hiệu quả.
          </p>
        </div>
      </section>

      {/* Blog / Tips */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary text-center mb-10">Tips Học Tập</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-secondary mb-3">Mẹo học nhanh</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Học 5 ký hiệu mỗi ngày</li>
                <li>• Lặp lại 10 lần mỗi ký hiệu</li>
                <li>• Dùng gương để tự sửa lỗi</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-secondary mb-3">Mẹo luyện tập</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Quay video tự thực hiện</li>
                <li>• So sánh với mẫu chuẩn</li>
                <li>• Luyện với bạn bè</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary text-center mb-10">Câu hỏi thường gặp</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold text-secondary">Làm sao để bắt đầu?</h3>
              <p className="text-gray-700 mt-2">Chọn chủ đề → Học flashcard → Luyện với AI camera.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold text-secondary">Có miễn phí không?</h3>
              <p className="text-gray-700 mt-2">100% miễn phí, không quảng cáo, không phí ẩn.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Thông báo */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Cập nhật mới</h2>
          <p className="text-xl">Thêm 20 ký hiệu mới chủ đề "Gia đình" và quiz nâng cao!</p>
        </div>
      </section>
    </div>
  );
}