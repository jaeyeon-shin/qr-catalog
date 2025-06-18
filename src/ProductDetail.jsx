import { useParams } from 'react-router-dom';
import Header from './components/Header';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MdChat, MdHome, MdDownload } from 'react-icons/md';

const productData = {
  a: {
    name: 'NC-UVA3 Max',
    images: ['/product-a-1.webp', '/product-a-2.JPG', '/product-a-3.JPG', '/product-a-4.JPG', '/product-a-5.JPG'],
    pdf: '/catalog-a.pdf',
  },
  b: {
    name: 'test2',
    images: ['/product-b-1.jpg'],
    pdf: '/catalog-b.pdf',
  },
  c: {
    name: 'test3',
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

  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <Header />

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
          {/* X 닫기 버튼 */}
          <button
            className="absolute top-4 right-4 text-3xl text-gray-300 z-50"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          {/* 왼쪽 화살표 */}
          {selectedIndex > 0 && (
            <button
              className="absolute left-4 text-4xl text-gray-300 z-50"
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = selectedIndex - 1;
                setSelectedIndex(newIndex);
                setSelectedImage(product.images[newIndex]);
                swiperRef.current?.slideTo(newIndex);
              }}
            >
              ‹
            </button>
          )}

          {/* 확대 이미지 */}
          <img
            src={selectedImage}
            alt="확대 이미지"
            className="max-w-full max-h-full rounded-xl"
          />

          {/* 오른쪽 화살표 */}
          {selectedIndex < product.images.length - 1 && (
            <button
              className="absolute right-4 text-4xl text-gray-300 z-50"
              onClick={(e) => {
                e.stopPropagation();
                const newIndex = selectedIndex + 1;
                setSelectedIndex(newIndex);
                setSelectedImage(product.images[newIndex]);
                swiperRef.current?.slideTo(newIndex);
              }}
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

        <Swiper
          spaceBetween={12}
          slidesPerView={1}
          autoHeight={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
        >
          {(product.images || []).map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative rounded-xl overflow-hidden shadow">
                <img
                  src={src}
                  alt={`${product.name} 이미지 ${idx + 1}`}
                  className={`w-full aspect-[4/3] object-cover rounded-2xl shadow-lg transition-opacity duration-700 ${
                    loadedImages[idx] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setLoadedImages((prev) => ({ ...prev, [idx]: true }))}
                  onClick={() => {
                    setSelectedImage(src);
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

        <div className="flex gap-2 pt-2 justify-center">
          {(product.images || []).map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`썸네일 ${idx + 1}`}
              className={`w-16 h-16 object-cover rounded border cursor-pointer transition ${
                selectedIndex === idx ? 'border-blue-500' : 'border-gray-300'
              }`}
              onClick={() => {
                swiperRef.current?.slideTo(idx);
                setSelectedIndex(idx);
              }}
            />
          ))}
        </div>

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
