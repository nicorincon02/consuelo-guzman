"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, PlayCircle } from "lucide-react";
import { FaWhatsapp, FaSignal } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosBatteryFull, IoIosWifi } from "react-icons/io";
import { PiSticker } from "react-icons/pi";
import Image from "next/image";

// Simulamos los hooks y contextos para el ejemplo
const useRegistrationModal = () => ({
  openRegistrationModal: () => console.log('Modal de registro abierto')
});


const sectionBackgrounds = {
  hero: "linear-gradient(135deg, #F5F1EC 0%, #E2D8CD 100%)"
};

export default function Hero() {
  const { openRegistrationModal } = useRegistrationModal();
  
  // Interfaces para tipos de mensajes
  interface TextMessage {
    role: "assistant" | "user";
    content: string;
    type: "text";
  }

  interface ImageMessage {
    role: "assistant" | "user";
    content: string;
    type: "image";
    imageUrl: string;
    imageAlt: string;
  }

  type ChatMessage = TextMessage | ImageMessage;

  // Mensajes con soporte para imágenes
  const chatMessages: ChatMessage[] = [
    { 
      role: "assistant", 
      content: "¡Hola! Soy Lia ✨ Tu asistente de imagen personal",
      type: "text"
    },
    { 
      role: "user", 
      content: "¿Qué outfit me recomiendas para hoy?",
      type: "text"
    },
    { 
      role: "assistant", 
      content: "¡Aquí tienes tus looks para esta semana! 👗",
      type: "text"
    },
    {
      role: "assistant",
      content: "",
      type: "image",
      imageUrl: "/collage1.png",
      imageAlt: "Look casual elegante - Blazer negro, jeans y top blanco"
    },
    { 
      role: "user", 
      content: "¡Me encanta! ¿Tienes más opciones?",
      type: "text"
    },
    {
      role: "assistant",
      content: "¡Por supuesto! Aquí tienes otra opción perfecta 💫",
      type: "text"
    },
    {
      role: "assistant",
      content: "",
      type: "image",
      imageUrl: "/collage2.png",
      imageAlt: "Look profesional - Camisa a rayas y pantalón negro"
    }
  ];

  const [visibleMessages, setVisibleMessages] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Efecto para ir mostrando mensajes gradualmente
  useEffect(() => {
    if (!isMounted) return;
    
    if (visibleMessages < chatMessages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages(prev => prev + 1);
      }, 2500); // Más tiempo para que se puedan ver las imágenes
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setVisibleMessages(1);
      }, 8000); // Más tiempo antes de reiniciar
      return () => clearTimeout(resetTimer);
    }
    
  }, [visibleMessages, chatMessages.length, isMounted]);

  const scrollToBottom = () => {
  if (messagesContainerRef.current) {
    const container = messagesContainerRef.current;
    container.scrollTo({
      top: container.scrollHeight,  // Ir al final del contenido
      behavior: 'smooth'           // Animación suave
    });
  }
};

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
      style={{ background: sectionBackgrounds.hero }}
    >
      {/* Estilos específicos para Hero */}
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(-2deg); }
        }
        
        .message-animate {
          opacity: 0;
          animation-name: fadeInUp;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }
        
        .message-image {
          transition: transform 0.3s ease;
        }
        
        .message-image:hover {
          transform: scale(1.05);
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite 2s;
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
        
        {/* Texto + CTA */}
        <div className="hero-text-content relative z-10 max-w-2xl text-center lg:text-left space-y-4">
          <h1
            style={{ color: "#4B3F36" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
          >
            <span 
              className="bg-clip-text"
              style={{ 
                fontSize: 'clamp(4rem, 8vw, 6rem)',
                color: 'black',
                fontFamily: 'var(--font-playfair-display), serif',
                fontWeight: '400',
                letterSpacing: '0.03em',
                lineHeight: '0.8',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
              }}
            >
              LIA
            </span>
            <span className="mt-2 block">Tu asistente personal de imagen, estilo y moda en WhatsApp</span>
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
              <p className="text-sm text-gray-700">Recomendaciones de imagen y estilo personal a cualquier hora desde WhatsApp</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg shadow-sm">
              <h3 className="font-bold text-amber-800 text-lg">Compras Efectivas</h3>
              <p className="text-sm text-gray-700">Adapta las sugerencias a tu tipo de rostro, cuerpo y colorimetria teniendo en cuenta la ocasión</p>
            </div>
            <div className="bg-white bg-opacity-60 p-3 rounded-lg shadow-sm">
              <h3 className="font-bold text-amber-800 text-lg">7 Looks semanales</h3>
              <p className="text-sm text-gray-700">Desde tu armario diferentes propuestas de looks cada semana</p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button
              onClick={openRegistrationModal}
              style={{ backgroundColor: "#8A6D5B", color: "#ffffff" }}
              className="inline-flex items-center justify-center font-medium px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition text-lg"
            >
              <FaWhatsapp className="w-5 h-5 mr-2" />
              Habla con{" "}
              <span 
                className="ml-1 text-xl"
                style={{ 
                  fontFamily: 'var(--font-playfair-display), serif',
                  fontWeight: '400',
                  letterSpacing: '0.02em',
                  lineHeight: '0.9'
                }}
              >
                LIA
              </span>
            </button>
            <a
              href="#"
              className="inline-flex items-center justify-center font-medium px-5 py-2.5 rounded-full shadow-sm bg-transparent text-amber-800 border border-amber-800/30 hover:bg-amber-50 transition text-sm"
            >
              <FaCirclePlay className="w-4 h-4 mr-2" />
              Ver cómo funciona
            </a>
          </div>
        </div>

        {/* Chat simulado estilo WhatsApp */}
        <div className="hidden lg:block relative z-10 hero-chat">
          {/* Elementos decorativos flotantes */}
          <div className="absolute -top-8 -left-8 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg animate-float">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
            </svg>
          </div>

          {/* Mockup del teléfono */}
          <div className="relative w-96 h-[750px]">
            {/* Tu imagen del teléfono como fondo/marco */}
            <div 
              className="absolute inset-0 bg-contain bg-no-repeat bg-center z-10"
              style={{
                backgroundImage: "url('/phone-mockup.png')",
                backgroundSize: 'contain'
              }}
            />
            
            {/* Pantalla del teléfono */}
            <div 
              className="absolute bg-white rounded-3xl overflow-hidden shadow-inner"
              style={{ 
                top: '1%',         
                bottom: '1.5%',      
                left: '5%',        
                right: '5%',       
                zIndex: 5
              }}
            >
              
              {/* Status Bar */}
              <div 
                className="flex justify-between items-center px-6 py-2 text-black"
                style={{
                  height: '44px',
                  backgroundColor: '#f2f1ec',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                <span>{new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="flex items-center gap-1">
                  <FaSignal style={{ width: '20px', height: '20px' }} />
                  <IoIosWifi style={{ width: '20px', height: '20px' }} />
                  <IoIosBatteryFull style={{ width: '20px', height: '20px' }} />
                </div>
              </div>
              
              {/* Header estilo WhatsApp */}
              <div 
                style={{
                  height: '60px',
                  backgroundColor: '#f2f1ec',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                  gap: '12px',
                  textAlign: 'left'
                }}
              >
                {/* Botón de regresar */}
                <svg className="w-5 h-5 text-white" fill="none" stroke="#000000" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                
                {/* Avatar de Lia */}
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Image
                    src="/LIA-color.png"
                    alt="LIA Avatar"
                    width={40}
                    height={40}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* Info del contacto */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    color: '#000000',
                    fontWeight: '400',
                    fontSize: '15px'
                  }}>LIA</div>
                  <div style={{
                    color: '#9a9994',
                    fontSize: '12px'
                  }}>en línea</div>
                </div>
                
                {/* Iconos de acción */}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="#000000" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="#000000" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <svg className="w-4 h-4 text-white" fill="#000000" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </div>
              </div>
              
              {/* Área de mensajes con scroll automático */}
              <div 
                ref={messagesContainerRef}
                style={{
                  height: 'calc(100% - 164px)',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  backgroundImage: 'url("/whatsapp-background.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#E5DDD5',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  scrollBehavior: 'smooth'
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
                        maxWidth: message.type === 'image' ? '85%' : '75%',
                        padding: message.type === 'image' ? '4px' : '6px 10px',
                        borderRadius: message.role === 'user' 
                          ? '16px 16px 4px 16px' 
                          : '16px 16px 16px 4px',
                        backgroundColor: message.role === 'user' ? '#DCF8C6' : '#FFFFFF',
                        color: '#000000',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                        fontSize: '13px',
                        lineHeight: '1.3',
                        textAlign: 'left',
                        wordWrap: 'break-word',
                        position: 'relative'
                      }}
                    >
                      {message.type === 'image' ? (
                        <div className="message-image">
                          <Image
                            src={message.imageUrl}
                            alt={message.imageAlt}
                            width={200}
                            height={250}
                            className="rounded-lg w-full h-auto object-cover"
                            style={{
                              maxWidth: '100%',
                              height: 'auto'
                            }}
                            onLoad={() => {
                              // Hacer scroll cuando la imagen termine de cargar
                              setTimeout(scrollToBottom, 100);
                            }}
                          />
                          {/* Timestamp para imagen */}
                          <div style={{
                            fontSize: '10px',
                            color: '#999999',
                            textAlign: 'right',
                            marginTop: '4px',
                            padding: '0 4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '3px'
                          }}>
                            <span>{new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                            {message.role === 'user' && (
                              <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                            )}
                          </div>
                        </div>
                      ) : (
                        <>
                          {message.content}
                          <div style={{
                            fontSize: '10px',
                            color: '#999999',
                            textAlign: 'right',
                            marginTop: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '3px'
                          }}>
                            <span>{new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                            {message.role === 'user' && (
                              <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input de WhatsApp */}
              <div 
                style={{
                  height: '60px',
                  backgroundColor: '#f3f1eb',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  gap: '8px',
                  borderTop: '1px solid #E5E5E5'
                }}
              >
                {/* Botón + */}
                <div style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="#8E8E93" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                
                {/* Campo de input */}
                <div style={{
                  flex: 1,
                  height: '32px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 12px'
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#8E8E93',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    fontWeight: '400'
                  }}>
                    Mensaje
                  </div>
                  
                  <div style={{
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <PiSticker 
                      style={{ 
                        width: '14px', 
                        height: '14px',
                        color: '#8E8E93'
                      }} 
                    />
                  </div>
                </div>
                
                {/* Icono de cámara */}
                <div style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '18px', height: '18px' }} fill="#8E8E93" viewBox="0 0 24 24">
                    <path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
                  </svg>
                </div>
                
                {/* Icono de micrófono */}
                <div style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '16px', height: '16px' }} fill="#8E8E93" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}