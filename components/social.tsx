import React from 'react';
import { Instagram, Youtube } from 'lucide-react';

const SocialSignatureSection = () => {
  return (
    <div className="w-full bg-black py-3 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        {/* Botón de Instagram - Lado izquierdo en desktop, arriba en móvil */}
        <div className="w-full sm:w-1/4 flex justify-center sm:justify-start mb-3 sm:mb-0">
          <a 
            href="https://instagram.com/consueloai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg px-4 py-2 hover:opacity-90 transition-opacity"
          >
            <Instagram size={24} className="mr-2" />
            <span className="font-medium">Instagram</span>
          </a>
        </div>
        
        {/* Firma en el centro */}
        <div className="w-full sm:w-2/4 flex justify-center my-3 sm:my-0">
          <img 
            src="/api/placeholder/200/70" 
            alt="Firma de Consuelo AI" 
            className="h-12 object-contain"
          />
        </div>
        
        {/* Botón de YouTube - Lado derecho en desktop, abajo en móvil */}
        <div className="w-full sm:w-1/4 flex justify-center sm:justify-end mt-3 sm:mt-0">
          <a 
            href="https://youtube.com/consueloai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-red-600 text-white rounded-lg px-4 py-2 hover:opacity-90 transition-opacity"
          >
            <Youtube size={24} className="mr-2" />
            <span className="font-medium">YouTube</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialSignatureSection;