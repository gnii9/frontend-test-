export default function GoogleLoginButton() {
  return (
    <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg hover:bg-gray-50">
      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
      <span>Đăng nhập bằng Google</span>
    </button>
  );
}