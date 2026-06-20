import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howItWorks" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function HowItWorksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("howItWorks");

  const steps = [
    {
      num: "01",
      title: t("step1Title"),
      desc: t("step1Desc"),
      icon: "🔍",
    },
    {
      num: "02",
      title: t("step2Title"),
      desc: t("step2Desc"),
      icon: "📅",
    },
    {
      num: "03",
      title: t("step3Title"),
      desc: t("step3Desc"),
      icon: "⛵",
    },
  ];

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <section className="py-16">
        <div className="container-luxury max-w-4xl space-y-16">
          {steps.map((step) => (
            <ScrollReveal key={step.num}>
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-gray-50 text-4xl">
                  {step.icon}
                </div>
                <div className="text-center sm:text-start">
                  <span className="mb-2 block text-sm font-bold text-gold">
                    {step.num}
                  </span>
                  <h2 className="mb-3 text-2xl font-semibold">{step.title}</h2>
                  <p className="leading-relaxed text-gray-400">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
