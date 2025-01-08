'use client';

import { useCart } from '@/utils/cart';
import { useEffect } from 'react';

export default function OrderConfirmation() {
  const { removeFromCart } = useCart();

  useEffect(() => {
    // Clear cart on mount by removing each item
    const cart = localStorage.getItem('fictshop_cart');
    if (cart) {
      const items = JSON.parse(cart);
      items.forEach((item: { productId: number }) => {
        removeFromCart(item.productId);
      });
    }
  }, [removeFromCart]);

  return 'Order Confirmed!';
}
