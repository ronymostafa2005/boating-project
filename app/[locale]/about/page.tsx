import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { AboutNewsletterSection } from "@/components/about/AboutNewsletterSection";
import { AboutPartnersSection } from "@/components/about/AboutPartnersSection";
import { AboutTeamSection } from "@/components/about/AboutTeamSection";
import { AboutStatsCounterSection } from "@/components/about/AboutStatsCounterSection";
import { AboutTravellingSection } from "@/components/about/AboutTravellingSection";
import { AboutBookYachtSection } from "@/components/home2/AboutBookYachtSection";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageBreadcrumb title={t("title")} homeLabel={tNav("home")} locale={locale} />
      <AboutBookYachtSection />
      <AboutTravellingSection />
      <AboutStatsCounterSection />
      <AboutNewsletterSection />
      <AboutTeamSection />
      <AboutPartnersSection />
    </>
  );
}
