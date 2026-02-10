import { useState, useEffect } from 'react';
import { BrandedHeader } from '@/components/BrandedHeader';
import { CategoryTabs } from '@/components/CategoryTabs';
import { useCatalogQuery } from './useCatalogQuery';
import { formatPrice } from './formatting';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Search, AlertCircle } from 'lucide-react';
import type { CatalogCategory } from '@/backend';

export function CatalogPage() {
  const { data: catalog, isLoading, isError, error, refetch } = useCatalogQuery();
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
    return category.items.filter(item => 
      item.name.toLowerCase().includes(query)
    );
  };

  const currentCategory = catalog?.[selectedCategory];
  const filteredItems = getFilteredItems(currentCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <BrandedHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
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
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => refetch()}
                className="ml-4"
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {catalog && catalog.length > 0 && (
          <div className="space-y-6">
            <CategoryTabs
              categories={catalog.map(cat => cat.name)}
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item, index) => (
                        <TableRow 
                          key={`${item.name}-${index}`} 
                          className="hover:bg-muted/30 transition-colors"
                        >
                          <TableCell className="font-medium text-muted-foreground">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-right font-semibold text-primary">
                            {formatPrice(item.price)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                  {filteredItems.map((item, index) => (
                    <Card 
                      key={`${item.name}-${index}`} 
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                            {index + 1}
                          </span>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <span 
                          className="font-semibold text-primary text-lg"
                          data-testid={`price-${currentCategory?.name}-${item.name}`}
                          data-category-index={selectedCategory}
                          data-item-index={index}
                        >
                          {formatPrice(item.price)}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>

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
