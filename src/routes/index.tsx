import { createFileRoute } from "@tanstack/react-router";

import { NishaanStorefront } from "@/components/nishaan/storefront";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nishaan — Semi-Permanent Tattoos" },
      { name: "description", content: "Explore 19 original Nishaan semi-permanent tattoo designs, discover the real catalog artwork, and ask about ordering directly on WhatsApp." },
      { property: "og:title", content: "Nishaan — Wear What Matters" },
      { property: "og:description", content: "Discover the Nishaan semi-permanent tattoo catalog and ask about a design directly on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NishaanStorefront,
});
