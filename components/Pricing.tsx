"use client";

import { useState } from "react";
import { ChevronRight, Check, Star, Sparkles, Shield, Crown, Gem } from "lucide-react";
import { useRegistrationModal } from "./RegistrationModal";

// Definir tipos para mayor seguridad y documentación
type PlanId = 'esencial';

interface Plan {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlights: string[];
  badge?: string;
}

export default function PricingSection() {
  const { openRegistrationModal } = useRegistrationModal();
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  
  // Plan único LIA Esencial
  const plan: Plan = {
    id: 'esencial',
    name: 'LIA Esencial',
    price: '$35.000',
    period: 'COP/mes',
    badge: 'Plan Exclusivo',
    features: [
      'Análisis completo de tu armario actual',
      'Recomendaciones de outfits personalizadas',
      'Asesoría de colorimetría y morfología',
      'Guía de compras inteligentes',
      'Soporte 24/7 por WhatsApp',
      'Creación de looks',
      'Tips de combinaciones diarias',
      'Análisis de ocasiones especiales'
    ],
    highlights: [
      'Todo incluido',
      'Sin restricciones',
      'Respaldado por profesionales'
    ]
  };
  
  const handleSelectPlan = (): void => {
    setSelectedPlan('esencial');
    openRegistrationModal();
  };

  return (
    <>
      {/* Estilos CSS para efectos especiales */}
      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .sparkle-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        
        .sparkle {
          position: absolute;
          color: #FFD700;
          animation: sparkle 3s infinite;
        }
        
        .sparkle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
        .sparkle:nth-child(2) { top: 20%; left: 80%; animation-delay: 1s; }
        .sparkle:nth-child(3) { top: 40%; left: 20%; animation-delay: 2s; }
        .sparkle:nth-child(4) { top: 60%; left: 90%; animation-delay: 0.5s; }
        .sparkle:nth-child(5) { top: 80%; left: 30%; animation-delay: 1.5s; }
        .sparkle:nth-child(6) { top: 15%; left: 60%; animation-delay: 2.5s; }
        .sparkle:nth-child(7) { top: 70%; left: 70%; animation-delay: 0.8s; }
        .sparkle:nth-child(8) { top: 30%; left: 50%; animation-delay: 1.8s; }
        .sparkle:nth-child(9) { top: 90%; left: 10%; animation-delay: 0.3s; }
        .sparkle:nth-child(10) { top: 50%; left: 85%; animation-delay: 2.2s; }
        
        .floating-gem {
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-gem:nth-child(odd) {
          animation-delay: -2s;
        }
        
        
        .glow-effect {
        
        .luxury-gradient {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FF8C00 50%, #D4A574 75%, #8B7355 100%);
        }
        
        .luxury-text-gradient {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <section
        id="pricing"
        className="relative overflow-hidden w-full min-h-screen flex items-center"
        style={{ 
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 70%, #0a0a0a 100%)'
        }}
      >
        {/* Efectos de escarcha y elementos flotantes */}
        <div className="sparkle-bg">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="sparkle">
              <Sparkles className="w-4 h-4" />
            </div>
          ))}
        </div>

        {/* Gemas flotantes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-gem absolute top-20 left-10" style={{ color: '#FFD700' }}>
            <Gem className="w-8 h-8 opacity-30" />
          </div>
          <div className="floating-gem absolute top-40 right-20" style={{ color: '#FFA500' }}>
            <Star className="w-6 h-6 opacity-40" />
          </div>
          <div className="floating-gem absolute bottom-32 left-1/4" style={{ color: '#FF8C00' }}>
            <Crown className="w-10 h-10 opacity-25" />
          </div>
          <div className="floating-gem absolute top-60 right-1/3" style={{ color: '#D4A574' }}>
            <Sparkles className="w-7 h-7 opacity-35" />
          </div>
          <div className="floating-gem absolute bottom-20 right-10" style={{ color: '#FFD700' }}>
            <Gem className="w-5 h-5 opacity-30" />
          </div>
        </div>

        {/* Líneas doradas */}
        <div 
          className="absolute inset-x-0 top-0 h-[2px]" 
          style={{ background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }}
        />
        <div 
          className="absolute inset-x-0 bottom-0 h-[2px]" 
          style={{ background: 'linear-gradient(90deg, transparent, #FFD700, transparent)' }}
        />

        {/* Contenido principal */}
        <div className="relative z-20 px-6 lg:px-16 py-12 md:py-16 lg:py-24 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            
            {/* Header dramático */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8" style={{ color: '#FFD700' }} />
                <h2 className="text-5xl text-white sm:text-6xl font-bold luxury-text-gradient">
                  Plan Exclusivo
                </h2>
                <Crown className="w-8 h-8" style={{ color: '#FFD700' }} />
              </div>
              <p 
                className="text-xl max-w-3xl mx-auto"
                style={{ color: '#F5F1EC' }}
              >
                La experiencia premium de moda que transformará tu estilo para siempre
              </p>
            </div>
            
            {/* Plan único con efectos premium */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <div 
                  className="relative border-2 rounded-3xl p-10 transition-all shadow-2xl backdrop-blur-sm transform hover:scale-105 shimmer-effect"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 241, 236, 0.9) 100%)',
                    borderColor: '#FFD700',
                    boxShadow: '0 25px 50px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                  }}
                >
                  
                  {/* Header del plan */}
                  <div className="text-center mb-10">
                    <h3 
                      className="text-4xl font-bold mb-4 flex items-center justify-center gap-3"
                      style={{ color: '#2C2C2C' }}
                    >
                      <Gem className="w-10 h-10 luxury-text-gradient" />
                      <span className="luxury-text-gradient">{plan.name}</span>
                    </h3>
                    
                    <div className="mb-6">
                      <span 
                        className="text-6xl font-bold luxury-text-gradient"
                      >
                        {plan.price}
                      </span>
                      <span 
                        className="text-xl ml-2"
                        style={{ color: '#8B7355' }}
                      >
                        {plan.period}
                      </span>
                    </div>
                    
                    {/* Highlights premium */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                      {plan.highlights.map((highlight, index) => (
                        <span 
                          key={index} 
                          className="px-4 py-2 rounded-full text-sm font-bold border-2 shimmer-effect"
                          style={{ 
                            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                            color: '#000',
                            borderColor: '#FF8C00',
                            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)'
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Lista de características premium */}
                  <ul className="space-y-5 mb-10">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span 
                          className="mr-4 mt-1 flex-shrink-0 p-1 rounded-full"
                          style={{ 
                            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                            color: '#000'
                          }}
                        >
                          <Check className="w-4 h-4" />
                        </span>
                        <span 
                          className="text-sm leading-relaxed font-medium"
                          style={{ color: '#2C2C2C' }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Garantía premium */}
                  <div 
                    className="rounded-xl p-6 mb-8 border-2 shimmer-effect"
                    style={{ 
                      background: 'linear-gradient(135deg, #F5F1EC, #E8DDD4)',
                      borderColor: '#D4A574',
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div 
                      className="flex items-center gap-3 text-sm font-bold mb-2"
                      style={{ color: '#2C2C2C' }}
                    >
                      <Shield className="w-5 h-5" />
                      <Crown className="w-4 h-4" />
                      Garantía Premium de Satisfacción
                    </div>
                    <p 
                      className="text-xs font-medium"
                      style={{ color: '#8B7355' }}
                    >
                      Experiencia profesional. Tu satisfacción está garantizada
                    </p>
                  </div>
                  
                  {/* Botón principal dramático */}
                  <button
                    onClick={handleSelectPlan}
                    className="w-full text-white py-5 px-8 rounded-full font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-2xl transform hover:scale-105 mb-6 shimmer-effect"
                    style={{ 
                      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2C2C2C 100%)',
                      border: '2px solid #FFD700',
                      boxShadow: '0 15px 35px rgba(255, 215, 0, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)';
                      e.currentTarget.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2C2C2C 100%)';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    🌟 Activar LIA Esencial 🌟
                  </button>
                  
                  {/* Información adicional */}
                  <p 
                    className="text-center text-xs font-medium"
                    style={{ color: '#8B7355' }}
                  >
                    ✨ Acceso inmediato • Sin permanencia • Acceso 24/7 ✨
                  </p>
                </div>
              </div>
            </div>
            
            {/* Beneficios premium */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '⚡', title: 'Transformación Instantánea', desc: 'Resultados desde el primer día con LIA' },
                { icon: '👑', title: 'Experiencia VIP', desc: 'Tratamiento exclusivo y personalizado' },
                { icon: '💎', title: 'Valor Incomparable', desc: 'Inversión que se paga sola en confianza' }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="text-center p-8 backdrop-blur-sm rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:scale-105 shimmer-effect"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(245, 241, 236, 0.15) 0%, rgba(232, 221, 212, 0.1) 100%)',
                    borderColor: '#D4A574',
                    boxShadow: '0 10px 30px rgba(212, 165, 116, 0.2)'
                  }}
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ 
                      background: 'linear-gradient(135deg, #D4A574, #8B7355)',
                      boxShadow: '0 8px 25px rgba(212, 165, 116, 0.4)'
                    }}
                  >
                    <span className="text-3xl">{benefit.icon}</span>
                  </div>
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ color: '#D4A574' }}
                  >
                    {benefit.title}
                  </h3>
                  <p style={{ color: '#F5F1EC' }}>
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Call to action final */}
            <div className="mt-16 text-center">
              <a 
                href="#como-funciona" 
                className="inline-flex items-center text-xl text-white font-bold hover:underline transition-all duration-300 luxury-text-gradient hover:scale-105"
              >
                ✨ Descubre la magia de LIA ✨ <ChevronRight className="ml-2 w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}