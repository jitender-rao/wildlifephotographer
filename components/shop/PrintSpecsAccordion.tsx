"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  title: string;
  content: React.ReactNode;
}

interface PrintSpecsAccordionProps {
  specs: {
    paper?: string;
    ink?: string;
    archivalLife?: string;
  };
  framingAvailable: boolean;
}

export function PrintSpecsAccordion({
  specs,
  framingAvailable,
}: PrintSpecsAccordionProps) {
  const [open, setOpen] = useState<string | null>(null);

  const sections: Section[] = [
    {
      title: "Print Specifications",
      content: (
        <dl className="space-y-2.5 text-sm">
          {specs.paper && <Row label="Paper / Substrate" value={specs.paper} />}
          {specs.ink && <Row label="Ink System" value={specs.ink} />}
          {specs.archivalLife && (
            <Row label="Archival Life" value={specs.archivalLife} />
          )}
          <Row
            label="Colour Profile"
            value="Adobe RGB 1998 — maximum gamut for wide-format printing"
          />
          <Row
            label="Quality Check"
            value="Every print hand-inspected by Sudiip before dispatch"
          />
        </dl>
      ),
    },
    {
      title: "Shipping & Packaging",
      content: (
        <dl className="space-y-2.5 text-sm">
          <Row
            label="Packaging"
            value="Rolled in acid-free tissue inside a double-walled archival tube (prints up to 24×16). Larger sizes flat-packed between rigid foam boards."
          />
          <Row
            label="Domestic (India)"
            value="5–8 business days via BlueDart. Free shipping on orders above ₹10,000."
          />
          <Row
            label="International"
            value="10–18 business days via DHL Express. Customs & duties borne by recipient."
          />
          <Row
            label="Tracking"
            value="Full tracking number provided by email within 24 hrs of dispatch."
          />
        </dl>
      ),
    },
    {
      title: "Framing & Hanging",
      content: (
        <div className="space-y-3 text-sm text-[color:var(--ww-muted)]">
          {framingAvailable ? (
            <>
              <p>
                Optional solid wood frames available in Black, White, and
                Natural Oak — selected at checkout. Glazed with UV-protective
                acrylic (not glass) for lightweight hanging.
              </p>
              <p>
                Canvas wraps arrive gallery-ready — just hang. All other sizes
                come with a hanging guide and recommended frame sources if you
                prefer to frame locally.
              </p>
            </>
          ) : (
            <p>
              This print ships unframed. We recommend a standard {"{"}size{"}"}{" "}
              frame with UV-protective glass or acrylic for the best archival
              results.
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Returns & Guarantee",
      content: (
        <div className="space-y-3 text-sm text-[color:var(--ww-muted)]">
          <p>
            Every print is made to order and hand-inspected. If your print
            arrives damaged or defective, contact us within 7 days with
            photographs of the damage and we will reprint at no cost.
          </p>
          <p>
            Because each print is produced specifically for you, we do not
            accept returns for change of mind. We encourage you to review your
            size and medium selection carefully before ordering — our team is
            happy to advise via WhatsApp.
          </p>
        </div>
      ),
    },
    {
      title: "Certificate of Authenticity",
      content: (
        <div className="space-y-3 text-sm text-[color:var(--ww-muted)]">
          <p>
            Every limited edition print ships with a signed Certificate of
            Authenticity printed on archival paper, stating the edition number
            (e.g. 17/50), print title, date, medium, and Sudiip&apos;s original
            signature.
          </p>
          <p>
            Open edition prints include a printed label on the reverse with the
            title, date, medium, and photographer&apos;s stamp.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="divide-y divide-[color:var(--ww-border)] border-t border-[color:var(--ww-border)]">
      {sections.map((s) => {
        const isOpen = open === s.title;
        return (
          <div key={s.title}>
            <button
              className="w-full flex items-center justify-between py-4 text-left gap-4"
              onClick={() => setOpen(isOpen ? null : s.title)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-[color:var(--ww-text)]">
                {s.title}
              </span>
              <ChevronDown
                size={16}
                className={cn(
                  "flex-shrink-0 text-[color:var(--ww-muted)] transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen && (
              <div className="pb-5 text-[color:var(--ww-muted)]">
                {s.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[140px,1fr] gap-3">
      <dt
        className="text-[color:var(--ww-gold)] uppercase text-[10px] tracking-widest pt-0.5 leading-relaxed"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </dt>
      <dd className="text-[color:var(--ww-muted)] leading-relaxed">{value}</dd>
    </div>
  );
}
