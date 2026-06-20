import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { HeroHome2 } from "@/components/home2/HeroHome2";
import { AboutBookYachtSection } from "@/components/home2/AboutBookYachtSection";
import { ShipTypesSection } from "@/components/home2/ShipTypesSection";
import { JourneyBoatSection } from "@/components/home2/JourneyBoatSection";
import { PortfolioSection } from "@/components/home2/PortfolioSection";
import { PricingPlanSection } from "@/components/home2/PricingPlanSection";
import { TeamSection } from "@/components/home2/TeamSection";
import { TravelLocationsSection } from "@/components/home2/TravelLocationsSection";
import { CountersContactSection } from "@/components/home2/CountersContactSection";
import { GallerySection } from "@/components/home2/GallerySection";
import { InstagramSection } from "@/components/home2/InstagramSection";
import { NewsletterPopup } from "@/components/home2/NewsletterPopup";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home2" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function Home2Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroHome2 />
      <AboutBookYachtSection />
      <ShipTypesSection />
      <JourneyBoatSection />
      <PortfolioSection />
      <PricingPlanSection />
      <TeamSection />
      <TravelLocationsSection />
      <CountersContactSection />
      <GallerySection />
      <InstagramSection />
      <NewsletterPopup />
    </>
  );
}
