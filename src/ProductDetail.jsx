import { useParams } from 'react-router-dom';
import Header from './components/Header';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // ✅ 추가
import 'swiper/css';
import 'swiper/css/navigation'; // ✅ 추가
import { MdChat, MdHome, MdDownload } from 'react-icons/md';

const productData = {
  a: {
    name: 'NC-UVA3 Max',
    images: ['/product-a-1.JPG', '/product-a-2.JPG', '/product-a-3.JPG', '/product-a-4.JPG', '/product-a-5.JPG'],
    pdf: '/catalog-a.pdf',
  },
  b: {
    name: '제품 B',
    images: ['/product-b-1.jpg'],
    pdf: '/catalog-b.pdf',
  },
  c: {
    name: '제품 C',
    images: ['/product-c-1.jpg', '/product-c-2.png', '/product-c-3.png'],
    pdf: '/catalog-c.pdf',
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = productData[id];
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swiperRef = useRef(null);

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <Header />

      {/* 이미지 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
        >
          {/* 닫기 버튼 */}
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          {/* 왼쪽 화살표 */}
          {selectedIndex > 0 && (
            <button
              className="absolute left-4 text-3xl text-gray-300"
              onClick={() => {
                const prev = selectedIndex - 1;
                swiperRef.current?.slideTo(prev);
                setSelectedImage(product.images[prev]);
                setSelectedIndex(prev);
              }}
            >
              ‹
            </button>
          )}

          {/* 이미지 */}
          <img
            src={selectedImage}
            alt="확대 이미지"
            className="max-w-full max-h-full rounded-xl transition-transform duration-300"
          />

          {/* 오른쪽 화살표 */}
          {selectedIndex < product.images.length - 1 && (
            <button
              className="absolute right-4 text-3xl text-gray-300"
              onClick={() => {
                const next = selectedIndex + 1;
                swiperRef.current?.slideTo(next);
                setSelectedImage(product.images[next]);
                setSelectedIndex(next);
              }}
            >
              ›
            </button>
          )}
        </div>
      )}


      <div className="px-4 py-4 space-y-4 max-w-md mx-auto">
        {/* 제목 */}
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {product.name}
        </h1>

        {/* 이미지 슬라이드 */}
        <Swiper
          spaceBetween={12}
          slidesPerView={1}
          navigation={true} // ✅ 네비게이션 활성화
          modules={[Navigation]} // ✅ 네비게이션 모듈 적용
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
        >
          {(product.images || []).map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="rounded-xl overflow-hidden shadow">
                <img
                  src={src}
                  alt={`${product.name} 이미지 ${idx + 1}`}
                  className="w-full aspect-square object-cover rounded-2xl shadow-lg"
                  onClick={() => {
                    setSelectedImage(src);
                    setSelectedIndex(idx);
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 썸네일 프리뷰 */}
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

        {/* 버튼들 */}
        <div className="flex justify-between pt-4 flex-wrap gap-2">
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

          <a
            href={product.pdf}
            download
            className="flex-1 min-w-[100px] max-w-[160px] bg-green-500 text-white py-2 px-3 rounded-lg shadow-sm transition active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <MdDownload className="text-lg" />
            상세정보
          </a>
        </div>
      </div>
    </>
  );
}
