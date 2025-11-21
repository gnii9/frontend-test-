import React, { useEffect, useRef } from "react";

export default function CameraView() {
  const videoRef = useRef(null);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Lỗi truy cập camera:", err);
      }
    };

    startCamera();

    return () => stopCamera();
  }, []);

  // Nghe event từ trang → tắt camera
  useEffect(() => {
    window.addEventListener("force-stop-camera", stopCamera);
    return () => window.removeEventListener("force-stop-camera", stopCamera);
  }, []);

  return (
    <div className="mb-4">
      <video ref={videoRef} autoPlay className="w-full rounded-lg" />
    </div>
  );
}
