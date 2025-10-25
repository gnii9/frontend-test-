import { useState } from 'react';
import MessageBubble from './MessageBubble';
import QuickReplyButton from './QuickReplyButton';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Chào bạn! Bạn muốn học chủ đề nào?", isBot: true }
  ]);

  const handleQuickReply = (text) => {
    setMessages([...messages, { text, isBot: false }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: `Bạn đã chọn: ${text}`, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 h-96 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg.text} isBot={msg.isBot} />
        ))}
      </div>
      <div className="flex flex-wrap justify-center">
        <QuickReplyButton text="Bảng chữ cái" onClick={() => handleQuickReply("Bảng chữ cái")} />
        <QuickReplyButton text="Số đếm" onClick={() => handleQuickReply("Số đếm")} />
        <QuickReplyButton text="Gia đình" onClick={() => handleQuickReply("Gia đình")} />
      </div>
    </div>
  );
}