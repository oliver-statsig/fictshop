'use client';

import { addToCart } from '@/utils/cart';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  productId: number;
}

export default function AddToCartButton({ productId }: Props) {
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    if (isAdded) {
      router.push('/cart');
    } else {
      addToCart(productId);
      setIsAdded(true);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
    >
      {isAdded ? 'View Cart' : 'Add to Cart'}
    </button>
  );
} 