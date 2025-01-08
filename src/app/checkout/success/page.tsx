import Link from 'next/link';
import OrderConfirmation from '@/components/OrderConfirmation';

const funnyConfirmations = [
  '🎉 Payment accepted! Your time machine will arrive yesterday.',
  '💫 Transaction complete! Your infinite pizza box is generating its first paradox.',
  '✨ Success! Your cloud storage is now floating somewhere over Seattle.',
  '🌟 Order confirmed! Your quantum pet portal may or may not exist until observed.',
  '🎯 Payment processed! Your universal language taste buds are being marinated.',
];

export default function CheckoutSuccessPage() {
  const confirmation =
    funnyConfirmations[Math.floor(Math.random() * funnyConfirmations.length)];

  return (
    <div className="py-16 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-600">
          <OrderConfirmation />
        </h1>
        <p className="text-2xl mb-12">{confirmation}</p>
        <div className="space-y-4">
          <p className="text-gray-600">
            Our quantum delivery system is calibrating your order. Side effects
            may include temporal displacement and spontaneous levitation.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
