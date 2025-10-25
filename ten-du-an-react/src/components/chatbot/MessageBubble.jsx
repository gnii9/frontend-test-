export default function MessageBubble({ message, isBot }) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isBot ? 'bg-gray-200 text-gray-800' : 'bg-primary text-white'
        }`}
      >
        {message}
      </div>
    </div>
  );
}