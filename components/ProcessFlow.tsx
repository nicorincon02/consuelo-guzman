"use client";

import React, { useState, useEffect } from "react";
import { Upload, MessageSquare, Calendar, Check } from "lucide-react";
import { sectionBackgrounds } from "./sectionBackgrounds";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function ProcessFlow(): React.ReactElement {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const steps: Step[] = [
    {
      id: 1,
      title: "Sube tus prendas",
      description: "Toma fotos de tu clóset o sube imágenes de tus prendas favoritas para que LIA las analice",
      icon: <Upload className="h-8 w-8 text-amber-800" />,
      color: "from-amber-50 to-amber-100",
    },
    {
      id: 2,
      title: "Responde algunas preguntas",
      description: "Comparte tus preferencias, estilo y ocasiones para las que necesitas ayuda",
      icon: <MessageSquare className="h-8 w-8 text-amber-800" />,
      color: "from-amber-100 to-amber-200",
    },
    {
      id: 3,
      title: "Recibe looks por semana",
      description: "LIA creará combinaciones personalizadas basadas en tu guardarropa y preferencias",
      icon: <Calendar className="h-8 w-8 text-amber-800" />,
      color: "from-amber-200 to-amber-300",
    },
    {
      id: 4,
      title: "Chatea con tu asistente",
      description: "Consulta dudas, pide sugerencias específicas o actualiza tu perfil en cualquier momento",
      icon: <Check className="h-8 w-8 text-amber-800" />,
      color: "from-amber-300 to-amber-400",
    },
  ];

  // Autoplay para recorrer los pasos automáticamente
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  // Observador de intersección para iniciar animación cuando la sección es visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setActiveStep(0); // Reinicia cuando no está visible
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("process-flow");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Pausa el autoplay cuando el usuario interactúa
  const handleStepClick = (index: number): void => {
    setActiveStep(index);
    setIsAutoPlaying(false);
    // Reactivar autoplay después de un tiempo
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section
      id="process-flow"
      className="relative min-h-screen flex flex-col items-center justify-center py-16 px-6 overflow-hidden"
    >
      {/* Líneas decorativas */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gray-200" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-200" />
      
      {/* Línea ondulada decorativa */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,36L60,46.7C120,57,240,79,360,79C480,79,600,57,720,53.3C840,49,960,63,1080,67.7C1200,73,1320,69,1380,67.7L1440,66.7"
            stroke="rgba(179, 140, 11, 0.15)"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        {/* Encabezado de sección */}
        <div className="text-center mb-16 opacity-0 animate-[fadeInUp_1s_forwards]" style={{ animationDelay: '0.2s' }}>
          <h2 
            style={{ color: "#4B3F36" }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            <span className="bg-clip-text text-center text-transparent bg-gradient-to-r from-amber-800 to-amber-500">
              Cómo funciona
            </span>
          </h2>
          <p className="text-amber-900/70 max-w-xl mx-auto">
            Un proceso simple para revolucionar tu estilo personal
          </p>
        </div>

        {/* Visualización en dispositivos grandes: Tarjetas en línea */}
        <div className="hidden lg:flex justify-between items-start gap-4 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={`
                w-64 p-6 rounded-xl cursor-pointer transition-all duration-500 transform
                ${isVisible ? 'opacity-100' : 'opacity-0'} 
                ${activeStep === index ? 'scale-105 shadow-xl bg-white' : 'bg-white/60 hover:bg-white/80'}
              `}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                animationName: isVisible ? 'fadeInUp' : 'none',
                animationDuration: '0.8s',
                animationFillMode: 'forwards'
              }}
            >
              <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color}`}>
                {step.icon}
              </div>
              <span className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full bg-amber-100 text-amber-800 mb-3">
                {step.id}
              </span>
              <h3 className="text-lg font-bold text-amber-900 mb-2">{step.title}</h3>
              <p className="text-amber-800/70 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Visualización en dispositivos móviles: Carrousel */}
        <div className="lg:hidden w-full">
          <div className="relative overflow-hidden w-full h-[400px]">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`
                  absolute top-0 left-0 w-full px-6 transition-all duration-500 transform
                  ${activeStep === index ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
                `}
              >
                <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
                  <div className={`w-20 h-20 mb-6 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color}`}>
                    {step.icon}
                  </div>
                  <span className="flex items-center justify-center w-10 h-10 text-lg font-bold rounded-full bg-amber-100 text-amber-800 mb-4">
                    {step.id}
                  </span>
                  <h3 className="text-xl font-bold text-amber-900 mb-3">{step.title}</h3>
                  <p className="text-amber-800/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores de navegación */}
          <div className="flex justify-center gap-3 mt-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStep === index ? 'bg-amber-700 w-8' : 'bg-amber-300'
                }`}
                aria-label={`Ver paso ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div 
          className="mt-16 text-center opacity-0" 
          style={{ 
            animationName: isVisible ? 'fadeInUp' : 'none',
            animationDuration: '0.8s',
            animationDelay: '0.8s',
            animationFillMode: 'forwards'
          }}
        >
          <a
            href="#chat"
            style={{ backgroundColor: "#8A6D5B", color: "#ffffff" }}
            className="inline-flex items-center justify-center font-medium px-8 py-4 rounded-full shadow-lg hover:opacity-90 transition text-lg"
          >
            Comienza ahora
          </a>
        </div>
      </div>

      {/* Estilos para animaciones */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}