import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { TourListingSection } from "@/components/tours/TourListingSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function ToursPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tours");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageBreadcrumb title={t("title")} homeLabel={tNav("home")} locale={locale} />
      <TourListingSection />
    </>
  );
}
