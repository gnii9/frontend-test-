// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';
import '../components/home/home.css';

export default function Home() {
  const { user } = useAuth();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'Làm sao để bắt đầu học ngôn ngữ ký hiệu?',
      answer: 'Bạn có thể bắt đầu bằng cách chọn một chủ đề từ trang "Chủ đề", học các flashcard, sau đó luyện tập với AI camera để nhận diện ký hiệu của bạn.'
    },
    {
      id: 2,
      question: 'Có miễn phí không?',
      answer: '100% miễn phí, không quảng cáo, không phí ẩn. Chúng tôi cam kết cung cấp nền tảng học tập miễn phí cho cộng đồng người khiếm thính.'
    },
    {
      id: 3,
      question: 'Tôi có cần đăng ký tài khoản không?',
      answer: 'Bạn có thể xem một số nội dung mà không cần đăng ký, nhưng để lưu tiến độ, điểm danh, và sử dụng đầy đủ tính năng, bạn nên tạo tài khoản miễn phí.'
    },
    {
      id: 4,
      question: 'Làm thế nào để luyện tập với AI?',
      answer: 'Vào trang "Luyện tập", chọn chế độ luyện tập (theo kịch bản hoặc tự do), chọn chủ đề, và bật camera. AI sẽ nhận diện ký hiệu của bạn và đưa ra phản hồi chi tiết.'
    },
    {
      id: 5,
      question: 'Tôi có thể học offline không?',
      answer: 'Có! Trong phần Cài đặt, bạn có thể bật chế độ offline và tải flashcard, video về để học khi không có internet.'
    }
  ];

  const tips = [
    {
      id: 1,
      title: 'Mẹo học nhanh',
      items: [
        'Học 5-10 ký hiệu mỗi ngày thay vì học quá nhiều cùng lúc',
        'Lặp lại mỗi ký hiệu 10-15 lần để ghi nhớ',
        'Dùng gương để tự quan sát và sửa động tác tay',
        'Học vào cùng một thời điểm mỗi ngày để tạo thói quen',
        'Kết hợp học với thực hành ngay lập tức'
      ]
    },
    {
      id: 2,
      title: 'Mẹo luyện ký hiệu',
      items: [
        'Quay video tự thực hiện và so sánh với mẫu chuẩn',
        'Luyện tập trước gương để kiểm tra độ chính xác',
        'Luyện với bạn bè hoặc người thân để nhận phản hồi',
        'Bắt đầu với các ký hiệu đơn giản trước',
        'Sử dụng AI camera để nhận phản hồi tức thì'
      ]
    },
    {
      id: 3,
      title: 'Mẹo ghi nhớ',
      items: [
        'Tạo câu chuyện liên kết các ký hiệu với nhau',
        'Sử dụng flashcard để ôn tập thường xuyên',
        'Ghi chú những điểm quan trọng khi học',
        'Tham gia các bài quiz để củng cố kiến thức',
        'Điểm danh mỗi ngày để duy trì động lực'
      ]
    }
  ];

  const events = [
    {
      id: 1,
      date: '15/12/2024',
      title: 'Thêm 20 ký hiệu mới chủ đề "Gia đình"',
      description: 'Chúng tôi vừa cập nhật thêm 20 ký hiệu mới về các thành viên trong gia đình, bao gồm các mối quan hệ phức tạp hơn.'
    },
    {
      id: 2,
      date: '10/12/2024',
      title: 'Tính năng Quiz nâng cao',
      description: 'Thêm tính năng quiz với nhiều câu hỏi hơn, giúp bạn củng cố kiến thức sau mỗi chủ đề học.'
    },
    {
      id: 3,
      date: '05/12/2024',
      title: 'Cải thiện AI nhận diện',
      description: 'Nâng cấp thuật toán AI để nhận diện ký hiệu chính xác hơn và đưa ra phản hồi chi tiết hơn.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero text-center section-outer section-white bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container-1200">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-primary">Chạm Để Hiểu</span>
            <br />
            <span className="text-gray-900">Ngôn Ngữ Khiếm Thính</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Học ngôn ngữ ký hiệu <strong className="text-primary">miễn phí</strong>, dễ dàng với AI, camera và chatbot thông minh.
            Nền tảng đầu tiên tại Việt Nam dành riêng cho cộng đồng người khiếm thính.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/flashcard" className="btn-primary text-lg px-10 py-4">
              Bắt đầu học ngay
            </Link>
            {!user && (
              <Link to="/register" className="btn-secondary text-lg px-10 py-4">
                Đăng ký miễn phí
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Giới thiệu về ngôn ngữ khiếm thính */}
      <section className="section-outer section-white">
        <div className="container-1200">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">Về Ngôn Ngữ Ký Hiệu</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-secondary">Ngôn ngữ ký hiệu là gì?</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ngôn ngữ ký hiệu là một ngôn ngữ hoàn chỉnh sử dụng cử chỉ tay, biểu cảm khuôn mặt, 
                  và chuyển động cơ thể để truyền đạt ý nghĩa. Đây không phải là ngôn ngữ toàn cầu - 
                  mỗi quốc gia có ngôn ngữ ký hiệu riêng của mình.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Tại Việt Nam, ngôn ngữ ký hiệu Việt Nam (VSL) là phương tiện giao tiếp chính của 
                  cộng đồng người khiếm thính, giúp họ kết nối, học tập và phát triển.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-secondary">Tại sao nên học?</h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="sr-only">Bullet</span>
                    <span>Giao tiếp hiệu quả với cộng đồng người khiếm thính</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="sr-only">Bullet</span>
                    <span>Mở rộng cơ hội nghề nghiệp và giáo dục</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="sr-only">Bullet</span>
                    <span>Hiểu và hỗ trợ người thân, bạn bè khiếm thính</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="sr-only">Bullet</span>
                    <span>Phát triển kỹ năng vận động tinh và trí nhớ</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Giới thiệu Silent Speak */}
      <section className="section-outer section-alt">
        <div className="container-1200 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-8">Silent Speak là gì?</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-lg">
            Silent Speak là nền tảng học ngôn ngữ ký hiệu đầu tiên tại Việt Nam, 
            được thiết kế dành riêng cho cộng đồng người khiếm thính. 
            Với giao diện thân thiện, độ tương phản cao và nội dung dễ tiếp cận, 
            chúng tôi giúp bạn học ký hiệu một cách tự nhiên và hiệu quả thông qua:
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-md">
              
              <h3 className="font-bold text-lg mb-2">Flashcard thông minh</h3>
              <p className="text-gray-600">Học từ vựng qua flashcard tương tác, có thể lưu yêu thích và ghi chú</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              
              <h3 className="font-bold text-lg mb-2">AI nhận diện</h3>
              <p className="text-gray-600">Luyện tập với camera, AI sẽ nhận diện và đưa ra phản hồi chi tiết</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              
              <h3 className="font-bold text-lg mb-2">Theo dõi tiến độ</h3>
              <p className="text-gray-600">Thống kê học tập, điểm danh, và nhắc nhở ôn tập tự động</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog / Tips */}
      <section className="section-outer section-white">
        <div className="container-1200">
          <h2 className="text-3xl font-bold text-primary text-center mb-10">Tips Học Tập</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tips.map((tip) => (
              <div key={tip.id} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-secondary mb-4">{tip.title}</h3>
                <ul className="text-gray-700 space-y-2">
                  {tip.items.map((item, index) => (
                    <li key={index} className="list-disc ml-5">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-outer section-alt">
        <div className="container-1200">
          <h2 className="text-3xl font-bold text-primary text-center mb-10">Câu hỏi thường gặp (FAQ)</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full text-left p-6 font-bold text-secondary hover:bg-gray-50 transition-colors flex justify-between items-center"
                >
                  <span>{faq.question}</span>
                  <span className="text-primary text-xl">
                    {expandedFaq === faq.id ? '−' : '+'}
                  </span>
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thông báo sự kiện / Update */}
      <section className="section-outer bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-1200">
          <h2 className="text-3xl font-bold text-center mb-10">Cập nhật & Sự kiện</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-lg px-4 py-2 min-w-[120px] text-center">
                    <div className="font-bold text-lg">{event.date}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                    <p className="text-white/90">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/notifications" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Xem tất cả thông báo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
