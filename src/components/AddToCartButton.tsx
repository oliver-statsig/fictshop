'use client';

import { addToCart } from '@/utils/cart';

interface Props {
  productId: number;
}

export default function AddToCartButton({ productId }: Props) {
  const handleAddToCart = () => {
    addToCart(productId);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
    >
      Add to Cart
    </button>
  );
} 