import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';

export default function ProductsPage() {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link 
            key={product.id} 
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="border rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative aspect-square">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                {product.salePrice && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                    SALE!
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <div className="flex items-baseline gap-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-gray-500 line-through">
                        ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-red-600 font-semibold">
                        ${product.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </>
                  ) : (
                    <span className="text-blue-600 font-semibold">
                      ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 line-clamp-2 mt-2">{product.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 