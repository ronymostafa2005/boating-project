export interface Marina {
  id: string;
  name: { ar: string; en: string };
  lat: number;
  lng: number;
  description: { ar: string; en: string };
}

export const marinas: Marina[] = [
  {
    id: "yacht-club-jeddah",
    name: { ar: "نادي اليخوت بجدة", en: "Yacht Club Jeddah" },
    lat: 21.5433,
    lng: 39.1728,
    description: {
      ar: "المرسى الرئيسي لأسطولنا الفاخر",
      en: "Our main marina for luxury fleet departures",
    },
  },
  {
    id: "jeddah-corniche",
    name: { ar: "كورنيش جدة", en: "Jeddah Corniche" },
    lat: 21.5169,
    lng: 39.1748,
    description: {
      ar: "نقطة انطلاق مثالية برؤية بانورامية",
      en: "Ideal departure point with panoramic views",
    },
  },
  {
    id: "obhur",
    name: { ar: "أبحر", en: "Obhur" },
    lat: 21.7731,
    lng: 39.1061,
    description: {
      ar: "مياه هادئة مثالية للرحلات العائلية",
      en: "Calm waters perfect for family trips",
    },
  },
];

export function getGoogleMapsEmbedUrl(lat: number, lng: number): string {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";
  if (!key) {
    return `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
  }
  return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${lat},${lng}&zoom=14`;
}

export function getAllMarinasMapUrl(): string {
  const center = "21.6,39.15";
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";
  if (!key) {
    return `https://maps.google.com/maps?q=${center}&z=11&output=embed`;
  }
  return `https://www.google.com/maps/embed/v1/view?key=${key}&center=${center}&zoom=11`;
}
