export function BrandedHeader() {
  return (
    <header className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/dar-alnasr-hero-bg.dim_1600x600.png)' }}
      />
      
      <div className="relative container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/assets/generated/dar-alnasr-logo.dim_512x512.png" 
              alt="Dar Alnasr Laundry Logo"
              className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-sm"
            />
          </div>
          
          {/* Title and Subtitle */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Dar Alnasr Laundry
            </h1>
            <p className="mt-2 text-base md:text-lg text-muted-foreground max-w-2xl">
              Browse our comprehensive laundry services and transparent pricing across all categories
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
