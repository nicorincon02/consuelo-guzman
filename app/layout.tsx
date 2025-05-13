// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ColorProvider from "@/components/ColorProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Consuelo Guzmán | Servicios Profesionales",
  description:
    "Consuelo Guzmán ofrece servicios profesionales personalizados que transforman la apariencia y confianza de sus clientes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ColorProvider>{children}</ColorProvider>
      </body>
    </html>
  );
}
