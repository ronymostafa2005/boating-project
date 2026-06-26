import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { BookingDetailsSection } from "@/components/tours/BookingDetailsSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });
  return { title: t("bookingDetailsTitle"), description: t("metaDescription") };
}

export default async function BookingDetailsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tours");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageBreadcrumb title={t("bookingDetailsTitle")} homeLabel={tNav("home")} locale={locale} />
      <Suspense fallback={null}>
        <BookingDetailsSection />
      </Suspense>
    </>
  );
}
