import { Link } from "@/lib/i18n/navigation";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

const BREADCRUMB_BG =
  "https://neera.wpenginepowered.com/wp-content/uploads/2024/01/Neera-breadrcrumb-img-2.jpg";

interface PageBreadcrumbProps {
  title: string;
  homeLabel: string;
  locale: string;
}

export function PageBreadcrumb({ title, homeLabel, locale }: PageBreadcrumbProps) {
  return (
    <section className="neera-page-breadcrumb aligncenter overlay-wrapper dark-bg-breadcrumb">
      <div className="neera-page-breadcrumb__container">
        <div className="container-luxury">
          <div className="neera-page-breadcrumb__title">
            <h1 className={displayFontClass(locale)}>{title}</h1>
          </div>
          <nav className={cn("neera-page-breadcrumb__trail", bodyFontClass(locale))} aria-label="Breadcrumb">
            <Link href="/">{homeLabel}</Link>
            <span className="neera-page-breadcrumb__delimiter" aria-hidden />
            <span className="current">{title}</span>
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
