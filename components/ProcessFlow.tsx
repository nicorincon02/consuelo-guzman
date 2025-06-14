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

  // Referencias
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Datos de los pasos del proceso
  const processSteps: ProcessStep[] = [
    {
      id: 1,
      title: "Conéctate con Lia",
      shortDescription: "Inicia conversación",
      fullDescription: "Comienza tu journey de estilo personal iniciando una conversación con Lia. Ella te guiará paso a paso para conocer tus gustos, necesidades y objetivos de estilo.",
      icon: <MessageCircle className="h-8 w-8" />,
      imageUrl: "/process/step-1.png",
      color: "from-blue-400 to-blue-600",
      actionText: "Hablar con Lia"
    },
    {
      id: 2,
      title: "Captura tu Estilo",
      shortDescription: "Fotos de tu closet y tú",
      fullDescription: "Toma fotos de tu fondo de ropa actual y selfies para que Lia analice tu morfología, colorimetría y las prendas disponibles en tu guardarropa.",
      icon: <Camera className="h-8 w-8" />,
      imageUrl: "/process/step-2.png",
      color: "from-purple-400 to-purple-600",
      actionText: "Tomar fotos"
    },
    {
      id: 3,
      title: "Contexto del Día",
      shortDescription: "Actividades y clima",
      fullDescription: "Comparte con Lia tus actividades del día, el clima actual y el tipo de ocasión para la que necesitas vestirte. Esto permite recomendaciones precisas y adecuadas.",
      icon: <Cloud className="h-8 w-8" />,
      imageUrl: "/process/step-3.jpeg",
      color: "from-amber-400 to-amber-600",
      actionText: "Indicar contexto"
    },
    {
      id: 4,
      title: "Viste tu Look",
      shortDescription: "Usa la selección de Lia",
      fullDescription: "Recibe tu outfit personalizado y vístelo con confianza. Lia te explica por qué cada pieza funciona y cómo puedes adaptarla según tu estilo personal.",
      icon: <Shirt className="h-8 w-8" />,
      imageUrl: "/process/step-4.png",
      color: "from-emerald-400 to-emerald-600",
      actionText: "Crear look"
    }
  ];

  // Funciones de utilidad
  const updateScrollControls = (): void => {
    if (!carouselRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setScrollControls({
      canScrollLeft: scrollLeft > 0,
      canScrollRight: scrollLeft < scrollWidth - clientWidth - 10
    });
  };

  const scrollToSlide = (index: number): void => {
    if (!carouselRef.current) return;
    
    const slideWidth = carouselRef.current.clientWidth / 
      (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    carouselRef.current.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth'
    });
    setCurrentSlide(index);
  };

  const nextSlide = (): void => {
    const nextIndex = (currentSlide + 1) % processSteps.length;
    scrollToSlide(nextIndex);
  };

  const prevSlide = (): void => {
    const prevIndex = currentSlide === 0 ? processSteps.length - 1 : currentSlide - 1;
    scrollToSlide(prevIndex);
  };

  // Control de autoplay
  const startAutoPlay = (): void => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(nextSlide, 4000);
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

    carousel.addEventListener('scroll', handleScroll);
    updateScrollControls();

    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  // Componente de tarjeta con flip corregido
  const ProcessCard: React.FC<{ step: ProcessStep; index: number }> = ({ step, index }) => (
    <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4">
      <div className="group h-96" style={{ perspective: '1000px' }}>
        <div 
          className="relative w-full h-full transition-transform duration-700 cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateY(0deg)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotateY(180deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotateY(0deg)';
          }}
        >
          
          {/* Cara frontal */}
          <div 
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
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
              {/* Overlay gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-80`}></div>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            {/* Contenido frontal */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    {step.icon}
                  </div>
                  <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                    Paso {step.id}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/90 text-sm">{step.shortDescription}</p>
              </div>

              {/* Indicador de hover */}
              <div className="text-center">
                <div className="inline-flex items-center text-white/80 text-sm">
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
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl bg-white"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="h-full flex flex-col justify-between p-6">
              
              {/* Encabezado trasero */}
              <div>
                <div className="flex items-center mb-4">
                  <div className={`bg-gradient-to-r ${step.color} rounded-full p-2 text-white mr-3`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                    <span className="text-sm text-gray-500">Paso {step.id} de {processSteps.length}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {step.fullDescription}
                </p>
              </div>

              {/* Botón de acción */}
              <div className="text-center">
                <button 
                  className={`w-full bg-gradient-to-r ${step.color} text-white py-3 px-6 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Acción: ${step.actionText}`);
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

  return (
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
          <div className="inline-flex items-center gap-2 bg-amber-100/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
            <span className="text-amber-700 font-medium text-sm">PROCESO SIMPLE</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            Tu Journey con <span 
              className="lia-logo-large"
            >
              LIA
            </span>
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            4 pasos simples para transformar tu estilo personal y descubrir looks que realmente te representen
          </p>
        </div>

        {/* Controles del carrusel */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            {processSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-amber-600 w-8' 
                    : 'bg-amber-300 hover:bg-amber-400'
                }`}
                aria-label={`Ir al paso ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              disabled={!scrollControls.canScrollLeft}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Paso anterior"
            >
              <ChevronLeft className="h-5 w-5 text-amber-800" />
            </button>
            <button
              onClick={nextSlide}
              disabled={!scrollControls.canScrollRight}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Siguiente paso"
            >
              <ChevronRight className="h-5 w-5 text-amber-800" />
            </button>
          </div>
        </div>

        {/* Carrusel de tarjetas */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(139, 109, 91, 0.5) transparent'
            }}
          >
            {processSteps.map((step, index) => (
              <ProcessCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-xl">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Rápido</h3>
            <p className="text-gray-700">Todo el proceso toma menos de 10 minutos</p>
          </div>
          
          <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-xl">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personalizado</h3>
            <p className="text-gray-700">Cada recomendación está hecha específicamente para ti</p>
          </div>
          
          <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-xl">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Adaptable</h3>
            <p className="text-gray-700">Siempre puedes actualizar tu perfil y preferencias</p>
          </div>
        </div>

        {/* CTA final */}
        <div className="text-center mt-16">
          <button 
          onClick={openRegistrationModal} 
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Comenzar mi Journey con {" "}
            <span className="lia-logo text-xl">
              LIA
            </span>
          </button>
          
          <p className="text-gray-600 mt-4 text-sm">
            Sin compromisos  • Resultados instantáneos
          </p>
        </div>
      </div>
    </section>
  );
}