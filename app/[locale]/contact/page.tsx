import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { getGoogleMapsEmbedUrl } from "@/lib/maps/marinas";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="py-16">
        <div className="container-luxury grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <div className="relative aspect-square overflow-hidden rounded-xl border border-luxury-slate lg:aspect-auto lg:min-h-[400px]">
            <iframe
              src={getGoogleMapsEmbedUrl(21.5433, 39.1728)}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              title="Contact Map"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
