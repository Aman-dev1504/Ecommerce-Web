import Collection from "@/components/Collection";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import PopularProducts from "@/components/popular-products";
import Testimonial from "@/components/testinomial";
import dynamic from "next/dynamic";

const PageLoadMonitor = dynamic(() => import('@/components/PageLoadMonitor'), { ssr: false });

// export const revalidate = 3600;

// async function fetchProductsByCategory(category: string) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

//   const res = await fetch(`${baseUrl}/api/products/${category}`, {
//     next: { revalidate: 3600 },
//   });

//   if (!res.ok) {
//     throw new Error(`Failed to fetch ${category} products`);
//   }
//   return res.json();
// }

export default async function Home() {
  // const categories = ["casual", "graphic", "sports", "polo", "limited_edition"];
  // const productsByCategory: Record<string, any[]> = {};

  // await Promise.all(
  //   categories.map(async (category) => {
  //     const products = await fetchProductsByCategory(category);
  //     productsByCategory[category] = products;
  //   })
  // );

  return (
    <>
      <PageLoadMonitor />
      <Hero />
      <Features />
      <Collection />
      {/* <PopularProducts initialData={productsByCategory} /> */}
      <Testimonial />
    </>
  );
}
