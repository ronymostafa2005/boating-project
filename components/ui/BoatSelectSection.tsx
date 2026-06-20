"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";

const TAB_KEYS = [
  "boatSelectTabDects",
  "boatSelectTabMotor",
  "boatSelectTabCataroman",
  "boatSelectTabYacht",
  "boatSelectTabCruise",
] as const;

type BoatItem = { nameKey: string; image: string; href: string };

const TAB_BOATS: Record<(typeof TAB_KEYS)[number], BoatItem[]> = {
  boatSelectTabDects: [
    { nameKey: "boatSelectName1", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-1.jpg", href: "/boats" },
    { nameKey: "boatSelectName2", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-2.jpg", href: "/boats" },
    { nameKey: "boatSelectName3", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-3.jpg", href: "/boats" },
    { nameKey: "boatSelectName4", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-4.jpg", href: "/boats" },
    { nameKey: "boatSelectName1", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-5.jpg", href: "/boats" },
  ],
  boatSelectTabMotor: [
    { nameKey: "boatSelectName1", image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-tab-6.jpg", href: "/boats" },
    { nameKey: "boatSelectName2", image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-tab-9.jpg", href: "/boats" },
    { nameKey: "boatSelectName3", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-2.jpg", href: "/boats" },
    { nameKey: "boatSelectName4", image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-tab-8.jpg", href: "/boats" },
    { nameKey: "boatSelectName1", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-1.jpg", href: "/boats" },
  ],
  boatSelectTabCataroman: [
    { nameKey: "boatSelectName4", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-4.jpg", href: "/boats" },
    { nameKey: "boatSelectName2", image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-tab-9.jpg", href: "/boats" },
    { nameKey: "boatSelectName3", image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-tab-7.jpg", href: "/boats" },
    { nameKey: "boatSelectName4", image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-tab-8.jpg", href: "/boats" },
    { nameKey: "boatSelectName1", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-5.jpg", href: "/boats" },
  ],
  boatSelectTabYacht: [
    { nameKey: "boatSelectName3", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-3.jpg", href: "/boats" },
    { nameKey: "boatSelectName1", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-1.jpg", href: "/boats" },
    { nameKey: "boatSelectName1", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-5.jpg", href: "/boats" },
    { nameKey: "boatSelectName3", image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-tab-7.jpg", href: "/boats" },
    { nameKey: "boatSelectName1", image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-tab-9.jpg", href: "/boats" },
  ],
  boatSelectTabCruise: [
    { nameKey: "boatSelectName1", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-2.jpg", href: "/boats" },
    { nameKey: "boatSelectName4", image: "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/home-1-tab-4.jpg", href: "/boats" },
    { nameKey: "boatSelectName3", image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-tab-6.jpg", href: "/boats" },
    { nameKey: "boatSelectName4", image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-tab-8.jpg", href: "/boats" },
    { nameKey: "boatSelectName1", image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-tab-9.jpg", href: "/boats" },
  ],
};

function TabArrowIcon({ isRtl }: { isRtl: boolean }) {
  return (
    <svg
      className={cn("h-3 w-6 shrink-0 opacity-70", isRtl && "flip-rtl")}
      viewBox="0 0 100 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M98.7 12.6 84.4 22.8c-.3.2-.7.2-1-.1-.3-.2-.3-.6-.1-.9l6.2-9.9-6.1-9.7c-.2-.3-.1-.7.1-.9.1-.1.3-.2.5-.2.2 0 .3 0 .4.1l14.2 10.2c.2.1.3.4.3.6 0 .2-.1.4-.3.6z" />
      <path d="M82.7 13.6H1v-3.4h81.7V13.6z" />
    </svg>
  );
}

function BoatSelectCard({
  name,
  price,
  image,
  href,
  bookLabel,
  locale,
}: {
  name: string;
  price: string;
  image: string;
  href: string;
  bookLabel: string;
  locale: string;
}) {
  return (
    <article className="boat-select-card group relative aspect-[5/6] overflow-hidden">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        quality={IMAGE_QUALITY}
        loading="lazy"
      />
      <div className="boat-select-card-overlay absolute inset-0 flex flex-col justify-end p-5">
        <h3 className={cn(displayFontClass(locale), "text-xl text-white")}>{name}</h3>
        <p className={cn(bodyFontClass(locale), "mt-1 text-sm text-white/85")}>{price}</p>
        <Link
          href={href}
          className={cn(
            bodyFontClass(locale),
            "mt-4 inline-flex w-fit bg-neera-gold px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-neera-gold-dark"
          )}
        >
          {bookLabel}
        </Link>
      </div>
    </article>
  );
}

export function BoatSelectSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof TAB_KEYS)[number]>("boatSelectTabDects");
  const [carouselPage, setCarouselPage] = useState(0);

  const boats = TAB_BOATS[activeTab];
  const pageCount = Math.max(1, Math.ceil(boats.length / 4));
  const visibleBoats = boats.slice(carouselPage * 4, carouselPage * 4 + 4);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setContentVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setCarouselPage(0);
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="boat-select-section relative py-16 lg:py-24">
      <div className="container-luxury">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <p className={cn(bodyFontClass(locale), "mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a1a]/65")}>
              {t("boatSelectEyebrow")}
            </p>
            <SplitHeading
              wordGroups={[t("boatSelectTitle").split(" ")]}
              active={contentVisible}
              loop
              className={cn(
                displayFontClass(locale),
                "text-4xl font-normal uppercase leading-[1.1] tracking-[0.04em] text-[#1a1a1a] sm:text-5xl lg:text-[3.25rem]"
              )}
            />
          </div>
          <Link
            href="/boats"
            className={`neera-btn-know-more mt-2 inline-flex shrink-0 animate-on-scroll-right ${contentVisible ? "visible" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            {t("boatSelectViewAll")}
          </Link>
        </div>

        <div
          className={`mb-10 flex flex-wrap gap-0 border-b border-[#1a1a1a]/10 animate-on-scroll-right ${contentVisible ? "visible" : ""}`}
          style={{ transitionDelay: "350ms" }}
          role="tablist"
        >
          {TAB_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              onClick={() => setActiveTab(key)}
              className={cn(
                "boat-select-tab flex items-center gap-2 px-5 py-4 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors sm:px-6",
                bodyFontClass(locale),
                activeTab === key
                  ? "boat-select-tab-active text-neera-gold"
                  : "text-[#1a1a1a]/55 hover:text-[#1a1a1a]"
              )}
            >
              {t(key)}
              <TabArrowIcon isRtl={isRtl} />
            </button>
          ))}
        </div>

        <div
          className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-on-scroll-right ${contentVisible ? "visible" : ""}`}
          style={{ transitionDelay: "500ms" }}
        >
          {visibleBoats.map((boat, i) => (
            <BoatSelectCard
              key={`${activeTab}-${carouselPage}-${i}`}
              name={t(boat.nameKey)}
              price={t("boatSelectPrice")}
              image={boat.image}
              href={boat.href}
              bookLabel={t("boatSelectBookNow")}
              locale={locale}
            />
          ))}
        </div>

        {pageCount > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCarouselPage(i)}
                className={`h-1.5 rounded-full transition-all ${
                  carouselPage === i ? "w-7 bg-neera-gold" : "w-1.5 bg-[#1a1a1a]/25"
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
