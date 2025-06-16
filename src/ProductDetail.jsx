import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// 제품별 정보 정리
const productData = {
  a: {
    name: '제품 A',
    description: '이건 제품 A에 대한 설명입니다.',
    images: ['/product-a-1.jpg', '/product-a-2.png'], // 수정된 부분
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

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* 제품명 + 설명 */}
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>

      {/* 이미지 슬라이드 */}
      <Swiper spaceBetween={10} slidesPerView={1}>
        {(product.images || []).map((src, idx) => (
          <SwiperSlide key={idx}>
            <img src={src} alt={`${product.name} 이미지 ${idx + 1}`} className="w-full rounded" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 버튼들 */}
      <div className="space-y-2 pt-4">
        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={() => window.open('https://nocai.co.kr/board/contact/list.html', '_blank')}
        >
          상담하기
        </button>

        <button
          className="w-full bg-gray-200 py-2 rounded"
          onClick={() => window.open('https://nocai.co.kr/', '_blank')}
        >
          홈페이지
        </button>

        <a
          href={product.pdf}
          download
          className="block w-full text-center bg-green-500 text-white py-2 rounded"
        >
          PDF 다운로드
        </a>
      </div>
    </div>
  );
}
