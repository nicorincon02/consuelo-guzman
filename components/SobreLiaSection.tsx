// components/SobreLiaSection.tsx
"use client";

import React from "react";
import { Brain, Heart, Star, Zap } from "lucide-react";
import { sectionBackgrounds } from "./sectionBackgrounds";
import Image from "next/image";

export default function SobreLiaSection() {
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
        {/* Encabezado principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#4B3F36' }}>
            Conoce a <span className="lia-logo-large text-black">
              LIA
            </span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{color:'#4a3f37'}}>
            LIA es más que un asistente virtual de moda. Es tu compañera personal en el journey hacia un estilo auténtico y confiado. Combina la experiencia humana en moda con la precisión de la inteligencia artificial.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {estadisticas.map((stat, index) => (
            <div key={index} className="text-center bg-white/60 rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold mb-2" style={{color:"#bf7c4c"}}>
                {stat.numero}
              </div>
              <div className="text-amber-800/70 text-sm">
                {stat.descripcion}
              </div>
            </div>
          ))}
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {caracteristicas.map((caracteristica, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 p-3 rounded-lg" style={{background:'#8a6d5b'}}>
                {caracteristica.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{color:"#8a6d5b"}}>
                  {caracteristica.title}
                </h3>
                <p className="text-amber-800/80">
                  {caracteristica.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Historia y misión con imagen */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">
                Nuestra Misión
              </h3>
              <p className="text-amber-800/80 mb-4">
                Democratizar el acceso a la asesoría de imagen de calidad a todas las mujeres que merecen sentirse seguras y auténticas con su imagen y estilo personal, sacándole el máximo partido a su belleza y a su armario haciendo compras efectivas.
              </p>
              <p className="text-amber-800/80">
                LIA nació de la visión de Consuelo Guzmán de llevar su expertise en moda a miles de personas, combinando el toque humano con la eficiencia de la tecnología.
              </p>
            </div>
            
            {/* Reemplazar el cuadro amarillo por la imagen */}
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <Image
                src="/banner-horizontal.jpeg"
                alt="LIA - Love, Intelligence & Authenticity"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
                priority={true} // Cambia a true si es una imagen importante para la carga inicial
              />
              {/* Overlay opcional con texto si quieres mantener algo de información sobre la imagen */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}