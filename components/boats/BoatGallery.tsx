"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FALLBACK_BOAT_IMAGE } from "@/lib/imageDefaults";

interface BoatGalleryProps {
  images: string[];
  alt: string;
}

export function BoatGallery({ images, alt }: BoatGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayImages = images.length > 0 ? images : [FALLBACK_BOAT_IMAGE];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <Image
          src={displayImages[activeIndex]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />
      </div>
      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                activeIndex === i ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image src={img} alt={`${alt} ${i + 1}`} fill className="object-cover" sizes="112px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
