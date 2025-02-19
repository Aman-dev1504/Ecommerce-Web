"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { removeItem, updateItemQuantity } from "@/actions/redis";

type Props = {
  id: string;
  name: string;
  price: number;
  image: string[];
  quantity: number;
};

export function CartItem({ item }: { item: Props }) {
  return (
    <Card>
      <CardContent className="flex items-center space-x-4 p-4">
        <img
          src={item.image[0]}
          alt={item.name}
          className="w-24 h-24 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="text-lg font-medium">{item.name}</h3>
          <p className="text-gray-500">${item.price.toFixed(2)}</p>
          <div className="flex items-center mt-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              aria-label={`Decrease quantity of ${item.name}`}
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-4">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              aria-label={`Increase quantity of ${item.name}`}
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 mt-2"
            aria-label={`Remove ${item.name} from cart`}
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
