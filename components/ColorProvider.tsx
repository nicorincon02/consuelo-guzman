"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function ColorProvider({ children }: { children: ReactNode }) {
  // Estado para mantener el color actual y el anterior para crear transiciones suaves
  const [currentBg, setCurrentBg] = useState<string | null>(null);
  
  useEffect(() => {
    // Añadir la transición CSS en el root
    document.documentElement.style.transition = "background 1000ms ease-in-out";
    
    // Seleccionamos las secciones que tengan data-bg
    const sections = document.querySelectorAll<HTMLElement>("section[data-bg]");
    
    // Inicializar con el primer background si existe
    if (sections.length > 0) {
      const firstBg = sections[0].dataset.bg!;
      setCurrentBg(firstBg);
      document.documentElement.style.setProperty("--page-bg", firstBg);
    }

    // Configuración mejorada del observador para detección más precisa
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Obtener el elemento y su background
          const el = entry.target as HTMLElement;
          const bg = el.dataset.bg!;
          
          // Calcular cuánto de la sección es visible (ratio de intersección)
          const ratio = entry.intersectionRatio;
          
          if (entry.isIntersecting && ratio > 0.2) {
            // Solo cambiar si es un color diferente para evitar transiciones innecesarias
            if (currentBg !== bg) {
              setCurrentBg(bg);
              document.documentElement.style.setProperty("--page-bg", bg);
            }
          }
        });
      },
      { 
        // Umbral más bajo para detección más temprana y valores intermedios para transiciones más suaves
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
        // Margen para comenzar a detectar antes de que la sección esté completamente visible
        rootMargin: "-10% 0px -10% 0px"
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    
    return () => {
      observer.disconnect();
      // Limpiar estilos al desmontar
      document.documentElement.style.removeProperty("transition");
    };
  }, [currentBg]);

  return <>{children}</>;
}