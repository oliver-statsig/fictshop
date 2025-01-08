import CartComponent from '@/components/CartComponent';
import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <CartComponent />
      <div className="flex justify-end mt-6">
        <Link
          href="/checkout"
          className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
