import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ForgotPasswordSection } from "@/components/auth/ForgotPasswordSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "forgotPasswordPage" });
  return { title: t("title"), description: t("metaDescription") };
}

export default async function ForgotPasswordPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ForgotPasswordSection />;
}
