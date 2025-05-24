import Collection from "@/components/Collection";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonial from "@/components/testinomial";
import dynamic from "next/dynamic";

const PageLoadMonitor = dynamic(() => import('@/components/PageLoadMonitor'), { ssr: false });



export default async function Home() {


  return (
    <>
      <main >
        <PageLoadMonitor />
        <Hero />
        <Features />
        <Collection />
        <Testimonial />
      </main >
    </>
  );
}
