import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { MdMenu } from 'react-icons/md';

export default function Header() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

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
      {open && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="mx-auto w-[90%] max-w-md lg:max-w-2xl px-5 py-1 flex items-center justify-between min-h-[40px]">
          
          {/* ✅ 로고 → 공식 홈페이지 링크 */}
          <a
            href="https://nocai.co.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <img src="/logo.png" alt="CMTECH" className="h-6 w-auto ml-1.5" />
          </a>

          <div className="relative">
            <button
              ref={btnRef}
              onClick={() => setOpen(v => !v)}
              className="p-2 rounded-lg active:scale-95"
              aria-label="메뉴"
              aria-expanded={open ? 'true' : 'false'}
            >
              <MdMenu className="text-2xl" />
            </button>

            {open && (
              <div ref={menuRef} className="absolute right-1 top-full mt-1 z-50">
                <nav className="rounded-md border border-gray-200 bg-white shadow-md p-1">
                  <ul className="flex flex-col text-sm w-max max-w-[92vw] font-medium">
                    <li><Link to="/product/9060_visual"  onClick={() => setOpen(false)} className="block px-3 py-1.5 hover:bg-gray-50">NC-UV9060 Visual</Link></li> 
                    <li><Link to="/product/0609_max2"    onClick={() => setOpen(false)} className="block px-3 py-1.5 hover:bg-gray-50">NC-UV0609 Max2</Link></li>
                    <li><Link to="/product/0609_pe3s"    onClick={() => setOpen(false)} className="block px-3 py-1.5 hover:bg-gray-50">NC-UV0609 PE3S</Link></li>
                    <li><Link to="/product/a3max"        onClick={() => setOpen(false)} className="block px-3 py-1.5 hover:bg-gray-50">NC-UVA3 Max</Link></li>
                    <li><Link to="/product/dtf30"        onClick={() => setOpen(false)} className="block px-3 py-1.5 hover:bg-gray-50">NC-UVDTF30</Link></li>
                    <li><Link to="/product/dtf60"        onClick={() => setOpen(false)} className="block px-3 py-1.5 hover:bg-gray-50">NC-UVDTF60</Link></li>
                    <li><Link to="/product/1010_visual"  onClick={() => setOpen(false)} className="block px-3 py-1.5 hover:bg-gray-50">DL-1010 Visual</Link></li>
                    <li><Link to="/product/1810"         onClick={() => setOpen(false)} className="block px-3 py-1.5 hover:bg-gray-50">DL-1810</Link></li>
                    <li><Link to="/product/2513"         onClick={() => setOpen(false)} className="block px-3 py-1.5 hover:bg-gray-50">DL-2513</Link></li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
