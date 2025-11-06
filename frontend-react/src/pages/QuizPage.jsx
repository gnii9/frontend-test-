// src/pages/QuizPage.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../components/home/home.css';

export default function QuizPage() {
  const { topicId } = useParams(); // lấy topicId từ URL
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Demo dữ liệu quiz theo chủ đề
  const quizzes = {
    1: {
      name: "Chào hỏi",
      question: "Xin chào trong tiếng Anh là gì?",
      options: ["Hello", "Goodbye", "Thanks", "Please"],
      answer: "Hello",
    },
    2: {
      name: "Gia đình",
      question: "Từ 'Mẹ' trong tiếng Anh là gì?",
      options: ["Father", "Mother", "Sister", "Brother"],
      answer: "Mother",
    },
  };

  const quiz = quizzes[topicId];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer) {
      setFeedback('Vui lòng chọn một đáp án!');
      return;
    }
    if (answer === quiz.answer) {
      setScore(score + 1);
      setStreak(streak + 1);
      setFeedback('✅ Chính xác!');
    } else {
      setStreak(0);
      setFeedback(`❌ Sai rồi. Đáp án đúng là "${quiz.answer}".`);
    }
    setAnswer('');
  };

  if (!quiz) return <p className="text-center py-16">Không tìm thấy quiz cho chủ đề này.</p>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Quiz - Chủ đề {quiz.name}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <p className="text-lg font-semibold">{quiz.question}</p>
        <div className="space-y-2">
          {quiz.options.map((opt, i) => (
            <label key={i} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="answer"
                value={opt}
                checked={answer === opt}
                onChange={(e) => setAnswer(e.target.value)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
        <button type="submit" className="btn-primary w-full">
          Nộp bài
        </button>
      </form>

      {feedback && (
        <p className="mt-4 text-center font-medium">
          {feedback}
        </p>
      )}

      <div className="mt-6 text-center">
        <p className="text-lg">Điểm: {score}</p>
        <p className="text-lg">Streak: {streak} ngày</p>
      </div>
    </div>
  );
}
