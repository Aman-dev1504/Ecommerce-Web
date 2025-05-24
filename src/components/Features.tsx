"use client";
import React from 'react';
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Clock, LucideIcon } from 'lucide-react';

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}

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

const Feature: React.FC<FeatureProps> = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    variants={itemVariants}
    className="flex flex-col items-center p-6 text-center"
  >
    {/* Icon */}
    <Icon className="w-8 h-8 text-gray-900 mb-4" strokeWidth={1.5} />

    {/* Title and Description */}
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-sm text-gray-600 max-w-[250px]">
      {description}
    </p>
  </motion.div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Global Shipping",
      description: "Free worldwide delivery on all orders above $150"
    },
    {
      icon: ShieldCheck,
      title: "Premium Quality",
      description: "100% premium cotton t-shirts for ultimate comfort"
    },
    {
      icon: Clock,
      title: "Fast Support",
      description: "24/7 dedicated customer support for all your needs"
    }
  ];

  return (
    <section className="relative bg-white py-12 sm:py-16 border-b">
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

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            The TeeWorld Difference
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;