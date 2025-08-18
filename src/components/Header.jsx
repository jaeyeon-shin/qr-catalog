import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { MdMenu } from 'react-icons/md';

export default function Header() {
  const [open, setOpen] = useState(false);  // ✅ 드롭 메뉴 열림/닫힘 상태
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // ✅ 바깥 클릭 시 닫기(오버레이/문서 클릭 감지)
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
      {/* ✅ 투명 오버레이: 메뉴 열렸을 때만 표시
          - 화면 아무 곳이나 클릭 시 닫힘.
          - 시각적 요소 없음(투명) */}
      {open && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ✅ 상단 헤더바
          - sticky top-0: 스크롤해도 고정
          - bg-white/90 + backdrop-blur: 내용 비치면서 흐림 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        {/* 컨텐츠 행: 좌측 로고, 우측 햄버거 */}
        <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-between">
          {/* 로고 클릭 시 메뉴 닫고 홈으로 */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            {/* 로고 크기 조절: h-6 → h-5/h-7 등으로 변경 가능 */}
            <img src="/logo.png" alt="CMTECH" className="h-6 w-auto" />
          </Link>

          {/* 🔽 햄버거와 드롭메뉴를 한 묶음으로(상대위치) → 메뉴를 버튼 바로 아래 띄움 */}
          <div className="relative">
            {/* ✅ 햄버거 버튼: 재클릭 토글 (열림/닫힘) */}
            <button
              ref={btnRef}
              onClick={() => setOpen(v => !v)}
              className="p-2 rounded-lg active:scale-95"
              aria-label="메뉴"
              aria-expanded={open ? 'true' : 'false'}
            >
              {/* 아이콘 크기: text-2xl → text-xl 등으로 조정 가능 */}
              <MdMenu className="text-2xl" />
            </button>

            {/* ✅ 떠 있는 드롭다운 메뉴
                - absolute right-0 top-full mt-1: 아이콘 바로 아래에 우측정렬로 표시
                - 폭: w-max + whitespace-nowrap → 글자 길이만큼만(너무 넓지 않게)
                - 항목 글자 굵기: font-medium
                - 항목 여백: px-3 py-2 (줄이려면 px-2.5 py-1.5)
            */}
            {open && (
              <div
                ref={menuRef}
                className="absolute right-0 top-full mt-1 z-50"
              >
                <nav className="rounded-md border bg-white shadow-lg p-1">
                  <ul className="flex flex-col text-sm w-max max-w-[92vw]">
                    <li>
                      <Link
                        to="/product/9060_visual"
                        onClick={() => setOpen(false)} // 클릭 시 닫기
                        className="block px-3 py-2 hover:bg-gray-50 whitespace-nowrap font-medium"
                      >
                        NC-UV9060 Visual
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/product/0609_max2"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 hover:bg-gray-50 whitespace-nowrap font-medium"
                      >
                        NC-UV0609 Max2
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/product/0609_pe3s"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 hover:bg-gray-50 whitespace-nowrap font-medium"
                      >
                        NC-UV0609 PE3S
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/product/a3max"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 hover:bg-gray-50 whitespace-nowrap font-medium"
                      >
                        NC-UVA3 Max
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/product/1010_visual"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 hover:bg-gray-50 whitespace-nowrap font-medium"
                      >
                        DL-1010 Visual
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/product/1810"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 hover:bg-gray-50 whitespace-nowrap font-medium"
                      >
                        DL-1810
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/product/2513"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 hover:bg-gray-50 whitespace-nowrap font-medium"
                      >
                        DL-2513
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/product/dtf30"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 hover:bg-gray-50 whitespace-nowrap font-medium"
                      >
                        NC-UVDTF30
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/product/dtf60"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 hover:bg-gray-50 whitespace-nowrap font-medium"
                      >
                        NC-UVDTF60
                      </Link>
                    </li>
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
