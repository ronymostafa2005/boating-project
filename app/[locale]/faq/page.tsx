import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
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
  const faqs = await getFaqs();

  const items = faqs.map((faq) => ({
    id: faq._id,
    title: getLocalized(faq.question, locale as Locale),
    content: getLocalized(faq.answer, locale as Locale),
  }));

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="py-16">
        <div className="container-luxury max-w-3xl">
          <Accordion items={items} />
        </div>
      </section>
    </>
  );
}
