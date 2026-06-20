import { cn } from "@/lib/utils";

interface YachtLogoProps {
  className?: string;
}

export function YachtLogo({ className }: YachtLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 48"
      fill="none"
      aria-hidden
      className={cn("h-9 w-[4.5rem] shrink-0 sm:w-[5.25rem]", className)}
    >
      <path
        fill="currentColor"
        d="M4 38 C 18 38, 28 34, 42 26 C 58 17, 72 12, 96 10 L 108 10 L 108 22 C 88 24, 68 30, 52 36 C 36 42, 22 44, 4 38 Z"
      />
      <path
        fill="currentColor"
        d="M72 8 L 108 8 L 108 18 L 78 18 L 72 12 Z"
      />
    </svg>
  );
}
