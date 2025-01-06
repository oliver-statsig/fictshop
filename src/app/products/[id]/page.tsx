import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const {id} = await params;
  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-blue-600 mb-6">
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-gray-600 text-lg mb-8">{product.description}</p>
            <button 
              className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              //onClick={() => alert('Added to cart (not implemented)')}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 