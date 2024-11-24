"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string[];
  quantity: number;
}
export type Cart = {
  userId: string;
  items: CartItem[];
};
export async function addItem(producId: string) {
  const session = await auth();
  if (!session?.user) {
    return redirect("/auth/login");
  }

  let cart: Cart | null = await redis.get(`cart-${session.user.id}`);

  const selectedProduct = await db.product.findUnique({
    select: {
      id: true,
      title: true,
      price: true,
      imageUrls: true,
    },
    where: {
      id: producId,
    },
  });

  if (!selectedProduct) {
    throw new Error("N product with this Id");
  }

  let myCart = {} as Cart;
  if (!cart || !cart.items) {
    myCart = {
      userId: session.user.id!,
      items: [
        {
          price: selectedProduct.price,
          name: selectedProduct.title,
          image: selectedProduct.imageUrls,
          id: selectedProduct.id,
          quantity: 1,
        },
      ],
    };
  } else {
    let itemFound = false;
    myCart.items = cart.items.map((item) => {
      if (item.id === producId) {
        itemFound = true;
        item.quantity++;
      }
      return item;
    });

    if (!itemFound) {
      myCart.items.push({
        price: selectedProduct.price,
        name: selectedProduct.title,
        image: selectedProduct.imageUrls,
        id: selectedProduct.id,
        quantity: 1,
      });
    }
  }

  await redis.set(`cart-${session.user.id}`, myCart);

  revalidatePath("/", "layout");
}

export async function removeItem(producId: string) {
  const session = await auth();
  if (!session?.user) {
    return redirect("/auth/login");
  }

  let cart: Cart | null = await redis.get(`cart-${session.user.id}`);

  const updatedCartItems = cart?.items.filter((item) => item.id !== producId);

  const updatedCart: Cart = {
    userId: session.user.id as string,
    items: updatedCartItems as CartItem[],
  };

  await redis.set(`cart-${session.user.id}`, updatedCart);

  revalidatePath("/cart", "page");
}

export async function updateItemQuantity(id: string, newQuantity: number) {
  const session = await auth();
  if (!session?.user) {
    return redirect("/auth/login");
  }

  let cart: Cart | null = await redis.get(`cart-${session.user.id}`);

  const updatedCartItems = cart?.items
    .map((item) =>
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    )
    .filter((item) => item.quantity > 0);

  const updatedCart: Cart = {
    userId: session.user.id as string,
    items: updatedCartItems as CartItem[],
  };

  await redis.set(`cart-${session.user.id}`, updatedCart);

  revalidatePath("/cart", "page");
}
