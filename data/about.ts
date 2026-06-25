export const HOME_ABOUT_STATS = [
  { value: 1025, labelKey: "statsHappyClients" },
  { value: 250, labelKey: "statsBoatsWeOwn" },
  { value: 100, labelKey: "statsVariousLocations" },
  { value: 500, labelKey: "statsIslandJourneys" },
  { value: 20, labelKey: "statsYearsInField" },
] as const;

const CDN = "https://neera.wpenginepowered.com/wp-content/uploads";

export const ABOUT_PARTNERS = [
  {
    id: "dance",
    logo: `${CDN}/2023/12/Neera-Client-4.png`,
    logoWidth: 139,
    logoHeight: 130,
    hoverBg: `${CDN}/2023/12/Neera-Client-logo-bg-01.jpg`,
    delay: 0.2,
  },
  {
    id: "charlie",
    logo: `${CDN}/2023/12/Neera-Client-3.png`,
    logoWidth: 195,
    logoHeight: 93,
    hoverBg: `${CDN}/2024/01/contact-hover-image-1.jpg`,
    delay: 0.35,
  },
  {
    id: "weport",
    logo: `${CDN}/2023/12/Neera-Client-2.png`,
    logoWidth: 219,
    logoHeight: 130,
    hoverBg: `${CDN}/2024/01/contact-hover-image-2.jpg`,
    delay: 0.55,
  },
  {
    id: "bight",
    logo: `${CDN}/2023/12/Neera-Client-1.png`,
    logoWidth: 217,
    logoHeight: 93,
    hoverBg: `${CDN}/2024/01/contact-hover-image-3.jpg`,
    delay: 0.75,
  },
] as const;
