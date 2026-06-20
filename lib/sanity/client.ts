import "server-only";

import type { SanityClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const isSanityConfigured = Boolean(projectId);

let sanityClient: SanityClient | null = null;

export async function getSanityClient(): Promise<SanityClient | null> {
  if (!isSanityConfigured || !projectId) return null;

  if (!sanityClient) {
    const { createClient } = await import("@sanity/client");
    sanityClient = createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
      token: process.env.SANITY_API_TOKEN,
    });
  }

  return sanityClient;
}
