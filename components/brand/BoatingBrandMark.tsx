import { YachtLogo } from "@/components/ui/YachtLogo";
import { cn } from "@/lib/utils";

export type BrandMarkVariant = "gold" | "white" | "dark";

interface BoatingBrandMarkProps {
  variant?: BrandMarkVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-16 sm:h-9 sm:w-[4.5rem]",
  md: "h-9 w-[4.5rem] sm:h-10 sm:w-[5.25rem]",
  lg: "h-10 w-[5.25rem] sm:h-11 sm:w-24",
} as const;

const variantClasses: Record<BrandMarkVariant, string> = {
  gold: "text-neera-gold",
  white: "text-white",
  dark: "text-deep-sea",
};

export function BoatingBrandMark({
  variant = "gold",
  size = "md",
  className,
}: BoatingBrandMarkProps) {
  return (
    <YachtLogo
      className={cn(sizeClasses[size], variantClasses[variant], className)}
    />
  );
}
