import type { Locale } from "@/types/locale";
import type { BokunWidgetType } from "./types";

export const BOKUN_LOADER_URL =
  "https://extranet.bokun.io/public/widget/loader.js";

export const bokunConfig = {
  vendorId: process.env.NEXT_PUBLIC_BOKUN_VENDOR_ID || "",
  channelId: process.env.NEXT_PUBLIC_BOKUN_CHANNEL_ID || "",
};

export function getBokunLocale(locale: Locale): string {
  return locale === "ar" ? "ar_SA" : "en";
}

export function getBokunWidgetUrl(
  productId: string,
  widgetType: BokunWidgetType,
  locale: Locale
): string {
  const bokunLocale = getBokunLocale(locale);
  const base = `https://widgets.bokun.io/online-sales/${bokunConfig.vendorId}/experience/${productId}`;
  const params = new URLSearchParams({
    lang: bokunLocale,
    widgetType,
  });
  if (bokunConfig.channelId) {
    params.set("channelId", bokunConfig.channelId);
  }
  return `${base}?${params.toString()}`;
}
