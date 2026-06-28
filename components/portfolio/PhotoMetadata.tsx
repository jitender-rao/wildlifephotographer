import type { PhotoExif } from "@/types/portfolio";

interface PhotoMetadataProps {
  location: string;
  dateCaptured?: string;
  exif?: PhotoExif;
}

export function PhotoMetadata({
  location,
  dateCaptured,
  exif,
}: PhotoMetadataProps) {
  const date = dateCaptured
    ? new Date(dateCaptured).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="space-y-3">
      <div
        className="flex flex-wrap gap-x-6 gap-y-1 text-[color:var(--ww-muted)]"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
        }}
      >
        <span className="uppercase">{location}</span>
        {date && <span>{date}</span>}
      </div>

      {exif && (
        <div
          className="flex flex-wrap gap-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.06em",
          }}
        >
          {exif.camera && <ExifChip label="BODY" value={exif.camera} />}
          {exif.lens && <ExifChip label="LENS" value={exif.lens} />}
          {exif.shutterSpeed && (
            <ExifChip label="SS" value={exif.shutterSpeed} />
          )}
          {exif.aperture && (
            <ExifChip label="f/" value={exif.aperture.replace("f/", "")} />
          )}
          {exif.iso && <ExifChip label="ISO" value={String(exif.iso)} />}
        </div>
      )}
    </div>
  );
}

function ExifChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-[color:var(--ww-gold)] uppercase">{label}</span>
      <span className="text-[color:var(--ww-muted)]">{value}</span>
    </span>
  );
}
