import { BrandedHeader } from '@/components/BrandedHeader';
import { RequireAuthGate } from '@/components/RequireAuthGate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useMyOrdersQuery } from './useMyOrdersQuery';
import { formatPrice } from '../catalog/formatting';
import { ArrowLeft, Package } from 'lucide-react';
import type { View } from '@/MainApp';

interface OrderDetailsPageProps {
  orderIndex?: number;
  onNavigate: (view: View) => void;
}

export function OrderDetailsPage({ orderIndex, onNavigate }: OrderDetailsPageProps) {
  const { data: orders } = useMyOrdersQuery();
  const order = orderIndex !== undefined && orders ? orders[orderIndex] : null;

  if (!order) {
    return (
      <RequireAuthGate onNavigate={onNavigate}>
        <div className="min-h-screen flex flex-col">
          <BrandedHeader />
          <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
            <p className="text-center text-muted-foreground">Order not found</p>
            <Button onClick={() => onNavigate('myOrders')} className="mt-4 mx-auto block">
              Back to My Orders
            </Button>
          </main>
        </div>
      </RequireAuthGate>
    );
  }

  return (
    <RequireAuthGate onNavigate={onNavigate}>
      <div className="min-h-screen flex flex-col">
        <BrandedHeader />

        <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => onNavigate('myOrders')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Orders
          </Button>

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Package className="h-6 w-6" />
            Order #{(orderIndex ?? 0) + 1}
          </h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{item.itemName}</p>
                        <p className="text-sm text-muted-foreground">{item.categoryName}</p>
                        <p className="text-sm mt-1">
                          {formatPrice(item.price)} × {item.quantity.toString()}
                        </p>
                      </div>
                      <div className="text-right font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                    {idx < order.items.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{order.deliveryAddress}</p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(order.totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </RequireAuthGate>
  );
}
