"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
});
type FormData = z.infer<typeof schema>;

export default function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Subscription failed");
      setSubmitted(true);
      toast.success("You're in! Check your inbox for a confirmation.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="section-padding bg-[color:var(--ww-surface)] border-t border-[color:var(--ww-border)]">
      <div className="container-narrow text-center">
        <p className="text-caption text-[color:var(--ww-gold)] mb-3">
          Field Notes
        </p>
        <h2
          className="heading-section text-[color:var(--ww-text)] mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Get stories from the jungle
        </h2>
        <p className="text-[color:var(--ww-muted)] mb-10 max-w-md mx-auto">
          Tiger sightings, trip reports, and photography tips — straight from
          the field. No spam, ever.
        </p>

        {submitted ? (
          <p
            className="text-[color:var(--ww-gold)] text-lg font-medium"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Welcome to the wild! 🐾 Check your inbox.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1">
              <input
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                className="w-full px-4 py-3 bg-[color:var(--ww-bg)] border border-[color:var(--ww-border)] rounded text-[color:var(--ww-text)] placeholder:text-[color:var(--ww-muted)] text-sm focus:outline-none focus:border-[color:var(--ww-gold)] transition-colors"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 text-left">
                  {errors.email.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold text-sm px-6 py-3 flex items-center gap-2 whitespace-nowrap"
            >
              {isSubmitting && <Loader2 size={14} className="animate-spin" />}
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
