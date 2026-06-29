import Image from "next/image";
import Link from "next/link";

const STATS = [
  { value: "30K+", label: "Instagram followers" },
  { value: "15+", label: "Species documented" },
  { value: "10+", label: "Years in the field" },
];

export default function AboutSplit() {
  return (
    <section className="section-padding bg-[color:var(--ww-bg)]">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1549366021-9f761d450615?w=900&q=85"
              alt="Sudiip photographing in the wild"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-eyebrow mb-4">About Sudiip</p>
              <h2
                className="heading-section text-[color:var(--ww-text)] mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Where the forest
                <br />
                becomes classroom
              </h2>
              <p className="text-[color:var(--ww-muted)] text-base leading-relaxed max-w-md">
                Sudiip has spent over a decade documenting India&apos;s most
                elusive wildlife — from the tigers of Ranthambore to the snow
                leopards of Spiti. His expeditions transform participants from
                observers into storytellers.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-10 border-t border-[color:var(--ww-border)] pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p
                    className="text-3xl font-bold text-[color:var(--ww-text)] mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-eyebrow text-[color:var(--ww-muted)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-outline-gold self-start">
              About Sudiip
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
