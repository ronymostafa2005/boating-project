import Image from "next/image";
import { cn } from "@/lib/utils";

interface BackToTopAnchorIconProps {
  className?: string;
}

export function BackToTopAnchorIcon({ className }: BackToTopAnchorIconProps) {
  return (
    <Image
      src="/images/Neera-Back-to-top-anchor.png"
      alt=""
      width={56}
      height={56}
      className={cn("h-14 w-14 object-contain", className)}
      aria-hidden
    />
  );
}
