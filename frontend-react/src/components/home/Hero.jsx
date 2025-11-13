import React from 'react';
import '../home/home.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold mb-6">Silent Speak</h1>
        <p className="text-xl mb-8">Khám phá và học ngôn ngữ ký hiệu để kết nối với cộng đồng khiếm thính.</p>
        <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Bắt đầu học
        </a>
      </div>
    </section>
  );
}