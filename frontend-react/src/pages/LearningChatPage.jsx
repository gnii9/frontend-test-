// src/pages/LearningChatPage.jsx
import React, { useEffect, useRef, useState } from 'react';

export default function LearningChatPage() {
  const videoRef = useRef(null);
  const [mode, setMode] = useState(null); // 'script' | 'free'
  const [topic, setTopic] = useState('');
  const [feedback, setFeedback] = useState({ status: 'idle', message: '' });
  const [chat, setChat] = useState([]);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    // bật camera khi vào trang
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreaming(true);
      } catch (e) {
        setFeedback({ status: 'error', message: 'Không truy cập được camera. Hãy kiểm tra quyền và thiết bị.' });
      }
    })();
    return () => {
      const s = videoRef.current?.srcObject;
      if (s) s.getTracks().forEach(t => t.stop());
    };
  }, []);

  useEffect(() => {
    // nhận diện liên tục trong chế độ free
    if (mode === 'free' && streaming) {
      const interval = setInterval(() => {
        // TODO: Gọi AI/ML để phân tích khung hình hiện tại
        // Mock phản hồi
        const ok = Math.random() > 0.5;
        setFeedback({
          status: ok ? 'ok' : 'wrong',
          message: ok ? 'Ký hiệu chính xác! Tiếp tục nhé.' : 'Ngón tay chưa thẳng, giữ cổ tay vững hơn.',
        });
        if (!ok) {
          setChat(prev => [
            ...prev,
            {
              role: 'assistant',
              text: 'Gợi ý bài tập: Luyện giữ cổ tay cố định trước gương 2 phút, rồi thử lại ký hiệu.',
            },
          ]);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [mode, streaming]);

  const handleUploadVideo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: gửi video lên backend để phân tích
    setFeedback({ status: 'processing', message: 'Đang phân tích video đã tải lên...' });
    setTimeout(() => {
      setFeedback({ status: 'ok', message: 'Phân tích xong: 80% chính xác, cần nâng khuỷu tay.' });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-6 py-16 grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Luyện tập</h1>

        <div className="flex gap-3">
          <button
            className={`px-4 py-2 rounded border ${mode === 'script' ? 'bg-blue-600 text-white' : 'bg-white'}`}
            onClick={() => setMode('script')}
          >
            Luyện theo kịch bản
          </button>
          <button
            className={`px-4 py-2 rounded border ${mode === 'free' ? 'bg-blue-600 text-white' : 'bg-white'}`}
            onClick={() => setMode('free')}
          >
            Luyện tự do
          </button>
        </div>

        <div className="flex gap-3">
          <select
            className="border rounded px-3 py-2"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="">Chọn chủ đề</option>
            <option value="greetings">Chào hỏi</option>
            <option value="family">Gia đình</option>
          </select>
          <label className="px-3 py-2 border rounded cursor-pointer">
            Tải video
            <input type="file" accept="video/*" className="hidden" onChange={handleUploadVideo} />
          </label>
        </div>

        <div className={`rounded-lg overflow-hidden border ${feedback.status === 'ok' ? 'border-green-400' : feedback.status === 'wrong' ? 'border-red-400' : 'border-gray-200'}`}>
          <video ref={videoRef} className="w-full bg-black aspect-video" muted playsInline />
        </div>

        <div className={`p-3 rounded border ${feedback.status === 'ok' ? 'bg-green-50 border-green-200' : feedback.status === 'wrong' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
          {feedback.message || 'Chưa có phản hồi.'}
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">Chatbot hướng dẫn</h2>
        <div className="flex-1 min-h-[300px] max-h-[600px] overflow-y-auto border rounded p-3 space-y-2 bg-white">
          {chat.length === 0 ? (
            <p className="text-gray-500">Chatbot sẽ hiển thị gợi ý và giải thích chi tiết tại đây.</p>
          ) : (
            chat.map((m, i) => (
              <div key={i} className={`p-2 rounded ${m.role === 'assistant' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                {m.text}
              </div>
            ))
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <input className="flex-1 border rounded px-3 py-2" placeholder="Nhập câu hỏi cho chatbot..." />
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Gửi</button>
        </div>
      </div>
    </div>
  );
}
