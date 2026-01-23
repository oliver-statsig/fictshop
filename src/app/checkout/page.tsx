'use client';

import { products } from '@/data/products';
import { buildBaseEventMetadata } from '@/utils/demoStatsig';
import { useExperiment, useStatsigClient } from '@statsig/react-bindings';
import { getCart } from '@/utils/cart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { client } = useStatsigClient();
  const signupExperiment = useExperiment('new_user_signup_flow');
  const signupFlow = signupExperiment.get('singup_flow_version', 'version_0');

  const cart = getCart();
  const cartItems = cart.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  }));

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product.salePrice || item.product.price;
    return total + price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleCompletePurchase = () => {
    client.logEvent('checkout_event', '1', buildBaseEventMetadata());
    router.push('/checkout/success');
  };

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    (item.product.salePrice || item.product.price) *
                    item.quantity
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

        <div>
          <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                className="w-full border rounded-lg px-3 py-2"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  name="cvc"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="123"
                />
              </div>
            </div>
            <div className="border rounded-lg p-4 bg-slate-50">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Signup flow: {signupFlow}
              </h3>
              {signupFlow === 'version_1' ? (
                <p className="text-sm text-gray-600">
                  You agree to the Temporal Loyalty Oath and accept promotional
                  rifts in your inbox.
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  You consent to receive coupons from alternate dimensions.
                </p>
              )}
            </div>
            <button
              onClick={handleCompletePurchase}
              className="block w-full bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors text-center mt-6"
            >
              Complete Purchase
            </button>
            <Link
              href="/cart"
              className="text-sm text-gray-500 hover:text-gray-700 block text-center"
            >
              Return to cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
