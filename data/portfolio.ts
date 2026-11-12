import { HOME2_PORTFOLIO } from "@/data/home2";

const CDN = "/images/neera";

const SLUGS = [
  "harbor-heaven",
  "yacht-majesty",
  "aqua-horizon",
  "marian-bliss",
  "captain-choice",
  "island-escape",
  "yacht-retreater",
  "yacht-don",
] as const;

export type PortfolioSlug = (typeof SLUGS)[number];

export type PortfolioListingItem = (typeof HOME2_PORTFOLIO)[number] & {
  slug: PortfolioSlug;
};

export type PortfolioGallerySlide = {
  main: string;
  thumbs: [string, string, string, string];
};

/** Portfolio stories for listing slider — matches Neera portfolio page */
export const PORTFOLIO_LISTING_ITEMS: PortfolioListingItem[] = HOME2_PORTFOLIO.map((item, index) => ({
  ...item,
  slug: SLUGS[index],
}));

export const PORTFOLIO_DETAIL_GALLERY: PortfolioGallerySlide[] = [
  {
    main: `${CDN}/2023/12/1.jpg`,
    thumbs: [
      `${CDN}/2024/01/home-1-image-carousel-1.jpg`,
      `${CDN}/2024/01/contact-hover-image-1.jpg`,
      `${CDN}/2024/01/contact-hover-image-2.jpg`,
      `${CDN}/2024/01/contact-hover-image-3.jpg`,
    ],
  },
  {
    main: `${CDN}/2023/12/2.jpg`,
    thumbs: [
      `${CDN}/2024/01/home-two-pricing-image-1.jpg`,
      `${CDN}/2024/01/home-two-pricing-image-2.jpg`,
      `${CDN}/2024/01/home-two-pricing-image-3.jpg`,
      `${CDN}/2024/01/travel-location-image-1.jpg`,
    ],
  },
];

export function getPortfolioBySlug(slug: string): PortfolioListingItem | undefined {
  return PORTFOLIO_LISTING_ITEMS.find((item) => item.slug === slug);
}

export const PORTFOLIO_FEATURE_KEYS = ["feature1", "feature2", "feature3", "feature4"] as const;
export const PORTFOLIO_ADVANTAGE_KEYS = [
  "advantage1",
  "advantage2",
  "advantage3",
  "advantage4",
  "advantage5",
  "advantage6",
] as const;
