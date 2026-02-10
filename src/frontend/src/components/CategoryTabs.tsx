import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface CategoryTabsProps {
  categories: string[];
  selectedIndex: number;
  onSelectCategory: (index: number) => void;
}

export function CategoryTabs({ categories, selectedIndex, onSelectCategory }: CategoryTabsProps) {
  return (
    <Tabs 
      value={selectedIndex.toString()} 
      onValueChange={(value) => onSelectCategory(parseInt(value))}
      className="w-full"
    >
      <TabsList className="w-full grid grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-muted/50 p-2">
        {categories.map((category, index) => (
          <TabsTrigger
            key={`${category}-${index}`}
            value={index.toString()}
            className="text-xs sm:text-sm md:text-base py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium whitespace-normal min-h-[3rem] leading-tight"
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {/* TabsContent is required but we handle content display in parent */}
      {categories.map((category, index) => (
        <TabsContent key={`${category}-content-${index}`} value={index.toString()} className="mt-0">
          {/* Content rendered by parent component */}
        </TabsContent>
      ))}
    </Tabs>
  );
}
