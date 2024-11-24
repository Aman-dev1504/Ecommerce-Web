"use client"
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full mt-6" size="lg">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button className="w-full mt-6" size="lg">
          Proceed to Checkout
        </Button>
      )}
    </>
  );
}

export default CheckoutButton;
