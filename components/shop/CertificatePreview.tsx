interface CertificatePreviewProps {
  title: string;
  editionNumber?: number;
  editionTotal?: number;
  medium: string;
  size: string;
}

export function CertificatePreview({
  title,
  editionNumber,
  editionTotal,
  medium,
  size,
}: CertificatePreviewProps) {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="relative border border-[color:var(--ww-border)] p-6 overflow-hidden"
      style={{ background: "var(--ww-surface)" }}
    >
      {/* Corner ornaments */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[color:var(--ww-gold)]/40" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[color:var(--ww-gold)]/40" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[color:var(--ww-gold)]/40" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[color:var(--ww-gold)]/40" />

      <div className="text-center space-y-3">
        <p
          className="text-[9px] uppercase tracking-[0.3em] text-[color:var(--ww-gold)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Certificate of Authenticity
        </p>

        <h4
          className="text-[color:var(--ww-text)] font-semibold text-base leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h4>

        <div className="h-px bg-gradient-to-r from-transparent via-[color:var(--ww-gold)]/40 to-transparent" />

        <div
          className="text-[10px] space-y-1.5 text-[color:var(--ww-muted)]"
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}
        >
          {editionNumber && editionTotal ? (
            <p>
              Edition{" "}
              <span className="text-[color:var(--ww-text)] font-semibold">
                {editionNumber} / {editionTotal}
              </span>
            </p>
          ) : (
            <p>Open Edition</p>
          )}
          <p>
            {medium} · {size}
          </p>
          <p>{today}</p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[color:var(--ww-border)] to-transparent" />

        {/* Signature placeholder */}
        <div className="flex items-center justify-center gap-4 pt-1">
          <div className="text-center">
            <div
              className="text-[color:var(--ww-text)] text-xl mb-1"
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
            >
              Sudiip
            </div>
            <p
              className="text-[9px] uppercase tracking-widest text-[color:var(--ww-muted)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Photographer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
