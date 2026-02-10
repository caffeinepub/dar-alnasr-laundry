export interface CheckoutFormData {
  name: string;
  phone: string;
  pickupAddress: string;
  deliveryAddress: string;
  sameAsPickup: boolean;
  pickupDate: string;
  pickupTime: string;
  notes: string;
}

export const initialCheckoutForm: CheckoutFormData = {
  name: '',
  phone: '',
  pickupAddress: '',
  deliveryAddress: '',
  sameAsPickup: true,
  pickupDate: '',
  pickupTime: '',
  notes: '',
};
