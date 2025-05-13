"use client";

import { useEffect, type ReactNode } from "react";

export default function ColorProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Seleccionamos las secciones que tengan data-bg
    const sections = document.querySelectorAll<HTMLElement>("section[data-bg]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Cast a HTMLElement para poder leer dataset
            const el = entry.target as HTMLElement;
            const bg = el.dataset.bg!;
            document.documentElement.style.setProperty("--page-bg", bg);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
