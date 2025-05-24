"use client"
import React, { useState } from 'react';
import Image from 'next/image';

// Definimos los tipos
interface Position {
  top: string;
  left: string;
}

interface TooltipPosition {
  x: number;
  y: number;
}

interface ClosetEssential {
  id: number;
  name: string;
  imageName: string;
  position: Position;
  size: {
    width: number;
    height: number;
  };
  description: string;
  function: string;
  versatility: string;
}

interface HoveredItem {
  id: number;
  name: string;
  imageName: string;
  size: {
    width: number;
    height: number;
  };
  description: string;
  function: string;
  versatility: string;
  position: TooltipPosition;
}

interface TooltipProps {
  item: HoveredItem;
  position: TooltipPosition;
}

const ClosetBasicsSection = () => {
  const [hoveredItem, setHoveredItem] = useState<HoveredItem | null>(null);

  const closetEssentials: ClosetEssential[] = [
    {
      id: 1,
      name: "Blazer Gris",
      imageName: "blazer-beige.png",
      position: { top: "15%", left: "20%" },
      size: { width: 120, height: 160 },
      description: "Pieza clave para looks profesionales y casuales elegantes",
      function: "Eleva cualquier outfit y aporta estructura al look",
      versatility: "Combina con jeans, vestidos, faldas y pantalones"
    },
    {
      id: 2,
      name: "Camisa Blanca",
      imageName: "camisa-blanca.png",
      position: { top: "15%", left: "35%" },
      size: { width: 115, height: 145 },
      description: "La prenda más versátil del guardarropa",
      function: "Base perfecta para cualquier combinación",
      versatility: "Formal, casual, anudada, suelta - infinitas posibilidades"
    },
    {
      id: 3,
      name: "Camiseta Negra",
      imageName: "camiseta-navy.png",
      position: { top: "15%", left: "50%" },
      size: { width: 105, height: 125 },
      description: "Esencial para looks casuales y como layering",
      function: "Comodidad y estilo en cualquier ocasión",
      versatility: "Perfecta sola o como base para capas"
    },
    {
      id: 4,
      name: "Pantalón Gris",
      imageName: "pantalon-camel.png",
      position: { top: "15%", left: "65%" },
      size: { width: 95, height: 200 },
      description: "Alternativa sofisticada al negro",
      function: "Aporta calidez y elegancia neutral",
      versatility: "Ideal para oficina y eventos especiales"
    },
    {
      id: 5,
      name: "Falda Negra",
      imageName: "falda-negra.png",
      position: { top: "45%", left: "20%" },
      size: { width: 110, height: 135 },
      description: "Clásico atemporal para looks femeninos",
      function: "Silueta favorecedora y elegante",
      versatility: "De día con sneakers, de noche con tacones"
    },
    {
      id: 6,
      name: "Vestido Gris",
      imageName: "vestido-cafe.png",
      position: { top: "45%", left: "35%" },
      size: { width: 115, height: 180 },
      description: "Favorecedor para todas las siluetas",
      function: "Solución completa para cualquier ocasión",
      versatility: "Ajustable y cómodo, perfecto para transiciones"
    },
    {
      id: 7,
      name: "Cardigan Gris",
      imageName: "cardigan-beige.png",
      position: { top: "45%", left: "50%" },
      size: { width: 115, height: 155 },
      description: "Capa versátil para todas las estaciones",
      function: "Aporta sofisticación y comodidad",
      versatility: "Sobre vestidos, camisetas o como abrigo ligero"
    },
    {
      id: 8,
      name: "Jumpsuit Negro",
      imageName: "jumpsuit-negro.png",
      position: { top: "45%", left: "65%" },
      size: { width: 95, height: 180 },
      description: "Elegancia effortless en una sola pieza",
      function: "Look completo sin complicaciones",
      versatility: "Oficina, cenas, eventos - siempre apropiado"
    },
    {
      id: 9,
      name: "Camiseta Blanca 1",
      imageName: "camiseta-blanca-1.png",
      position: { top: "75%", left: "20%" },
      size: { width: 105, height: 120 },
      description: "Básico imprescindible para el día a día",
      function: "Frescura y limpieza visual",
      versatility: "Combina con absolutamente todo"
    },
    {
      id: 10,
      name: "Camiseta Blanca 2",
      imageName: "camiseta-blanca-2.png",
      position: { top: "75%", left: "50%" },
      size: { width: 105, height: 120 },
      description: "Duplica tus opciones de básicos",
      function: "Variedad en colores neutros",
      versatility: "Rotación perfecta para looks casuales"
    }
  ];

  const Tooltip: React.FC<TooltipProps> = ({ item, position }) => (
    <div 
      className="fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-72 transform -translate-x-1/2 pointer-events-none"
      style={{ 
        top: position.y + 10, 
        left: position.x,
        animation: 'fadeInUp 0.3s ease-out'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
        <h4 className="font-semibold text-gray-800">{item.name}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
      <div className="space-y-1">
        <p className="text-xs text-amber-600 font-medium">Función: {item.function}</p>
        <p className="text-xs text-gray-500">Versatilidad: {item.versatility}</p>
      </div>
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45"></div>
    </div>
  );

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
          className="object-cover opacity-10" // Ajusta la opacidad aquí (0.2 = 20%)
          quality={100}
          priority
        />
        {/* Overlay opcional para mejorar la legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/30"></div>
      </div>

      {/* Contenido principal - con z-index más alto para estar sobre el fondo */}
      <div className="relative z-10">
        {/* Background Pattern decorativo - ahora más sutil */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-10 left-10 w-20 h-20 border border-amber-200 rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-amber-200 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-amber-200 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              <span className="text-amber-700 font-medium text-sm">FUNDAMENTOS DEL ESTILO</span>
            </div>
            
            <h2 className="text-5xl font-bold text-gray-800 mb-6 drop-shadow-sm">
              Tu <span className="text-amber-600">Fondo de Closet</span>
            </h2>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              Descubre las prendas esenciales que forman la base de un guardarropa versátil. 
              Con LIA, aprende a crear infinitas combinaciones con menos piezas.
            </p>
          </div>

          {/* Interactive Closet Display */}
          <div className="relative flex justify-center">
            {/* Main Closet Container */}
            <div 
              className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
              style={{ width: '900px', height: '700px' }}
            >
              {/* Base Image - Grayscale */}
              <div className="absolute inset-8">
                <Image
                  src="/closet/base-grayscale.png"
                  alt="Fondo de closet en escala de grises"
                  fill
                  className="object-contain transition-all duration-300"
                  priority
                />
              </div>

              {/* Interactive Overlays - Individual Colored Images */}
              {closetEssentials.map((item) => (
                <div
                  key={item.id}
                  className="absolute cursor-pointer transition-all duration-300 hover:scale-105 hover:z-30"
                  style={{
                    top: `calc(${item.position.top} + 32px)`, // Ajuste por el padding del container
                    left: `calc(${item.position.left} + 32px)`, // Ajuste por el padding del container
                    width: `${item.size.width}px`,
                    height: `${item.size.height}px`
                  }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const hoveredItemWithPosition: HoveredItem = {
                      ...item,
                      position: {
                        x: rect.left + rect.width / 2,
                        y: rect.top - 10
                      }
                    };
                    setHoveredItem(hoveredItemWithPosition);
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Colored Overlay Image - Initially Hidden */}
                  <div className="relative w-full h-full group">
                    <Image
                      src={`/closet/${item.imageName}`}
                      alt={item.name}
                      fill
                      className="object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                    />
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-amber-400 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-sm"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tooltip */}
            {hoveredItem && (
              <Tooltip item={hoveredItem} position={hoveredItem.position} />
            )}
          </div>

          {/* Benefits Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-xl">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sostenibilidad</h3>
              <p className="text-gray-700">Invierte en piezas de calidad que duran años y se combinan infinitamente</p>
            </div>
            
            <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-xl">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Versatilidad</h3>
              <p className="text-gray-700">Crea múltiples looks con pocas prendas, maximizando tu inversión</p>
            </div>
            
            <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-xl">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Eficiencia</h3>
              <p className="text-gray-700">Ahorra tiempo decidiendo qué ponerte cada mañana</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 backdrop-blur-sm">
              Descubre tu Fondo de Closet con LIA
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default ClosetBasicsSection;