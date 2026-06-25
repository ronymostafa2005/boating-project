import { YachtLogo } from "@/components/ui/YachtLogo";
import { cn, displayFontClass } from "@/lib/utils";

interface NavbarLogoProps {
  locale: string;
  className?: string;
  showText?: boolean;
  textClassName?: string;
  imageClassName?: string;
  fontClassName?: string;
}

export function NavbarLogo({
  locale,
  className,
  showText = true,
  textClassName,
  imageClassName,
  fontClassName,
}: NavbarLogoProps) {
  return (
    <div dir="ltr" className={cn("flex items-center gap-2.5", className)}>
      <YachtLogo
        className={cn("h-9 sm:h-10 text-neera-gold", imageClassName)}
      />
      {showText ? (
        <span
          className={cn(
            fontClassName ?? displayFontClass(locale),
            "navbar-logo-text whitespace-nowrap text-lg font-medium tracking-tight sm:text-xl",
            textClassName
          )}
        >
          Boating<span className="text-neera-gold">.sa</span>
        </span>
      ) : null}
    </div>
  );
}
