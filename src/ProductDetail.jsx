import { useParams } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MdChat, MdHome, MdDownload } from 'react-icons/md';

const productData = {
  "1010_visual": {
    name: 'DL-1010 Visual',
    tagline: '압도적인 출력 퀄리티 & 속도',
    highlight: '#50b7d9',
    images: ['/1010visual_front.webp'],
    pdf: '/1010visual_catalog.pdf',
    specs: [
      { label: '헤드', value: 'EPSON i3200-U1HD' },
      { label: '인쇄 모드', value: 'W + C + V + P 동시출력' },
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
      { label: '인쇄 모드', value: 'W + C + V + P 동시출력' },
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
      { label: '인쇄 모드', value: 'W + C + V + P 동시출력' },
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

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [hintFading, setHintFading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const swiperRef = useRef(null);

  const INNER = "mx-auto w-[90%] max-w-md lg:max-w-2xl";

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
    { title: '전면', type: 'image', src: frontSrc },
    ...(hasSide ? [{ title: '측면', type: 'image', src: sideSrc }] : []),
    { title: '스펙', type: 'specs', specs: product?.specs || [] },
    { title: '특장점', type: 'features', features: product?.features || [] },
  ];

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

  const renderSpecs = (rows) => (
    !rows?.length ? (
      <div className="w-full h-full flex items-center justify-center text-gray-500">스펙 자료 준비중</div>
    ) : (
      <table className="w-full text-[13px] lg:text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr key={`spec-${i}`} className="border-b last:border-b-0 border-gray-100">
              <th className="px-3 py-2 text-left font-semibold text-gray-700 bg-gray-50">{r.label}</th>
              <td className="px-3 py-2 text-gray-900">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );

  const renderFeatures = (items) => (
    !items?.length ? (
      <div className="w-full h-full flex items-center justify-center text-gray-500">특장점 자료 준비중</div>
    ) : (
      <ul className="space-y-2 text-gray-900 text-[14px] lg:text-base p-2">
        {items.map((t, i) => (
          <li key={`feat-${i}`} className="pl-4 relative">
            <span className="absolute left-0 top-2 block h-1.5 w-1.5 rounded-full bg-blue-500" />
            {t}
          </li>
        ))}
      </ul>
    )
  );

  return (
    <>
      <Header />

      {/* 확대 모달 */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-3xl text-gray-300 z-50" onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}>×</button>
          <img src={selectedImage} alt="확대 이미지" className="max-w-full max-h-full lg:max-w-3xl rounded-xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* 페이지 레이아웃 */}
      <div className="px-3 py-3 space-y-4 mx-auto pb-20 lg:pb-24">
        {/* 제목 */}
        <div className={`${INNER} mb-2`}>
          {product?.tagline && <p className="text-sm lg:text-base text-gray-500 mb-1">{product.tagline}</p>}
          <h1 className="relative inline-block text-2xl lg:text-3xl font-extrabold text-gray-900">
            <span className="relative z-10">{product.name}</span>
            <span className="absolute left-0 right-0 bottom-0 h-[0.42em] rounded-sm" style={{ backgroundColor: product?.highlight, opacity: 0.6 }} />
          </h1>
        </div>

        {/* 탭 */}
        <div className={`sticky top-[52px] z-30 bg-white/90 backdrop-blur ${INNER} py-1`}>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0,1fr))` }}>
            {tabs.map((t, idx) => (
              <button
                key={t.title}
                onClick={() => { swiperRef.current?.slideTo(idx); setSelectedIndex(idx); }}
                className={
                  (idx === selectedIndex
                    ? "bg-blue-600 text-white border-blue-600 "
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 ") +
                  "rounded-full border px-3 py-1.5 text-sm lg:text-base"
                }
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>

        {/* 컨텐츠 */}
        <Swiper key={id} initialSlide={0} spaceBetween={8} slidesPerView={1} autoHeight onSwiper={(s) => (swiperRef.current = s)} onSlideChange={(s) => setSelectedIndex(s.activeIndex)}>
          {tabs.map((tb, idx) => (
            <SwiperSlide key={idx}>
              <div className={INNER}>
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden relative">
                  <div className={tb.type === 'image' ? 'aspect-square' : 'min-h-[160px]'}>
                    {tb.type === 'image' ? (
                      tb.src ? (
                        <img
                          src={tb.src}
                          alt={`${product.name} - ${tb.title}`}
                          className={(loadedImages[idx] ? "opacity-100 " : "opacity-0 ") + "w-full h-full object-contain transition-opacity duration-700"}
                          onLoad={() => setLoadedImages((prev) => ({ ...prev, [idx]: true }))}
                          onClick={() => setSelectedImage(tb.src)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-500">{tb.title} 자료 준비중</div>
                      )
                    ) : tb.type === 'specs' ? (
                      renderSpecs(tb.specs)
                    ) : (
                      renderFeatures(tb.features)
                    )}
                  </div>
                  {idx === 0 && showSwipeHint && tb.type === 'image' && tb.src && (
                    <div className={"absolute inset-0 flex items-center justify-center z-10 " + (hintFading ? "opacity-0 transition-opacity duration-500" : "opacity-100")}>
                      <span className="px-3 py-1 rounded-full bg-black/45 text-white text-xs font-medium">이미지를 좌우로 넘겨보세요 →</span>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA + 안내문구 */}
        <div className={INNER + " mt-4 space-y-4"}>
          {/* ✅ 모바일: grid-cols-3, PC: flex-row + flex-1 */}
          <div className="grid grid-cols-3 gap-2 lg:flex lg:gap-3">
            <button className="flex-1 h-10 bg-slate-600 text-white rounded-lg flex items-center justify-center gap-1.5 text-sm lg:text-base" onClick={() => window.open('https://nocai.co.kr/', '_blank')}>
              <MdHome className="text-sm lg:text-lg" /> 홈페이지
            </button>
            <button className="flex-1 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-1.5 text-sm lg:text-base" onClick={() => window.open('https://visitor-registeration.vercel.app/', '_blank')}>
              <MdChat className="text-sm lg:text-lg" /> 상담하기
            </button>
            {product.pdf ? (
              <a href={product.pdf} download className="flex-1 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center gap-1.5 text-sm lg:text-base">
                <MdDownload className="text-sm lg:text-lg" /> 상세정보
              </a>
            ) : (
              <button disabled className="flex-1 h-10 bg-gray-300 text-white rounded-lg cursor-not-allowed flex items-center justify-center gap-1.5 text-sm lg:text-base">
                <MdDownload className="text-sm lg:text-lg" /> 상세정보 없음
              </button>
            )}
          </div>

          <p className="text-[14px] lg:text-sm text-gray-500 text-center leading-tight break-keep">
            해당 제품은 곧 공식 홈페이지에 업데이트될 예정입니다.<br />
            문의가 필요하시면 <span className="font-semibold text-blue-600">‘상담하기’ 버튼</span>을 통해 남겨주세요.
          </p>

          <div className="border-t border-gray-100 pt-3 text-center text-[13px] lg:text-base text-gray-500 leading-snug">
            (주)씨엠테크 | 032-361-2114<br />
            인천광역시 부평구 주부토로 236<br />
            인천테크노벨리 U1센터 B동 209호, 210호
          </div>
        </div>
      </div>
    </>
  );
}
