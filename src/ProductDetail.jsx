import { useParams } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MdChat, MdHome, MdDownload } from 'react-icons/md';

/**
 * 네가 준 버전에서 요청한 부분만 수정:
 * 1) 컨텐츠 간 여백 축소 (제목↔탭, 탭↔이미지, 이미지↔CTA, CTA↔문구)
 * 2) 확대 이미지: X 외에도 오버레이 클릭 시 닫힘(기존 유지)
 * 3) ESG 문구는 위치/스타일 변경 제안만. (코드 변경 없음)
 * 4) 헤더 드롭메뉴는 이전 디자인 유지, 동작 로직만 Header.jsx에 별도 패치(아래 참고)
 */
const productData = {
  "9060_visual": {
    name: 'NC-UV9060 Visual',
    imageInfos: [
      { src: '/9060visual_front.webp', title: '전면' },
      { src: '/9060visual_side.webp',  title: '측면' },
      { src: '/product-a-3.JPG', title: '스펙' },
      { src: '/product-a-4.JPG', title: '특장점' },
    ],
    pdf: '/9060visual_catalog.pdf',
    specs: [
      { label: '헤드', value: 'EPSON i3200-U1HD' },
      { label: '인쇄 모드', value: 'W + C + V 동시출력(+Primer 출력 가능)' },
      { label: '인쇄 면적', value: '900 x 600mm' },
      { label: '인쇄 높이', value: '180mm' },
      { label: '출력 컬러', value: 'CMYKLcLmLkLlk + W + V(+P)' },
      { label: '장비 크기', value: '1,998 x 1,298 x 787mm' },
      { label: '장비 무게', value: '250kg' },
      { label: '소프트웨어', value: 'FlexiPRINT' },
      { label: '이미지 형식', value: 'tiff, jpg, jpeg, eps, pdf, png, ai, psd' },
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
    images: ['/max2_front.webp', '/max2_side.webp'],
    pdf: '/max2_catalog.pdf',
    specs: [
      { label: '헤드', value: 'EPSON i3200-U1HD' },
      { label: '인쇄 모드', value: 'W + C + V 동시출력' },
      { label: '인쇄 면적', value: '600 x 900mm' },
      { label: '인쇄 높이', value: '180mm' },
      { label: '출력 컬러', value: 'CMYKLcLmLkLlk + W + V(+P)' },
      { label: '장비 크기', value: '1,676 x 1,640 x 994mm' },
      { label: '장비 무게', value: '226kg' },
      { label: '소프트웨어', value: 'FlexiPRINT' },
      { label: '이미지 형식', value: 'tiff, jpg, jpeg, eps, pdf, png, ai, psd' },
    ],
    features: [
      '컴팩트한 바디에 고출력',
      '초보자도 쉬운 유지보수',
    ],
  },
  "0609_pe3s": {
    name: 'NC-UV0609 PE3S',
    images: ['/pe3s_front.webp', '/pe3s_side.webp'],
    pdf: '/pe3s_catalog.pdf',
    specs: [
      { label: '헤드', value: 'EPSON i1600 | i3200' },
      { label: '인쇄 모드', value: 'W + C + V 동시출력' },
      { label: '인쇄 면적', value: '600 x 900mm' },
      { label: '인쇄 높이', value: '180mm' },
      { label: '출력 컬러', value: 'CMYK + W + V' },
      { label: '장비 크기', value: '1,676 x 1,627 x 693mm' },
      { label: '장비 무게', value: '187kg' },
      { label: '소프트웨어', value: 'FlexiPRINT' },
      { label: '이미지 형식', value: 'tiff, jpg, jpeg, eps, pdf, png, ai, psd' },
    ],
    features: [
      '3헤드 동시구성으로 속도 극대화',
      '고해상 출력 품질',
    ],
  },
  "a3max": {
    name: 'NC-UVA3 Max',
    images: ['/a3max_front.webp', '/a3max_side.webp'],
    pdf: '/a3max_catalog.pdf',
    specs: [
      { label: '헤드', value: 'EPSON i3200-U1HD' },
      { label: '인쇄 모드', value: 'W + C + V 동시출력' },
      { label: '인쇄 면적', value: '297 x 420mm' },
      { label: '인쇄 높이', value: '90mm' },
      { label: '출력 컬러', value: 'CMYK + W + V' },
      { label: '장비 크기', value: '1,000 x 902 x 592mm' },
      { label: '장비 무게', value: '78kg' },
      { label: '소프트웨어', value: 'FlexiPRINT' },
      { label: '이미지 형식', value: 'tiff, jpg, jpeg, eps, pdf, png, ai, psd' },
    ],
    features: [],
  },
  "dtf30": {
    name: 'NC-UVDTF30',
    images: ['/dtf30_front.webp', '/dtf30_side.webp'],
    pdf: '/dtf30_catalog.pdf',
    specs: [
      { label: '헤드', value: 'EPSON i3200-U1HD' },
      { label: '인쇄 모드', value: 'W + C + V 동시출력' },
      { label: '인쇄 너비', value: '300mm' },
      { label: '인쇄 두께', value: '1mm' },
      { label: '출력 컬러', value: 'CMYK + W + V' },
      { label: '장비 크기', value: '919 x 980 x 450mm' },
      { label: '장비 무게', value: '75kg' },
      { label: '소프트웨어', value: 'FlexiPRINT' },
      { label: '이미지 형식', value: 'tiff, jpg, jpeg, eps, pdf, png, ai, psd' },
    ],
    features: [],
  },
  "dtf60": {
    name: 'NC-UVDTF60',
    images: ['/dtf60_front.webp', '/dtf60_side.webp'],
    pdf: '/dtf60_catalog.pdf',
    specs: [
      { label: '헤드', value: 'EPSON i1600-E1' },
      { label: '인쇄 모드', value: 'W + C + V 동시출력' },
      { label: '인쇄 너비', value: '600mm' },
      { label: '인쇄 두께', value: '2mm' },
      { label: '출력 컬러', value: 'CMYK + W + V' },
      { label: '장비 크기', value: '870 x 1,728 x 1,535mm' },
      { label: '장비 무게', value: '190kg' },
      { label: '소프트웨어', value: 'FlexiPRINT' },
      { label: '이미지 형식', value: 'tiff, jpg, jpeg, eps, pdf, png, ai, psd' },
    ],
    features: [],
  },
  "1010_visual": {
    name: 'DL-1010 Visual',
    images: ['/1010visual_front.webp'],
    pdf: '/1010visual_catalog.pdf',
    specs: [
      { label: '헤드', value: 'EPSON i1600 | i3200' },
      { label: '인쇄 모드', value: 'W + C + V 동시출력' },
      { label: '인쇄 면적', value: '900 x 900mm' },
      { label: '인쇄 높이', value: '350mm' },
      { label: '출력 컬러', value: 'CMYKLcLm + W + V' },
      { label: '장비 크기', value: '2,709 x 1,740 x 1,200mm' },
      { label: '장비 무게', value: '650kg' },
      { label: '소프트웨어', value: 'FlexiPRINT' },
      { label: '이미지 형식', value: 'tiff, jpg, jpeg, eps, pdf, png, ai, psd' },
    ],
    features: [],
  },
  "1810": {
    name: 'DL-1810',
    images: ['/1810_front.webp'],
    pdf: '/1810_catalog.pdf',
    specs: [
      { label: '헤드', value: 'Ricoh G6' },
      { label: '인쇄 모드', value: 'W + C + V 동시출력' },
      { label: '인쇄 면적', value: '1,800 x 1,000mm' },
      { label: '인쇄 높이', value: '200mm' },
      { label: '출력 컬러', value: 'CMYKLcLm + W + V' },
      { label: '장비 크기', value: '1,820 x 4,130 x 1,700mm' },
      { label: '장비 무게', value: '1,600kg' },
      { label: '소프트웨어', value: 'FlexiPRINT' },
      { label: '이미지 형식', value: 'tiff, jpg, jpeg, eps, pdf, png, ai, psd' },
    ],
    features: [],
  },
  "2513": {
    name: 'DL-2513',
    images: ['/2513_side.webp'],
    pdf: '/2513_catalog.pdf',
    specs: [
      { label: '헤드', value: 'Ricoh G6' },
      { label: '인쇄 모드', value: 'W + C + V 동시출력' },
      { label: '인쇄 면적', value: '2500 x 1300mm' },
      { label: '인쇄 높이', value: '200mm' },
      { label: '출력 컬러', value: 'CMYKLcLm + W + V' },
      { label: '장비 크기', value: '4,590 x 2,180 x 1,450mm' },
      { label: '장비 무게', value: '1,700kg' },
      { label: '소프트웨어', value: 'FlexiPRINT' },
      { label: '이미지 형식', value: 'tiff, jpg, jpeg, eps, pdf, png, ai, psd' },
    ],
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

  // 좌우 여백 통일
  const INNER = "mx-auto w-[85%] max-w-[320px]";

  const baseItemsRaw = product?.imageInfos?.length
    ? product.imageInfos.map((x) => ({ src: x.src, title: x.title || '' }))
    : (product?.images || []).map((src) => ({ src, title: '' }));
  const baseItems = baseItemsRaw.filter((it) => !/(스펙|특장점)/.test(it.title || ''));
  const findByKeyword = (kw) => baseItems.find((it) => (it.title || '').includes(kw))?.src || null;

  const tabs = [
    { title: '전면',   type: 'image',    src: findByKeyword('전면') || baseItems[0]?.src || null },
    { title: '측면',   type: 'image',    src: findByKeyword('측면') || baseItems[1]?.src || null },
    { title: '스펙',   type: 'specs',    specs: product?.specs || [] },
    { title: '특장점', type: 'features', features: product?.features || [] },
  ];

  useEffect(() => {
    setSelectedIndex(0);
    setSelectedImage(null);
    setShowSwipeHint(true);
    setLoadedImages({});
    swiperRef.current?.slideTo?.(0, 0);
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  const renderSpecs = (rows) => {
    if (!rows || rows.length === 0) {
      return <div className="w-full h-full flex items-center justify-center text-gray-500">스펙 자료 준비중</div>;
    }
    return (
      <div className="w-full h-full">
        <div className="h-full">
          <table className="w-full text-[13px]">
            <tbody>
              {rows.map((r, i) => (
                <tr key={`spec-${i}`} className="border-b last:border-b-0 border-gray-100">
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 bg-gray-50 align-top whitespace-nowrap">
                    {r.label}
                  </th>
                  <td className="px-4 py-2.5 text-gray-900">{r.value}</td>
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
      return <div className="w-full h-full flex items-center justify-center text-gray-500">특장점 자료 준비중</div>;
    }
    return (
      <div className="w-full h-full">
        <div className="p-3">
          <ul className="space-y-2 text-gray-900 text-[13px]">
            {items.map((t, i) => (
              <li key={`feat-${i}`} className="pl-4 relative">
                <span className="absolute left-0 top-2 block h-1.5 w-1.5 rounded-full bg-blue-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />

      {/* 확대 모달: X + 오버레이 클릭 닫힘(유지) */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 text-3xl text-gray-300 z-50"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            aria-label="닫기"
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="확대 이미지"
            className="max-w-full max-h-full rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* 컨테이너: 섹션 간 간격 전반적으로 축소 */}
      <div className="px-3 py-3 space-y-4 max-w-md mx-auto pb-20">
        {/* 제목 — 아래 여백 살짝 */}
        <div className={INNER + " mb-1"}>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>
        </div>

        {/* 탭 — 위/아래 패딩/간격 축소 */}
        <div className={INNER + " mt-0.5"}>
          <div className="grid grid-cols-4 gap-2">
            {['전면','측면','스펙','특장점'].map((title, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={`tab-${idx}`}
                  onClick={() => { swiperRef.current?.slideTo(idx); setSelectedIndex(idx); }}
                  className={
                    (active
                      ? "bg-blue-600 text-white border-blue-600 "
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 ") +
                    "rounded-full border px-3 py-1.5 text-sm transition"
                  }
                  aria-current={active ? "true" : "false"}
                >
                  {title}
                </button>
              );
            })}
          </div>
        </div>

        {/* 메인 컨텐츠 — 탭과 이미지 사이 간격/카드 내부 패딩 축소 */}
        <Swiper
          key={id}
          initialSlide={0}
          spaceBetween={6}
          slidesPerView={1}
          autoHeight={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
        >
          {tabs.map((tb, idx) => (
            <SwiperSlide key={`slide-${idx}`}>
              <div className={INNER}>
                <div className="rounded-2xl bg-white shadow border overflow-hidden relative">
                  <div className="aspect-square">
                    {tb.type === 'image' ? (
                      tb.src ? (
                        <img
                          src={tb.src}
                          alt={`${product.name} - ${tb.title}`}
                          className={(loadedImages[idx] ? "opacity-100 " : "opacity-0 ") + "w-full h-full object-cover transition-opacity duration-700"}
                          onLoad={() => setLoadedImages((prev) => ({ ...prev, [idx]: true }))}
                          onClick={() => { setSelectedImage(tb.src); setSelectedIndex(idx); }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-500">
                          {tb.title} 자료 준비중
                        </div>
                      )
                    ) : tb.type === 'specs' ? (
                      <div className="p-3">
                        {renderSpecs(tb.specs)}
                      </div>
                    ) : (
                      <div className="p-3">
                        {renderFeatures(tb.features)}
                      </div>
                    )}
                  </div>

                  {idx === 0 && showSwipeHint && tb.type === 'image' && tb.src && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-xs font-medium z-10">
                      이미지를 좌우로 넘겨보세요 →
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA — 이미지와 CTA 간격, 버튼 높이/여백 축소 */}
        <div className={INNER + " mt-1"}>
          <div className="flex justify-between gap-2">
            <button
              className="flex-1 h-10 bg-slate-600 text-white rounded-lg shadow-sm active:scale-[0.98] flex items-center justify-center gap-1.5 text-sm"
              onClick={() => window.open('https://nocai.co.kr/', '_blank')}
            >
              <MdHome className="text-base" />
              홈페이지
            </button>

            <button
              className="flex-1 h-10 bg-blue-600 text-white rounded-lg shadow-sm active:scale-[0.98] flex items-center justify-center gap-1.5 text-sm"
              onClick={() => window.open('https://nocai.co.kr/board/contact/list.html', '_blank')}
            >
              <MdChat className="text-base" />
              상담하기
            </button>

            {product.pdf ? (
              <a
                href={product.pdf}
                download
                className="flex-1 h-10 bg-green-500 text-white rounded-lg shadow-sm active:scale-[0.98] flex items-center justify-center gap-1.5 text-sm"
              >
                <MdDownload className="text-base" />
                상세정보
              </a>
            ) : (
              <button
                disabled
                className="flex-1 h-10 bg-gray-300 text-white rounded-lg shadow-sm cursor-not-allowed flex items-center justify-center gap-1.5 text-sm"
              >
                <MdDownload className="text-base" />
                상세정보 없음
              </button>
            )}
          </div>
        </div>

        {/* ESG 문구 — (요청: 제안만. 코드 스타일 변경 없이 간격만 살짝 축소) */}
        <div className={INNER + " pt-1"}>
          <p className="text-center text-[11px] text-gray-600 border-t pt-1 leading-relaxed">
            K-Print 2025 Paperless(페이퍼리스) 지속가능한 전시회를 위한 ESG 캠페인에 동참합니다.
          </p>
        </div>

        {/* 회사 정보 — 위쪽 여백 소폭 축소 */}
        <div className="pt-1 text-center text-xs text-gray-500 leading-snug">
          (주)씨엠테크 | 032-361-2114<br />
          인천광역시 부평구 주부토로 236<br />
          인천테크노벨리 U1센터 B동 209호, 210호<br />
        </div>
      </div>
    </>
  );
}
