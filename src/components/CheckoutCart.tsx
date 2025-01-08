'use client';

import { products } from '@/data/products';
import { useCart } from '@/utils/cart';

export default function CheckoutCart() {
  const { cart } = useCart();

  const cartItems = cart.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  }));

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.productId} className="flex justify-between">
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span className="font-semibold">
              $
              {(
                (item.product.salePrice || item.product.price) * item.quantity
              ).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>
            ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
