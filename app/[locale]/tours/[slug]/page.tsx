import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { TourDetailSection } from "@/components/tours/TourDetailSection";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { getTourBySlug, TOUR_LISTING_ITEMS } from "@/data/tours";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return TOUR_LISTING_ITEMS.flatMap((item) =>
    ["en", "ar"].map((locale) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Not Found" };
  const t = await getTranslations({ locale, namespace: "tours" });
  return {
    title: t(`items.${tour.descriptionKey}.name`),
    description: t("metaDescription"),
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const t = await getTranslations("tours");
  const tNav = await getTranslations("nav");
  const tourName = t(`items.${tour.descriptionKey}.name`);

  return (
    <>
      <PageBreadcrumb
        title={tourName}
        homeLabel={tNav("home")}
        locale={locale}
        segments={[
          { label: t("title"), href: "/tours" },
          { label: tourName },
        ]}
      />
      <TourDetailSection tour={tour} />
    </>
  );
}
