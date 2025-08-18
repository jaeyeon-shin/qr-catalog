import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { MdMenu } from 'react-icons/md';

export default function Header() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // 바깥 클릭 시 닫힘
  useEffect(() => {
    function handleClickOutside(e) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* 로고 경로/크기는 프로젝트에 맞춰 조정 */}
          <img src="/logo.png" alt="CMTECH" className="h-6 w-auto" />
        </Link>

        {/* 햄버거: 재클릭 토글 */}
        <button
          ref={btnRef}
          onClick={() => setOpen((v) => !v)}
          className="p-2 rounded-lg active:scale-95"
          aria-label="메뉴"
          aria-expanded={open ? 'true' : 'false'}
        >
          <MdMenu className="text-2xl" />
        </button>
      </div>

      {/* 드롭다운 메뉴 (원래 쓰던 메뉴 내용 넣어 사용) */}
      {open && (
        <div ref={menuRef} className="max-w-md mx-auto px-3 pb-3">
          <nav className="rounded-xl border bg-white shadow p-2">
            {/* 예시: 필요에 맞게 교체 */}
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li><Link to="/product/9060_visual" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-gray-50">NC-UV9060 Visual</Link></li>
              <li><Link to="/product/0609_max2" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-gray-50">NC-UV0609 Max2</Link></li>
              <li><Link to="/product/0609_pe3s" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-gray-50">NC-UV0609 PE3S</Link></li>
              <li><Link to="/product/a3max" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-gray-50">NC-UVA3 Max</Link></li>
              <li><Link to="/product/1010_visual" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-gray-50">DL-1010 Visual</Link></li>
              <li><Link to="/product/1810" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-gray-50">DL-1810</Link></li>
              <li><Link to="/product/2513" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-gray-50">DL-2513</Link></li>
              <li><Link to="/product/dtf30" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-gray-50">NC-UVDTF30</Link></li>
              <li><Link to="/product/dtf60" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-gray-50">NC-UVDTF60</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
