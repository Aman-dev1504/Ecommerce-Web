"use client"
import Image from "next/image";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star, Check, Share2 } from "lucide-react"
import { Product } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import { addItem } from "@/actions/redis";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';
export function ProductDetailPage({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareButtons, setShowShareButtons] = useState(false);

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
    return <div>Product not found</div>
  }
  const productUrl = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] relative overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={product.imageUrls[currentImageIndex]}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
              alt={product.title}
              width={500}
              height={625}
              priority
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex justify-center space-x-4">
            {product.imageUrls.map((url, index) => (
              <div
                key={url}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer 
                  border-2 transition-all 
                  ${currentImageIndex === index ? 'border-purple-600' : 'border-transparent'}`}
              >
                <Image
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm uppercase tracking-wider text-purple-600 mb-2">
                {product.category} • {product.gender}
              </p>
              <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
            </div>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShareButtons(!showShareButtons)}
              >
                <Share2 className="h-6 w-6" />
              </Button>
              {showShareButtons && (
                <div className="absolute top-full right-0 mt-2 z-10 flex space-x-2 bg-white p-2 rounded-lg shadow-lg">
                  <FacebookShareButton url={productUrl}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={productUrl} title={product.title}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton url={productUrl} title={product.title}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <div className="flex items-center text-yellow-500">
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <span className="text-gray-600 ml-2">(5.0)</span>
            </div>
          </div>

          <p className="text-gray-600">
            {product.description}
          </p>

          {/* Size Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Select Size</h3>
            <div className="flex gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-all
                    ${selectedSize === size
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-800 border-gray-300 hover:border-purple-600'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            className="w-full"
            size="lg"
            onClick={() => selectedSize && addItem(product.id)}
            disabled={!selectedSize}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {selectedSize ? 'Add to Cart' : 'Select Size'}
          </Button>

          {/* Product Highlights */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Sustainable & eco-friendly materials</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>30-day hassle-free returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
          <div className="flex justify-center space-x-4">
            {[1, 2].map(item => (
              <Skeleton key={item} className="w-16 h-16 rounded-lg" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-12 w-3/4" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div>
            <Skeleton className="h-6 w-1/4 mb-3" />
            <div className="flex gap-3">
              {[1, 2, 3, 4].map(item => (
                <Skeleton key={item} className="h-10 w-16" />
              ))}
            </div>
          </div>
          <Skeleton className="h-12 w-full" />
          <div className="space-y-2">
            {[1, 2, 3].map(item => (
              <Skeleton key={item} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage;