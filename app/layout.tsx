// app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";

// Configuración de Plus Jakarta Sans con múltiples pesos
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",  
});

// Configuración de Great Vibes para la marca LIA
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"], // Great Vibes solo tiene peso 400
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "LIA | Asistente Virtual de Moda",
  description:
    "LIA es tu asistente virtual de moda que te ayuda a mejorar tu vestuario y estilo personal mediante recomendaciones personalizadas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} ${greatVibes.variable}`}>
      <body className={`${plusJakartaSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}