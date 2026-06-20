import type { Variants } from "framer-motion";

export const MOTION_EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function slideInFromEnd(isRtl: boolean, distance = 48, delay = 0.3): Variants {
  const x = isRtl ? -distance : distance;
  return {
    hidden: { opacity: 0, x },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.85, ease: MOTION_EASE, delay },
    },
  };
}

export function slideInFromEndCustom(isRtl: boolean, distance = 48): Variants {
  const x = isRtl ? -distance : distance;
  return {
    hidden: { opacity: 0, x },
    visible: (delay: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.85, ease: MOTION_EASE, delay },
    }),
  };
}

export function slideFromSide(
  isRtl: boolean,
  side: "left" | "right",
  distance = 48
): Variants {
  const fromLeft = isRtl ? distance : -distance;
  const fromRight = isRtl ? -distance : distance;
  const x = side === "left" ? fromLeft : fromRight;

  return {
    hidden: { opacity: 0, x },
    visible: (delay: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.75, ease: MOTION_EASE, delay },
    }),
  };
}
