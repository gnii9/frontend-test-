// src/pages/LearningChatPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';

export default function LearningChatPage() {
  const { user, addWrongVocabulary } = useAuth();

  const videoRef = useRef(null);
  const chatEndRef = useRef(null);

  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('free');
  const [topic, setTopic] = useState('');
  const [feedback, setFeedback] = useState({ status: 'idle', message: '' });
  const [chat, setChat] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const [topics, setTopics] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [scripts, setScripts] = useState({});

  // ---- Load topics từ backend ----
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/practice/topics/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setTopics(data);

        const scriptMap = {};
        data.forEach(t => { scriptMap[t.id] = t.words || []; });
        setScripts(scriptMap);
      } catch (err) {
        console.error("Failed to load topics:", err);
      } finally {
        setLoadingTopics(false);
      }
    };
    fetchTopics();
  }, []);

  // ---- Camera control ----
  useEffect(() => {
    let currentStream;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        currentStream = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setStreaming(true);
        addChatMessage('assistant', 'Camera đã sẵn sàng! Bắt đầu luyện tập nhé.');
      } catch (err) {
        console.error("Lỗi camera:", err);
        setFeedback({ status: 'error', message: 'Không truy cập được camera.' });
      }
    };

    const stopCamera = () => {
      if (currentStream) currentStream.getTracks().forEach(t => t.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      setStreaming(false);
    };

    if (step === 3) startCamera();
    else stopCamera();

    return () => stopCamera();
  }, [step]);

  // ---- Auto scroll chat ----
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  // ---- Hàm gửi label cho LLM ----
  const handleLabel = async (label) => {
    try {
      const res = await fetch("/api/llm-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: label }),
      });
      const data = await res.json();
      console.log("LLM response:", data.output);
      setFeedback({ status: 'ok', message: data.output });
      addChatMessage('assistant', data.output);
    } catch (err) {
      console.error("LLM request failed:", err);
      setFeedback({ status: 'error', message: "Không nhận được phản hồi từ LLM" });
    }
  };

  // ---- Capture frame + gọi ST-GCN ----
  useEffect(() => {
    if (step !== 3 || !streaming) return;

    const interval = setInterval(async () => {
      if (!videoRef.current) return;

      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0);

      // Lấy frame dưới dạng Blob
      const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg"));
      if (!blob) return;

      const formData = new FormData();
      formData.append("file", blob, "frame.jpg"); // tên file tùy ý

      try {
        const res = await fetch("http://localhost:8001/predict", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          console.error("ST-GCN response not OK:", res.status);
          return;
        }

        const data = await res.json();
        // data = { label, confidence }
        const label = data.label || "unknown";
        const conf = data.confidence !== undefined ? data.confidence.toFixed(2) : "-";

        setFeedback({ status: "ok", message: `${label} (${conf})` });

        // Có thể gọi LLM khi confidence đủ cao
        // if (parseFloat(conf) > 0.7) handleLabel(label);

      } catch (err) {
        console.error("Error predicting label:", err);
        setFeedback({ status: "error", message: "Không nhận diện được." });
      }
    }, 200); // ~5 FPS

    return () => clearInterval(interval);
  }, [step, streaming]);


  // ---- Chat helpers ----
  const addChatMessage = (role, text) => {
    setChat(prev => [
      ...prev,
      { role, text, time: new Date().toLocaleTimeString('vi-VN') },
    ]);
  };

  const handleTopicSelect = (selectedTopic) => {
    setTopic(selectedTopic);
    setStep(3);
    const selected = topics.find(t => t.id === selectedTopic)?.title;
    addChatMessage('assistant', `Chủ đề "${selected}" đã được chọn. Bạn có thể thực hiện bất kỳ ký hiệu nào.`);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const text = inputMessage.trim();
    addChatMessage('user', text);
    setInputMessage('');

    try {
      const res = await fetch('http://localhost:8000/api/practice/chatbot/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          vocab_list: '', // thêm nếu bạn muốn
          topics: topic ? [topic] : [],
        }),
      });

      const data = await res.json();
      if (data.answer) addChatMessage('assistant', data.answer);
    } catch (err) {
      console.error('Lỗi gửi chat:', err);
      addChatMessage('assistant', '🚨 Không kết nối được server.');
    }
  };

  // ---- Redirect nếu chưa login ----
  if (!user) return <Navigate to="/login" replace />;

  // ---- UI ----
  return (
    <section className="section-outer section-white">
      <div className="container-1200">
        <h1 className="text-3xl font-bold text-primary mb-6">Luyện tập với AI</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="space-y-4">
            {step === 1 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Chọn chủ đề</h2>
                <div className="grid grid-cols-2 gap-4">
                  {topics.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleTopicSelect(t.id)}
                      className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 border-2 border-transparent hover:border-blue-500 transition-all"
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <>
                <button
                  onClick={() => { setStep(1); setTopic(''); setFeedback({ status: 'idle', message: '' }); }}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  ← Chọn lại
                </button>

                <div className={`rounded-xl overflow-hidden border-4 ${
                  feedback.status === 'ok' ? 'border-green-400' :
                  feedback.status === 'wrong' ? 'border-red-400' :
                  feedback.status === 'processing' ? 'border-yellow-400' :
                  'border-gray-200'
                }`}>
                  <video
                    ref={videoRef}
                    className="w-full bg-black aspect-video"
                    muted
                    playsInline
                  />
                </div>

                <div className={`p-4 rounded-lg border-2 ${
                  feedback.status === 'ok' ? 'bg-green-50 border-green-200' :
                  feedback.status === 'wrong' ? 'bg-red-50 border-red-200' :
                  feedback.status === 'processing' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  {feedback.message || 'Chưa có phản hồi...'}
                </div>
              </>
            )}
          </div>

          {/* RIGHT — Chatbox */}
          <div className="flex flex-col bg-white rounded-xl shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">Chatbot hướng dẫn</h2>
            </div>

            <div className="flex-1 min-h-[400px] max-h-[600px] overflow-y-auto p-4 space-y-3 bg-gray-50">
              {chat.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  Chatbot sẽ hiển thị gợi ý tại đây.
                </div>
              ) : (
                <>
                  {chat.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${m.role === 'assistant' ? 'bg-blue-100 text-gray-900' : 'bg-blue-600 text-white'}`}>
                        <div>{m.text}</div>
                        <div className="text-xs mt-1 opacity-70">{m.time}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Nhập câu hỏi..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Gửi
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
