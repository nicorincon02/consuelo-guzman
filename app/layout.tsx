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
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "LIA | Asistente Virtual de Moda",
  description:
    "LIA es tu asistente virtual de moda que te ayuda a mejorar tu vestuario y estilo personal mediante recomendaciones personalizadas.",
  keywords: [
    "asistente virtual",
    "moda",
    "estilo personal",
    "asesoría de imagen",
    "inteligencia artificial",
    "closet",
    "vestuario"
  ],
  authors: [{ name: "Consuelo Guzmán" }],
  creator: "Consuelo Guzmán",
  publisher: "LIA Fashion AI",
  
  // Configuración completa de iconos usando TUS archivos existentes
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  
  // Meta tags para redes sociales usando tus recursos
  openGraph: {
    title: "LIA | Asistente Virtual de Moda",
    description: "Tu asistente personal de moda disponible 24/7",
    url: "https://lia-fashion.ai",
    siteName: "LIA Fashion AI",
    images: [
      {
        url: "/LIA-background.png", // Usando tu imagen existente
        width: 1200,
        height: 630,
        alt: "LIA - Asistente Virtual de Moda",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "LIA | Asistente Virtual de Moda",
    description: "Tu asistente personal de moda disponible 24/7",
    images: ["/LIA-background.png"], // Usando tu imagen existente
    creator: "@lia_fashion_ai",
  },
  
  // PWA y manifest
  manifest: "/manifest.json",
  
  // Configuración adicional
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verificación de sitio
  verification: {
    google: "tu-codigo-de-verificacion-google",
    yandex: "tu-codigo-de-verificacion-yandex",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* Pre-conectar a dominios externos para mejor performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        
        {/* Configuración de viewport mejorada */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Configuración de tema para navegadores móviles */}
        <meta name="theme-color" content="#8A6D5B" />
        <meta name="msapplication-TileColor" content="#8A6D5B" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${plusJakartaSans.className} antialiased`}>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}