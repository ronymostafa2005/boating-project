"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { FALLBACK_BOAT_IMAGE, IMAGE_QUALITY } from "@/lib/imageDefaults";

type SafeImageProps = Omit<ImageProps, "onError" | "quality"> & {
  fallbackSrc?: string;
  quality?: number;
};

export function SafeImage({
  src,
  fallbackSrc = FALLBACK_BOAT_IMAGE,
  quality = IMAGE_QUALITY,
  alt,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      quality={quality}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}
