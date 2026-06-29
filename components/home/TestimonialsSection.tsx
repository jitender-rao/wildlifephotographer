"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Tracking tigers with Sudiip changed how I see photography entirely. Every frame felt intentional, every morning felt earned.",
    name: "Kiyan Mugaseth",
    location: "Mumbai · Ranthambore Safari",
  },
  {
    quote:
      "I joined with zero experience four years ago. Today I shoot for wildlife magazines. Sudiip's mentorship is unlike anything else.",
    name: "Manish Rao",
    location: "Pune · Photography Workshop",
  },
  {
    quote:
      "What started as a single Kanha expedition in 2018 has become an annual pilgrimage. I fly in from Dubai every year without exception.",
    name: "Rameez Mohd",
    location: "Dubai · Kanha Tiger Reserve",
  },
  {
    quote:
      "Five years of expeditions and every trip still fills my soul. The sightings, the fellowship, the precision — unmatched.",
    name: "Amrita Shetty",
    location: "Chennai · Multiple Expeditions",
  },
  {
    quote:
      "Sudiip doesn't just show you wildlife. He teaches you how to read light, anticipate behaviour, and tell a story.",
    name: "Gaurav Chand",
    location: "Delhi · Photography Workshop",
  },
  {
    quote:
      "I've found a second home with this community. The learning never stops and the wildlife encounters are extraordinary.",
    name: "Shibit Nair",
    location: "Kochi · Multiple Expeditions",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section className="section-padding bg-[color:var(--ww-bg)] border-t border-[color:var(--ww-border)]">
      <div className="container-narrow text-center">
        <p className="text-eyebrow mb-10">From the Field</p>

        {/* Single quote card */}
        <div className="relative min-h-[180px] flex flex-col items-center justify-center">
          <span
            className="text-7xl leading-none text-[color:var(--ww-gold)]/20 mb-2 block select-none"
            style={{ fontFamily: "var(--font-display)" }}
            aria-hidden
          >
            &ldquo;
          </span>
          <blockquote
            className="text-lg md:text-xl text-[color:var(--ww-text)] leading-relaxed max-w-2xl mx-auto font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.quote}
          </blockquote>
          <footer className="mt-6">
            <p className="font-semibold text-[color:var(--ww-text)] text-sm">
              {t.name}
            </p>
            <p className="text-eyebrow text-[color:var(--ww-muted)] mt-1">
              {t.location}
            </p>
          </footer>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="p-2 text-[color:var(--ww-muted)] hover:text-[color:var(--ww-gold)] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                style={{
                  backgroundColor:
                    i === current ? "var(--ww-gold)" : "var(--ww-border)",
                  transform: i === current ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="p-2 text-[color:var(--ww-muted)] hover:text-[color:var(--ww-gold)] transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
