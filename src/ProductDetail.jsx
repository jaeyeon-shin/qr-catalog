import { useParams } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MdChat, MdHome, MdDownload } from 'react-icons/md';

/**
 * 전 제품 공통: 4개 탭(전면/측면/스펙/특장점)
 * - imageInfos에 "전면/측면/스펙/특장점" 제목이 있으면 우선 매칭
 * - 없으면 images[0..3]을 순서대로 매칭
 * - 이미지가 없으면 해당 탭은 "자료 준비중" 박스 표시
 */
const productData = {
  "9060_visual": {
    name: 'NC-UV9060 Visual',
    imageInfos: [
      { src: '/product-a-1.webp', title: '전면' },
      { src: '/product-a-2.JPG',  title: '측면' },
      { src: '/product-a-3.JPG',  title: '스펙' },
      { src: '/product-a-4.JPG',  title: '특장점' },
      { src: '/product-a-5.JPG',  title: '추가' },
    ],
    pdf: '/catalog-a.pdf',
  },
  "0609_max2": {
    name: 'NC-UV0609 Max2',
    images: ['/product-b-1.jpg'],
    pdf: '/catalog-b.pdf',
  },
  "0609_pe3s": {
    name: 'NC-UV0609 PE3S',
    images: ['/product-c-1.jpg', '/product-c-2.png', '/product-c-3.png'],
    pdf: '/catalog-c.pdf',
  },
  "a3max": {
    name: 'NC-UVA3 Max',
    images: ['/product-a-1.webp', '/product-a-2.JPG', '/product-a-3.JPG', '/product-a-4.JPG', '/product-a-5.JPG'],
    pdf: '/catalog-a.pdf',
  },
  "dtf30": {
    name: 'NC-UVDTF30',
    images: ['/product-b-1.jpg'],
    pdf: '/catalog-b.pdf',
  },
  "dtf60": {
    name: 'NC-UVDTF60',
    images: ['/product-c-1.jpg', '/product-c-2.png', '/product-c-3.png'],
    pdf: '/catalog-c.pdf',
  },
  "1010_visual": {
    name: 'DL-1010 Visual',
    images: ['/product-a-1.webp', '/product-a-2.JPG', '/product-a-3.JPG', '/product-a-4.JPG', '/product-a-5.JPG'],
    pdf: '/catalog-a.pdf',
  },
  "1810": {
    name: 'DL-1810',
    images: ['/product-b-1.jpg'],
    pdf: '/catalog-b.pdf',
  },
  "2513": {
    name: 'DL-2513',
    images: ['/product-c-1.jpg', '/product-c-2.png', '/product-c-3.png'],
    pdf: '/catalog-c.pdf',
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

  // 4개 탭 제목
  const tabTitles = ['전면', '측면', '스펙', '특장점'];

  // 제품별 원본 이미지 소스 (imageInfos 우선)
  const baseItems = product?.imageInfos?.length
    ? product.imageInfos.map((x) => ({ src: x.src, title: x.title || '' }))
    : (product?.images || []).map((src) => ({ src, title: '' }));

  const findByKeyword = (kw) =>
    baseItems.find((it) => (it.title || '').includes(kw))?.src || null;

  // 각 탭에 매핑될 4장의 이미지(없으면 null)
  const slides = [
    { title: '전면',   src: findByKeyword('전면')   || baseItems[0]?.src || null },
    { title: '측면',   src: findByKeyword('측면')   || baseItems[1]?.src || null },
    { title: '스펙',   src: findByKeyword('스펙')   || baseItems[2]?.src || null },
    { title: '특장점', src: findByKeyword('특장점') || baseItems[3]?.src || null },
  ];

  // ✅ 항상 첫 탭('전면')에서 시작: 제품(id) 바뀔 때마다 초기화
  useEffect(() => {
    setSelectedIndex(0);
    setSelectedImage(null);
    setShowSwipeHint(true);
    setLoadedImages({});
    if (swiperRef.current?.slideTo) {
      swiperRef.current.slideTo(0, 0); // 즉시 0번으로
      // 높이 재계산
      if (swiperRef.current.updateAutoHeight) swiperRef.current.updateAutoHeight();
    }
  }, [id]);

  // 최초 힌트 3초만 표시
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  const hasImageAt = (i) => Boolean(slides[i] && slides[i].src);

  return (
    <>
      <Header />

      {/* 확대 모달 */}
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

          {selectedIndex > 0 && hasImageAt(selectedIndex - 1) && (
            <button
              className="absolute left-4 text-4xl text-gray-300 z-50"
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = selectedIndex - 1;
                setSelectedIndex(newIndex);
                setSelectedImage(slides[newIndex].src);
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

          {selectedIndex < slides.length - 1 && hasImageAt(selectedIndex + 1) && (
            <button
              className="absolute right-4 text-4xl text-gray-300 z-50"
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = selectedIndex + 1;
                setSelectedIndex(newIndex);
                setSelectedImage(slides[newIndex].src);
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

        {/* 메인 컨텐츠: 정방형, 항상 0번부터 */}
        <Swiper
          key={id}                // ✅ 제품 바뀔 때 완전 초기화
          initialSlide={0}        // ✅ 항상 첫 슬라이드
          spaceBetween={12}
          slidesPerView={1}
          autoHeight={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
        >
          {slides.map((s, idx) => (
            <SwiperSlide key={`slide-${idx}`}>
              <div className="relative rounded-xl overflow-hidden shadow">
                {s.src ? (
                  <img
                    src={s.src}
                    alt={`${product.name} - ${s.title}`}
                    className={
                      (loadedImages[idx] ? "opacity-100 " : "opacity-0 ") +
                      "w-full aspect-[1/1] object-cover rounded-2xl shadow-lg transition-opacity duration-700"
                    }
                    onLoad={() => setLoadedImages((prev) => ({ ...prev, [idx]: true }))}
                    onClick={() => { setSelectedImage(s.src); setSelectedIndex(idx); }}
                  />
                ) : (
                  <div className="w-full aspect-[1/1] rounded-2xl bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-500">
                    {s.title} 자료 준비중
                  </div>
                )}
                {idx === 0 && showSwipeHint && s.src && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm font-medium z-10">
                    이미지를 좌우로 넘겨보세요 →
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA 버튼 */}
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
