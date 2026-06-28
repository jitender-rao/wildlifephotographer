"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

// Room scene dimensions (px at display size)
const ROOM_W = 800;
const ROOM_H = 500;

// Where the "wall space" is within the room image (approximate, tweak per image)
const WALL = { x: 0.18, y: 0.08, w: 0.64, h: 0.68 }; // fractions of room

// Map size id → fraction of wall width the print occupies
const SIZE_WALL_FRACTION: Record<string, number> = {
  sm: 0.22,
  md: 0.33,
  lg: 0.46,
  xl: 0.62,
  xxl: 0.82,
};

interface WallPreviewProps {
  src: string;
  aspectRatio: number; // height / width
  sizeId: string;
  className?: string;
}

export function WallPreview({
  src,
  aspectRatio,
  sizeId,
  className,
}: WallPreviewProps) {
  const wallFrac = SIZE_WALL_FRACTION[sizeId] ?? 0.4;

  const wallPxW = ROOM_W * WALL.w;
  const wallPxH = ROOM_H * WALL.h;

  const printW = wallPxW * wallFrac;
  const printH = printW * aspectRatio;

  // Centre the print within the wall zone
  const printLeft = ROOM_W * WALL.x + (wallPxW - printW) / 2;
  const printTop = ROOM_H * WALL.y + (wallPxH - printH) / 2;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg bg-[color:var(--ww-surface)]",
        className,
      )}
      style={{ paddingBottom: `${(ROOM_H / ROOM_W) * 100}%` }}
    >
      {/* Room background — neutral gallery wall scene */}
      <Image
        src="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=1200&q=80"
        alt="Room preview"
        fill
        className="object-cover"
        priority
      />

      {/* Print overlay — positioned within the wall */}
      <div
        className="absolute shadow-2xl"
        style={{
          left: `${(printLeft / ROOM_W) * 100}%`,
          top: `${(printTop / ROOM_H) * 100}%`,
          width: `${(printW / ROOM_W) * 100}%`,
          height: `${(printH / ROOM_H) * 100}%`,
        }}
      >
        <Image
          src={src}
          alt="Print preview"
          fill
          className="object-cover"
          sizes="400px"
        />
        {/* Thin white border to simulate mount/frame */}
        <div className="absolute inset-0 ring-[3px] ring-white/90 ring-inset" />
        <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]" />
      </div>

      {/* Label */}
      <div
        className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest px-2 py-1 rounded"
        style={{
          fontFamily: "var(--font-mono)",
          background: "rgba(0,0,0,0.5)",
          color: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(4px)",
        }}
      >
        Wall Preview
      </div>
    </div>
  );
}
