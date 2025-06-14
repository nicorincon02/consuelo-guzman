// components/ContactoSection.tsx
"use client";

import React, { useState } from "react";
import { Mail, MessageCircle, MapPin, Clock, Send } from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { sectionBackgrounds } from "./sectionBackgrounds";
import { useRegistrationModal } from "./RegistrationModal";

export default function ContactoSection() {
  const { openRegistrationModal } = useRegistrationModal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí implementarías la lógica de envío del formulario
    console.log('Formulario enviado:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    alert('¡Mensaje enviado! Te contactaremos pronto.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section
      id="contacto"
      data-bg={sectionBackgrounds.footer}
      className="relative overflow-hidden py-16 px-6 lg:px-16"
    >
      {/* Líneas decorativas */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gray-200" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-200" />

      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-4">
            Contáctanos
          </h2>
          <p className="text-lg text-amber-800/80 max-w-2xl mx-auto">
            ¿Tienes preguntas sobre LIA? ¿Necesitas ayuda personalizada? Estamos aquí para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-6">
                Hablemos
              </h3>
              <p className="text-amber-800/80 mb-8">
                Estamos emocionados de conocerte y ayudarte en tu journey de estilo personal. 
                Elige la forma que prefieras para conectar con nosotros.
              </p>
            </div>

            {/* Métodos de contacto */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-amber-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1">Chat con LIA</h4>
                  <p className="text-amber-800/80 text-sm">
                    La forma más rápida de obtener respuestas. Disponible 24/7.
                  </p>
                  <button className="text-amber-700 font-medium text-sm mt-2 hover:text-amber-600 transition-colors">
                    Iniciar chat →
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-amber-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1">Email</h4>
                  <p className="text-amber-800/80 text-sm">
                    Para consultas detalladas y soporte técnico.
                  </p>
                  <a 
                    href="mailto:hola@lia-fashion.ai" 
                    className="text-amber-700 font-medium text-sm mt-2 hover:text-amber-600 transition-colors block"
                  >
                    hola@lia-fashion.ai
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-amber-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1">Horarios</h4>
                  <p className="text-amber-800/80 text-sm">
                    LIA: 24/7 disponible
                  </p>
                  <p className="text-amber-800/80 text-sm">
                    Soporte humano: Lun-Vie 9am-6pm COT
                  </p>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div>
              <h4 className="font-semibold text-amber-900 mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/consueloguzmanoficial/" 
                  className="bg-amber-100 p-3 rounded-lg hover:bg-amber-200 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Síguenos en Instagram"
                >
                  <FaInstagram className="h-6 w-6 text-amber-800" />
                </a>
                <a 
                  href="https://www.youtube.com/@consuelopersonalshop" 
                  className="bg-amber-100 p-3 rounded-lg hover:bg-amber-200 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suscríbete a nuestro canal de YouTube"
                >
                  <FaYoutube className="h-6 w-6 text-amber-800" />
                </a>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-amber-900 mb-6">
              Envíanos un mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80 transition-colors"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80 transition-colors"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-amber-900 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80 resize-none transition-colors"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Enviar mensaje</span>
              </button>
            </form>

            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Respuesta garantizada:</strong> Te responderemos en máximo 24 horas. 
                Para asistencia inmediata, usa el chat con LIA.
              </p>
            </div>
          </div>
        </div>

        {/* CTA final */}
        <div className="text-center mt-16 bg-gradient-to-r from-amber-100 to-amber-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-amber-900 mb-4">
            ¿Lista para transformar tu estilo?
          </h3>
          <p className="text-amber-800/80 mb-6 max-w-2xl mx-auto">
            Únete a miles de mujeres que ya descubrieron su mejor versión con LIA. 
            
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
            onClick={openRegistrationModal} 
            className="bg-amber-800 text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:bg-amber-700 transition-colors">
              Comienza ahora
            </button>
            <button className="border-2 border-amber-800 text-amber-800 px-8 py-4 rounded-full font-medium text-lg hover:bg-amber-800 hover:text-white transition-colors">
              Cómo funciona
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-amber-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-bold text-amber-900 mb-3">LIA</h4>
              <p className="text-amber-800/70 text-sm">
                Tu asistente virtual de moda, disponible 24/7 para ayudarte a descubrir tu mejor estilo.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-amber-900 mb-3">Enlaces rápidos</h4>
              <ul className="space-y-2 text-sm text-amber-800/70">
                <li><a href="#servicios" className="hover:text-amber-700">Servicios</a></li>
                <li><a href="#sobre-lia" className="hover:text-amber-700">Sobre LIA</a></li>
                <li><a href="https://consueloguzman.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-700">Consuelo Guzmán</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-amber-900 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-amber-800/70">
                <li><a href="#" className="hover:text-amber-700">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-amber-700">Términos de Servicio</a></li>
                <li><a href="#" className="hover:text-amber-700">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-amber-200 text-center">
            <p className="text-amber-800/70 text-sm">
              © 2025 LIA - Asistente Virtual de Moda. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}