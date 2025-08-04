import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div
          ref={menuRef}
          className="absolute top-16 right-4 bg-white border rounded shadow p-2 w-52 z-50 text-sm"
        >
          <Link to="/product/a" className="block py-2 px-3 hover:bg-gray-100">NC-UV9060 Visual</Link>
          <Link to="/product/b" className="block py-2 px-3 hover:bg-gray-100">NC-UV0609 Max2</Link>
          <Link to="/product/c" className="block py-2 px-3 hover:bg-gray-100">NC-UV0609 PE3S</Link>
          <Link to="/product/a" className="block py-2 px-3 hover:bg-gray-100">NC-UVA3 Max</Link>
          <Link to="/product/b" className="block py-2 px-3 hover:bg-gray-100">NC-UVDTF30</Link>
          <Link to="/product/c" className="block py-2 px-3 hover:bg-gray-100">NC-UVDTF60</Link>
          <Link to="/product/a" className="block py-2 px-3 hover:bg-gray-100">DL-1010 Visual</Link>
          <Link to="/product/b" className="block py-2 px-3 hover:bg-gray-100">DL-1810</Link>
          <Link to="/product/c" className="block py-2 px-3 hover:bg-gray-100">DL-2513</Link>

        </div>
      )}
    </header>
  );
}
