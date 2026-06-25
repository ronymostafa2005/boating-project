import { getLocale } from "next-intl/server";
import { NotFoundSection } from "@/components/404/NotFoundSection";

export default async function LocaleNotFound() {
  const locale = await getLocale();
  return <NotFoundSection locale={locale} fullScreen />;
}
