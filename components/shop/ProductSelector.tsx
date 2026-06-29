"use client";

import { useState, useTransition } from "react";
import { ShoppingBag, MessageCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { PRINT_MEDIUMS, buildSku } from "@/lib/placeholder-prints";
import { WallPreview } from "./WallPreview";
import { CertificatePreview } from "./CertificatePreview";
import type { PlaceholderPrint, PrintSize } from "@/lib/placeholder-prints";
import type { PaperMedium } from "@/types/shop";

interface ProductSelectorProps {
  print: PlaceholderPrint;
}

export function ProductSelector({ print }: ProductSelectorProps) {
  const [selectedSizeId, setSelectedSizeId] = useState<string>(
    print.sizes[1]?.id ?? print.sizes[0].id,
  );
  const [selectedMedium, setSelectedMedium] = useState<PaperMedium>(
    print.availableMediums[0],
  );
  const [added, setAdded] = useState(false);
  const [, startTransition] = useTransition();

  const addItem = useCartStore((s) => s.addItem);
  const openCartDrawer = useUIStore((s) => s.openCartDrawer);

  const selectedSize: PrintSize =
    print.sizes.find((s) => s.id === selectedSizeId) ?? print.sizes[0];
  const medium = PRINT_MEDIUMS.find((m) => m.id === selectedMedium)!;
  const priceINR = Math.round(selectedSize.priceINR * medium.priceMultiplier);
  const priceUSD = Math.round(selectedSize.priceUSD * medium.priceMultiplier);

  const remaining =
    print.edition.type === "limited" &&
    print.edition.total &&
    print.edition.sold !== undefined
      ? print.edition.total - print.edition.sold
      : null;
  const soldOut = remaining !== null && remaining <= 0;
  const isLargeFormat = selectedSizeId === "xxl";

  function handleAddToCart() {
    const sku = buildSku(print.slug, selectedSizeId, selectedMedium);
    addItem({
      sku,
      printId: print.id,
      photoSlug: print.slug,
      photoTitle: print.title,
      imageUrl: print.src,
      size: selectedSizeId,
      sizeLabel: `${selectedSize.label} (${selectedSize.inches})`,
      medium: selectedMedium,
      priceINR,
      priceUSD,
      quantity: 1,
    });
    setAdded(true);
    startTransition(() => {
      openCartDrawer();
      setTimeout(() => setAdded(false), 2500);
    });
  }

  return (
    <div className="space-y-8">
      {/* Pricing headline */}
      <div>
        <div className="flex items-baseline gap-3">
          <span
            className="text-3xl font-semibold text-[color:var(--ww-gold)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ₹{priceINR.toLocaleString("en-IN")}
          </span>
          <span className="text-[color:var(--ww-muted)] text-sm">
            ~${priceUSD.toLocaleString("en-US")} USD
          </span>
        </div>
        {print.edition.type === "limited" && remaining !== null && (
          <p
            className={cn(
              "text-xs mt-1.5",
              remaining <= 5
                ? "text-orange-400"
                : "text-[color:var(--ww-muted)]",
            )}
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}
          >
            {soldOut
              ? "SOLD OUT — join the waitlist below"
              : `${remaining} of ${print.edition.total} remaining`}
          </p>
        )}
      </div>

      {/* Size selector */}
      <div className="space-y-3">
        <Label>Size</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {print.sizes.map((size) => {
            const isActive = size.id === selectedSizeId;
            return (
              <button
                key={size.id}
                onClick={() => setSelectedSizeId(size.id)}
                className={cn(
                  "relative flex flex-col items-start px-3 py-2.5 border text-left transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ww-gold)]",
                  isActive
                    ? "border-[color:var(--ww-gold)] bg-[color:var(--ww-gold)]/8"
                    : "border-[color:var(--ww-border)] hover:border-[color:var(--ww-gold)]/60",
                )}
              >
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wide",
                    isActive
                      ? "text-[color:var(--ww-gold)]"
                      : "text-[color:var(--ww-text)]",
                  )}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {size.label}
                </span>
                <span
                  className="text-[10px] text-[color:var(--ww-muted)] mt-0.5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {size.inches}
                </span>
                <span
                  className={cn(
                    "text-[10px] mt-1 font-medium",
                    isActive
                      ? "text-[color:var(--ww-gold)]"
                      : "text-[color:var(--ww-muted)]",
                  )}
                >
                  ₹
                  {Math.round(
                    size.priceINR * medium.priceMultiplier,
                  ).toLocaleString("en-IN")}
                </span>
                {isActive && (
                  <Check
                    size={12}
                    className="absolute top-2 right-2 text-[color:var(--ww-gold)]"
                  />
                )}
              </button>
            );
          })}
        </div>
        <p
          className="text-[10px] text-[color:var(--ww-muted)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {selectedSize.inches} · {selectedSize.cm}
        </p>
      </div>

      {/* Medium selector */}
      <div className="space-y-3">
        <Label>Medium</Label>
        <div className="space-y-2">
          {PRINT_MEDIUMS.filter((m) =>
            print.availableMediums.includes(m.id),
          ).map((m) => {
            const isActive = m.id === selectedMedium;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMedium(m.id)}
                className={cn(
                  "w-full flex items-start gap-3 px-4 py-3 border text-left transition-all duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ww-gold)]",
                  isActive
                    ? "border-[color:var(--ww-gold)] bg-[color:var(--ww-gold)]/8"
                    : "border-[color:var(--ww-border)] hover:border-[color:var(--ww-gold)]/60",
                )}
              >
                {/* Radio dot */}
                <span
                  className={cn(
                    "mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors",
                    isActive
                      ? "border-[color:var(--ww-gold)] bg-[color:var(--ww-gold)]"
                      : "border-[color:var(--ww-border)]",
                  )}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--ww-bg)]" />
                  )}
                </span>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isActive
                        ? "text-[color:var(--ww-gold)]"
                        : "text-[color:var(--ww-text)]",
                    )}
                  >
                    {m.label}
                  </p>
                  <p className="text-xs text-[color:var(--ww-muted)] mt-0.5 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wall preview */}
      <div className="space-y-2">
        <Label>Wall Preview</Label>
        <WallPreview
          src={print.src}
          aspectRatio={print.aspectRatio}
          sizeId={selectedSizeId}
        />
        <p
          className="text-[10px] text-[color:var(--ww-muted)] text-center"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Approximate representation — actual proportions may vary by room
        </p>
      </div>

      {/* Add to cart / WhatsApp CTA */}
      {isLargeFormat ? (
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Sudiip, I'm interested in a Statement (48×32") print of "${print.title}". Could you help with pricing and shipping?`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-4 font-medium text-sm transition-colors"
          style={{
            background: "#25D366",
            color: "white",
            borderRadius: "2px",
          }}
        >
          <MessageCircle size={18} />
          Enquire on WhatsApp for Statement Size
        </a>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={soldOut}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-4 font-medium text-sm transition-all duration-200",
            added
              ? "bg-emerald-600 text-white"
              : soldOut
                ? "bg-[color:var(--ww-border)] text-[color:var(--ww-muted)] cursor-not-allowed"
                : "btn-gold hover:scale-[1.01]",
          )}
        >
          {added ? (
            <>
              <Check size={18} />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              {soldOut ? "Sold Out" : "Add to Cart"}
            </>
          )}
        </button>
      )}

      {/* COA preview — only for limited editions */}
      {print.edition.type === "limited" && print.edition.total && (
        <div className="space-y-2">
          <Label>Included Certificate of Authenticity</Label>
          <CertificatePreview
            title={print.title}
            editionNumber={
              print.edition.sold !== undefined
                ? print.edition.sold + 1
                : undefined
            }
            editionTotal={print.edition.total}
            medium={medium.label}
            size={`${selectedSize.label} (${selectedSize.inches})`}
          />
        </div>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] uppercase tracking-[0.15em] text-[color:var(--ww-muted)] font-medium"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </p>
  );
}
