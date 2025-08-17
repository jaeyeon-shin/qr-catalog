import { useParams } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MdChat, MdHome, MdDownload } from 'react-icons/md';

/**
 * 전 제품 공통: 4개 탭(전면/측면/스펙/특장점)
 * - 전면/측면: 정방형 이미지(카드 테두리/섀도우 적용)
 * - 스펙: 표, 특장점: 리스트 (이미지 무시)
 * - 네 탭 모두 동일한 정방형 카드 높이 유지 (내부 스크롤)
 */
const productData = {
  "9060_visual": {
    name: 'NC-UV9060 Visual',
    imageInfos: [
      { src: '/9060_front.webp', title: '전면' },
      { src: '/9060_side.webp',  title: '측면' },
      { src: '/product-a-3.JPG', title: '스펙' },      // 있어도 사용하지 않음
      { src: '/product-a-4.JPG', title: '특장점' },    // 있어도 사용하지 않음
    ],
    pdf: '/9060visual_catalog.pdf',
    specs: [
      { label: '인쇄 영역', value: '900 x 600 mm' },
      { label: '최대 두께', value: '100 mm' },
      { label: '잉크 타입', value: 'UV LED' },
      { label: '컬러 구성', value: 'CMYK + White + Varnish' },
      { label: '헤드 구성', value: 'EPSON i3200-U1 (x2)' },
      { label: '해상도', value: '최대 1440 dpi' },
      { label: '인터페이스', value: 'USB 3.0 / Ethernet' },
      { label: '전원', value: 'AC 220V, 50/60Hz' },
    ],
    features: [
      '화이트/바니시 동시 출력로 생산성 향상',
      '미세 높이 보정 자동화로 소재 두께 편차 대응',
      '정밀 밸류 체킹으로 잉크 클리닝 최소화',
      '고강성 프레임으로 장시간 안정 운용',
    ],
  },
  "0609_max2": {
    name: 'NC-UV0609 Max2',
    images: ['/product-b-1.jpg'],
    pdf: '/max2_catalog.pdf',
    specs: [
      { label: '인쇄 영역', value: '600 x 900 mm' },
      { label: '잉크 타입', value: 'UV LED' },
    ],
    features: [
      '컴팩트한 바디에 고출력',
      '초보자도 쉬운 유지보수',
    ],
  },
  "0609_pe3s": {
    name: 'NC-UV0609 PE3S',
    images: ['/product-c-1.jpg', '/product-c-2.png', '/product-c-3.png'],
    pdf: '/pe3s_catalog.pdf',
    specs: [
      { label: '인쇄 영역', value: '600 x 900 mm' },
      { label: '헤드 구성', value: 'EPSON i1600-U1 (x3)' },
    ],
    features: [
      '3헤드 동시구성으로 속도 극대화',
      '고해상 출력 품질',
    ],
  },
  "a3max": {
    name: 'NC-UVA3 Max',
    images: ['/a3max_front.webp', '/a3max_side.webp', '/product-a-3.JPG', '/product-a-4.JPG', '/product-a-5.JPG'],
    pdf: '/a3max_catalog.pdf',
    specs: [],
    features: [],
  },
  "dtf30": {
    name: 'NC-UVDTF30',
    images: ['/product-b-1.jpg'],
    pdf: '/dtf30_catalog.pdf',
    specs: [],
    features: [],
  },
  "dtf60": {
    name: 'NC-UVDTF60',
    images: ['/product-c-1.jpg', '/product-c-2.png', '/product-c-3.png'],
    pdf: '/dtf60_catalog.pdf',
    specs: [],
    features: [],
  },
  "1010_visual": {
    name: 'DL-1010 Visual',
    images: ['/product-a-1.webp', '/product-a-2.JPG', '/product-a-3.JPG', '/product-a-4.JPG', '/product-a-5.JPG'],
    pdf: '/1010visual_catalog.pdf',
    specs: [],
    features: [],
  },
  "1810": {
    name: 'DL-1810',
    images: ['/product-b-1.jpg'],
    pdf: '/1810_catalog.pdf',
    specs: [],
    features: [],
  },
  "2513": {
    name: 'DL-2513',
    images: ['/product-c-1.jpg', '/product-c-2.png', '/product-c-3.png'],
    pdf: '/2513_catalog.pdf',
    specs: [],
    features: [],
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = productData[id];
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const swiperRef = useRef(null);

  const tabTitles = ['전면', '측면', '스펙', '특장점'];

  // 제품별 원본 이미지 소스 (imageInfos 우선) — 스펙/특장점 제목은 제외
  const baseItemsRaw = product?.imageInfos?.length
    ? product.imageInfos.map((x) => ({ src: x.src, title: x.title || '' }))
    : (product?.images || []).map((src) => ({ src, title: '' }));
  const baseItems = baseItemsRaw.filter((it) => !/(스펙|특장점)/.test(it.title || ''));

  const findByKeyword = (kw) => baseItems.find((it) => (it.title || '').includes(kw))?.src || null;

  // 탭 구성: 전면/측면은 이미지, 스펙/특장점은 텍스트(이미지 무시)
  const tabs = [
    { title: '전면',   type: 'image',    src: findByKeyword('전면') || baseItems[0]?.src || null },
    { title: '측면',   type: 'image',    src: findByKeyword('측면') || baseItems[1]?.src || null },
    { title: '스펙',   type: 'specs',    specs: product?.specs || [] },
    { title: '특장점', type: 'features', features: product?.features || [] },
  ];

  // 항상 첫 탭('전면')에서 시작
  useEffect(() => {
    setSelectedIndex(0);
    setSelectedImage(null);
    setShowSwipeHint(true);
    setLoadedImages({});
    if (swiperRef.current?.slideTo) {
      swiperRef.current.slideTo(0, 0);
    }
  }, [id]);

  // 힌트 3초 노출
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  const renderSpecs = (rows) => {
    if (!rows || rows.length === 0) {
      return (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          스펙 자료 준비중
        </div>
      );
    }
    return (
      <div className="w-full h-full">
        <div className="h-full overflow-auto">
          <table className="w-full text-sm">
            <tbody>
              {rows.map((r, i) => (
                <tr key={`spec-${i}`} className="even:bg-gray-50">
                  <th className="w-36 px-4 py-3 text-left font-semibold text-gray-700 align-top border-r">{r.label}</th>
                  <td className="px-4 py-3 text-gray-800">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderFeatures = (items) => {
    if (!items || items.length === 0) {
      return (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          특장점 자료 준비중
        </div>
      );
    }
    return (
      <div className="w-full h-full">
        <div className="h-full overflow-auto p-4">
          <ul className="list-disc pl-5 space-y-2 text-gray-800 text-sm">
            {items.map((t, i) => (
              <li key={`feat-${i}`}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />

      {/* 확대 모달 (이미지 탭에서만 사용) */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-3xl text-gray-300 z-50"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            aria-label="닫기"
          >
            ×
          </button>

          {selectedIndex > 0 && tabs[selectedIndex - 1]?.type === 'image' && tabs[selectedIndex - 1]?.src && (
            <button
              className="absolute left-4 text-4xl text-gray-300 z-50"
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = selectedIndex - 1;
                setSelectedIndex(newIndex);
                const prev = tabs[newIndex];
                setSelectedImage(prev.type === 'image' ? prev.src : null);
                swiperRef.current?.slideTo(newIndex);
              }}
              aria-label="이전 이미지"
            >
              ‹
            </button>
          )}

          <img
            src={selectedImage}
            alt="확대 이미지"
            className="max-w-full max-h-full rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />

          {selectedIndex < tabs.length - 1 && tabs[selectedIndex + 1]?.type === 'image' && tabs[selectedIndex + 1]?.src && (
            <button
              className="absolute right-4 text-4xl text-gray-300 z-50"
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = selectedIndex + 1;
                setSelectedIndex(newIndex);
                const next = tabs[newIndex];
                setSelectedImage(next.type === 'image' ? next.src : null);
                swiperRef.current?.slideTo(newIndex);
              }}
              aria-label="다음 이미지"
            >
              ›
            </button>
          )}
        </div>
      )}

      <div className="px-4 py-4 space-y-4 max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>

        {/* 4개 탭 */}
        <div className="w-full">
          <div className="grid grid-cols-4 gap-2">
            {tabTitles.map((title, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={`tab-${idx}`}
                  onClick={() => { swiperRef.current?.slideTo(idx); setSelectedIndex(idx); }}
                  className={
                    (active
                      ? "bg-blue-600 text-white border-blue-600 "
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 ") +
                    "rounded-full border px-3 py-2 text-sm transition"
                  }
                  aria-current={active ? "true" : "false"}
                >
                  {title}
                </button>
              );
            })}
          </div>
        </div>

        {/* 메인 컨텐츠: 모든 탭을 동일한 '정방형 카드'로 고정 */}
        <Swiper
          key={id}
          initialSlide={0}
          spaceBetween={12}
          slidesPerView={1}
          autoHeight={true}  // 모든 슬라이드가 같은 높이(정방형)이므로 변화 없음
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
        >
          {tabs.map((tb, idx) => (
            <SwiperSlide key={`slide-${idx}`}>
              {/* 공통 카드 래퍼: 흰 배경 + 테두리 + 섀도우 + 정방형 */}
              <div className="w-full rounded-2xl bg-white shadow border overflow-hidden relative">
                <div className="aspect-[1/1]">
                  {tb.type === 'image' ? (
                    tb.src ? (
                      <img
                        src={tb.src}
                        alt={`${product.name} - ${tb.title}`}
                        className={
                          (loadedImages[idx] ? "opacity-100 " : "opacity-0 ") +
                          "w-full h-full object-cover transition-opacity duration-700"
                        }
                        onLoad={() => setLoadedImages((prev) => ({ ...prev, [idx]: true }))}
                        onClick={() => { setSelectedImage(tb.src); setSelectedIndex(idx); }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-500">
                        {tb.title} 자료 준비중
                      </div>
                    )
                  ) : tb.type === 'specs' ? (
                    <div className="w-full h-full">{renderSpecs(tb.specs)}</div>
                  ) : (
                    <div className="w-full h-full">{renderFeatures(tb.features)}</div>
                  )}
                </div>

                {/* 처음 진입 힌트 (이미지일 때만) */}
                {idx === 0 && showSwipeHint && tb.type === 'image' && tb.src && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm font-medium z-10">
                    이미지를 좌우로 넘겨보세요 →
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA 버튼 (기존 구성 유지) */}
        <div className="flex justify-between pt-2 flex-wrap gap-2">
          <button
            className="flex-1 min-w-[100px] max-w-[160px] bg-blue-500 text-white py-2 px-3 rounded-lg shadow-sm transition active:scale-95 flex items-center justify-center gap-2 text-sm"
            onClick={() => window.open('https://nocai.co.kr/board/contact/list.html', '_blank')}
          >
            <MdChat className="text-lg" />
            상담하기
          </button>

          <button
            className="flex-1 min-w-[100px] max-w-[160px] bg-slate-600 text-white py-2 px-3 rounded-lg shadow-sm transition active:scale-95 flex items-center justify-center gap-2 text-sm"
            onClick={() => window.open('https://nocai.co.kr/', '_blank')}
          >
            <MdHome className="text-lg" />
            홈페이지
          </button>

          {product.pdf ? (
            <a
              href={product.pdf}
              download
              className="flex-1 min-w-[100px] max-w-[160px] bg-green-500 text-white py-2 px-3 rounded-lg shadow-sm transition active:scale-95 flex items-center justify-center gap-2 text-sm"
            >
              <MdDownload className="text-lg" />
              상세정보
            </a>
          ) : (
            <button
              disabled
              className="flex-1 min-w-[100px] max-w-[160px] bg-gray-400 text-white py-2 px-3 rounded-lg shadow-sm cursor-not-allowed opacity-60 flex items-center justify-center gap-2 text-sm"
            >
              <MdDownload className="text-lg" />
              상세정보 없음
            </button>
          )}
        </div>

        {/* 회사 정보 */}
        <div className="pt-2 text-center text-sm text-gray-500 leading-snug">
          (주)씨엠테크 | 032-361-2114<br />
          인천광역시 부평구 주부토로 236<br />
          인천테크노벨리 U1센터 B동 209호, 210호<br />
        </div>
      </div>
    </>
  );
}
