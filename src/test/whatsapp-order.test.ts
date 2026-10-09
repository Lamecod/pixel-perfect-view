import { describe, expect, it } from "vitest";

import { tattooDesigns } from "@/lib/nishaan-catalog";
import { createWhatsAppOrderUrl, WHATSAPP_NUMBER } from "@/lib/whatsapp-order";

describe("Nishaan catalog", () => {
  it("includes all 19 named designs from the supplied catalog", () => {
    expect(tattooDesigns).toHaveLength(19);
    expect(tattooDesigns.map(({ name }) => name)).toEqual([
      "Aurora", "Born to Drift", "Gunsmith", "Evilended", "Kaalchakra",
      "Hold Your Ground", "Emmanuel", "Everything", "Bloomfall", "Bloom",
      "Freewave", "Last Hope", "Venom", "Always You", "Lost & Found", "Palmora",
      "Live Laugh Love", "Rebirth", "Tutto Passa",
    ]);
  });
});

describe("WhatsApp ordering", () => {
  it("uses the confirmed Indian country code and digits-only destination", () => {
    expect(WHATSAPP_NUMBER).toBe("917424967727");
  });

  it("pre-fills the selected design, catalog reference, quantity, and price request", () => {
    const aurora = tattooDesigns.find(({ name }) => name === "Aurora");
    expect(aurora).toBeDefined();
    if (!aurora) throw new Error("Aurora is missing from the catalog");

    const url = new URL(createWhatsAppOrderUrl([{ design: aurora, quantity: 2 }]));
    expect(url.pathname).toBe(`/${WHATSAPP_NUMBER}`);
    expect(url.searchParams.get("text")).toContain("Design: Aurora");
    expect(url.searchParams.get("text")).toContain("Product ID: NIS-02");
    expect(url.searchParams.get("text")).toContain("Quantity: 2");
    expect(url.searchParams.get("text")).toContain("Catalog reference: Page 2");
    expect(url.searchParams.get("text")).toContain("Please confirm on WhatsApp");
  });

  it("includes all selected designs in one cart message", () => {
    const aurora = tattooDesigns[0];
    const freewave = tattooDesigns.find(({ name }) => name === "Freewave");
    expect(aurora).toBeDefined();
    expect(freewave).toBeDefined();
    if (!aurora || !freewave) throw new Error("Required cart designs are missing");

    const text = new URL(createWhatsAppOrderUrl([
      { design: aurora, quantity: 1 },
      { design: freewave, quantity: 3 },
    ])).searchParams.get("text");
    expect(text).toContain("Design: Aurora");
    expect(text).toContain("Design: Freewave");
    expect(text).toContain("Quantity: 3");
  });
});