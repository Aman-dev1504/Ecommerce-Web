import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth } from "@/auth";
import { Providers } from "./provider";
import { Cart } from "@/actions/redis";
import { redis } from "@/lib/redis";
import NextTopLoader from 'nextjs-toploader';
const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teeworld",
  description: "An e-commerce store for Tshirt",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  const cart: Cart | null = await redis.get(`cart-${session?.user?.id}`)

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>

          <Navbar user={session?.user!} cart={cart} />
          <NextTopLoader
            color="#9E7AFF"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #9E7AFF,0 0 5px #9E7AFF"
            template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          <div className="pt-[60px]">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
