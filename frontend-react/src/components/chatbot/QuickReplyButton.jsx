export default function QuickReplyButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="m-1 px-4 py-2 bg-primary text-white rounded-full hover:bg-blue-700 transition"
    >
      {text}
    </button>
  );
}