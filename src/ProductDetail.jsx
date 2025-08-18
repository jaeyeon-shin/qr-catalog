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
 */
const productData = {
  "9060_visual": {
    name: 'NC-UV9060 Visual',
    imageInfos: [
      { src: '/9060visual_front.webp', title: '전면' },
      { src: '/9060visual_side.webp',  title: '측면' },
      { src: '/product-a-3.JPG', title: '스펙' },      // 전면/측면 외 제목은 무시됨(표/리스트로 대체)
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

  // ✅ 이미지 확대 모달용 상태
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ 현재 탭 인덱스(전면=0부터). 제품 바뀌면 항상 0으로 초기화됨
  const [selectedIndex, setSelectedIndex] = useState(0);

  // ✅ 스와이프 힌트 표시/페이드 상태 (1.5초 표시 후 0.5초 페이드아웃)
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [hintFading, setHintFading] = useState(false);

  // ✅ 이미지 로딩 페이드인
  const [loadedImages, setLoadedImages] = useState({});

  // ✅ Swiper 인스턴스 핸들
  const swiperRef = useRef(null);

  // ✅ 좌우 여백/내부 폭 통일: 여기 값만 바꿔도 제목/탭/메인카드/CTA 가로폭이 같이 조정됨
  // - w-[85%] → % 폭 조정
  // - max-w-[320px] → 최대 폭(정방형 카드 한 변) 조정
  const INNER = "mx-auto w-[85%] max-w-[320px]";

  // ✅ 전면/측면 처리 로직: imageInfos 우선 → title에서 '전면/측면' 찾기 → 없으면 images[0],[1]
  const baseItemsRaw = product?.imageInfos?.length
    ? product.imageInfos.map((x) => ({ src: x.src, title: x.title || '' }))
    : (product?.images || []).map((src) => ({ src, title: '' }));

  // '스펙/특장점' 제목은 이미지로 쓰지 않음(표/리스트로 대체)
  const baseItems = baseItemsRaw.filter((it) => !/(스펙|특장점)/.test(it.title || ''));

  const findByKeyword = (kw) => baseItems.find((it) => (it.title || '').includes(kw))?.src || null;

  // 전면/측면 이미지 소스 확정 (측면이 전면과 동일하면 측면 탭 숨김)
  const frontSrc = findByKeyword('전면') || baseItems[0]?.src || null;
  const sideCandidate = findByKeyword('측면') || (baseItems[1]?.src || null);
  const sideSrc = sideCandidate && sideCandidate !== frontSrc ? sideCandidate : null;
  const hasSide = !!sideSrc; // 👉 이 값에 따라 '측면' 탭 버튼 자체가 사라짐

  // ✅ 탭 구성: hasSide=false면 '측면' 제외 → 자동으로 3개 탭만 보임
  const tabs = [
    { title: '전면',   type: 'image',    src: frontSrc },
    ...(hasSide ? [{ title: '측면', type: 'image', src: sideSrc }] : []),
    { title: '스펙',   type: 'specs',    specs: product?.specs || [] },
    { title: '특장점', type: 'features', features: product?.features || [] },
  ];

  // ✅ 제품 변경 시 초기화 + 스와이프 힌트 타이밍 설정
  useEffect(() => {
    setSelectedIndex(0);
    setSelectedImage(null);
    setLoadedImages({});

    // Swiper를 첫 슬라이드로 이동
    swiperRef.current?.slideTo?.(0, 0);

    // 힌트 1.5초 노출 후 0.5초 페이드 → 총 2.0초
    setShowSwipeHint(true);
    setHintFading(false);
    const t1 = setTimeout(() => setHintFading(true), 1500);  // ← 힌트가 천천히 사라지기 시작하는 시점
    const t2 = setTimeout(() => setShowSwipeHint(false), 2000); // ← 힌트 완전히 숨김
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [id]);

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  /**
   * ✅ 스펙(표) 렌더러
   * - 왼쪽 헤더셀(th)은 내용 길이에 맞춰지고, 너무 넓지 않게 bg-gray-50로 구분
   * - 테이블 폰트 크기: text-[13px] → 가독성. 필요시 숫자만 바꾸면 됨
   */
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
                  {/* 좌측 라벨 칸: whitespace-nowrap로 줄바꿈 방지 → 넓이 과도확장 방지 */}
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-700 bg-gray-50 align-top whitespace-nowrap">
                    {r.label}
                  </th>
                  {/* 우측 값 칸 */}
                  <td className="px-4 py-2.5 text-gray-900">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  /**
   * ✅ 특장점(목록) 렌더러
   * - 글머리표 대신 파란 점(span) 사용
   * - 간격/글꼴 크기는 아래 클래스에서 조정
   */
  const renderFeatures = (items) => {
    if (!items || items.length === 0) {
      return <div className="w-full h-full flex items-center justify-center text-gray-500">특장점 자료 준비중</div>;
    }
    return (
      <div className="w-full h-full">
        <div className="p-3">{/* 카드 내부 패딩 */}
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
      {/* ✅ 상단 헤더: 드롭메뉴(햄버거) 포함. Header.jsx에서 디자인/동작 조정 */}
      <Header />

      {/* ✅ 이미지 확대 모달
          - 오버레이 아무 곳이나 클릭해도 닫힘 (onClick에서 setSelectedImage(null))
          - X 버튼으로도 닫힘 (버튼 onClick)
      */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
          onClick={() => setSelectedImage(null)}   // ← 오버레이 클릭 시 닫기
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 text-3xl text-gray-300 z-50"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }} // ← X 클릭 시 닫기 (이벤트 버블링 방지)
            aria-label="닫기"
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt="확대 이미지"
            className="max-w-full max-h-full rounded-xl"
            onClick={(e) => e.stopPropagation()}   // ← 이미지 클릭 시 모달 유지
          />
        </div>
      )}

      {/* ✅ 페이지 컨테이너
          - space-y-3: 섹션 사이 여백. 더 촘촘히 하려면 2/1로, 넓히려면 4/6으로 조정
          - pb-20: 바닥쪽 여백(푸터/고정요소 대비)
      */}
      <div className="px-3 py-3 space-y-3 max-w-md mx-auto pb-20">
        {/* ✅ 제목(제품명)
            - 여백: mb-1. 너무 붙으면 mb-2/mb-3로 늘리면 됨
        */}
        <div className={`${INNER} mb-1`}>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>
        </div>

        {/* ✅ 탭 바(전면/측면/스펙/특장점)
            - sticky top-[52px]: 헤더 높이에 맞춰 탭이 화면 상단에 고정됨. 헤더 높이 바뀌면 이 수치만 조절.
            - bg-white/90 backdrop-blur: 스크롤시 뒤에 내용 어렴풋이
            - py-1: 탭 바 안쪽 세로 여백. 더 얇게: py-0.5, 더 넓게: py-2
        */}
        <div className={`sticky top-[52px] z-30 bg-white/90 backdrop-blur ${INNER} py-1`}>
          <div
            className="grid"
            style={{
              // ✅ 탭 개수에 맞춰 자동 분할
              gridTemplateColumns: `repeat(${tabs.length}, minmax(0,1fr))`,
              gap: '0.5rem', // 버튼 간 간격: 0.25rem~1rem 등으로 조정 가능
            }}
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
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 ") +
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

        {/* ✅ 메인 컨텐츠(정방형 카드)
            - Swiper 설정:
              * spaceBetween={6}: 슬라이드 사이 간격. 더 붙이려면 4/2로, 넓히려면 8/10으로.
              * autoHeight: 각 슬라이드 높이 자동. 카드 내부는 aspect-square로 정방형 유지.
        */}
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
                {/* 카드 컨테이너: 테두리/그림자/라운드 */}
                <div className="rounded-2xl bg-white shadow border overflow-hidden relative">
                  {/* 정방형 영역 고정 (모든 탭 공통 높이/폭 동일) */}
                  <div className="aspect-square">
                    {/* 이미지 탭 */}
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
                          onClick={() => { setSelectedImage(tb.src); setSelectedIndex(idx); }} // ← 클릭 시 확대 모달
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-500">
                          {tb.title} 자료 준비중
                        </div>
                      )
                    ) : tb.type === 'specs' ? (
                      // 스펙 탭(표)
                      <div className="p-3">
                        {renderSpecs(tb.specs)}
                      </div>
                    ) : (
                      // 특장점 탭(리스트)
                      <div className="p-3">
                        {renderFeatures(tb.features)}
                      </div>
                    )}
                  </div>

                  {/* ✅ 스와이프 힌트: 1.5초 표시 후 0.5초 페이드아웃(총 2초) */}
                  {idx === 0 && showSwipeHint && tb.type === 'image' && tb.src && (
                    <div
                      className={
                        "absolute inset-0 flex items-center justify-center text-white text-xs font-medium z-10 " +
                        (hintFading
                          ? "bg-black/0 opacity-0 transition-opacity duration-500"
                          : "bg-black/30 opacity-100")
                      }
                    >
                      이미지를 좌우로 넘겨보세요 →
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ CTA 버튼 묶음
            - 순서: 홈페이지 → 상담하기 → 상세정보(요청 반영)
            - 버튼 높이: h-10 (더 얇게: h-9, 두껍게: h-12)
            - gap-2: 버튼 사이 간격
        */}
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

        {/* ✅ 회사 정보(바닥 텍스트)
            - pt-1: 위쪽 여백. 더 띄우고 싶으면 pt-2/pt-3로.
            - 글자 크기/색은 여기서 조정.
        */}
        <div className="pt-1 text-center text-xs text-gray-500 leading-snug">
          (주)씨엠테크 | 032-361-2114<br />
          인천광역시 부평구 주부토로 236<br />
          인천테크노벨리 U1센터 B동 209호, 210호<br />
        </div>
      </div>
    </>
  );
}
