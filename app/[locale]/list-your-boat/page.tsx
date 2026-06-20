import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ListBoatForm } from "@/components/forms/ListBoatForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "listBoat" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ListYourBoatPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("listBoat");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="py-16">
        <div className="container-luxury max-w-2xl">
          <ListBoatForm />
        </div>
      </section>
    </>
  );
}
