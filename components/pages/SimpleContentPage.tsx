import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

type PageKey =
  | "ourCrew"
  | "pricingPlans"
  | "shop"
  | "shopDetail"
  | "myAccount"
  | "cart"
  | "wishlist"
  | "checkout"
  | "portfolio"
  | "portfolioDetail"
  | "services"
  | "serviceDetail"
  | "login"
  | "comingSoon"
  | "page404";

type Props = {
  params: Promise<{ locale: string }>;
  pageKey: PageKey;
};

export async function generateSimplePageMetadata(
  { params }: Pick<Props, "params">,
  pageKey: PageKey
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return { title: t(`${pageKey}.title`), description: t(`${pageKey}.subtitle`) };
}

export async function SimpleContentPage({ params, pageKey }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages");

  return (
    <>
      <PageHeader title={t(`${pageKey}.title`)} subtitle={t(`${pageKey}.subtitle`)} />
      <section className="py-16">
        <div className="container-luxury max-w-3xl">
          <p className="text-lg leading-relaxed text-gray-600">{t(`${pageKey}.body`)}</p>
        </div>
      </section>
    </>
  );
}
