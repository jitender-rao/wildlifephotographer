import type { Metadata } from "next";
import { PLACEHOLDER_PRINTS } from "@/lib/placeholder-prints";
import { PrintCard } from "@/components/shop/PrintCard";

export const metadata: Metadata = {
  title: "Shop Prints — Wild Wanderings by Sudiip",
  description:
    "Fine art wildlife photography prints by Sudiip. Giclée on Hahnemühle paper, archival inks, limited editions. Ships worldwide.",
};

export default function ShopPage() {
  const featured = PLACEHOLDER_PRINTS.filter((p) => p.featured);
  const rest = PLACEHOLDER_PRINTS.filter((p) => !p.featured);
  const all = [...featured, ...rest];

  return (
    <main className="min-h-screen bg-[color:var(--ww-bg)] pt-28 pb-24">
      <div className="container-wide">
        {/* Page header */}
        <div className="mb-12 border-b border-[color:var(--ww-border)] pb-10">
          <p className="text-eyebrow mb-3">Fine Art Prints</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h1
              className="heading-section text-[color:var(--ww-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Own the Wild
            </h1>
            <p
              className="text-[color:var(--ww-muted)] text-xs"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
              }}
            >
              {all.length} PRINTS AVAILABLE
            </p>
          </div>
        </div>

        {/* Trust strip — flat, no card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 pb-10 border-b border-[color:var(--ww-border)]">
          {[
            { stat: "200+ yr", label: "Archival lifespan" },
            { stat: "308 gsm", label: "Hahnemühle paper" },
            { stat: "Hand-checked", label: "By Sudiip personally" },
            { stat: "Free shipping", label: "India orders ₹10K+" },
          ].map((item) => (
            <div key={item.stat}>
              <p
                className="text-[color:var(--ww-text)] text-sm font-medium mb-0.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.stat}
              </p>
              <p
                className="text-[color:var(--ww-muted)] text-[10px] uppercase tracking-wider"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* All prints in one grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {all.map((print) => (
            <PrintCard key={print.id} print={print} />
          ))}
        </div>

        {/* Custom order CTA — full-bleed dark section */}
        <div
          className="mt-24 px-10 py-16 text-center"
          style={{ background: "var(--ww-dark-bg)", borderRadius: "2px" }}
        >
          <p className="text-eyebrow text-[color:var(--ww-gold-light)] mb-4">
            Large Format & Custom Orders
          </p>
          <h3
            className="text-2xl font-semibold text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Need something bigger?
          </h3>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Sudiip, I am interested in a custom / large-format print order.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-light inline-flex items-center gap-2 text-sm"
          >
            WhatsApp Sudiip
          </a>
        </div>
      </div>
    </main>
  );
}
