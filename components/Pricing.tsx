"use client";

import { useState } from "react";
import { ChevronRight, Check, Shield, Crown, Zap, Gem  } from "lucide-react";
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
            
            {/* Header con imagen en lugar de texto */}
            <div className="text-center mb-16">
              <div className="relative w-full max-w-4xl mx-auto mb-8">
                {/* Contenedor de la imagen con efectos estéticos */}
                <div className="relative rounded-3xl overflow-hidden">
                  <Image
                    src="/pricing.png" 
                    alt="Plan Exclusivo LIA"
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>          
              </div>
            </div>
            
            {/* Plan único con efectos premium */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <div 
                  className="relative rounded-3xl p-10 transition-all shadow-2xl backdrop-blur-sm transform hover:scale-105 shimmer-effect"
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
                    
                    {/* Precio con layout responsive corregido */}
                    <div className="mb-6">
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                        <span 
                          className="text-4xl sm:text-6xl font-bold luxury-text-gradient"
                        >
                          {plan.price}
                        </span>
                        <span 
                          className="text-lg sm:text-xl"
                          style={{ color: '#8B7355' }}
                        >
                          {plan.period}
                        </span>
                      </div>
                    </div>
                    
                   {/* Highlights premium */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                      {plan.highlights.map((highlight, index) => (
                        <span 
                          key={index} 
                          className="px-4 py-2 rounded-full text-sm font-bold shimmer-effect"
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
                      borderColor: '#8A6D5B',
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
                    onClick={openRegistrationModal} 
                    className="w-full text-white py-5 px-8 rounded-full font-bold text-xl transition-all duration-500 shadow-lg transform hover:scale-105 mb-6"
                    style={{
                      background: 'linear-gradient(to right, #8A6D5B, #4B3F36)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
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
                { icon: <Zap className="w-8 h-8 text-stone-500"/>, title: 'Transformación Instantánea', desc: 'Resultados desde el primer día con LIA' },
                { icon: <Crown className="w-8 h-8 text-stone-500"/>, title: 'Experiencia VIP', desc: 'Vivencia personalizada y exclusiva' },
                { icon: <Gem className="w-8 h-8 text-stone-500"/>, title: 'Valor Incomparable', desc: 'Un asesor de imagen 24/7' }
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="text-center p-8 backdrop-blur-sm rounded-2xl transition-all duration-500 hover:shadow-2xl hover:scale-105"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.4)',
                    borderColor: '',
                    boxShadow: '0 10px 30px rgba(212, 165, 116, 0.2)'
                  }}
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                    style={{ 
                      background: '#E2D8CD',
                    }}
                  >
                    <span className="text-3xl">{benefit.icon}</span>
                  </div>
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ color: '#4B3F36' }}
                  >
                    {benefit.title}
                  </h3>
                  <p style={{ color: '#4B3F36' }}>
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}