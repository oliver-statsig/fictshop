import CheckoutCart from '@/components/CheckoutCart';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <Link
              href="/checkout/success"
              className="block w-full bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors text-center mt-6"
            >
              Complete Purchase
            </Link>
          </div>
        </div>

        <CheckoutCart />
      </div>
    </div>
  );
}
