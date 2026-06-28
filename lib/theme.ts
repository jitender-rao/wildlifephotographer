/*
 * Wild Wanderings — Theme Configuration
 *
 * Single source of truth for theme names, storage keys, and any
 * TypeScript-side theme logic. CSS token values live in:
 *   styles/themes/tokens.css
 *
 * next-themes reads `THEME_STORAGE_KEY` from localStorage and sets
 * the matching class on <html>. Adding a new theme:
 *   1. Add the name to `THEMES` and `Theme`
 *   2. Add a CSS block in styles/themes/tokens.css
 *   3. Add it to ThemeProvider's `themes` array
 */

export const THEME_STORAGE_KEY = "ww-theme" as const;

export const THEMES = {
  dark: "dark",
  light: "light",
  system: "system",
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const DEFAULT_THEME: Theme = THEMES.dark;
