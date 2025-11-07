// src/pages/LearningChatPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './pages.css';

export default function LearningChatPage() {
  const { user, addWrongVocabulary } = useAuth();
  const videoRef = useRef(null);
  const chatEndRef = useRef(null);
  const [step, setStep] = useState(1); // 1: Chọn mode, 2: Chọn topic, 3: Practice
  const [mode, setMode] = useState(null); // 'script' | 'free'
  const [topic, setTopic] = useState('');
  const [feedback, setFeedback] = useState({ status: 'idle', message: '' });
  const [chat, setChat] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const [inputMessage, setInputMessage] = useState('');

  const topics = [
    { id: 'greetings', name: 'Chào hỏi' },
    { id: 'family', name: 'Gia đình' },
    { id: 'school', name: 'Trường học' },
    { id: 'food', name: 'Đồ ăn' },
  ];

  const scripts = {
    greetings: [
      'Xin chào',
      'Tạm biệt',
      'Cảm ơn',
      'Xin lỗi',
    ],
    family: [
      'Mẹ',
      'Cha',
      'Anh trai',
      'Chị gái',
    ],
  };

  useEffect(() => {
    if (step === 3 && mode) {
      // Bật camera khi vào bước practice
      (async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setStreaming(true);
          addChatMessage('assistant', 'Camera đã sẵn sàng! Bắt đầu luyện tập nhé.');
        } catch (e) {
          setFeedback({ status: 'error', message: 'Không truy cập được camera. Hãy kiểm tra quyền và thiết bị.' });
        }
      })();
      return () => {
        const s = videoRef.current?.srcObject;
        if (s) s.getTracks().forEach(t => t.stop());
      };
    }
  }, [step, mode]);

  useEffect(() => {
    // Auto scroll chat to bottom
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  useEffect(() => {
    // Nhận diện liên tục trong chế độ free
    if (step === 3 && mode === 'free' && streaming) {
      const interval = setInterval(() => {
        // TODO: Gọi AI/ML để phân tích khung hình hiện tại
        // Mock phản hồi
        const ok = Math.random() > 0.5;
        setFeedback({
          status: ok ? 'ok' : 'wrong',
          message: ok ? 'Ký hiệu chính xác! Tiếp tục nhé.' : 'Ngón tay chưa thẳng, giữ cổ tay vững hơn.',
        });
        if (!ok) {
          addChatMessage('assistant', 'Gợi ý bài tập: Luyện giữ cổ tay cố định trước gương 2 phút, rồi thử lại ký hiệu.');
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [step, mode, streaming]);

  const addChatMessage = (role, text) => {
    setChat(prev => [...prev, { role, text, time: new Date().toLocaleTimeString('vi-VN') }]);
  };

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setStep(2);
    if (selectedMode === 'script') {
      addChatMessage('assistant', 'Bạn đã chọn luyện theo kịch bản. Hãy chọn chủ đề để bắt đầu.');
    } else {
      addChatMessage('assistant', 'Bạn đã chọn luyện tự do. Hãy chọn chủ đề để AI có thể đưa ra gợi ý phù hợp.');
    }
  };

  const handleTopicSelect = (selectedTopic) => {
    setTopic(selectedTopic);
    setStep(3);
    if (mode === 'script') {
      const topicScripts = scripts[selectedTopic] || [];
      addChatMessage('assistant', `Chủ đề "${topics.find(t => t.id === selectedTopic)?.name}" đã được chọn.`);
      addChatMessage('assistant', `Hãy thực hiện các ký hiệu sau: ${topicScripts.join(', ')}`);
    } else {
      addChatMessage('assistant', `Chủ đề "${topics.find(t => t.id === selectedTopic)?.name}" đã được chọn. Bạn có thể thực hiện bất kỳ ký hiệu nào trong chủ đề này.`);
    }
  };

  const handleUploadVideo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // TODO: gửi video lên backend để phân tích
    setFeedback({ status: 'processing', message: 'Đang phân tích video đã tải lên...' });
    addChatMessage('assistant', 'Đang phân tích video của bạn...');
    setTimeout(() => {
      setFeedback({ status: 'ok', message: 'Phân tích xong: 80% chính xác, cần nâng khuỷu tay.' });
      addChatMessage('assistant', 'Kết quả phân tích: Ký hiệu của bạn có độ chính xác 80%. Gợi ý: Nâng khuỷu tay cao hơn một chút để ký hiệu rõ ràng hơn.');
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    addChatMessage('user', inputMessage);
    setInputMessage('');
    
    // Mock AI response
    setTimeout(() => {
      addChatMessage('assistant', 'Cảm ơn bạn đã hỏi! Tôi sẽ giúp bạn cải thiện ký hiệu. Hãy thử giữ cổ tay thẳng và di chuyển tay một cách mượt mà hơn.');
    }, 1000);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Vui lòng đăng nhập để sử dụng tính năng luyện tập.</p>
      </div>
    );
  }

  return (
    <section className="section-outer section-white">
      <div className="container-1200">
      <h1 className="text-3xl font-bold text-primary mb-6">Luyện tập với AI</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Camera & Controls */}
        <div className="space-y-4">
          {/* Step 1: Mode Selection */}
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Chọn chế độ luyện tập</h2>
              <div className="space-y-4">
                <button
                  onClick={() => handleModeSelect('script')}
                  className="w-full p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-left"
                >
                  <div className="text-sm mb-2 font-semibold">Chế độ kịch bản</div>
                  <div className="font-bold text-lg mb-1">Luyện theo kịch bản</div>
                  <div className="text-sm opacity-90">Thực hiện các ký hiệu theo thứ tự đã định sẵn</div>
                </button>
                <button
                  onClick={() => handleModeSelect('free')}
                  className="w-full p-6 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all text-left"
                >
                  <div className="text-sm mb-2 font-semibold">Chế độ tự do</div>
                  <div className="font-bold text-lg mb-1">Luyện tự do</div>
                  <div className="text-sm opacity-90">Thực hiện bất kỳ ký hiệu nào, AI sẽ nhận diện liên tục</div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Topic Selection */}
          {step === 2 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Chọn chủ đề</h2>
              <div className="grid grid-cols-2 gap-4">
                {topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTopicSelect(t.id)}
                    className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 border-2 border-transparent hover:border-blue-500 transition-all"
                  >
                    {t.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="mt-4 text-gray-600 hover:text-primary"
              >
                ← Quay lại
              </button>
            </div>
          )}

          {/* Step 3: Practice */}
          {step === 3 && (
            <>
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => {
                    setStep(1);
                    setMode(null);
                    setTopic('');
                    setFeedback({ status: 'idle', message: '' });
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  ← Chọn lại
                </button>
                <div className="flex-1 text-center">
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                    {mode === 'script' ? 'Kịch bản' : 'Tự do'} - {topics.find(t => t.id === topic)?.name}
                  </span>
                </div>
              </div>

              <div className={`rounded-xl overflow-hidden border-4 ${
                feedback.status === 'ok' ? 'border-green-400' : 
                feedback.status === 'wrong' ? 'border-red-400' : 
                feedback.status === 'processing' ? 'border-yellow-400' :
                'border-gray-200'
              }`}>
                <video ref={videoRef} className="w-full bg-black aspect-video" muted playsInline />
              </div>

              <div className={`p-4 rounded-lg border-2 ${
                feedback.status === 'ok' ? 'bg-green-50 border-green-200' : 
                feedback.status === 'wrong' ? 'bg-red-50 border-red-200' : 
                feedback.status === 'processing' ? 'bg-yellow-50 border-yellow-200' :
                'bg-gray-50 border-gray-200'
              }`}>
                <div className="font-semibold mb-1">
                  {feedback.message || 'Chưa có phản hồi. Bắt đầu thực hiện ký hiệu...'}
                </div>
              </div>

              <label className="block p-4 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer text-center">
                <input type="file" accept="video/*" className="hidden" onChange={handleUploadVideo} />
                <div className="text-sm mb-2 font-semibold">Tải video</div>
                <div className="font-semibold">Tải video lên để phân tích</div>
                <div className="text-sm text-gray-500">Hoặc kéo thả file vào đây</div>
              </label>
            </>
          )}
        </div>

        {/* Right: Chatbot */}
        <div className="flex flex-col bg-white rounded-xl shadow-lg">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Chatbot hướng dẫn</h2>
            <p className="text-sm text-gray-600">AI sẽ đưa ra phản hồi chi tiết và gợi ý luyện tập</p>
          </div>
          
          <div className="flex-1 min-h-[400px] max-h-[600px] overflow-y-auto p-4 space-y-3 bg-gray-50">
            {chat.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>Chatbot sẽ hiển thị gợi ý và giải thích chi tiết tại đây.</p>
                <p className="text-sm mt-2">Chọn chế độ luyện tập để bắt đầu!</p>
              </div>
            ) : (
              <>
                {chat.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        m.role === 'assistant'
                          ? 'bg-blue-100 text-gray-900'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      <div className="text-sm">{m.text}</div>
                      <div className={`text-xs mt-1 ${
                        m.role === 'assistant' ? 'text-gray-600' : 'text-blue-100'
                      }`}>
                        {m.time}
                      </div>
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
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Nhập câu hỏi cho chatbot..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div> {/* THÊM DÒNG NÀY: Đóng <div className="grid ..."> */}
    </div> {/* THÊM DÒNG NÀY: Đóng <div className="container-1200"> */}
  </section>
);
}
