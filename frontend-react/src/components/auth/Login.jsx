import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
  onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
        required
      />
      <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg">
        Đăng nhập
      </button>
    </form>
  );
}