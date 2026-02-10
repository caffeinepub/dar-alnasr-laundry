import { useState } from 'react';
import { BrandedHeader } from '@/components/BrandedHeader';
import { RequireAuthGate } from '@/components/RequireAuthGate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCart } from '../cart/useCart';
import { usePlaceOrderMutation } from '../orders/usePlaceOrderMutation';
import { formatPrice } from '../catalog/formatting';
import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import type { CheckoutFormData } from './checkoutTypes';
import { initialCheckoutForm } from './checkoutTypes';
import type { View } from '@/MainApp';

interface CheckoutPageProps {
  onNavigate: (view: View, data?: { orderId?: string }) => void;
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>(initialCheckoutForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const placeOrderMutation = usePlaceOrderMutation();

  const cartItems = Object.values(cart);

  const updateField = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Pickup address is required';
    if (!formData.sameAsPickup && !formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery address is required';
    }
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const deliveryAddress = formData.sameAsPickup ? formData.pickupAddress : formData.deliveryAddress;

    try {
      await placeOrderMutation.mutateAsync({
        cart,
        deliveryAddress,
        customerInfo: {
          name: formData.name,
          phone: formData.phone,
          pickupAddress: formData.pickupAddress,
          pickupDate: formData.pickupDate,
          pickupTime: formData.pickupTime,
          notes: formData.notes,
        },
      });

      clearCart();
      onNavigate('confirmation', { orderId: 'ORDER-' + Date.now() });
    } catch (error) {
      console.error('Order placement failed:', error);
    }
  };

  return (
    <RequireAuthGate onNavigate={onNavigate}>
      <div className="min-h-screen flex flex-col">
        <BrandedHeader />

        <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => onNavigate('cart')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>

          <h2 className="text-2xl font-bold mb-6">Checkout</h2>

          {placeOrderMutation.isError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {placeOrderMutation.error instanceof Error
                  ? placeOrderMutation.error.message
                  : 'Failed to place order. Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+971 XX XXX XXXX"
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pickup Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pickupAddress">Pickup Address *</Label>
                  <Textarea
                    id="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={(e) => updateField('pickupAddress', e.target.value)}
                    placeholder="Enter your pickup address"
                    rows={3}
                    className={errors.pickupAddress ? 'border-destructive' : ''}
                  />
                  {errors.pickupAddress && (
                    <p className="text-sm text-destructive mt-1">{errors.pickupAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickupDate">Pickup Date *</Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => updateField('pickupDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={errors.pickupDate ? 'border-destructive' : ''}
                    />
                    {errors.pickupDate && (
                      <p className="text-sm text-destructive mt-1">{errors.pickupDate}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="pickupTime">Pickup Time *</Label>
                    <Input
                      id="pickupTime"
                      type="time"
                      value={formData.pickupTime}
                      onChange={(e) => updateField('pickupTime', e.target.value)}
                      className={errors.pickupTime ? 'border-destructive' : ''}
                    />
                    {errors.pickupTime && (
                      <p className="text-sm text-destructive mt-1">{errors.pickupTime}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sameAsPickup"
                    checked={formData.sameAsPickup}
                    onCheckedChange={(checked) => updateField('sameAsPickup', checked === true)}
                  />
                  <Label htmlFor="sameAsPickup" className="cursor-pointer">
                    Delivery address is same as pickup address
                  </Label>
                </div>

                {!formData.sameAsPickup && (
                  <div>
                    <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                    <Textarea
                      id="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={(e) => updateField('deliveryAddress', e.target.value)}
                      placeholder="Enter your delivery address"
                      rows={3}
                      className={errors.deliveryAddress ? 'border-destructive' : ''}
                    />
                    {errors.deliveryAddress && (
                      <p className="text-sm text-destructive mt-1">{errors.deliveryAddress}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  placeholder="Any special instructions or requests..."
                  rows={3}
                />
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6 space-y-3">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.categoryName}-${item.itemName}`}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.itemName} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.unitPrice * BigInt(item.quantity))}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 flex items-center justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(cartTotal)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="sticky bottom-0 bg-background pt-4 pb-6 border-t">
              <Button
                size="lg"
                className="w-full"
                onClick={handleSubmit}
                disabled={placeOrderMutation.isPending}
              >
                {placeOrderMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </RequireAuthGate>
  );
}
