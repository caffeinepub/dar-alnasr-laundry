import { useState, useEffect } from 'react';
import { BrandedHeader } from '@/components/BrandedHeader';
import { CategoryTabs } from '@/components/CategoryTabs';
import { useCatalogQuery } from './useCatalogQuery';
import { useCart } from '../cart/useCart';
import { formatPrice } from './formatting';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Search, AlertCircle, Plus, Minus, ShoppingCart } from 'lucide-react';
import type { CatalogCategory } from '@/backend';
import type { View } from '@/MainApp';

interface CatalogPageProps {
  onNavigate: (view: View) => void;
}

export function CatalogPage({ onNavigate }: CatalogPageProps) {
  const { data: catalog, isLoading, isError, error, refetch } = useCatalogQuery();
  const { cart, addItem, setQuantity, itemCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Clamp selectedCategory if catalog changes and current selection is out of bounds
  useEffect(() => {
    if (catalog && catalog.length > 0 && selectedCategory >= catalog.length) {
      setSelectedCategory(0);
    }
  }, [catalog, selectedCategory]);

  // Filter items based on search query
  const getFilteredItems = (category: CatalogCategory | undefined) => {
    if (!category) return [];
    if (!searchQuery.trim()) return category.items;

    const query = searchQuery.toLowerCase();
    return category.items.filter((item) => item.name.toLowerCase().includes(query));
  };

  const currentCategory = catalog?.[selectedCategory];
  const filteredItems = getFilteredItems(currentCategory);

  const getItemQuantity = (categoryName: string, itemName: string): number => {
    const key = `${categoryName}::${itemName}`;
    return cart[key]?.quantity || 0;
  };

  const handleAddItem = (categoryName: string, itemName: string, price: bigint) => {
    addItem(categoryName, itemName, price);
  };

  const handleSetQuantity = (categoryName: string, itemName: string, quantity: number) => {
    setQuantity(categoryName, itemName, quantity);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BrandedHeader onNavigate={onNavigate} />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl pb-24">
        {isLoading && (
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-10 w-full max-w-md" />
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        )}

        {isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Catalog</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
              <span>
                {error instanceof Error ? error.message : 'Failed to load the service catalog. Please try again.'}
              </span>
              <Button variant="outline" size="sm" onClick={() => refetch()} className="ml-4">
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {catalog && catalog.length > 0 && (
          <div className="space-y-6">
            <CategoryTabs
              categories={catalog.map((cat) => cat.name)}
              selectedIndex={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>

            {filteredItems.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  {searchQuery ? 'No items match your search.' : 'No items available in this category.'}
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block rounded-lg border bg-card overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-20 font-semibold">No.</TableHead>
                        <TableHead className="font-semibold">Item</TableHead>
                        <TableHead className="text-right font-semibold w-32">Price</TableHead>
                        <TableHead className="text-center font-semibold w-40">Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item, index) => {
                        const quantity = currentCategory ? getItemQuantity(currentCategory.name, item.name) : 0;
                        return (
                          <TableRow key={`${item.name}-${index}`} className="hover:bg-muted/30 transition-colors">
                            <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                              {formatPrice(item.price)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-center gap-2">
                                {quantity === 0 ? (
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      currentCategory && handleAddItem(currentCategory.name, item.name, item.price)
                                    }
                                  >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add
                                  </Button>
                                ) : (
                                  <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() =>
                                        currentCategory && handleSetQuantity(currentCategory.name, item.name, quantity - 1)
                                      }
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center font-medium">{quantity}</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() =>
                                        currentCategory && handleSetQuantity(currentCategory.name, item.name, quantity + 1)
                                      }
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                  {filteredItems.map((item, index) => {
                    const quantity = currentCategory ? getItemQuantity(currentCategory.name, item.name) : 0;
                    return (
                      <Card key={`${item.name}-${index}`} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded flex-shrink-0">
                                {index + 1}
                              </span>
                              <span className="font-medium truncate">{item.name}</span>
                            </div>
                            <span
                              className="font-semibold text-primary text-lg flex-shrink-0 ml-2"
                              data-testid={`price-${currentCategory?.name}-${item.name}`}
                              data-category-index={selectedCategory}
                              data-item-index={index}
                            >
                              {formatPrice(item.price)}
                            </span>
                          </div>

                          <div className="flex justify-end">
                            {quantity === 0 ? (
                              <Button
                                size="sm"
                                className="w-full sm:w-auto"
                                onClick={() =>
                                  currentCategory && handleAddItem(currentCategory.name, item.name, item.price)
                                }
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Add to Cart
                              </Button>
                            ) : (
                              <div className="flex items-center gap-2 bg-muted rounded-lg p-1 w-full sm:w-auto justify-center">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9"
                                  onClick={() =>
                                    currentCategory && handleSetQuantity(currentCategory.name, item.name, quantity - 1)
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-10 text-center font-medium">{quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 w-9"
                                  onClick={() =>
                                    currentCategory && handleSetQuantity(currentCategory.name, item.name, quantity + 1)
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Sticky Cart Button */}
      {itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t shadow-lg z-50" style={{ backgroundColor: 'oklch(var(--background) / 0.95)', backdropFilter: 'blur(8px)' }}>
          <div className="container mx-auto max-w-6xl">
            <Button size="lg" className="w-full" onClick={() => onNavigate('cart')}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              View Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </Button>
          </div>
        </div>
      )}

      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Dar Alnasr Laundry. Built with love using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'dar-alnasr-laundry'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
