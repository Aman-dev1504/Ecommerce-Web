import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Calendar, CheckCircle, Truck } from "lucide-react"
import Link from "next/link"

function PaymentSuccess() {
  return (
<div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Thank You for Your Purchase!</h1>
        <p className="text-lg md:text-xl text-gray-600">Your payment was successful and your order is confirmed.</p>
      </div>

      {/* <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Order Details</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="font-semibold text-lg md:text-xl">${order.total.toFixed(2)}</span>
        </CardFooter>
      </Card> */}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
          <Truck className="mr-2 h-5 w-5" />
          Shipping Information
        </h2>
        <p className="mb-2">Your items will be shipped to the address you provided during checkout.</p>
        <p className="flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Estimated delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
        </p>
      </div>

      <div className="text-center space-y-4">
        <Button asChild>
          <Link href="/" className="inline-flex items-center">
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
        </p>
      </div>
    </div>
  )
}

export default PaymentSuccess