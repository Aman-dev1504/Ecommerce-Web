"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';

const CollectionSection = () => {
  const collections = [
    {
      title: "Premium Tees",
      image: "https://images.unsplash.com/photo-1716951872043-9ece00ee1d90?q=80&w=2055&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Luxury cotton blend t-shirts",
      items: 42,
      span: true,
      gradient: "from-purple-600/20 to-indigo-600/20"
    },
    {
      title: "Graphic Tees",
      image: "https://images.unsplash.com/photo-1533835825768-478d38555d95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Artist-designed graphics",
      items: 28,
      gradient: "from-rose-600/20 to-orange-600/20"
    },
    {
      title: "Basic Tees",
      image: "https://images.unsplash.com/photo-1527280916202-fa1f7c499a7c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Essential everyday wear",
      items: 35,
      gradient: "from-blue-600/20 to-cyan-600/20"
    },
    {
      title: "Limited Edition",
      image: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhpbmclMjB3ZWJzaXRlfGVufDB8MHwwfHx8Mg%3D%3D",
      description: "Exclusive designs",
      items: 12,
      span: true,
      gradient: "from-emerald-600/20 to-teal-600/20"
    }
  ];


  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-purple-200/20 to-indigo-200/20 rounded-full blur-2xl" />
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 rotate-45 w-16 h-16 bg-gradient-to-r from-pink-200/20 to-rose-200/20 rounded-lg blur-xl" />

          {/* Main heading */}
          <div className="relative inline-block">
            <motion.span
              className="block text-3xl font-bold tracking-tight text-gray-900 mb-3"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Our Collections
            </motion.span>

            {/* Sketchy underline SVG */}
            <motion.svg
              viewBox="0 0 200 8"
              className="absolute -bottom-2 left-0 w-full h-4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.path
                d="M0,5 C50,0 50,8 100,5 C150,2 150,7 200,5"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                className="path"
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#9E7AFF" />
                  <stop offset="50%" stopColor="#9E7AfF" />
                  <stop offset="100%" stopColor="#9E7AFF" />
                </linearGradient>
              </defs>
            </motion.svg>
          </div>

          {/* Subtitle */}
          <motion.p
            className="mt-4 text-md text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore our curated selection of premium t&#8209;shirts crafted for
            <span className="relative inline-block mx-2">
              <span className="relative z-10">style</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-indigo-100 -rotate-1" />
            </span>
            and
            <span className="relative inline-block mx-2">
              <span className="relative z-10">comfort</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-purple-100 rotate-1" />
            </span>
          </motion.p>
        </motion.div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 cursor-pointer">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              className={`group relative overflow-hidden rounded-2xl ${collection.span ? 'md:col-span-2' : ''} bg-black`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`aspect-[16/10] ${collection.span ? 'aspect-[16/6]' : 'aspect-[16/9]'} relative`}>
                {/* Background Image with Hover Effect */}
                <motion.img
                  src={collection.image}
                  alt={collection.title}
                  className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out opacity-80 group-hover:opacity-60"
                />

                {/* Multiple Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

                <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} mix-blend-soft-light group-hover:opacity-60 transition-all duration-500`} />

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />

                {/* Content Container */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/10 backdrop-blur-md rounded-full px-3 py-0.5 text-sm font-medium text-white border border-white/20"
                    >
                      {collection.items} Items
                    </motion.div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      className="bg-white/10 backdrop-blur-md p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>

                  {/* Bottom Section */}
                  <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors duration-300">
                      {collection.title}
                    </h3>
                    <p className="text-white/80 text-xs md:text-sm max-w-[80%] transform opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {collection.description}
                    </p>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-2 text-white/80 group-hover:text-white transition-colors duration-300"
                    >
                      <span className="text-xs md:text-sm font-medium transform translate-x-0 group-hover:translate-x-2 transition-transform duration-500 delay-150">View Collection</span>
                      <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 transform translate-x-0 group-hover:translate-x-3 group-hover:-translate-y-1 transition-transform duration-500 delay-150" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionSection;