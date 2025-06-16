'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';

// Definir interfaces para TypeScript
interface NavLinkSubmenu {
  title: string;
  hasSubmenu: boolean;
  submenu?: string[];
  href: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Manejar el estado del navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Controlar el body overflow cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Función para manejar la navegación suave
  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // Navegación interna con scroll suave
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Navegación externa
      window.open(href, '_blank', 'noopener,noreferrer');
    }
    // Cerrar menú móvil si está abierto
    setIsOpen(false);
  };

  // Menú de navegación con tipo definido
  const navLinks: NavLinkSubmenu[] = [
    { 
      title: 'Home', 
      hasSubmenu: false,
      href: '#hero'
    },
    { 
      title: 'Planes y servicios', 
      hasSubmenu: false,
      href: '#pricing'
    },
    { 
      title: 'Sobre LIA', 
      hasSubmenu: false,
      href: '#sobre-lia'      
    },
    { 
      title: 'Consuelo Guzmán', 
      hasSubmenu: false,
      href: 'https://consueloguzman.com/'
    },
    { 
      title: 'Contacto', 
      hasSubmenu: false,
      href: '#contacto'
    },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo y Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div 
                  className="flex items-center cursor-pointer group" 
                  onClick={() => handleNavigation('#hero')}
                >
                  {/* Contenedor del logo con texto descriptivo */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Asistente virtual</span>
                    
                    {/* Logo y nombre combinados */}
                    <div className="flex items-center">
                      <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                        <Image
                          src="/LIA-color.png"
                          alt="LIA - Asistente Virtual de Moda"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                      <span className="text-3xl lia-logo transition-colors duration-300 group-hover:text-amber-700">
                        LIA
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Crédito del creador */}
                <a 
                  href="https://consueloguzman.com/" 
                  className="text-xs text-gray-600 ml-16 hover:text-amber-800 transition-colors cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  By Consuelo Guzmán
                </a>
              </div>
            </div>

            {/* Menú de navegación - Desktop */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {navLinks.map((link, index) => (
                  <div key={index} className="relative group">
                    <button 
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-800 transition-colors"
                      onClick={() => handleNavigation(link.href)}
                    >
                      {link.title}
                      {link.hasSubmenu && <ChevronDown className="ml-1 h-4 w-4" />}
                    </button>
                    
                    {link.hasSubmenu && link.submenu && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="py-1">
                          {link.submenu.map((item, subIndex) => (
                            <a
                              key={subIndex}
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-amber-800"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de Navbar Mobile y Desktop */}
            <div className="flex items-center">
              {/* Botón de Menú (solo móvil) */}
              <div className="md:hidden mr-2">
                <button
                  onClick={() => setIsOpen(true)}
                  className="rounded-full bg-amber-100 px-4 py-1 text-amber-900 font-medium text-sm hover:bg-amber-200 transition-colors focus:outline-none"
                >
                  Menú
                </button>
              </div>
              
              {/* Iconos sociales (ambas vistas) */}
              <div className="flex items-center space-x-2">
                <a 
                  href="https://www.instagram.com/consueloguzmanoficial/" 
                  className="text-gray-700 hover:text-amber-800 p-1 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Síguenos en Instagram"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.youtube.com/@consuelopersonalshop" 
                  className="text-gray-700 hover:text-amber-800 p-1 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suscríbete a nuestro canal de YouTube"
                >
                  <FaYoutube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú móvil fullscreen - se superpone en la pantalla */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Header del menú */}
          <div className="bg-white p-4 flex items-center justify-between shadow-md">
            {/* Logo móvil */}
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-3">Popayán/Colombia</span>
              <div 
                className="flex items-center cursor-pointer space-x-2"
                onClick={() => handleNavigation('#hero')}
              >
                <div className="relative w-8 h-8">
                  <Image
                    src="/LIA-color.png"
                    alt="LIA Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl text-amber-800 lia-logo">
                  LIA
                </span>
              </div>
            </div>
            
            {/* Botón de cerrar */}
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-gray-300 px-4 py-1 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors focus:outline-none"
              >
                Cerrar
              </button>
              
              {/* Iconos sociales */}
              <div className="ml-2 flex items-center space-x-2">
                <a 
                  href="https://www.instagram.com/consueloguzmanoficial/" 
                  className="text-gray-700 hover:text-amber-800 p-1 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Síguenos en Instagram"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.youtube.com/@consuelopersonalshop" 
                  className="text-gray-700 hover:text-amber-800 p-1 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suscríbete a nuestro canal de YouTube"
                >
                  <FaYoutube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Contenido principal del menú móvil */}
          <div className="h-full overflow-y-auto bg-amber-50">
            {/* Welcome message */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-4">
                Bienvenido a <span className="text-amber-800 lia-logo">LIA</span>
              </h2>
              
              {/* Search bar */}
              <div className="relative w-full mb-8">
                <input
                  type="text"
                  placeholder="Buscar aquí..."
                  className="w-full bg-white text-gray-800 rounded-full py-2 px-4 pl-4 pr-10 focus:outline-none border border-amber-200"
                />
                <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-amber-800">
                  <Search className="h-5 w-5" />
                </button>
              </div>
              
              {/* Menu links */}
              <nav className="space-y-1">
                {navLinks.map((link, index) => (
                  <div key={index} className="border-b border-amber-200 py-3">
                    <div 
                      className="flex justify-between items-center text-xl font-medium text-amber-900 cursor-pointer"
                      onClick={() => handleNavigation(link.href)}
                    >
                      <span>{link.title}</span>
                      {link.hasSubmenu && (
                        <ChevronDown className="h-5 w-5 text-amber-700" />
                      )}
                    </div>
                    
                    {link.hasSubmenu && link.submenu && (
                      <div id={`mobile-submenu-${index}`} className="hidden mt-2 space-y-2 pl-2">
                        {link.submenu.map((item, subIndex) => (
                          <a
                            key={subIndex}
                            href="#"
                            className="block py-2 text-amber-800 hover:text-amber-600 transition-colors"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            
            {/* Footer del menú móvil con logo */}
            <div className="absolute bottom-0 w-full p-4 bg-white border-t border-amber-200 flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="relative w-4 h-4">
                  <Image
                    src="/LIA-color.png"
                    alt="LIA Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-amber-800 lia-logo text-base">LIA</span>
              </div>
              <a 
                href="https://consueloguzman.com" 
                className="hover:text-amber-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                lia.fashion.ai
              </a>
              <button className="p-1 text-amber-800">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;