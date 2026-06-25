import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ServiceDetailSection } from "@/components/services/ServiceDetailSection";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { getServiceBySlug, SERVICE_LISTING_ITEMS } from "@/data/services";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_LISTING_ITEMS.flatMap((item) =>
    ["en", "ar"].map((locale) => ({ locale, slug: item.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Not Found" };
  const tHome2 = await getTranslations({ locale, namespace: "home2" });
  const t = await getTranslations({ locale, namespace: "serviceDetail" });
  return {
    title: tHome2(service.key),
    description: t("metaDescription"),
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const tServices = await getTranslations("services");
  const tNav = await getTranslations("nav");
  const tHome2 = await getTranslations("home2");

  return (
    <>
      <PageBreadcrumb
        title={tHome2(service.key)}
        homeLabel={tNav("home")}
        locale={locale}
        segments={[
          { label: tServices("title"), href: "/services" },
          { label: tHome2(service.key) },
        ]}
      />
      <ServiceDetailSection service={service} />
    </>
  );
}
