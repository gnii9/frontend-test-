// src/components/common/ThemeToggle.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import './common.css';


export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}