'use client';

import { products } from '@/data/products';
import {
  buildProductEventMetadata,
  formatPriceValue,
  getDemoCountry,
  getShapeClasses,
  logStatsigLine,
} from '@/utils/demoStatsig';
import {
  useExperiment,
  useGateValue,
  useStatsigClient,
} from '@statsig/react-bindings';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 3;

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

function scoreProduct(
  name: string,
  description: string,
  query: string,
  algorithm: string,
  price: number,
) {
  if (!query) {
    return algorithm === 'backend' ? price : name.length;
  }
  const q = query.toLowerCase();
  const haystack = `${name} ${description}`.toLowerCase();
  const includes = haystack.includes(q) ? 100 : 0;
  const vowelCount = (name.match(/[aeiou]/gi) || []).length;

  if (algorithm === 'v3') {
    return includes + vowelCount * 7 + name.length;
  }
  if (algorithm === 'v2') {
    return includes + name.length * 3 + vowelCount;
  }
  return includes + name.length;
}

export default function ProductsPage({ searchParams }: Props) {
  const usePagination = useGateValue('product_listing_pagination');
  const useSearchV2 = useGateValue('new_search_algo_v2');
  const useSearchV3 = useGateValue('new_search_algo_v3');
  const backendRanking = useGateValue('backend_new_ranking_algorithm_launch');
  const largeImages = useGateValue('product_larger_image');
  const cacheExperiment = useExperiment('cdn_caching_strategy_');
  const logoShapeExperiment = useExperiment('product_logo_icon_shapes');
  const { client } = useStatsigClient();

  const { page } = use(searchParams);
  const [query, setQuery] = useState('');

  const algorithm = useSearchV3 ? 'v3' : useSearchV2 ? 'v2' : 'classic';
  const cacheStrategy = cacheExperiment.get('CacheStrategy', 'JIT');
  const shapeClass = getShapeClasses(logoShapeExperiment.get('shape', 'rounded_square'));

  useEffect(() => {
    if (!backendRanking) return;
    logStatsigLine(client, 'Request succeeded -- GET /products', {
      obj: {
        algorithm,
        cacheStrategy,
        ranking: 'backend_new_ranking_algorithm_launch',
      },
      request: {
        country: getDemoCountry(),
        method: 'GET',
        route: '/products',
        url: '/products',
      },
    });
  }, [backendRanking, algorithm, cacheStrategy, client]);

  const rankedProducts = useMemo(() => {
    const list = products
      .map((product) => {
        const price = product.salePrice ?? product.price;
        return {
          product,
          score: scoreProduct(
            product.name,
            product.description,
            query,
            algorithm === 'classic' && backendRanking ? 'backend' : algorithm,
            price,
          ),
        };
      })
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.product);

    if (!query) {
      return list;
    }

    return list.filter((product) => {
      const haystack = `${product.name} ${product.description}`.toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [query, algorithm, backendRanking]);

  const currentPage = Number(page) || 1;
  const totalPages = Math.ceil(rankedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = usePagination
    ? rankedProducts.slice(startIndex, endIndex)
    : rankedProducts;

  const imageClass = largeImages ? 'aspect-[4/5]' : 'aspect-square';
  const imageRounded = largeImages ? 'rounded-2xl' : 'rounded-lg';

  return (
    <div className="py-8">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-4xl font-bold">Our Products</h1>
        <div className="bg-slate-50 border rounded-2xl p-4 flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
          <div className="flex-1">
            <label className="text-sm font-semibold text-gray-600">
              Search the multiverse
            </label>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try 'time', 'pizza', or 'quantum'"
              className="w-full mt-2 border rounded-lg px-4 py-2"
            />
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              Algorithm: <span className="font-semibold">{algorithm}</span>
            </p>
            <p>
              Cache strategy:{' '}
              <span className="font-semibold">{cacheStrategy}</span>
            </p>
            <p>
              Backend ranking:{' '}
              <span className="font-semibold">
                {backendRanking ? 'Activated' : 'Vintage'}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((product) => {
          const price = product.salePrice ?? product.price;
          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
              onClick={() =>
                client.logEvent(
                  'product_view',
                  formatPriceValue(price),
                  buildProductEventMetadata(product.name, price),
                )
              }
            >
              <div className="border rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
                <div className={`relative ${imageClass}`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className={`object-cover group-hover:scale-105 transition-transform ${imageRounded}`}
                  />
                  <div
                    className={`absolute top-4 left-4 w-10 h-10 ${shapeClass} bg-white/70 backdrop-blur border border-white/60`}
                  />
                  {product.salePrice && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                      SALE!
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {product.name}
                  </h2>
                  <div className="flex items-baseline gap-2">
                    {product.salePrice ? (
                      <>
                        <span className="text-gray-500 line-through">
                          $
                          {product.price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        <span className="text-red-600 font-semibold">
                          $
                          {product.salePrice.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </>
                    ) : (
                      <span className="text-blue-600 font-semibold">
                        $
                        {product.price.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 line-clamp-2 mt-2">
                    {product.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {usePagination && totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/products?page=${currentPage - 1}`}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Previous
            </Link>
          )}
          <span className="px-4 py-2 text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={`/products?page=${currentPage + 1}`}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
