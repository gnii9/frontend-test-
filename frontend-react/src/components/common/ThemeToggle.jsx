// src/components/common/ThemeToggle.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import './common.css';


export default function ThemeToggle() {
  // theme: 'light' | 'dark' | 'auto'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (mode) => {
      root.classList.remove('dark');
      if (mode === 'dark') root.classList.add('dark');
      if (mode === 'auto') {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) root.classList.add('dark');
      }
    };
    applyTheme(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'auto' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme('auto');
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [theme]);

  const cycleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : prev === 'dark' ? 'auto' : 'light'));
  };

  return (
    <button onClick={cycleTheme} className="theme-toggle">
      {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'Auto'}
    </button>
  );
}