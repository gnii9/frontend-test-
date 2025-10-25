import { useState } from 'react';
import CameraView from '../components/chatbot/CameraView';
import { Link } from 'react-router-dom';

const topics = ["Gia đình", "Số đếm", "Bảng chữ cái", "Cảm xúc", "Thực phẩm"];

const quizData = {
  "Gia đình": [
    { q: "Ký hiệu 'Mẹ' là gì?", options: ["Tay trái chạm má", "Tay phải chạm cằm", "Hai tay đan vào nhau", "Vẫy tay"], correct: 0 },
    { q: "Ký hiệu 'Bố' là gì?", options: ["Tay chạm cằm", "Tay chạm trán", "Tay chạm ngực", "Tay vẫy"], correct: 1 },
  ],
  "Số đếm": [
    { q: "Số 1 là?", options: ["Ngón trỏ", "Ngón giữa", "Ngón cái", "Ngón út"], correct: 0 },
  ]
};

const scriptData = {
  "Gia đình": [
    { bot: "Chào bạn! Hôm nay chúng ta học về gia đình.", user: null },
    { bot: "Hãy làm ký hiệu: 'Mẹ'", user: "Mẹ" },
    { bot: "Tuyệt vời! Bây giờ hãy làm: 'Bố'", user: "Bố" },
    { bot: "Giỏi lắm! Bạn đã hoàn thành kịch bản.", user: null },
  ]
};

export default function LearningChatPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [mode, setMode] = useState(null); // 'camera', 'quiz', 'script'
  const [messages, setMessages] = useState([]);
  const [quizStep, setQuizStep] = useState(0);
  const [scriptStep, setScriptStep] = useState(0);
  const [prediction, setPrediction] = useState('Đang chờ...');
  const [isScanning, setIsScanning] = useState(false);

  // Bắt đầu chủ đề
  const startTopic = (topic) => {
    setSelectedTopic(topic);
    setMode(null);
    setMessages([
      { sender: 'bot', text: `Bạn đã chọn chủ đề: "${topic}".` },
      { sender: 'bot', text: `Bạn đã sẵn sàng học chủ đề '${topic}' chưa? Hãy chọn một hoạt động:` },
    ]);
  };

  // Chọn hoạt động
  const selectActivity = (activity) => {
    setMode(activity);
    const activityText = {
      camera: "Luyện tập với Camera",
      quiz: "Làm bài trắc nghiệm",
      script: "Luyện kịch bản giao tiếp"
    };
    setMessages(prev => [...prev, { sender: 'user', text: activityText[activity] }]);

    if (activity === 'camera') {
      setMessages(prev => [...prev, { sender: 'bot', text: "Hãy làm một ký hiệu bất kỳ. Camera sẽ nhận diện!" }]);
    } else if (activity === 'quiz') {
      const q = quizData[selectedTopic][0];
      setMessages(prev => [...prev, { sender: 'bot', text: q.q }]);
    } else if (activity === 'script') {
      const step = scriptData[selectedTopic][0];
      setMessages(prev => [...prev, { sender: 'bot', text: step.bot }]);
      if (step.user) setScriptStep(1);
    }
  };

  // Xử lý quiz
  const answerQuiz = (idx) => {
    const q = quizData[selectedTopic][quizStep];
    const isCorrect = idx === q.correct;
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: q.options[idx] },
      { sender: 'bot', text: isCorrect ? "Đúng rồi!" : `Sai rồi! Đáp án đúng là: ${q.options[q.correct]}` }
    ]);

    if (quizStep < quizData[selectedTopic].length - 1) {
      setQuizStep(prev => prev + 1);
      setTimeout(() => {
        const nextQ = quizData[selectedTopic][quizStep + 1];
        setMessages(prev => [...prev, { sender: 'bot', text: nextQ.q }]);
      }, 2000);
    } else {
      setMessages(prev => [...prev, { sender: 'bot', text: "Hoàn thành bài trắc nghiệm!" }]);
    }
  };

  // Xử lý kịch bản
  const performSign = () => {
    setIsScanning(true);
    setPrediction('Đang nhận diện...');
    setTimeout(() => {
      const expected = scriptData[selectedTopic][scriptStep].user;
      const result = Math.random() > 0.3 ? expected : "Không nhận diện được";
      setPrediction(result);
      setIsScanning(false);

      if (result === expected) {
        setMessages(prev => [...prev, { sender: 'bot', text: "Tuyệt vời! Bạn đã làm đúng!" }]);
        if (scriptStep < scriptData[selectedTopic].length - 1) {
          const next = scriptData[selectedTopic][scriptStep + 1];
          setScriptStep(prev => prev + 1);
          setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'bot', text: next.bot }]);
            if (next.user) setPrediction('Đang chờ...');
          }, 1500);
        } else {
          setMessages(prev => [...prev, { sender: 'bot', text: "Chúc mừng! Bạn đã hoàn thành kịch bản." }]);
        }
      } else {
        setMessages(prev => [...prev, { sender: 'bot', text: "Hãy thử lại nhé!" }]);
      }
    }, 2500);
  };

  // Nhận diện camera tự do
  const scanSign = () => {
    setIsScanning(true);
    setPrediction('Đang phân tích...');
    setTimeout(() => {
      const signs = ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Mẹ', 'Bố'];
      setPrediction(signs[Math.floor(Math.random() * signs.length)]);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-6">
        <Link to="/" className="text-primary hover:underline mb-6 inline-block">← Quay lại</Link>
        <h1 className="text-4xl font-bold text-center text-primary mb-8">Học với Chatbot AI</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* CAMERA - TRÁI */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-secondary mb-4">Camera</h2>
            <CameraView />
            {mode === 'camera' && (
              <button
                onClick={scanSign}
                disabled={isScanning}
                className={`mt-4 w-full py-3 rounded-full font-bold transition ${isScanning ? 'bg-gray-400' : 'bg-primary hover:bg-blue-700'} text-white`}
              >
                {isScanning ? 'Đang nhận diện...' : 'Quét ký hiệu'}
              </button>
            )}
            {mode === 'script' && scriptData[selectedTopic][scriptStep]?.user && (
              <button
                onClick={performSign}
                disabled={isScanning}
                className={`mt-4 w-full py-3 rounded-full font-bold transition ${isScanning ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white`}
              >
                {isScanning ? 'Đang kiểm tra...' : `Làm ký hiệu: "${scriptData[selectedTopic][scriptStep].user}"`}
              </button>
            )}
            {(mode === 'camera' || mode === 'script') && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl text-center">
                <p className="font-bold text-xl text-primary">{prediction}</p>
              </div>
            )}
          </div>

          {/* CHATBOT - PHẢI */}
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col h-96 lg:h-full">
            <h2 className="text-2xl font-bold text-secondary mb-4">Chatbot</h2>
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-4 bg-gray-50 rounded-xl">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* NÚT QUICK REPLY */}
            <div className="space-y-3">
              {!selectedTopic ? (
                <div className="grid grid-cols-2 gap-3">
                  {topics.map(t => (
                    <button key={t} onClick={() => startTopic(t)} className="py-3 bg-blue-100 hover:bg-blue-200 rounded-xl font-medium transition">
                      {t}
                    </button>
                  ))}
                </div>
              ) : !mode ? (
                <div className="grid grid-cols-1 gap-3">
                  <button onClick={() => selectActivity('camera')} className="py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                    Luyện tập với Camera
                  </button>
                  <button onClick={() => selectActivity('quiz')} className="py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                    Làm bài trắc nghiệm
                  </button>
                  <button onClick={() => selectActivity('script')} className="py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                    Luyện kịch bản giao tiếp
                  </button>
                </div>
              ) : mode === 'quiz' && quizStep < quizData[selectedTopic].length ? (
                <div className="grid grid-cols-2 gap-3">
                  {quizData[selectedTopic][quizStep].options.map((opt, i) => (
                    <button key={i} onClick={() => answerQuiz(i)} className="py-3 bg-blue-100 hover:bg-blue-200 rounded-xl font-medium">
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}