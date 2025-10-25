import { useState } from 'react';

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Họ tên"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-3 border rounded-lg"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full px-4 py-3 border rounded-lg"
        required
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full px-4 py-3 border rounded-lg"
        required
      />
      <button type="submit" className="w-full btn-primary">Đăng ký</button>
    </form>
  );
}