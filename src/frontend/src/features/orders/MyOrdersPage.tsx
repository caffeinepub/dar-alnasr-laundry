import { BrandedHeader } from '@/components/BrandedHeader';
import { RequireAuthGate } from '@/components/RequireAuthGate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useMyOrdersQuery } from './useMyOrdersQuery';
import { formatPrice } from '../catalog/formatting';
import { ArrowLeft, Package, AlertCircle } from 'lucide-react';
import type { View } from '@/MainApp';

interface MyOrdersPageProps {
  onNavigate: (view: View, data?: { orderIndex?: number }) => void;
}

export function MyOrdersPage({ onNavigate }: MyOrdersPageProps) {
  const { data: orders, isLoading, isError, error } = useMyOrdersQuery();

  return (
    <RequireAuthGate onNavigate={onNavigate}>
      <div className="min-h-screen flex flex-col">
        <BrandedHeader />

        <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => onNavigate('catalog')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalog
          </Button>

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Package className="h-6 w-6" />
            My Orders
          </h2>

          {isLoading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          )}

          {isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error instanceof Error ? error.message : 'Failed to load orders. Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          {orders && orders.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                <Button onClick={() => onNavigate('catalog')}>Browse Catalog</Button>
              </CardContent>
            </Card>
          )}

          {orders && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate('orderDetails', { orderIndex: index })}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold">Order #{index + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{formatPrice(order.totalPrice)}</p>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p className="truncate">Delivery: {order.deliveryAddress}</p>
                    </div>

                    <Button variant="ghost" size="sm" className="mt-3 w-full">
                      View Details →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </RequireAuthGate>
  );
}
