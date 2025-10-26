import { useEffect, useRef } from 'react';

export default function CameraView() {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => console.error("Camera error"));
  }, []);

  return (
    <div className="relative bg-black rounded-xl overflow-hidden">
      <video ref={videoRef} autoPlay muted playsInline className="w-full h-64 object-cover" />
      <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-primary animate-pulse">
        Camera hoạt động
      </div>
    </div>
  );
}