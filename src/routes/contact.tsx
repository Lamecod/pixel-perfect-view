import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "@/components/nishaan/storefront";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nishaan Semi-Permanent Tattoos" },
      { name: "description", content: "Get in touch with Nishaan about a tattoo design, price, availability, or an order on WhatsApp." },
      { property: "og:title", content: "Contact Nishaan" },
      { property: "og:description", content: "Questions about a Nishaan semi-permanent tattoo? Start a WhatsApp conversation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return <ContentPage kind="contact" />;
}