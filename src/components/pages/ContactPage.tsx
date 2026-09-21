import React, { useState } from 'react';
import { ContactFormData } from '../../types';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, MessageSquare, Send, Check, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onOpenPrivacyModal?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenPrivacyModal }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    aceptaPolitica: false
  });
  const [tipoServicio, setTipoServicio] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Calle+Rosal%C3%ADa+de+Castro+15+Actur+50018+Zaragoza';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData((prev) => ({
      ...prev,
      [target.name]: value
    }));
  };

  const buildMessage = () => {
    return `Hola Carlota, me gustaría consultar disponibilidad y reservar una sesión:
- Nombre: ${formData.nombre}
- Teléfono: ${formData.telefono || 'No indicado'}
- Email: ${formData.email}
- Tipo de sesión: ${tipoServicio || 'No especificada'}
- Mensaje: ${formData.mensaje}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.aceptaPolitica) {
      alert('Por favor, acepta la política de privacidad para continuar.');
      return;
    }
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/34687707029?text=${text}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(
      `Consulta de Sesión — ${tipoServicio || 'General'} (${formData.nombre})`
    );
    const body = encodeURIComponent(buildMessage());
    window.open(`mailto:info@carlotalagunas.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* Header */}
        <div className="border-b border-neutral-200 pb-12 space-y-4 max-w-3xl">
          <h1 className="font-editorial text-4xl sm:text-6xl text-black font-normal tracking-tight">
            Contacto & Cita Previa
          </h1>
          <p className="text-base text-neutral-600 font-light leading-relaxed">
            Hablemos sobre el reportaje para tu bebé, embarazo o familia en Zaragoza. Te atenderemos de forma cercana y personalizada para resolver cualquier duda y reservar tu fecha.
          </p>
        </div>

        {/* 2-Column Grid: Form on Left, Contact Details & Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-6 p-6 sm:p-10 rounded-sm bg-neutral-50/80 border border-neutral-200 shadow-xs">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h2 className="font-editorial text-2xl sm:text-3xl text-black font-normal">
                    Consultar Disponibilidad
                  </h2>
                  <p className="text-xs text-neutral-500 font-light">
                    Completa el formulario y te responderemos a la mayor brevedad.
                  </p>
                </div>

                <div className="space-y-4">
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
                      className="w-full bg-white border border-neutral-300 rounded-sm px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-neutral-700 font-mono">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="tu@correo.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-neutral-300 rounded-sm px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-neutral-700 font-mono">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      placeholder="+34 600 000 000"
                      value={formData.telefono || ''}
                      onChange={handleChange}
                      className="w-full bg-white border border-neutral-300 rounded-sm px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* Tipo de sesión */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-neutral-700 font-mono">
                      Tipo de Sesión de Interés
                    </label>
                    <select
                      value={tipoServicio}
                      onChange={(e) => setTipoServicio(e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded-sm px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors cursor-pointer"
                    >
                      <option value="">Selecciona el tipo de sesión</option>
                      <option value="Sesión Embarazo">Sesión Embarazo</option>
                      <option value="Sesión Newborn (Recién Nacido)">Sesión Newborn (Recién Nacido)</option>
                      <option value="Sesión Smash Cake (Primer Cumpleaños)">Sesión Smash Cake (Primer Cumpleaños)</option>
                      <option value="Fotografía Infantil">Fotografía Infantil</option>
                      <option value="Fotografía Familiar">Fotografía Familiar</option>
                      <option value="Comuniones Zaragoza">Comuniones Zaragoza</option>
                      <option value="Retrato Fine Art">Retrato Fine Art</option>
                      <option value="Tarjeta / Sesión de Regalo">Tarjeta / Sesión de Regalo</option>
                      <option value="Otra consulta">Otra consulta</option>
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-neutral-700 font-mono">
                      Mensaje *
                    </label>
                    <textarea
                      name="mensaje"
                      required
                      rows={4}
                      placeholder="Cuéntanos fecha prevista de parto, edad de los niños, preferencias o fechas deseadas..."
                      value={formData.mensaje}
                      onChange={handleChange}
                      className="w-full bg-white border border-neutral-300 rounded-sm px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>

                  {/* Checkbox política de privacidad */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="aceptaPolitica"
                      name="aceptaPolitica"
                      required
                      checked={formData.aceptaPolitica}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 text-black focus:ring-black cursor-pointer"
                    />
                    <label htmlFor="aceptaPolitica" className="text-xs text-neutral-600 font-light leading-relaxed">
                      He leído y acepto la{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacyModal}
                        className="underline hover:text-black font-normal inline"
                      >
                        política de privacidad
                      </button>{' '}
                      y el tratamiento de mis datos para gestionar mi solicitud de información.
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-black text-white font-semibold text-xs uppercase tracking-[0.18em] rounded-full hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>ENVIAR CONSULTA</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primera Capa Informativa de Protección de Datos (RGPD) */}
                <div className="mt-6 pt-4 border-t border-neutral-200 text-[11px] text-neutral-500 leading-relaxed space-y-1.5 font-light">
                  <div className="flex items-center gap-1.5 font-mono uppercase text-[10px] text-neutral-600 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                    <span>Información básica sobre protección de datos</span>
                  </div>
                  <p><strong>Responsable:</strong> CARLOTA LAGUNAS FOTOGRAFIA SL (NIF: 17740336E).</p>
                  <p><strong>Finalidad:</strong> Responder a las solicitudes de información, resolver dudas sobre sesiones y gestionar presupuestos.</p>
                  <p><strong>Legitimación:</strong> Consentimiento inequívoco del interesado al marcar la casilla de aceptación.</p>
                  <p><strong>Destinatarios:</strong> No se cederán datos a terceros, salvo expresa obligación legal.</p>
                  <p><strong>Derechos:</strong> Acceso, rectificación, supresión, limitación y portabilidad enviando un correo a <a href="mailto:info@carlotalagunas.com" className="underline hover:text-black">info@carlotalagunas.com</a>.</p>
                  <p><strong>Información adicional:</strong> Puedes consultar todos los detalles en nuestra{' '}
                    <button type="button" onClick={onOpenPrivacyModal} className="underline hover:text-black">
                      política de privacidad
                    </button>.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-6">
                <div className="w-14 h-14 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center mx-auto text-black">
                  <Check className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-editorial text-3xl text-black font-normal">
                    ¡Solicitud Preparada!
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-sm mx-auto font-light leading-relaxed">
                    Hemos organizado los datos de tu consulta. Elige tu vía de comunicación preferida para que Carlota te responda de inmediato:
                  </p>
                </div>
                <div className="space-y-3 max-w-md mx-auto pt-2">
                  <button
                    onClick={handleWhatsAppSend}
                    className="w-full py-3.5 px-6 bg-[#25D366] text-black font-semibold text-xs uppercase tracking-wider rounded-full hover:brightness-105 transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-black" />
                    <span>Enviar a WhatsApp (687 707 029)</span>
                  </button>
                  <button
                    onClick={handleEmailSend}
                    className="w-full py-3.5 px-6 bg-neutral-100 border border-neutral-300 text-black font-medium text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
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

          {/* Contact Details & Interactive Map Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="font-editorial text-2xl sm:text-4xl text-black font-normal">
                Estudio en el Actur, Zaragoza
              </h2>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                Un espacio diseñado pensando exclusivamente en el confort, calma e higiene de bebés y futuras mamás.
              </p>
            </div>

            <div className="space-y-4">
              {/* Address card */}
              <div className="p-5 rounded-sm bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
                  <MapPin className="w-4 h-4 text-black" />
                  <span>Dirección del Estudio</span>
                </div>
                <p className="text-sm font-medium text-black">
                  C/ Rosalía de Castro, 15, local
                </p>
                <p className="text-xs text-neutral-600">
                  Barrio del Actur, 50018 Zaragoza, Aragón, España
                </p>
                <div className="pt-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black hover:text-neutral-600 underline underline-offset-4"
                  >
                    <span>Abrir en Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Phone and Email cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-sm bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
                    <Phone className="w-4 h-4 text-black" />
                    <span>Teléfono & WhatsApp</span>
                  </div>
                  <a
                    href="https://wa.me/34687707029"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-semibold font-mono text-black hover:underline"
                  >
                    +34 687 707 029
                  </a>
                  <p className="text-[11px] text-neutral-500 font-mono">
                    Atención directa personalizada
                  </p>
                </div>

                <div className="p-5 rounded-sm bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
                    <Mail className="w-4 h-4 text-black" />
                    <span>Correo Electrónico</span>
                  </div>
                  <a
                    href="mailto:info@carlotalagunas.com"
                    className="block text-sm font-semibold font-mono text-black hover:underline break-all"
                  >
                    info@carlotalagunas.com
                  </a>
                  <p className="text-[11px] text-neutral-500 font-mono">
                    Respuesta en 24-48 horas
                  </p>
                </div>
              </div>

              {/* Horarios Card */}
              <div className="p-5 rounded-sm bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
                  <Clock className="w-4 h-4 text-black" />
                  <span>Horarios de Atención</span>
                </div>
                <div className="space-y-1 text-xs text-neutral-700">
                  <p><strong>Atención telefónica:</strong> Lunes a viernes de 10:00 a 14:00 y de 16:00 a 19:30.</p>
                  <p><strong>Visitas al estudio:</strong> Siempre con cita previa obligatoria para preservar la calma e intimidad de cada sesión en curso.</p>
                </div>
              </div>
            </div>

            {/* Styled Map Embed */}
            <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md">
              <iframe
                title="Mapa de ubicación Carlota Lagunas Fotografía en Zaragoza"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2980.528345787688!2d-0.890693523403278!3d41.666191471266014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5914c62b662df9%3A0x1c8b3df9bbddf25!2sC.%20de%20Rosal%C3%ADa%20de%20Castro%2C%2015%2C%2050018%20Zaragoza!5e0!3m2!1ses!2ses!4v1710970000000!5m2!1ses!2ses"
                className="w-full h-full border-0 grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 p-2.5 bg-white/95 backdrop-blur-sm border border-neutral-200 rounded-sm shadow-sm text-xs font-mono">
                <div className="font-semibold text-black">Carlota Lagunas Fotografía</div>
                <div className="text-[10px] text-neutral-500">Actur · Zaragoza</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
