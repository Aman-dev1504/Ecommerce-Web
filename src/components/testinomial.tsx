"use client"
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TestimonialData {
  avatarImg: string;
  name: string;
  heading: string;
  rating?: number;
  position?: string;
}

const Testimonial = () => {
  const testimonials: TestimonialData[] = [
    {
      avatarImg: "images/reviews/image-daniel.jpg",
      name: "Daniel Clifford",
      position: "Fashion Designer",
      heading:
        "The quality of the t-shirts exceeded my expectations! The fabric quality is top-notch. The customer service was also fantastic throughout the buying process.",
      rating: 5,
    },
    {
      avatarImg: "images/reviews/image-jonathan.jpg",
      name: "Jonathan Walters",
      position: "Artist",
      heading: "Amazing selection and fast delivery! My order arrived earlier than expected, and the fit is perfect.",
      rating: 5,
    },
    {
      avatarImg: "images/reviews/image-patrick.jpg",
      name: "Patrick Abrams",
      position: "Content Creator",
      heading:
        "The whole experience was great, from browsing online to delivery. I love the designs! The quality is solid, and the style adds a unique touch to my wardrobe.",
      rating: 5,
    },
  ];

  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section - More minimal and modern */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-medium text-primary mb-2 block">Testimonials</span>
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            What Our Buyers Say
          </h2>
        </motion.div>

        {/* Testimonials Slider - Improved scroll effect */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 py-4 cursor-grab active:cursor-grabbing"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {allTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[320px]"
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <Card className="h-full bg-white/80 backdrop-blur border-none shadow-lg shadow-gray-100/50">
                  <CardContent className="p-5 space-y-3">
                    {/* Rating - Simplified */}
                    <div className="flex gap-0.5">
                      {Array(testimonial.rating).fill(null).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Testimonial Content - More compact */}
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                      {testimonial.heading}
                    </p>

                    {/* Author Info - Modernized layout */}
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <Avatar className="h-8 w-8 ring-2 ring-white">
                        <AvatarImage src={testimonial.avatarImg} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {testimonial.position}
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[10px] h-5">
                        Verified
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient fade effects */}
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;