"use client";

import { useEffect, useState } from "react";
import { COMING_SOON_TARGET_DATE } from "@/data/comingSoon";
import { bodyFontClass, cn, displayFontClass } from "@/lib/utils";

type CountdownLabels = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(target: Date): CountdownValues {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

type Props = {
  locale: string;
  labels: CountdownLabels;
};

export function ComingSoonCountdown({ locale, labels }: Props) {
  const [values, setValues] = useState<CountdownValues>(() =>
    getCountdown(COMING_SOON_TARGET_DATE)
  );

  useEffect(() => {
    const tick = () => setValues(getCountdown(COMING_SOON_TARGET_DATE));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { key: "days", value: values.days, label: labels.days },
    { key: "hours", value: values.hours, label: labels.hours },
    { key: "minutes", value: values.minutes, label: labels.minutes },
    { key: "seconds", value: values.seconds, label: labels.seconds },
  ] as const;

  return (
    <div
      className={cn("coming-soon__countdown", bodyFontClass(locale))}
      role="timer"
      aria-live="polite"
    >
      {units.map((unit) => (
        <div className="coming-soon__countdown-unit" key={unit.key}>
          <div className="coming-soon__countdown-value">{pad(unit.value)}</div>
          <p className={cn("coming-soon__countdown-label", displayFontClass(locale))}>
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}
