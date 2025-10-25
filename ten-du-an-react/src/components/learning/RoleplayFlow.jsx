import { useState } from 'react';
import CameraView from '../chatbot/CameraView';

const script = [
  { speaker: 'Bot', line: "Chào bạn! Bạn tên là gì?" },
  { speaker: 'User', line: "[Tên của bạn]" },
  { speaker: 'Bot', line: "Rất vui được gặp bạn!" },
  { speaker: 'User', line: "[Rất vui được gặp bạn!]" }
];

export default function RoleplayFlow() {
  const [turn, setTurn] = useState(0);
  const current = script[turn];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">Kịch bản giao tiếp</h3>
        <div className="space-y-4">
          {script.slice(0, turn + 1).map((line, i) => (
            <p key={i} className={line.speaker === 'Bot' ? 'text-gray-700' : 'text-primary font-semibold'}>
              <strong>{line.speaker}:</strong> {line.line}
            </p>
          ))}
        </div>
        {current.speaker === 'User' && (
          <p className="mt-4 text-lg font-bold text-primary">Hãy làm ký hiệu: {current.line}</p>
        )}
        <button
          onClick={() => setTurn(turn + 1)}
          className="mt-6 btn-primary"
          disabled={turn >= script.length - 1}
        >
          Tiếp theo
        </button>
      </div>
      <div>
        <CameraView />
      </div>
    </div>
  );
}