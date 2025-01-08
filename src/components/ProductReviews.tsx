'use client';

import { Product } from '@/data/products';
import { useGateValue } from '@statsig/react-bindings';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductReviews({ product }: { product: Product }) {
  const showProductReviews = useGateValue('product_reviews');

  return (
    showProductReviews && (
      <div className="border-t pt-8">
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {product.reviews.map((review, index) => (
            <div key={index} className="border-b pb-6 last:border-b-0">
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={review.rating} />
                <span className="text-gray-600">•</span>
                <span className="font-medium">{review.author}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600">{review.date}</span>
              </div>
              <p className="text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
