import { YachtLogo } from "@/components/ui/YachtLogo";
import { cn, bodyFontClass, scriptFontClass } from "@/lib/utils";

interface NavbarLogoProps {
  locale: string;
  className?: string;
  showText?: boolean;
  textClassName?: string;
  imageClassName?: string;
  descriptorClassName?: string;
}

export function NavbarLogo({
  locale,
  className,
  showText = true,
  textClassName,
  imageClassName,
  descriptorClassName,
}: NavbarLogoProps) {
  return (
    <div dir="ltr" className={cn("flex items-center gap-2.5", className)}>
      <YachtLogo className={cn("h-9 shrink-0 sm:h-10 text-neera-gold", imageClassName)} />
      {showText ? (
        <div className="flex flex-col leading-none">
          <span
            className={cn(
              scriptFontClass(locale),
              "text-[1.65rem] font-normal sm:text-[1.85rem]",
              textClassName
            )}
          >
            Boating
          </span>
          <span
            className={cn(
              bodyFontClass(locale),
              "mt-1 text-[8px] font-medium uppercase tracking-[0.32em] text-champagne",
              descriptorClassName
            )}
          >
            Elite Boat Rentals
          </span>
        </div>
      ) : null}
    </div>
  );
}
