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
    <main className="min-h-screen bg-[color:var(--ww-bg)] pt-20 pb-20">
      {/* Breadcrumb */}
      <div className="container-wide mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-[color:var(--ww-muted)] text-sm hover:text-[color:var(--ww-gold)] transition-colors"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <ArrowLeft size={14} />
          Back to Shop
        </Link>
      </div>

      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* Left — hero image */}
          <div className="space-y-4">
            <div
              className="relative w-full overflow-hidden rounded-xl bg-[color:var(--ww-surface)]"
              style={{ paddingBottom: `${print.aspectRatio * 100}%` }}
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
            {/* Edition meter */}
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
                      Edition Progress
                    </p>
                    <p
                      className="text-[10px] text-[color:var(--ww-muted)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {print.edition.sold} / {print.edition.total} sold
                    </p>
                  </div>
                  <div className="h-1 rounded-full bg-[color:var(--ww-border)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[color:var(--ww-gold)] transition-all"
                      style={{
                        width: `${(print.edition.sold / print.edition.total) * 100}%`,
                      }}
                    />
                  </div>
                  <p
                    className={`text-xs ${remaining <= 5 ? "text-orange-400" : "text-[color:var(--ww-muted)]"}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {remaining} of {print.edition.total} prints remaining
                  </p>
                </div>
              )}
          </div>

          {/* Right — selector */}
          <div className="space-y-8">
            {/* Title block */}
            <div>
              <p className="text-caption text-[color:var(--ww-gold)] mb-2">
                {print.category.toUpperCase()}
              </p>
              <h1
                className="text-3xl md:text-4xl font-bold text-[color:var(--ww-text)] leading-tight mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {print.title}
              </h1>
              <p
                className="text-[color:var(--ww-muted)] text-xs uppercase tracking-wide mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {print.location}
              </p>
              <p className="text-[color:var(--ww-muted)] text-sm leading-relaxed">
                {print.description}
              </p>
            </div>

            <ProductSelector print={print} />

            <PrintSpecsAccordion
              specs={print.specs}
              framingAvailable={print.framingAvailable}
            />
          </div>
        </div>

        {/* Related prints */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2
              className="text-[color:var(--ww-text)] text-xl font-semibold mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
