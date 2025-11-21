// src/pages/FlashcardPage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import YouTube from "react-youtube";

export default function FlashcardPage() {
    const { user, addToFavorites, removeFromFavorites, addWrongVocabulary, updateStats } = useAuth();
    const navigate = useNavigate();

    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);

    const [flashcards, setFlashcards] = useState([]);
    const [testQuestions, setTestQuestions] = useState([]);

    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const [showQuiz, setShowQuiz] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [wrongQuestions, setWrongQuestions] = useState([]);

    // ======================
    // LOAD TOPICS
    // ======================
    useEffect(() => {
        async function loadTopics() {
            const res = await fetch("http://localhost:8000/api/learning/topics/");
            const data = await res.json();
            setTopics(data); // backend trả ARRAY
        }
        loadTopics();
    }, []);

    // ======================
    // LOAD FLASHCARDS + QUESTIONS
    // ======================
    const selectTopic = async (topic) => {
        setSelectedTopic(topic);
        setIsFlipped(false);
        setCurrentCardIndex(0);

        // flashcards
        const res1 = await fetch(`http://localhost:8000/api/learning/topics/${topic.id}/flashcards/`);
        const data1 = await res1.json();
        setFlashcards(data1.flashcards);

        // test questions
        const res2 = await fetch(`http://localhost:8000/api/learning/topics/${topic.id}/test-questions/`);
        const data2 = await res2.json();
        setTestQuestions(data2.questions);
    };

    const currentCard = flashcards[currentCardIndex];

    const handleFlip = () => setIsFlipped(!isFlipped);

    const handleNext = () => {
        if (currentCardIndex < flashcards.length - 1) {
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

    // ======================
    // QUIZ MAPPING BACKEND
    // ======================
    const mappedQuiz = testQuestions.map((q) => ({
        id: q.test_id,
        flashcard_id: q.flashcard_id,     // 🔥 Quan trọng
        question: q.question,
        front_text: q.front_text,
        back_text: q.back_text,
        media_url: q.media_url,
        options: [
            q.options.A,
            q.options.B,
            q.options.C,
            q.options.D
        ],
        correct: q.correct_option
    }));


    // ======================
    // ANSWER SUBMIT
    // ======================
    const handleQuizAnswer = async (questionId, optionIndex) => {
        const optionKey = ["A", "B", "C", "D"][optionIndex];

        // Update UI ngay
        setQuizAnswers((prev) => ({
            ...prev,
            [questionId]: optionKey,
        }));

        // Tìm câu hỏi trong mappedQuiz
        const question = mappedQuiz.find((q) => q.id === questionId);
        if (!question) return;

        const token = localStorage.getItem("accessToken");
        console.log(token)

        try {
            await fetch("http://localhost:8000/api/learning/topics/submit_answer/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    question_id: questionId,
                    answer: optionKey,
                }),

            });
        } catch (err) {
            console.error("Lỗi khi gửi submit_answer:", err);
        }

        // Ghi lại câu sai vào hệ thống "từ sai"
        if (optionKey !== question.correct) {
            setWrongQuestions((prev) =>
                prev.includes(questionId) ? prev : [...prev, questionId]
            );
            addWrongVocabulary(`quiz_${questionId}`, question.question);
        }
    };

    const handleFinishQuiz = async () => {
        if (!selectedTopic) return;

        const token = localStorage.getItem("accessToken");
        console.log(token)

        // 🔥 Gom kết quả cho từng flashcard
        const results = mappedQuiz.map((q) => {
            const userAns = quizAnswers[q.id];
            const isCorrect = userAns === q.correct;

            return {
                flashcard_id: q.flashcard_id,
                correct: isCorrect ? 1 : 0,
                wrong: isCorrect ? 0 : 1
            };
        });

        try {
            const res = await fetch(
                "http://localhost:8000/api/learning/topics/finish_quiz/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: JSON.stringify({
                        topic_id: selectedTopic.id,
                        results: results      // 🔥 gửi danh sách kết quả
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                alert(
                    `Hoàn thành Quiz chủ đề "${selectedTopic.title}"\n` +
                    `Tổng câu: ${mappedQuiz.length}\n` +
                    `Đúng: ${data.total_correct}\nSai: ${data.total_wrong}\n` +
                    `Điểm: ${data.correct_rate}%`
                );
            } else {
                alert(data.error || "Có lỗi khi tổng kết quiz.");
            }
        } catch (err) {
            console.error("Lỗi finish_quiz:", err);
        }

        setShowQuiz(false);
        setQuizAnswers({});
        setWrongQuestions([]);
    };



    function getYoutubeId(url) {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|watch\?v=)([^&]+)/);
        return match ? match[1] : null;
    }



    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Bạn cần đăng nhập để xem nội dung</p>
                <button onClick={() => navigate("/login")} className="btn-primary">Đăng nhập</button>
            </div>
        );
    }

    return (
        <section className="section-outer section-alt">
            <div className="container-1200">

                <h1 className="text-4xl mb-8 text-center font-bold text-primary">Flashcard theo chủ đề</h1>

                {/* ===================== TOPIC LIST ===================== */}
                {!selectedTopic && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {topics.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => selectTopic(t)}
                                className="p-6 bg-white shadow rounded-xl hover:shadow-xl transition"
                            >
                                <h2 className="text-xl font-bold text-primary">{t.title}</h2>
                                <p className="text-sm text-gray-500">{t.flashcard_count} thẻ</p>
                            </button>
                        ))}
                    </div>
                )}

                {/* ===================== FLASHCARD MODE ===================== */}
                {selectedTopic && !showQuiz && (
                    <div className="space-y-6">

                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <button onClick={() => setSelectedTopic(null)}>← Quay lại</button>
                            <h2 className="text-2xl font-bold">{selectedTopic.title}</h2>
                            <div>{currentCardIndex + 1}/{flashcards.length}</div>
                        </div>

                        {/* Flashcard */}
                        <div
                            className="relative w-full h-96 cursor-pointer"
                            style={{ perspective: "1000px" }}
                            onClick={handleFlip}
                        >
                            {/* Wrapper */}
                            <div
                                className="absolute inset-0 transition-all duration-500"
                                style={{
                                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                                    transformStyle: "preserve-3d",
                                }}
                            >

                                {/* Front */}
                                <div
                                    className="absolute inset-0 bg-white rounded-xl shadow-lg flex items-center justify-center p-4"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    {(() => {
                                        const videoId = getYoutubeId(currentCard?.media);

                                        if (videoId) {
                                            return (
                                                <div className="w-full h-64 rounded-xl overflow-hidden shadow border">
                                                    <YouTube
                                                        key={videoId}             // ✔ KHỞI TẠO PLAYER MỚI
                                                        videoId={videoId}
                                                        opts={{
                                                            width: "100%",
                                                            height: "100%",
                                                            playerVars: {
                                                                autoplay: 1,
                                                                controls: 1,
                                                                loop: 1,
                                                                playlist: videoId,
                                                                rel: 0,
                                                                modestbranding: 1,
                                                            },
                                                        }}
                                                        className="w-full h-full"
                                                    />

                                                </div>
                                            );
                                        }

                                        return (
                                            <h3 className="text-4xl font-bold text-center">
                                                {currentCard?.front_text}
                                            </h3>
                                        );
                                    })()}
                                </div>

                                {/* Back */}
                                <div
                                    className="absolute inset-0 bg-blue-600 text-white rounded-xl shadow-lg flex items-center justify-center p-8"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                    }}
                                >
                                    <div className="p-8 bg-blue-600 rounded-xl text-white text-center">
                                        <p className="text-xl whitespace-pre-wrap">{currentCard?.front_text}</p>
                                        <p className="text-xl whitespace-pre-wrap mt-4">{currentCard?.back_text}</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-center gap-4">
                            <button onClick={handlePrev} className="btn-secondary">Bài trước</button>
                            <button onClick={handleFlip} className="btn-secondary">Lật thẻ</button>
                            <button onClick={handleNext} className="btn-secondary">Bài tiếp</button>
                        </div>

                        {/* Quiz Button */}
                        <div className="text-center">
                            <button className="btn-primary px-6 py-3" onClick={() => setShowQuiz(true)}>
                                Làm Quiz
                            </button>
                        </div>
                    </div>
                )}

                {/* ===================== QUIZ MODE ===================== */}
                {selectedTopic && showQuiz && (
                    <div className="space-y-6 pb-10">
                        <button onClick={() => setShowQuiz(false)}>← Quay lại Flashcard</button>

                        {mappedQuiz.map((q, i) => {
                            const userAnswer = quizAnswers[q.id];
                            const videoId = getYoutubeId(q.media_url);

                            return (
                                <div key={q.id} className="p-6 bg-white rounded-xl shadow space-y-4">
                                    {/* Câu hỏi */}
                                    <h3 className="font-bold text-xl">
                                        Câu {i + 1}: {q.question}
                                    </h3>

                                    {/* Video */}
                                    {videoId && (
                                        <div className="w-full h-64 rounded-xl overflow-hidden shadow border">
                                            <YouTube
                                                videoId={videoId}
                                                opts={{
                                                    width: "100%",
                                                    height: "100%",
                                                    playerVars: {
                                                        autoplay: 0,
                                                        controls: 1,
                                                        loop: 1,
                                                        playlist: videoId,
                                                        rel: 0,
                                                        modestbranding: 1,
                                                        iv_load_policy: 3,
                                                    },
                                                }}
                                                className="w-full h-full"
                                            />
                                        </div>
                                    )}

                                    {/* Đáp án */}
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        {q.options.map((op, idx) => {
                                            const optionKey = ["A", "B", "C", "D"][idx];
                                            const isCorrect = optionKey === q.correct;

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleQuizAnswer(q.id, idx)}
                                                    disabled={!!userAnswer}
                                                    className={`p-3 rounded-lg border transition-all text-left 
                                                    ${userAnswer === optionKey
                                                            ? isCorrect
                                                                ? "bg-green-200 border-green-600"
                                                                : "bg-red-200 border-red-600"
                                                            : "hover:bg-gray-100"
                                                        }`}
                                                >
                                                    <span className="font-bold">{optionKey}.</span> {op}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Kết quả */}
                                    {userAnswer && (
                                        <p className="mt-3 font-semibold">
                                            {userAnswer === q.correct
                                                ? "✔ Chính xác!"
                                                : `❌ Sai, đáp án đúng: ${q.correct}`}
                                        </p>
                                    )}
                                </div>
                            );
                        })}

                        {/* Nút hoàn thành */}
                        {Object.keys(quizAnswers).length === mappedQuiz.length && (
                            <div className="text-center mt-6">
                                <button onClick={handleFinishQuiz} className="btn-primary px-8 py-3">
                                    Hoàn thành Quiz
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
