import { useParams } from 'react-router-dom';

// 제품별 정보 정리 (이미지 + 설명 + PDF 파일)
const productData = {
  a: {
    name: '제품 A',
    description: '이건 제품 A에 대한 설명입니다.',
    image: '/product-a.jpg',
    pdf: '/catalog-a.pdf',
  },
  b: {
    name: '제품 B',
    description: '이건 제품 B에 대한 설명입니다.',
    image: '/product-b.jpg',
    pdf: '/catalog-b.pdf',
  },
  c: {
    name: '제품 C',
    description: '이건 제품 C에 대한 설명입니다.',
    image: '/product-c.jpg',
    pdf: '/catalog-c.pdf',
  },
};

export default function ProductDetail() {
  const { id } = useParams(); // URL에서 :id 추출
  const product = productData[id]; // 해당 id의 제품 정보 가져오기

  if (!product) return <div className="p-4">제품 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      {/* 제품명 + 설명 */}
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>

      {/* 제품 이미지 */}
      <img src={product.image} alt={product.name} className="w-full rounded" />

      {/* 버튼들 */}
      <div className="space-y-2 pt-4">
        {/* 상담하기 버튼 */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={() => window.open('https://nocai.co.kr/board/contact/list.html', '_blank')}
        >
          상담하기
        </button>

        {/* 홈페이지 이동 */}
        <button
          className="w-full bg-gray-200 py-2 rounded"
          onClick={() => window.open('https://nocai.co.kr/', '_blank')}
        >
          홈페이지
        </button>

        {/* PDF 다운로드 */}
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
