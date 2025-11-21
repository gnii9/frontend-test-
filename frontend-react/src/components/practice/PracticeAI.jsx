import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CameraView from "./CameraView";

export default function PracticeAI() {
  const [topics, setTopics] = useState([]);            // 🔥 Lấy topic từ API
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [messages, setMessages] = useState([]);
  const [prediction, setPrediction] = useState("...");
  const [isScanning, setIsScanning] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(true);

  // --- Lấy chủ đề từ API ---
    useEffect(() => {
        async function loadTopics() {
            const res = await fetch("http://localhost:8000/api/practice/topics/");
            const data = await res.json();
            setTopics(data); // backend trả ARRAY
        }
        loadTopics();
    }, []);

  // --- Chọn chủ đề ---
  const selectTopic = (topic) => {
    setSelectedTopic(topic);

    setMessages([
      { 
        sender: "bot", 
        text: `👍 Bạn đã chọn chủ đề **${topic.name}**.\nHãy đưa tay vào camera và thực hiện ký hiệu nhé!`
      }
    ]);
  };

  // --- Fake AI nhận diện ---
  const scanSign = () => {
    setIsScanning(true);
    setPrediction("Đang nhận diện...");

    // Tạm fake thuật toán AI
    setTimeout(() => {
      const fakeSigns = ["Xin chào", "Cảm ơn", "Mẹ", "Ba", "Tạm biệt"];
      const result = fakeSigns[Math.floor(Math.random() * fakeSigns.length)];

      setPrediction(result);

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: `🤖 Mình nhận diện được ký hiệu: **${result}**` }
      ]);

      setIsScanning(false);
    }, 1800);
  };

  return (
    <div className="practice-container">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ⬅ Quay lại
      </Link>

      <h1 className="text-3xl font-bold text-center mb-8">
        Học Ngôn Ngữ Ký Hiệu với AI
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Camera */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <CameraView isActive={true} />

          {selectedTopic && (
            <button
              onClick={scanSign}
              disabled={isScanning}
              className="btn-practice mt-4 w-full"
            >
              {isScanning ? "Đang nhận diện..." : "Quét ký hiệu"}
            </button>
          )}

          {selectedTopic && (
            <div className="mt-4 p-4 bg-gray-100 rounded text-center">
              <p className="font-bold text-xl text-blue-600">{prediction}</p>
            </div>
          )}
        </div>

        {/* Chatbot */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col h-[500px]">
          <h2 className="text-2xl font-bold mb-4">Chatbot hỗ trợ</h2>

          <div className="chat-container flex-1 mb-4 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
          </div>

          {/* Topic selection */}
          {!selectedTopic && (
            <>
              {loadingTopics && <p>Đang tải danh sách chủ đề...</p>}
              
              {!loadingTopics && (
                <div className="grid grid-cols-2 gap-3">
                  {topics.map((t) => (
                    <button 
                      key={t.id} 
                      onClick={() => selectTopic(t)} 
                      className="btn-practice"
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
