import { useState } from 'react';

const questions = [
  {
    text: "Ký hiệu 'Cảm ơn' được thực hiện như thế nào?",
    options: ["A. Tay chạm cằm", "B. Tay vẫy", "C. Tay chỉ lên", "D. Tay chạm ngực"],
    correct: 0,
    explanation: "Tay phải chạm nhẹ vào cằm, rồi đưa ra phía trước."
  }
];

export default function QuizFlow() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const q = questions[current];

  const handleAnswer = (i) => {
    setSelected(i);
    setShowResult(true);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Câu {current + 1}: {q.text}</h3>
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={showResult}
            className={`w-full text-left p-4 rounded-lg border transition ${
              showResult
                ? i === q.correct
                  ? 'bg-green-100 border-green-500'
                  : i === selected
                  ? 'bg-red-100 border-red-500'
                  : 'bg-gray-50'
                : 'hover:bg-gray-100'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="font-semibold text-green-700">Giải thích:</p>
          <p>{q.explanation}</p>
          <button
            onClick={() => {
              setCurrent(0);
              setSelected(null);
              setShowResult(false);
            }}
            className="mt-4 btn-primary"
          >
            Làm lại
          </button>
        </div>
      )}
    </div>
  );
}