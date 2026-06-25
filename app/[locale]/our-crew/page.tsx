import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { CrewMemberGrid } from "@/components/our-crew/CrewMemberGrid";
import { CrewTestimonialsSection } from "@/components/our-crew/CrewTestimonialsSection";
import { PricingPlanSection } from "@/components/home2/PricingPlanSection";
import { OUR_CREW_ROW_1, OUR_CREW_ROW_2 } from "@/data/ourCrew";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ourCrew" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function OurCrewPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ourCrew");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageBreadcrumb title={t("title")} homeLabel={tNav("home")} locale={locale} />
      <CrewMemberGrid members={OUR_CREW_ROW_1} />
      <CrewMemberGrid members={OUR_CREW_ROW_2} />
      <CrewTestimonialsSection />
      <PricingPlanSection />
    </>
  );
}
