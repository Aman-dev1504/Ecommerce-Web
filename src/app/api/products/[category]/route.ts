import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { category: string } }
) {
  const { category } = params;

  try {
    // Fetch products based on the category
    const products = await db.product.findMany({
      where: {
        category: category.toUpperCase() as Category,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
