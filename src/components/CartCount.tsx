'use client';

import { useEffect, useState } from 'react';

import { getCartItemCount } from '@/utils/cart';

export default function CartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Set initial count
    setCount(getCartItemCount());

    // Update count when cart changes
    const handleCartUpdate = () => {
      setCount(getCartItemCount());
    };

    window.addEventListener('cartUpdate', handleCartUpdate);
    return () => window.removeEventListener('cartUpdate', handleCartUpdate);
  }, []);

  return count > 0 ? `View Cart (${count})` : 'View Cart';
}
