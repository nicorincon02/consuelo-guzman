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
      const response = await fetch('https://script.google.com/macros/s/AKfycby0P7riBgH07kmJpEws37fqNiOdlSBu-UTl1oDxvALajIhV5YSi4Rz3OSYIc9HNY789AA/exec', {
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
      
      // Cerrar modal después de 3 segundos
      setTimeout(() => {
        closeModal();
        setStatus('idle');
        setFormData({
          nombre: '',
          email: '',
          telefono: ''
        });
      }, 3000);

    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setStatus('error');
    }
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
              <h3 className="text-xl font-bold text-gray-800 mb-2">¡Registro exitoso!</h3>
              <p className="text-gray-600 mb-4">
                Nos pondremos en contacto contigo en las próximas 24 horas para comenzar tu transformación de estilo.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  <strong>Próximos pasos:</strong> Te enviaremos un WhatsApp con una mini-consulta gratuita y tu primer análisis de estilo.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-700">
                  Comienza tu transformación de estilo con   
                  <span 
                    className="lia-logo">  LIA
                  </span>
                  - solo necesitamos estos datos para contactarte
                </p>
              </div>

              {/* Campos del formulario */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
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
                    placeholder="Tu nombre completo"
                  />
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico *
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
                  WhatsApp *
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
                    Hubo un error al enviar tu información. Por favor, intenta de nuevo.
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
                    <span>Enviando...</span>
                  </>
                ) : (
                  <span>Comenzar con
                    <span className='lia-logo'> LIA </span>
                  </span>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Al registrarte, aceptas nuestros términos de servicio y política de privacidad. 
                Tu información está segura con nosotros.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>100% Gratuito</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Respuesta en 24h</span>
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