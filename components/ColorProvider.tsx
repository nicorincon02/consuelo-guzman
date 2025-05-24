"use client";

import { useEffect, useState, createContext, useContext, type ReactNode } from "react";

// Context para compartir el estado del background entre componentes
interface ColorContextType {
  currentBackground: string;
  setBackground: (bg: string) => void;
  isTransitioning: boolean;
}

const ColorContext = createContext<ColorContextType | null>(null);

// Hook personalizado para usar el contexto
export const useColorProvider = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColorProvider debe usarse dentro de ColorProvider');
  }
  return context;
};

export default function ColorProvider({ children }: { children: ReactNode }) {
  const [currentBackground, setCurrentBackground] = useState<string>("linear-gradient(135deg, #E2D8CD 0%, #F5F1EC 100%)");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Función optimizada para cambiar el background sin destellos
  const setBackground = (newBg: string) => {
    if (currentBackground === newBg || !isInitialized) return;
    
    setIsTransitioning(true);
    
    // Usar doble requestAnimationFrame para sincronización perfecta
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Actualizar la variable CSS directamente para transición suave
        document.documentElement.style.setProperty('--page-bg', newBg);
        setCurrentBackground(newBg);
        
        // Finalizar transición después del tiempo especificado en CSS
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1000); // Coincide con --transition-duration en CSS
      });
    });
  };

  useEffect(() => {
    // Inicializar la variable CSS con el valor por defecto
    document.documentElement.style.setProperty('--page-bg', currentBackground);
    
    // Configurar transición optimizada en el HTML element
    const htmlElement = document.documentElement;
    htmlElement.style.transition = 'background-image var(--transition-duration) var(--transition-timing)';
    
    // Marcar como inicializado después de un frame
    requestAnimationFrame(() => {
      setIsInitialized(true);
    });

    // Configurar el observador con detección más suave
    const observer = new IntersectionObserver(
      (entries) => {
        if (!isInitialized) return;
        
        // Filtrar entradas válidas y ordenar por visibilidad
        const validEntries = entries
          .filter(entry => {
            const ratio = entry.intersectionRatio;
            return entry.isIntersecting && ratio > 0.25;
          })
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (validEntries.length > 0) {
          const mostVisible = validEntries[0];
          const element = mostVisible.target as HTMLElement;
          const newBg = element.dataset.bg;
          
          if (newBg && newBg !== currentBackground) {
            setBackground(newBg);
          }
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-15% 0px -15% 0px" // Zona de activación optimizada
      }
    );

    // Observar secciones con data-bg
    const sections = document.querySelectorAll<HTMLElement>("section[data-bg]");
    sections.forEach(section => observer.observe(section));

    // Configurar background inicial si existe
    if (sections.length > 0 && sections[0].dataset.bg) {
      const initialBg = sections[0].dataset.bg;
      document.documentElement.style.setProperty('--page-bg', initialBg);
      setCurrentBackground(initialBg);
    }

    return () => {
      observer.disconnect();
      // Limpiar transiciones al desmontar
      htmlElement.style.removeProperty('transition');
    };
  }, [isInitialized, currentBackground]);

  return (
    <ColorContext.Provider value={{ 
      currentBackground, 
      setBackground, 
      isTransitioning 
    }}>
      {children}
    </ColorContext.Provider>
  );
}