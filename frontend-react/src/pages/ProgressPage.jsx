// src/pages/ProgressPage.jsx
import React, { useMemo } from 'react';

export default function ProgressPage() {
  // Demo: số lần sai theo topic
  const wrongByTopic = { greetings: 4, family: 1, school: 6 };
  const reminders = useMemo(
    () => Object.entries(wrongByTopic)
      .filter(([_, count]) => count >= 3)
      .map(([topic]) => topic),
    []
  );

  // Demo data biểu đồ
  const weekly = [2, 3, 1, 4, 0, 5, 2];

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">Tiến độ học tập</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Nhắc nhở ôn tập</h2>
        {reminders.length ? (
          <ul className="list-disc pl-6">
            {reminders.map((t) => <li key={t}>Cần ôn tập chủ đề: {t}</li>)}
          </ul>
        ) : (
          <p>Không có chủ đề cần ôn tập.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Thống kê tuần</h2>
        <div className="grid grid-cols-7 gap-2">
          {weekly.map((v, i) => (
            <div key={i} className="h-24 bg-blue-100 relative rounded">
              <div className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded" style={{ height: `${v * 15}px` }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
