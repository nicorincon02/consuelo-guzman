         
"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, Camera, Cloud, Shirt } from "lucide-react";
import { sectionBackgrounds } from "./sectionBackgrounds";
import { useRegistrationModal } from "./RegistrationModal";
import Image from "next/image";

// Interfaces para TypeScript
interface ProcessStep {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ReactNode;
  imageUrl: string;
  color: string;
  actionText: string;
}

interface CarouselControls {
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

export default function ProcessFlowSection(): React.ReactElement {
  const { openRegistrationModal } = useRegistrationModal();
  
  // Estados del componente
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [scrollControls, setScrollControls] = useState<CarouselControls>({
    canScrollLeft: false,
    canScrollRight: true
  });
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  // Referencias
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Colores hex de la paleta LIA
  const liaColors = {
    beige: '#F5F1EC',
    sand: '#E2D8CD', 
    brown: '#8A6D5B',
    dark: '#4B3F36'
  };

  // Datos de los pasos del proceso
  const processSteps: ProcessStep[] = [
    {
      id: 1,
      title: "Conéctate con Lia",
      shortDescription: "Inicia conversación",
      fullDescription: "Comienza tu journey de estilo personal iniciando una conversación con Lia. Ella te guiará paso a paso para conocer tus gustos, necesidades y objetivos de estilo.",
      icon: <MessageCircle className="h-6 w-6" />,
      imageUrl: "/process/step-1.png",
      color: "linear-gradient(to bottom right, #F5F1EC, #e3c6b8)",
      actionText: "Hablar con Lia"
    },
    {
      id: 2,
      title: "Captura tu Estilo",
      shortDescription: "Fotos de tu closet y tú",
      fullDescription: "Toma fotos de tu fondo de ropa actual y selfies para que Lia analice tu morfología, colorimetría y las prendas disponibles en tu guardarropa.",
      icon: <Camera className="h-6 w-6" />,
      imageUrl: "/process/step-2.png",
      color: "linear-gradient(to bottom right, #e3c6b8, #E2D8CD)",
      actionText: "Tomar fotos"
    },
    {
      id: 3,
      title: "Contexto del Día",
      shortDescription: "Actividades y clima",
      fullDescription: "Comparte con Lia tus actividades del día, el clima actual y el tipo de ocasión para la que necesitas vestirte. Esto permite recomendaciones precisas y adecuadas.",
      icon: <Cloud className="h-6 w-6" />,
      imageUrl: "/process/step-3.jpeg",
      color: "linear-gradient(to bottom right, #E2D8CD, #4B3F36)",
      actionText: "Indicar contexto"
    },
    {
      id: 4,
      title: "Viste tu Look",
      shortDescription: "Usa la selección de Lia",
      fullDescription: "Recibe tu outfit personalizado y vístelo con confianza. Lia te explica por qué cada pieza funciona y cómo puedes adaptarla según tu estilo personal.",
      icon: <Shirt className="h-6 w-6" />,
      imageUrl: "/process/step-4.png",
      color: "linear-gradient(to bottom right, #4B3F36, #e3c6b8)",
      actionText: "Crear look"
    }
  ];

  // Funciones de utilidad para el carrusel
  const updateScrollControls = (): void => {
    if (!carouselRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setScrollControls({
      canScrollLeft: scrollLeft > 0,
      canScrollRight: scrollLeft < scrollWidth - clientWidth - 10
    });
  };

  const getVisibleCards = (): number => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 4; // xl: todas las cards
    if (window.innerWidth >= 1024) return 3; // lg: 3 cards
    if (window.innerWidth >= 768) return 2;  // md: 2 cards
    return 1; // sm: 1 card
  };

  const scrollToSlide = (index: number): void => {
    if (!carouselRef.current) return;
    
    const visibleCards = getVisibleCards();
    const slideWidth = carouselRef.current.clientWidth / visibleCards;
    
    carouselRef.current.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth'
    });
    setCurrentSlide(index);
  };

  const nextSlide = (): void => {
    const visibleCards = getVisibleCards();
    const maxSlide = Math.max(0, processSteps.length - visibleCards);
    const nextIndex = currentSlide >= maxSlide ? 0 : currentSlide + 1;
    scrollToSlide(nextIndex);
  };

  const prevSlide = (): void => {
    const visibleCards = getVisibleCards();
    const maxSlide = Math.max(0, processSteps.length - visibleCards);
    const prevIndex = currentSlide <= 0 ? maxSlide : currentSlide - 1;
    scrollToSlide(prevIndex);
  };

  // Control de flip de tarjetas
  const handleCardFlip = (cardId: number, isHovered: boolean): void => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (isHovered) {
        newSet.add(cardId);
      } else {
        newSet.delete(cardId);
      }
      return newSet;
    });
  };

  // Control de autoplay
  const startAutoPlay = (): void => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(nextSlide, 5000);
  };

  const stopAutoPlay = (): void => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  // Efectos
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isAutoPlaying, currentSlide]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = (): void => {
      updateScrollControls();
    };

    const handleResize = (): void => {
      updateScrollControls();
    };

    carousel.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    updateScrollControls();

    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Función para obtener el color del texto basado en el fondo
  const getTextColorForStep = (stepId: number): { color: string; opacity: string } => {
    // Para gradientes más oscuros (steps 3 y 4), usar texto blanco
    if (stepId >= 3) return { color: '#FFFFFF', opacity: '0.95' };
    // Para gradientes más claros (steps 1 y 2), usar texto oscuro
    return { color: '#4B3F36', opacity: '0.9' };
  };

  // Función para obtener el color del overlay según el paso
  const getOverlayOpacity = (stepId: number): string => {
    switch (stepId) {
      case 1: return 'opacity-75'; // Más transparente para colores claros
      case 2: return 'opacity-80';
      case 3: return 'opacity-85';
      case 4: return 'opacity-90'; // Más opaco para mejor contraste
      default: return 'opacity-80';
    }
  };

  // Componente de tarjeta mejorado con colores hex directos
  const ProcessCard: React.FC<{ step: ProcessStep; index: number; isStaticGrid?: boolean }> = ({ step, index, isStaticGrid = false }) => {
    const isFlipped = flippedCards.has(step.id);
    const textColors = getTextColorForStep(step.id);
    const overlayOpacity = getOverlayOpacity(step.id);

    return (
      <div className={isStaticGrid ? "" : "flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4"}>
        <div 
          className="group h-96 cursor-pointer w-full max-w-sm mx-auto"
          style={{ perspective: '1000px' }}
          onMouseEnter={() => handleCardFlip(step.id, true)}
          onMouseLeave={() => handleCardFlip(step.id, false)}
        >
          <div 
            className="process-card-inner relative w-full h-full"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.7s ease-in-out'
            }}
          >
            
            {/* Cara frontal */}
            <div 
              className="process-card-front absolute inset-0 rounded-xl overflow-hidden shadow-lg"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <Image
                  src={step.imageUrl}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
                {/* Overlay gradiente con colores hex */}
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: step.color,
                    opacity: overlayOpacity === 'opacity-75' ? 0.75 : 
                            overlayOpacity === 'opacity-80' ? 0.80 :
                            overlayOpacity === 'opacity-85' ? 0.85 : 0.90
                  }}
                ></div>
                <div 
                  className="absolute inset-0"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                ></div>
              </div>
              
              {/* Contenido frontal */}
              <div 
                className="relative z-10 h-full flex flex-col justify-between p-6"
                style={{ color: textColors.color }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="rounded-full p-3"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {step.icon}
                    </div>
                    <span 
                      className="rounded-full px-3 py-1 text-sm font-medium"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      Paso {step.id}
                    </span>
                  </div>
                  
                  <h3 
                    className="text-xl font-bold mb-2 leading-tight"
                    style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ opacity: textColors.opacity, fontSize: '14px', lineHeight: '1.5' }}>
                    {step.shortDescription}
                  </p>
                </div>

                {/* Indicador de hover */}
                <div className="text-center">
                  <div 
                    className="inline-flex items-center text-sm"
                    style={{ opacity: step.id >= 3 ? 0.8 : 0.7 }}
                  >
                    <span>Hover para más detalles</span>
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Cara trasera */}
            <div 
              className="process-card-back absolute inset-0 rounded-xl overflow-hidden shadow-lg"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2D8CD80'
              }}
            >
              <div className="h-full flex flex-col justify-between p-6">
                
                {/* Encabezado trasero */}
                <div>
                  <div className="flex items-center mb-4">
                    <div 
                      className="rounded-full p-2.5 mr-3"
                      style={{ 
                        background: step.color,
                        color: '#FFFFFF',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h3 
                        className="text-lg font-bold leading-tight"
                        style={{ color: '#4B3F36' }}
                      >
                        {step.title}
                      </h3>
                      <span 
                        className="text-sm"
                        style={{ color: '#8A6D5B' }}
                      >
                        Paso {step.id} de {processSteps.length}
                      </span>
                    </div>
                  </div>
                  
                  <p 
                    className="leading-relaxed text-sm mb-6"
                    style={{ color: '#4B3F36CC' }} // 80% opacity
                  >
                    {step.fullDescription}
                  </p>
                </div>

                {/* Botón de acción */}
                <div className="text-center">
                  <button 
                    className="w-full py-3 px-6 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105"
                    style={{ 
                      background: step.color,
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (step.actionText === "Hablar con Lia") {
                        openRegistrationModal();
                      } else {
                        console.log(`Acción: ${step.actionText}`);
                      }
                    }}
                  >
                    {step.actionText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Estilos CSS específicos para el efecto flip */}
      <style jsx global>{`
        .process-card-inner {
          transform-style: preserve-3d;
        }
        
        .process-card-front,
        .process-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <section
        id="process-flow"
        data-bg={sectionBackgrounds.features}
        className="relative overflow-hidden py-16 px-6 lg:px-16"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Líneas decorativas */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gray-200" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-200" />

        <div className="max-w-7xl mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              style={{
                backgroundColor: 'rgba(245, 241, 236, 0.9)',
                border: '1px solid #E2D8CD4D'
              }}
            >
              <span 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#8A6D5B' }}
              ></span>
              <span className="font-medium text-sm" style={{ color: '#8A6D5B' }}>PROCESO SIMPLE</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#4B3F36' }}>
              Tu Journey con <span className="lia-logo-large">LIA</span>
            </h2>
            
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#4B3F36CC' }}>
              4 pasos simples para transformar tu estilo personal y descubrir looks que realmente te representen
            </p>
          </div>

          {/* Controles del carrusel - Solo en móvil y tablet */}
          <div className="flex justify-between items-center mb-8 xl:hidden">
            <div className="flex space-x-2">
              {processSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: currentSlide === index ? '#8A6D5B' : '#E2D8CD',
                    width: currentSlide === index ? '32px' : '12px'
                  }}
                  onMouseEnter={(e) => {
                    if (currentSlide !== index) {
                      e.currentTarget.style.backgroundColor = '#8A6D5BB3'; // 70% opacity
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentSlide !== index) {
                      e.currentTarget.style.backgroundColor = '#E2D8CD';
                    }
                  }}
                  aria-label={`Ir al paso ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #E2D8CD4D' // 30% opacity
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                }}
                aria-label="Paso anterior"
              >
                <ChevronLeft className="h-4 w-4" style={{ color: '#8A6D5B' }} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #E2D8CD4D' // 30% opacity
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                }}
                aria-label="Siguiente paso"
              >
                <ChevronRight className="h-4 w-4" style={{ color: '#8A6D5B' }} />
              </button>
            </div>
          </div>

          {/* Contenedor de tarjetas */}
          <div className="relative">
            {/* En pantallas XL, mostrar grid estático con Tailwind */}
            <div className="hidden xl:grid xl:grid-cols-4 xl:gap-6">
              {processSteps.map((step, index) => (
                <ProcessCard key={step.id} step={step} index={index} isStaticGrid={true} />
              ))}
            </div>

            {/* En pantallas menores, usar carrusel */}
            <div className="xl:hidden">
              <div
                ref={carouselRef}
                className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
              >
                {processSteps.map((step, index) => (
                  <ProcessCard key={step.id} step={step} index={index} isStaticGrid={false} />
                ))}
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/40 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-all duration-300 border border-brandSand/30">
              <div className="w-16 h-16 bg-brandBeige rounded-full flex items-center justify-center mx-auto mb-4 border border-brandSand/50">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-brandDark mb-3">Rápido</h3>
              <p className="text-brandDark/80">Todo el proceso toma menos de 10 minutos</p>
            </div>
            
            <div className="text-center p-6 bg-white/40 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-all duration-300 border border-brandSand/30">
              <div className="w-16 h-16 bg-brandBeige rounded-full flex items-center justify-center mx-auto mb-4 border border-brandSand/50">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-brandDark mb-3">Personalizado</h3>
              <p className="text-brandDark/80">Cada recomendación está hecha específicamente para ti</p>
            </div>
            
            <div className="text-center p-6 bg-white/40 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-all duration-300 border border-brandSand/30">
              <div className="w-16 h-16 bg-brandBeige rounded-full flex items-center justify-center mx-auto mb-4 border border-brandSand/50">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-semibold text-brandDark mb-3">Adaptable</h3>
              <p className="text-brandDark/80">Siempre puedes actualizar tu perfil y preferencias</p>
            </div>
          </div>

          {/* CTA final */}
          <div className="text-center mt-16">
            <button 
              onClick={openRegistrationModal} 
              className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg transform hover:-translate-y-1"
              style={{
                background: 'linear-gradient(to right, #8A6D5B, #4B3F36)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #4B3F36, #8A6D5B)';
                e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #8A6D5B, #4B3F36)';
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              Comenzar mi Journey con <span className="lia-logo text-xl">LIA</span>
            </button>
            
            <p className="mt-4 text-sm" style={{ color: '#4B3F3699' }}>
              Sin compromisos • Resultados instantáneos
            </p>
          </div>
        </div>
      </section>
    </>
  );
}