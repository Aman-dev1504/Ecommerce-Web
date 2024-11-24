import { NextResponse } from 'next/server';
import { db } from '@/lib/db';


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch products based on the category
    const product = await db.product.findUnique({
      where: {
        id,  // Assuming category enum values are in uppercase
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
