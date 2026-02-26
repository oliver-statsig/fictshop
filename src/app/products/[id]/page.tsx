'use client';

import AddToCartButton from '@/components/AddToCartButton';
import { products } from '@/data/products';
import {
  buildProductEventMetadata,
  formatPriceValue,
  getShapeClasses,
} from '@/utils/demoStatsig';
import {
  useExperiment,
  useGateValue,
  useStatsigClient,
} from '@statsig/react-bindings';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { use, useEffect } from 'react';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const showProductReviews = useGateValue('product_reviews');
  const useLargeImage = useGateValue('product_larger_image');
  const revampExperiment = useExperiment('product_page_revamp_test');
  const tierExperiment = useExperiment('tiered_pricing_strategy_v0');
  const logoShapeExperiment = useExperiment('product_logo_icon_shapes');
  const { client } = useStatsigClient();

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    notFound();
  }

  const price = product.salePrice ?? product.price;
  const design = revampExperiment.get('design', 'original');
  const tiers = Number(tierExperiment.get('tiers', 1));
  const shapeClass = getShapeClasses(
    logoShapeExperiment.get('shape', 'rounded_square'),
  );

  useEffect(() => {
    client.logEvent(
      'product_details',
      formatPriceValue(price),
      buildProductEventMetadata(product.name, price),
    );
  }, [client, price, product.name]);

  const tierPrices = Array.from({ length: Math.min(Math.max(tiers, 1), 3) }).map(
    (_, index) => ({
      name: ['Standard', 'Prime Chaos', 'Omega Deluxe'][index],
      price: price * (1 + index * 0.25),
    }),
  );

  return (
    <div className="py-8">
      <div
        className={`grid grid-cols-1 ${
          design === 'new' ? 'lg:grid-cols-[1.2fr_0.8fr]' : 'md:grid-cols-2'
        } gap-8 mb-12`}
      >
        {/* Product Image */}
        <div className={`relative ${useLargeImage ? 'aspect-[4/5]' : 'aspect-square'}`}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className={`object-cover ${useLargeImage ? 'rounded-3xl' : 'rounded-lg'}`}
            priority
          />
          <div
            className={`absolute top-4 left-4 w-12 h-12 ${shapeClass} bg-white/80 backdrop-blur border border-white/60`}
          />
          {product.salePrice && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
              SALE!
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-baseline gap-4 mb-6">
            {product.salePrice ? (
              <>
                <span className="text-gray-500 line-through text-xl">
                  $
                  {product.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span className="text-3xl font-bold text-red-600">
                  $
                  {product.salePrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-blue-600">
                $
                {product.price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-lg mb-8">{product.description}</p>
          <AddToCartButton product={product} />

          {design === 'new' && (
            <div className="mt-8 bg-slate-50 border rounded-2xl p-5">
              <h2 className="text-xl font-semibold mb-2">Lab Notes</h2>
              <p className="text-gray-600">
                This product has been certified by the Bureau of Unhinged
                Commerce. Side effects include spontaneous jazz hands and a
                temporary immunity to boring meetings.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {tierPrices.map((tier) => (
          <div key={tier.name} className="border rounded-2xl p-5 bg-white">
            <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
            <p className="text-2xl font-bold text-blue-600 mb-2">
              ${tier.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-600">
              Includes ceremonial confetti and priority timeline reroutes.
            </p>
          </div>
        ))}
      </div>

      <div className="border rounded-2xl p-6 bg-white mb-12">
        <h2 className="text-2xl font-bold mb-3">Rate the Weirdness</h2>
        <p className="text-gray-600 mb-4">
          Help us calibrate our nonsense meters. Be honest.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() =>
              client.logEvent(
                'feedback_upvote',
                '',
                buildProductEventMetadata(product.name, price),
              )
            }
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            👍 Glorious
          </button>
          <button
            onClick={() =>
              client.logEvent(
                'feedback_downvote',
                '',
                buildProductEventMetadata(product.name, price),
              )
            }
            className="bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
          >
            👎 Cursed
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      {showProductReviews && (
        <div className="border-t pt-8">
          <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b pb-6 last:border-b-0">
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={review.rating} />
                  <span className="text-gray-600">•</span>
                  <span className="font-medium">{review.author}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-600">{review.date}</span>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
