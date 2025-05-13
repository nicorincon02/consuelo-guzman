// app/components/AsesorImagenSection.tsx
"use client";

import React from "react";
import { UserCheck, TrendingUp, ThumbsUp } from "lucide-react";

export default function AsesorImagenSection() {
  return (
    <section
      data-bg="linear-gradient(to bottom, #FCE7F3, #FFFFFF)"
      className="relative overflow-hidden flex flex-col items-center py-16 px-6"
    >
      {/* Líneas */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gray-200" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-200" />

      <h2 className="text-4xl font-bold text-gray-800 mb-16 text-center">
        ¿Por qué contratar un asesor de imagen?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
        {/* Tarjeta 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-white p-4 rounded-md shadow-sm mb-4">
            <UserCheck size={28} className="text-gray-800" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Experiencia profesional personalizada
          </h3>
          <p className="text-gray-700">
            Nuestros asesores analizan tu morfología, colorimetría y estilo de
            vida para crear una imagen auténtica que potencia tu confianza.
            Transformamos tu guardarropa con selecciones que reflejan
            verdaderamente quién eres.
          </p>
        </div>

        {/* Tarjeta 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-white p-4 rounded-md shadow-sm mb-4">
            <TrendingUp size={28} className="text-gray-800" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Optimiza tu inversión en moda
          </h3>
          <p className="text-gray-700">
            Ahorra hasta un 40% en compras incorrectas con nuestra guía experta.
            Aprende a invertir en piezas versátiles y duraderas que multiplican
            las combinaciones de tu armario y maximizan el retorno de cada
            prenda.
          </p>
        </div>

        {/* Tarjeta 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-white p-4 rounded-md shadow-sm mb-4">
            <ThumbsUp size={28} className="text-gray-800" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Potencia tu imagen profesional
          </h3>
          <p className="text-gray-700">
            Tu imagen comunica antes que tus palabras. Estudios confirman que
            una imagen profesional coherente aumenta las oportunidades
            laborales y eleva la percepción de competencia en un 60%. Invierte
            en tu mejor presentación.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center max-w-2xl">
        <p className="text-gray-700 italic mb-6">
          "La moda pasa, el estilo permanece. Nuestros asesores no imponen
          tendencias, crean un estilo auténtico que perdura y evoluciona contigo."
        </p>
        <button className="bg-gray-800 text-white py-3 px-8 rounded-md hover:bg-gray-700 transition-colors">
          Agenda tu consulta inicial
        </button>
      </div>
    </section>
  );
}
