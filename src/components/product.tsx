import React, { useState } from 'react';
import Link from "next/link";
import { Heart, Expand } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrls: string[];
  category: string;
  sizes: string[];
  gender: string;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  product: Product;
}

export function Product({
  product: {
    id,
    imageUrls,
    category,
    title,
    price,
    description
  },
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden border border-gray-100 
        transition-all duration-300 hover:shadow-2xl hover:border-transparent 
        transform hover:scale-[1.02]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Quick Action Buttons */}
      <div className={`absolute top-4 right-4 z-10 flex flex-col gap-2 
        transition-all duration-300 
        ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="bg-white/80 backdrop-blur-sm p-2 rounded-full 
            shadow-md hover:bg-pink-50 transition-colors"
        >
          <Heart
            className={`h-5 w-5 transition-colors 
              ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-600'}`}
          />
        </button>
      </div>

      {/* Image Container */}
      <div
        className="relative overflow-hidden group/image"
        onMouseEnter={() => setCurrentImageIndex(1)}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <div className="aspect-[4/5] w-full relative">
          {imageUrls.map((url, index) => (
            <img
              key={url}
              src={url}
              alt={`${title} view ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover 
                transition-all duration-500 transform
                ${currentImageIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            />
          ))}
        </div>

        {/* View Details Overlay */}
        <Link
          href={`/product/${id}`}
          className={`absolute inset-0 bg-black/20 flex items-center justify-center 
            opacity-0 group-hover/image:opacity-100 transition-opacity duration-300`}
        >
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
            <Expand className="h-6 w-6 text-gray-800" />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <p className="text-xs font-medium text-purple-600 uppercase tracking-wider">
          {category}
        </p>
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 
          group-hover:text-purple-700 transition-colors">
          {title}
        </h3>
        <div className="flex items-baseline gap-3 mt-2">
          <p className="text-2xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 line-through">
            ${(price * 1.2).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-[4/5] w-full bg-gray-200" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-1/3 bg-gray-300" />
        <Skeleton className="h-6 w-3/4 bg-gray-300" />
        <Skeleton className="h-8 w-1/2 bg-gray-300" />
      </div>
    </div>
  );
}

export default Product;