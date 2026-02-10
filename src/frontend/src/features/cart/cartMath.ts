import type { CartState, CartItem } from './types';
import { formatPrice } from '../catalog/formatting';

export function calculateLineTotal(item: CartItem): bigint {
  return item.unitPrice * BigInt(item.quantity);
}

export function calculateCartTotal(cart: CartState): bigint {
  return Object.values(cart).reduce((total, item) => {
    return total + calculateLineTotal(item);
  }, BigInt(0));
}

export function formatLineTotal(item: CartItem): string {
  return formatPrice(calculateLineTotal(item));
}

export function formatCartTotal(cart: CartState): string {
  return formatPrice(calculateCartTotal(cart));
}
