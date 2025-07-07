// components/RegistrationModal.tsx
"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { X, User, Mail, MessageCircle, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import Image from 'next/image';

// Context para el modal
interface ModalContextType {
  isOpen: boolean;
  modalType: string;
  openModal: (type?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

// Hook personalizado para usar el modal
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal debe usarse dentro de ModalProvider');
  }
  return context;
};

// Provider del modal
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('registration');

  const openModal = (type = 'registration') => {
    setModalType(type);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, modalType, openModal, closeModal }}>
      {children}
      {isOpen && <RegistrationModal />}
    </ModalContext.Provider>
  );
};

// Interface para el formulario
interface FormData {
  nombre: string;
  email: string;
  telefono: string;
}

// Componente principal del modal
const RegistrationModal: React.FC = () => {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Validación del formulario
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envío del formulario
  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    try {
      // Guardar datos en la base de datos
      await fetch('https://script.google.com/macros/s/AKfycby0P7riBgH07kmJpEws37fqNiOdlSBu-UTl1oDxvALajIhV5YSi4Rz3OSYIc9HNY789AA/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'landing-page'
        })
      });

      setStatus('success');

    } catch (error) {
      console.error('Error al guardar datos:', error);
      setStatus('error');
    }
  };

  // Función para abrir WhatsApp con mensaje predefinido
  const openWhatsApp = (): void => {
    const phoneNumber = "573166308080"; // Número de WhatsApp sin signos + ni espacios
    const message = `¡Hola! Soy ${formData.nombre} y quiero comenzar mi transformación de estilo con LIA 🌟\n\nMis datos de contacto:\n📧 ${formData.email}\n📱 ${formData.telefono}\n\n¿Podemos empezar? ✨`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp en nueva pestaña
    window.open(whatsappURL, '_blank');
    
    // Cerrar modal después de abrir WhatsApp
    setTimeout(() => {
      closeModal();
      setStatus('idle');
      setFormData({
        nombre: '',
        email: '',
        telefono: ''
      });
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeModal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />
      
      <div className="relative w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all">
        
        {/* Header */}
        <div 
          className="px-6 py-4 border-b border-gray-100"
          style={{ 
            background: 'linear-gradient(to right, #FEF7ED, #FDF2F8)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(to bottom right, #F3E8FF, #FEF3C7)'
                }}
              >
                <div className="w-6 h-6 rounded-full border-2 border-gray-600 relative">
                <Image
                  src="/LIA-color.png"
                  alt="LIA Avatar"
                  width={40}
                  height={40}
                  style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                  }}
                />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Únete a <span className='lia-logo'>
                    LIA
                  </span>
                </h2>
                <p className="text-sm text-gray-600">Tu journey de estilo comienza aquí</p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-6 py-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">¡Perfecto! Datos guardados</h3>
              <p className="text-gray-600 mb-6">
                Ahora conectemos contigo en WhatsApp para comenzar tu transformación de estilo personal con LIA.
              </p>
              
              <button
                onClick={openWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
                <span className="text-lg">Comenzar en WhatsApp</span>
              </button>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-green-700">
                  <strong>🚀 ¡Tu journey comienza ahora!</strong> Te llevaremos a WhatsApp donde LIA te dará la bienvenida y comenzarás tu primer análisis de estilo.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-700">
                  ¡Bienvenida al futuro de la moda! Vamos a crear tu perfil para que 
                  <span className="lia-logo"> LIA </span>
                  pueda ayudarte de manera personalizada ✨
                </p>
              </div>

              {/* Campos del formulario */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Cómo te gusta que te llamen? *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                      errors.nombre ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Tu nombre favorito"
                  />
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tu email para actualizaciones *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="tu@email.com"
                  />
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp para conversar con LIA *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                      errors.telefono ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="+57 300 123 4567"
                  />
                  <MessageCircle className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
                {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">
                    Hubo un error al crear tu perfil. Por favor, intenta de nuevo.
                  </p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 px-6 rounded-lg font-medium hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Creando tu perfil...</span>
                  </>
                ) : (
                  <span>Comenzar con
                    <span className='lia-logo'> LIA </span>
                  </span>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Al crear tu perfil, aceptas que LIA guarde tu información para brindarte una experiencia personalizada. 
                Tu privacidad es importante para nosotros.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>100% Personalizado</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Resultados inmediatos</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Siempre disponible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hook para usar en componentes existentes
export const useRegistrationModal = () => {
  const { openModal } = useModal();
  return { openRegistrationModal: () => openModal('registration') };
};