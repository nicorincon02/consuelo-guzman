"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRegistrationModal } from './RegistrationModal';

// Tipos mejorados y simplificados
interface ClosetItem {
  id: number;
  name: string;
  area: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  description: string;
  function: string;
  versatility: string;
}

interface TooltipProps {
  item: ClosetItem;
  position: { x: number; y: number };
}

const ClosetBasicsSection = () => {
  const { openRegistrationModal } = useRegistrationModal();
  const [hoveredItem, setHoveredItem] = useState<ClosetItem | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Datos simplificados - Coordenadas ajustadas a la imagen real (distribución 4x3)
  const closetItems: ClosetItem[] = [
    // Fila superior
    {
      id: 1,
      name: "Blazer Elegante",
      area: { x: -3, y: 15, width: 20, height: 25 },
      description: "Pieza clave para looks profesionales y casuales elegantes",
      function: "Eleva cualquier outfit y aporta estructura al look",
      versatility: "Combina con jeans, vestidos, faldas y pantalones"
    },
    {
      id: 2,
      name: "Camisa Blanca Clásica",
      area: { x: 22, y: 15, width: 20, height: 25 },
      description: "La prenda más versátil del guardarropa",
      function: "Base perfecta para cualquier combinación",
      versatility: "Formal, casual, anudada, suelta - infinitas posibilidades"
    },
    {
      id: 3,
      name: "Top Negro",
      area: { x: 45, y: 15, width: 20, height: 25 },
      description: "Esencial para looks casuales y como layering",
      function: "Comodidad y estilo en cualquier ocasión",
      versatility: "Perfecta sola o como base para capas"
    },
    {
      id: 4,
      name: "Pantalón Versátil",
      area: { x: 67, y: 15, width: 20, height: 25 },
      description: "Alternativa sofisticada y cómoda",
      function: "Aporta elegancia y profesionalismo",
      versatility: "Ideal para oficina y eventos especiales"
    },
    // Fila media
    {
      id: 5,
      name: "Falda Clásica",
      area: { x: -3, y: 50, width: 20, height: 25 },
      description: "Clásico atemporal para looks femeninos",
      function: "Silueta favorecedora y elegante",
      versatility: "De día con sneakers, de noche con tacones"
    },
    {
      id: 6,
      name: "Vestido Midi",
      area: { x: 22, y: 50, width: 20, height: 25 },
      description: "Favorecedor para todas las siluetas",
      function: "Solución completa para cualquier ocasión",
      versatility: "Ajustable y cómodo, perfecto para transiciones"
    },
    {
      id: 7,
      name: "Cardigan Suave",
      area: { x: 45, y: 50, width: 20, height: 25 },
      description: "Capa versátil para todas las estaciones",
      function: "Aporta sofisticación y comodidad",
      versatility: "Sobre vestidos, camisetas o como abrigo ligero"
    },
    {
      id: 8,
      name: "Jumpsuit Elegante",
      area: { x: 68, y: 65, width: 20, height: 25 },
      description: "Elegancia effortless en una sola pieza",
      function: "Look completo sin complicaciones",
      versatility: "Oficina, cenas, eventos - siempre apropiado"
    },
    // Fila inferior (solo 2 prendas)
    {
      id: 9,
      name: "Camiseta Básica 1",
      area: { x: -3, y: 85, width: 20, height: 20 },
      description: "Básico imprescindible para el día a día",
      function: "Frescura y limpieza visual",
      versatility: "Combina con absolutamente todo"
    },
    {
      id: 10,
      name: "Camiseta Básica 2",
      area: { x: 45, y: 85, width: 20, height: 20 },
      description: "Duplica tus opciones de básicos",
      function: "Variedad en estilos casuales",
      versatility: "Rotación perfecta para looks relajados"
    }
  ];

  const Tooltip: React.FC<TooltipProps> = ({ item, position }) => (
    <div 
      className="fixed z-50 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-amber-200 p-4 w-72 transform -translate-x-1/2 pointer-events-none"
      style={{ 
        top: position.y - 10, 
        left: position.x,
        animation: 'tooltipFadeIn 0.3s ease-out'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <h4 className="font-semibold text-amber-900">{item.name}</h4>
      </div>
      <p className="text-sm text-gray-700 mb-3">{item.description}</p>
      <div className="space-y-2">
        <div className="bg-amber-50 rounded-lg p-2">
          <p className="text-xs text-amber-800 font-medium">Función:</p>
          <p className="text-xs text-amber-700">{item.function}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-gray-600 font-medium">Versatilidad:</p>
          <p className="text-xs text-gray-600">{item.versatility}</p>
        </div>
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-amber-200 rotate-45"></div>
    </div>
  );

  const handleMouseEnter = (item: ClosetItem, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    });
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <section 
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      data-bg="linear-gradient(135deg, #f8f6f3 0%, #e8e2db 100%)"
    >
      {/* Imagen de fondo con opacidad */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/closet/closet-background.png"
          alt="Fondo de closet"
          fill
          className="object-cover opacity-10"
          quality={100}
          priority
        />
        {/* Overlay opcional para mejorar la legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30"></div>
      </div>

      {/* Patrón decorativo de fondo */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-10 left-10 w-20 h-20 border border-amber-200 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-amber-200 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-amber-200 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            <span className="text-amber-700 font-medium text-sm">FUNDAMENTOS DEL ESTILO</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 drop-shadow-sm">
            Tu <span className="text-amber-600">Fondo de Closet</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Descubre las prendas esenciales que forman la base de un guardarropa versátil. 
            Con <span 
              className="lia-logo text-xl"
            >
              LIA
            </span>, aprende a crear infinitas combinaciones con menos piezas.
          </p>
        </div>

        {/* Interactive Closet Display */}
        <div className="relative flex justify-center mb-16">
          <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl w-full max-w-5xl">
            
            {/* Imagen principal del closet - Ajustada a las dimensiones reales */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-lg">
              
              {/* Imagen a color (se muestra en hover) */}
              <div className="absolute inset-0 transition-opacity duration-700 ease-in-out opacity-0 hover:opacity-100">
                <Image
                  src="/closet/closet-basics.jpeg"
                  alt="Closet a todo color"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Imagen en escala de grises (estado por defecto) */}
              <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
                <Image
                  src="/closet/closet-basics.jpeg"
                  alt="Fondo de closet"
                  fill
                  className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>

              {/* Áreas interactivas - Ajustadas a la distribución 4x3 */}
              {closetItems.map((item) => (
                <div
                  key={item.id}
                  className="absolute cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20"
                  style={{
                    left: `${item.area.x}%`,
                    top: `${item.area.y}%`,
                    width: `${item.area.width}%`,
                    height: `${item.area.height}%`,
                  }}
                  onMouseEnter={(e) => handleMouseEnter(item, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Overlay de hover con efecto de resaltado */}
                  <div className="w-full h-full rounded-lg transition-all duration-300 hover:bg-amber-400/20 hover:backdrop-blur-sm hover:shadow-lg border-2 border-transparent hover:border-amber-400/50">
                    {/* Indicator dot */}
                    <div className="absolute top-1 right-1 w-3 h-3 bg-amber-400 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Instrucciones */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                  Pasa el mouse sobre las prendas para descubrir más
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Tooltip */}
        {hoveredItem && (
          <Tooltip item={hoveredItem} position={tooltipPosition} />
        )}

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white/40 backdrop-blur-sm rounded-xl border border-amber-200/30 hover:bg-white/60 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl">♻️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Sostenibilidad</h3>
            <p className="text-gray-700">Invierte en piezas de calidad que duran años y se combinan infinitamente</p>
          </div>
          
          <div className="text-center p-6 bg-white/40 backdrop-blur-sm rounded-xl border border-amber-200/30 hover:bg-white/60 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Versatilidad</h3>
            <p className="text-gray-700">Crea múltiples looks con pocas prendas, maximizando tu inversión</p>
          </div>
          
          <div className="text-center p-6 bg-white/40 backdrop-blur-sm rounded-xl border border-amber-200/30 hover:bg-white/60 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Eficiencia</h3>
            <p className="text-gray-700">Ahorra tiempo decidiendo qué ponerte cada mañana</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button 
          onClick={openRegistrationModal}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Descubre tu Fondo de Closet con <span className='lia-logo text-xl'
            >
              LIA
            </span>
          </button>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
        
        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default ClosetBasicsSection;