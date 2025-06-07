"use client";

import { useState, useEffect } from "react";
import { MessageCircle, PlayCircle, Send } from "lucide-react";
import { sectionBackgrounds } from "./sectionBackgrounds";
import { useRegistrationModal } from "./RegistrationModal";

export default function Hero() {

  const { openRegistrationModal } = useRegistrationModal ();
  // Mensajes más cortos para el chat simulado
  const chatMessages = [
    { 
      role: "assistant", 
      content: "¡Hola! Soy Lia ✨" 
    },
    { 
      role: "user", 
      content: "¿Outfit casual?" 
    },
    { 
      role: "assistant", 
      content: "Jeans + camisa blanca" 
    },
    { 
      role: "user", 
      content: "¿Para calor?" 
    },
    { 
      role: "assistant", 
      content: "Vestido ligero 👗" 
    }
  ];

  const [visibleMessages, setVisibleMessages] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  // TODOS LOS HOOKS SIEMPRE SE EJECUTAN
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Efecto para ir mostrando mensajes gradualmente
  useEffect(() => {
    // Condición DENTRO del useEffect, no antes
    if (!isMounted) return;
    
    if (visibleMessages < chatMessages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setVisibleMessages(1);
      }, 5000);
      return () => clearTimeout(resetTimer);
    }
  }, [visibleMessages, chatMessages.length, isMounted]);

  // RENDERIZADO CONDICIONAL AL FINAL, NO AFECTA HOOKS
  if (!isMounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-800 mx-auto mb-2"></div>
          <p className="text-amber-800 text-sm">Cargando...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      data-bg={sectionBackgrounds.hero}
      className="relative overflow-hidden flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 lg:px-16 py-12 md:py-16 lg:py-24 min-h-screen w-full pt-20 md:pt-24"
      suppressHydrationWarning={true}
    >
      {/* Estilos específicos para Hero - Anti-conflictos */}
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
        
        /* AISLAMIENTO ESPECÍFICO PARA HERO */
        #hero {
          isolation: isolate;
        }
        
        #hero .hero-text-content * {
          text-align: inherit !important;
        }
        
        #hero .hero-text-content .text-center {
          text-align: center !important;
        }
        
        #hero .hero-text-content .lg\\:text-left {
          text-align: center !important;
        }
        
        @media (min-width: 1024px) {
          #hero .hero-text-content .lg\\:text-left {
            text-align: left !important;
          }
        }
        
        /* Chat específico - completamente aislado */
        #hero .hero-chat {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        }
        
        #hero .hero-chat * {
          text-align: left !important;
          font-family: inherit !important;
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
            stroke="rgba(179, 140, 11, 0.2)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Contenedor central */}
      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between">
        
        {/* Texto + CTA - Con clases específicas */}
        <div className="hero-text-content relative z-10 max-w-md text-center lg:text-left space-y-4">
          <h1
            style={{ color: "#4B3F36" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            <span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-amber-800 to-amber-500"
              style={{ 
                fontFamily: "'Great Vibes', cursive",
                fontWeight: 400,
                fontSize: 'clamp(4rem, 8vw, 6rem)',
                letterSpacing: '0.03em',
                lineHeight: '0.9',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
              }}
            >
              Lia
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
            <button
              onClick={openRegistrationModal}
              style={{ backgroundColor: "#8A6D5B", color: "#ffffff" }}
              className="inline-flex items-center justify-center font-medium px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Habla con{" "}
              <span 
                className="ml-1"
                style={{ 
                  fontFamily: "'Great Vibes', cursive",
                  fontWeight: 400,
                  fontSize: '1.3rem',
                  letterSpacing: '0.01em'
                }}
              >
                Lia
              </span>
            </button>
            <a
              href="#demo"
              className="inline-flex items-center justify-center font-medium px-5 py-2.5 rounded-full shadow-sm bg-transparent text-amber-800 border border-amber-800/30 hover:bg-amber-50 transition text-sm"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Ver demo rápida
            </a>
          </div>
        </div>

        {/* Chat simulado - Solo estilos inline críticos */}
        <div className="hidden lg:block relative z-10">
          <div 
            style={{
              width: '384px',
              height: '500px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }}
          >
            
            {/* Header */}
            <div 
              style={{
                height: '80px',
                backgroundColor: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                gap: '16px',
                textAlign: 'left'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  color: '#3B82F6',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>L</span>
              </div>
              <div>
                <div style={{
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>LIA</div>
                <div style={{
                  color: 'rgba(219, 234, 254, 1)',
                  fontSize: '14px'
                }}>Asistente de Moda</div>
              </div>
            </div>

            {/* Mensajes */}
            <div 
              style={{
                height: '320px',
                overflowY: 'auto',
                backgroundColor: '#F9FAFB',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {chatMessages.slice(0, visibleMessages).map((message, index) => (
                <div 
                  key={index}
                  className="message-animate"
                  style={{
                    display: 'flex',
                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                    animationDelay: `${index * 0.3}s`,
                    textAlign: 'left'
                  }}
                >
                  <div 
                    style={{
                      maxWidth: '75%',
                      padding: '12px 16px',
                      borderRadius: '18px',
                      backgroundColor: message.role === 'user' ? '#3B82F6' : '#FFFFFF',
                      color: message.role === 'user' ? '#FFFFFF' : '#374151',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      fontSize: '14px',
                      lineHeight: '1.4',
                      textAlign: 'left',
                      wordWrap: 'break-word'
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div 
              style={{
                height: '80px',
                backgroundColor: '#ffffff',
                borderTop: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                gap: '12px'
              }}
            >
              <div style={{
                flex: 1,
                backgroundColor: '#F3F4F6',
                borderRadius: '9999px',
                padding: '12px 20px',
                fontSize: '14px',
                color: '#6B7280'
              }}>
                Escribe un mensaje...
              </div>
              <button style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#3B82F6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer'
              }}>
                <Send size={16} style={{ color: '#ffffff' }} />
              </button>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}