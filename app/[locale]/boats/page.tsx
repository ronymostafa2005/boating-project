import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { BoatFilters } from "@/components/boats/BoatFilters";
import { getBoats } from "@/lib/sanity/fetch";
import type { Locale } from "@/types/locale";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "boats" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function BoatsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("boats");
  const boats = await getBoats();

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="py-16">
        <div className="container-luxury">
          <BoatFilters boats={boats} locale={locale as Locale} />
        </div>
      </section>
    </>
  );
}
