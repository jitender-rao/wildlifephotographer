import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  /** Unique identifier: printId + size + medium */
  sku: string;
  printId: string;
  photoSlug: string;
  photoTitle: string;
  imageUrl: string;
  size: string;
  sizeLabel: string;
  medium: string;
  priceINR: number;
  priceUSD: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, qty: number) => void;
  clearCart: () => void;
  totalINR: () => number;
  totalUSD: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.sku === item.sku);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.sku === item.sku
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (sku) =>
        set((state) => ({ items: state.items.filter((i) => i.sku !== sku) })),

      updateQuantity: (sku, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.sku !== sku)
              : state.items.map((i) =>
                  i.sku === sku ? { ...i, quantity: qty } : i,
                ),
        })),

      clearCart: () => set({ items: [] }),

      totalINR: () =>
        get().items.reduce((sum, i) => sum + i.priceINR * i.quantity, 0),
      totalUSD: () =>
        get().items.reduce((sum, i) => sum + i.priceUSD * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "ww-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
