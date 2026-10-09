import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "@/components/nishaan/storefront";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Nishaan Tattoos" },
      { name: "description", content: "Meet Nishaan, the semi-permanent tattoo brand behind the designs in the original catalog." },
      { property: "og:title", content: "Our Story — Nishaan Tattoos" },
      { property: "og:description", content: "Discover Nishaan's idea: wear what matters." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return <ContentPage kind="about" />;
}