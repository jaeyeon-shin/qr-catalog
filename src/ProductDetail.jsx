import { useParams } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MdChat, MdHome, MdDownload } from 'react-icons/md';

/**
 * ✅ 이미지별 제목을 넣고 싶으면 imageInfos를 사용하세요.
 *   - imageInfos: [{ src: '...', title: '전면 이미지' }, ...]
 *   - imageInfos가 없으면 기존 images 배열을 사용하고 제목은 자동으로 "이미지 1, 2..."로 생성됩니다.
 */
const productData = {
  "9060_visual": {
    name: 'NC-UV9060 Visual',
    imageInfos: [
      { src: '/product-a-1.webp', title: '전면 이미지' },
      { src: '/product-a-2.JPG',  title: '측면 이미지' },
      { src: '/product-a-3.JPG',  title: '상단 디테일' },
      { src: '/product-a-4.JPG',  title: '컨트롤 패널' },
      { src: '/product-a-5.JPG',  title: '출력 샘플' },
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

  // 이미지/제목 소스 통합 (imageInfos 우선, 없으면 images로 대체)
  const slides = (product?.imageInfos?.length
    ? product.imageInfos
    : (product?.images || []).map((src, i) => ({ src, title: `이미지 ${i + 1}` }))
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <Header />

      {/* 확대 보기 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
          onClick={() => setSelectedImage(null)}
        >
          {/* 닫기 */}
          <button
            className="absolute top-4 right-4 text-3xl text-gray-300 z-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="닫기"
          >
            ×
          </button>

          {/* 이전 */}
          {selectedIndex > 0 && (
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

          {/* 이미지 */}
          <img
            src={selectedImage}
            alt="확대 이미지"
            className="max-w-full max-h-full rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* 다음 */}
          {selectedIndex < slides.length - 1 && (
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
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {product.name}
        </h1>

        {/* ✅ 이미지 소제목 탭 (슬라이드 위) */}
        <div className="w-full overflow-x-auto">
          <div className="flex items-center gap-2 pb-1">
            {slides.map((s, idx) => {
              const active = idx === selectedIndex;
              return (
                <button
                  key={`tab-${idx}-${s.src}`}
                  onClick={() => {
                    swiperRef.current?.slideTo(idx);
                    setSelectedIndex(idx);
                  }}
                  className={
                    (active
                      ? "bg-blue-600 text-white border-blue-600 "
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 ") +
                    "whitespace-nowrap rounded-full border px-3 py-1 text-sm transition"
                  }
                  aria-current={active ? "true" : "false"}
                >
                  {s.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* 메인 이미지: 정방형(aspect-ratio 1/1) */}
        <Swiper
          spaceBetween={12}
          slidesPerView={1}
          autoHeight={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
        >
          {slides.map((s, idx) => (
            <SwiperSlide key={`slide-${idx}-${s.src}`}>
              <div className="relative rounded-xl overflow-hidden shadow">
                <img
                  src={s.src}
                  alt={`${product.name} - ${s.title}`}
                  className={
                    (loadedImages[idx] ? "opacity-100 " : "opacity-0 ") +
                    "w-full aspect-[1/1] object-cover rounded-2xl shadow-lg transition-opacity duration-700"
                  }
                  onLoad={() => setLoadedImages((prev) => ({ ...prev, [idx]: true }))}
                  onClick={() => {
                    setSelectedImage(s.src);
                    setSelectedIndex(idx);
                  }}
                />
                {idx === 0 && showSwipeHint && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm font-medium z-10">
                    이미지를 좌우로 넘겨보세요 →
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ⛔️ 썸네일(미리보기) 및 탭 아래 보조 텍스트 제거됨 */}

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
