import { HOME2_SHIP_TYPES } from "@/data/home2";

const CDN = "/images/neera";
const DETAIL = `${CDN}/2024/01`;

export type ServiceItem = {
  key: (typeof HOME2_SHIP_TYPES)[number]["key"];
  descKey: (typeof HOME2_SHIP_TYPES)[number]["descKey"];
  slug: string;
  image: string;
  heroImage: string;
  galleryImages: [string, string, string];
};

export const SERVICE_LISTING_ITEMS: ServiceItem[] = [
  {
    key: "shipSail",
    descKey: "shipSailDesc",
    slug: "sail-boat",
    image: HOME2_SHIP_TYPES[0].image,
    heroImage: HOME2_SHIP_TYPES[0].image,
    galleryImages: [
      `${DETAIL}/home-two-pricing-image-2.jpg`,
      `${DETAIL}/home-two-pricing-image-3.jpg`,
      `${DETAIL}/home-1-image-carousel-1.jpg`,
    ],
  },
  {
    key: "shipJet",
    descKey: "shipJetDesc",
    slug: "jet-boats",
    image: HOME2_SHIP_TYPES[1].image,
    heroImage: HOME2_SHIP_TYPES[1].image,
    galleryImages: [
      `${DETAIL}/home-two-pricing-image-2.jpg`,
      `${DETAIL}/service-listing-detail-row-2.jpg`,
      `${DETAIL}/home-two-pricing-image-3.jpg`,
    ],
  },
  {
    key: "shipMotor",
    descKey: "shipMotorDesc",
    slug: "motor-boat",
    image: HOME2_SHIP_TYPES[2].image,
    heroImage: HOME2_SHIP_TYPES[2].image,
    galleryImages: [
      `${DETAIL}/service-listing-detail-row-4.jpg`,
      `${DETAIL}/service-listing-detail-row-5.jpg`,
      `${DETAIL}/home-1-image-carousel-1.jpg`,
    ],
  },
  {
    key: "shipCanoe",
    descKey: "shipCanoeDesc",
    slug: "canoe",
    image: HOME2_SHIP_TYPES[3].image,
    heroImage: HOME2_SHIP_TYPES[3].image,
    galleryImages: [
      `${DETAIL}/home-two-pricing-image-2.jpg`,
      `${DETAIL}/home-two-pricing-image-3.jpg`,
      `${DETAIL}/home-1-image-carousel-1.jpg`,
    ],
  },
  {
    key: "shipDeck",
    descKey: "shipDeckDesc",
    slug: "deck-boats",
    image: HOME2_SHIP_TYPES[4].image,
    heroImage: `${DETAIL}/service-listing-detail-image-5.jpg`,
    galleryImages: [
      `${DETAIL}/service-listing-detail-row-2.jpg`,
      `${DETAIL}/service-listing-detail-row-4.jpg`,
      `${DETAIL}/service-listing-detail-row-5.jpg`,
    ],
  },
  {
    key: "shipPontoon",
    descKey: "shipPontoonDesc",
    slug: "pontoon-boats",
    image: HOME2_SHIP_TYPES[5].image,
    heroImage: HOME2_SHIP_TYPES[5].image,
    galleryImages: [
      `${DETAIL}/home-two-pricing-image-2.jpg`,
      `${DETAIL}/home-two-pricing-image-3.jpg`,
      `${DETAIL}/service-listing-detail-row-5.jpg`,
    ],
  },
];

export const SERVICE_ADVENTURE_KEYS = [
  "adventure1",
  "adventure2",
  "adventure3",
  "adventure4",
  "adventure5",
  "adventure6",
  "adventure7",
  "adventure8",
] as const;

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICE_LISTING_ITEMS.find((item) => item.slug === slug);
}
