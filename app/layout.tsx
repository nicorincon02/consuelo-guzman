// app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/RegistrationModal";

// Configuración de Plus Jakarta Sans con múltiples pesos
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",  
});

// Configuración de Playfair Display para la marca LIA
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"], // Pesos disponibles
  variable: "--font-playfair-display",
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
    <html lang="es" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className={`${plusJakartaSans.className} antialiased`}>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}