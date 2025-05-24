// app/api/products/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = Number(url.searchParams.get("limit")) || 20;
    const cursor = url.searchParams.get("cursor");

    const where = cursor ? { id: { gt: cursor } } : {};

    const products = await db.product.findMany({
      where,
      take: limit,
      orderBy: { id: "asc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
