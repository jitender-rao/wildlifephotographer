"use client";

import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  location: string;
  experience: string;
  quote: string;
  rating: number;
  since?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Kiyan Mugaseth",
    location: "Mumbai",
    experience: "Ranthambore Tiger Safari",
    quote:
      "Every expedition Sudiip leads is carefully curated to ensure the best possible encounters. I've tracked tigers, learned light, and come back a completely different photographer than when I left.",
    rating: 5,
    since: "2020",
  },
  {
    name: "Anushree Shetty",
    location: "Bangalore",
    experience: "Ranthambore Tiger Safari",
    quote:
      "Tracking Junabai and her cubs through the golden morning light of Ranthambore — I never imagined I'd witness something so raw. Sudiip's patience and knowledge made every minute count.",
    rating: 5,
  },
  {
    name: "Manish Rao",
    location: "Pune",
    experience: "Photography Workshop",
    quote:
      "I joined with zero camera experience four years ago. Sudiip transformed me from a complete beginner to a confident wildlife photographer. The post-trip feedback sessions alone are worth the price.",
    rating: 5,
    since: "2021",
  },
  {
    name: "Apurva Niphadkar",
    location: "Hyderabad",
    experience: "Sattal Bird Photography",
    quote:
      "These expeditions made me fall in love with seeing life differently. The way Sudiip teaches you to observe — not just photograph — changes how you experience the natural world forever.",
    rating: 5,
  },
  {
    name: "Rameez Mohd",
    location: "Dubai (NRI)",
    experience: "Kanha Tiger Reserve",
    quote:
      "What started as a single Kanha expedition in 2018 has turned into an annual pilgrimage. I fly in from Dubai every year. No other wildlife experience comes close — the access, the expertise, the fellowship.",
    rating: 5,
    since: "2018",
  },
  {
    name: "Amrita Shetty",
    location: "Chennai",
    experience: "Multiple Expeditions",
    quote:
      "Five years of expeditions and every trip still manages to fill my soul completely. The precision of planning, the intimacy of small groups, the sheer quality of sightings — it's unmatched.",
    rating: 5,
    since: "2019",
  },
  {
    name: "Gaurav Chand",
    location: "Delhi",
    experience: "Photography Workshop",
    quote:
      "Every expedition has been a masterclass in photography. Sudiip doesn't just show you wildlife — he shows you how to read light, anticipate behaviour, and tell a story through your lens.",
    rating: 5,
    since: "2023",
  },
  {
    name: "Soumya Majumdar",
    location: "Kolkata",
    experience: "Bespoke Family Trip",
    quote:
      "Sudiip curated a bespoke trip for my family that I couldn't have imagined on my own. I moved from simply clicking pictures to genuinely understanding light and composition. My family is still talking about it.",
    rating: 5,
  },
  {
    name: "Shibit Nair",
    location: "Kochi",
    experience: "Multiple Expeditions",
    quote:
      "I've found a second home with this community. The learning never stops, the camaraderie is real, and the wildlife encounters are extraordinary. Sudiip makes you feel like a naturalist, not a tourist.",
    rating: 5,
    since: "2022",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-[color:var(--ww-gold)]" : "text-[color:var(--ww-border)]"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="relative flex flex-col gap-4 p-6 rounded-lg border border-[color:var(--ww-border)] bg-[color:var(--ww-surface)] break-inside-avoid mb-5"
    >
      {/* Large decorative quote mark */}
      <span
        className="absolute top-4 right-5 text-6xl leading-none text-[color:var(--ww-gold)]/15 select-none pointer-events-none"
        style={{ fontFamily: "var(--font-playfair)" }}
        aria-hidden
      >
        &ldquo;
      </span>

      <StarRating rating={testimonial.rating} />

      <p className="text-[color:var(--ww-text)]/85 text-sm leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="h-px bg-gradient-to-r from-[color:var(--ww-gold)]/30 to-transparent" />

      <div className="flex items-start justify-between gap-2">
        <div>
          <p
            className="font-semibold text-[color:var(--ww-text)] text-sm"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {testimonial.name}
          </p>
          <p
            className="text-[color:var(--ww-muted)] text-[10px] uppercase tracking-widest mt-0.5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {testimonial.location}
            {testimonial.since && (
              <span className="text-[color:var(--ww-gold)]/70">
                {" · "}Since {testimonial.since}
              </span>
            )}
          </p>
        </div>
        <span className="shrink-0 text-[9px] uppercase tracking-wider text-[color:var(--ww-gold)] border border-[color:var(--ww-gold)]/30 rounded px-2 py-1 mt-0.5">
          {testimonial.experience}
        </span>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-[color:var(--ww-bg)] border-t border-[color:var(--ww-border)]">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-caption text-[color:var(--ww-gold)] mb-3">
            From the Field
          </p>
          <h2
            className="heading-section text-[color:var(--ww-text)] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Stories from fellow wanderers
          </h2>
          <p className="text-[color:var(--ww-muted)] mt-4 max-w-md mx-auto text-sm">
            Photographers, nature lovers, and first-timers — united by a shared
            encounter with India&apos;s wild.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { value: "500+", label: "Photographers mentored" },
            { value: "8+", label: "Years of expeditions" },
            { value: "15+", label: "Tiger reserves visited" },
            { value: "5★", label: "Average rating" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span
                className="text-2xl font-bold text-[color:var(--ww-gold)]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-[10px] uppercase tracking-widest text-[color:var(--ww-muted)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
