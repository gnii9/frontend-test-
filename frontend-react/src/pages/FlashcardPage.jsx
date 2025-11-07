// src/pages/FlashcardPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './pages.css';
import { fetchFlashcardTopicsFromDrive, defaultTopics } from '../data/flashcardsLoader';

export default function FlashcardPage() {
  const { user, addToFavorites, removeFromFavorites, addWrongVocabulary, updateStats } = useAuth();
  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [notes, setNotes] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [wrongQuestions, setWrongQuestions] = useState([]);

  const [topics, setTopics] = useState(defaultTopics);

  useEffect(() => {
    const DRIVE_ID = '1i3ia03fKrHovFU1TnPZtIy-_32sxqDh9';
    (async () => {
      const remote = await fetchFlashcardTopicsFromDrive(DRIVE_ID);
      if (remote) setTopics(remote);
    })();
  }, []);

  const topicQuizzes = {
    1: [
        {
          id: 1,
          question: "Xin chào trong tiếng Anh là gì?",
          options: ["Hello", "Goodbye", "Thanks", "Please"],
          correct: "Hello"
        },
        {
          id: 2,
          question: "Tạm biệt trong tiếng Anh là gì?",
          options: ["Hello", "Goodbye", "Thanks", "Please"],
          correct: "Goodbye"
        },
        {
          id: 3,
          question: "Cảm ơn trong tiếng Anh là gì?",
          options: ["Hello", "Goodbye", "Thanks", "Please"],
          correct: "Thanks"
        }
    ],
    2: [
        {
          id: 4,
          question: "Từ 'Mẹ' trong tiếng Anh là gì?",
          options: ["Father", "Mother", "Sister", "Brother"],
          correct: "Mother"
        },
        {
          id: 5,
          question: "Từ 'Cha' trong tiếng Anh là gì?",
          options: ["Father", "Mother", "Sister", "Brother"],
          correct: "Father"
        }
    ],
  };

  const currentTopic = selectedTopic ? topics.find(t => t.id === selectedTopic.id) : null;
  const currentCard = currentTopic && currentTopic.flashcards[currentCardIndex];
  const isFavorite = currentCard && user?.favorites?.flashcards?.some(f => f.id === currentCard.id);
  const currentQuiz = currentTopic?.quiz || topicQuizzes[currentTopic?.id] || topicQuizzes[String(currentTopic?.id)] || [];

  useEffect(() => {
    // Load notes from localStorage
    const savedNotes = localStorage.getItem(`notes_${user?.id}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [user]);

  const saveNotes = () => {
    if (user) {
      localStorage.setItem(`notes_${user.id}`, JSON.stringify(notes));
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex < currentTopic.flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFavorite = () => {
    if (!currentCard || !user) return;
    
    if (isFavorite) {
      removeFromFavorites('flashcards', currentCard.id);
    } else {
      addToFavorites('flashcards', {
        id: currentCard.id,
        title: currentCard.front,
        topic: currentTopic.name
      });
    }
  };

  const handleNoteChange = (value) => {
    if (!currentCard) return;
    const newNotes = { ...notes, [currentCard.id]: value };
    setNotes(newNotes);
    saveNotes();
  };

  const handleQuizAnswer = (questionId, answer) => {
    const question = currentQuiz.find(q => q.id === questionId);
    if (!question) return;

    setQuizAnswers({ ...quizAnswers, [questionId]: answer });
    
    if (answer !== question.correct) {
      if (!wrongQuestions.includes(questionId)) {
        setWrongQuestions([...wrongQuestions, questionId]);
        addWrongVocabulary(`quiz_${questionId}`, question.question);
      }
    }
  };

  const handleFinishQuiz = () => {
    const quizSet = currentQuiz;
    const totalQuestions = quizSet.length;
    if (totalQuestions === 0) {
      setShowQuiz(false);
      setQuizAnswers({});
      return;
    }

    const correctCount = quizSet.filter(q => quizAnswers[q.id] === q.correct).length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    updateStats({
      testScores: [...(user.stats?.testScores || []), score]
    });

    alert(`Bạn đã hoàn thành! Điểm: ${score}% (${correctCount}/${totalQuestions})`);
    setShowQuiz(false);
    setQuizAnswers({});
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Vui lòng đăng nhập để xem flashcard.</p>
          <button onClick={() => navigate('/login')} className="btn-primary">Đăng nhập</button>
        </div>
      </div>
    );
  }

  return (
    <section className="section-outer section-alt">
      <div className="container-1200">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Flashcard theo chủ đề</h1>

        {!selectedTopic ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
                className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-left"
              >
                <h2 className="text-2xl font-bold text-primary mb-2">{topic.name}</h2>
                <p className="text-gray-600">{topic.flashcards.length} flashcard</p>
              </button>
            ))}
          </div>
        ) : !showQuiz ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setSelectedTopic(null);
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
                className="text-gray-600 hover:text-primary"
              >
                Quay lại danh sách
              </button>
              <h2 className="text-2xl font-bold text-primary">{currentTopic.name}</h2>
              <div className="text-gray-600">
                {currentCardIndex + 1} / {currentTopic.flashcards.length}
              </div>
            </div>

            {/* Flashcard - Quizlet style */}
            <div className="relative">
              <div
                className="relative w-full h-96 cursor-pointer"
                style={{ perspective: '1000px' }}
                onClick={handleFlip}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-2xl flex items-center justify-center p-8 border-4 border-blue-200"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4"></div>
                      <h3 className="text-4xl font-bold text-primary">{currentCard?.front}</h3>
                      <p className="text-gray-500 mt-4 text-lg">Nhấp để lật</p>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center p-8 text-white"
                    style={{ 
                      backfaceVisibility: 'hidden', 
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)' 
                    }}
                  >
                    <div className="text-center">
                      <h3 className="text-4xl font-bold mb-4">{currentCard?.back}</h3>
                      <p className="text-xl opacity-90">{currentCard?.front}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Favorite button (standalone) */}
              <div className="mt-4 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite();
                  }}
                  className="btn-secondary"
                >
                  {isFavorite ? 'Bỏ yêu thích' : 'Lưu yêu thích'}
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handlePrev}
                disabled={currentCardIndex === 0}
                className="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Bài trước
              </button>
              <button
                onClick={handleFlip}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg"
              >
                {isFlipped ? 'Xem mặt trước' : 'Lật thẻ'}
              </button>
              <button
                onClick={handleNext}
                disabled={currentCardIndex === currentTopic.flashcards.length - 1}
                className="px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Bài tiếp
              </button>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-3">Ghi chú</h3>
              <textarea
                value={notes[currentCard?.id] || ''}
                onChange={(e) => handleNoteChange(e.target.value)}
                placeholder="Viết ghi chú cho flashcard này..."
                className="w-full p-4 border rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                onBlur={saveNotes}
              />
            </div>

            {/* Quiz button */}
            <div className="text-center">
              <button
                onClick={() => setShowQuiz(true)}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl text-lg font-semibold"
              >
                Củng cố kiến thức - Làm Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowQuiz(false)}
                className="text-gray-600 hover:text-primary"
              >
                Quay lại flashcard
              </button>
              <h2 className="text-2xl font-bold text-primary">Quiz: {currentTopic.name}</h2>
              <div className="text-gray-600">
                {Object.keys(quizAnswers).length} / {currentQuiz.length}
              </div>
            </div>

            <div className="space-y-6">
              {currentQuiz.map((question, index) => {
                const userAnswer = quizAnswers[question.id];
                const isCorrect = userAnswer === question.correct;
                const isWrong = userAnswer && !isCorrect;

                return (
                  <div
                    key={question.id}
                    className={`bg-white rounded-xl shadow-lg p-6 border-2 ${
                      isCorrect ? 'border-green-500' : isWrong ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-4">
                      Câu {index + 1}: {question.question}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {question.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleQuizAnswer(question.id, option)}
                          disabled={!!userAnswer}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            userAnswer === option
                              ? isCorrect
                                ? 'bg-green-100 border-green-500 text-green-700'
                                : 'bg-red-100 border-red-500 text-red-700'
                              : option === question.correct && userAnswer
                              ? 'bg-green-100 border-green-500 text-green-700'
                              : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                          } disabled:cursor-not-allowed`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {isWrong && (
                      <p className="mt-4 text-red-600 font-semibold">
                        Sai! Đáp án đúng là: {question.correct}
                      </p>
                    )}
                    {isCorrect && (
                      <p className="mt-4 text-green-600 font-semibold">Chính xác!</p>
                    )}
                  </div>
                );
              })}
            </div>

            {currentQuiz.length > 0 && Object.keys(quizAnswers).length === currentQuiz.length && (
              <div className="text-center">
                <button
                  onClick={handleFinishQuiz}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl text-lg font-semibold"
                >
                  Hoàn thành Quiz
                </button>
                {wrongQuestions.length > 0 && (
                  <p className="mt-4 text-red-600">
                    Bạn đã sai {wrongQuestions.length} câu. Hệ thống sẽ nhắc bạn ôn tập lại!
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
