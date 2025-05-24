"use client";

import { useState } from "react";
import { ChevronRight, Check } from "lucide-react";

// Definir tipos para mayor seguridad y documentación
type PlanId = 'basic' | 'standard' | 'premium';

interface Plan {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  features: string[];
}

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Básico',
      price: '15 €',
      period: '/mes',
      features: [
        'Armario cápsula básico',
        '5 looks semanales',
        'Soporte por WhatsApp'
      ]
    },
    {
      id: 'standard',
      name: 'Estándar',
      price: '25 €',
      period: '/mes',
      features: [
        'Armario cápsula personalizado',
        '10 looks semanales',
        'Soporte 24/7 por WhatsApp',
        'Análisis de colorimetría'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '35 €',
      period: '/mes',
      features: [
        'Armario cápsula premium',
        'Looks ilimitados',
        'Soporte prioritario 24/7',
        'Análisis de colorimetría avanzado',
        'Asesoría personalizada en video'
      ]
    }
  ];
  
  const handleSelectPlan = (id: PlanId): void => {
    setSelectedPlan(id);
    // Aquí podríamos añadir lógica para redirigir a página de pago
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden w-full min-h-screen flex items-center"
      style={{ backgroundColor: '#2f003f' }}
    >
      {/* Contenido principal con padding */}
      <div className="relative z-20 px-6 lg:px-16 py-12 md:py-16 lg:py-24 w-full">
      {/* Líneas decorativas con contraste para el fondo morado */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-purple-300/20" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-purple-300/20" />

      {/* Patrón decorativo de fondo */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-purple-200 rounded-full"></div>
        <div className="absolute top-60 right-20 w-24 h-24 border border-purple-200 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 border border-purple-200 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Planes
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-purple-100">
            Elige el plan que mejor se adapte a tus necesidades de estilo y presupuesto
          </p>
        </div>
        
        {/* Versión móvil: Cards verticales */}
        <div className="md:hidden space-y-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`border rounded-xl p-6 transition-all shadow-lg backdrop-blur-sm ${
                selectedPlan === plan.id 
                  ? 'border-amber-400 shadow-2xl ring-2 ring-amber-400/50 bg-white/95' 
                  : 'border-purple-200/30 hover:border-purple-200/50 hover:shadow-xl bg-white/90 hover:bg-white/95'
              }`}
            >
              <h3 className="text-2xl font-bold text-purple-900">{plan.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-4xl font-bold text-amber-600">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-emerald-600 mr-2 mt-0.5">
                      <Check className="w-4 h-4" />
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 px-6 rounded-full font-medium transition-all duration-200 ${
                  selectedPlan === plan.id 
                    ? 'bg-amber-600 text-white shadow-lg hover:bg-amber-700 transform hover:scale-105' 
                    : 'bg-purple-700 text-white hover:bg-purple-600 shadow-md transform hover:scale-105'
                }`}
              >
                Elegir plan
              </button>
            </div>
          ))}
        </div>
        
        {/* Versión desktop: Cards horizontales */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={`relative border rounded-xl p-8 transition-all flex flex-col shadow-lg backdrop-blur-sm ${
                selectedPlan === plan.id 
                  ? 'border-amber-400 shadow-2xl ring-2 ring-amber-400/50 transform scale-105 bg-white/95' 
                  : 'border-purple-200/30 hover:border-purple-200/50 hover:shadow-xl hover:transform hover:scale-102 bg-white/90 hover:bg-white/95'
              } ${index === 1 ? 'md:scale-105 md:shadow-xl md:ring-2 md:ring-purple-300/30' : ''}`}
            >
              {/* Badge para plan recomendado */}
              {index === 1 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-lg">
                    Más Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-purple-900">{plan.name}</h3>
              <div className="mt-2 mb-6">
                <span className="text-4xl font-bold text-amber-600">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-emerald-600 mr-2 mt-0.5">
                      <Check className="w-4 h-4" />
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 px-6 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                  selectedPlan === plan.id 
                    ? 'bg-amber-600 text-white shadow-lg hover:bg-amber-700' 
                    : index === 1
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-md'
                    : 'bg-purple-700 text-white hover:bg-purple-600 shadow-md'
                }`}
              >
                Elegir plan
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <a 
            href="#como-funciona" 
            className="flex items-center text-lg font-medium hover:underline text-purple-100 hover:text-white transition-colors duration-200"
          >
            ¿Cómo funciona? <ChevronRight className="ml-1 w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
    </section>
  );
}