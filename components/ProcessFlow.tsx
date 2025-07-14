"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, Camera, Cloud, Shirt, Zap, Goal, Combine  } from "lucide-react";
import Image from "next/image";
import { useRegistrationModal } from "./RegistrationModal";

const sectionBackgrounds = {
  features: "linear-gradient(135deg, #F5F1EC 0%, #E2D8CD 100%)"
};

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
  
  // Estados del componente - Simplificados para evitar conflictos
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [scrollControls, setScrollControls] = useState<CarouselControls>({
    canScrollLeft: false,
    canScrollRight: true
  });

  // Referencias
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

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
      fullDescription: "Comienza tu journey de estilo iniciando una conversación con Lia. Ella te guiará paso a paso para conocerte y ayudarte a cumplir tus objetivos de imagen y estilo personal.",
      icon: <MessageCircle className="h-6 w-6" />,
      imageUrl: "/process/step-1.png",
      color: "linear-gradient(to bottom right, #F5F1EC, #e3c6b8)",
      actionText: "Hablar con Lia"
    },
    {
      id: 2,
      title: "Conócete",
      shortDescription: "Fotos de tu armario y tú",
      fullDescription: "Tomate selfies para que Lia analice tu visagismo, morfología y colorimetria y así personalice todas las propuestas que te envíe.",
      icon: <Camera className="h-6 w-6" />,
      imageUrl: "/process/step-2.png",
      color: "linear-gradient(to bottom right, #F5F1EC, #e3c6b8)",
      actionText: "Tomar fotos"
    },
    {
      id: 3,
      title: "Captura tu armario",
      shortDescription: "Fondo de armario",
      fullDescription: "Toma fotos de tus prendas y Lia Las combinará con tu fondo de armario para entregarte 7 propuestas de look semanales.",
      icon: <Cloud className="h-6 w-6" />,
      imageUrl: "/process/step-3.jpeg",
      color: "linear-gradient(to bottom right, #F5F1EC, #e3c6b8)",
      actionText: "Indicar contexto"
    },
    {
      id: 4,
      title: "Compra con Lia",
      shortDescription: "Usa la selección de Lia",
      fullDescription: "Comparte tus actividades del día, clima actual y tipo de ocasión para para la que necesites vestirte, Lia te guiará y te propondrá prendas y accesorios para comprar.",
      icon: <Shirt className="h-6 w-6" />,
      imageUrl: "/process/step-4.png",
      color: "linear-gradient(to bottom right, #F5F1EC, #e3c6b8)",
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
    if (window.innerWidth >= 1280) return 4;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
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

  // Control de flip mejorado - Usando manipulación directa del DOM
  const handleCardFlip = (cardId: number, isHovered: boolean): void => {
    const cardElement = cardRefs.current.get(cardId);
    if (!cardElement) return;

    const inner = cardElement.querySelector('.process-card-inner') as HTMLElement;
    if (!inner) return;

    if (isHovered) {
      inner.style.transform = 'rotateY(180deg)';
    } else {
      inner.style.transform = 'rotateY(0deg)';
    }
  };

  // Función para resetear todas las tarjetas a su estado original
  const resetAllCards = (): void => {
    cardRefs.current.forEach((cardElement) => {
      const inner = cardElement.querySelector('.process-card-inner') as HTMLElement;
      if (inner) {
        inner.style.transform = 'rotateY(0deg)';
      }
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
      resetAllCards(); // Reset cards on resize
    };

    carousel.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    updateScrollControls();

    // Cleanup al desmontar
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      resetAllCards();
    };
  }, []);

  // Reset cards cuando cambia el slide en móvil
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      resetAllCards();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [currentSlide]);

  // Función para obtener el color del texto basado en el fondo
  const getTextColorForStep = (stepId: number): { color: string; opacity: string } => {
    if (stepId >= 5) return { color: '#FFFFFF', opacity: '0.95' };
    return { color: '#4B3F36', opacity: '0.9' };
  };

  const getOverlayOpacity = (stepId: number): string => {
    switch (stepId) {
      case 1: return 'opacity-75';
      case 2: return 'opacity-75';
      case 3: return 'opacity-75';
      case 4: return 'opacity-75';
      default: return 'opacity-80';
    }
  };

  // Componente de tarjeta mejorado con mejor gestión del flip
  const ProcessCard: React.FC<{ step: ProcessStep; index: number; isStaticGrid?: boolean }> = ({ step, index, isStaticGrid = false }) => {
    const textColors = getTextColorForStep(step.id);
    const overlayOpacity = getOverlayOpacity(step.id);

    return (
      <div className={isStaticGrid ? "" : "flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4"}>
        <div 
          ref={(el) => {
            if (el) {
              cardRefs.current.set(step.id, el);
            } else {
              cardRefs.current.delete(step.id);
            }
          }}
          className="group h-96 cursor-pointer w-full max-w-sm mx-auto"
          style={{ perspective: '1000px' }}
          onMouseEnter={() => handleCardFlip(step.id, true)}
          onMouseLeave={() => handleCardFlip(step.id, false)}
          onTouchStart={() => handleCardFlip(step.id, true)}
          onTouchEnd={() => {
            // Delay para touch devices
            setTimeout(() => handleCardFlip(step.id, false), 2000);
          }}
        >
          <div 
            className="process-card-inner relative w-full h-full"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: 'rotateY(0deg)',
              transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)'
            }}
          >
            
            {/* Cara frontal */}
            <div 
              className="process-card-front absolute inset-0 rounded-xl overflow-hidden shadow-lg"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0">
                <Image
                  src={step.imageUrl}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
                <div
                  className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
                  style={{ backgroundColor: '#E5E5E5' }}
                >
                </div>
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
                    style={{ color: '#4B3F36CC' }}
                  >
                    {step.fullDescription}
                  </p>
                </div>

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

        /* Específicos para producción - Forzar estados iniciales */
        .process-card-inner {
          transform: rotateY(0deg) !important;
        }
        
        .process-card-inner:hover {
          transform: rotateY(180deg) !important;
        }

        /* Media queries para dispositivos táctiles */
        @media (hover: none) and (pointer: coarse) {
          .process-card-inner:hover {
            transform: rotateY(0deg) !important;
          }
        }
      `}</style>

      <section
        id="process-flow"
        data-bg={sectionBackgrounds.features}
        className="relative overflow-hidden py-16 px-6 lg:px-16"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => {
          setIsAutoPlaying(true);
          resetAllCards(); // Reset all cards when leaving section
        }}
      >
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gray-200" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-200" />

        <div className="max-w-7xl mx-auto">
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
              Tu Journey con {" "}
                <span 
                  className="bg-clip-text"
                  style={{ 
                    fontFamily: 'var(--font-playfair-display), serif',
                    fontWeight: '400',
                    letterSpacing: '0.02em',
                    lineHeight: '0.9'
                  }}
                >LIA</span>
            </h2>
            
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#4B3F36CC' }}>
              4 pasos simples para transformar tu estilo personal y descubrir looks que realmente te representen
            </p>
          </div>

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
                  border: '1px solid #E2D8CD4D'
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
                  border: '1px solid #E2D8CD4D'
                }}
                aria-label="Siguiente paso"
              >
                <ChevronRight className="h-4 w-4" style={{ color: '#8A6D5B' }} />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="hidden xl:grid xl:grid-cols-4 xl:gap-6">
              {processSteps.map((step, index) => (
                <ProcessCard key={step.id} step={step} index={index} isStaticGrid={true} />
              ))}
            </div>

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

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/40 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-all duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg mb-4 bg-[#E2D8CD]">
                <span className="icon-container">
                  <Zap className="w-8 h-8 text-stone-500" />
                </span> 
              </div>
              <h3 className="text-xl font-semibold text-[#4B3F36] mb-3">Rápido</h3>
              <p className="text-[#4B3F36]">Todo el proceso toma menos de 10 minutos</p>
            </div>
            
            <div className="text-center p-6 bg-white/40 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-all duration-300 border border-gray-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg mb-4 bg-[#E2D8CD]">
                <span className="icon-container">
                  <Goal className="w-8 h-8 text-stone-500" />
                </span> 
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#4B3F36]">Personalizado</h3>
              <p className="text-[#4B3F36]">Cada recomendación está hecha específicamente para ti</p>
            </div>
            
            <div className="text-center p-6 bg-white/40 backdrop-blur-sm rounded-xl hover:bg-white/50 transition-all duration-300 border border-gray-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg mb-4 bg-[#E2D8CD]">
                <span className="icon-container">
                  <Combine className="w-8 h-8 text-stone-500" />
                </span> 
              </div>
              <h3 className="text-xl font-semibold text-[#4B3F36] mb-3">Adaptable</h3>
              <p className="text-[#4B3F36]">Siempre puedes actualizar tu perfil y preferencias</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button 
              onClick={openRegistrationModal} 
              className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg transform hover:-translate-y-1"
              style={{
                background: 'linear-gradient(to right, #8A6D5B, #4B3F36)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              Comenzar mi Journey con 
              <span 
                  className="ml-1 text-xl"
                  style={{ 
                    fontFamily: 'var(--font-playfair-display), serif',
                    fontWeight: '400',
                    letterSpacing: '0.02em',
                    lineHeight: '0.9'
                  }}
                >LIA</span>
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