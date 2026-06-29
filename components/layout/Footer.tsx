import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--ww-border)] bg-[color:var(--ww-surface)]">
      <div className="container-wide py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Col 1: Brand */}
          <div>
            <p
              className="text-xl font-bold text-[color:var(--ww-text)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Wild Wanderings
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.18em] mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--ww-gold)",
              }}
            >
              by Sudiip
            </p>
            <p className="text-sm text-[color:var(--ww-muted)] leading-relaxed max-w-[240px]">
              Wildlife photography, fine art prints, and guided expeditions from
              India&apos;s wild heart.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/wild_wanderings_sudiip"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[color:var(--ww-muted)] hover:text-[color:var(--ww-gold)] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  width={18}
                  height={18}
                  aria-hidden
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919000000000"}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-[color:var(--ww-muted)] hover:text-[color:var(--ww-gold)] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width={18}
                  height={18}
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h3 className="text-eyebrow text-[color:var(--ww-muted)] mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/portfolio", label: "Portfolio" },
                { href: "/shop", label: "Shop Prints" },
                { href: "/about", label: "About Sudiip" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[color:var(--ww-text)]/70 hover:text-[color:var(--ww-gold)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h3 className="text-eyebrow text-[color:var(--ww-muted)] mb-5">
              Get in Touch
            </h3>
            <div className="space-y-2 text-sm text-[color:var(--ww-muted)]">
              <p>Enquiries &amp; Bookings</p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919000000000"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[color:var(--ww-gold)] hover:underline"
              >
                WhatsApp Sudiip →
              </a>
              <p className="pt-3">Follow on Instagram</p>
              <a
                href="https://instagram.com/wild_wanderings_sudiip"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[color:var(--ww-gold)] hover:underline"
              >
                @wild_wanderings_sudiip →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[color:var(--ww-border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[color:var(--ww-muted)]">
            © {new Date().getFullYear()} Wild Wanderings by Sudiip. All rights
            reserved.
          </p>
          <div className="flex gap-4 text-xs text-[color:var(--ww-muted)]">
            <Link
              href="/privacy"
              className="hover:text-[color:var(--ww-gold)] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[color:var(--ww-gold)] transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
