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
    <>
      {/* 바깥 영역 클릭용 오버레이 (드롭 열렸을 때만 표시) */}
      {open && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <img src="/logo.png" alt="CMTECH" className="h-6 w-auto" />
          </Link>

          {/* 햄버거: 재클릭 토글 */}
          <button
            ref={btnRef}
            onClick={() => setOpen(v => !v)}
            className="p-2 rounded-lg active:scale-95"
            aria-label="메뉴"
            aria-expanded={open ? 'true' : 'false'}
          >
            <MdMenu className="text-2xl" />
          </button>
        </div>

        {/* 드롭다운 메뉴: 세로 1열 리스트 */}
        {open && (
          <div ref={menuRef} className="max-w-md mx-auto px-3 pb-2">
            <nav className="bg-white">
              <ul className="flex flex-col text-sm divide-y border rounded-md overflow-hidden">
                <li>
                  <Link to="/product/9060_visual" onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50">
                    NC-UV9060 Visual
                  </Link>
                </li>
                <li>
                  <Link to="/product/0609_max2" onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50">
                    NC-UV0609 Max2
                  </Link>
                </li>
                <li>
                  <Link to="/product/0609_pe3s" onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50">
                    NC-UV0609 PE3S
                  </Link>
                </li>
                <li>
                  <Link to="/product/a3max" onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50">
                    NC-UVA3 Max
                  </Link>
                </li>
                <li>
                  <Link to="/product/1010_visual" onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50">
                    DL-1010 Visual
                  </Link>
                </li>
                <li>
                  <Link to="/product/1810" onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50">
                    DL-1810
                  </Link>
                </li>
                <li>
                  <Link to="/product/2513" onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50">
                    DL-2513
                  </Link>
                </li>
                <li>
                  <Link to="/product/dtf30" onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50">
                    NC-UVDTF30
                  </Link>
                </li>
                <li>
                  <Link to="/product/dtf60" onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50">
                    NC-UVDTF60
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
