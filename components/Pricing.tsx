"use client";

import { useState } from "react";
import { ChevronRight, Check, Shield, Crown } from "lucide-react";
import { useRegistrationModal } from "./RegistrationModal";
import Image from "next/image";

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
    features: [
      'Análisis de estilo, visagismo, morfología y colorimetria',
      'Recomendaciones de 7 outfits semanales desde tu armario',
      'Propuestas personalizadas de compras de prendas y accesorios',
      'Respuesta a preguntas de estilo e imagen personal',
      'Servicio 24/7 por WhatsApp'
    ],
    highlights: [
      'Respaldado por Consuelo Guzmán'
    ]
  };
  
  const handleSelectPlan = (): void => {
    setSelectedPlan('esencial');
    openRegistrationModal();
  };

  return (
    <>
      <section
        id="pricing"
        className="relative overflow-hidden w-full min-h-screen flex items-center">

        {/* Contenido principal */}
        <div className="relative z-20 px-6 lg:px-16 py-12 md:py-16 lg:py-24 w-full">
          <div className="max-w-6xl mx-auto relative z-10">
            
            {/* 🎯 AQUÍ ES DONDE DEBES PONER TU IMAGEN */}
            {/* Header con imagen en lugar de texto */}
            <div className="text-center mb-16">
              <div className="relative w-full max-w-4xl mx-auto mb-8">
                {/* Contenedor de la imagen con efectos estéticos */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
                  <Image
                    src="/pricing.png" 
                    alt="Plan Exclusivo LIA"
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover"
                    style={{
                      filter: 'brightness(1.1) contrast(1.05) saturate(1.1)',
                    }}
                    priority
                  />
                  
                  {/* Overlay sutil para mejor legibilidad si hay texto superpuesto */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)'
                    }}
                  />
                  
                  {/* Marco decorativo opcional */}
                  <div 
                    className="absolute inset-0 rounded-3xl border-2"
                    style={{ 
                      borderColor: 'rgba(138, 109, 91, 0.3)',
                      background: 'linear-gradient(45deg, transparent, rgba(138, 109, 91, 0.1), transparent)'
                    }}
                  />
                </div>          
              </div>
            </div>
            
            {/* Plan único con efectos premium */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <div 
                  className="relative border-2 rounded-3xl p-10 transition-all shadow-2xl backdrop-blur-sm transform hover:scale-105 shimmer-effect"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 241, 236, 0.9) 100%)',
                  }}
                >
                  
                  {/* Header del plan */}
                  <div className="text-center mb-10">
                    <h3 
                      className="text-4xl font-bold mb-4 flex items-center justify-center gap-3"
                      style={{ color: '#2C2C2C' }}
                    >
                      {plan.name.includes('LIA') ? (
                        <>
                          <span className="lia-logo text-5xl luxury-text-gradient">{plan.name.split(' ')[0]}</span>
                          <span className="luxury-text-gradient">{' ' + plan.name.split(' ').slice(1).join(' ')}</span>
                        </>
                      ) : (
                        <span className="luxury-text-gradient">{plan.name}</span>
                      )}
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
                            background: 'linear-gradient(135deg, #8A6D5B, #4B3F36)',
                            color: '#fcfdfc',
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
                            background: 'linear-gradient(135deg, #efe9e3, #eee6e1)',
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
                      background: 'linear-gradient(to right, #8A6D5B, #4B3F36)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, #4B3F36, #8A6D5B)';
                      e.currentTarget.style.color = '#fffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, #8A6D5B, #4B3F36)';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Activar <span className="lia-logo">LIA</span> Esencial
                  </button>
                  
                  {/* Información adicional */}
                  <p 
                    className="text-center text-xs font-medium"
                    style={{ color: '#8B7355' }}
                  >
                    Acceso inmediato • Sin permanencia • Acceso 24/7
                  </p>
                </div>
              </div>
            </div>
            
            {/* Beneficios premium */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '⚡', title: 'Transformación Instantánea', desc: 'Resultados desde el primer día con LIA' },
                { icon: '👑', title: 'Experiencia VIP', desc: 'Vivencia personalizada y exclusiva' },
                { icon: '💎', title: 'Valor Incomparable', desc: 'Un asesor de imagen 24/7' }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="text-center p-8 backdrop-blur-sm rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:scale-105 shimmer-effect"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(245, 241, 236, 0.15) 0%, rgba(232, 221, 212, 0.1) 100%)',
                    borderColor: '',
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
                    style={{ color: '#000000' }}
                  >
                    {benefit.title}
                  </h3>
                  <p style={{ color: '#000000' }}>
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Call to action final */}
            <div className="mt-16 text-center">
              <a 
                href="#process-flow" 
                className="inline-flex items-center text-xl text-black font-bold hover:underline transition-all duration-300 luxury-text-gradient hover:scale-105" 
              >
                Descubre la magia de  <span className="lia-logo"> LIA </span> <ChevronRight className="ml-2 w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}