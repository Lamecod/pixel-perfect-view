import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, Check, Instagram, MessageCircle, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { designCategories, tattooDesigns, type TattooDesign } from "@/lib/nishaan-catalog";
import { createWhatsAppOrderUrl, type WhatsAppOrderLine } from "@/lib/whatsapp-order";

const CART_STORAGE_KEY = "nishaan-cart-v1";
type SortMode = "featured" | "name-asc" | "name-desc";
type StoredCart = Record<string, number>;

const featuredDesigns = [
  tattooDesigns.find((design) => design.name === "Aurora"),
  tattooDesigns.find((design) => design.name === "Bloomfall"),
  tattooDesigns.find((design) => design.name === "Hold Your Ground"),
].filter((design): design is TattooDesign => design !== undefined);

function QuantityControl({
  quantity,
  label,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  label: string;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="quantity-control" aria-label={`${label}, quantity ${quantity}`}>
      <Button variant="ghost" size="icon" aria-label={`Remove one ${label}`} disabled={quantity <= 1} onClick={onDecrease}>
        <Minus aria-hidden="true" />
      </Button>
      <span aria-live="polite">{quantity}</span>
      <Button variant="ghost" size="icon" aria-label={`Add one ${label}`} onClick={onIncrease}>
        <Plus aria-hidden="true" />
      </Button>
    </div>
  );
}

function SiteHeader({ cartCount, onOpenCart }: { cartCount: number; onOpenCart: () => void }) {
  return (
    <>
      <div className="announcement-bar">
        <span>19 designs from the Nishaan catalog</span>
        <span aria-hidden="true">·</span>
        <span>Ask about your order on WhatsApp</span>
      </div>
      <header className="site-header">
        <div className="header-main">
          <Link to="/" className="brand-mark" aria-label="Nishaan home">
            <span className="brand-crown" aria-hidden="true">♛</span>
            <span>NISHAAN</span>
            <small>WEAR WHAT MATTERS.</small>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link to="/#shop">Shop</Link>
            <Link to="/about">The story</Link>
            <Link to="/faq">Questions</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <Button variant="outline" size="sm" className="cart-trigger" onClick={onOpenCart} aria-label={`Open your bag, ${cartCount} items`}>
            <ShoppingBag aria-hidden="true" />
            <span className="cart-label">Bag</span>
            <span className="cart-count" aria-live="polite">{cartCount}</span>
          </Button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link to="/#shop">Shop</Link>
          <Link to="/about">Story</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Link to="/" className="footer-brand">NISHAAN<sup>™</sup></Link>
          <p>Semi-permanent tattoos. Wear what matters.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/about">Our story</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <a className="footer-order-link" href={createWhatsAppOrderUrl([])} target="_blank" rel="noreferrer">
          <MessageCircle aria-hidden="true" /> Ask Nishaan on WhatsApp <ArrowRight aria-hidden="true" />
        </a>
      </div>
      <div className="footer-legal"><span>© Nishaan</span><span>Made for the moments you carry.</span></div>
    </footer>
  );
}

function DesignTile({ design, onView, onAdd, compact = false }: {
  design: TattooDesign;
  onView: (design: TattooDesign) => void;
  onAdd: (design: TattooDesign) => void;
  compact?: boolean;
}) {
  return (
    <article className={`design-tile${compact ? " design-tile-compact" : ""}`}>
      <button className="design-artwork" onClick={() => onView(design)} aria-label={`View ${design.name} design`}>
        <img src={design.image} alt={design.imageAlt} loading="lazy" />
        <span className="artwork-zoom" aria-hidden="true"><ArrowRight /></span>
      </button>
      <div className="design-info">
        <div className="design-title-line">
          <button className="design-name" onClick={() => onView(design)}>{design.name}</button>
          <span className="design-price">Ask us</span>
        </div>
        <div className="design-meta"><span>{design.category}</span><span>Ref. {design.id}</span></div>
        <Button variant="ghost" size="sm" className="add-design" onClick={() => onAdd(design)}>
          <Plus aria-hidden="true" /> Add to bag
        </Button>
      </div>
    </article>
  );
}

export function NishaanStorefront() {
  const [cart, setCart] = useState<StoredCart>({});
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<TattooDesign | null>(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All designs");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("featured");

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsed: unknown = JSON.parse(storedCart);
        if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
          const validEntries = Object.entries(parsed).filter(([designId, quantity]) =>
            tattooDesigns.some(({ id }) => id === designId) && Number.isInteger(quantity) && Number(quantity) > 0,
          );
          setCart(Object.fromEntries(validEntries) as StoredCart);
        }
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  const orderLines = useMemo(() => Object.entries(cart).flatMap(([designId, quantity]) => {
    const design = tattooDesigns.find(({ id }) => id === designId);
    return design && quantity > 0 ? [{ design, quantity }] satisfies WhatsAppOrderLine[] : [];
  }), [cart]);

  const cartCount = orderLines.reduce((total, line) => total + line.quantity, 0);

  const filteredDesigns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const matchingDesigns = tattooDesigns.filter((design) =>
      (activeCategory === "All designs" || design.category === activeCategory)
      && (!query || `${design.name} ${design.id} ${design.category}`.toLowerCase().includes(query)),
    );
    if (sortMode === "name-asc") matchingDesigns.sort((a, b) => a.name.localeCompare(b.name));
    if (sortMode === "name-desc") matchingDesigns.sort((a, b) => b.name.localeCompare(a.name));
    return matchingDesigns;
  }, [activeCategory, searchQuery, sortMode]);

  function addToCart(design: TattooDesign, quantity = 1) {
    setCart((current) => ({ ...current, [design.id]: (current[design.id] ?? 0) + quantity }));
  }

  function setDesignQuantity(designId: string, quantity: number) {
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[designId];
      else next[designId] = quantity;
      return next;
    });
  }

  function showDetails(design: TattooDesign) {
    setDetailQuantity(1);
    setSelectedDesign(design);
  }

  return (
    <div className="storefront">
      <SiteHeader cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> NISHAAN SEMI-PERMANENT TATTOOS</p>
            <h1>Wear what<br /><span>matters.</span></h1>
            <p className="hero-description">Find the design that feels like yours. Explore the Nishaan catalog and ask us about your pick, straight on WhatsApp.</p>
            <a className="hero-cta" href="#shop">Explore the collection <ArrowDown aria-hidden="true" /></a>
            <p className="hero-note"><span className="sparkle-bullet"><Sparkles aria-hidden="true" /></span> Choose a design. We’ll confirm its price and availability in chat.</p>
          </div>
          <div className="hero-artwork-grid" aria-label="Tattoo designs from the Nishaan collection">
            {featuredDesigns.map((design, index) => (
              <button
                className={`hero-artwork hero-artwork-${index + 1}`}
                key={design.id}
                onClick={() => showDetails(design)}
                aria-label={`Discover ${design.name}`}
              >
                <img src={design.image} alt={design.imageAlt} />
                <span className="hero-artwork-caption"><span>0{index + 1}</span>{design.name}<ArrowRight aria-hidden="true" /></span>
              </button>
            ))}
            <div className="hero-artwork-stamp" aria-hidden="true"><span>19</span><small>DESIGNS<br />TO EXPLORE</small></div>
          </div>
          <span className="hero-vertical-note" aria-hidden="true">A LITTLE INK. A LOT OF YOU.</span>
        </section>

        <section className="collection-band" aria-label="Collection highlights">
          <div><span>01</span><p>Made to mean something</p></div>
          <div><span>02</span><p>Real artwork from our catalog</p></div>
          <div><span>03</span><p>Order one, or pick a few</p></div>
          <a href={createWhatsAppOrderUrl([])} target="_blank" rel="noreferrer">All orders start with a hello <ArrowRight aria-hidden="true" /></a>
        </section>

        <section className="featured-section content-shell">
          <div className="section-intro"><p className="eyebrow"><span className="eyebrow-dot" /> A FEW TO FALL FOR</p><h2>The standouts.</h2><p>A first look at the original artwork behind the catalog.</p></div>
          <div className="featured-grid">
            {featuredDesigns.map((design, index) => (
              <div className={`featured-card featured-card-${index + 1}`} key={design.id}>
                <DesignTile design={design} onView={showDetails} onAdd={addToCart} compact />
              </div>
            ))}
          </div>
        </section>

        <section className="catalog-section" id="shop">
          <div className="content-shell">
            <div className="catalog-heading"><div className="section-intro"><p className="eyebrow"><span className="eyebrow-dot" /> THE NISHAAN CATALOG</p><h2>Find your mark.</h2><p>Every design shown is from the original Nishaan catalog.</p></div><span className="catalog-total">{tattooDesigns.length} ORIGINAL DESIGNS</span></div>
            <div className="catalog-toolbar">
              <label className="search-field">
                <Search aria-hidden="true" />
                <Input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.currentTarget.value)} placeholder="Search designs" aria-label="Search tattoo designs" />
                {searchQuery && <Button variant="ghost" size="icon" aria-label="Clear search" onClick={() => setSearchQuery("")}><X aria-hidden="true" /></Button>}
              </label>
              <label className="sort-control"><SlidersHorizontal aria-hidden="true" /><span className="sr-only">Sort designs</span><select value={sortMode} onChange={(event) => setSortMode(event.currentTarget.value as SortMode)} aria-label="Sort designs"><option value="featured">Featured</option><option value="name-asc">Name: A to Z</option><option value="name-desc">Name: Z to A</option></select></label>
            </div>
            <div className="category-filter" role="group" aria-label="Filter by tattoo category">
              {designCategories.map((category) => <Button key={category} variant={activeCategory === category ? "default" : "outline"} size="sm" onClick={() => setActiveCategory(category)}>{category}</Button>)}
            </div>
            <div className="catalog-result-line"><span aria-live="polite">Showing {filteredDesigns.length} {filteredDesigns.length === 1 ? "design" : "designs"}</span><span>Price confirmed directly with Nishaan</span></div>
            {filteredDesigns.length > 0 ? (
              <div className="catalog-grid">{filteredDesigns.map((design) => <DesignTile key={design.id} design={design} onView={showDetails} onAdd={addToCart} />)}</div>
            ) : (
              <div className="empty-results"><p className="eyebrow">NO MATCHES JUST YET</p><h3>Try another search.</h3><p>Nothing in the collection matches that search and filter combination.</p><Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory("All designs"); }}>Show every design <ArrowRight aria-hidden="true" /></Button></div>
            )}
          </div>
        </section>

        <section className="order-note-section"><div><p className="eyebrow"><span className="eyebrow-dot" /> HOW TO MAKE IT YOURS</p><h2>Your pick.<br />Our next conversation.</h2><p>Add a design to your bag, then send your picks straight to Nishaan on WhatsApp. We’ll confirm the details with you before you order.</p><Button asChild variant="default" size="lg"><a href={createWhatsAppOrderUrl([])} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Start a conversation</a></Button></div><div className="order-note-art"><img src={featuredDesigns[1]?.image} alt={featuredDesigns[1]?.imageAlt ?? "Flower tattoo design from the Nishaan catalog"} loading="lazy" /><div className="order-note-tag"><span>WEAR</span><strong>WHAT</strong><span>MATTERS.</span></div></div></section>
      </main>
      <SiteFooter />

      <Dialog open={selectedDesign !== null} onOpenChange={(open) => { if (!open) setSelectedDesign(null); }}>
        <DialogContent className="product-dialog">
          {selectedDesign && <>
            <div className="product-detail-grid">
              <div className="product-detail-art"><img src={selectedDesign.image} alt={selectedDesign.imageAlt} /></div>
              <div className="product-detail-copy">
                <p className="eyebrow"><span className="eyebrow-dot" /> {selectedDesign.category.toUpperCase()} · {selectedDesign.id}</p>
                <DialogHeader className="product-detail-header"><DialogTitle>{selectedDesign.name}</DialogTitle><DialogDescription>From page {selectedDesign.catalogPage} of the Nishaan catalog.</DialogDescription></DialogHeader>
                <p className="product-price-note">Ask us for the price</p>
                <p className="product-detail-explanation">Send this design to Nishaan on WhatsApp and ask about current availability and price.</p>
                <div className="quantity-row"><span>Quantity</span><QuantityControl quantity={detailQuantity} label={selectedDesign.name} onDecrease={() => setDetailQuantity((value) => Math.max(1, value - 1))} onIncrease={() => setDetailQuantity((value) => value + 1)} /></div>
                <Button asChild variant="default" size="lg" className="detail-order-button"><a href={createWhatsAppOrderUrl([{ design: selectedDesign, quantity: detailQuantity }])} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Ask about this design</a></Button>
                <Button variant="outline" size="lg" className="detail-add-button" onClick={() => { addToCart(selectedDesign, detailQuantity); setSelectedDesign(null); }}><ShoppingBag aria-hidden="true" /> Add to bag</Button>
                <p className="product-detail-footnote"><Check aria-hidden="true" /> Price and availability confirmed in chat</p>
              </div>
            </div>
          </>}
        </DialogContent>
      </Dialog>

      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="cart-dialog">
          <DialogHeader className="cart-dialog-header"><DialogTitle>Your bag<span>{cartCount}</span></DialogTitle><DialogDescription>Your picks are kept here while you browse.</DialogDescription></DialogHeader>
          {orderLines.length > 0 ? <>
            <div className="cart-items">{orderLines.map(({ design, quantity }) => <article className="cart-item" key={design.id}><button className="cart-item-art" onClick={() => { setCartOpen(false); showDetails(design); }} aria-label={`View ${design.name}`}><img src={design.image} alt="" /></button><div className="cart-item-copy"><button className="cart-item-name" onClick={() => { setCartOpen(false); showDetails(design); }}>{design.name}</button><span>Ask us for the price</span><QuantityControl quantity={quantity} label={design.name} onDecrease={() => setDesignQuantity(design.id, quantity - 1)} onIncrease={() => setDesignQuantity(design.id, quantity + 1)} /></div><Button variant="ghost" size="icon" className="cart-remove" aria-label={`Remove ${design.name} from bag`} onClick={() => setDesignQuantity(design.id, 0)}><X aria-hidden="true" /></Button></article>)}</div>
            <div className="cart-summary"><span>Price confirmed by Nishaan on WhatsApp</span><p>Send your picks to ask about availability and price.</p><Button asChild variant="default" size="lg"><a href={createWhatsAppOrderUrl(orderLines)} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Ask about these designs</a></Button></div>
          </> : <div className="empty-bag"><div className="empty-bag-icon"><ShoppingBag aria-hidden="true" /></div><p className="eyebrow">YOUR BAG IS WAITING</p><h3>A design could go here.</h3><p>Browse the collection and add the ones that feel like yours.</p><Button variant="outline" onClick={() => { setCartOpen(false); document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the collection <ArrowDown aria-hidden="true" /></Button></div>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function ContentPage({ kind }: { kind: "about" | "faq" | "contact" }) {
  const title = kind === "about" ? "A mark with meaning." : kind === "faq" ? "Good to know." : "We’re a message away.";
  const pageKicker = kind === "about" ? "THE NISHAAN STORY" : kind === "faq" ? "A FEW ANSWERS FIRST" : "COME SAY HELLO";

  return (
    <div className="content-page-shell">
      <SiteHeader cartCount={0} onOpenCart={() => undefined} />
      <main className="content-page-main">
        <Link to="/" className="back-link"><ArrowLeft aria-hidden="true" /> Back to Nishaan</Link>
        <p className="eyebrow"><span className="eyebrow-dot" /> {pageKicker}</p>
        <h1>{title}</h1>
        {kind === "about" && <section className="editorial-page-content"><p className="page-lede">Nishaan is a semi-permanent tattoo brand built around one simple idea: wear what matters.</p><p>Every design on this page comes from the supplied Nishaan catalog. Pick the one that speaks to you, then get in touch directly to ask about price and availability.</p><p>For current product details, application guidance, and other specifics, message Nishaan on WhatsApp before ordering.</p><Button asChild variant="default" size="lg"><a href={createWhatsAppOrderUrl([])} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Talk to Nishaan</a></Button></section>}
        {kind === "faq" && <section className="faq-list">{[
          ["How do I order a design?", "Add your picks to the bag, then use the WhatsApp button to send Nishaan your list. Your order is not confirmed until you and Nishaan agree on the details."],
          ["Where can I see the price?", "Prices were not included in the supplied catalog. Message Nishaan on WhatsApp for the current price of each design."],
          ["Are designs currently available?", "Availability was not specified in the catalog. Nishaan can confirm which designs are currently available in WhatsApp."],
          ["How long does a design last?", "Duration details were not included with the supplied catalog. Please ask Nishaan before ordering."],
          ["How do I apply or remove a tattoo?", "Application and removal instructions were not included with the supplied catalog. Ask Nishaan for the manufacturer's current guidance."],
          ["What about skin compatibility and delivery?", "No verified skin-compatibility or delivery information was supplied. Please confirm both directly with Nishaan before ordering."],
        ].map(([question, answer], index) => <details className="faq-item" key={question} open={index === 0}><summary><span>{question}</span><Plus aria-hidden="true" /></summary><p>{answer}</p></details>)}</section>}
        {kind === "contact" && <section className="editorial-page-content"><p className="page-lede">Questions about a tattoo, availability, or price? Reach Nishaan directly on WhatsApp.</p><p>Send a product name or use one of the design-order buttons to start a message with the details already filled in.</p><Button asChild variant="default" size="lg"><a href={createWhatsAppOrderUrl([])} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Message Nishaan on WhatsApp</a></Button><p className="contact-phone-label">+91 74249 67727</p></section>}
      </main>
      <SiteFooter />
    </div>
  );
}