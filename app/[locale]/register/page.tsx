import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { RegisterSection } from "@/components/auth/RegisterSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "register" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RegisterSection />;
}
