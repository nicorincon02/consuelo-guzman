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
      data-bg="white"
      className="relative overflow-hidden px-6 lg:px-16 py-12 md:py-16 lg:py-24 w-full bg-white"
    >
      {/* Línea superior e inferior */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gray-200" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-200" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800"
          >
            Planes
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto text-gray-600"
          >
            Elige el plan que mejor se adapte a tus necesidades de estilo y presupuesto
          </p>
        </div>
        
        {/* Versión móvil: Cards verticales */}
        <div className="md:hidden space-y-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`border rounded-xl p-6 transition-all bg-white shadow-sm ${
                selectedPlan === plan.id 
                  ? 'border-amber-800 shadow-lg ring-2 ring-amber-100' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <h3 className="text-2xl font-bold text-amber-900">{plan.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-4xl font-bold text-amber-800">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2 mt-0.5">
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
                    ? 'bg-amber-800 text-white shadow-lg hover:bg-amber-900' 
                    : 'bg-amber-700 text-white hover:bg-amber-800 shadow-md'
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
              className={`border rounded-xl p-8 transition-all flex flex-col bg-white shadow-sm ${
                selectedPlan === plan.id 
                  ? 'border-amber-800 shadow-lg ring-2 ring-amber-100 transform scale-105' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md hover:transform hover:scale-102'
              } ${index === 1 ? 'md:scale-105 md:shadow-lg' : ''}`} // Plan destacado (Standard)
            >
              {/* Badge para plan recomendado */}
              {index === 1 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Más Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-amber-900">{plan.name}</h3>
              <div className="mt-2 mb-6">
                <span className="text-4xl font-bold text-amber-800">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-green-600 mr-2 mt-0.5">
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
                    ? 'bg-amber-800 text-white shadow-lg hover:bg-amber-900' 
                    : index === 1
                    ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-md'
                    : 'bg-amber-700 text-white hover:bg-amber-800 shadow-md'
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
            className="flex items-center text-lg font-medium hover:underline text-amber-800 transition-colors duration-200"
          >
            ¿Cómo funciona? <ChevronRight className="ml-1 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}