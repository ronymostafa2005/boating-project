import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { ShopListingSection } from "@/components/shop/ShopListingSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("shop");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageBreadcrumb title={t("title")} homeLabel={tNav("home")} locale={locale} />
      <ShopListingSection />
    </>
  );
}
