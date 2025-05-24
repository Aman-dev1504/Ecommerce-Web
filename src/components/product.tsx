"use client"
import Link from "next/link";
import { Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Product } from "@prisma/client";
import { useState } from "react";

interface Props {
  product: Product;
}

export function Product({ product }: Props) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm 
                   shadow-sm hover:bg-gray-100 transition-colors"
      >
        <Heart
          className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </button>

      {/* Product Link */}
      <Link href={`/product/${product.id}`} className="block space-y-3">
        {/* Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-50">
          <img
            src={product.imageUrls[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500">{product.category}</p>
          <h3 className="font-medium text-gray-900 line-clamp-1">{product.title}</h3>
          <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-square rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/4" />
      </div>
    </div>
  );
}