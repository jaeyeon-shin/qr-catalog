import { useParams } from 'react-router-dom';
import Header from './components/Header';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { MdChat, MdHome, MdDownload } from 'react-icons/md'; 

// 제품별 정보 정리
const productData = {
  a: {
    name: 'NC-UVA3 Max',
    description: '이건 A3 Max 프린터에 대한 설명입니다.',
    images: ['/product-a-1.JPG', '/product-a-1.JPG', '/product-a-1.JPG'], // 수정된 부분
    pdf: '/catalog-a.pdf',
  },
  b: {
    name: '제품 B',
    description: '이건 제품 B에 대한 설명입니다.',
    images: ['/product-b-1.jpg'],
    pdf: '/catalog-b.pdf',
  },
  c: {
    name: '제품 C',
    description: '이건 제품 C에 대한 설명입니다.',
    images: ['/product-c-1.jpg', '/product-c-2.png', '/product-c-3.png'],
    pdf: '/catalog-c.pdf',
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = productData[id];
  const [selectedImage, setSelectedImage] = useState(null);
  const swiperRef = useRef(null);

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <Header /> {/* 상단 로고 + 햄버거 메뉴 */}

      {/* 이미지 모달 (Swiper 바깥, 컴포넌트 최상단에 위치) */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 transition-opacity duration-300 animate-fade"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="확대 이미지"
            className="max-w-full max-h-full rounded-xl transition-transform duration-300 scale-100 hover:scale-105"
          />
        </div>
      )}

      <div className="px-6 py-6 space-y-4 max-w-md mx-auto">
        {/* 제목 */}
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {product.name}
        </h1>

        {/* 설명 */}
        <p className="text-gray-700 text-base leading-relaxed">
          {product.description}
        </p>

        {/* 이미지 슬라이드 */}
        <Swiper spaceBetween={12} slidesPerView={1}>
          {(product.images || []).map((src, idx) => (
            <SwiperSlide key={idx}>
              {/* ✅ 여기 전체를 대체 */}
              <div className="rounded-xl overflow-hidden shadow">
                <img
                  src={src}
                  alt={`${product.name} 이미지 ${idx + 1}`}
                  className="w-full aspect-square object-cover rounded-2xl shadow-lg"
                  onClick={() => setSelectedImage(src)} // 확대 이미지 클릭용
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ 썸네일 프리뷰 */}
        <div className="flex gap-2 pt-2 justify-center">
          {(product.images || []).map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`썸네일 ${idx + 1}`}
              className="w-16 h-16 object-cover rounded cursor-pointer border hover:border-blue-500"
              onClick={() => swiperRef.current?.slideTo(idx)}
            />
          ))}
        </div>

        {/* 버튼들 */}
        <div className="flex justify-between pt-4 flex-wrap gap-2">
          {/* 상담하기 버튼 */}
          <button
            className="flex-1 min-w-[100px] max-w-[160px] bg-blue-500 text-white py-2 px-3 rounded-lg shadow-sm transition active:scale-95 flex items-center justify-center gap-2 text-sm"
            onClick={() => window.open('https://nocai.co.kr/board/contact/list.html', '_blank')}
          >
            <MdChat className="text-lg" />
            상담하기
          </button>

          {/* 홈페이지 이동 */}
          <button
            className="flex-1 min-w-[100px] max-w-[160px] bg-slate-600 text-white py-2 px-3 rounded-lg shadow-sm transition active:scale-95 flex items-center justify-center gap-2 text-sm"
            onClick={() => window.open('https://nocai.co.kr/', '_blank')}
          >
            <MdHome className="text-lg" />
            홈페이지
          </button>

          {/* PDF 다운로드 */}
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
