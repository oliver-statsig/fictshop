'use client';

import { CartItem, getCart, removeFromCart, updateCartItemQuantity } from '@/utils/cart';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';

interface CartItemWithProduct extends CartItem {
  product: typeof products[0];
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      const cart = getCart();
      const itemsWithProducts = cart.map(item => ({
        ...item,
        product: products.find(p => p.id === item.productId)!
      }));
      setCartItems(itemsWithProducts);
      setIsLoading(false);
    };

    loadCart();
    window.addEventListener('cartUpdate', loadCart);
    return () => window.removeEventListener('cartUpdate', loadCart);
  }, []);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + (price * item.quantity);
  }, 0);

  if (isLoading) {
    return <div className="py-8 text-center">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
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
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <div className="space-y-6">
        {cartItems.map(item => (
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
                ${(item.product.salePrice || item.product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                    className="w-16 border rounded px-2 py-1"
                  />
                </label>
                <button
                  onClick={() => handleRemove(item.productId)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                ${((item.product.salePrice || item.product.price) * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-semibold">Subtotal</span>
          <span className="text-2xl font-bold">
            ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => alert('Checkout functionality coming soon!')}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
} 