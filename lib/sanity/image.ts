import "server-only";

import type { SanityImageSource } from "@sanity/image-url";
import { getSanityClient, isSanityConfigured } from "./client";

export async function getImageUrl(
  source: SanityImageSource | string,
  width = 800
): Promise<string> {
  if (typeof source === "string") return source;
  if (!isSanityConfigured) return "";

  const client = await getSanityClient();
  if (!client) return "";

  const imageUrlBuilder = (await import("@sanity/image-url")).default;
  return imageUrlBuilder(client)
    .image(source)
    .width(width)
    .auto("format")
    .fit("crop")
    .url();
}
