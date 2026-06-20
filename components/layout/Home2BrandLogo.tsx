import { YachtLogo } from "@/components/ui/YachtLogo";
import { cn, displayFontClass } from "@/lib/utils";

interface Home2BrandLogoProps {
  locale: string;
  light?: boolean;
  className?: string;
}

export function Home2BrandLogo({ locale, light = true, className }: Home2BrandLogoProps) {
  const textColor = light ? "text-white" : "text-[#1a1a1a]";

  return (
    <div dir="ltr" className={cn("flex items-center gap-3", className)}>
      <YachtLogo className={cn("h-10 sm:h-11", textColor)} />
      <span
        className={cn(
          displayFontClass(locale),
          "whitespace-nowrap text-lg font-medium tracking-tight sm:text-xl",
          textColor
        )}
      >
        Boating.sa
      </span>
    </div>
  );
}
