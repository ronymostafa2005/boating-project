"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { HOME2_COUNTERS, HOME2_COUNTERS_BG } from "@/data/home2";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { MOTION_EASE } from "@/lib/motionVariants";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

const COUNTERS_TITLE_GROUPS: Record<string, string[][]> = {
  en: [["We", "Recommend"], ["Beautiful", "Places"]],
  ar: [["نوصي", "بأماكن"], ["جميلة"]],
};

const CONTACT_TITLE_GROUPS: Record<string, string[][]> = {
  en: [["Do", "you", "have"], ["any", "inquiries?"]],
  ar: [["هل", "لديك"], ["أي", "استفسارات؟"]],
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: MOTION_EASE, delay: 0.3 },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: MOTION_EASE, delay: 0.3 },
  },
};

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

export function CountersContactSection() {
  const t = useTranslations("home2");
  const tContact = useTranslations("contact");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    const interest = String(data.get("interest") || "");
    const budget = String(data.get("budget") || "");
    const message = String(data.get("message") || "");
    const extra = [interest && `Interest: ${interest}`, budget && `Budget: ${budget}`]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: extra ? `${message}\n\n${extra}` : message,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const countersTitleGroups =
    COUNTERS_TITLE_GROUPS[locale] ?? COUNTERS_TITLE_GROUPS.en;
  const contactTitleGroups =
    CONTACT_TITLE_GROUPS[locale] ?? CONTACT_TITLE_GROUPS.en;

  return (
    <section
      ref={sectionRef}
      className="home2-counters-contact relative overflow-hidden py-14 sm:py-20 lg:py-[150px]"
    >
      <Image
        src={HOME2_COUNTERS_BG}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        quality={IMAGE_QUALITY}
      />
      <div className="absolute inset-0 bg-deep-sea/80" aria-hidden />

      <div className="container-luxury relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-0">
        <motion.div
          className="home2-counters-contact__about pe-0 text-start text-white lg:pe-[10%]"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p
            className={cn(
              bodyFontClass(locale),
              "mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/75"
            )}
          >
            {t("countersEyebrow")}
          </p>
          <SplitHeading
            wordGroups={countersTitleGroups}
            active={active}
            loop
            className={cn(
              displayFontClass(locale),
              "home2-counters-contact__title mb-6 text-3xl font-normal text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]",
              isRtl ? "normal-case" : "uppercase tracking-[0.04em]"
            )}
          />
          <p
            className={cn(
              bodyFontClass(locale),
              "home2-counters-contact__desc mb-10 max-w-xl text-sm leading-[1.85] sm:text-[15px]"
            )}
          >
            {t("countersDesc")}
          </p>

          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {HOME2_COUNTERS.map((counter) => (
              <CounterItem
                key={counter.labelKey}
                value={counter.value}
                suffix={counter.suffix}
                label={t(counter.labelKey)}
                active={active}
                locale={locale}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="home2-counters-contact__form bg-white px-6 py-10 sm:px-10 sm:py-12 lg:px-[60px] lg:py-[60px]"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <p
            className={cn(
              bodyFontClass(locale),
              "mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#1a1a1a]/65"
            )}
          >
            {t("contactEyebrow")}
          </p>
          <SplitHeading
            wordGroups={contactTitleGroups}
            active={active}
            loop
            className={cn(
              displayFontClass(locale),
              "home2-counters-contact__form-title mb-8 text-2xl font-normal text-[#1a1a1a] sm:text-3xl lg:mb-[30px]",
              isRtl ? "normal-case" : "uppercase tracking-[0.04em]"
            )}
          />

          <form className="home2-inquiry-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder={t("contactName")}
              className="home2-input home2-inquiry-form__name"
              required
            />
            <select
              name="interest"
              className="home2-input home2-inquiry-form__interest"
              defaultValue=""
              required
            >
              <option value="" disabled>
                {t("contactInterest")}
              </option>
              <option value="sail">{t("interestSail")}</option>
              <option value="jet">{t("interestJet")}</option>
              <option value="motor">{t("interestMotor")}</option>
              <option value="deck">{t("interestDeck")}</option>
            </select>
            <input
              type="email"
              name="email"
              placeholder={t("contactEmail")}
              className="home2-input home2-inquiry-form__email"
              required
            />
            <textarea
              name="message"
              placeholder={t("contactMessage")}
              className="home2-input home2-inquiry-form__message resize-none"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder={t("contactMobile")}
              className="home2-input home2-inquiry-form__mobile"
              required
            />
            <select
              name="budget"
              className="home2-input home2-inquiry-form__budget"
              defaultValue=""
              required
            >
              <option value="" disabled>
                {t("contactBudget")}
              </option>
              <option value="b1">{t("budget1")}</option>
              <option value="b2">{t("budget2")}</option>
              <option value="b3">{t("budget3")}</option>
              <option value="b4">{t("budget4")}</option>
            </select>
            <button
              type="submit"
              disabled={status === "loading"}
              className="home2-inquiry-form__submit neera-btn-know-more justify-center disabled:opacity-70"
            >
              {status === "loading" ? "..." : t("contactSubmit")}
            </button>
          </form>

          {status === "success" ? (
            <p className={cn(bodyFontClass(locale), "mt-4 text-sm text-green-700")}>
              {tContact("success")}
            </p>
          ) : null}
          {status === "error" ? (
            <p className={cn(bodyFontClass(locale), "mt-4 text-sm text-red-600")}>
              {tContact("error")}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

function CounterItem({
  value,
  suffix,
  label,
  active,
  locale,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  locale: string;
}) {
  const count = useCountUp(value, active);

  return (
    <div className="text-start">
      <p className={cn(displayFontClass(locale), "text-3xl text-neera-gold sm:text-4xl lg:text-[2.75rem]")}>
        {count.toLocaleString(locale === "ar" ? "ar-SA" : "en-US")}
        {suffix}
      </p>
      <p
        className={cn(
          bodyFontClass(locale),
          "mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/72"
        )}
      >
        {label}
      </p>
    </div>
  );
}
