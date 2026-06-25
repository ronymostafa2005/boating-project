import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/types/locale";
import type { LocalizedString } from "@/types/boat";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRtlLocale(locale: string): boolean {
  return locale === "ar";
}

export function bodyFontClass(locale: string): string {
  return isRtlLocale(locale) ? "font-bodyAr" : "font-bodyEn";
}

export function displayFontClass(locale: string): string {
  return isRtlLocale(locale) ? "font-displayAr" : "font-displayEn";
}

export function home2FontClass(locale: string): string {
  return isRtlLocale(locale) ? "font-bodyAr" : "font-marcellus";
}

export function home2DisplayFontClass(locale: string): string {
  return isRtlLocale(locale) ? "font-displayAr" : "font-marcellus";
}

export function getLocalized(
  field: LocalizedString | string | undefined,
  locale: Locale
): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[locale] || field.en || field.ar || "";
}

export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(amount);
}
