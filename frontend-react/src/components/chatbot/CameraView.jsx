// src/components/chatbot/CameraView.jsx
import React from 'react';
import { useEffect, useRef } from 'react';

export default function CameraView() {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Lỗi truy cập camera:', err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="mb-4">
      <video ref={videoRef} autoPlay className="w-full rounded-lg" />
    </div>
  );
}