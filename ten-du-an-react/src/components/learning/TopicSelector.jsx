export default function TopicSelector({ onSelect }) {
  const topics = ['Bảng chữ cái', 'Số đếm', 'Gia đình', 'Chào hỏi'];

  return (
    <div className="grid grid-cols-2 gap-4">
      {topics.map(topic => (
        <button
          key={topic}
          onClick={() => onSelect(topic)}
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition text-lg font-semibold"
        >
          {topic}
        </button>
      ))}
    </div>
  );
}