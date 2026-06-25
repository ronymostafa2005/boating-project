const CDN = "https://neera.wpenginepowered.com/wp-content/uploads";

const shopImg = (n: number) => `${CDN}/2024/01/shop-${n}-1-1000x1365.jpg`;

export type ShopProduct = {
  id: string;
  nameKey: string;
  priceKey: string;
  image: string;
  slug: string;
  priceMin: number;
  priceMax: number;
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
  },
  {
    id: "shop-2",
    nameKey: "product2Name",
    priceKey: "product2Price",
    image: shopImg(3),
    slug: "boat-ship-steering-wheel",
    priceMin: 130.4,
    priceMax: 140.4,
  },
  {
    id: "shop-3",
    nameKey: "product3Name",
    priceKey: "product3Price",
    image: shopImg(4),
    slug: "boat-winche",
    priceMin: 33.5,
    priceMax: 38.7,
  },
  {
    id: "shop-4",
    nameKey: "product4Name",
    priceKey: "product4Price",
    image: shopImg(6),
    slug: "brass-telescope",
    priceMin: 230,
    priceMax: 230,
  },
  {
    id: "shop-5",
    nameKey: "product5Name",
    priceKey: "product5Price",
    image: shopImg(7),
    slug: "carabiner-with-pulley",
    priceMin: 230,
    priceMax: 230,
  },
  {
    id: "shop-6",
    nameKey: "product6Name",
    priceKey: "product6Price",
    image: shopImg(8),
    slug: "direction-compass",
    priceMin: 230,
    priceMax: 230,
  },
  {
    id: "shop-7",
    nameKey: "product7Name",
    priceKey: "product7Price",
    image: shopImg(2),
    slug: "electronic-navigation-compass",
    priceMin: 10.5,
    priceMax: 11.65,
  },
  {
    id: "shop-8",
    nameKey: "product8Name",
    priceKey: "product8Price",
    image: shopImg(10),
    slug: "global-model-clock",
    priceMin: 230,
    priceMax: 230,
  },
  {
    id: "shop-9",
    nameKey: "product9Name",
    priceKey: "product9Price",
    image: shopImg(1),
    slug: "life-buoy-ring",
    priceMin: 10.3,
    priceMax: 12.5,
  },
  {
    id: "shop-10",
    nameKey: "product10Name",
    priceKey: "product10Price",
    image: shopImg(5),
    slug: "rollers-hingers",
    priceMin: 200,
    priceMax: 200,
  },
  {
    id: "shop-11",
    nameKey: "product11Name",
    priceKey: "product11Price",
    image: shopImg(11),
    slug: "steering-wheel",
    priceMin: 230,
    priceMax: 230,
  },
  {
    id: "shop-12",
    nameKey: "product12Name",
    priceKey: "product12Price",
    image: shopImg(12),
    slug: "weather-station",
    priceMin: 230,
    priceMax: 230,
  },
];

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
