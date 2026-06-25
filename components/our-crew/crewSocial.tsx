import type { CrewMember } from "@/data/ourCrew";

export const CREW_SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com", icon: "facebook" },
  { label: "X", href: "https://www.twitter.com", icon: "x" },
  { label: "YouTube", href: "https://www.youtube.com", icon: "youtube" },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
] as const;

export function CrewSocialIcon({ icon }: { icon: (typeof CREW_SOCIAL_LINKS)[number]["icon"] }) {
  if (icon === "facebook") {
    return (
      <svg className="h-3.5 w-3.5" viewBox="0 0 320 512" fill="currentColor" aria-hidden>
        <path d="M80 299.3V512H196V299.3h86.6l18.7-109.5H196V134.7c0-29.9 8.3-50.3 51.1-50.3H303V6.3C293.7 5.1 261.7 0 225.1 0 148.6 0 80 48.5 80 136.3v53.8H0v109.5h80z" />
      </svg>
    );
  }
  if (icon === "x") {
    return (
      <svg className="h-3.5 w-3.5" viewBox="0 0 512 512" fill="currentColor" aria-hidden>
        <path d="M389.2 48H120.8L48 120.8v270.4L120.8 464h270.4L464 390.4V120.8L389.2 48zm-52.4 300.8-81.2-108.4-99.6 108.4h-24.8l116-125.6-104.4-139.2h84.8l74.8 99.6 91.6-99.6h24.8l-108.8 117.6 112.4 147.2h-84.8z" />
      </svg>
    );
  }
  if (icon === "youtube") {
    return (
      <svg className="h-3.5 w-3.5" viewBox="0 0 576 512" fill="currentColor" aria-hidden>
        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zM232 338.714V177.286L375.714 258 232 338.714z" />
      </svg>
    );
  }
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 448 512" fill="currentColor" aria-hidden>
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.8V416z" />
    </svg>
  );
}

export type { CrewMember };
