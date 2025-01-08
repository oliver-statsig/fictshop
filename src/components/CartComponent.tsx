'use client';

import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { useCart } from '@/utils/cart';

export default function CartComponent() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const cartItems = cart.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  }));

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <Link
          href="/products"
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {cartItems.map((item) => (
        <div key={item.productId} className="flex gap-6 border rounded-lg p-4">
          <div className="relative w-32 h-32">
            <Image
              src={item.product.imageUrl}
              alt={item.product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-2">{item.product.name}</h2>
            <p className="text-blue-600 font-semibold mb-2">
              $
              {(item.product.salePrice || item.product.price).toLocaleString(
                'en-US',
                { minimumFractionDigits: 2 },
              )}
            </p>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                Quantity:
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.productId, parseInt(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1"
                />
              </label>
              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">
              $
              {(
                (item.product.salePrice || item.product.price) * item.quantity
              ).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      ))}

      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">Subtotal</span>
          <span className="text-2xl font-bold">
            ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
