import React, { useState } from 'react';
import { X, Send, MessageSquare, Mail, Check, ShieldCheck } from 'lucide-react';
import { QuoteFormData } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService = ''
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    nombre: '',
    email: '',
    telefono: '',
    tipoProyecto: '',
    servicio: preselectedService || '',
    ubicacion: 'Zaragoza',
    fechaAproximada: '',
    detalles: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Format message for WhatsApp & Mailto
  const buildEnquiryText = () => {
    return `Hola Carlota, me gustaría consultar disponibilidad para una sesión en Zaragoza:
- Nombre: ${formData.nombre || 'No especificado'}
- Teléfono: ${formData.telefono || 'No especificado'}
- Email: ${formData.email || 'No especificado'}
- Tipo de sesión: ${formData.servicio || preselectedService || 'Sesión infantil/familiar'}
- Localidad: ${formData.ubicacion || 'Zaragoza'}
- Fecha aproximada / FPP: ${formData.fechaAproximada || 'A convenir'}
- Detalles: ${formData.detalles || 'Sin observaciones adicionales'}`;
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(buildEnquiryText());
    window.open(`https://wa.me/34687707029?text=${text}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(
      `Consulta de Sesión — ${formData.servicio || 'General'} (${formData.nombre || 'Cliente'})`
    );
    const body = encodeURIComponent(buildEnquiryText());
    window.open(`mailto:info@carlotalagunas.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      id="quote-modal"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white border border-neutral-200 rounded-none w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative text-neutral-900">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-none transition-colors focus:outline-none cursor-pointer"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-editorial text-2xl sm:text-3xl text-black font-normal">
                Consultar Disponibilidad
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                Cuéntanos qué sesión tienes en mente (embarazo, recién nacido, smash cake, familia, comunión o fine art). Te responderemos personalmente a la mayor brevedad.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nombre */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-600 font-mono">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  placeholder="Tu nombre y apellidos"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-none px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-600 font-mono">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  required
                  placeholder="+34 600 000 000"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-none px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-600 font-mono">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-none px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              {/* Ubicación */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-600 font-mono">
                  Localidad *
                </label>
                <input
                  type="text"
                  name="ubicacion"
                  required
                  placeholder="Zaragoza, Utebo, Cuarte..."
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-none px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              {/* Servicio */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-neutral-600 font-mono">
                  Tipo de sesión deseada *
                </label>
                <select
                  name="servicio"
                  required
                  value={formData.servicio}
                  onChange={handleChange}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-none px-3.5 py-2.5 text-sm text-black focus:outline-none focus:border-black focus:bg-white cursor-pointer"
                >
                  <option value="">Selecciona sesión</option>
                  <option value="Sesión Embarazo">Sesión Embarazo</option>
                  <option value="Sesión Newborn (Recién Nacido)">Sesión Newborn (Recién Nacido)</option>
                  <option value="Sesión Smash Cake (1er Cumpleaños)">Sesión Smash Cake (1er Cumpleaños)</option>
                  <option value="Fotografía Infantil">Fotografía Infantil</option>
                  <option value="Fotografía Familiar">Fotografía Familiar</option>
                  <option value="Comuniones Zaragoza">Comuniones Zaragoza</option>
                  <option value="Retrato Fine Art">Retrato Fine Art</option>
                  <option value="Tarjeta Regalo">Tarjeta / Bono Regalo</option>
                  <option value="Otra consulta">Otra consulta</option>
                </select>
              </div>
            </div>

            {/* Fecha aproximada */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-neutral-600 font-mono">
                Fecha aproximada / Fecha Prevista de Parto (FPP)
              </label>
              <input
                type="text"
                name="fechaAproximada"
                placeholder="Ej. FPP en mayo, cumpleaños el 12 de junio, o mes de preferencia"
                value={formData.fechaAproximada}
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-none px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>

            {/* Cuéntame sobre tu proyecto */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-neutral-600 font-mono">
                Cuéntame los detalles
              </label>
              <textarea
                name="detalles"
                rows={3}
                placeholder="Semana de gestación, edad de los niños, sesión en estudio o exterior, dudas sobre vestuario..."
                value={formData.detalles}
                onChange={handleChange}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-none px-3.5 py-2.5 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white font-semibold text-xs uppercase tracking-[0.18em] rounded-none hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-black"
              >
                <span>Consultar Disponibilidad</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-mono text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
              <span>Trato directo con Carlota Lagunas · Estudio en Actur, Zaragoza · Sin compromiso</span>
            </div>
          </form>
        ) : (
          <div className="text-center py-8 space-y-6">
            <div className="w-12 h-12 rounded-none bg-neutral-100 border border-neutral-200 flex items-center justify-center mx-auto text-black">
              <Check className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-editorial text-3xl text-black font-normal">
                ¡Solicitud Preparada!
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto font-light leading-relaxed">
                Hemos preparado el mensaje con los datos de tu consulta. Selecciona tu canal habitual para que Carlota te responda de inmediato:
              </p>
            </div>

            <div className="space-y-3 max-w-md mx-auto pt-2">
              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="w-full py-3.5 px-6 bg-black text-white font-semibold text-xs uppercase tracking-wider rounded-none hover:bg-neutral-800 transition-all flex items-center justify-center gap-2.5 shadow-xs cursor-pointer border border-black"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Enviar por WhatsApp a Carlota (687 707 029)</span>
              </button>

              <button
                onClick={handleEmailSend}
                className="w-full py-3.5 px-6 bg-neutral-100 border border-neutral-200 text-black font-medium text-xs uppercase tracking-wider rounded-none hover:bg-neutral-200 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar por Correo Electrónico</span>
              </button>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="text-xs text-neutral-500 hover:text-black underline font-mono tracking-wider cursor-pointer"
              >
                Cerrar ventana
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
