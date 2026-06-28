"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarClientProps {
  navLinks: NavLink[];
  children: React.ReactNode;
}

export default function NavbarClient({
  navLinks,
  children,
}: NavbarClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    useUIStore.getState().closeMobileMenu();
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-[color:var(--ww-bg)]/85 border-b border-[color:var(--ww-border)]"
            : "bg-transparent",
        )}
      >
        <nav className="container-wide flex items-center justify-between h-16 md:h-20">
          {/* Logo (server-rendered, passed as children) */}
          {children}

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm tracking-wide transition-colors hover:text-[color:var(--ww-gold)]",
                    isActive(link.href)
                      ? "text-[color:var(--ww-gold)]"
                      : "text-[color:var(--ww-text)]/80",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-[color:var(--ww-text)]/80 hover:text-[color:var(--ww-gold)] transition-colors"
              aria-label={`Cart (${itemCount} items)`}
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[color:var(--ww-gold)] text-[color:var(--background)] text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-[color:var(--ww-text)]/80 hover:text-[color:var(--ww-gold)] transition-colors"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[color:var(--ww-bg)]/95 backdrop-blur-md"
            onClick={toggleMobileMenu}
          />
          {/* Menu panel */}
          <nav className="absolute inset-x-0 top-16 p-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-2xl font-display font-semibold py-3 border-b border-[color:var(--ww-border)] transition-colors",
                  isActive(link.href)
                    ? "text-[color:var(--ww-gold)]"
                    : "text-[color:var(--ww-text)]",
                )}
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6">
              <Link
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 text-sm"
              >
                WhatsApp Sudiip
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
