"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CollectionSection = () => {
  const collections = [
    {
      title: "Premium Tees",
      image: "https://images.unsplash.com/photo-1716951872043-9ece00ee1d90?q=80&w=2055&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Graphic Tees",
      image: "https://images.unsplash.com/photo-1533835825768-478d38555d95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Basic Tees",
      image: "https://images.unsplash.com/photo-1527280916202-fa1f7c499a7c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Limited Edition",
      image: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmclMjB3ZWJzaXRlfGVufDB8MHwwfHx8Mg%3D%3D",
    },
  ];

  return (
    <div className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 bg-white">
      {/* Noise Gradient Blurred Background - Matching Hero */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-purple-100 opacity-50"
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

      <div className="relative max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Our Collections
          </h2>
          <p className="mt-4 text-gray-600 max-w-lg mx-auto">
            Simple, comfortable, and timeless designs for every occasion.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg bg-gray-50"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <motion.img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {collection.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-0 text-gray-600 hover:text-gray-900 group-hover:underline"
                >
                  View Collection
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionSection;