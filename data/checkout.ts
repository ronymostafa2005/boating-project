export type CheckoutCartItem = {
  productSlug: string;
  nameKey: string;
  priceKey: string;
  image: string;
  quantity: number;
  unitPrice: number;
};

/** Demo cart items for checkout UI preview */
export const CHECKOUT_DEMO_ITEMS: CheckoutCartItem[] = [
  {
    productSlug: "direction-compass",
    nameKey: "product6Name",
    priceKey: "product6Price",
    image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/shop-8-1-1000x1365.jpg",
    quantity: 1,
    unitPrice: 230,
  },
  {
    productSlug: "carabiner-with-pulley",
    nameKey: "product5Name",
    priceKey: "product5Price",
    image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/shop-5-1-1000x1365.jpg",
    quantity: 1,
    unitPrice: 230,
  },
];

export const CHECKOUT_COUNTRIES = [
  { value: "BE", labelKey: "countryBE" },
  { value: "US", labelKey: "countryUS" },
  { value: "SA", labelKey: "countrySA" },
  { value: "GB", labelKey: "countryGB" },
  { value: "AE", labelKey: "countryAE" },
] as const;

export const CHECKOUT_PAYMENT_METHODS = [
  { id: "bank", labelKey: "paymentBank" },
  { id: "check", labelKey: "paymentCheck" },
  { id: "cod", labelKey: "paymentCod" },
  { id: "paypal", labelKey: "paymentPaypal" },
] as const;

export function formatCheckoutPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function getCheckoutSubtotal(items: CheckoutCartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
