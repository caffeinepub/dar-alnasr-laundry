import { LoginButton } from './LoginButton';
import { useCart } from '@/features/cart/useCart';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package } from 'lucide-react';

interface BrandedHeaderProps {
  onNavigate?: (view: 'catalog' | 'cart' | 'myOrders') => void;
}

export function BrandedHeader({ onNavigate }: BrandedHeaderProps = {}) {
  const { itemCount } = useCart();

  return (
    <header className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/dar-alnasr-hero-bg.dim_1600x600.png)' }}
      />

      <div className="relative container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
            <img
              src="/assets/generated/dar-alnasr-logo.dim_512x512.png"
              alt="Dar Alnasr Laundry Logo"
              className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-sm flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground tracking-tight truncate">
                Dar Alnasr Laundry
              </h1>
              <p className="hidden sm:block text-xs md:text-sm text-muted-foreground">
                Professional laundry services
              </p>
            </div>
          </div>

          {/* Actions */}
          {onNavigate && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('myOrders')}
                className="hidden sm:flex"
              >
                <Package className="mr-2 h-4 w-4" />
                My Orders
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('myOrders')}
                className="sm:hidden"
              >
                <Package className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('cart')}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {itemCount}
                  </span>
                )}
              </Button>
              <LoginButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
