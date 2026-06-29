import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { PLACEHOLDER_PRINTS } from "@/lib/placeholder-prints";
import { ProductSelector } from "@/components/shop/ProductSelector";
import { PrintSpecsAccordion } from "@/components/shop/PrintSpecsAccordion";
import { PrintCard } from "@/components/shop/PrintCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PLACEHOLDER_PRINTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const print = PLACEHOLDER_PRINTS.find((p) => p.slug === slug);
  if (!print) return {};
  return {
    title: `${print.title} — Shop Prints | Wild Wanderings by Sudiip`,
    description: print.description.slice(0, 155),
  };
}

export default async function PrintDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const print = PLACEHOLDER_PRINTS.find((p) => p.slug === slug);
  if (!print) notFound();

  const related = PLACEHOLDER_PRINTS.filter(
    (p) => p.id !== print.id && p.category === print.category,
  ).slice(0, 3);

  const remaining =
    print.edition.type === "limited" &&
    print.edition.total &&
    print.edition.sold !== undefined
      ? print.edition.total - print.edition.sold
      : null;

  return (
    <main className="min-h-screen bg-[color:var(--ww-bg)] pt-24 pb-24">
      {/* Breadcrumb */}
      <div className="container-wide mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-[color:var(--ww-muted)] text-xs hover:text-[color:var(--ww-gold)] transition-colors"
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
        >
          <ArrowLeft size={12} />
          Shop Prints
        </Link>
      </div>

      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">
          {/* Left — hero image */}
          <div className="space-y-5">
            <div
              className="relative w-full overflow-hidden bg-[color:var(--ww-border)]"
              style={{
                paddingBottom: `${print.aspectRatio * 100}%`,
                borderRadius: "2px",
              }}
            >
              <Image
                src={print.src}
                alt={print.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Edition progress — only for limited */}
            {print.edition.type === "limited" &&
              print.edition.total &&
              print.edition.sold !== undefined &&
              remaining !== null && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p
                      className="text-[10px] uppercase tracking-widest text-[color:var(--ww-muted)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Edition
                    </p>
                    <p
                      className="text-[10px] text-[color:var(--ww-muted)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {print.edition.sold}/{print.edition.total} sold
                    </p>
                  </div>
                  <div className="h-px bg-[color:var(--ww-border)] overflow-hidden relative">
                    <div
                      className="absolute inset-y-0 left-0 bg-[color:var(--ww-gold)]"
                      style={{
                        width: `${(print.edition.sold / print.edition.total) * 100}%`,
                      }}
                    />
                  </div>
                  <p
                    className={`text-[10px] ${remaining <= 5 ? "text-orange-400" : "text-[color:var(--ww-muted)]"}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {remaining} prints remaining
                  </p>
                </div>
              )}
          </div>

          {/* Right — purchase panel */}
          <div className="space-y-8">
            <div>
              <p className="text-eyebrow mb-3">{print.category}</p>
              <h1
                className="text-3xl md:text-4xl font-semibold text-[color:var(--ww-text)] leading-tight mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {print.title}
              </h1>
              <p
                className="text-[color:var(--ww-muted)] text-[10px] uppercase tracking-wider mb-5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {print.location}
              </p>
              <p className="text-[color:var(--ww-muted)] text-sm leading-relaxed">
                {print.description}
              </p>
            </div>

            <div className="h-px bg-[color:var(--ww-border)]" />

            <ProductSelector print={print} />

            <PrintSpecsAccordion
              specs={print.specs}
              framingAvailable={print.framingAvailable}
            />
          </div>
        </div>

        {/* Related prints */}
        {related.length > 0 && (
          <section className="mt-24 pt-12 border-t border-[color:var(--ww-border)]">
            <p className="text-eyebrow mb-6">You Might Also Like</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {related.map((p) => (
                <PrintCard key={p.id} print={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
