import { useParams } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MdChat, MdHome, MdDownload } from 'react-icons/md';

/**
 * - ‘측면’ 이미지가 없으면 측면 탭/슬라이드는 숨김
 * - 탭바 sticky 고정 (스크롤해도 상단에 고정)
 * - 스펙 표: 라벨 폭 자동(table-auto), 한 번에 보기
 * - 이미지 확대: X 버튼 + 오버레이 클릭 모두 닫힘
 * - 스와이프 힌트: 1.2s 후 페이드, 1.7s 후 제거
 * - CTA 순서: 홈페이지 → 상담하기 → 상세정보, 버튼 높이 축소
 * - ESG 문구: CTA 아래, 회사 정보 위
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

  // 스와이프 힌트(페이드)
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [hintFade, setHintFade] = useState(false);

  const [loadedImages, setLoadedImages] = useState({});
  const swiperRef = useRef(null);

  // 좌우 여백 통일
  const INNER = "mx-auto w-[85%] max-w-[320px]";

  // 이미지 소스(Infos 우선)
  const baseItemsRaw = product?.imageInfos?.length
    ? product.imageInfos.map((x) => ({ src: x.src, title: x.title || '' }))
    : (product?.images || []).map((src) => ({ src, title: '' }));
  const baseItems = baseItemsRaw.filter((it) => !/(스펙|특장점)/.test(it.title || ''));

  const findByKeyword = (kw) => baseItems.find((it) => (it.title || '').includes(kw))?.src || null;

  const frontSrc = findByKeyword('전면') || baseItems[0]?.src || null;
  const sideSrc  = findByKeyword('측면') || baseItems[1]?.src || null; // 없으면 null

  // 탭 구성(측면 없는 제품은 제외)
  const tabs = [
    { title: '전면', type: 'image', src: frontSrc },
    ...(sideSrc ? [{ title: '측면', type: 'image', src: sideSrc }] : []),
    { title: '스펙', type: 'specs', specs: product?.specs || [] },
    { title: '특장점', type: 'features', features: product?.features || [] },
  ];
  const tabColsClass = tabs.length === 3 ? 'grid-cols-3' : 'grid-cols-4';

  // 초기화 + 힌트 타이밍
  useEffect(() => {
    setSelectedIndex(0);
    setSelectedImage(null);
    setLoadedImages({});
    swiperRef.current?.slideTo?.(0, 0);

    // 1.2s 후 페이드, 1.7s 후 제거
    setShowSwipeHint(true);
    setHintFade(false);
    const t1 = setTimeout(() => setHintFade(true), 1200);
    const t2 = setTimeout(() => setShowSwipeHint(false), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [id]);

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  const SpecsTable = ({ rows }) => {
    if (!rows || rows.length === 0) {
      return <div className="w-full text-center text-gray-500 py-8">스펙 자료 준비중</div>;
    }
    return (
      <table className="w-full table-auto text-[13px]">
        <tbody>
          {rows.map((r, i) => (
            <tr key={`spec-${i}`} className="border-b last:border-b-0 border-gray-100 align-top">
              {/* 라벨 폭 자동 */}
              <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-gray-50 whitespace-nowrap pr-4">
                {r.label}
              </th>
              <td className="px-4 py-3 text-gray-900">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const FeaturesList = ({ items }) => {
    if (!items || items.length === 0) {
      return <div className="w-full text-center text-gray-500 py-8">특장점 자료 준비중</div>;
    }
    return (
      <ul className="space-y-2.5 text-gray-900 text-[13px]">
        {items.map((t, i) => (
          <li key={`feat-${i}`} className="pl-4 relative">
            <span className="absolute left-0 top-2 block h-1.5 w-1.5 rounded-full bg-blue-500" />
            {t}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Header />

      {/* 확대 모달: X + 오버레이 클릭 닫힘 */}
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

      {/* 페이지 컨테이너 */}
      <div className="px-3 py-4 space-y-6 max-w-md mx-auto pb-24">
        {/* 제목 */}
        <div className={INNER + " mb-1"}>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>
        </div>

        {/* 탭: sticky 고정 (헤더 높이에 맞춰 top 조절 필요 시 변경) */}
        <div className="sticky top-16 z-30 bg-white/85 backdrop-blur">
          <div className={INNER + " py-2"}>
            <div className={`grid ${tabColsClass} gap-3`}>
              {tabs.map((t, idx) => {
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
                    {t.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <Swiper
          key={id}
          initialSlide={0}
          spaceBetween={10}
          slidesPerView={1}
          autoHeight={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
        >
          {tabs.map((tb, idx) => (
            <SwiperSlide key={`slide-${idx}`}>
              <div className={INNER}>
                <div className="rounded-2xl bg-white shadow border overflow-hidden relative">
                  {tb.type === 'image' ? (
                    <div className="aspect-square">
                      {tb.src ? (
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
                      )}

                      {/* 스와이프 힌트 */}
                      {idx === 0 && showSwipeHint && tb.src && (
                        <div className={`absolute inset-0 flex items-center justify-center text-white text-xs font-medium z-10 bg-black/30 transition-opacity duration-500 ${hintFade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                          이미지를 좌우로 넘겨보세요 →
                        </div>
                      )}
                    </div>
                  ) : tb.type === 'specs' ? (
                    <div className="p-4">
                      <SpecsTable rows={tb.specs} />
                    </div>
                  ) : (
                    <div className="p-4">
                      <FeaturesList items={tb.features} />
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA: 순서 변경(홈페이지 → 상담하기 → 상세정보) + 세로 높이 축소 */}
        <div className={INNER + " mt-2"}>
          <div className="flex justify-between gap-3">
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

        {/* ESG 문구 */}
        <div className={INNER + " pt-2"}>
          <p className="text-center text-[11px] text-gray-600 border-t pt-2 leading-relaxed">
            K-Print 2025 Paperless(페이퍼리스) 지속가능한 전시회를 위한 ESG 캠페인에 동참합니다.
          </p>
        </div>

        {/* 회사 정보 */}
        <div className="pt-2 text-center text-xs text-gray-500 leading-snug">
          (주)씨엠테크 | 032-361-2114<br />
          인천광역시 부평구 주부토로 236<br />
          인천테크노벨리 U1센터 B동 209호, 210호<br />
        </div>
      </div>
    </>
  );
}
