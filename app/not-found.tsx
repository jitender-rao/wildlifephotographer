import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon | Wild Wanderings by Sudiip",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[color:var(--ww-bg)]">
      <div className="text-center max-w-md">
        {/* Paw / lens icon */}
        <div className="mb-8 flex justify-center">
          <svg
            className="w-16 h-16 text-[color:var(--ww-gold)]/40"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            viewBox="0 0 64 64"
          >
            <circle cx="32" cy="32" r="20" />
            <circle cx="32" cy="32" r="8" />
            <line x1="32" y1="4" x2="32" y2="12" />
            <line x1="32" y1="52" x2="32" y2="60" />
            <line x1="4" y1="32" x2="12" y2="32" />
            <line x1="52" y1="32" x2="60" y2="32" />
          </svg>
        </div>

        <p
          className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--ww-gold)] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Coming Soon
        </p>

        <h1
          className="text-3xl sm:text-4xl font-bold text-[color:var(--ww-text)] mb-4 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          This page is still in the wild
        </h1>

        <p className="text-[color:var(--ww-muted)] text-sm leading-relaxed mb-10">
          We&apos;re working on something worth the wait. Check back soon — or
          explore what&apos;s already live.
        </p>

        <div className="h-px bg-[color:var(--ww-border)] mb-10" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-gold text-sm px-8 py-3">
            Back to Home
          </Link>
          <Link
            href="/portfolio"
            className="text-sm text-[color:var(--ww-muted)] hover:text-[color:var(--ww-gold)] transition-colors"
          >
            Browse Portfolio →
          </Link>
        </div>
      </div>
    </div>
  );
}
