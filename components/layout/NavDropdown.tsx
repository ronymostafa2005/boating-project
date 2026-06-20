"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden>
      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="5" height="8" viewBox="0 0 5 8" fill="none" aria-hidden>
      <path d="M1 1L4 4L1 7" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export interface NavDropdownChild {
  key: string;
  href?: string;
  onClick?: () => void;
  showArrow?: boolean;
  active?: boolean;
}

export interface NavDropdownItem {
  key: string;
  href?: string;
  children?: NavDropdownChild[];
}

interface NavDropdownProps {
  item: NavDropdownItem;
  isActive: (href: string) => boolean;
  variant?: "default" | "light";
}

export function NavDropdown({ item, isActive, variant = "default" }: NavDropdownProps) {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Boolean(item.children?.length);

  const isParentActive =
    (item.href && isActive(item.href)) ||
    item.children?.some(
      (child) => child.active || (child.href ? isActive(child.href) : false)
    );

  const linkClass = variant === "light" ? "neera-nav-link-light" : "neera-nav-link";

  if (!hasChildren && item.href) {
    return (
      <Link
        href={item.href}
        className={cn(linkClass, isActive(item.href) && "text-neera-gold")}
      >
        {t(item.key)}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={cn(
          linkClass,
          "flex items-center gap-1.5",
          (isOpen || isParentActive) && "text-neera-gold"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {t(item.key)}
        <ChevronDown className="mt-px opacity-70" />
      </button>

      <div
        className={cn(
          "neera-nav-dropdown absolute start-0 top-full z-50 min-w-[300px] pt-2 transition-all duration-200",
          isOpen
            ? "pointer-events-auto visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        )}
      >
        <div className="border-t-2 border-neera-gold bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          {item.children!.map((child, index) => {
            const childActive =
              child.active ?? (child.href ? isActive(child.href) : false);
            const isLast = index === item.children!.length - 1;
            const itemClass = cn(
              "neera-nav-dropdown-item flex w-full items-center justify-between gap-4",
              !isLast && "border-b border-black/[0.06]",
              childActive && "text-neera-gold"
            );

            if (child.onClick) {
              return (
                <button
                  key={child.key}
                  type="button"
                  onClick={() => {
                    child.onClick?.();
                    setIsOpen(false);
                  }}
                  className={itemClass}
                >
                  <span>{t(child.key)}</span>
                  {child.showArrow && <ChevronRight className="shrink-0 opacity-50" />}
                </button>
              );
            }

            return (
              <Link
                key={child.key}
                href={child.href!}
                className={itemClass}
                onClick={() => setIsOpen(false)}
              >
                <span>{t(child.key)}</span>
                {child.showArrow && <ChevronRight className="shrink-0 opacity-50" />}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
