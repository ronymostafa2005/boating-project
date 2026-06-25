import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { PricingPlanSection } from "@/components/home2/PricingPlanSection";
import { PricingFaqSection } from "@/components/pricing-plans/PricingFaqSection";
import { PricingNewsletterSection } from "@/components/pricing-plans/PricingNewsletterSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPlans" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function PricingPlansPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricingPlans");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageBreadcrumb title={t("title")} homeLabel={tNav("home")} locale={locale} />
      <PricingPlanSection />
      <PricingFaqSection />
      <PricingNewsletterSection />
    </>
  );
}
