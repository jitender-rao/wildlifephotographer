"use client";

import Image from "next/image";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";
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
      className="group relative overflow-hidden rounded-lg cursor-pointer bg-[color:var(--ww-surface)]"
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
          className={cn(
            "object-cover transition-transform duration-500 ease-out",
            "group-hover:scale-105",
          )}
          priority={priority}
        />

        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end p-4",
            "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          )}
        >
          <h3
            className="text-white font-semibold text-sm leading-tight line-clamp-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {photo.title}
          </h3>
          <p
            className="text-white/70 text-xs mt-1"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}
          >
            {photo.location.split(",")[0]}
          </p>
          {photo.availableAsPrint && (
            <span
              className="mt-2 inline-block text-[10px] uppercase tracking-widest text-[color:var(--ww-gold)] border border-[color:var(--ww-gold)] rounded-full px-2 py-0.5 w-fit"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Print Available
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
