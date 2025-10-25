export default function GoalCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h4 className="font-semibold mb-2">Mục tiêu hôm nay</h4>
      <p className="text-2xl font-bold text-primary">10 ký hiệu</p>
      <div className="mt-4 bg-gray-200 h-3 rounded-full overflow-hidden">
        <div className="bg-primary h-full w-7/10"></div>
      </div>
    </div>
  );
}