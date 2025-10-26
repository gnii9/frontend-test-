import CameraView from '../components/chatbot/CameraView';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const quizQuestions = [
  { id: 1, sign: "Xin chào", options: ["Xin chào", "Cảm ơn", "Tạm biệt", "Tôi yêu bạn"], correct: 0 },
  { id: 2, sign: "Cảm ơn", options: ["Xin chào", "Cảm ơn", "Bạn khỏe không?", "Gia đình"], correct: 1 },
  { id: 3, sign: "Tạm biệt", options: ["Tạm biệt", "Xin chào", "Cảm ơn", "Tôi"], correct: 0 },
];

const flashcards = [
  { sign: "Xin chào", meaning: "Dùng tay vẫy nhẹ, lòng bàn tay hướng ra ngoài", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { sign: "Cảm ơn", meaning: "Đưa tay lên miệng, lòng bàn tay hướng vào trong, cúi nhẹ", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { sign: "Tạm biệt", meaning: "Vẫy tay hai lần, lòng bàn tay hướng ra", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

export default function PracticePage() {
  const [prediction, setPrediction] = useState('Đang chờ cử chỉ...');
  const [isScanning, setIsScanning] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [flashIndex, setFlashIndex] = useState(0);

  // AI nhận diện giả lập
  const startScan = () => {
    setIsScanning(true);
    setPrediction('Đang phân tích...');
    setTimeout(() => {
      const signs = ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Bạn khỏe không?', 'Gia đình'];
      const result = signs[Math.floor(Math.random() * signs.length)];
      setPrediction(result);
      setIsScanning(false);

      // Kiểm tra quiz
      if (currentQ < quizQuestions.length && result === quizQuestions[currentQ].sign) {
        setScore(prev => prev + 1);
      }
    }, 2500);
  };

  // Quiz
  const handleAnswer = (idx) => {
    setSelected(idx);
    setShowResult(true);
    if (idx === quizQuestions[currentQ].correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  // Flashcard
  const nextFlash = () => {
    setFlashIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-primary mb-10">
          Phòng Luyện Tập AI
        </h1>

        {/* CAMERA + AI */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-6">Nhận diện ký hiệu tức thì</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <CameraView />
              <button
                onClick={startScan}
                disabled={isScanning}
                className={`mt-6 w-full py-3 rounded-full font-bold transition ${
                  isScanning ? 'bg-gray-400 text-white' : 'bg-primary text-white hover:bg-blue-700'
                }`}
              >
                {isScanning ? 'Đang nhận diện...' : 'Bắt đầu quét'}
              </button>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg mb-2">Kết quả AI:</p>
              <p className="text-4xl font-bold text-primary bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl">
                {prediction}
              </p>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-6">
            Quiz: Đoán ký hiệu (Câu {currentQ + 1}/{quizQuestions.length})
          </h2>
          <div className="space-y-4">
            <p className="text-xl font-semibold text-center mb-6">
              Ký hiệu này là gì?
            </p>
            <div className="grid grid-cols-2 gap-4">
              {quizQuestions[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={showResult}
                  className={`p-4 rounded-xl font-medium transition ${
                    showResult
                      ? i === quizQuestions[currentQ].correct
                        ? 'bg-green-500 text-white'
                        : i === selected
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200'
                      : 'bg-blue-100 hover:bg-blue-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {showResult && (
              <div className="text-center mt-6">
                <p className={`text-lg font-bold ${selected === quizQuestions[currentQ].correct ? 'text-green-600' : 'text-red-600'}`}>
                  {selected === quizQuestions[currentQ].correct ? 'Đúng!' : 'Sai!'}
                </p>
                <button onClick={nextQuestion} className="mt-4 btn-primary">
                  Câu tiếp theo
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FLASHCARD */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-6">Flashcard học tập</h2>
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-primary to-secondary text-white p-8 rounded-2xl text-center">
              <h3 className="text-3xl font-bold mb-4">{flashcards[flashIndex].sign}</h3>
              <p className="text-lg">{flashcards[flashIndex].meaning}</p>
            </div>
            <div className="mt-6 flex justify-center">
              <button onClick={nextFlash} className="btn-primary">
                Thẻ tiếp theo
              </button>
            </div>
          </div>
        </section>

        {/* TIẾN ĐỘ */}
        <section className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-secondary mb-6">Tiến độ hôm nay</h2>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-lg font-semibold mb-2">
              <span>Điểm số</span>
              <span>{score} / {quizQuestions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-6 rounded-full transition-all duration-500"
                style={{ width: `${(score / quizQuestions.length) * 100}%` }}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Hoàn thành {Math.round((score / quizQuestions.length) * 100)}% bài tập
            </p>
          </div>
        </section>

        {/* GỢI Ý */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-6">
            <strong>Mẹo:</strong> Hãy luyện tập trước g đặc biệt vào buổi sáng để tăng khả năng ghi nhớ!
          </p>
          <Link to="/" className="text-primary font-semibold hover:underline">
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}