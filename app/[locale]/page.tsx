import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { BookNowSection } from "@/components/ui/BookNowSection";
import { CategoryShowcase } from "@/components/ui/CategoryShowcase";
import { BoatTravellingSection } from "@/components/ui/BoatTravellingSection";
import { BoatSelectSection } from "@/components/ui/BoatSelectSection";
import { StatsCounterSection } from "@/components/ui/StatsCounterSection";
import { GorgeousVistasSection } from "@/components/ui/GorgeousVistasSection";
import { ExtravagantBoatSection } from "@/components/ui/ExtravagantBoatSection";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { BlogUpdatesSection } from "@/components/ui/BlogUpdatesSection";
import { FaqParallaxSection } from "@/components/ui/FaqParallaxSection";
import { PartnersSection } from "@/components/ui/PartnersSection";
import type { Locale } from "@/types/locale";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <Hero
        eyebrow={t("heroEyebrow")}
        titleLine1={t("heroTitleLine1")}
        titleLine2={t("heroTitleLine2")}
        description={t("heroDescription")}
        exploreText={t("heroExplore")}
        exploreHref="/boats"
        viewVideoText={t("heroViewVideo")}
        prevLabel={t("heroPrev")}
        nextLabel={t("heroNext")}
        locale={locale as Locale}
      />

      <BookNowSection />

      <CategoryShowcase />

      <BoatTravellingSection />

      <BoatSelectSection />

      <StatsCounterSection />

      <GorgeousVistasSection />

      <ExtravagantBoatSection />

      <TestimonialsSection />

      <BlogUpdatesSection />

      <FaqParallaxSection />

      <PartnersSection />
    </>
  );
}
