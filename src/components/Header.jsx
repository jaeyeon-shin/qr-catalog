import { useEffect, useRef, useState } from "react";
import { MdMenu } from "react-icons/md";

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  // 바깥 클릭/ESC 닫기
  useEffect(() => {
    function onClickOutside(e) {
      if (!open) return;
      const panel = panelRef.current;
      const btn = btnRef.current;
      if (panel && !panel.contains(e.target) && btn && !btn.contains(e.target)) {
        setOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="mx-auto max-w-md px-3 h-14 flex items-center justify-between">
        {/* 로고(높이 축소) */}
        <a href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="CM TECH" className="h-8 w-auto" />
        </a>

        {/* 햄버거 버튼: 다시 눌러도 닫히는 토글 */}
        <button
          ref={btnRef}
          aria-label="메뉴"
          className="p-2 rounded-md hover:bg-gray-100 active:scale-[0.98]"
          onClick={() => setOpen((v) => !v)}
        >
          <MdMenu className="text-2xl" />
        </button>
      </div>

      {/* 드롭다운 패널 */}
      {open && (
        <>
          {/* 반투명 오버레이: 바깥 클릭 닫힘 */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            ref={panelRef}
            className="absolute right-3 top-14 z-50 w-56 rounded-xl border bg-white shadow-lg overflow-hidden"
          >
            <nav className="py-1">
              <a
                href="https://nocai.co.kr/"
                target="_blank"
                rel="noopener"
                className="block px-4 py-3 text-sm hover:bg-gray-50"
              >
                홈페이지
              </a>
              <a
                href="https://nocai.co.kr/board/contact/list.html"
                target="_blank"
                rel="noopener"
                className="block px-4 py-3 text-sm hover:bg-gray-50"
              >
                상담하기
              </a>
              <a
                href="/products"
                className="block px-4 py-3 text-sm hover:bg-gray-50"
              >
                전체 제품 보기
              </a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
