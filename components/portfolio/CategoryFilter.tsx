"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/placeholder-photos";
import type { PhotoCategory } from "@/types/portfolio";

export function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = (searchParams.get("category") ?? "all") as
    PhotoCategory | "all";

  function select(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter by category"
    >
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.value;
        return (
          <button
            key={cat.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => select(cat.value)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ww-gold)]",
              isActive
                ? "bg-[color:var(--ww-gold)] border-[color:var(--ww-gold)] text-[color:var(--ww-bg)]"
                : "border-[color:var(--ww-border)] text-[color:var(--ww-muted)] hover:border-[color:var(--ww-gold)] hover:text-[color:var(--ww-gold)]",
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
