"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { HOME2_TEAM, HOME2_TEAM_BG } from "@/data/home2";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { MOTION_EASE, slideInFromEnd } from "@/lib/motionVariants";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com", icon: "facebook" },
  { label: "X", href: "https://www.twitter.com", icon: "x" },
  { label: "YouTube", href: "https://www.youtube.com", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
] as const;

function SocialIcon({ icon }: { icon: (typeof SOCIAL_LINKS)[number]["icon"] }) {
  if (icon === "facebook") {
    return (
      <svg className="h-3.5 w-3.5" viewBox="0 0 320 512" fill="currentColor" aria-hidden>
        <path d="M80 299.3V512H196V299.3h86.6l18.7-109.5H196V134.7c0-29.9 8.3-50.3 51.1-50.3H303V6.3C293.7 5.1 261.7 0 225.1 0 148.6 0 80 48.5 80 136.3v53.8H0v109.5h80z" />
      </svg>
    );
  }
  if (icon === "x") {
    return (
      <svg className="h-3.5 w-3.5" viewBox="0 0 512 512" fill="currentColor" aria-hidden>
        <path d="M389.2 48H120.8L48 120.8v270.4L120.8 464h270.4L464 390.4V120.8L389.2 48zm-52.4 300.8-81.2-108.4-99.6 108.4h-24.8l116-125.6-104.4-139.2h84.8l74.8 99.6 91.6-99.6h24.8l-108.8 117.6 112.4 147.2h-84.8z" />
      </svg>
    );
  }
  if (icon === "youtube") {
    return (
      <svg className="h-3.5 w-3.5" viewBox="0 0 576 512" fill="currentColor" aria-hidden>
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zM232 338.714V177.286L375.714 258 232 338.714z" />
      </svg>
    );
  }
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 448 512" fill="currentColor" aria-hidden>
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.8V416z" />
    </svg>
  );
}

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: MOTION_EASE },
  },
};

export function TeamSection() {
  const t = useTranslations("home2");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const teamTitleGroups = [t("teamTitle").split(" ")];

  return (
    <section className="home2-team-section relative overflow-hidden py-16 lg:py-24 xl:py-28">
      <Image
        src={HOME2_TEAM_BG}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        quality={IMAGE_QUALITY}
        priority={false}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#021526]/72" aria-hidden />

      <div className="container-luxury relative z-10">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-14"
          variants={zoomIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <p
            className={cn(
              bodyFontClass(locale),
              "mb-3 text-[11px] font-medium uppercase tracking-[0.24em] text-white/70"
            )}
          >
            {t("teamEyebrow")}
          </p>
          <SplitHeading
            wordGroups={teamTitleGroups}
            active
            loop
            className={cn(
              displayFontClass(locale),
              "home2-team-title text-3xl font-normal text-white sm:text-4xl lg:text-[2.75rem]",
              isRtl ? "normal-case tracking-normal" : "uppercase tracking-[0.04em]"
            )}
          />
        </motion.div>

        <motion.div
          className="home2-team-track"
          variants={slideInFromEnd(isRtl, 40, 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {HOME2_TEAM.map((member) => (
            <article key={member.nameKey} className="home2-team-card group">
              <div className="home2-team-card__media">
                <Image
                  src={member.image}
                  alt={t(member.nameKey)}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width:640px) 85vw, (max-width:1024px) 45vw, 25vw"
                  quality={IMAGE_QUALITY}
                  loading="lazy"
                />
                <div className="home2-team-card__social" aria-label="Social links">
                  <ul className="home2-team-card__social-list">
                    {SOCIAL_LINKS.map((link) => (
                      <li key={link.icon}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          className="home2-team-card__social-link"
                        >
                          <SocialIcon icon={link.icon} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <h3 className={cn(displayFontClass(locale), "home2-team-card__name")}>
                {t(member.nameKey)}
              </h3>
              <p className={cn(bodyFontClass(locale), "home2-team-card__role")}>
                {t(member.roleKey)}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
