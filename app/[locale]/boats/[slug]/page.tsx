import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { BoatGallery } from "@/components/boats/BoatGallery";
import { BokunWidget } from "@/components/booking/BokunWidget";
import { getBoatBySlug, getBoats } from "@/lib/sanity/fetch";
import { getLocalized, formatPrice } from "@/lib/utils";
import type { Locale } from "@/types/locale";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const boats = await getBoats();
  return boats.flatMap((boat) =>
    ["ar", "en"].map((locale) => ({ locale, slug: boat.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const boat = await getBoatBySlug(slug);
  if (!boat) return { title: "Not Found" };
  return {
    title: getLocalized(boat.name, locale as Locale),
    description: getLocalized(boat.description, locale as Locale),
  };
}

export default async function BoatDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("boatDetail");
  const tBoats = await getTranslations("boats");
  const boat = await getBoatBySlug(slug);

  if (!boat) notFound();

  const name = getLocalized(boat.name, locale as Locale);
  const description = getLocalized(boat.description, locale as Locale);

  return (
    <section className="py-12 sm:py-16">
      <div className="container-luxury">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <BoatGallery images={boat.images} alt={name} />

            <div>
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <span className="rounded-full bg-gold/10 px-4 py-1 text-sm font-medium text-gold">
                  {tBoats(boat.type)}
                </span>
                <span className="text-sm text-gray-400">
                  {t("capacity")}: {boat.capacity} {tBoats("guests")}
                </span>
                {boat.marina && (
                  <span className="text-sm text-gray-400">
                    {t("marina")}: {boat.marina}
                  </span>
                )}
              </div>
              <h1 className="heading-section mb-4">{name}</h1>
              {boat.priceFrom && (
                <p className="mb-6 text-lg text-gold">
                  {tBoats("from")} {formatPrice(boat.priceFrom, locale as Locale)}
                </p>
              )}
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">{t("description")}</h2>
              <p className="leading-relaxed text-gray-400">{description}</p>
            </div>

            {boat.specs.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">{t("specs")}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {boat.specs.map((spec, i) => (
                    <div key={i} className="card-luxury flex justify-between p-4">
                      <span className="text-gray-400">
                        {getLocalized(spec.label, locale as Locale)}
                      </span>
                      <span className="font-medium">
                        {getLocalized(spec.value, locale as Locale)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {boat.addons.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">{t("addons")}</h2>
                <div className="space-y-3">
                  {boat.addons.map((addon, i) => (
                    <div
                      key={i}
                      className="card-luxury flex items-center justify-between p-4"
                    >
                      <span>{getLocalized(addon.name, locale as Locale)}</span>
                      <span className="font-medium text-gold">
                        {formatPrice(addon.price, locale as Locale)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="mb-4 text-xl font-semibold">{t("bookNow")}</h2>
              <BokunWidget
                productId={boat.bokunProductId}
                widgetType="booking"
                locale={locale}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
