import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPageContent } from "@/lib/sanity/fetch";
import { getLocalized } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title") };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const content = await getPageContent("privacy");

  return (
    <>
      <PageHeader title={t("title")} />
      <section className="py-16">
        <div className="container-luxury max-w-3xl">
          <div className="prose prose-invert max-w-none leading-relaxed text-gray-300">
            {content
              ? getLocalized(content.content, locale as Locale)
              : ""}
          </div>
        </div>
      </section>
    </>
  );
}
