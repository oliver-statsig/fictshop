import AddToCartButton from '@/components/AddToCartButton';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    notFound();
  }

  return (
    <div className="py-8">
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
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
