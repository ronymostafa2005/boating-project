import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import {
  boatsQuery,
  featuredBoatsQuery,
  boatBySlugQuery,
  faqsQuery,
  pageContentQuery,
} from "@/lib/sanity/queries";
import {
  mockBoats,
  mockFaqs,
  mockPageContent,
} from "@/lib/data/mock";
import type { Boat } from "@/types/boat";
import type { FAQ, PageContent } from "@/types/cms";

export async function getBoats(): Promise<Boat[]> {
  if (!isSanityConfigured) return mockBoats;
  try {
    const client = await getSanityClient();
    if (!client) return mockBoats;
    return await client.fetch<Boat[]>(boatsQuery);
  } catch {
    return mockBoats;
  }
}

export async function getFeaturedBoats(): Promise<Boat[]> {
  if (!isSanityConfigured) return mockBoats.filter((b) => b.featured);
  try {
    const client = await getSanityClient();
    if (!client) return mockBoats.filter((b) => b.featured);
    return await client.fetch<Boat[]>(featuredBoatsQuery);
  } catch {
    return mockBoats.filter((b) => b.featured);
  }
}

export async function getBoatBySlug(slug: string): Promise<Boat | null> {
  if (!isSanityConfigured) {
    return mockBoats.find((b) => b.slug === slug) || null;
  }
  try {
    const client = await getSanityClient();
    if (!client) return mockBoats.find((b) => b.slug === slug) || null;
    return await client.fetch<Boat | null>(boatBySlugQuery, { slug });
  } catch {
    return mockBoats.find((b) => b.slug === slug) || null;
  }
}

export async function getFaqs(): Promise<FAQ[]> {
  if (!isSanityConfigured) return mockFaqs;
  try {
    const client = await getSanityClient();
    if (!client) return mockFaqs;
    return await client.fetch<FAQ[]>(faqsQuery);
  } catch {
    return mockFaqs;
  }
}

export async function getPageContent(slug: string): Promise<PageContent | null> {
  if (!isSanityConfigured) return mockPageContent[slug] || null;
  try {
    const client = await getSanityClient();
    if (!client) return mockPageContent[slug] || null;
    return await client.fetch<PageContent | null>(pageContentQuery, { slug });
  } catch {
    return mockPageContent[slug] || null;
  }
}
