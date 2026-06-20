"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Link } from "@/lib/i18n/navigation";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { cn, bodyFontClass } from "@/lib/utils";
import { slideInFromEnd } from "@/lib/motionVariants";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";

const BLOG_POSTS = [
  {
    id: "inspired",
    titleKey: "blogPost1Title",
    excerptKey: "blogPost1Excerpt",
    image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/blog-1.jpg",
    href: "#",
  },
  {
    id: "enjoy",
    titleKey: "blogPost2Title",
    excerptKey: "blogPost2Excerpt",
    image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/blog-2.jpg",
    href: "#",
  },
  {
    id: "destination",
    titleKey: "blogPost3Title",
    excerptKey: "blogPost3Excerpt",
    image: "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/blog-3.jpg",
    href: "#",
  },
] as const;

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease },
  },
};

function CalendarIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ReadMoreArrow({ isRtl }: { isRtl: boolean }) {
  return (
    <svg
      className={cn("h-2.5 w-4", isRtl && "flip-rtl")}
      viewBox="0 0 100 59"
      fill="currentColor"
      aria-hidden
    >
      <polygon points="59.9,6.1 79.4,25.7 6,25.7 6,33.3 79.4,33.3 59.9,52.9 65.3,58.2 94,29.5 65.3,0.8" />
    </svg>
  );
}

function BlogCard({
  title,
  excerpt,
  image,
  href,
  date,
  readMore,
  locale,
}: {
  title: string;
  excerpt: string;
  image: string;
  href: string;
  date: string;
  readMore: string;
  locale: string;
}) {
  return (
    <article className="blog-entry group">
      <div className="blog-entry-thumb relative mb-6 aspect-[880/780] overflow-hidden">
        <Link href={href} className="block h-full w-full" tabIndex={-1}>
          <Image
            src={image}
            alt={title}
            fill
            className="blog-entry-image object-cover transition-transform duration-[650ms] ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={IMAGE_QUALITY}
            loading="lazy"
          />
          <span className="blog-entry-flash pointer-events-none absolute inset-0" aria-hidden />
        </Link>
      </div>

      <div
        className={cn(
          "blog-entry-date mb-3 flex items-center gap-2 text-[11px] text-white/70",
          locale === "ar" ? "font-bodyAr" : "font-bodyEn"
        )}
      >
        <CalendarIcon />
        <span>{date}</span>
      </div>

      <h4 className="blog-entry-title mb-4">
        <Link
          href={href}
          className={cn(
            "text-xl leading-snug text-white transition-colors hover:text-neera-gold sm:text-[1.35rem]",
            locale === "ar" ? "font-displayAr" : "font-displayEn"
          )}
        >
          {title}
        </Link>
      </h4>

      <p
        className={cn(
          "blog-entry-body mb-7 text-sm leading-relaxed text-white/70",
          locale === "ar" ? "font-bodyAr" : "font-bodyEn"
        )}
      >
        {excerpt}
      </p>

      <Link
        href={href}
        className={cn("blog-entry-button inline-flex items-center gap-3", bodyFontClass(locale))}
      >
        <span>{readMore}</span>
        <ReadMoreArrow isRtl={locale === "ar"} />
      </Link>
    </article>
  );
}

export function BlogUpdatesSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  const titleWords = [
    t("blogTitle1"),
    t("blogTitle2"),
    t("blogTitle3"),
  ].filter(Boolean);

  const gridVariants = useMemo(
    () => slideInFromEnd(locale === "ar", 48, 0.3),
    [locale]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="blog-updates-section py-16 lg:py-24">
      <div className="container-luxury">
        <motion.div
          className="mb-12 text-center lg:mb-16"
          variants={zoomIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p
            className={cn(
              "mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60",
              locale === "ar" ? "font-bodyAr" : "font-bodyEn"
            )}
          >
            {t("blogEyebrow")}
          </p>
          <SplitHeading
            wordGroups={[titleWords]}
            loop
            active={inView}
            className={cn(
              "font-normal uppercase leading-tight tracking-[0.05em] text-white",
              locale === "ar" ? "font-displayAr text-3xl sm:text-4xl" : "font-displayEn text-3xl sm:text-[2.75rem]"
            )}
          />
        </motion.div>

        <motion.div
          className="blog-updates-grid grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {BLOG_POSTS.map((post) => (
            <BlogCard
              key={post.id}
              title={t(post.titleKey)}
              excerpt={t(post.excerptKey)}
              image={post.image}
              href={post.href}
              date={t("blogDate")}
              readMore={t("blogReadMore")}
              locale={locale}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
