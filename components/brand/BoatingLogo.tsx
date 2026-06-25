import { BoatingBrandMark, type BrandMarkVariant } from "@/components/brand/BoatingBrandMark";
import { cn, bodyFontClass, scriptFontClass } from "@/lib/utils";

export type BoatingLogoVariant = "light" | "dark" | "gold";

interface BoatingLogoProps {
  locale: string;
  variant?: BoatingLogoVariant;
  className?: string;
  showMark?: boolean;
  size?: "sm" | "md" | "lg";
}

const scriptSizes = {
  sm: "text-[1.45rem] sm:text-[1.55rem]",
  md: "text-[1.65rem] sm:text-[1.85rem]",
  lg: "text-[2rem] sm:text-[2.35rem]",
} as const;

const descriptorSizes = {
  sm: "text-[7px] tracking-[0.28em]",
  md: "text-[8px] tracking-[0.32em]",
  lg: "text-[9px] tracking-[0.34em]",
} as const;

const markSizes = {
  sm: "sm" as const,
  md: "md" as const,
  lg: "lg" as const,
};

const variantStyles: Record<
  BoatingLogoVariant,
  { script: string; descriptor: string; mark: BrandMarkVariant }
> = {
  light: {
    script: "text-white",
    descriptor: "text-champagne",
    mark: "gold",
  },
  dark: {
    script: "text-deep-sea",
    descriptor: "text-deep-sea/65",
    mark: "gold",
  },
  gold: {
    script: "text-neera-gold",
    descriptor: "text-champagne",
    mark: "gold",
  },
};

/** Horizontal lockup — Great Vibes "Boating" + Jost "Elite Boat Rentals" */
export function BoatingLogo({
  locale,
  variant = "dark",
  className,
  showMark = true,
  size = "md",
}: BoatingLogoProps) {
  const styles = variantStyles[variant];

  return (
    <div dir="ltr" className={cn("flex items-center gap-2.5", className)}>
      {showMark ? (
        <BoatingBrandMark variant={styles.mark} size={markSizes[size]} />
      ) : null}
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            scriptFontClass(locale),
            "font-normal",
            scriptSizes[size],
            styles.script
          )}
        >
          Boating
        </span>
        <span
          className={cn(
            bodyFontClass(locale),
            "mt-1 font-medium uppercase",
            descriptorSizes[size],
            styles.descriptor
          )}
        >
          Elite Boat Rentals
        </span>
      </div>
    </div>
  );
}
