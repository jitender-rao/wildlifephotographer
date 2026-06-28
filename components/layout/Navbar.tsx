import Link from "next/link";
import NavbarClient from "./NavbarClient";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/shop", label: "Shop Prints" },
  { href: "/tours", label: "Tours" },
  { href: "/workshops", label: "Workshops" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <NavbarClient navLinks={navLinks}>
      {/* Logo — always server-rendered */}
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <span
          className="font-display text-xl font-bold tracking-wide"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Wild Wanderings
        </span>
        <span className="text-caption text-[10px] text-[color:var(--ww-gold)] hidden sm:block">
          by Sudiip
        </span>
      </Link>
    </NavbarClient>
  );
}
