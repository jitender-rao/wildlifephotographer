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
      className="flex flex-wrap gap-x-6 gap-y-2"
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
              "text-sm pb-1.5 transition-all duration-200 focus-visible:outline-none",
              "border-b-2",
              isActive
                ? "text-[color:var(--ww-text)] border-[color:var(--ww-gold)] font-medium"
                : "text-[color:var(--ww-muted)] border-transparent hover:text-[color:var(--ww-text)] hover:border-[color:var(--ww-border)]",
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
