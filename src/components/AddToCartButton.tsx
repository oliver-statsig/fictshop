'use client';

import { Product } from '@/data/products';
import { addToCart } from '@/utils/cart';
import { buildProductEventMetadata, formatPriceValue } from '@/utils/demoStatsig';
import { useExperiment, useGateValue, useStatsigClient } from '@statsig/react-bindings';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const { client } = useStatsigClient();
  const twoStep = useGateValue('frontend_two_step_add_to_cart');
  const tvhExperiment = useExperiment('tvh_experiment');
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);
  const [isPrimed, setIsPrimed] = useState(false);
  const ctaText = tvhExperiment.get('button_text', 'Add to Cart');
  const price = product.salePrice ?? product.price;

  const handleClick = () => {
    if (isAdded) {
      router.push('/cart');
      return;
    }
    if (twoStep && !isPrimed) {
      setIsPrimed(true);
      return;
    }

    addToCart(product.id);
    setIsAdded(true);
    setIsPrimed(false);

    client.logEvent(
      'add_to_cart',
      formatPriceValue(price),
      buildProductEventMetadata(product.name, price),
    );
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        {isAdded
          ? 'View Cart'
          : twoStep && isPrimed
            ? 'Confirm the Reality Purchase'
            : ctaText}
      </button>
      {twoStep && !isAdded && (
        <p className="text-sm text-gray-500">
          {isPrimed
            ? 'Step 2: Whisper a promise to your future self.'
            : 'Step 1: Tap once to summon the cart goblin.'}
        </p>
      )}
    </div>
  );
}
