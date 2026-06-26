import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { BookingListsSection } from "@/components/tours/BookingListsSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });
  return { title: t("bookingListsTitle"), description: t("metaDescription") };
}

export default async function BookingListsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tours");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageBreadcrumb title={t("bookingListsTitle")} homeLabel={tNav("home")} locale={locale} />
      <BookingListsSection />
    </>
  );
}
