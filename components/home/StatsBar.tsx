"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 30000, suffix: "+", label: "Instagram Followers" },
  { value: 15, suffix: "+", label: "Species Captured" },
  { value: 10, suffix: "+", label: "National Parks" },
  { value: 500, suffix: "+", label: "Prints Delivered" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count >= 1000
        ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 0)}K`
        : count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="border-y border-[color:var(--ww-border)] bg-[color:var(--ww-surface)]">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl md:text-4xl font-bold text-[color:var(--ww-gold)] mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-caption text-[color:var(--ww-muted)] text-[10px] md:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
