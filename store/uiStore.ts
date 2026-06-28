import { create } from "zustand";

interface UIStore {
  // Lightbox
  lightboxOpen: boolean;
  lightboxPhotoId: string | null;
  lightboxPhotos: string[]; // ordered list of photo IDs for navigation
  openLightbox: (photoId: string, photos?: string[]) => void;
  closeLightbox: () => void;
  lightboxNext: () => void;
  lightboxPrev: () => void;

  // Cart drawer
  cartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  // Lightbox
  lightboxOpen: false,
  lightboxPhotoId: null,
  lightboxPhotos: [],

  openLightbox: (photoId, photos = []) =>
    set({
      lightboxOpen: true,
      lightboxPhotoId: photoId,
      lightboxPhotos: photos,
    }),

  closeLightbox: () =>
    set({ lightboxOpen: false, lightboxPhotoId: null, lightboxPhotos: [] }),

  lightboxNext: () => {
    const { lightboxPhotoId, lightboxPhotos } = get();
    if (!lightboxPhotoId || lightboxPhotos.length === 0) return;
    const idx = lightboxPhotos.indexOf(lightboxPhotoId);
    const next = lightboxPhotos[(idx + 1) % lightboxPhotos.length];
    set({ lightboxPhotoId: next });
  },

  lightboxPrev: () => {
    const { lightboxPhotoId, lightboxPhotos } = get();
    if (!lightboxPhotoId || lightboxPhotos.length === 0) return;
    const idx = lightboxPhotos.indexOf(lightboxPhotoId);
    const prev =
      lightboxPhotos[(idx - 1 + lightboxPhotos.length) % lightboxPhotos.length];
    set({ lightboxPhotoId: prev });
  },

  // Cart drawer
  cartDrawerOpen: false,
  openCartDrawer: () => set({ cartDrawerOpen: true }),
  closeCartDrawer: () => set({ cartDrawerOpen: false }),
  toggleCartDrawer: () => set((s) => ({ cartDrawerOpen: !s.cartDrawerOpen })),

  // Mobile menu
  mobileMenuOpen: false,
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));
