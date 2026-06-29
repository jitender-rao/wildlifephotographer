import Link from "next/link";

const footerLinks = {
  Explore: [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/shop", label: "Shop Prints" },
    { href: "/workshops", label: "Workshops" },
  ],
  Info: [
    { href: "/about", label: "About Sudiip" },
    { href: "/licensing", label: "Licensing" },
    { href: "/faq", label: "FAQ" },
  ],
  Connect: [
    { href: "/contact", label: "Contact" },
    {
      href: `https://instagram.com/wild_wanderings_sudiip`,
      label: "Instagram",
      external: true,
    },
    {
      href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "91XXXXXXXXXX"}`,
      label: "WhatsApp",
      external: true,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--ww-border)] bg-[color:var(--ww-bg)]">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <p
              className="font-display text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Wild Wanderings
            </p>
            <p className="text-caption text-[color:var(--ww-gold)] mb-4">
              by Sudiip
            </p>
            <p className="text-sm text-[color:var(--ww-muted)] max-w-xs leading-relaxed">
              From the tiger reserves of Ranthambore to the bird sanctuaries of
              Sattal — bringing India&apos;s wild world to your walls.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com/wild_wanderings_sudiip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--ww-muted)] hover:text-[color:var(--ww-gold)] transition-colors"
                aria-label="Instagram"
              >
                {/* Instagram icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  width={20}
                  height={20}
                  aria-hidden
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-caption text-[color:var(--ww-muted)] mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-[color:var(--ww-text)]/70 hover:text-[color:var(--ww-gold)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[color:var(--ww-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[color:var(--ww-muted)]">
          <p>
            © {new Date().getFullYear()} Wild Wanderings by Sudiip. All rights
            reserved.
          </p>
          <p>
            Fine art prints · Wildlife tours · Photography workshops · India
          </p>
        </div>
      </div>
    </footer>
  );
}
