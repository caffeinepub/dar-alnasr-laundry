export interface CartItem {
  categoryName: string;
  itemName: string;
  quantity: number;
  unitPrice: bigint;
}

export type CartState = Record<string, CartItem>;

export function getCartKey(categoryName: string, itemName: string): string {
  return `${categoryName}::${itemName}`;
}
