import Link from "next/link";
import NavbarClient from "./NavbarClient";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/shop", label: "Shop Prints" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <NavbarClient navLinks={navLinks}>
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <span
          className="font-display text-xl font-bold tracking-wide"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Wild Wanderings
        </span>
        <span
          className="text-[10px] hidden sm:block"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--ww-gold)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          by Sudiip
        </span>
      </Link>
    </NavbarClient>
  );
}
