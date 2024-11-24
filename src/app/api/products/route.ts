import { NextResponse } from 'next/server';
import { db } from '@/lib/db';


export async function GET(req: Request) {

  try {
    // Fetch products based on the category
    const products = await db.product.findMany();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
