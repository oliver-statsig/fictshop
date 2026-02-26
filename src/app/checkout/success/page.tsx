'use client';

import { buildBaseEventMetadata, logStatsigLine } from '@/utils/demoStatsig';
import { useStatsigClient } from '@statsig/react-bindings';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const funnyConfirmations = [
  '🎉 Payment accepted! Your time machine will arrive yesterday.',
  '💫 Transaction complete! Your infinite pizza box is generating its first paradox.',
  '✨ Success! Your cloud storage is now floating somewhere over Seattle.',
  '🌟 Order confirmed! Your quantum pet portal may or may not exist until observed.',
  '🎯 Payment processed! Your universal language taste buds are being marinated.',
];

export default function CheckoutSuccessPage() {
  const { client } = useStatsigClient();
  const [message] = useState(
    () => funnyConfirmations[Math.floor(Math.random() * funnyConfirmations.length)],
  );

  useEffect(() => {
    // Clear cart on mount
    localStorage.removeItem('fictshop_cart');
    window.dispatchEvent(new Event('cartUpdate'));

    logStatsigLine(client, 'Request succeeded -- POST /checkout/confirm', {
      obj: {
        note: 'Payment confirmed and confetti cannons armed.',
      },
      request: {
        method: 'POST',
        route: '/checkout/confirm',
        url: '/checkout/success',
        ...buildBaseEventMetadata(),
      },
    });
  }, [client]);

  return (
    <div className="py-16 text-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-600">
          Order Confirmed!
        </h1>
        <p className="text-2xl mb-12">{message}</p>
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
