"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { cn, bodyFontClass } from "@/lib/utils";

const VIDEO_BANNER = "/images/video-banner-bg.png";
const HOTSPOT_MAP = "/images/hotspot-map-bg.png";
const VIMEO_EMBED = "https://player.vimeo.com/video/472248605?autoplay=1&title=0&byline=0&portrait=0";

const HOTSPOTS = [
  {
    nameKey: "hotspotBinz",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/Neera-Hotspot-img-02.jpg",
    top: "13%",
    left: "19%",
    floatDelay: 0,
  },
  {
    nameKey: "hotspotUsedom",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/Neera-Hotspot-img-01.jpg",
    top: "8%",
    left: "51%",
    floatDelay: 0.35,
  },
  {
    nameKey: "hotspotLangeoog",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/Neera-Hotspot-img-03.jpg",
    top: "41%",
    left: "26%",
    floatDelay: 0.7,
  },
  {
    nameKey: "hotspotSylt",
    image:
      "https://neera.wpenginepowered.com/wp-content/uploads/2023/12/Neera-Hotspot-img-04.jpg",
    top: "57%",
    left: "54%",
    floatDelay: 1.05,
  },
] as const;

const columnEase = [0.25, 0.46, 0.45, 0.94] as const;

const leftColumnVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: columnEase, delay: 0.3 },
  },
};

const rightColumnVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: columnEase, delay: 0.3 },
  },
};

const zoomInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: columnEase, delay: 0.35 },
  },
};

const hotspotContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.65 },
  },
};

const hotspotItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

function PlayIcon() {
  return (
    <svg className="h-7 w-6 text-white" viewBox="0 0 84.9 98" fill="currentColor" aria-hidden>
      <path d="M84.9 49 0 98V0l84.9 49z" />
    </svg>
  );
}

function VideoPlayButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 100, damping: 16, mass: 0.55 });
  const y = useSpring(rawY, { stiffness: 100, damping: 16, mass: 0.55 });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const area = areaRef.current;
      if (!area) return;

      const rect = area.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);

      rawX.set(offsetX * -0.04);
      rawY.set(offsetY * -0.04);
    },
    [rawX, rawY]
  );

  const resetPosition = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div
      ref={areaRef}
      className="absolute inset-0 flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
    >
      <motion.button
        type="button"
        aria-label={label}
        onClick={onClick}
        style={{ x, y }}
        className="gorgeous-vistas-play-btn relative flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-[2px] transition-colors hover:bg-white/18 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full border border-white/35"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
        <PlayIcon />
      </motion.button>
    </div>
  );
}

function VideoModal({
  open,
  onClose,
  closeLabel,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  locale: string;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="relative w-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.45, ease: columnEase }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className={cn(
                bodyFontClass(locale),
                "absolute -top-12 end-0 text-sm uppercase tracking-[0.14em] text-white/90 transition-colors hover:text-white"
              )}
            >
              {closeLabel}
            </button>
            <div className="relative aspect-video w-full overflow-hidden bg-black shadow-2xl">
              <iframe
                src={VIMEO_EMBED}
                title="Neera promotional video"
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function HotspotMarker({
  name,
  image,
  top,
  left,
  floatDelay,
  index,
  locale,
}: {
  name: string;
  image: string;
  top: string;
  left: string;
  floatDelay: number;
  index: number;
  locale: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="gorgeous-vistas-hotspot absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top, left }}
      variants={hotspotItemVariants}
      animate={{ y: hovered ? 0 : [0, -6, 0] }}
      transition={{
        y: {
          duration: 3.4,
          repeat: hovered ? 0 : Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        className="gorgeous-vistas-hotspot-trigger group relative flex flex-col items-center"
        aria-label={name}
      >
        <AnimatePresence>
          {hovered ? (
            <motion.span
              key="label"
              className={cn(
                bodyFontClass(locale),
                "gorgeous-vistas-hotspot-label mb-2.5 whitespace-nowrap px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {name}
            </motion.span>
          ) : null}
        </AnimatePresence>

        <span className="relative block">
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full bg-white/20"
            animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeOut",
              delay: index * 0.2,
            }}
          />
          <span
            className={cn(
              "relative block overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_4px_18px_rgba(15,30,45,0.18)] transition-transform duration-300",
              "h-14 w-14 sm:h-[4.75rem] sm:w-[4.75rem]",
              hovered && "scale-110"
            )}
          >
            <Image src={image} alt={name} fill className="object-cover" sizes="76px" />
          </span>
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm" />
        </span>
      </button>
    </motion.div>
  );
}

export function GorgeousVistasSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const titleWords = [
    t("gorgeousVistasTitle1"),
    t("gorgeousVistasTitle2"),
    t("gorgeousVistasTitle3"),
    t("gorgeousVistasTitle4"),
  ].filter(Boolean);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="gorgeous-vistas-section w-full overflow-hidden">
      <div className="grid min-h-[480px] lg:min-h-[780px] lg:grid-cols-2">
        <motion.div
          className="relative min-h-[360px] lg:min-h-full"
          variants={isRtl ? rightColumnVariants : leftColumnVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={inView ? { scale: 1 } : { scale: 1.05 }}
            transition={{ duration: 1.2, ease: columnEase }}
            aria-hidden
            dir="ltr"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${VIDEO_BANNER})` }}
            />
          </motion.div>
          <VideoPlayButton
            onClick={() => setVideoOpen(true)}
            label={t("gorgeousVistasPlayLabel")}
          />
        </motion.div>

        <motion.div
          className="gorgeous-vistas-panel relative flex flex-col items-center justify-center overflow-hidden px-6 py-12 sm:px-10 lg:px-14 lg:py-16"
          variants={isRtl ? leftColumnVariants : rightColumnVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="gorgeous-vistas-panel-grid absolute inset-0" aria-hidden />
          <motion.div
            className="gorgeous-vistas-heading relative z-[1] mb-8 w-full text-center lg:mb-10"
            variants={zoomInVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <p
              className={cn(
                "mb-4 font-medium uppercase tracking-[0.22em] text-[#1a2f3d]/70",
                locale === "ar" ? "font-bodyAr text-[11px]" : "font-bodyEn text-[11px]"
              )}
            >
              {t("gorgeousVistasEyebrow")}
            </p>
            <SplitHeading
              wordGroups={[titleWords]}
              loop
              active={inView}
              className={cn(
                "gorgeous-vistas-title w-full font-normal uppercase leading-[1.15] tracking-[0.05em] text-[#1a2f3d]",
                locale === "ar" ? "font-displayAr text-3xl sm:text-4xl" : "font-displayEn text-3xl sm:text-[2.65rem]"
              )}
            />
          </motion.div>

          <motion.div
            className="gorgeous-vistas-hotspot-holder relative z-[1] w-full"
            variants={zoomInVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <div className="gorgeous-vistas-map relative mx-auto w-full max-w-[540px]">
              <div className="relative aspect-[1500/1740] w-full">
                <div
                  className="gorgeous-vistas-map-lines absolute inset-0"
                  style={{ backgroundImage: `url(${HOTSPOT_MAP})` }}
                  aria-hidden
                />

                <motion.div
                  className="absolute inset-0 z-[1]"
                  variants={hotspotContainerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  {HOTSPOTS.map((spot, index) => (
                    <HotspotMarker
                      key={spot.nameKey}
                      name={t(spot.nameKey)}
                      image={spot.image}
                      top={spot.top}
                      left={spot.left}
                      floatDelay={spot.floatDelay}
                      index={index}
                      locale={locale}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        closeLabel={t("gorgeousVistasCloseVideo")}
        locale={locale}
      />
    </section>
  );
}
