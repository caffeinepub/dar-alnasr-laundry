import { BrandedHeader } from '@/components/BrandedHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useCart } from './useCart';
import { formatPrice } from '../catalog/formatting';
import { formatLineTotal } from './cartMath';
import { ArrowLeft, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import type { View } from '@/MainApp';

interface CartPageProps {
  onNavigate: (view: View) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { cart, setQuantity, removeItem, cartTotal, itemCount } = useCart();
  const cartItems = Object.values(cart);
  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <BrandedHeader />

      <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => onNavigate('catalog')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Catalog
          </Button>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Your Cart
          </h2>
        </div>

        {isEmpty ? (
          <Alert>
            <AlertDescription className="text-center py-8">
              Your cart is empty. Add items from the catalog to get started.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Items ({itemCount})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.categoryName}-${item.itemName}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.itemName}</h3>
                        <p className="text-sm text-muted-foreground">{item.categoryName}</p>
                        <p className="text-sm font-semibold text-primary mt-1">
                          {formatPrice(item.unitPrice)} each
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setQuantity(item.categoryName, item.itemName, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setQuantity(item.categoryName, item.itemName, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.categoryName, item.itemName)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className="mt-2 text-right">
                      <span className="text-sm text-muted-foreground">Subtotal: </span>
                      <span className="font-semibold">{formatLineTotal(item)}</span>
                    </div>

                    <Separator className="mt-4" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(cartTotal)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="sticky bottom-0 bg-background pt-4 pb-6 border-t">
              <Button
                size="lg"
                className="w-full"
                onClick={() => onNavigate('checkout')}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
