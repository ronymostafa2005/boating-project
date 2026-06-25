import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { ShopProductDescriptionSection } from "@/components/shop/ShopProductDescriptionSection";
import { ShopProductDetailSection } from "@/components/shop/ShopProductDetailSection";
import { ShopRelatedProductsSection } from "@/components/shop/ShopRelatedProductsSection";
import {
  getShopProductBySlug,
  getShopRelatedProducts,
  SHOP_PRODUCTS,
} from "@/data/shop";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return SHOP_PRODUCTS.flatMap((product) =>
    ["en", "ar"].map((locale) => ({ locale, slug: product.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getShopProductBySlug(slug);
  if (!product) return { title: "Not Found" };
  const t = await getTranslations({ locale, namespace: "shop" });
  return {
    title: t(product.nameKey),
    description: t("metaDescription"),
  };
}

export default async function ShopProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getShopProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("shop");
  const tNav = await getTranslations("nav");
  const related = getShopRelatedProducts(product);

  return (
    <>
      <PageBreadcrumb
        title={t("title")}
        homeLabel={tNav("home")}
        locale={locale}
        segments={[
          { label: t(product.categoryKey), href: "/shop" },
          { label: t(product.nameKey) },
        ]}
      />
      <ShopProductDetailSection product={product} />
      <ShopProductDescriptionSection />
      <ShopRelatedProductsSection products={related} />
    </>
  );
}
