import CameraView from '../chatbot/CameraView';
import { useState } from 'react';

export default function PracticeAI() {
  const [prediction, setPrediction] = useState('Đang chờ cử chỉ...');
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setPrediction('Đang phân tích...');
    setTimeout(() => {
      const signs = ['Xin chào', 'Cảm ơn', 'Tạm biệt'];
      setPrediction(signs[Math.floor(Math.random() * signs.length)]);
      setIsScanning(false);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-4">Camera AI</h3>
          <CameraView />
          <button
            onClick={startScan}
            disabled={isScanning}
            className={`mt-4 w-full py-3 rounded-full font-semibold transition ${
              isScanning ? 'bg-gray-400 text-white' : 'bg-primary text-white hover:bg-blue-700'
            }`}
          >
            {isScanning ? 'Đang nhận diện...' : 'Bắt đầu quét ký hiệu'}
          </button>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-secondary mb-4">Kết quả</h3>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
            <p className="text-3xl font-bold text-primary">{prediction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}