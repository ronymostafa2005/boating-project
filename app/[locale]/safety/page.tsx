import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { getPageContent } from "@/lib/sanity/fetch";
import { getLocalized } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "safety" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function SafetyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("safety");
  const content = await getPageContent("safety");

  const items =
    content?.sections?.map((section, i) => ({
      id: `safety-${i}`,
      title: getLocalized(section.title, locale as Locale),
      content: getLocalized(section.content, locale as Locale),
    })) || [];

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="py-16">
        <div className="container-luxury max-w-3xl">
          {content && (
            <p className="mb-10 text-lg text-gray-300">
              {getLocalized(content.content, locale as Locale)}
            </p>
          )}
          <Accordion items={items} />
        </div>
      </section>
    </>
  );
}
