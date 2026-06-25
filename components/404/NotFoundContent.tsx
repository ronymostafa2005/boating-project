import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { PAGE_404_BG } from "@/data/page404";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { bodyFontClass, cn, displayFontClass } from "@/lib/utils";

export type NotFoundContentProps = {
  locale: string;
  code: string;
  heading: string;
  description: string;
  backToHome: string;
  fullScreen?: boolean;
};

export function NotFoundContent({
  locale,
  code,
  heading,
  description,
  backToHome,
  fullScreen = true,
}: NotFoundContentProps) {
  return (
    <section
      className={cn("page-404", fullScreen && "page-404--fullscreen")}
      aria-labelledby="page-404-heading"
    >
      <div className="page-404__bg" aria-hidden>
        <Image
          src={PAGE_404_BG}
          alt=""
          fill
          priority
          quality={IMAGE_QUALITY}
          sizes="100vw"
          className="page-404__bg-image"
        />
        <div className="page-404__overlay" />
      </div>

      <div className="page-404__inner">
        <p className={cn("page-404__code", bodyFontClass(locale))} aria-hidden>
          {code}
        </p>

        <h1
          id="page-404-heading"
          className={cn("page-404__heading", displayFontClass(locale))}
        >
          {heading}
        </h1>

        <p className={cn("page-404__description", bodyFontClass(locale))}>
          {description}
        </p>

        <Link href="/" className={cn("page-404__cta", bodyFontClass(locale))}>
          {backToHome}
        </Link>
      </div>
    </section>
  );
}
