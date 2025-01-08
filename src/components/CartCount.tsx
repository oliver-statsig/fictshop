'use client';

import { useCart } from '@/utils/cart';

export default function CartCount() {
  const { itemCount } = useCart();
  return itemCount > 0 ? `View Cart (${itemCount})` : 'View Cart';
}
