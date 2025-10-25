export default function ProfileCard({ user }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <img src="https://via.placeholder.com/100" alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
      <h3 className="text-xl font-bold">{user?.name || 'Người dùng'}</h3>
      <p className="text-gray-600">{user?.email || 'email@example.com'}</p>
    </div>
  );
}