"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

// Animation Variants
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

const Hero = () => {

  return (
    <div className="relative bg-white">
      {/* Noise Gradient Blurred Background */}
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

      {/* Main Content */}
      <motion.div
        className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 flex flex-col items-center justify-center text-center"
        style={{ minHeight: 'calc(100vh - 67px)', maxHeight: 'calc(100vh - 67px)' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Text Content */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4 sm:mb-6"
        >
          Minimal Style Tees
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-gray-600 max-w-md mb-6 sm:mb-8"
        >
          Simple, comfortable, and timeless t-shirts for every occasion.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            className="group bg-gray-900 hover:bg-gray-800 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
          >
            <Link href='/our-products'> Shop Now</Link>
            <ShoppingBag className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;