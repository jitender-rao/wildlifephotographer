"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  { value: "print", label: "Print enquiry" },
  { value: "expedition", label: "Wildlife expedition" },
  { value: "workshop", label: "Workshop / mentorship" },
  { value: "collaboration", label: "Collaboration" },
  { value: "other", label: "Other" },
];

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [subject, setSubject] = useState("print");
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setState("success");
      form.reset();
      setSubject("print");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="py-16 text-center">
        <p className="text-eyebrow mb-3">Sent</p>
        <h3
          className="text-xl font-semibold text-[color:var(--ww-text)] mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Message received
        </h3>
        <p className="text-[color:var(--ww-muted)] text-sm">
          Sudiip usually replies within 24 hours. Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Subject tabs */}
      <div>
        <Label>What&apos;s this about?</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {SUBJECTS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSubject(s.value)}
              className={cn(
                "text-xs px-3 py-1.5 border transition-all",
                subject === s.value
                  ? "border-[color:var(--ww-gold)] text-[color:var(--ww-gold)] bg-[color:var(--ww-gold-dim)]"
                  : "border-[color:var(--ww-border)] text-[color:var(--ww-muted)] hover:border-[color:var(--ww-gold)] hover:text-[color:var(--ww-gold)]",
              )}
              style={{
                borderRadius: "2px",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="subject" value={subject} />
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Name"
          name="name"
          type="text"
          placeholder="Your name"
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
        />
      </div>

      {/* Message */}
      <div>
        <Label>Message</Label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell Sudiip what you have in mind…"
          className={cn(
            "w-full mt-2 px-4 py-3 text-sm",
            "bg-[color:var(--ww-surface)] border border-[color:var(--ww-border)]",
            "text-[color:var(--ww-text)] placeholder:text-[color:var(--ww-muted)]",
            "focus:outline-none focus:border-[color:var(--ww-gold)]",
            "resize-none transition-colors",
          )}
          style={{ borderRadius: "2px" }}
        />
      </div>

      {state === "error" && (
        <p
          className="text-red-400 text-xs"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Something went wrong — try WhatsApp instead.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className={cn(
          "btn-gold w-full flex items-center justify-center gap-2",
          state === "submitting" && "opacity-60 cursor-not-allowed",
        )}
      >
        {state === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] uppercase tracking-[0.15em] text-[color:var(--ww-muted)] font-medium"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </p>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full mt-2 px-4 py-3 text-sm",
          "bg-[color:var(--ww-surface)] border border-[color:var(--ww-border)]",
          "text-[color:var(--ww-text)] placeholder:text-[color:var(--ww-muted)]",
          "focus:outline-none focus:border-[color:var(--ww-gold)]",
          "transition-colors",
        )}
        style={{ borderRadius: "2px" }}
      />
    </div>
  );
}
