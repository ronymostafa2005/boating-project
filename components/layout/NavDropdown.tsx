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
  children?: NavDropdownChild[];
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

function isChildActive(
  child: NavDropdownChild,
  isActive: (href: string) => boolean
): boolean {
  if (child.active) return true;
  if (child.href && isActive(child.href)) return true;
  return child.children?.some((nested) => isChildActive(nested, isActive)) ?? false;
}

function NavDropdownChildRow({
  child,
  isActive,
  isLast,
  onClose,
}: {
  child: NavDropdownChild;
  isActive: (href: string) => boolean;
  isLast: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("nav");
  const [subOpen, setSubOpen] = useState(false);
  const hasSubChildren = Boolean(child.children?.length);
  const childActive = isChildActive(child, isActive);
  const itemClass = cn(
    "neera-nav-dropdown-item flex w-full items-center justify-between gap-4",
    !isLast && "border-b border-black/[0.06]",
    childActive && "text-neera-gold"
  );

  if (hasSubChildren) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setSubOpen(true)}
        onMouseLeave={() => setSubOpen(false)}
      >
        <Link
          href={child.href!}
          className={itemClass}
          onClick={onClose}
        >
          <span>{t(child.key)}</span>
          <ChevronRight className="shrink-0 opacity-50" />
        </Link>

        <div
          className={cn(
            "neera-nav-flyout absolute start-full top-0 z-50 min-w-[280px] ps-1 transition-all duration-200",
            subOpen
              ? "pointer-events-auto visible translate-x-0 opacity-100"
              : "pointer-events-none invisible -translate-x-1 opacity-0"
          )}
        >
          <div className="border-t-2 border-neera-gold bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            {child.children!.map((nested, nestedIndex) => (
              <NavDropdownChildRow
                key={nested.key}
                child={nested}
                isActive={isActive}
                isLast={nestedIndex === child.children!.length - 1}
                onClose={onClose}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (child.onClick) {
    return (
      <button
        type="button"
        onClick={() => {
          child.onClick?.();
          onClose();
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
      href={child.href!}
      className={itemClass}
      onClick={onClose}
    >
      <span>{t(child.key)}</span>
      {child.showArrow && <ChevronRight className="shrink-0 opacity-50" />}
    </Link>
  );
}

export function NavDropdown({ item, isActive, variant = "default" }: NavDropdownProps) {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Boolean(item.children?.length);

  const isParentActive =
    (item.href && isActive(item.href)) ||
    item.children?.some((child) => isChildActive(child, isActive));

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
          {item.children!.map((child, index) => (
            <NavDropdownChildRow
              key={child.key}
              child={child}
              isActive={isActive}
              isLast={index === item.children!.length - 1}
              onClose={() => setIsOpen(false)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
