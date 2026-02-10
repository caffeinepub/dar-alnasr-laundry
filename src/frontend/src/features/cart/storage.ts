import type { CartState } from './types';

const CART_STORAGE_KEY = 'dar-alnasr-cart';

export function saveCartToStorage(cart: CartState): void {
  try {
    // Convert bigint to string for JSON serialization
    const serializable = Object.entries(cart).reduce((acc, [key, item]) => {
      acc[key] = {
        ...item,
        unitPrice: item.unitPrice.toString(),
      };
      return acc;
    }, {} as Record<string, any>);
    
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serializable));
  } catch (error) {
    console.error('Failed to save cart to storage:', error);
  }
}

export function loadCartFromStorage(): CartState {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return {};
    
    const parsed = JSON.parse(stored);
    
    // Convert string back to bigint
    return Object.entries(parsed).reduce((acc, [key, item]: [string, any]) => {
      acc[key] = {
        ...item,
        unitPrice: BigInt(item.unitPrice),
      };
      return acc;
    }, {} as CartState);
  } catch (error) {
    console.error('Failed to load cart from storage:', error);
    return {};
  }
}

export function clearCartStorage(): void {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear cart storage:', error);
  }
}
