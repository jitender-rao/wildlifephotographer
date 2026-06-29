"use client";

import Image from "next/image";
import { useUIStore } from "@/store/uiStore";
import type { PlaceholderPhoto } from "@/lib/placeholder-photos";

interface PhotoCardProps {
  photo: PlaceholderPhoto;
  allPhotoIds: string[];
  priority?: boolean;
}

export function PhotoCard({
  photo,
  allPhotoIds,
  priority = false,
}: PhotoCardProps) {
  const openLightbox = useUIStore((s) => s.openLightbox);

  return (
    <article
      className="group relative overflow-hidden cursor-pointer bg-[color:var(--ww-border)]"
      style={{ borderRadius: "2px" }}
      onClick={() => openLightbox(photo.id, allPhotoIds)}
      role="button"
      tabIndex={0}
      aria-label={`View ${photo.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(photo.id, allPhotoIds);
        }
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ paddingBottom: `${photo.aspectRatio * 100}%` }}
      >
        <Image
          src={photo.src}
          alt={photo.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          priority={priority}
        />

        {/* Minimal bottom label — fades in on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        <div className="absolute bottom-0 inset-x-0 px-4 py-3 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p
            className="text-white text-xs font-medium leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {photo.title}
          </p>
          <p
            className="text-white/60 text-[10px] mt-0.5 uppercase tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {photo.location.split(",")[0]}
          </p>
        </div>

        {/* Print available — top right badge, always visible */}
        {photo.availableAsPrint && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span
              className="text-[9px] uppercase tracking-widest bg-[color:var(--ww-gold)] text-white px-2 py-0.5 block"
              style={{ borderRadius: "1px" }}
            >
              Print
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
