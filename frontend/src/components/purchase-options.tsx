"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/use-auth";
import { Clock, Download, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * PurchaseOptions: Displays purchase and rental options for a media item.
 * @param price - The price for buying the media
 * @param rentPrice - The price for renting the media
 * @param onPurchase - Callback when purchase is made
 * @param onRent - Callback when rent is made
 */
interface PurchaseOptionsProps {
  price: number;
  rentPrice?: number;
  onPurchase?: () => void;
  onRent?: () => void;
}

export default function PurchaseOptions({
  price,
  rentPrice,
  onPurchase,
  onRent,
}: PurchaseOptionsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [selected, setSelected] = useState<"buy" | "rent">("buy");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to purchase this title",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Purchase successful",
        description:
          selected === "rent"
            ? `You have rented "${price}" for ${"48 hours"}`
            : `You have purchased "${price}"`,
      });
      setIsProcessing(false);

      // In a real app, redirect to the streaming page
      // router.push(`/watch/${media.id}`);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watch Options</CardTitle>
        <CardDescription>Rent or buy to start watching now</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selected}
          onValueChange={(value) => setSelected(value as "rent" | "buy")}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 border rounded-md p-4">
            <RadioGroupItem value="rent" id="rent" />
            <Label htmlFor="rent" className="flex-1 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Rent</span>
                </div>
                <div className="font-semibold">${rentPrice}</div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Available for 48 hour after starting
              </p>
            </Label>
          </div>

          <div className="flex items-center space-x-2 border rounded-md p-4">
            <RadioGroupItem value="buy" id="buy" />
            <Label htmlFor="buy" className="flex-1 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span>Buy</span>
                </div>
                <div className="font-semibold">${price}</div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Own forever and watch anytime
              </p>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full gap-2"
          onClick={handlePurchase}
          disabled={isProcessing}
        >
          <ShoppingCart className="h-4 w-4" />
          {isProcessing
            ? "Processing..."
            : selected === "buy"
            ? "Purchase"
            : "Rent"}
        </Button>
      </CardFooter>
    </Card>
  );
}
