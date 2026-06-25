const CDN = "https://neera.wpenginepowered.com/wp-content/uploads";

export const shopImg = (n: number, variant = 1) =>
  `${CDN}/2024/01/shop-${n}-${variant}-1000x1365.jpg`;

export const SHOP_DESCRIPTION_IMAGE = `${CDN}/2023/12/Neera-Shop-Description-img-1000x667.jpg`;

export type ShopProduct = {
  id: string;
  nameKey: string;
  priceKey: string;
  image: string;
  slug: string;
  priceMin: number;
  priceMax: number;
  galleryId: number;
  galleryCount: number;
  categoryKey: string;
  tagKey: string;
  shortDescKey: string;
  rating: number;
  relatedSlugs: string[];
};

/** Product order and images match https://neera.wpenginepowered.com/shop/ */
export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "shop-1",
    nameKey: "product1Name",
    priceKey: "product1Price",
    image: shopImg(9),
    slug: "boat-fishing-chair",
    priceMin: 130.6,
    priceMax: 140.4,
    galleryId: 9,
    galleryCount: 1,
    categoryKey: "category1",
    tagKey: "tag2",
    shortDescKey: "shortDescription",
    rating: 4,
    relatedSlugs: ["carabiner-with-pulley", "electronic-navigation-compass", "weather-station", "direction-compass"],
  },
  {
    id: "shop-2",
    nameKey: "product2Name",
    priceKey: "product2Price",
    image: shopImg(3),
    slug: "boat-ship-steering-wheel",
    priceMin: 130.4,
    priceMax: 140.4,
    galleryId: 3,
    galleryCount: 1,
    categoryKey: "category1",
    tagKey: "tag2",
    shortDescKey: "shortDescription",
    rating: 4,
    relatedSlugs: ["steering-wheel", "boat-winche", "direction-compass", "brass-telescope"],
  },
  {
    id: "shop-3",
    nameKey: "product3Name",
    priceKey: "product3Price",
    image: shopImg(4),
    slug: "boat-winche",
    priceMin: 33.5,
    priceMax: 38.7,
    galleryId: 4,
    galleryCount: 1,
    categoryKey: "category1",
    tagKey: "tag2",
    shortDescKey: "shortDescription",
    rating: 4,
    relatedSlugs: ["carabiner-with-pulley", "rollers-hingers", "boat-ship-steering-wheel", "weather-station"],
  },
  {
    id: "shop-4",
    nameKey: "product4Name",
    priceKey: "product4Price",
    image: shopImg(6),
    slug: "brass-telescope",
    priceMin: 230,
    priceMax: 230,
    galleryId: 6,
    galleryCount: 1,
    categoryKey: "category1",
    tagKey: "tag2",
    shortDescKey: "shortDescription",
    rating: 4,
    relatedSlugs: ["direction-compass", "global-model-clock", "weather-station", "electronic-navigation-compass"],
  },
  {
    id: "shop-5",
    nameKey: "product5Name",
    priceKey: "product5Price",
    image: shopImg(7),
    slug: "carabiner-with-pulley",
    priceMin: 230,
    priceMax: 230,
    galleryId: 7,
    galleryCount: 1,
    categoryKey: "category1",
    tagKey: "tag2",
    shortDescKey: "shortDescription",
    rating: 4,
    relatedSlugs: ["direction-compass", "electronic-navigation-compass", "weather-station", "boat-fishing-chair"],
  },
  {
    id: "shop-6",
    nameKey: "product6Name",
    priceKey: "product6Price",
    image: shopImg(8),
    slug: "direction-compass",
    priceMin: 230,
    priceMax: 230,
    galleryId: 8,
    galleryCount: 3,
    categoryKey: "category1",
    tagKey: "tag2",
    shortDescKey: "shortDescription",
    rating: 4,
    relatedSlugs: ["carabiner-with-pulley", "electronic-navigation-compass", "weather-station", "boat-fishing-chair"],
  },
  {
    id: "shop-7",
    nameKey: "product7Name",
    priceKey: "product7Price",
    image: shopImg(2),
    slug: "electronic-navigation-compass",
    priceMin: 10.5,
    priceMax: 11.65,
    galleryId: 2,
    galleryCount: 1,
    categoryKey: "category1",
    tagKey: "tag2",
    shortDescKey: "shortDescription",
    rating: 4,
    relatedSlugs: ["direction-compass", "carabiner-with-pulley", "weather-station", "global-model-clock"],
  },
  {
    id: "shop-8",
    nameKey: "product8Name",
    priceKey: "product8Price",
    image: shopImg(10),
    slug: "global-model-clock",
    priceMin: 230,
    priceMax: 230,
    galleryId: 10,
    galleryCount: 1,
    categoryKey: "category1",
    tagKey: "tag2",
    shortDescKey: "shortDescription",
    rating: 4,
    relatedSlugs: ["brass-telescope", "weather-station", "direction-compass", "steering-wheel"],
  },
  {
    id: "shop-9",
    nameKey: "product9Name",
    priceKey: "product9Price",
    image: shopImg(1),
    slug: "life-buoy-ring",
    priceMin: 10.3,
    priceMax: 12.5,
    galleryId: 1,
    galleryCount: 1,
    categoryKey: "category1",
    tagKey: "tag2",
    shortDescKey: "shortDescription",
    rating: 4,
    relatedSlugs: ["boat-fishing-chair", "direction-compass", "carabiner-with-pulley", "life-buoy-ring"],
  },
  {
    id: "shop-10",
    nameKey: "product10Name",
    priceKey: "product10Price",
    image: shopImg(5),
    slug: "rollers-hingers",
    priceMin: 200,
    priceMax: 200,
    galleryId: 5,
    galleryCount: 1,
    categoryKey: "category1",
    tagKey: "tag2",
    shortDescKey: "shortDescription",
    rating: 4,
    relatedSlugs: ["boat-winche", "carabiner-with-pulley", "steering-wheel", "rollers-hingers"],
  },
  {
    id: "shop-11",
    nameKey: "product11Name",
    priceKey: "product11Price",
    image: shopImg(11),
    slug: "steering-wheel",
    priceMin: 230,
    priceMax: 230,
    galleryId: 11,
    galleryCount: 1,
    categoryKey: "category1",
    tagKey: "tag2",
    shortDescKey: "shortDescription",
    rating: 4,
    relatedSlugs: ["boat-ship-steering-wheel", "direction-compass", "weather-station", "brass-telescope"],
  },
  {
    id: "shop-12",
    nameKey: "product12Name",
    priceKey: "product12Price",
    image: shopImg(12),
    slug: "weather-station",
    priceMin: 33.95,
    priceMax: 39.95,
    galleryId: 12,
    galleryCount: 1,
    categoryKey: "category1",
    tagKey: "tag2",
    shortDescKey: "shortDescription",
    rating: 4,
    relatedSlugs: ["carabiner-with-pulley", "electronic-navigation-compass", "boat-fishing-chair", "direction-compass"],
  },
];

export function getShopProductGallery(product: ShopProduct): string[] {
  return Array.from({ length: product.galleryCount }, (_, i) =>
    shopImg(product.galleryId, i + 1)
  );
}

export function getShopProductBySlug(slug: string): ShopProduct | undefined {
  return SHOP_PRODUCTS.find((p) => p.slug === slug);
}

export function getShopRelatedProducts(product: ShopProduct): ShopProduct[] {
  return product.relatedSlugs
    .map((slug) => getShopProductBySlug(slug))
    .filter((p): p is ShopProduct => p !== undefined && p.slug !== product.slug)
    .slice(0, 4);
}

export const SHOP_CATEGORIES = [
  { id: "cat-1", nameKey: "category1" },
  { id: "cat-2", nameKey: "category2" },
  { id: "cat-3", nameKey: "category3" },
  { id: "cat-4", nameKey: "category4" },
  { id: "cat-5", nameKey: "category5" },
  { id: "cat-6", nameKey: "category6" },
  { id: "cat-7", nameKey: "category7" },
] as const;

export const SHOP_TAGS = [
  { id: "tag-1", nameKey: "tag1" },
  { id: "tag-2", nameKey: "tag2" },
] as const;

export const SHOP_INSTAGRAM = [
  `${CDN}/2023/12/Neera-Side-Bar-Insta-img-01.jpg`,
  `${CDN}/2023/12/Neera-Side-Bar-Insta-img-02.jpg`,
  `${CDN}/2023/12/Neera-Side-Bar-Insta-img-03.jpg`,
  `${CDN}/2023/12/Neera-Side-Bar-Insta-img-04.jpg`,
  `${CDN}/2023/12/Neera-Side-Bar-Insta-img-05.jpg`,
  `${CDN}/2023/12/Neera-Side-Bar-Insta-img-06.jpg`,
];

export const SHOP_PROMO_BANNER = `${CDN}/2023/12/Neera-Side-Bar-Ad-img.jpg`;

export const SHOP_PER_PAGE = 9;
export const SHOP_MIN_PRICE = 10;
export const SHOP_MAX_PRICE = 230;
