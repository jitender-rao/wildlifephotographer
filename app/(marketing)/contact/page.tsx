import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Wild Wanderings by Sudiip",
  description:
    "Get in touch with Sudiip for print enquiries, wildlife expedition bookings, workshops, or collaborations.",
};

const channels = [
  {
    label: "WhatsApp",
    value: "+91 98765 43210",
    note: "Fastest response — usually same day",
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
  },
  {
    label: "Instagram",
    value: "@wild_wanderings_sudiip",
    note: "DMs open — 30K+ community",
    href: "https://instagram.com/wild_wanderings_sudiip",
  },
  {
    label: "Based in",
    value: "Bangalore, India",
    note: "Available for expeditions across India",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[color:var(--ww-bg)] pt-28 pb-24">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-14 border-b border-[color:var(--ww-border)] pb-10">
          <p className="text-eyebrow mb-3">Contact</p>
          <h1
            className="heading-section text-[color:var(--ww-text)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&apos;s Talk
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Left — form */}
          <div>
            <p className="text-[color:var(--ww-muted)] text-sm leading-relaxed mb-8">
              Whether you&apos;re after a print for your wall, a spot on an
              expedition, or just want to talk wildlife — fill in the form and
              Sudiip will get back to you personally.
            </p>
            <ContactForm />
          </div>

          {/* Right — direct channels */}
          <div className="lg:pt-2">
            <p className="text-eyebrow mb-6">Prefer Direct?</p>
            <div className="space-y-0">
              {channels.map((c) => (
                <div
                  key={c.label}
                  className="py-6 border-b border-[color:var(--ww-border)]"
                >
                  <p
                    className="text-[color:var(--ww-muted)] text-[10px] uppercase tracking-wider mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {c.label}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--ww-text)] font-medium hover:text-[color:var(--ww-gold)] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p
                      className="text-[color:var(--ww-text)] font-medium"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {c.value}
                    </p>
                  )}
                  <p
                    className="text-[color:var(--ww-muted)] text-xs mt-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {c.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Response time note */}
            <div
              className="mt-10 py-6 px-6"
              style={{
                background: "var(--ww-surface-alt)",
                borderRadius: "2px",
              }}
            >
              <p
                className="text-[color:var(--ww-muted)] text-[10px] uppercase tracking-wider mb-2"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Response time
              </p>
              <p className="text-[color:var(--ww-text)] text-sm leading-relaxed">
                Sudiip is often in the field — expect replies within 24 hours,
                sometimes sooner. WhatsApp is fastest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
