import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { ComingSoonCountdown } from "@/components/coming-soon/ComingSoonCountdown";
import { PAGE_404_BG } from "@/data/page404";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { bodyFontClass, cn, displayFontClass } from "@/lib/utils";

export type ComingSoonContentProps = {
  locale: string;
  title: string;
  description: string;
  backToHome: string;
  daysLabel: string;
  hoursLabel: string;
  minutesLabel: string;
  secondsLabel: string;
  fullScreen?: boolean;
};

export function ComingSoonContent({
  locale,
  title,
  description,
  backToHome,
  daysLabel,
  hoursLabel,
  minutesLabel,
  secondsLabel,
  fullScreen = true,
}: ComingSoonContentProps) {
  return (
    <section
      className={cn("coming-soon", fullScreen && "coming-soon--fullscreen")}
      aria-labelledby="coming-soon-title"
    >
      <div className="coming-soon__bg" aria-hidden>
        <Image
          src={PAGE_404_BG}
          alt=""
          fill
          priority
          quality={IMAGE_QUALITY}
          sizes="100vw"
          className="coming-soon__bg-image"
        />
        <div className="coming-soon__overlay" />
      </div>

      <div className="coming-soon__inner">
        <h1
          id="coming-soon-title"
          className={cn("coming-soon__title", displayFontClass(locale))}
        >
          {title}
        </h1>

        <p className={cn("coming-soon__description", bodyFontClass(locale))}>
          {description}
        </p>

        <ComingSoonCountdown
          locale={locale}
          labels={{
            days: daysLabel,
            hours: hoursLabel,
            minutes: minutesLabel,
            seconds: secondsLabel,
          }}
        />

        <Link
          href="/"
          className={cn("coming-soon__cta page-404__cta", bodyFontClass(locale))}
        >
          {backToHome}
        </Link>
      </div>
    </section>
  );
}
