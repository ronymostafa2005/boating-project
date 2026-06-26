import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { RoomAvailabilitySection } from "@/components/tours/RoomAvailabilitySection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tours" });
  return { title: t("roomAvailabilityTitle"), description: t("metaDescription") };
}

export default async function RoomAvailabilityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tours");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageBreadcrumb title={t("roomAvailabilityTitle")} homeLabel={tNav("home")} locale={locale} />
      <RoomAvailabilitySection />
    </>
  );
}
