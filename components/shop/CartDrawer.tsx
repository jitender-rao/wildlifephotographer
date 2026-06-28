"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function CartDrawer() {
  const { cartDrawerOpen, closeCartDrawer } = useUIStore();
  const { items, updateQuantity, removeItem, totalINR, totalUSD } =
    useCartStore();

  // Rehydrate cart from localStorage on mount
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  // Keyboard close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCartDrawer();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeCartDrawer]);

  // Body scroll lock
  useEffect(() => {
    if (cartDrawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartDrawerOpen]);

  if (!cartDrawerOpen) return null;

  const total = totalINR();
  const totalUSDVal = totalUSD();

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeCartDrawer}
      />

      {/* Drawer */}
      <aside
        className={cn(
          "absolute right-0 top-0 bottom-0 w-full max-w-md",
          "flex flex-col",
          "border-l border-[color:var(--ww-border)]",
        )}
        style={{ background: "var(--ww-bg)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[color:var(--ww-border)]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[color:var(--ww-gold)]" />
            <h2
              className="text-[color:var(--ww-text)] font-semibold text-base"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your Cart
            </h2>
            {items.length > 0 && (
              <span
                className="text-xs text-[color:var(--ww-muted)] ml-1"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            )}
          </div>
          <button
            onClick={closeCartDrawer}
            className="p-1.5 rounded text-[color:var(--ww-muted)] hover:text-[color:var(--ww-text)] transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <ShoppingBag
                size={40}
                className="text-[color:var(--ww-border)]"
              />
              <div>
                <p className="text-[color:var(--ww-text)] font-medium mb-1">
                  Your cart is empty
                </p>
                <p className="text-[color:var(--ww-muted)] text-sm">
                  Browse the print collection and bring a piece of the wild
                  home.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={closeCartDrawer}
                className="btn-gold text-sm mt-2"
              >
                Shop Prints
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-[color:var(--ww-border)]">
              {items.map((item) => (
                <li key={item.sku} className="flex gap-4 px-6 py-5">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-[color:var(--ww-surface)]">
                    <Image
                      src={item.imageUrl}
                      alt={item.photoTitle}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-[color:var(--ww-text)] text-sm font-medium leading-snug mb-1 truncate"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.photoTitle}
                    </h3>
                    <p
                      className="text-[color:var(--ww-muted)] text-[10px] uppercase tracking-wide mb-3"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {item.sizeLabel} · {item.medium}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Qty stepper */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.sku, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded flex items-center justify-center border border-[color:var(--ww-border)] text-[color:var(--ww-muted)] hover:border-[color:var(--ww-gold)] hover:text-[color:var(--ww-gold)] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          className="text-[color:var(--ww-text)] text-sm w-5 text-center"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.sku, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded flex items-center justify-center border border-[color:var(--ww-border)] text-[color:var(--ww-muted)] hover:border-[color:var(--ww-gold)] hover:text-[color:var(--ww-gold)] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-[color:var(--ww-gold)] text-sm font-semibold">
                          ₹
                          {(item.priceINR * item.quantity).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                        <button
                          onClick={() => removeItem(item.sku)}
                          className="text-[color:var(--ww-muted)] text-[10px] hover:text-red-400 transition-colors mt-0.5"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[color:var(--ww-border)] px-6 py-5 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-[color:var(--ww-muted)] text-sm">
                Subtotal
              </span>
              <div className="text-right">
                <p className="text-[color:var(--ww-text)] font-semibold">
                  ₹{total.toLocaleString("en-IN")}
                </p>
                <p
                  className="text-[color:var(--ww-muted)] text-xs"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  ~${totalUSDVal.toLocaleString("en-US")} USD
                </p>
              </div>
            </div>
            <p
              className="text-[10px] text-[color:var(--ww-muted)] text-center"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Shipping calculated at checkout · Free in India above ₹10,000
            </p>
            <Link
              href="/checkout"
              onClick={closeCartDrawer}
              className="btn-gold w-full flex items-center justify-center gap-2 text-sm"
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/shop"
              onClick={closeCartDrawer}
              className="block text-center text-[color:var(--ww-muted)] text-xs hover:text-[color:var(--ww-gold)] transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
