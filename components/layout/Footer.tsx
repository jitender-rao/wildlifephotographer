import Link from "next/link";

const footerLinks = {
  Explore: [
    { href: "/portfolio", label: "Portfolio" },
    { href: "/shop", label: "Shop Prints" },
    { href: "/tours", label: "Wildlife Tours" },
    { href: "/workshops", label: "Workshops" },
    { href: "/blog", label: "Field Notes" },
  ],
  Info: [
    { href: "/about", label: "About Sudiip" },
    { href: "/conservation", label: "Conservation" },
    { href: "/licensing", label: "Licensing" },
    { href: "/press", label: "Press" },
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
    <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A]">
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
            <p className="text-caption text-[#C9A84C] mb-4">by Sudiip</p>
            <p className="text-sm text-[#8A8A82] max-w-xs leading-relaxed">
              From the tiger reserves of Ranthambore to the bird sanctuaries of
              Sattal — bringing India&apos;s wild world to your walls.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com/wild_wanderings_sudiip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8A8A82] hover:text-[#C9A84C] transition-colors"
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
              <h3 className="text-caption text-[#8A8A82] mb-4">{heading}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-[#F5F5F0]/70 hover:text-[#C9A84C] transition-colors"
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
        <div className="mt-16 pt-6 border-t border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8A82]">
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
