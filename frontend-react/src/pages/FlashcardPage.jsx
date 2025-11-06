// src/pages/FlashcardPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../components/home/home.css';

export default function FlashcardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [flipped, setFlipped] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [notes, setNotes] = useState({});
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const topics = [
    {
      id: 1,
      name: "Chào hỏi",
      flashcards: [
        { id: 1, front: "Xin chào", back: "Hello" },
        { id: 2, front: "Tạm biệt", back: "Goodbye" },
      ],
      quiz: {
        question: "Xin chào trong tiếng Anh là gì?",
        options: ["Hello", "Goodbye", "Thanks", "Please"],
        answer: "Hello",
      },
    },
    {
      id: 2,
      name: "Gia đình",
      flashcards: [
        { id: 3, front: "Mẹ", back: "Mother" },
        { id: 4, front: "Cha", back: "Father" },
      ],
      quiz: {
        question: "Từ 'Mẹ' trong tiếng Anh là gì?",
        options: ["Father", "Mother", "Sister", "Brother"],
        answer: "Mother",
      },
    },
  ];

  const toggleFlip = (id) => {
    setFlipped({ ...flipped, [id]: !flipped[id] });
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleNoteChange = (id, value) => {
    setNotes({ ...notes, [id]: value });
  };

  const handleAnswer = (topicId, answer) => {
    const topic = topics.find((t) => t.id === topicId);
    if (answer !== topic.quiz.answer) {
      setWrongAnswers((prev) => [...prev, topicId]);
    }
  };

  if (!user) return <p className="text-center py-16">Vui lòng đăng nhập để xem flashcard.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-primary mb-8">Flashcard theo chủ đề</h1>

      {!selectedTopic ? (
        <div className="grid md:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="p-6 bg-white rounded-lg shadow hover:bg-blue-50 transition text-left font-semibold"
            >
              {topic.name}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">{selectedTopic.name}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {selectedTopic.flashcards.map((card) => (
              <div key={card.id} className="bg-white p-6 rounded-lg shadow relative">
                <div
                  className="cursor-pointer text-center py-12"
                  onClick={() => toggleFlip(card.id)}
                >
                  <p className="text-xl font-semibold">
                    {flipped[card.id] ? card.back : card.front}
                  </p>
                </div>
                <button
                  onClick={() => toggleFavorite(card.id)}
                  className={`absolute top-4 right-4 ${
                    favorites.includes(card.id) ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  ♥
                </button>
                <textarea
                  placeholder="Viết ghi chú..."
                  value={notes[card.id] || ""}
                  onChange={(e) => handleNoteChange(card.id, e.target.value)}
                  className="w-full mt-4 p-2 border rounded"
                />
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mt-12 mb-4">Củng cố kiến thức</h3>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="font-semibold mb-4">{selectedTopic.quiz.question}</p>
            <div className="grid grid-cols-2 gap-4">
              {selectedTopic.quiz.options.map((ans) => (
                <button
                  key={ans}
                  onClick={() => handleAnswer(selectedTopic.id, ans)}
                  className="p-3 border rounded hover:bg-gray-100"
                >
                  {ans}
                </button>
              ))}
            </div>
            {wrongAnswers.includes(selectedTopic.id) && (
              <p className="mt-4 text-red-500">
                Bạn đã chọn sai. Hệ thống sẽ nhắc lại câu này trong lần học sau.
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <button
              onClick={() => navigate(`/quiz/${selectedTopic.id}`)}
              className="btn-primary"
            >
              Làm Quiz cho chủ đề này
            </button>
            <button
              onClick={() => setSelectedTopic(null)}
              className="px-8 py-4 bg-secondary text-white rounded-full font-bold hover:bg-gray-700 transition shadow-lg"
            >
              ← Quay lại danh sách chủ đề
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
