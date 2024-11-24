"use client"
import Image from "next/image";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import { Product } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import { addItem } from "@/actions/redis";

export function 
ProductDetailPage({id}: {id: string}){

  const [product, setProduct] = useState<Product | null>();
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

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

  if(loading){
    return (
      <ProductDetailSkeleton/>
    )
  }

  return (
    <>
    {product && <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <Image src={product.imageUrl} className="object-cover w-full h-full" alt={product.title} width={400} height={400} />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
          </div>
          <div className="text-4xl font-bold">${product.price}</div>
          <p className="text-gray-600">
            {product.description}
          </p>

          {/* TODO: handle addToCart */}
          <Button className="w-full" size="lg" onClick={() => addItem(product.id)} 
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
          <div className="text-sm text-gray-600">
            <p>Free shipping on orders over $999</p>
            <p>30-day return policy</p>
          </div>
        </div>
      </div>
    </div>}
    </>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full h-auto rounded-lg" />
        </div>
        <div className="space-y-6">
          <div>
            <Skeleton className="h-9 w-3/4" />
          </div>
          <Skeleton className="h-12 w-1/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Button className="w-full" size="lg" disabled>
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}
