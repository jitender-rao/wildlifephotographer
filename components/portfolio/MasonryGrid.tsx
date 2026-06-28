"use client";

import { PhotoCard } from "./PhotoCard";
import type { PlaceholderPhoto } from "@/lib/placeholder-photos";

interface MasonryGridProps {
  photos: PlaceholderPhoto[];
}

export function MasonryGrid({ photos }: MasonryGridProps) {
  const allIds = photos.map((p) => p.id);

  if (photos.length === 0) {
    return (
      <div className="py-24 text-center">
        <p
          className="text-[color:var(--ww-muted)]"
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}
        >
          No photos in this category yet.
        </p>
      </div>
    );
  }

  // Split photos into 3 columns for masonry layout
  const cols: PlaceholderPhoto[][] = [[], [], []];
  photos.forEach((photo, i) => {
    cols[i % 3].push(photo);
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {cols.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-3 md:gap-4">
          {col.map((photo, rowIdx) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              allPhotoIds={allIds}
              priority={colIdx === 0 && rowIdx === 0}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
