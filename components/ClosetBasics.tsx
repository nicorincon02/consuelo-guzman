"use client"
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Recycle, Blend, Zap } from 'lucide-react';
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
  const [isHoveringCloset, setIsHoveringCloset] = useState(false);
  const closetContainerRef = useRef<HTMLDivElement>(null);

  // Paleta de colores LIA (consistente con ProcessFlow)
  const liaColors = {
    beige: '#F5F1EC',
    sand: '#E2D8CD', 
    brown: '#8A6D5B',
    dark: '#4B3F36'
  };

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

  const Tooltip: React.FC<TooltipProps> = ({ item, position }) => {
    // Calcular posición adaptativa para evitar que se salga de la pantalla
    const tooltipWidth = 288; // w-72 = 288px
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const padding = 16;
    
    let adjustedX = position.x;
    
    // Ajustar posición horizontal si se sale por la derecha
    if (adjustedX + tooltipWidth/2 > viewportWidth - padding) {
      adjustedX = viewportWidth - tooltipWidth/2 - padding;
    }
    
    // Ajustar posición horizontal si se sale por la izquierda
    if (adjustedX - tooltipWidth/2 < padding) {
      adjustedX = tooltipWidth/2 + padding;
    }

    return (
      <div 
        className="fixed z-50 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 w-72 pointer-events-none"
        style={{ 
          top: position.y - 10, 
          left: adjustedX,
          transform: 'translateX(-50%)',
          animation: 'tooltipFadeIn 0.3s ease-out',
          border: `1px solid ${liaColors.sand}`,
          boxShadow: '0 20px 25px rgba(75, 63, 54, 0.15)'
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: liaColors.brown }}
          ></div>
          <h4 className="font-semibold" style={{ color: liaColors.dark }}>
            {item.name}
          </h4>
        </div>
        <p className="text-sm mb-3" style={{ color: `${liaColors.dark}CC` }}>
          {item.description}
        </p>
        <div className="space-y-2">
          <div 
            className="rounded-lg p-2"
            style={{ backgroundColor: `${liaColors.sand}4D` }} // 30% opacity
          >
            <p className="text-xs font-medium" style={{ color: liaColors.brown }}>
              Función:
            </p>
            <p className="text-xs" style={{ color: `${liaColors.dark}E6` }}>
              {item.function}
            </p>
          </div>
          <div 
            className="rounded-lg p-2"
            style={{ backgroundColor: `${liaColors.beige}80` }} // 50% opacity
          >
            <p className="text-xs font-medium" style={{ color: liaColors.brown }}>
              Versatilidad:
            </p>
            <p className="text-xs" style={{ color: `${liaColors.dark}E6` }}>
              {item.versatility}
            </p>
          </div>
        </div>
      </div>
    );
  };

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

  // Manejadores para el hover del closet completo
  const handleClosetMouseEnter = () => {
    setIsHoveringCloset(true);
  };

  const handleClosetMouseLeave = () => {
    setIsHoveringCloset(false);
    setHoveredItem(null); // También limpiar el tooltip al salir del closet
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
        <div 
          className="absolute top-10 left-10 w-20 h-20 border rounded-full animate-pulse"
          style={{ borderColor: liaColors.sand }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-16 h-16 border rounded-full animate-pulse delay-1000"
          style={{ borderColor: liaColors.sand }}
        ></div>
        <div 
          className="absolute bottom-20 left-1/4 w-12 h-12 border rounded-full animate-pulse delay-2000"
          style={{ borderColor: liaColors.sand }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: `${liaColors.beige}E6`, // 90% opacity
              border: `1px solid ${liaColors.sand}80` // 50% opacity
            }}
          >
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: liaColors.brown }}
            ></span>
            <span className="font-medium text-sm" style={{ color: liaColors.brown }}>
              FUNDAMENTOS DEL ESTILO
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-sm" style={{ color: liaColors.dark }}>
            Tu <span style={{ color: liaColors.brown }}>Fondo de Armario</span>
          </h2>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: `${liaColors.dark}E6` }}>
            Descubre las prendas esenciales que forman la base de un guardarropa versátil. 
            Con <span className="lia-logo text-xl" style={{ color: liaColors.dark }}>
              LIA
            </span>, aprende a crear infinitas combinaciones con menos piezas.
          </p>
        </div>

        {/* Interactive Closet Display */}
        <div className="relative flex justify-center mb-16">
          <div 
            className="relative backdrop-blur-sm rounded-3xl p-8 shadow-2xl w-full max-w-5xl"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
          >
            
            {/* Imagen principal del closet - Ajustada a las dimensiones reales */}
            <div 
              ref={closetContainerRef}
              className="relative w-full rounded-2xl overflow-hidden bg-white shadow-lg"
              style={{
                aspectRatio: "1/1",
                minHeight:"500px",
                maxHeight: "800"
              }}
              onMouseEnter={handleClosetMouseEnter}
              onMouseLeave={handleClosetMouseLeave}
            >
              
              {/* Imagen a color (se muestra cuando isHoveringCloset es true) */}
              <div 
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isHoveringCloset ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src="/closet/closet-basics.jpeg"
                  alt="Closet a todo color"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Imagen en escala de grises (estado por defecto) */}
              <div 
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isHoveringCloset ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Image
                  src="/closet/closet-basics.jpeg"
                  alt="Fondo de closet"
                  fill
                  className="object-cover filter grayscale"
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
                    {/* Indicator dot */}
                    <div 
                      className={`absolute top-1 right-1 w-3 h-3 rounded-full transition-opacity duration-300 animate-pulse ${
                        hoveredItem?.id === item.id ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ backgroundColor: liaColors.brown }}
                    ></div>
                  </div>
              ))}
            </div>

            {/* Instrucciones */}
            <div className="text-center mt-6">
              <p className="text-sm" style={{ color: `${liaColors.dark}B3` }}> {/* 70% opacity */}
                <span className="inline-flex items-center gap-1">
                  <span 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: liaColors.brown }}
                  ></span>
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
          <div 
            className="text-center p-6 backdrop-blur-sm rounded-xl border hover:bg-white/60 transition-all duration-300"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              borderColor: `${liaColors.sand}4D` // 30% opacity
            }}
          >
            <div 
              className="w-16 h-16 bg-gradient-to-br rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              style={{
                background: "#E2D8CD"
              }}
            >
              <span className="icon-container"> <Recycle className='w-8 h-8 text-stone-500'/> </span>
            </div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: liaColors.dark }}>
              Sostenibilidad
            </h3>
            <p style={{ color: `${liaColors.dark}CC` }}> {/* 80% opacity */}
              Invierte en piezas de calidad que duran años y se combinan infinitamente
            </p>
          </div>
          
          <div 
            className="text-center p-6 backdrop-blur-sm rounded-xl border hover:bg-white/60 transition-all duration-300"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              borderColor: `${liaColors.sand}4D` // 30% opacity
            }}
          >
            <div 
              className="w-16 h-16 bg-gradient-to-br rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              style={{
                background: `#E2D8CD`
              }}
            >
              <span className="icon-container"> <Blend className='w-8 h-8 text-stone-500'/> </span>
            </div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: liaColors.dark }}>
              Versatilidad
            </h3>
            <p style={{ color: `${liaColors.dark}CC` }}> {/* 80% opacity */}
              Crea múltiples looks con pocas prendas, maximizando tu inversión
            </p>
          </div>
          
          <div 
            className="text-center p-6 backdrop-blur-sm rounded-xl border hover:bg-white/60 transition-all duration-300"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              borderColor: `${liaColors.sand}4D` // 30% opacity
            }}
          >
            <div 
              className="w-16 h-16 bg-gradient-to-br rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              style={{
                background: `#E2D8CD`
              }}
            >
              <span className="icon-container"> <Zap className='w-8 h-8 text-stone-500'/> </span>
            </div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: liaColors.dark }}>
              Eficiencia
            </h3>
            <p style={{ color: `${liaColors.dark}CC` }}> {/* 80% opacity */}
              Ahorra tiempo decidiendo qué ponerte cada mañana
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
            <button 
              onClick={openRegistrationModal} 
              className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg transform hover:-translate-y-1"
              style={{
                background: 'linear-gradient(to right, #8A6D5B, #4B3F36)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
            Descubre tu Fondo de armario con <span className='lia-logo text-xl'>
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
      `}</style>
    </section>
  );
};

export default ClosetBasicsSection;