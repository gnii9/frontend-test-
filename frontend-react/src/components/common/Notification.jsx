import { useState, useEffect } from 'react';

export default function Notification({ message, type = 'success', duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white animate-pulse ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      <p>{message}</p>
    </div>
  );
}