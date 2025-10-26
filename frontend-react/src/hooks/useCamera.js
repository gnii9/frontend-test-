import { useEffect, useRef, useState } from 'react';

export function useCamera() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(s => {
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(err => setError(err.message));
  }, []);

  const stop = () => {
    if (stream) stream.getTracks().forEach(track => track.stop());
  };

  return { videoRef, error, stop };
}