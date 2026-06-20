"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

type SplitHeadingProps = {
  /** Each inner array is one visual line; words stay together (no mid-word breaks). */
  wordGroups: string[][];
  className?: string;
  /** Loop the reveal animation while visible (CSS-only, no JS timers). */
  loop?: boolean;
  /** Controlled mode — parent toggles animation. */
  active?: boolean;
};

export function SplitHeading({
  wordGroups,
  className = "",
  loop = false,
  active: controlledActive,
}: SplitHeadingProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const ref = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (controlledActive !== undefined) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [controlledActive]);

  const isActive = controlledActive ?? inView;
  let charIndex = 0;
  const label = wordGroups.flat().join(" ");

  return (
    <h2
      ref={ref}
      className={`split-heading ${isArabic ? "split-heading--arabic" : ""} ${loop ? "split-heading--loop" : "split-heading--once"} ${isActive ? "split-heading--active" : ""} ${className}`}
      aria-label={label}
    >
      {wordGroups.map((words, lineIdx) => (
        <span key={lineIdx} className="block">
          {words.map((word, wordIdx) => {
            if (isArabic) {
              const index = charIndex++;
              return (
                <span key={wordIdx}>
                  <span
                    className="split-word split-char inline-block whitespace-nowrap"
                    style={{ "--char-index": index } as React.CSSProperties}
                    aria-hidden
                  >
                    {word}
                  </span>
                  {wordIdx < words.length - 1 ? (
                    <span className="inline-block" aria-hidden>
                      {"\u00A0"}
                    </span>
                  ) : null}
                </span>
              );
            }

            return (
              <span key={wordIdx} className="split-word inline-block whitespace-nowrap">
                {Array.from(word).map((char, i) => {
                  const index = charIndex++;
                  return (
                    <span
                      key={i}
                      className="split-char"
                      style={{ "--char-index": index } as React.CSSProperties}
                      aria-hidden
                    >
                      {char}
                    </span>
                  );
                })}
                {wordIdx < words.length - 1 ? (
                  <span
                    className="split-char"
                    style={{ "--char-index": charIndex++ } as React.CSSProperties}
                    aria-hidden
                  >
                    {"\u00A0"}
                  </span>
                ) : null}
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}
