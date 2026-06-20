"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { cn, bodyFontClass, displayFontClass } from "@/lib/utils";

const STATS = [
  { key: "statsHappyClients", value: 1025, Icon: HappyClientsIcon },
  { key: "statsBoatsWeOwn", value: 250, Icon: BoatsWeOwnIcon },
  { key: "statsVariousLocations", value: 100, Icon: LocationsIcon },
  { key: "statsIslandJourneys", value: 500, Icon: IslandJourneysIcon },
  { key: "statsYearsInField", value: 20, Icon: YearsInFieldIcon },
] as const;

function HappyClientsIcon() {
  return (
    <svg className="stats-counter-icon h-12 w-12" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M16.2 94.1c-5.3 0-9.9-1.6-13-4.7-2.2-2.2-3-3.5-1.1-6.6l.2-.3 15.7-26.1L9.8 42.8c-4.6-7.8-2.7-17.4 4.5-22.4L30.9 8.8c7.2-5 16.9-3.5 22.6 3.5l9.9 12.4 20-5.9c.7-.3 1.4-.5 2-.6h.6c1.8-.3 3.2-.2 4.2 0 4.4.8 7.5 4.3 8.4 9.2 1.3 7.3-2.4 19-17.2 28-6.1 3.7-12.9 6.3-18.3 8.4-3.7 1.4-7.2 2.8-8.8 3.9-.2.3-.3.5-.5.8-6.2 10.2-15.9 19-25.3 23-4.2 1.9-8.5 2.8-12.4 2.8zM6.6 85.4l15.7-26.1L9.8 42.8C5.2 35 7.1 25.4 14.3 20.4L30.9 8.8c4.9-3.4 11.7-2.3 15.6 2.5l9.9 12.4 20-5.9c4.4-.8 7.5 4.3 8.4 9.2 1.3 7.3-2.4 19-17.2 28-6.1 3.7-12.9 6.3-18.3 8.4-3.7 1.4-7.2 2.8-8.8 3.9-6.2 10.2-15.9 19-25.3 23z" />
    </svg>
  );
}

function BoatsWeOwnIcon() {
  return (
    <svg className="stats-counter-icon h-12 w-12" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M84 99c-4.3 0-8.3-1.8-11.1-4.8-2.8 3-6.8 4.8-11.1 4.8s-8.3-1.8-11.1-4.8c-2.8 3-6.8 4.8-11.1 4.8s-8.3-1.8-11.1-4.8c-2.8 3-6.8 4.8-11.1 4.8-6.2 0-11.7-3.7-14.1-9.4-.6-1.5.1-3.2 1.6-3.8 1.5-.6 3.2.1 3.8 1.6 1.5 3.6 4.9 5.9 8.8 5.9 3.6 0 6.9-2 8.5-5.3.5-1 1.5-1.6 2.6-1.6s2.1.6 2.6 1.6c1.6 3.3 4.9 5.3 8.5 5.3s6.9-2 8.5-5.3c.5-1 1.5-1.6 2.6-1.6s2.1.6 2.6 1.6c1.6 3.3 4.9 5.3 8.5 5.3s6.9-2 8.5-5.3c.5-1 1.5-1.6 2.6-1.6s2.1.6 2.6 1.6c1.6 3.3 4.9 5.3 8.5 5.3c3.9 0 7.3-2.3 8.8-5.9.6-1.5 2.3-2.2 3.8-1.6 1.5.6 2.2 2.3 1.6 3.8-2.4 5.7-7.9 9.4-14.1 9.4zM15.4 87.7c-1.5 0-2.7-1.1-2.9-2.6l-1.1-10.9c-.1-.8.2-1.6.7-2.2.5-.6 1.3-1 2-1l26.1-1.3v-2.3H4.6c-1.3 0-2.4-.9-2.8-2.1-.4-1.2.1-2.5 1.2-3.1C25.1 49.6 32.9 34 40.3 7.7V3.9c0-1.6 1.3-2.9 2.9-2.9s2.9 1.3 2.9 2.9v14.7c7.4 26.3 15.2 41.9 37.1 54.4 1.2.6 1.7 1.9 1.3 3.1-.4 1.2-1.5 2.1-2.8 2.1H46v2l4.9-.2 40.6-2.9c1.1-.1 2.2.5 2.7 1.5.5 1 .4 2.2-.3 3.1l-7.8 10.2c-1 1.3-2.8 1.5-4 .5-1.3-1-1.5-2.8-.5-4l7.8-10.2L51.3 75l-33.8 1.7.8 7.9c.2 1.6-1 3-2.6 3.2z" />
    </svg>
  );
}

function LocationsIcon() {
  return (
    <svg className="stats-counter-icon h-12 w-12" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M7.8 90.2c-.5 0-.9-.1-1.3-.3-1.5-.8-2-2.5-1.2-3.9L39.7 21.9c.5-.9 1.5-1.5 2.5-1.5s2 .6 2.5 1.6l25.5 50.2c.7 1.4.2 3.1-1.2 3.8-1.4.7-3.1.2-3.8-1.2L42.1 29.4 10.3 88.7c-.5.9-1.5 1.5-2.5 1.5zM96 84c-1 0-1.9-.5-2.5-1.4l-9.7-16.8-2.4 2.5c-.6.6-1.4.9-2.3.9-.9-.1-1.6-.5-2.1-1.2l-9.9-14.8-5.7 6.8c-1 1.2-2.8 1.4-4 .4-1.2-1-1.4-2.8-.4-4l7.3-8.8c.6-.7 1.4-1.1 2.3-1 .9 0 1.7.5 2.2 1.3l10 15 2.6-2.7c.6-.6 1.5-1 2.4-.8.9.1 1.7.6 2.1 1.4l11.5 20c.8 1.4.3 3.1-1 3.9-.4.1-.9.2-1.4.2zM77.2 98.2H27.5c-5.4-.1-7.5-2.6-8.3-4-1.1-2-1-4.5.3-6.6 1.6-2.6 4.6-4.1 8.1-4h3c.7-3.5 3.6-6.9 7.5-6.9h6.6c.7-2.8 3.3-4.9 6.3-4.9h19.8c3.2 0 5.9 2.3 6.4 5.4h5.5c3.7 0 7.8 3 7.8 7s-4.1 7-7.8 7h-.6c0 .2 0 .5 0 .7 0 2.5-1.3 4.8-3.5 6-.6.3-1.1.4-1.6.4z" />
      <circle cx="77" cy="23.8" r="5.5" />
    </svg>
  );
}

function IslandJourneysIcon() {
  return (
    <svg className="stats-counter-icon h-12 w-12" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M92.8 98.7c-.5 0-1-.1-1.5-.4-7.5-4.6-24-7.6-42.1-7.6-17.8 0-33.2 2.7-41.3 7.2-1.4.8-3.1.3-3.9-1.1-.8-1.4-.3-3.1 1.1-3.9 9-5 25.1-7.9 44.1-7.9 19.4 0 36.7 3.3 45.1 8.5 1.3.8 1.8 2.6.9 3.9-.9 1.3-2.3 1.8-3.8 1.8zM67.8 90.2c-1.6 0-2.9-1.3-2.9-2.9V49.1c-3.1-7.8-.9-23.1 3.2-30.6.8-1.4 2.5-1.9 3.9-1.1 1.4.8 1.9 2.5 1.1 3.9-3.4 6.2-5.4 20.3-2.8 26.1.2.4.3.8.3 1.2v38.8c0 1.6-1.3 2.9-2.9 2.9zM59.8 89.2c-1.6 0-2.9-1.3-2.9-2.9 0-1.6.1-3.9.1-6.5.1-5.6.4-15.5-.1-18.6-.8-.4-1.6-.7-2.4-1.1-3-1.2-6.1-2.4-9.4-8.9-.7-1.4-.2-3.1 1.3-3.8 1.4-.7 3.1-.2 3.8 1.3 2.3 4.5 3.8 5.2 6.4 6.2 1.2.5 2.6 1 4.2 2 2 1.3 2.4 3.2 1.9 23.1-.1 2.5-.1 4.8-.1 6.4 0 1.6-1.3 2.9-2.9 2.9zM53.7 73.9c-9.4 0-15.4-6.1-18-12.6-3.8-9.7-1.9-23.5 7.7-30.3-.4-2.1-.5-4.3-.4-6.6C44 11.7 54.3 1.3 66 1.3 76 1.3 84.2 9 85.6 19.6c8.5 2.5 14.1 11.2 13.3 21.1-.7 9.1-6.5 17.2-14.5 20.2-1.5.6-3.1-.2-3.7-1.7-.6-1.5.2-3.1 1.7-3.7 5.9-2.2 10.3-8.4 10.8-15.3.6-7.8-4-14.5-10.7-15.6-1.3-.2-2.3-1.3-2.4-2.7C79.7 13.5 73.6 7 66 7c-8.7 0-16.4 8-17.2 17.9-.2 2.3 0 4.6.7 6.7.4 1.3-.2 2.6-1.4 3.3-8.2 4.5-10.2 16.2-7 24.3 1.4 3.5 5.9 11.3 17.6 8.3 1.5-.4 3.1.5 3.5 2.1.4 1.5-.5 3.1-2.1 3.5-1.8.5-4 .8-6 .8z" />
    </svg>
  );
}

function YearsInFieldIcon() {
  return (
    <svg className="stats-counter-icon h-12 w-12" viewBox="0 0 100 100" fill="currentColor" aria-hidden>
      <path d="M67.6 97.5h-35c-5 0-10-2.1-13.5-5.8-3.5-3.6-5.3-8.4-5.1-13.3l1.8-43.7c.1-1.5 1.4-2.7 2.9-2.7 1.5.1 2.7 1.4 2.7 2.9l-1.8 43.7c-.1 3.4 1.1 6.7 3.6 9.2 2.5 2.6 6 4.1 9.5 4.1h35c3.5 0 7-1.5 9.5-4.1 2.4-2.5 3.7-5.8 3.6-9.2l-1.8-43.7c-.1-1.5 1.1-2.8 2.7-2.9 1.6-.1 2.8 1.1 2.9 2.7l1.8 43.7c.2 4.9-1.6 9.7-5.1 13.3-2.5 2.6-5.8 4.1-9.5 4.1zM57.9 89.4H41.7c-3.4-.3-6.7-1.7-9.2-4.2-2.6-2.6-4.1-6-4.1-9.5 0-.3 0-.6 0-1l1.1-14.5c.1-1.5 1.3-2.6 2.8-2.6h37c1.5 0 2.7 1.1 2.8 2.6l1.1 14.5c0 3.5-1.4 6.9-4.1 9.5-2.5 2.4-5.7 3.9-9.2 4.2zM66.2 51.5h-9.6c-1.5 0-2.8-1.3-2.8-2.8 0-1.5 1.3-2.8 2.8-2.8h9.6c7.1 0 12.9-5.8 12.9-12.9S73.3 20.1 66.2 20.1H34c-7.1 0-12.9 5.8-12.9 12.9S26.9 45.9 34 45.9h9.9c1.5 0 2.8 1.3 2.8 2.8 0 1.5-1.3 2.8-2.8 2.8H34c-10.2 0-18.5-8.3-18.5-18.5S23.8 14.5 34 14.5h32.1c10.2 0 18.5 8.3 18.5 18.5s-8.3 18.5-18.5 18.5z" />
    </svg>
  );
}

function useCountUp(target: number, active: boolean, duration = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, target, duration]);

  return value;
}

function StatItem({
  label,
  value,
  Icon,
  active,
  showDivider,
  locale,
}: {
  label: string;
  value: number;
  Icon: () => JSX.Element;
  active: boolean;
  showDivider: boolean;
  locale: string;
}) {
  const count = useCountUp(value, active);

  return (
    <div
      className={`stats-counter-item ${showDivider ? "stats-counter-item-divider" : ""}`}
    >
      <div className="stats-counter-item-inner flex flex-col items-center px-6 py-10 text-center sm:px-8">
        <Icon />
        <p className={cn(displayFontClass(locale), "stats-counter-number mt-5 text-4xl font-normal sm:text-[2.75rem]")}>
          {count}
        </p>
        <h3 className={cn(bodyFontClass(locale), "stats-counter-label mt-2 text-[10px] font-medium uppercase tracking-[0.18em]")}>
          {label}
        </h3>
      </div>
    </div>
  );
}

export function StatsCounterSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="stats-counter-section">
      <div className="container-luxury">
        <div className="stats-counter-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map((stat, index) => (
            <StatItem
              key={stat.key}
              label={t(stat.key)}
              value={stat.value}
              Icon={stat.Icon}
              active={active}
              showDivider={index < STATS.length - 1}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
