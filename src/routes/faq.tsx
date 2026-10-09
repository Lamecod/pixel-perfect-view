import { createFileRoute } from "@tanstack/react-router";

import { ContentPage } from "@/components/nishaan/storefront";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — Nishaan" },
      { name: "description", content: "Answers about ordering Nishaan tattoos, prices, availability, application, compatibility, and delivery." },
      { property: "og:title", content: "Frequently Asked Questions — Nishaan" },
      { property: "og:description", content: "Helpful answers about asking Nishaan about designs and ordering on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return <ContentPage kind="faq" />;
}