"use client"
import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { addItem } from "@/actions/redis";

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
      key={id}
      className={`relative bg-white p-6 rounded-xl transform transition-all duration-300 
        ${isHovered ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >


      {/* Quick Action Buttons */}
      <div className={`absolute right-4 flex flex-col gap-2 transition-all duration-300 
        ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-600'}`}
          />
        </button>
        <button className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors">
          <Share2 className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <Link
        href={`/product/${id}`}
        className="block"
      >
        {/* Image Container */}
        <div
          className="relative overflow-hidden rounded-lg mb-4 group"
          onMouseEnter={() => setCurrentImageIndex(1)}
          onMouseLeave={() => setCurrentImageIndex(0)}
        >
          <div className="aspect-square w-full relative">
            {imageUrls.map((url, index) => (
              <img
                key={url}
                src={url}
                alt={`${title} view ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 transform
                  ${currentImageIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
              />
            ))}
          </div>

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-purple-600 uppercase tracking-wider">
            {category}
          </p>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-purple-700 transition-colors">
            {title}
          </h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 line-through">
              ${(price * 1.2).toFixed(2)}
            </p>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <Button
        onClick={() => addItem(id)}
        className={`w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 
          transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'}`}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="aspect-square w-full mb-4">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

export default Product;