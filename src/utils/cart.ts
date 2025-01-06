export interface CartItem {
  productId: number;
  quantity: number;
}

const CART_STORAGE_KEY = 'fictshop_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_STORAGE_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function addToCart(productId: number) {
  const cart = getCart();
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  dispatchCartEvent();
}

export function updateCartItemQuantity(productId: number, quantity: number) {
  const cart = getCart();
  const item = cart.find(item => item.productId === productId);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      dispatchCartEvent();
    }
  }
}

export function removeFromCart(productId: number) {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.productId !== productId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
  dispatchCartEvent();
}

export function getCartItemCount(): number {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

// Custom event to notify components when cart changes
export function dispatchCartEvent() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdate'));
  }
} 