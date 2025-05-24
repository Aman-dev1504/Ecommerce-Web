"use client"
import Image from "next/image";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star, Check } from "lucide-react"
import { Product } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import { addItem } from "@/actions/redis";

export function ProductDetailPage({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/product/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch the product");
      }
      const data = await response.json();
      setProduct(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) {
    return <ProductDetailSkeleton />
  }

  if (!product) {
    return <div className="text-center py-12 text-gray-500">Product not found</div>
  }

  return (
    <div className="relative w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 bg-white">
      {/* Noise Gradient Blurred Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-60"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-50">
              <Image
                src={product.imageUrls[currentImageIndex]}
                className="object-cover w-full h-full"
                alt={product.title}
                width={600}
                height={600}
                priority
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {product.imageUrls.map((url, index) => (
                <button
                  key={url}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-12 h-12 rounded-md overflow-hidden transition-all
                    ${currentImageIndex === index ? 'ring-2 ring-gray-900' : 'opacity-70 hover:opacity-100'}`}
                >
                  <Image
                    src={url}
                    alt={`Thumbnail ${index + 1}`}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                {product.category} / {product.gender}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.title}</h1>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl font-medium text-gray-900">${product.price.toFixed(2)}</span>
              <div className="flex items-center text-gray-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm ml-1">5.0</span>
              </div>
            </div>

            <p className="text-gray-600">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="pt-2">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-sm rounded-md border transition-all
                      ${selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-800 border-gray-200 hover:border-gray-900'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              className="w-full mt-6"
              size="lg"
              onClick={() => selectedSize && addItem(product.id)}
              disabled={!selectedSize}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {selectedSize ? 'Add to Cart' : 'Select Size'}
            </Button>

            {/* Product Highlights */}
            <div className="pt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 text-gray-500" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 text-gray-500" />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="relative w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 bg-white">
      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="flex gap-2">
              {[1, 2, 3].map(item => (
                <Skeleton key={item} className="w-12 h-12 rounded-md" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-8 w-3/4" />
            </div>
            <Skeleton className="h-6 w-1/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div>
              <Skeleton className="h-4 w-1/6 mb-2" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map(item => (
                  <Skeleton key={item} className="h-8 w-12 rounded-md" />
                ))}
              </div>
            </div>
            <Skeleton className="h-10 w-full mt-6" />
            <div className="space-y-3 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}