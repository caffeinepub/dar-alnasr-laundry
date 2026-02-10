import { ReactNode } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { BrandedHeader } from './BrandedHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Loader2 } from 'lucide-react';
import type { View } from '@/MainApp';

interface RequireAuthGateProps {
  children: ReactNode;
  onNavigate: (view: View) => void;
}

export function RequireAuthGate({ children, onNavigate }: RequireAuthGateProps) {
  const { identity, login, loginStatus, isInitializing } = useInternetIdentity();

  const isLoggingIn = loginStatus === 'logging-in';

  if (isInitializing) {
    return (
      <div className="min-h-screen flex flex-col">
        <BrandedHeader />
        <main className="flex-1 container mx-auto px-4 py-12 max-w-md flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="min-h-screen flex flex-col">
        <BrandedHeader />
        <main className="flex-1 container mx-auto px-4 py-12 max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Sign In Required</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Please sign in to access this feature and manage your orders.
              </p>
              <Button
                size="lg"
                className="w-full"
                onClick={login}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In with Internet Identity'
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => onNavigate('catalog')}
              >
                Back to Catalog
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return <>{children}</>;
}
