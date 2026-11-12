import { Link } from "@/lib/i18n/navigation";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

const BREADCRUMB_BG = "/images/neera/2023/12/Neera-Services-section-bg-01.jpg";

export type BreadcrumbSegment = {
  label: string;
  href?: string;
};

interface PageBreadcrumbProps {
  title: string;
  homeLabel: string;
  locale: string;
  segments?: BreadcrumbSegment[];
}

export function PageBreadcrumb({ title, homeLabel, locale, segments }: PageBreadcrumbProps) {
  const trail = segments?.length
    ? segments
    : [{ label: title }];

  return (
    <section className="neera-page-breadcrumb aligncenter overlay-wrapper dark-bg-breadcrumb">
      <div className="neera-page-breadcrumb__container">
        <div className="container-luxury">
          <div className="neera-page-breadcrumb__title">
            <h1 className={displayFontClass(locale)}>{title}</h1>
          </div>
          <nav className={cn("neera-page-breadcrumb__trail", bodyFontClass(locale))} aria-label="Breadcrumb">
            <Link href="/">{homeLabel}</Link>
            {trail.map((segment, index) => (
              <span key={`${segment.label}-${index}`} className="contents">
                <span className="neera-page-breadcrumb__delimiter" aria-hidden />
                {segment.href ? (
                  <Link href={segment.href}>{segment.label}</Link>
                ) : (
                  <span className="current">{segment.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
      <div
        className="neera-page-breadcrumb__bg"
        style={{ backgroundImage: `url("${BREADCRUMB_BG}")` }}
        aria-hidden
      />
    </section>
  );
}
