export type BoatType = "yacht" | "boat" | "speedboat" | "catamaran";

export interface LocalizedString {
  ar: string;
  en: string;
}

export interface BoatSpec {
  label: LocalizedString;
  value: LocalizedString;
}

export interface BoatAddon {
  name: LocalizedString;
  price: number;
  currency: string;
}

export interface Boat {
  _id: string;
  name: LocalizedString;
  slug: string;
  type: BoatType;
  capacity: number;
  images: string[];
  description: LocalizedString;
  addons: BoatAddon[];
  specs: BoatSpec[];
  bokunProductId: string;
  featured: boolean;
  marina?: string;
  priceFrom?: number;
}
