import { ProductsPage } from '@/components/products-page'

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrls: string[];
  category: string;
  sizes: string[];
  gender: string;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export default async function OurProducts() {
  const res = await fetch(`${baseUrl}/api/products?limit=9`, {

  })
  const initialProducts: Product[] = await res.json()

  return <ProductsPage initialProducts={initialProducts} />
}
