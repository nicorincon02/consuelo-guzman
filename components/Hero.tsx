// app/components/Hero.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export default function Hero() {
  const tips = [
    "Combina estos jeans con una blusa blanca",
    "Prueba accesorios dorados para resaltar tu look",
    "Este vestido va perfecto con botas altas",
  ];
  const positions = [
    { top: "20%", left: "45%" },
    { top: "45%", left: "48%" },
    { top: "30%", left: "43%" },
  ];

  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => {
    const iv = setInterval(
      () => setTipIndex((i) => (i + 1) % tips.length),
      3500
    );
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #E2D8CD 0%, #F5F1EC 100%)",
      }}
      className="
        relative overflow-hidden
        flex flex-col-reverse lg:flex-row
        items-center justify-center
        gap-12 lg:gap-80
        px-6 lg:px-16 py-32
      "
    >
      {/* 1) Línea decorativa a lo largo */}
      <div className="absolute inset-0 pointer-events-none -z-0">
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

      {/* 2) BURBUJAS: ocultas en mobile, visibles md+ */}
      {tips.map((tip, i) => (
        <div
          key={i}
          className="hidden md:block absolute transition-opacity duration-800 ease-in-out"
          style={{
            top: positions[i].top,
            left: positions[i].left,
            opacity: i === tipIndex ? 1 : 0,
          }}
        >
          <div
            style={{ backgroundColor: "rgba(245,241,236,0.8)" }}
            className="px-4 py-2 rounded-full shadow-lg text-sm"
          >
            <span style={{ color: "#4B3F36" }}>{tip}</span>
          </div>
        </div>
      ))}

      {/* 3) TEXTO + CTA */}
      <div className="relative z-10 max-w-md lg:max-w-lg text-center lg:text-left space-y-6">
        <h1
          style={{ color: "#4B3F36" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
        >
          Tu estilista <br />
          virtual AI<br />
          para tu closet
        </h1>
        <p
          style={{ color: "rgba(75,63,54,0.8)" }}
          className="text-lg"
        >
          Habla con Consuelo AI y recibe recomendaciones personalizadas
          para cada prenda de tu armario.
        </p>
        <a
          href="#chat"
          style={{ backgroundColor: "#8A6D5B", color: "#ffffff" }}
          className="inline-flex items-center font-medium px-6 py-3 rounded-full shadow-md hover:opacity-90 transition"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Habla con Consuelo AI
        </a>
      </div>

      {/* 4) AVATAR */}
      <div className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64">
        <Image
          src="/avatar.png"
          alt="Avatar estilista"
          fill
          className="object-cover rounded-full shadow-xl"
        />
      </div>
    </section>
  );
}
