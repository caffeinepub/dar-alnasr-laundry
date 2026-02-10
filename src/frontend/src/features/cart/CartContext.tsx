import { createContext, useState, useEffect, ReactNode } from 'react';
import type { CartState, CartItem } from './types';
import { getCartKey } from './types';
import { saveCartToStorage, loadCartFromStorage, clearCartStorage } from './storage';
import { calculateCartTotal } from './cartMath';

interface CartContextValue {
  cart: CartState;
  addItem: (categoryName: string, itemName: string, unitPrice: bigint) => void;
  removeItem: (categoryName: string, itemName: string) => void;
  setQuantity: (categoryName: string, itemName: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: bigint;
  itemCount: number;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(() => loadCartFromStorage());

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addItem = (categoryName: string, itemName: string, unitPrice: bigint) => {
    const key = getCartKey(categoryName, itemName);
    setCart(prev => ({
      ...prev,
      [key]: {
        categoryName,
        itemName,
        quantity: (prev[key]?.quantity || 0) + 1,
        unitPrice,
      },
    }));
  };

  const removeItem = (categoryName: string, itemName: string) => {
    const key = getCartKey(categoryName, itemName);
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[key];
      return newCart;
    });
  };

  const setQuantity = (categoryName: string, itemName: string, quantity: number) => {
    const key = getCartKey(categoryName, itemName);
    if (quantity <= 0) {
      removeItem(categoryName, itemName);
    } else {
      setCart(prev => {
        if (!prev[key]) return prev;
        return {
          ...prev,
          [key]: {
            ...prev[key],
            quantity,
          },
        };
      });
    }
  };

  const clearCart = () => {
    setCart({});
    clearCartStorage();
  };

  const cartTotal = calculateCartTotal(cart);
  const itemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        setQuantity,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
