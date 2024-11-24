import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
// import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Cart, removeItem } from '@/actions/redis'
import { CartItem } from '@/components/cart-item'
import { redis } from '@/lib/redis'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { checkOut } from '@/actions/checkout'
import CheckoutButton from './checkout-button'


export async function CartComponent() {

const session = await auth()

if(!session?.user){
    return redirect("/auth/login")
} 
const cart: Cart | null = await redis.get(`cart-${session.user.id}`)

  const totalItems = cart?.items.reduce((total, item) => total + item.quantity, 0) || 0
  const totalPrice = cart?.items.reduce((total, item) => total + item.price * item.quantity, 0) || 0
//   if(loading){
//     return <div>loading..</div>
//   }
  return (
    <div className="container mx-auto px-4 pt-4 pb-8">
      <div className="flex items-center mb-8">
        <Link href="/" className="text-primary hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold ml-auto">Your Cart</h1>
      </div>
      
      {(!cart || cart.items.length === 0) ? (
        <Card className="text-center py-16">
          <CardContent>
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl mb-4">Your cart is empty.</p>
            <Link href="/">
              <Button>Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  {/* <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div> */}
                  {/* <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div> */}
                  <Separator className="my-4" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <form action={checkOut}>
                <CheckoutButton/>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}



