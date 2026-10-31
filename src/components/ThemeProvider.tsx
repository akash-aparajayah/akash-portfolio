"use client";

import { ThemeProvider as NextThemes } from "next-themes";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes attribute="data-theme" defaultTheme="dark" enableSystem>
      {children}
    </NextThemes>
  );
}
