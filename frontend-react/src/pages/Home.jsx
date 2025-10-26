import Hero from '../components/home/Hero';
import CourseSection from '../components/home/CourseSection';
import PracticeAI from '../components/practice/PracticeAI';
import FeedbackSection from '../components/home/FeedbackSection';
import VisionMission from '../components/home/VisionMission';
import QuickLinks from '../components/home/QuickLinks'; // THÊM NÀY
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Hero />
      <CourseSection />

      {/* PHẦN LUYỆN TẬP VỚI AI & CAMERA */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Luyện tập với AI & Camera
          </h2>
          <div className="max-w-4xl mx-auto">
            <PracticeAI />
          </div>
          <div className="text-center mt-8">
            <Link
              to="/practice"
              className="inline-block px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Vào phòng luyện tập
            </Link>
          </div>
        </div>
      </section>

      {/* NÚT VÀO CHATBOT – ĐÃ TÁCH RA THÀNH QuickLinks ĐỂ TRÁNH LẶP */}
      <QuickLinks />

      <FeedbackSection />
      <VisionMission />
    </>
  );
}