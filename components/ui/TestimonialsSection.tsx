"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { cn, bodyFontClass } from "@/lib/utils";
import { slideInFromEnd } from "@/lib/motionVariants";

const BG_IMAGE =
  "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/Neera-Testimonial1-Bg-.jpg";

const TESTIMONIALS = [
  {
    id: "john",
    nameKey: "testimonial1Name",
    roleKey: "testimonial1Role",
    quoteKey: "testimonial1Quote",
    rating: 5,
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/Neera-Testimonial-1-img-01.jpg",
  },
  {
    id: "joe",
    nameKey: "testimonial2Name",
    roleKey: "testimonial2Role",
    quoteKey: "testimonial2Quote",
    rating: 4,
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/Neera-Testimonial-1-img-02.jpg",
  },
  {
    id: "lara",
    nameKey: "testimonial3Name",
    roleKey: "testimonial3Role",
    quoteKey: "testimonial3Quote",
    rating: 4,
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/Neera-Testimonial-1-img-03.jpg",
  },
  {
    id: "simony",
    nameKey: "testimonial4Name",
    roleKey: "testimonial4Role",
    quoteKey: "testimonial4Quote",
    rating: 5,
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/home-1-testimonial-image-1.jpg",
  },
] as const;

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden
    >
      <path d="M1,7.2c0.4-0.1,0.7-0.1,1.1-0.1c13.2,0,26.5,0,39.7,0c0.4,0,0.8,0,1.2,0c0,0.3,0.1,0.6,0.1,0.8 c0,14.5,0.3,29-0.1,43.5C42.5,66.1,36,77.5,24.2,85.7c-6.7,4.7-14.3,7-22.4,7.1c-0.3,0-0.5,0-0.8,0c0-4.8,0-9.5,0-14.3 c1.3-0.1,2.8-0.1,4.1-0.3c11.8-1.8,21.1-10.9,23.4-22.8c0.4-1.8,0.4-3.5,0.6-5.5c-9.6,0-18.8,0-28.1,0C1,35.7,1,21.4,1,7.2z" />
      <path d="M99,52.7c-0.3,1.8-0.4,3.5-0.8,5.2c-2.1,11.1-7.7,20-16.5,26.6c-7,5.3-15,8-23.7,8.2c-0.3,0-0.5,0-0.8,0 c-0.1,0-0.1,0-0.2-0.1c0-4.7,0-9.3,0-14.1c9.6-0.3,17.4-4.3,22.9-12.3c3.4-4.8,4.9-10.2,5-16.2c-9.3,0-18.6,0-27.9,0 c0-14.4,0-28.6,0-42.9c0.3,0,0.6,0,0.9,0c13.4,0,26.8,0,40.3,0c0.3,0,0.5,0,0.8,0.1C99,22.4,99,37.6,99,52.7z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <ul className="testimonial-stars flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <li key={i}>
          <svg
            className={cn("h-3 w-3", i < rating ? "text-neera-gold" : "text-white/40")}
            viewBox="0 0 24 24"
            fill={i < rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={i < rating ? 0 : 1.5}
            aria-hidden
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

function TestimonialCard({
  name,
  role,
  quote,
  rating,
  image,
  index,
  isActive,
  onActivate,
  locale,
}: {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image: string;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  locale: string;
}) {
  return (
    <article
      className={cn(
        "testimonial-item group relative flex min-h-[360px] flex-col justify-end overflow-hidden px-6 py-10 sm:min-h-[400px] sm:px-8 lg:min-h-[420px] lg:px-10",
        isActive && "testimonial-item-active"
      )}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      tabIndex={0}
      style={{ "--bg-index": index } as React.CSSProperties}
    >
      <div className="testimonial-card-bg pointer-events-none absolute inset-0" aria-hidden>
        <div className="testimonial-card-bg-pan h-full">
          <Image
            src={BG_IMAGE}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="testimonials-overlay absolute inset-0" />
        </div>
      </div>

      <div
        className={cn(
          "testimonial-quote-block relative z-[1] mb-8 transition-all duration-500",
          isActive
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        )}
      >
        <QuoteIcon className="mb-5 h-8 w-8 text-white/90" />
        <p
          className={cn(
            "text-sm leading-relaxed text-white/85",
            locale === "ar" ? "font-bodyAr" : "font-bodyEn"
          )}
        >
          {quote}
        </p>
      </div>

      <div className="testimonial-meta relative z-[1]">
        <div className="mb-4 flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full sm:h-[52px] sm:w-[52px]">
            <Image src={image} alt={name} fill className="object-cover" sizes="52px" />
          </div>
          <div>
            <h5
              className={cn(
                "text-sm font-medium text-white sm:text-[15px]",
                locale === "ar" ? "font-bodyAr" : "font-bodyEn"
              )}
            >
              {name}
            </h5>
            <p
              className={cn(
                "text-xs text-white/65",
                locale === "ar" ? "font-bodyAr" : "font-bodyEn"
              )}
            >
              {role}
            </p>
          </div>
        </div>
        <StarRating rating={rating} />
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobilePage, setMobilePage] = useState(0);

  const sectionVariants = useMemo(
    () => slideInFromEnd(locale === "ar", 48, 0.3),
    [locale]
  );

  const scrollToPage = (page: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxPage = TESTIMONIALS.length - 1;
    const next = Math.max(0, Math.min(maxPage, page));
    setMobilePage(next);
    const card = el.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <motion.section
      className="testimonials-section relative overflow-hidden bg-[#0f1e2d]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="relative z-[1]">
        <div
          ref={scrollRef}
          className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {TESTIMONIALS.map((item, index) => (
            <TestimonialCard
              key={item.id}
              index={index}
              name={t(item.nameKey)}
              role={t(item.roleKey)}
              quote={t(item.quoteKey)}
              rating={item.rating}
              image={item.image}
              isActive={activeIndex === index}
              onActivate={() => setActiveIndex(index)}
              locale={locale}
            />
          ))}
        </div>

        <div className="testimonials-pagination flex justify-center gap-6 px-6 py-5 lg:hidden">
          <button
            type="button"
            onClick={() => scrollToPage(mobilePage - 1)}
            disabled={mobilePage === 0}
            className={cn(
              bodyFontClass(locale),
              "text-[10px] uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white disabled:opacity-30"
            )}
          >
            {t("testimonialPrev")}
          </button>
          <button
            type="button"
            onClick={() => scrollToPage(mobilePage + 1)}
            disabled={mobilePage === TESTIMONIALS.length - 1}
            className={cn(
              bodyFontClass(locale),
              "text-[10px] uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white disabled:opacity-30"
            )}
          >
            {t("testimonialNext")}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
