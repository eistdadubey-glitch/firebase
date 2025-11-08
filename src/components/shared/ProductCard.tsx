import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const productImage = PlaceHolderImages.find(p => p.id === product.images[0]);
  
  return (
    <Link href={`/collections/${product.slug}`}>
      <Card className="group w-full overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 border-none bg-card">
        <CardHeader className="p-0">
          <div className="aspect-[3/4] relative overflow-hidden">
            {productImage && (
              <Image
                src={productImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={productImage.imageHint}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold font-body tracking-tight truncate">{product.name}</CardTitle>
          <CardDescription className="mt-2 text-base font-bold text-primary">
            ${product.price.toFixed(2)}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
