"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { PLACEHOLDER_PHOTOS } from "@/lib/placeholder-photos";

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

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/92 backdrop-blur-sm"
        onClick={closeLightbox}
      />

      {/* Layout */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row max-w-[1400px] mx-auto p-4 lg:p-10 gap-6 lg:gap-10">
        {/* Image */}
        <div className="relative flex-1 min-h-0 flex items-center justify-center">
          <div className="relative w-full h-full max-h-[72vh] lg:max-h-full">
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

        {/* Sidebar — minimal */}
        <aside className="lg:w-64 xl:w-72 flex-shrink-0 flex flex-col justify-center gap-5 py-2">
          <div>
            <h2
              className="text-white text-xl font-semibold leading-tight mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {photo.title}
            </h2>
            <p
              className="text-white/50 text-[10px] uppercase tracking-widest"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {photo.location}
            </p>
          </div>

          <div className="h-px bg-white/10" />

          {/* Key EXIF only — camera + lens */}
          {(photo.exif?.camera || photo.exif?.lens) && (
            <div className="space-y-1">
              {photo.exif.camera && (
                <p
                  className="text-white/40 text-[10px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {photo.exif.camera}
                </p>
              )}
              {photo.exif.lens && (
                <p
                  className="text-white/40 text-[10px]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {photo.exif.lens}
                </p>
              )}
            </div>
          )}

          {photo.availableAsPrint && (
            <Link
              href={`/shop/${photo.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/30 px-4 py-2.5 hover:bg-white/10 transition-colors"
              style={{ borderRadius: "2px" }}
              onClick={closeLightbox}
            >
              <ShoppingBag size={14} />
              Shop This Print
            </Link>
          )}

          {total > 1 && (
            <p
              className="text-white/30 text-[10px]"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
              }}
            >
              {currentIdx + 1} / {total}
            </p>
          )}
        </aside>
      </div>

      {/* Controls */}
      <button
        onClick={closeLightbox}
        className="absolute top-4 right-4 z-20 p-2 text-white/50 hover:text-white transition-colors"
        aria-label="Close"
      >
        <X size={22} />
      </button>

      {total > 1 && (
        <>
          <button
            onClick={lightboxPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            onClick={lightboxNext}
            className="absolute right-3 lg:right-[calc(272px+2.5rem)] top-1/2 -translate-y-1/2 z-20 p-3 text-white/50 hover:text-white transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight size={26} />
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}
