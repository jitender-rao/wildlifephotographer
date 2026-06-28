"use client";

import dynamic from "next/dynamic";

// Lightbox uses createPortal — must be client-only, no SSR
const Lightbox = dynamic(() => import("./Lightbox").then((m) => m.Lightbox), {
  ssr: false,
});

export function LightboxWrapper() {
  return <Lightbox />;
}
