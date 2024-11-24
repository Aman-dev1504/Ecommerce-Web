"use client"
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from "./product";

const tabs = [
  { id: "casual", label: "Casual" },
  { id: "graphic", label: "Graphic" },
  { id: "sports", label: "Sports" },
  { id: "polo", label: "Polo" },
  { id: "limited_edition", label: "Limited" },
];

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



const ProductCardSkeleton = () => (
  <div className="w-full">
    <div className="aspect-square bg-gray-100 rounded-md animate-pulse" />
    <div className="mt-3 h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
    <div className="mt-1 h-4 bg-gray-100 rounded w-1/3 animate-pulse" />
    <div className="mt-2 h-7 bg-gray-100 rounded-md animate-pulse" />
  </div>
);

function PopularProducts() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${activeTab}`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const products = await response.json();
        setData(products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">
            Popular Products
          </h2>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex gap-3 bg-gray-100/50 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-3 py-1 rounded-md text-xs
                  transition-all duration-300 relative
                  ${activeTab === tab.id ? 'text-white' : 'text-black hover:text-black/70'}
                `}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tabBackground"
                    className="absolute inset-0 bg-purple-600 rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {loading
              ? Array().fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
              : data.map((product) => (
                <Product key={product.id} product={product} />
              ))
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PopularProducts;