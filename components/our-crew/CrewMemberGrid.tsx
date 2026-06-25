"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import type { CrewMember } from "@/data/ourCrew";
import { CREW_SOCIAL_LINKS, CrewSocialIcon } from "@/components/our-crew/crewSocial";
import type { Locale } from "@/types/locale";

interface CrewMemberGridProps {
  members: CrewMember[];
}

export function CrewMemberGrid({ members }: CrewMemberGridProps) {
  const t = useTranslations("ourCrew");
  const locale = useLocale() as Locale;
  const isRtl = locale === "ar";

  return (
    <section className="our-crew-grid-section bg-white py-12 sm:py-14 lg:py-16">
      <div className="container-luxury">
        <div className="our-crew-grid">
          {members.map((member) => (
            <article key={member.id} className="our-crew-card group">
              <div className="our-crew-card__media">
                <Image
                  src={member.image}
                  alt={t(member.nameKey)}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width:640px) 85vw, (max-width:1024px) 45vw, 25vw"
                  quality={IMAGE_QUALITY}
                  loading="lazy"
                />
                <div className="our-crew-card__social" aria-label="Social links">
                  <ul className="our-crew-card__social-list">
                    {CREW_SOCIAL_LINKS.map((link) => (
                      <li key={link.icon}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          className="our-crew-card__social-link"
                        >
                          <CrewSocialIcon icon={link.icon} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <h3
                className={cn(
                  displayFontClass(locale),
                  "our-crew-card__name",
                  !isRtl && "uppercase tracking-[0.04em]"
                )}
              >
                {t(member.nameKey)}
              </h3>
              <p
                className={cn(
                  bodyFontClass(locale),
                  "our-crew-card__role",
                  !isRtl && "uppercase tracking-[0.14em]"
                )}
              >
                {t(member.roleKey)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
