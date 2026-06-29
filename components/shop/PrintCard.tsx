import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PlaceholderPrint } from "@/lib/placeholder-prints";

interface PrintCardProps {
  print: PlaceholderPrint;
}

export function PrintCard({ print }: PrintCardProps) {
  const basePrice = print.sizes[0].priceINR;
  const remaining =
    print.edition.type === "limited" &&
    print.edition.total &&
    print.edition.sold !== undefined
      ? print.edition.total - print.edition.sold
      : null;
  const soldOut = remaining !== null && remaining <= 0;

  return (
    <Link
      href={`/shop/${print.slug}`}
      className={cn("group block", soldOut && "pointer-events-none opacity-50")}
    >
      <article>
        {/* Image */}
        <div
          className="relative overflow-hidden bg-[color:var(--ww-border)] mb-4"
          style={{
            paddingBottom: `${print.aspectRatio * 100}%`,
            borderRadius: "2px",
          }}
        >
          <Image
            src={print.src}
            alt={print.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* Minimal badges — top left, sharp */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {print.edition.type === "limited" && !soldOut && (
              <span
                className="text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(0,0,0,0.7)",
                  color: "var(--ww-gold-light)",
                  borderRadius: "1px",
                }}
              >
                Limited
              </span>
            )}
            {soldOut && (
              <span
                className="text-[9px] uppercase tracking-widest px-2 py-0.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(0,0,0,0.7)",
                  color: "var(--ww-muted)",
                  borderRadius: "1px",
                }}
              >
                Sold Out
              </span>
            )}
            {remaining !== null && remaining > 0 && remaining <= 10 && (
              <span
                className="text-[9px] uppercase tracking-widest px-2 py-0.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(0,0,0,0.7)",
                  color: "#e07b39",
                  borderRadius: "1px",
                }}
              >
                {remaining} left
              </span>
            )}
          </div>
        </div>

        {/* Info — minimal */}
        <h3
          className="text-[color:var(--ww-text)] font-medium text-sm leading-snug mb-1 group-hover:text-[color:var(--ww-gold)] transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {print.title}
        </h3>
        <div className="flex items-center justify-between">
          <p
            className="text-[color:var(--ww-muted)] text-[10px] uppercase tracking-wide"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {print.location.split(",")[0]}
          </p>
          <span className="text-[color:var(--ww-gold)] text-xs font-medium">
            ₹{basePrice.toLocaleString("en-IN")}
          </span>
        </div>
      </article>
    </Link>
  );
}
