import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-4 py-2 border-b relative">
      {/* 로고 */}
      <img src="/logo.png" alt="로고" className="h-8" />

      {/* 햄버거 버튼 */}
      <button
        onClick={() => setOpen(!open)}
        className="text-2xl focus:outline-none"
      >
        ☰
      </button>

      {/* 메뉴 */}
      {open && (
        <div className="absolute top-16 right-4 bg-white border rounded shadow p-2 w-40 z-50">
          <Link to="/product/a" className="block py-2 px-3 hover:bg-gray-100">NC-UVA3 Max</Link>
          <Link to="/product/b" className="block py-2 px-3 hover:bg-gray-100">test2</Link>
          <Link to="/product/c" className="block py-2 px-3 hover:bg-gray-100">test3</Link>
          {/* 필요 시 더 추가 */}
        </div>
      )}
    </header>
  );
}
