"use client";
import React, { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, ArrowRightIcon, ShoppingBag, Star, TrendingUp, Truck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RainbowButton } from './ui/rainbow-button';
import ShineBorder from './ui/shine-border';

const AnimatedNumber: React.FC<{ value: number, suffix?: string }> = ({ value, suffix = '' }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const displayValue = Math.round(latest * 10) / 10;
    return `${displayValue}${suffix}`;
  });

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 5,
      ease: 'easeInOut'
    });

    return controls.stop;
  }, [count, value]);

  return (
    <motion.p className="text-xl md:text-2xl font-bold text-primary">
      {rounded}
    </motion.p>
  );
};

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-blue-50">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] bg-pink-200/20 rounded-full blur-3xl" />

        {/* Animated Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px sm:30px 30px'
          }}
        />

        {/* Mesh Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-100/10 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <Badge variant="secondary" className="shadow-sm rounded-full cursor-grab text-xs sm:text-sm">
              NEW SEASON ARRIVALS
              <ArrowRightIcon className="ml-1 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ease-in-out hover:translate-x-1" />
            </Badge>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                20% OFF NEW COLLECTION
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight"
            >
              Express Your Style<br />
              <span className="text-primary">With Premium Tees</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base sm:text-lg text-gray-600 max-w-xl"
            >
              Discover our curated collection of premium cotton t-shirts,
              designed for comfort and style. Each piece is crafted with
              attention to detail and sustainable practices.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4"
            >
              <Button size="lg" className="group hover:text-black text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                Shop Collection
                <ShoppingBag className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <RainbowButton className="group bg-white text-black text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                View Lookbook
                <ArrowRight className="ml-2 h-4 w-4" />
              </RainbowButton>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <Truck className="h-4 w-4" />
                <span>Free Shipping Worldwide</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <Star className="h-4 w-4" />
                <span>Premium Cotton</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>New Designs Weekly</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative grid grid-cols-2 gap-3 sm:gap-4"
          >
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1523876701906-c72a9bb5c6e9?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="T-shirt model 1"
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1527280916202-fa1f7c499a7c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="T-shirt model 2"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden mt-12 sm:mt-16 md:mt-20"
            >
              <img
                src="https://images.unsplash.com/photo-1532202193792-e95ef22f1bce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHQlMjBzaGlydCUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
                alt="T-shirt model 3"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 z-10 hidden lg:block"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200/20">
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <AnimatedNumber value={50} suffix="K+" />
                <p className="text-xs sm:text-sm text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <AnimatedNumber value={100} suffix="+" />
                <p className="text-xs sm:text-sm text-gray-600">New Designs</p>
              </div>
              <div className="text-center">
                <AnimatedNumber value={4.9} />
                <p className="text-xs sm:text-sm text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;