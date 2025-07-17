// components/SobreLiaSection.tsx
"use client";

import React from "react";
import { Brain, Heart, Star, Zap } from "lucide-react";

export default function SobreLiaSection() {
  const sectionBackgrounds = {
    contact: "linear-gradient(135deg, #F5F1EC 0%, #D4C5B7 100%)"
  };

  const estadisticas = [
    { numero: "500+", descripcion: "Usuarios activos" },
    { numero: "5,000+", descripcion: "Looks creados" },
    { numero: "95%", descripcion: "Satisfacción" },
    { numero: "24/7", descripcion: "Disponibilidad" }
  ];

  const caracteristicas = [
    {
      icon: <Brain className="h-8 w-8 text-stone-200" />,
      title: "Inteligencia Artificial Avanzada",
      description: "LIA utiliza algoritmos de deep learning para entender tu estilo único y preferencias personales."
    },
    {
      icon: <Heart className="h-8 w-8 text-stone-200" />,
      title: "Enfoque Personal",
      description: "Cada recomendación está diseñada específicamente para ti, considerando tu tipo de cuerpo, estilo de vida y presupuesto."
    },
    {
      icon: <Star className="h-8 w-8 text-stone-200" />,
      title: "Personal Shopper",
      description: "Respaldado por 16 años de experiencia de Consuelo Guzmán en asesoría de imagen y personal shopping."
    },
    {
      icon: <Zap className="h-8 w-8 text-stone-200" />,
      title: "Resultados Instantáneos",
      description: "Obtén respuestas y sugerencias al instante. No más dudas frente al espejo cada mañana."
    }
  ];

  return (
    <section
      id="sobre-lia"
      data-bg={sectionBackgrounds.contact}
      className="relative overflow-hidden py-16 px-6 lg:px-16"
    >
      {/* Líneas decorativas */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gray-200" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-200" />

      <div className="max-w-6xl mx-auto">
        {/* Encabezado principal con crédito integrado */}
        <div className="text-center mb-16">
          <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 mb-6">
            {/* Título principal con LIA */}
            <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: '#4B3F36' }}>
              Conoce a{" "}
              <span 
                className="lia-logo-large text-black"
                style={{ 
                  fontFamily: 'var(--font-playfair-display), serif',
                  fontWeight: '400',
                  letterSpacing: '0.03em',
                  lineHeight: '0.8'
                }}
              >
                LIA
              </span>
            </h2>
            
            {/* Crédito responsive debajo del título */}
            <div className="text-lg sm:text-xl" style={{ color: '#8A6D5B' }}>
              <span className="hidden sm:inline">by </span>
              <span className="sm:hidden">by </span>
              <a 
                href="https://consueloguzman.com/sobre-mi/" 
                className="hover:text-amber-800 transition-colors underline font-medium hover:scale-105 transform transition-transform duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hidden sm:inline">Consuelo Guzmán</span>
                <span className="sm:hidden">Consuelo Guzmán</span>
              </a>
            </div>
          </div>
          
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{color:'#4a3f37'}}>
            LIA es más que un asistente virtual de moda. Es tu compañera personal en el journey hacia un estilo auténtico y confiado. Combina la experiencia humana en moda con la precisión de la inteligencia artificial.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center bg-white/60 rounded-xl p-6 shadow-sm hover:bg-white/70 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold mb-2" style={{color:"#8A6D5B"}}>
                {stat.numero}
              </div>
              <div className="text-sm" style={{color:"#4B3F36"}}>
                {stat.descripcion}
              </div>
            </div>
          ))}
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {caracteristicas.map((caracteristica, index) => (
            <div key={index} className="flex items-start space-x-4 hover:scale-105 transition-transform duration-300">
              <div className="flex-shrink-0 p-3 rounded-lg shadow-md" style={{background:'#8a6d5b'}}>
                {caracteristica.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{color:"#8a6d5b"}}>
                  {caracteristica.title}
                </h3>
                <p style={{ color:"#4B3F36"}}>
                  {caracteristica.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Historia y misión con imagen */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{color:"#8a6d5b"}}>
                Nuestra Misión
              </h3>
              <p className="mb-4" style={{ color:"#4B3F36"}}>
                Democratizar el acceso a la asesoría de imagen de calidad a todas las mujeres que merecen sentirse seguras y auténticas con su imagen y estilo personal, sacándole el máximo partido a su belleza y a su armario haciendo compras efectivas.
              </p>
              <p style={{ color:"#4B3F36"}}>
                LIA nació de la visión de Consuelo Guzmán de llevar su expertise en moda a miles de personas, combinando el toque humano con la eficiencia de la tecnología.
              </p>
            </div>
            
            {/* Imagen con efectos mejorados */}
            <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src="/pricing.png"
                alt="LIA - Love, Intelligence & Authenticity"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                style={{ maxHeight: '400px' }}
              />
              {/* Overlay sutil opcional */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}