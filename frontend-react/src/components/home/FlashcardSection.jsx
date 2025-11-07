// src/components/home/FlashcardSection.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import '../home.css';
import { fetchFlashcardTopicsFromDrive, defaultTopics } from '../../data/flashcardsLoader';

export default function FlashcardSection() {
  const { user } = useAuth();
  const [flipped, setFlipped] = useState(false);
  const [note, setNote] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]); // Lưu câu sai để nhắc nhở

  const [topics, setTopics] = useState(defaultTopics);
  const sampleCard = topics?.[0]?.flashcards?.[0] || { front: 'Xin chào', back: 'Hello', image: null };

  useEffect(() => {
    const DRIVE_ID = '1i3ia03fKrHovFU1TnPZtIy-_32sxqDh9';
    (async () => {
      const remote = await fetchFlashcardTopicsFromDrive(DRIVE_ID);
      if (remote) setTopics(remote);
    })();
  }, []);

  const quiz = [
    { q: "Ký hiệu 'Xin chào' nghĩa là gì?", options: ["Tạm biệt", "Xin chào", "Cảm ơn", "Xin lỗi"], correct: 1 },
  ];

  const toggleFavorite = () => {
    const key = sampleCard.front;
    if (favorites.includes(key)) {
      setFavorites(favorites.filter(f => f !== key));
    } else {
      setFavorites([...favorites, key]);
    }
  };

  const addNote = () => {
    if (note.trim()) {
      console.log(`Ghi chú cho "${sampleCard.front}": ${note}`);
      setNote('');
    }
  };

  const answerQuiz = (idx) => {
    const isCorrect = idx === quiz[0].correct;
    if (!isCorrect) {
      setQuizAnswers([...quizAnswers, { q: quiz[0].q, wrong: quiz[0].options[idx] }]); // Lưu câu sai
    }
    setQuizScore(isCorrect ? quizScore + 1 : quizScore);
  };

  const reminderForWrong = () => {
    if (quizAnswers.length > 0) {
      alert(`Ôn lại câu sai: ${quizAnswers[0].q}. Đáp án đúng: ${quiz[0].options[quiz[0].correct]}`);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">Giới thiệu Flashcard</h2>
        <div className="max-w-md mx-auto">
          <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
            <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
              <div className="flashcard-face front">
                {sampleCard.image && (<img src={sampleCard.image} alt={sampleCard.front} className="w-full h-48 object-cover rounded-t-lg" />)}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-blue-600">{sampleCard.front}</h3>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(); }} className="btn-secondary mt-3">
                    {favorites.includes(sampleCard.front) ? 'Bỏ yêu thích' : 'Lưu yêu thích'}
                  </button>
                </div>
              </div>
              <div className="flashcard-face back">
                {sampleCard.image && (<img src={sampleCard.image} alt={sampleCard.back} className="w-full h-48 object-cover rounded-t-lg" />)}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-purple-600">Nghĩa: {sampleCard.back}</h3>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(); }} className="btn-secondary mt-3">
                    {favorites.includes(sampleCard.front) ? 'Bỏ yêu thích' : 'Lưu yêu thích'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-bold mb-2">Ghi chú:</h4>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Viết ghi chú cho flashcard này..."
              className="w-full p-2 border rounded"
            />
            <button onClick={addNote} className="btn-primary mt-2">Lưu ghi chú</button>
          </div>
          <div className="mt-4">
            <h4 className="font-bold mb-2">Củng cố kiến thức:</h4>
            <p className="text-lg mb-2">Ký hiệu này nghĩa là gì?</p>
            <div className="space-y-2">
              {quiz[0].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answerQuiz(i)}
                  className={`w-full p-2 rounded ${i === quiz[0].correct ? 'bg-green-200' : 'bg-gray-100'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button onClick={reminderForWrong} className="btn-primary mt-2">Ôn lại câu sai</button>
          </div>
          <Link to="/flashcard" className="btn-primary w-full mt-4">Xem thêm flashcard</Link>
        </div>
      </div>
    </section>
  );
}