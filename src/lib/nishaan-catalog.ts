import auroraImage from "@/assets/catalog/design-02.jpg.asset.json";
import bornToDriftImage from "@/assets/catalog/design-03.jpg.asset.json";
import gunsmithImage from "@/assets/catalog/design-04.jpg.asset.json";
import evilendedImage from "@/assets/catalog/design-05.jpg.asset.json";
import kaalchakraImage from "@/assets/catalog/design-06.jpg.asset.json";
import holdYourGroundImage from "@/assets/catalog/design-07.jpg.asset.json";
import emmanuelImage from "@/assets/catalog/design-08.jpg.asset.json";
import everythingImage from "@/assets/catalog/design-09.jpg.asset.json";
import bloomfallImage from "@/assets/catalog/design-10.jpg.asset.json";
import bloomImage from "@/assets/catalog/design-11.jpg.asset.json";
import freewaveImage from "@/assets/catalog/design-12.jpg.asset.json";
import lastHopeImage from "@/assets/catalog/design-13.jpg.asset.json";
import venomImage from "@/assets/catalog/design-14.jpg.asset.json";
import alwaysYouImage from "@/assets/catalog/design-15.jpg.asset.json";
import lostAndFoundImage from "@/assets/catalog/design-16.jpg.asset.json";
import palmoraImage from "@/assets/catalog/design-17.jpg.asset.json";
import liveLaughLoveImage from "@/assets/catalog/design-18.jpg.asset.json";
import rebirthImage from "@/assets/catalog/design-19.jpg.asset.json";
import tuttoPassaImage from "@/assets/catalog/design-20.jpg.asset.json";

export interface TattooDesign {
  id: string;
  name: string;
  category: string;
  image: string;
  imageAlt: string;
  catalogPage: number;
}

export const tattooDesigns: TattooDesign[] = [
  { id: "NIS-02", name: "Aurora", category: "Celestial", image: auroraImage.url, imageAlt: "Solar mandala with stars and fine celestial detailing", catalogPage: 2 },
  { id: "NIS-03", name: "Born to Drift", category: "Ocean & Drift", image: bornToDriftImage.url, imageAlt: "Intricate sailor skull and maritime illustration", catalogPage: 3 },
  { id: "NIS-04", name: "Gunsmith", category: "Dark & Ornate", image: gunsmithImage.url, imageAlt: "Twin engraved western revolvers in a symmetrical design", catalogPage: 4 },
  { id: "NIS-05", name: "Evilended", category: "Dark & Ornate", image: evilendedImage.url, imageAlt: "Ornate sword and skeletal motif framed by flowers", catalogPage: 5 },
  { id: "NIS-06", name: "Kaalchakra", category: "Celestial", image: kaalchakraImage.url, imageAlt: "Mechanical sun and moon wheel with ornamental details", catalogPage: 6 },
  { id: "NIS-07", name: "Hold Your Ground", category: "Symbolic", image: holdYourGroundImage.url, imageAlt: "Winged compass and anchor illustration", catalogPage: 7 },
  { id: "NIS-08", name: "Emmanuel", category: "Symbolic", image: emmanuelImage.url, imageAlt: "Prayer hands with rosary and flowing sleeves", catalogPage: 8 },
  { id: "NIS-09", name: "Everything", category: "Symbolic", image: everythingImage.url, imageAlt: "Expressive hand-and-flame tattoo with 'Faith in the Fire' lettering", catalogPage: 9 },
  { id: "NIS-10", name: "Bloomfall", category: "Floral", image: bloomfallImage.url, imageAlt: "Detailed floral bouquet of roses and leaves", catalogPage: 10 },
  { id: "NIS-11", name: "Bloom", category: "Floral", image: bloomImage.url, imageAlt: "Delicate flowering branch in fine-line black ink", catalogPage: 11 },
  { id: "NIS-12", name: "Freewave", category: "Ocean & Drift", image: freewaveImage.url, imageAlt: "Minimal fine-line dolphin outline", catalogPage: 12 },
  { id: "NIS-13", name: "Last Hope", category: "Symbolic", image: lastHopeImage.url, imageAlt: "Dove carrying an olive branch in a fine-line design", catalogPage: 13 },
  { id: "NIS-14", name: "Venom", category: "Dark & Ornate", image: venomImage.url, imageAlt: "Fine-line scorpion with decorative detail", catalogPage: 14 },
  { id: "NIS-15", name: "Always You", category: "Ocean & Drift", image: alwaysYouImage.url, imageAlt: "Two koi fish circling one another", catalogPage: 15 },
  { id: "NIS-16", name: "Lost & Found", category: "Symbolic", image: lostAndFoundImage.url, imageAlt: "Pair of compass-inspired matching tattoo illustrations", catalogPage: 16 },
  { id: "NIS-17", name: "Palmora", category: "Ocean & Drift", image: palmoraImage.url, imageAlt: "Graphic tropical palms reflected on the horizon", catalogPage: 17 },
  { id: "NIS-18", name: "Live Laugh Love", category: "Symbolic", image: liveLaughLoveImage.url, imageAlt: "Fine script 'live laugh love' with the small words 'three essences'", catalogPage: 18 },
  { id: "NIS-19", name: "Rebirth", category: "Floral", image: rebirthImage.url, imageAlt: "Ornamental butterfly and serpent with crescent moon", catalogPage: 19 },
  { id: "NIS-20", name: "Tutto Passa", category: "Symbolic", image: tuttoPassaImage.url, imageAlt: "Elegant 'Tutto Passa' lettering and delicate accents", catalogPage: 20 },
];

export const designCategories = ["All designs", ...new Set(tattooDesigns.map((design) => design.category))];