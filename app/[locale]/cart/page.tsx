import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { CartSection } from "@/components/cart/CartSection";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cart" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function CartPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cart");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageBreadcrumb title={t("title")} homeLabel={tNav("home")} locale={locale} />
      <CartSection />
    </>
  );
}
