'use client';

import { useEffect, useState } from 'react';

export interface CartItem {
  productId: number;
  quantity: number;
}

const CART_STORAGE_KEY = 'fictshop_cart';
const CART_CHANNEL = 'cart_updates';

function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
}

function setStoredCart(cart: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  if (typeof window !== 'undefined') {
    const channel = new BroadcastChannel(CART_CHANNEL);
    channel.postMessage({ type: 'cart_updated' });
    channel.close();
  }
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getStoredCart());

    const channel = new BroadcastChannel(CART_CHANNEL);
    const handleCartUpdate = () => {
      setCart(getStoredCart());
    };

    channel.addEventListener('message', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      channel.removeEventListener('message', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
      channel.close();
    };
  }, []);

  const addToCart = (productId: number) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.productId === productId,
      );
      if (existingItem) {
        const updatedCart = currentCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        setStoredCart(updatedCart);
        return updatedCart;
      } else {
        const updatedCart = [...currentCart, { productId, quantity: 1 }];
        setStoredCart(updatedCart);
        return updatedCart;
      }
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((currentCart) => {
      const updatedCart = currentCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      );
      setStoredCart(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart) => {
      const updatedCart = currentCart.filter(
        (item) => item.productId !== productId,
      );
      setStoredCart(updatedCart);
      return updatedCart;
    });
  };

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return {
    cart,
    itemCount,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
}
