import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, ShoppingCart, XCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function PaymentCancel() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-md min-h-[calc(100vh-64px)] flex flex-col justify-center">
    <Card className="text-center">
      <CardContent className="pt-6 space-y-6">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="text-2xl md:text-3xl font-bold">Payment Cancelled</h1>
        <p className="text-lg text-gray-600">Your payment has been cancelled. No charges have been made.</p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center justify-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Your Cart is Still Saved
            </h2>
            <p className="text-sm">Don&#39;t worry! The items in your cart are still saved. You can come back anytime to complete your purchase.</p>
          </div>

          <Button asChild className="w-full">
            <Link href="/" className="inline-flex items-center justify-center">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        <p className="text-sm text-gray-600">
          If you have any questions, please check our{' '}
          <Link href="#" className="text-primary hover:underline">
            FAQ
          </Link>{' '}
          or{' '}
          <Link href="#" className="text-primary hover:underline">
            contact us
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  </div>
  )
}

export default PaymentCancel