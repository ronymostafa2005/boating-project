import Image from "next/image";
import type { ReactNode } from "react";
import { AUTH_PAGE_BG } from "@/data/page404";
import { IMAGE_QUALITY } from "@/lib/imageDefaults";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  labelledBy: string;
  className?: string;
};

export function AuthPageShell({ children, labelledBy, className }: Props) {
  return (
    <section
      className={cn("auth-page auth-page--fullscreen", className)}
      aria-labelledby={labelledBy}
    >
      <div className="auth-page__bg" aria-hidden>
        <Image
          src={AUTH_PAGE_BG}
          alt=""
          fill
          priority
          quality={IMAGE_QUALITY}
          sizes="100vw"
          className="auth-page__bg-image"
        />
        <div className="auth-page__overlay" />
      </div>

      <div className="auth-page__card">{children}</div>
    </section>
  );
}
