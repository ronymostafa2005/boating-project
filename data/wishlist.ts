export type WishlistItem = {
  productSlug: string;
  nameKey: string;
  priceKey: string;
  image: string;
  inStock: boolean;
};

/** Wishlist items — empty by default to match Neera empty state */
export const WISHLIST_ITEMS: WishlistItem[] = [];
