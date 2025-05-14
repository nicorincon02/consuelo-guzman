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
      data-bg="linear-gradient(135deg, #F5F1EC 0%, #E2D8CD 100%)"
      className="relative overflow-hidden px-6 lg:px-16 py-12 md:py-16 lg:py-24 w-full"
    >
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

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            style={{ color: "#4B3F36" }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Planes
          </h2>
          <p 
            style={{ color: "rgba(75,63,54,0.8)" }}
            className="text-lg max-w-2xl mx-auto"
          >
            Elige el plan que mejor se adapte a tus necesidades de estilo y presupuesto
          </p>
        </div>
        
        {/* Versión móvil: Cards verticales */}
        <div className="md:hidden space-y-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`border rounded-xl p-6 transition-all ${
                selectedPlan === plan.id ? 'border-amber-800 bg-white bg-opacity-60' : 'border-gray-200 bg-white bg-opacity-40'
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
                    <span className="text-green-600 mr-2">
                      <Check className="w-5 h-5" />
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 px-6 rounded-full font-medium transition-colors ${
                  selectedPlan === plan.id 
                    ? 'bg-amber-800 text-white shadow-lg' 
                    : 'bg-amber-700 bg-opacity-80 text-white hover:bg-amber-800'
                }`}
              >
                Elegir plan
              </button>
            </div>
          ))}
        </div>
        
        {/* Versión desktop: Cards horizontales */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`border rounded-xl p-8 transition-all flex flex-col ${
                selectedPlan === plan.id 
                  ? 'border-amber-800 shadow-lg bg-white bg-opacity-60' 
                  : 'border-gray-200 bg-white bg-opacity-40'
              }`}
            >
              <h3 className="text-2xl font-bold text-amber-900">{plan.name}</h3>
              <div className="mt-2 mb-6">
                <span className="text-4xl font-bold text-amber-800">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">
                      <Check className="w-5 h-5" />
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 px-6 rounded-full font-medium transition-colors ${
                  selectedPlan === plan.id 
                    ? 'bg-amber-800 text-white shadow-lg' 
                    : 'bg-amber-700 bg-opacity-80 text-white hover:bg-amber-800'
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
            className="flex items-center text-lg font-medium hover:underline text-amber-800"
          >
            ¿Cómo funciona? <ChevronRight className="ml-1 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}