import { YachtLogo } from "@/components/ui/YachtLogo";
import { cn, bodyFontClass, scriptFontClass } from "@/lib/utils";

interface Home2BrandLogoProps {
  locale: string;
  light?: boolean;
  className?: string;
}

export function Home2BrandLogo({ locale, light = true, className }: Home2BrandLogoProps) {
  const scriptColor = light ? "text-white" : "text-deep-sea";
  const descriptorColor = light ? "text-champagne" : "text-deep-sea/70";
  const iconColor = light ? "text-neera-gold" : "text-neera-gold";

  return (
    <div dir="ltr" className={cn("flex items-center gap-3", className)}>
      <YachtLogo className={cn("h-10 shrink-0 sm:h-11", iconColor)} />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            scriptFontClass(locale),
            "text-[1.65rem] font-normal sm:text-[1.85rem]",
            scriptColor
          )}
        >
          Boating
        </span>
        <span
          className={cn(
            bodyFontClass(locale),
            "mt-1 text-[8px] font-medium uppercase tracking-[0.32em]",
            descriptorColor
          )}
        >
          Elite Boat Rentals
        </span>
      </div>
    </div>
  );
}
