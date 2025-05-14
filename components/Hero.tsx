"use client";

import { useState, useEffect } from "react";
import { MessageCircle, PlayCircle, Send } from "lucide-react";

export default function Hero() {
  // Estado para los mensajes de la conversación simulada
  const chatMessages = [
    { 
      role: "assistant", 
      content: "¡Hola! Soy Lia, tu asistente de moda virtual. ¿En qué puedo ayudarte hoy?" 
    },
    { 
      role: "user", 
      content: "¿Qué puedo ponerme para una salida casual?" 
    },
    { 
      role: "assistant", 
      content: "Combina unos jeans rectos con una camisa blanca y zapatillas" 
    },
    { 
      role: "user", 
      content: "¿Y si hace calor?" 
    },
    { 
      role: "assistant", 
      content: "Opta por un vestido ligero y sandalias, es cómodo y fresco" 
    }
  ];

  const [visibleMessages, setVisibleMessages] = useState(1);

  // Efecto para ir mostrando mensajes gradualmente
  useEffect(() => {
    if (visibleMessages < chatMessages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages(prev => prev + 1);
      }, 2000); // Cada 2 segundos aparece un nuevo mensaje
      return () => clearTimeout(timer);
    } else {
      // Reiniciar después de mostrar todos
      const resetTimer = setTimeout(() => {
        setVisibleMessages(1);
      }, 5000);
      return () => clearTimeout(resetTimer);
    }
  }, [visibleMessages, chatMessages.length]);

  return (
    <section
      data-bg="linear-gradient(135deg, #E2D8CD 0%, #F5F1EC 100%)"
      className="relative overflow-hidden flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 lg:px-16 py-12 md:py-16 lg:py-24 h-screen w-full"
    >
      {/* Estilos globales para la animación */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .message-animate {
          opacity: 0;
          animation-name: fadeInUp;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }
      `}</style>

      {/* Línea superior e inferior */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gray-200" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-200" />

      {/* Línea horizontal decorativa */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64L80,72C160,80,320,96,480,88C640,80,800,56,960,48C1120,40,1280,56,1360,64L1440,72"
            stroke="rgba(0, 0, 0, 0.2)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Contenedor central con máximo ancho para evitar espacio muerto */}
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between">
        {/* Texto + CTA */}
        <div className="relative z-10 max-w-md text-center lg:text-left space-y-4">
          <h1
            style={{ color: "#4B3F36" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-800 to-amber-500 animate-pulse">
              LIA
            </span>
            <span className="mt-2 block">Tu asistente personal de estilo</span>
          </h1>
          
          <p
            style={{ color: "rgba(75,63,54,0.8)" }}
            className="text-base lg:text-lg"
          >
            Descubre combinaciones perfectas y renueva tu armario en segundos
          </p>

          {/* Características rápidas */}
          <div className="grid grid-cols-1 gap-3 my-6 text-left">
            <div className="bg-white bg-opacity-60 p-3 rounded-lg shadow-sm">
              <h3 className="font-bold text-amber-800 text-lg">Análisis 24/7</h3>
              <p className="text-sm text-gray-700">Recomendaciones a cualquier hora</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg shadow-sm">
              <h3 className="font-bold text-amber-800 text-lg">Personalización</h3>
              <p className="text-sm text-gray-700">Adapta sugerencias a tu tipo de cuerpo y ocasión</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg shadow-sm">
              <h3 className="font-bold text-amber-800 text-lg">Ahorro de tiempo</h3>
              <p className="text-sm text-gray-700">Deja de dudar frente al clóset</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <a
              href="#chat"
              style={{ backgroundColor: "#8A6D5B", color: "#ffffff" }}
              className="inline-flex items-center justify-center font-medium px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Habla con LIA
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center font-medium px-5 py-2.5 rounded-full shadow-sm bg-transparent text-amber-800 border border-amber-800/30 hover:bg-amber-50 transition text-sm"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Ver demo rápida
            </a>
          </div>
        </div>

        {/* Conversación interactiva (visible solo en pantallas grandes) */}
        <div className="hidden lg:block relative z-10 w-full max-w-xs sm:max-w-sm xl:max-w-md">
          <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-2xl bg-white p-3">
            <div className="absolute top-0 inset-x-0 h-12 bg-blue-100 rounded-t-xl flex items-center justify-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">L</div>
                <span className="font-semibold text-blue-900">LIA</span>
              </div>
            </div>
            
            {/* Area de mensajes */}
            <div className="mt-12 h-full overflow-y-auto p-2 flex flex-col space-y-2">
              {chatMessages.slice(0, visibleMessages).map((message, index) => (
                <div 
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} message-animate`}
                  style={{
                    animationDelay: `${index * 0.3}s`
                  }}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input de texto */}
            <div className="absolute bottom-3 inset-x-3 flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input 
                type="text" 
                placeholder="Escribe un mensaje..." 
                className="flex-1 bg-transparent border-none outline-none text-sm"
                disabled
              />
              <button 
                className="ml-2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"
                disabled
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}