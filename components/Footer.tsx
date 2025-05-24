"use client";

import React from "react";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { sectionBackgrounds } from "./sectionBackgrounds";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://instagram.com/lia.fashion.ai",
      label: "Instagram"
    },
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "https://facebook.com/lia.fashion.ai",
      label: "Facebook"
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      href: "https://twitter.com/lia_fashion_ai",
      label: "Twitter"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:hola@lia.fashion.ai",
      label: "Email"
    }
  ];

  const footerSections: FooterSection[] = [
    {
      title: "Servicios",
      links: [
        { label: "Asesoría Personal", href: "#asesoria" },
        { label: "Renovación de Closet", href: "#renovacion" },
        { label: "Compras Inteligentes", href: "#compras" },
        { label: "Análisis de Colorimetría", href: "#colorimetria" }
      ]
    },
    {
      title: "Recursos",
      links: [
        { label: "Guías de Estilo", href: "#guias" },
        { label: "Blog de Moda", href: "#blog" },
        { label: "Test de Estilo", href: "#test" },
        { label: "Tendencias", href: "#tendencias" }
      ]
    },
    {
      title: "Soporte",
      links: [
        { label: "Centro de Ayuda", href: "#ayuda" },
        { label: "Contacto", href: "#contacto" },
        { label: "Preguntas Frecuentes", href: "#faq" },
        { label: "Chat en Vivo", href: "#chat" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Términos de Servicio", href: "#terminos" },
        { label: "Política de Privacidad", href: "#privacidad" },
        { label: "Cookies", href: "#cookies" },
        { label: "Cancelación", href: "#cancelacion" }
      ]
    }
  ];

  return (
    <footer
      data-bg={sectionBackgrounds.footer}
      className="relative w-full"
    >
      {/* Línea superior */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gray-200" />
      
      {/* Contenido principal del footer */}
      <div className="px-6 lg:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Grid principal: Logo + Enlaces */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            
            {/* Sección de la marca - Ocupa 2 columnas en desktop */}
            <div className="lg:col-span-2 space-y-4">
              {/* Logo y descripción */}
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold">
                  <span 
                    className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-amber-800 to-amber-500"
                  >
                    L
                  </span>
                  <span style={{ color: "#4B3F36" }}>IA</span>
                </span>
                <div className="ml-2 text-xs text-gray-600">
                  Asistente virtual
                </div>
              </div>
              
              <p 
                style={{ color: "rgba(75,63,54,0.8)" }}
                className="text-sm max-w-md leading-relaxed"
              >
                Tu asistente personal de moda que te ayuda a mejorar tu estilo 
                mediante recomendaciones personalizadas e inteligencia artificial.
              </p>
              
              {/* Información de contacto */}
              <div className="space-y-2 text-sm" style={{ color: "rgba(75,63,54,0.7)" }}>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Popayán, Cauca, Colombia</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a 
                    href="mailto:hola@lia.fashion.ai" 
                    className="hover:text-amber-800 transition-colors"
                  >
                    hola@lia.fashion.ai
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>WhatsApp disponible 24/7</span>
                </div>
              </div>
              
              {/* Redes sociales */}
              <div className="flex space-x-4 pt-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-2 rounded-full bg-white bg-opacity-60 hover:bg-opacity-100 transition-all duration-300 hover:scale-105 shadow-sm"
                    style={{ color: "#8A6D5B" }}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Enlaces organizados - Ocupa 3 columnas en desktop */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
              {footerSections.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h3 
                    className="font-semibold text-sm uppercase tracking-wide"
                    style={{ color: "#4B3F36" }}
                  >
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-sm transition-colors hover:text-amber-800"
                          style={{ color: "rgba(75,63,54,0.7)" }}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Separador */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div 
                className="text-sm text-center md:text-left"
                style={{ color: "rgba(75,63,54,0.6)" }}
              >
                <p>
                  © {currentYear} LIA - Asistente Virtual de Moda. 
                  Todos los derechos reservados.
                </p>
                <p className="mt-1">
                  Desarrollado por{" "}
                  <span 
                    className="font-medium hover:text-amber-800 transition-colors"
                    style={{ color: "#8A6D5B" }}
                  >
                    Consuelo Guzmán
                  </span>
                </p>
              </div>
              
              {/* Enlaces legales adicionales */}
              <div className="flex space-x-6 text-sm">
                <a 
                  href="#privacidad" 
                  className="transition-colors hover:text-amber-800"
                  style={{ color: "rgba(75,63,54,0.6)" }}
                >
                  Privacidad
                </a>
                <a 
                  href="#terminos" 
                  className="transition-colors hover:text-amber-800"
                  style={{ color: "rgba(75,63,54,0.6)" }}
                >
                  Términos
                </a>
                <a 
                  href="#cookies" 
                  className="transition-colors hover:text-amber-800"
                  style={{ color: "rgba(75,63,54,0.6)" }}
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}