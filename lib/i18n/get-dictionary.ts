import type { Locale } from "@/types/locale";

const dictionaries = {
  ar: () => import("@/messages/ar.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
