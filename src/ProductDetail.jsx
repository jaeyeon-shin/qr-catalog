import { useParams } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MdChat, MdHome, MdDownload } from 'react-icons/md';

/**
 * ✅ 데이터 정의:
 * - imageInfos에 title '전면/측면'이 있으면 우선 매칭. 없으면 images 배열 순서대로 전면/측면 추정.
 * - 스펙(specs), 특장점(features) 배열은 표/리스트로 렌더링.
 * - 필요 시 제품별 데이터만 여기서 손보면 UI 반영됨.
 * - highlight: 제목 하이라이트 색상(hex)
 */
const productData = {
  "9060_visual": {
    name: 'NC-UV9060 Visual',
    tagline: '풍부한 컬러와 카메라 포지셔닝',
    highlight: '#f49f4f',
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
      '소재 표면 패턴을 정확히 인식하기 위한 고화질 카메라 스캐닝',
      '8컬러 + 화이트 + 바니시 동시출력',
      '내구성 있는 소재로 제작되어 변형에 강하고 안정성 높은 하드웨어',
      '고강성 프레임으로 장시간 안정 운용',
    ],
  },
  "0609_max2": {
    name: 'NC-UV0609 Max2',
    tagline: '생산량에 최적화된 빠른 스피드',
    highlight: '#e9a092',
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
      '소프트웨어 제어를 통해 2~12mm 하이드롭 인쇄 지원',
      '8컬러 + 화이트 + 바니시 동시출력',
      '내구성 있는 소재로 제작되어 변형에 강하고 안정성 높은 하드웨어',
    ],
  },
  "0609_pe3s": {
    name: 'NC-UV0609 PE3S',
    tagline: '하나로, 한번에, 속도까지',
    highlight: '#10ff8a',
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
      '전동 로터리 지그 지원',
      '컬러 + 화이트 + 바니시 동시출력',
      'UV라이트 난반사 방지 기능',
    ],
  },
  "a3max": {
    name: 'NC-UVA3 Max',
    tagline: '다재다능 팔방미인',
    highlight: '#ff4b89',
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
    features: [
      '롤링, 로터리 지그 지원',
      '하나의 헤드로 컬러 + 화이트 + 바니시 동시출력',
      '조작이 쉽고 편리한 다기능 제어판',
      '지능형 잉크 공급 시스템(잉크 부족 알림, 화이트 잉크 교반, 출력 시 잉크 사용량 자동 계산 등)',
    ],
  },
  "dtf30": {
    name: 'NC-UVDTF30',
    tagline: 'UV-DTF & 라미네이팅 All-in-one',
    highlight: '#df007d',
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
    features: [
      '화이트 + 컬러 + 바니시 + 라미네이팅 동시 처리',
      '30cm 인쇄폭, 길이 제한 없음, 1mm 이내 인쇄 두께' ,
      'Vaccum 플랫폼 장착(베드에 소재 고정, 들뜸 현상 방지, 헤드 충돌 방지)',
    ],
  },
  "dtf60": {
    name: 'NC-UVDTF60',
    tagline: 'UV-DTF & 라미네이팅 All-in-one',
    highlight: '#334273',
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
    features: [
      '화이트 + 컬러 + 바니시 + 라미네이팅 동시 처리',
      '60cm 인쇄폭, 길이 제한 없음, 2mm 이내 인쇄 두께' ,
      'Vaccum 플랫폼 장착(베드에 소재 고정, 들뜸 현상 방지, 헤드 충돌 방지)',
      '빠른 출력 속도로 엠보 효과 구현 가능',
    ],
  },
  "1010_visual": {
    name: 'DL-1010 Visual',
    tagline: '압도적인 출력 퀄리티 & 속도',
    highlight: '#50b7d9',
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
    features: [
      '화이트 + 컬러 + 바니시 + 프라이머 동시 출력 가능',
      'Visual Point CCD 카메라 장착' ,
      '마그네틱 리니어 모터',
      '메탈 엔코더',
      '소재 출력 높이 35cm',
      '로터리 지그 장착 가능 (옵션)',
    ],
  },
  "1810": {
    name: 'DL-1810',
    tagline: '압도적인 출력 퀄리티 & 속도',
    highlight: '#50b7d9',
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
    features: [
      'Flatbed 서포트 포인트(25개) - 평판 정밀도 향상',
      '마그네틱 리니어 모터',
      '메탈 엔코더',
      '형광잉크 탑재 가능' ,
      '프라이머 탑재 가능',
      '작업자의 안전을 최우선으로 고려한 세이프 가드 장착',
      '4배열 헤드플레이트 구조로 유연한 헤드 구성을 가능하게 하여 사용자의 편의성을 높임',
    ],
  },
  "2513": {
    name: 'DL-2513',
    tagline: '압도적인 출력 퀄리티 & 속도',
    highlight: '#50b7d9',
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
    features: [
      '동급 대비 2배 이상의 Flatbed 서포트 포인트(48개) - 평판 정밀도 향상 ',
      '마그네틱 리니어 모터',
      '메탈 엔코더',
      '형광잉크 탑재 가능' ,
      '프라이머 탑재 가능',
      '작업자의 안전을 최우선으로 고려한 세이프 가드 장착',
      '4배열 헤드플레이트 구조로 유연한 헤드 구성을 가능하게 하여 사용자의 편의성을 높임',
    ],
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = productData[id];

  // 모달/탭/힌트/로딩 상태
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [hintFading, setHintFading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const swiperRef = useRef(null);

  // 통일 폭(제목/탭/카드/CTA 동일 정렬)
  const INNER = "mx-auto w-[85%] max-w-[320px]";

  // 전면/측면 이미지 소스 결정
  const baseItemsRaw = product?.imageInfos?.length
    ? product.imageInfos.map((x) => ({ src: x.src, title: x.title || '' }))
    : (product?.images || []).map((src) => ({ src, title: '' }));

  const baseItems = baseItemsRaw.filter((it) => !/(스펙|특장점)/.test(it.title || ''));
  const findByKeyword = (kw) => baseItems.find((it) => (it.title || '').includes(kw))?.src || null;

  const frontSrc = findByKeyword('전면') || baseItems[0]?.src || null;
  const sideCandidate = findByKeyword('측면') || (baseItems[1]?.src || null);
  const sideSrc = sideCandidate && sideCandidate !== frontSrc ? sideCandidate : null;
  const hasSide = !!sideSrc;

  const tabs = [
    { title: '전면',   type: 'image',    src: frontSrc },
    ...(hasSide ? [{ title: '측면', type: 'image', src: sideSrc }] : []),
    { title: '스펙',   type: 'specs',    specs: product?.specs || [] },
    { title: '특장점', type: 'features', features: product?.features || [] },
  ];

  // 제품 변경 시 초기화 + 힌트(1.5s 표시 → 0.5s 페이드)
  useEffect(() => {
    setSelectedIndex(0);
    setSelectedImage(null);
    setLoadedImages({});
    swiperRef.current?.slideTo?.(0, 0);

    setShowSwipeHint(true);
    setHintFading(false);
    const t1 = setTimeout(() => setHintFading(true), 1500);
    const t2 = setTimeout(() => setShowSwipeHint(false), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [id]);

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  // 스펙 표
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
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 bg-gray-50 align-top [word-break:keep-all] break-words whitespace-pre-line">
                    {r.label}
                  </th>
                  <td className="px-4 py-2.5 text-gray-900 [word-break:keep-all] break-words whitespace-pre-line">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 특장점 리스트
  const renderFeatures = (items) => {
    if (!items || items.length === 0) {
      return <div className="w-full h-full flex items-center justify-center text-gray-500">특장점 자료 준비중</div>;
    }
    return (
      <div className="w-full h-full">
        <div className="p-3">
          <ul className="space-y-2 text-gray-900 text-[14px]">
            {items.map((t, i) => (
              <li key={`feat-${i}`} className="pl-4 relative [word-break:keep-all] break-words whitespace-pre-line ">
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

      {/* 확대 모달: 오버레이 클릭/우상단 X 둘 다 닫힘 */}
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

      {/* 페이지 레이아웃: 여백/밀도 최적화 + iOS 안전영역 */}
      <div className="px-3 py-3 space-y-2.5 max-w-md mx-auto pb-20 pb-[env(safe-area-inset-bottom)]">
        {/* 제목(서브카피 + 형광펜 하이라이트) */}
        <div className={`${INNER} mb-2`}>
          {product?.tagline && (
            <p className="text-sm text-gray-500 mb-1 leading-snug">
              {product.tagline}
            </p>
          )}
          <h1 className="relative inline-block text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
            <span className="relative z-10">{product.name}</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 right-0 bottom-0 h-[0.42em] rounded-sm"
              style={{ backgroundColor: product?.highlight || '#facc15', opacity: 0.6 }}
            />
          </h1>
        </div>

        {/* 탭바(sticky) – 비활성 라이트톤, 컴팩트 패딩 */}
        <div className={`sticky top-[52px] z-30 bg-white/90 backdrop-blur ${INNER} py-0.5`}>
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0,1fr))` }}
          >
            {tabs.map((t, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={`tab-${t.title}-${idx}`}
                  onClick={() => { swiperRef.current?.slideTo(idx); setSelectedIndex(idx); }}
                  className={
                    (active
                      ? "bg-blue-600 text-white border-blue-600 "
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 ") +
                    "rounded-full border px-3 py-1.5 text-sm transition"
                  }
                  aria-current={active ? "true" : "false"}
                >
                  {t.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* 메인 컨텐츠(정방형 카드) – 카드 톤 다운, 그림자 얕게 */}
        <Swiper
          key={id}
          initialSlide={0}
          spaceBetween={8}
          slidesPerView={1}
          autoHeight={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
        >
          {tabs.map((tb, idx) => (
            <SwiperSlide key={`slide-${idx}`}>
              <div className={INNER}>
                <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-sm overflow-hidden relative">
                  {/* ✅ 이미지 탭은 정방형 유지, 나머지 탭은 최소 높이(160px)로 흔들림 방지 */}
                  <div className={tb.type === 'image' ? 'aspect-square' : 'min-h-[160px]'}>
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

                  {/* 스와이프 힌트: 1.5초 표시 후 0.5초 페이드아웃 */}
                  {idx === 0 && showSwipeHint && tb.type === 'image' && tb.src && (
                    <div
                      className={
                        "absolute inset-0 flex items-center justify-center z-10 " +
                        (hintFading ? "opacity-0 transition-opacity duration-500" : "opacity-100")
                      }
                    >
                      <span className="px-3 py-1 rounded-full bg-black/45 text-white text-xs font-medium">
                        이미지를 좌우로 넘겨보세요 →
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 🔻 CTA + 페이퍼리스 문구 + 회사 정보 : 하나로 묶어 간격 일원화 */}
        <div className={INNER + " mt-2 space-y-3"}>
          {/* CTA 버튼(순서 유지 / 슬림) */}
          <div className="flex justify-between gap-2">
            <button
              className="flex-1 h-9 bg-slate-600 text-white rounded-lg shadow-sm active:scale-[0.98] flex items-center justify-center gap-1.5 text-sm"
              onClick={() => window.open('https://nocai.co.kr/', '_blank')}
            >
              <MdHome className="text-base" />
              홈페이지
            </button>

            <button
              className="flex-1 h-9 bg-blue-600 text-white rounded-lg shadow-sm active:scale-[0.98] flex items-center justify-center gap-1.5 text-sm"
              onClick={() => window.open('https://visitor-registeration.vercel.app/', '_blank')}
            >
              <MdChat className="text-base" />
              상담하기
            </button>

            {product.pdf ? (
              <a
                href={product.pdf}
                download
                className="flex-1 h-9 bg-green-500 text-white rounded-lg shadow-sm active:scale-[0.98] flex items-center justify-center gap-1.5 text-sm"
              >
                <MdDownload className="text-base" />
                상세정보
              </a>
            ) : (
              <button
                disabled
                className="flex-1 h-9 bg-gray-300 text-white rounded-lg shadow-sm cursor-not-allowed flex items-center justify-center gap-1.5 text-sm"
              >
                <MdDownload className="text-base" />
                상세정보 없음
              </button>
            )}
          </div>

          {/* 페이퍼리스 문구: 중앙정렬, 초록색 */}
          <p className="text-[12px] text-gray-500 text-center leading-tight">
            "K-Print 2025 <span className="font-semibold text-green-600">Paperless(페이퍼리스)</span> <br />지속가능한 전시회를 위한 <span className="font-semibold text-green-600">ESG 캠페인에 동참</span>합니다."
          </p>

          {/* 회사 정보 – 상단 헤어라인 구분선 */}
          <div className="border-t border-gray-100 pt-3 text-center text-[13px] text-gray-500 leading-snug">
            (주)씨엠테크 | 032-361-2114<br />
            인천광역시 부평구 주부토로 236<br />
            인천테크노벨리 U1센터 B동 209호, 210호<br />
          </div>
        </div>
      </div>
    </>
  );
}
