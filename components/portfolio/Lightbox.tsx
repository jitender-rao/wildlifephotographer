"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { PLACEHOLDER_PHOTOS } from "@/lib/placeholder-photos";
import { PhotoMetadata } from "./PhotoMetadata";
import { cn } from "@/lib/utils";

export function Lightbox() {
  const {
    lightboxOpen,
    lightboxPhotoId,
    closeLightbox,
    lightboxNext,
    lightboxPrev,
    lightboxPhotos,
  } = useUIStore();

  const photo =
    PLACEHOLDER_PHOTOS.find((p) => p.id === lightboxPhotoId) ?? null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "ArrowLeft") lightboxPrev();
    },
    [lightboxOpen, closeLightbox, lightboxNext, lightboxPrev],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Body scroll lock
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  if (!lightboxOpen || !photo) return null;

  const currentIdx = lightboxPhotos.indexOf(photo.id);
  const total = lightboxPhotos.length;
  const hasPrev = total > 1;
  const hasNext = total > 1;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={closeLightbox}
      />

      {/* Panel */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row max-w-[1400px] mx-auto p-4 lg:p-8 gap-4 lg:gap-8">
        {/* Image area */}
        <div className="relative flex-1 min-h-0 flex items-center justify-center">
          <div className="relative w-full h-full max-h-[70vh] lg:max-h-full">
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 75vw"
              priority
            />
          </div>
        </div>

        {/* Sidebar metadata */}
        <aside className="lg:w-72 xl:w-80 flex-shrink-0 flex flex-col justify-center gap-6 py-4">
          <div>
            <h2
              className="text-[color:var(--ww-text)] text-2xl font-semibold leading-tight mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {photo.title}
            </h2>
            <PhotoMetadata
              location={photo.location}
              dateCaptured={photo.dateCaptured}
              exif={photo.exif}
            />
          </div>

          {photo.availableAsPrint && (
            <a
              href="/shop"
              className="btn-gold inline-flex items-center gap-2 text-sm w-fit"
              onClick={closeLightbox}
            >
              <ShoppingBag size={16} />
              Shop This Print
            </a>
          )}

          {total > 1 && (
            <p
              className="text-[color:var(--ww-muted)] text-xs"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.06em",
              }}
            >
              {currentIdx + 1} / {total}
            </p>
          )}
        </aside>
      </div>

      {/* Close */}
      <button
        onClick={closeLightbox}
        className="absolute top-4 right-4 z-20 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={lightboxPrev}
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 z-20",
            "p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors",
          )}
          aria-label="Previous photo"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={lightboxNext}
          className={cn(
            "absolute right-4 lg:right-[calc(288px+2rem)] top-1/2 -translate-y-1/2 z-20",
            "p-3 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors",
          )}
          aria-label="Next photo"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>,
    document.body,
  );
}
