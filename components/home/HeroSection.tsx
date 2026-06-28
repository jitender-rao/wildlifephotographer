"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  imageUrl?: string;
}

export default function HeroSection({ imageUrl }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] overflow-hidden flex items-center"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src={
            imageUrl ??
            "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=1920&q=85"
          }
          alt="A tiger in Ranthambore National Park"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUHBAj/xAAlEAACAQMEAgIDAAAAAAAAAAABAgMEBREhBhIxUWGBkaH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AzrTRdq1XbJqKOBJ5VYRhpCPpAGCc+/nv2rn6qtLQ1sFpZyT24jwvnKf1+8kk5AHvgcAcVrTRdqsNq0Cxwl4sgAuWOPJPOSap1LT7S609oFgji2sGQxgDA7xx9qAP/9k="
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/20 to-[#0A0A0A]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 container-wide" style={{ opacity }}>
        <motion.p
          className="text-caption text-[#C9A84C] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Wild Wanderings by Sudiip
        </motion.p>

        <motion.h1
          className="heading-display text-[#F5F5F0] max-w-3xl mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          From Forests
          <br />
          <span className="text-gradient-gold">to Frames</span>
        </motion.h1>

        <motion.p
          className="text-lg text-[#F5F5F0]/70 max-w-xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Award-winning wildlife photography from the tiger reserves and bird
          sanctuaries of India. Fine art prints. Immersive tours. Field
          workshops.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link href="/portfolio" className="btn-gold text-sm px-8 py-3.5">
            Explore Portfolio
          </Link>
          <Link href="/tours" className="btn-outline-gold text-sm px-8 py-3.5">
            Book a Tour
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-caption text-[10px] text-[#8A8A82]">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
