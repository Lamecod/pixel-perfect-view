import type { TattooDesign } from "@/lib/nishaan-catalog";

export const WHATSAPP_NUMBER = "917424967727";

export interface WhatsAppOrderLine {
  design: TattooDesign;
  quantity: number;
}

function formatOrderLine({ design, quantity }: WhatsAppOrderLine): string {
  return [
    `Design: ${design.name}`,
    `Product ID: ${design.id}`,
    "Price: Please confirm on WhatsApp",
    `Quantity: ${quantity}`,
    `Catalog reference: Page ${design.catalogPage}`,
  ].join("\n");
}

export function createWhatsAppOrderUrl(lines: WhatsAppOrderLine[]): string {
  if (lines.length === 0) return `https://wa.me/${WHATSAPP_NUMBER}`;

  const message = [
    "Hi! I would like to ask about ordering these Nishaan semi-permanent tattoos:",
    ...lines.map((line, index) => `${index + 1}.\n${formatOrderLine(line)}`),
    "Please confirm availability and the price before I order.",
  ].join("\n\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}