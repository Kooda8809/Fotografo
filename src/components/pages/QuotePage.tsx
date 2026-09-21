import React, { useState } from 'react';
import { QuoteFormData } from '../../types';
import { Send, MessageSquare, Mail, Check, ArrowUpRight, Phone, ShieldCheck } from 'lucide-react';

export const QuotePage: React.FC = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    nombre: '',
    email: '',
    telefono: '',
    tipoProyecto: '',
    ubicacion: 'Zaragoza',
    servicio: '',
    fechaAproximada: '',
    detalles: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const buildQuoteMessage = () => {
    return `Hola Carlota, me gustaría consultar disponibilidad y tarifas para una sesión en Zaragoza:
- Nombre: ${formData.nombre || 'No especificado'}
- Teléfono: ${formData.telefono || 'No especificado'}
- Email: ${formData.email || 'No especificado'}
- Tipo de sesión: ${formData.servicio || 'Sesión infantil/familiar'}
- Localidad: ${formData.ubicacion || 'Zaragoza'}
- Fecha aproximada / FPP: ${formData.fechaAproximada || 'A convenir'}
- Comentarios: ${formData.detalles || 'Sin comentarios adicionales'}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(buildQuoteMessage());
    window.open(`https://wa.me/34687707029?text=${text}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(
      `Consulta de Sesión — ${formData.servicio || 'General'} (${formData.nombre || 'Cliente'})`
    );
    const body = encodeURIComponent(buildQuoteMessage());
    window.open(`mailto:info@carlotalagunas.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-white text-black min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="border-b border-neutral-200 pb-12 space-y-4 text-center sm:text-left">
          <h1 className="font-editorial text-4xl sm:text-6xl text-black font-normal tracking-tight">
            Reserva de Sesión
          </h1>
          <p className="text-base text-neutral-600 font-light leading-relaxed max-w-2xl">
            Cuéntanos qué sesión tienes en mente (embarazo, recién nacido, primer cumpleaños, niños o familia) y la fecha deseada. Responderemos personalmente para orientarte sobre packs y disponibilidad.
          </p>
        </div>

        {/* Full Form Card */}
        <div className="p-6 sm:p-12 rounded-none bg-neutral-50/80 border border-neutral-200 shadow-sm">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-700 font-mono">
                    Nombre y Apellidos *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    placeholder="Tu nombre completo"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 rounded-none px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Teléfono */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-700 font-mono">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    placeholder="+34 600 000 000"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 rounded-none px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-700 font-mono">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="ejemplo@correo.es"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 rounded-none px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Ubicación */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-neutral-700 font-mono">
                    Localidad *
                  </label>
                  <input
                    type="text"
                    name="ubicacion"
                    required
                    placeholder="Ej. Zaragoza, Utebo, Cuarte..."
                    value={formData.ubicacion}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 rounded-none px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Servicio que necesitas */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-neutral-700 font-mono">
                    Tipo de sesión que deseas *
                  </label>
                  <select
                    name="servicio"
                    required
                    value={formData.servicio}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 rounded-none px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors cursor-pointer"
                  >
                    <option value="">Selecciona el tipo de sesión</option>
                    <option value="Sesión Embarazo">Sesión Embarazo</option>
                    <option value="Sesión Newborn (Recién Nacido)">Sesión Newborn (Recién Nacido)</option>
                    <option value="Sesión Smash Cake (1er Cumpleaños)">Sesión Smash Cake (1er Cumpleaños)</option>
                    <option value="Fotografía Infantil">Fotografía Infantil</option>
                    <option value="Fotografía Familiar">Fotografía Familiar</option>
                    <option value="Comuniones Zaragoza">Comuniones Zaragoza</option>
                    <option value="Retrato Fine Art">Retrato Fine Art</option>
                    <option value="Tarjeta Regalo">Tarjeta Regalo</option>
                    <option value="Otro">Otra consulta</option>
                  </select>
                </div>
              </div>

              {/* Fecha aproximada */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-700 font-mono">
                  Fecha aproximada deseada / FPP (Fecha Prevista de Parto)
                </label>
                <input
                  type="text"
                  name="fechaAproximada"
                  placeholder="Ej. Finales de mayo, semana 30 de embarazo, o fecha de cumpleaños"
                  value={formData.fechaAproximada}
                  onChange={handleChange}
                  className="w-full bg-white border border-neutral-300 rounded-none px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Cuéntame sobre los detalles */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-neutral-700 font-mono">
                  Cuéntanos los detalles
                </label>
                <textarea
                  name="detalles"
                  rows={4}
                  placeholder="Semana de gestación, edad de los niños, sesión en estudio o exterior, dudas sobre vestuario o atrezzo..."
                  value={formData.detalles}
                  onChange={handleChange}
                  className="w-full bg-white border border-neutral-300 rounded-none px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-black text-white font-semibold text-xs uppercase tracking-[0.18em] rounded-none hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer border border-black"
                >
                  <span>Enviar Consulta</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-mono text-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span>Trato directo con Carlota Lagunas · Estudio en Actur, Zaragoza · Sin compromiso</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className="w-14 h-14 rounded-none bg-neutral-100 border border-neutral-200 flex items-center justify-center mx-auto text-black">
                <Check className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="font-editorial text-3xl text-black font-normal">
                  ¡Mensaje Organizado!
                </h3>
                <p className="text-sm text-neutral-600 max-w-sm mx-auto font-light leading-relaxed">
                  Hemos recopilado tus datos. Elige el medio para comunicarte con Carlota:
                </p>
              </div>
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full py-3.5 px-6 bg-black text-white font-semibold text-xs uppercase tracking-wider rounded-none hover:bg-neutral-800 transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer border border-black"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Enviar por WhatsApp a Carlota (687 707 029)</span>
                </button>
                <button
                  onClick={handleEmailSend}
                  className="w-full py-3.5 px-6 bg-white border border-neutral-300 text-black font-medium text-xs uppercase tracking-wider rounded-none hover:bg-neutral-100 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Enviar por Correo (info@carlotalagunas.com)</span>
                </button>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-neutral-500 hover:text-black underline font-mono cursor-pointer"
                >
                  Modificar datos
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
