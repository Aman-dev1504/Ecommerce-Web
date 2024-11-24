"use client"
import React from 'react';
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Clock, LucideIcon } from 'lucide-react';

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="flex flex-col items-center p-6 text-center group"
  >
    {/* Icon Container with effects */}
    <div className="relative mb-6 rounded-full bg-purple-50 p-4 transition-transform group-hover:scale-110 group-hover:shadow-lg shadow-sm">
      <div className="absolute inset-0 bg-purple-200 rounded-full blur-lg opacity-50 group-hover:blur-xl group-hover:opacity-70 transition-all duration-300" />
      <Icon className="w-8 h-8 text-purple-600 relative z-10" strokeWidth={1.5} />
    </div>

    {/* Title and Description */}
    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
      {title}
    </h3>
    <p className="text-sm text-gray-600 max-w-[250px] group-hover:text-gray-800 transition-colors">
      {description}
    </p>

    {/* Border Effect */}
    <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-purple-500 transition-all duration-300"></div>
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
    <section className="py-16 bg-white border-b">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-medium text-gray-900">
            The TeeWorld Difference
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto cursor-grab">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
