import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { NotFoundSection } from "@/components/404/NotFoundSection";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "page404" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function NotFoundDemoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <NotFoundSection locale={locale} fullScreen />;
}
