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
      className={cn("group block", soldOut && "pointer-events-none opacity-60")}
    >
      <article>
        {/* Image */}
        <div
          className="relative overflow-hidden rounded-lg bg-[color:var(--ww-surface)] mb-4"
          style={{ paddingBottom: `${print.aspectRatio * 100}%` }}
        >
          <Image
            src={print.src}
            alt={print.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Edition badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {print.edition.type === "limited" && (
              <span
                className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-medium"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(0,0,0,0.65)",
                  color: "var(--ww-gold)",
                  border: "1px solid var(--ww-gold)",
                  backdropFilter: "blur(4px)",
                }}
              >
                Limited Edition
              </span>
            )}
            {soldOut && (
              <span
                className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-medium"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(0,0,0,0.65)",
                  color: "var(--ww-muted)",
                  backdropFilter: "blur(4px)",
                }}
              >
                Sold Out
              </span>
            )}
            {remaining !== null && remaining > 0 && remaining <= 10 && (
              <span
                className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-medium"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(0,0,0,0.65)",
                  color: "#e07b39",
                  border: "1px solid rgba(224,123,57,0.5)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {remaining} left
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3
            className="text-[color:var(--ww-text)] font-semibold text-base leading-snug group-hover:text-[color:var(--ww-gold)] transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {print.title}
          </h3>
          <p
            className="text-[color:var(--ww-muted)] text-xs uppercase tracking-wide"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {print.location.split(",")[0]}
          </p>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-[color:var(--ww-gold)] font-semibold text-sm">
              from ₹{basePrice.toLocaleString("en-IN")}
            </span>
            {print.edition.type === "limited" && remaining !== null && (
              <span
                className="text-[color:var(--ww-muted)] text-xs"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Ed. {print.edition.total}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
