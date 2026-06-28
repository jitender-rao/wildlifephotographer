import type { Metadata } from "next";
import { PLACEHOLDER_PRINTS } from "@/lib/placeholder-prints";
import { PrintCard } from "@/components/shop/PrintCard";

export const metadata: Metadata = {
  title: "Shop Prints — Wild Wanderings by Sudiip",
  description:
    "Fine art wildlife photography prints by Sudiip. Museum-quality giclée on Hahnemühle paper, archival inks, limited and open editions. Ships worldwide.",
};

export default function ShopPage() {
  const featured = PLACEHOLDER_PRINTS.filter((p) => p.featured);
  const rest = PLACEHOLDER_PRINTS.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-[color:var(--ww-bg)] pt-24 pb-20">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="text-caption text-[color:var(--ww-gold)] mb-2">
            Fine Art Prints
          </p>
          <h1 className="heading-section text-[color:var(--ww-text)] mb-4">
            Own a Piece of the Wild
          </h1>
          <p className="text-[color:var(--ww-muted)] leading-relaxed">
            Museum-quality giclée prints on Hahnemühle paper with archival
            pigment inks rated 200+ years. Each limited edition ships with a
            signed Certificate of Authenticity. Open editions printed to order —
            no minimum run.
          </p>
        </div>

        {/* Trust bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-6 rounded-xl border border-[color:var(--ww-border)] bg-[color:var(--ww-surface)]">
          {[
            { stat: "200+yr", label: "Archival Lifespan" },
            { stat: "308gsm", label: "Hahnemühle Paper" },
            { stat: "Hand", label: "Inspected by Sudiip" },
            { stat: "Free", label: "India Shipping ₹10K+" },
          ].map((item) => (
            <div key={item.stat} className="text-center">
              <p
                className="text-[color:var(--ww-gold)] text-xl font-semibold mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.stat}
              </p>
              <p
                className="text-[color:var(--ww-muted)] text-xs uppercase tracking-wide"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Featured prints */}
        {featured.length > 0 && (
          <section className="mb-16">
            <h2
              className="text-[color:var(--ww-text)] text-xl font-semibold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Featured Editions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((print) => (
                <PrintCard key={print.id} print={print} />
              ))}
            </div>
          </section>
        )}

        {/* All prints */}
        {rest.length > 0 && (
          <section>
            <h2
              className="text-[color:var(--ww-text)] text-xl font-semibold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              All Prints
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((print) => (
                <PrintCard key={print.id} print={print} />
              ))}
            </div>
          </section>
        )}

        {/* Custom size CTA */}
        <div className="mt-20 text-center py-14 px-8 rounded-2xl border border-[color:var(--ww-border)] bg-[color:var(--ww-surface)]">
          <p className="text-caption text-[color:var(--ww-gold)] mb-3">
            Large Format & Custom Orders
          </p>
          <h3
            className="text-2xl font-semibold text-[color:var(--ww-text)] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Need something bigger?
          </h3>
          <p className="text-[color:var(--ww-muted)] mb-6 max-w-md mx-auto text-sm leading-relaxed">
            Sudiip accepts custom print commissions for statement-sized pieces
            (60×40&quot; and above), interior design projects, and corporate
            art. WhatsApp for pricing and availability.
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Sudiip, I am interested in a custom / large-format print order.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold inline-flex items-center gap-2 text-sm"
          >
            WhatsApp Sudiip
          </a>
        </div>
      </div>
    </main>
  );
}
