import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { FaqPageSection } from "@/components/faq/FaqPageSection";
import { getFaqs } from "@/lib/sanity/fetch";
import { getLocalized } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const tNav = await getTranslations("nav");
  const faqs = await getFaqs();

  const items = faqs.map((faq) => ({
    id: faq._id,
    title: getLocalized(faq.question, locale as Locale),
    content: getLocalized(faq.answer, locale as Locale),
  }));

  return (
    <>
      <PageBreadcrumb title={t("title")} homeLabel={tNav("home")} locale={locale} />
      <FaqPageSection items={items} />
    </>
  );
}
