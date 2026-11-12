const VBO = "/images/neera/vikbooking";
const CDN = "/images/neera";

export const TOUR_LOCATION_FILTERS = [
  "all",
  "california",
  "canada",
  "french",
  "icelands",
  "indonesia",
  "kerela",
  "usa",
] as const;

export type TourLocation = (typeof TOUR_LOCATION_FILTERS)[number];

export type TourItem = {
  slug: string;
  location: Exclude<TourLocation, "all">;
  price: string;
  capacity: number;
  image: string;
  gallery: string[];
  descriptionKey: string;
};

export const TOUR_LISTING_ITEMS: TourItem[] = [
  {
    slug: "robin-yacht",
    location: "canada",
    price: "100",
    capacity: 4,
    image: `${VBO}/neera-rooms-listing-img03.jpg`,
    gallery: [`${VBO}/neera-rooms-listing-img03.jpg`, `${VBO}/tour-detail-1.jpg`, `${VBO}/tour-detail-2.jpg`],
    descriptionKey: "robinYacht",
  },
  {
    slug: "sea-roger",
    location: "french",
    price: "100",
    capacity: 3,
    image: `${VBO}/neera-tour-listing-img-02.jpg`,
    gallery: [`${VBO}/neera-tour-listing-img-02.jpg`, `${VBO}/tour-detail-3.jpg`],
    descriptionKey: "seaRoger",
  },
  {
    slug: "roast-jack",
    location: "indonesia",
    price: "100",
    capacity: 4,
    image: `${VBO}/tour-detail-4.jpg`,
    gallery: [`${VBO}/tour-detail-4.jpg`, `${VBO}/tour-detail-5.jpg`],
    descriptionKey: "roastJack",
  },
  {
    slug: "sea-kean",
    location: "california",
    price: "140",
    capacity: 4,
    image: `${VBO}/tour-detail-6.jpg`,
    gallery: [`${VBO}/tour-detail-6.jpg`],
    descriptionKey: "seaKean",
  },
  {
    slug: "milly-harry",
    location: "california",
    price: "150",
    capacity: 2,
    image: `${VBO}/tour-detail-8.jpg`,
    gallery: [`${VBO}/tour-detail-8.jpg`],
    descriptionKey: "millyHarry",
  },
  {
    slug: "rickshaw",
    location: "french",
    price: "200",
    capacity: 2,
    image: `${VBO}/neera-tour-listing-img-01.jpg`,
    gallery: [`${VBO}/neera-tour-listing-img-01.jpg`],
    descriptionKey: "rickshaw",
  },
  {
    slug: "ocean-rider",
    location: "usa",
    price: "200",
    capacity: 2,
    image: `${VBO}/tour-detail-5.jpg`,
    gallery: [`${VBO}/tour-detail-5.jpg`],
    descriptionKey: "oceanRider",
  },
  {
    slug: "murphy-rider",
    location: "indonesia",
    price: "210",
    capacity: 2,
    image: `${VBO}/tour-detail-10.jpg`,
    gallery: [`${VBO}/tour-detail-10.jpg`],
    descriptionKey: "murphyRider",
  },
  {
    slug: "ocean-angel",
    location: "icelands",
    price: "210",
    capacity: 2,
    image: `${VBO}/tour-detail-11.jpg`,
    gallery: [`${VBO}/tour-detail-11.jpg`],
    descriptionKey: "oceanAngel",
  },
  {
    slug: "ocean-hero",
    location: "icelands",
    price: "210",
    capacity: 2,
    image: `${VBO}/tour-detail-12.jpg`,
    gallery: [`${VBO}/tour-detail-12.jpg`],
    descriptionKey: "oceanHero",
  },
  {
    slug: "party-yacht",
    location: "canada",
    price: "235",
    capacity: 4,
    image: `${CDN}/2023/12/1.jpg`,
    gallery: [`${CDN}/2023/12/1.jpg`, `${CDN}/2023/12/2.jpg`],
    descriptionKey: "partyYacht",
  },
  {
    slug: "joans-cataran",
    location: "kerela",
    price: "300",
    capacity: 4,
    image: `${CDN}/2023/12/3.jpg`,
    gallery: [`${CDN}/2023/12/3.jpg`],
    descriptionKey: "joansCataran",
  },
  {
    slug: "deep-blue-horse",
    location: "california",
    price: "400",
    capacity: 4,
    image: `${CDN}/2023/12/4.jpg`,
    gallery: [`${CDN}/2023/12/4.jpg`],
    descriptionKey: "deepBlueHorse",
  },
  {
    slug: "mona-arch",
    location: "usa",
    price: "400",
    capacity: 4,
    image: `${CDN}/2023/12/5.jpg`,
    gallery: [`${CDN}/2023/12/5.jpg`],
    descriptionKey: "monaArch",
  },
  {
    slug: "magical-yacht",
    location: "kerela",
    price: "400",
    capacity: 4,
    image: `${CDN}/2023/12/6.jpg`,
    gallery: [`${CDN}/2023/12/6.jpg`, `${CDN}/2023/12/7.jpg`],
    descriptionKey: "magicalYacht",
  },
  {
    slug: "charlie-miller",
    location: "usa",
    price: "400",
    capacity: 4,
    image: `${CDN}/2023/12/8.jpg`,
    gallery: [`${CDN}/2023/12/8.jpg`],
    descriptionKey: "charlieMiller",
  },
];

export const BOOKING_LIST_MOCK = [
  {
    id: "BK-2401",
    tourSlug: "magical-yacht",
    checkIn: "2026-07-12",
    checkOut: "2026-07-15",
    rooms: 1,
    adults: 2,
    statusKey: "confirmed" as const,
    total: "1200",
  },
  {
    id: "BK-2398",
    tourSlug: "robin-yacht",
    checkIn: "2026-08-02",
    checkOut: "2026-08-04",
    rooms: 1,
    adults: 4,
    statusKey: "pending" as const,
    total: "200",
  },
  {
    id: "BK-2385",
    tourSlug: "party-yacht",
    checkIn: "2026-06-20",
    checkOut: "2026-06-22",
    rooms: 2,
    adults: 6,
    statusKey: "cancelled" as const,
    total: "470",
  },
];

export function getTourBySlug(slug: string): TourItem | undefined {
  return TOUR_LISTING_ITEMS.find((item) => item.slug === slug);
}

export function getToursByLocation(location: TourLocation): TourItem[] {
  if (location === "all") return TOUR_LISTING_ITEMS;
  return TOUR_LISTING_ITEMS.filter((item) => item.location === location);
}

/** Map home2 journey cards to full tour slugs */
export const HOME2_TOUR_SLUGS: Record<string, string> = {
  tour1Name: "robin-yacht",
  tour2Name: "rickshaw",
  tour3Name: "sea-kean",
  tour4Name: "ocean-rider",
};
