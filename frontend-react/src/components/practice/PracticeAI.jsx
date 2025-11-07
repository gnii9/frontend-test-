import { useState } from 'react';
import { Link } from 'react-router-dom';
import CameraView from './CameraView';
import { useProgress } from '../../context/ProgressContext';

const topics = ["Gia đình", "Số đếm", "Bảng chữ cái", "Cảm xúc", "Thực phẩm"];
const quizData = {
  "Gia đình": [
    { q: "Ký hiệu 'Mẹ' là gì?", options: ["Tay trái chạm má", "Tay phải chạm cằm"], correct: 0 },
  ],
};
const scriptData = {
  "Gia đình": [
    { bot: "Chào bạn! Hôm nay học về gia đình.", user: null },
    { bot: "Hãy làm ký hiệu 'Mẹ'", user: "Mẹ" },
  ],
};

export default function PracticeAI() {
  const [mode, setMode] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [messages, setMessages] = useState([]);
  const [quizStep, setQuizStep] = useState(0);
  const [scriptStep, setScriptStep] = useState(0);
  const [prediction, setPrediction] = useState('Đang chờ...');
  const [isScanning, setIsScanning] = useState(false);
  const { addProgress, updateMistakes } = useProgress();

  const startMode = (modeType) => {
    setMode(modeType);
    setMessages([{ sender: 'bot', text: `Bạn đã chọn: ${modeType}. Chọn chủ đề:` }]);
  };

  const selectTopic = (topic) => {
    setSelectedTopic(topic);
    setMessages((prev) => [...prev, { sender: 'user', text: topic }]);
    addProgress(topic, 0); // Start tracking progress
    if (mode === 'quiz') {
      const q = quizData[topic][0];
      setMessages((prev) => [...prev, { sender: 'bot', text: q.q }]);
    } else if (mode === 'script') {
      const step = scriptData[topic][0];
      setMessages((prev) => [...prev, { sender: 'bot', text: step.bot }]);
      if (step.user) setScriptStep(1);
    }
  };

  const answerQuiz = (idx) => {
    const q = quizData[selectedTopic][quizStep];
    const isCorrect = idx === q.correct;
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: q.options[idx] },
      { sender: 'bot', text: isCorrect ? "Đúng rồi!" : `Sai rồi! Đáp án đúng là: ${q.options[q.correct]}` },
    ]);
    if (!isCorrect) updateMistakes(selectedTopic, q.q);
    if (quizStep < quizData[selectedTopic].length - 1) {
      setQuizStep((prev) => prev + 1);
      setTimeout(() => {
        const nextQ = quizData[selectedTopic][quizStep + 1];
        setMessages((prev) => [...prev, { sender: 'bot', text: nextQ.q }]);
      }, 2000);
    }
  };

  const performSign = () => {
    setIsScanning(true);
    setPrediction('Đang nhận diện...');
    setTimeout(() => {
      const expected = scriptData[selectedTopic][scriptStep].user;
      const result = Math.random() > 0.3 ? expected : "Không nhận diện được";
      setPrediction(result);
      setIsScanning(false);
      if (result === expected) {
        setMessages((prev) => [...prev, { sender: 'bot', text: "Tuyệt vời! Bạn đã làm đúng!" }]);
        if (scriptStep < scriptData[selectedTopic].length - 1) {
          const next = scriptData[selectedTopic][scriptStep + 1];
          setScriptStep((prev) => prev + 1);
          setTimeout(() => {
            setMessages((prev) => [...prev, { sender: 'bot', text: next.bot }]);
            if (next.user) setPrediction('Đang chờ...');
          }, 1500);
        }
      } else {
        updateMistakes(selectedTopic, expected);
        setMessages((prev) => [...prev, { sender: 'bot', text: "Hãy thử lại nhé!" }]);
      }
    }, 2500);
  };

  const scanSign = () => {
    setIsScanning(true);
    setPrediction('Đang phân tích...');
    setTimeout(() => {
      const signs = ['Xin chào', 'Cảm ơn', 'Tạm biệt'];
      setPrediction(signs[Math.floor(Math.random() * signs.length)]);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="practice-container">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">Quay lại</Link>
      <h1 className="text-3xl font-bold text-center mb-8">Học với Chatbot AI</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <CameraView isActive={mode === 'camera' || (mode === 'script' && scriptData[selectedTopic]?.[scriptStep]?.user)} />
          {mode === 'camera' && (
            <button
              onClick={scanSign}
              disabled={isScanning}
              className="btn-practice mt-4 w-full"
            >
              {isScanning ? 'Đang nhận diện...' : 'Quét ký hiệu'}
            </button>
          )}
          {mode === 'script' && scriptData[selectedTopic]?.[scriptStep]?.user && (
            <button
              onClick={performSign}
              disabled={isScanning}
              className="btn-practice mt-4 w-full"
            >
              {isScanning ? 'Đang kiểm tra...' : `Làm ký hiệu: "${scriptData[selectedTopic][scriptStep].user}"`}
            </button>
          )}
          {(mode === 'camera' || mode === 'script') && (
            <div className="mt-4 p-4 bg-gray-100 rounded text-center">
              <p className="font-bold text-xl text-blue-600">{prediction}</p>
            </div>
          )}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col h-[500px]">
          <h2 className="text-2xl font-bold mb-4">Chatbot</h2>
          <div className="chat-container flex-1 mb-4">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {!mode ? (
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => startMode('camera')} className="btn-practice w-full">Luyện tập với Camera</button>
                <button onClick={() => startMode('quiz')} className="btn-practice w-full">Làm bài trắc nghiệm</button>
                <button onClick={() => startMode('script')} className="btn-practice w-full">Luyện kịch bản giao tiếp</button>
              </div>
            ) : !selectedTopic ? (
              <div className="grid grid-cols-2 gap-3">
                {topics.map((t) => (
                  <button key={t} onClick={() => selectTopic(t)} className="btn-practice">
                    {t}
                  </button>
                ))}
              </div>
            ) : mode === 'quiz' && quizData[selectedTopic]?.[quizStep] ? (
              <div className="grid grid-cols-2 gap-3">
                {quizData[selectedTopic][quizStep].options.map((opt, i) => (
                  <button key={i} onClick={() => answerQuiz(i)} className="btn-practice">
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}