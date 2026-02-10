import { BrandedHeader } from '@/components/BrandedHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import type { View } from '@/MainApp';

interface OrderConfirmationPageProps {
  orderId?: string;
  onNavigate: (view: View) => void;
}

export function OrderConfirmationPage({ orderId, onNavigate }: OrderConfirmationPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <BrandedHeader />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Order Placed Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-muted-foreground mb-2">Your order has been confirmed</p>
              {orderId && (
                <p className="text-sm font-mono bg-muted px-3 py-2 rounded inline-block">
                  {orderId}
                </p>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              We'll contact you shortly to confirm the pickup details. You can track your order status
              in the My Orders section.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" className="flex-1" onClick={() => onNavigate('myOrders')}>
                View My Orders
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={() => onNavigate('catalog')}
              >
                Back to Catalog
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
