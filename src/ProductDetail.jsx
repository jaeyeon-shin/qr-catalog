import { useParams } from 'react-router-dom';
import Header from './components/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import 'swiper/css';

// 제품별 정보 정리
const productData = {
  a: {
    name: 'NC-UVA3 Max',
    description: '이건 A3 Max 프린터에 대한 설명입니다.',
    images: ['/product-a-1.png', '/product-a-2.png', '/product-a-3.png'], // 수정된 부분
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

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  return (
    <>
      <Header /> {/* 상단 로고 + 햄버거 메뉴 */}

      {/* 이미지 모달 (Swiper 바깥, 컴포넌트 최상단에 위치) */}
    {selectedImage && (
      <div
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        onClick={() => setSelectedImage(null)}
      >
        <img
          src={selectedImage}
          alt="확대 이미지"
          className="max-w-full max-h-full rounded-xl"
        />
      </div>
    )}

      <div className="px-6 py-8 space-y-8 max-w-md mx-auto">
        {/* 제목 */}
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

        {/* 설명 */}
        <p className="text-gray-700 text-base leading-relaxed">
          {product.description}
        </p>

        {/* 이미지 슬라이드 */}
        <Swiper spaceBetween={12} slidesPerView={1}>
          {(product.images || []).map((src, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={src}
                alt={`${product.name} 이미지 ${idx + 1}`}
                className="w-full aspect-video object-cover rounded-2xl shadow-lg cursor-pointer"
                onClick={() => setSelectedImage(src)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 버튼들 */}
        <div className="flex gap-3 pt-4 justify-center">
          {/* 상담하기 버튼 */}
          <button
              className="flex-1 bg-blue-500 text-white py-2 rounded text-sm"
              onClick={() => window.open('https://nocai.co.kr/board/contact/list.html', '_blank')}
          >
              상담하기
          </button>

          {/* 홈페이지 이동 */}
          <button
              className="flex-1 bg-gray-200 text-black py-2 rounded text-sm"
              onClick={() => window.open('https://nocai.co.kr/', '_blank')}
          >
              홈페이지
          </button>

          {/* PDF 다운로드 */}
          <a
              href={product.pdf}
              download
              className="flex-1 text-center bg-green-500 text-white py-2 rounded text-sm"
          >
              PDF 다운로드
          </a>
        </div>
      </div>
    </>
  );
}
