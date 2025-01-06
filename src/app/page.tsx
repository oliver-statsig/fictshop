import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';

export default function Home() {
  // Using the Time Machine as our featured product
  const featuredProduct = products[1]; // Pocket Time Machine

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to FictShop</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Where the impossible is just temporarily out of stock. We sell products that shouldn&apos;t exist, 
              but somehow do (in our imagination). Our legal team advises us to mention that time paradoxes 
              are not covered under warranty.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Product */}
      <div className="py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-square">
              <Image
                src={featuredProduct.imageUrl}
                alt={featuredProduct.name}
                fill
                className="object-cover"
                priority
              />
              {featuredProduct.salePrice && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                  SALE!
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">{featuredProduct.name}</h2>
              <div className="mb-4">
                <span className="text-gray-500 line-through text-xl">
                  ${featuredProduct.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                {featuredProduct.salePrice && (
                  <span className="text-3xl font-bold text-red-500 ml-4">
                    ${featuredProduct.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-8">{featuredProduct.description}</p>
              <Link 
                href={`/products/${featuredProduct.id}`}
                className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors text-center mb-4"
              >
                Time Travel Now!
              </Link>
            </div>
          </div>
        </div>

        {/* View All Products Link */}
        <div className="text-center mt-8">
          <Link 
            href="/products"
            className="inline-flex items-center justify-center bg-indigo-50 text-indigo-600 py-4 px-8 rounded-lg text-xl font-semibold hover:bg-indigo-100 transition-colors group"
          >
            View All Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
