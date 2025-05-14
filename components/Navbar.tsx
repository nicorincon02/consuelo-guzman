'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search } from 'lucide-react';

// Definir interfaces para TypeScript
interface NavLinkSubmenu {
  title: string;
  hasSubmenu: boolean;
  submenu?: string[]; // Hacemos submenu opcional con ?
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

  // Menú de navegación con tipo definido
  const navLinks: NavLinkSubmenu[] = [
    { 
      title: 'Home', 
      hasSubmenu: false
    },
    { 
      title: 'Servicios', 
      hasSubmenu: true, 
      submenu: ['Asesoría Personal', 'Renovación de Closet', 'Compras Inteligentes'] 
    },
    { 
      title: 'Blog', 
      hasSubmenu: true, 
      submenu: ['Tendencias', 'Consejos', 'Inspiración'] 
    },
    { 
      title: 'Sobre LIA', 
      hasSubmenu: true,
      submenu: ['Nuestra Misión', 'Equipo', 'Tecnología']
    },
    { 
      title: 'Recursos', 
      hasSubmenu: true, 
      submenu: ['Guías de Estilo', 'Color Quiz', 'Body Type Guide'] 
    },
    { 
      title: 'Contacto', 
      hasSubmenu: false 
    },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo y Ubicación */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Cali/Colombia</span>
                  <span className="text-2xl font-bold">
                    <span className="text-3xl">L</span>
                    <span>IA</span>
                  </span>
                </div>
                <div className="text-xs text-gray-600 ml-6">Asistente de Moda Virtual</div>
              </div>
            </div>

            {/* Menú de navegación - Desktop */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {navLinks.map((link, index) => (
                  <div key={index} className="relative group">
                    <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-800 transition-colors">
                      {link.title}
                      {link.hasSubmenu && <ChevronDown className="ml-1 h-4 w-4" />}
                    </button>
                    
                    {link.hasSubmenu && link.submenu && ( // Validar que submenu exista
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
              <div className="flex items-center space-x-1">
                <a href="#" className="text-gray-700 hover:text-amber-800 p-1">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-700 hover:text-amber-800 p-1">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
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
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-2">Cali/Colombia</span>
              <span className="text-2xl font-bold text-amber-800">
                LIA
              </span>
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
              <div className="ml-2 flex items-center space-x-1">
                <a href="#" className="text-gray-700 hover:text-amber-800 p-1">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-700 hover:text-amber-800 p-1">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contenido principal del menú móvil - Adaptado a los colores de la imagen */}
          <div className="h-full overflow-y-auto bg-amber-50">
            {/* Welcome message */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-amber-900 mb-4">Bienvenido a LIA</h2>
              
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
                      className="flex justify-between items-center text-xl font-medium text-amber-900"
                      onClick={() => {
                        if (link.hasSubmenu) {
                          const submenu = document.getElementById(`mobile-submenu-${index}`);
                          if (submenu) {
                            submenu.classList.toggle('hidden');
                          }
                        }
                      }}
                    >
                      <span>{link.title}</span>
                      {link.hasSubmenu && (
                        <ChevronDown className="h-5 w-5 text-amber-700" />
                      )}
                    </div>
                    
                    {link.hasSubmenu && link.submenu && ( // Validar que submenu exista
                      <div id={`mobile-submenu-${index}`} className="hidden mt-2 space-y-2 pl-2">
                        {link.submenu.map((item, subIndex) => (
                          <a
                            key={subIndex}
                            href="#"
                            className="block py-2 text-amber-800 hover:text-amber-600"
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
            
            {/* Footer del menú móvil */}
            <div className="absolute bottom-0 w-full p-4 bg-white border-t border-amber-200 flex justify-between items-center text-xs text-gray-500">
              <span>LIA</span>
              <span>lia.fashion.ai</span>
              <button className="p-1 text-amber-800"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;