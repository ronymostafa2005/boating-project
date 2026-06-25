export type CartItem = {
  productSlug: string;
  nameKey: string;
  priceKey: string;
  image: string;
  quantity: number;
  unitPrice: number;
};

/** Cart items — empty by default to match Neera empty state */
export const CART_ITEMS: CartItem[] = [];

export function formatCartPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
