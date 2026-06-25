import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { CrewTestimonialsSection } from "@/components/our-crew/CrewTestimonialsSection";
import { PricingPlanSection } from "@/components/home2/PricingPlanSection";
import { PortfolioDetailSection } from "@/components/portfolio/PortfolioDetailSection";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { getPortfolioBySlug, PORTFOLIO_LISTING_ITEMS } from "@/data/portfolio";
type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return PORTFOLIO_LISTING_ITEMS.flatMap((item) =>
    ["en", "ar"].map((locale) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getPortfolioBySlug(slug);
  if (!product) return { title: "Not Found" };
  const tHome2 = await getTranslations({ locale, namespace: "home2" });
  const t = await getTranslations({ locale, namespace: "portfolioDetail" });
  return {
    title: tHome2(product.nameKey),
    description: t("metaDescription"),
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getPortfolioBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("portfolio");
  const tNav = await getTranslations("nav");
  const tHome2 = await getTranslations("home2");

  return (
    <>
      <PageBreadcrumb
        title={tHome2(product.nameKey)}
        homeLabel={tNav("home")}
        locale={locale}
        segments={[
          { label: t("title"), href: "/portfolio" },
          { label: tHome2(product.nameKey) },
        ]}
      />
      <PortfolioDetailSection />
      <CrewTestimonialsSection />
      <PricingPlanSection />
    </>
  );
}
