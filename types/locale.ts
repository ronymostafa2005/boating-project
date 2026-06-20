export type Locale = "ar" | "en";

export const locales: Locale[] = ["ar", "en"];
export const defaultLocale: Locale = "ar";

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}
