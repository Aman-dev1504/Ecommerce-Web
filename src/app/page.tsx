import Collection from "@/components/Collection";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import PopularProducts from "@/components/popular-products";
import Testimonial from "@/components/testinomial";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Collection />
      <PopularProducts />
      <Testimonial />
    </>
  );
}
