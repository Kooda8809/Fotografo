import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, MessageSquare, ShieldCheck, Car } from 'lucide-react';

interface LocationSectionProps {
  onOpenQuoteModal: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenQuoteModal }) => {
  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=Calle+Rosal%C3%ADa+de+Castro+15+Actur+50018+Zaragoza';

  return (
    <section
      id="contacto"
      className="py-24 sm:py-32 bg-white text-black border-t border-neutral-200"
      aria-label="Contacto y cita previa en Carlota Lagunas Fotografía Zaragoza"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-neutral-200">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-sans font-medium">
              Atelier & Cita Previa · Barrio del Actur
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-black font-normal tracking-tight leading-[0.95]">
              Contacto & Cita Previa
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md font-light leading-relaxed">
            Hablemos sobre el recuerdo que queréis crear para vuestra familia. Os recibimos con calma en nuestro estudio de Zaragoza siempre bajo cita previa.
          </p>
        </div>

        {/* 2-Column Balanced Architectural Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch mt-12">
          
          {/* Left Column: Structured Atelier Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Primary Address Card */}
            <div className="p-7 sm:p-8 bg-neutral-50/70 border border-neutral-200 rounded-none space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium">
                  01 / UBICACIÓN DEL ESTUDIO
                </span>
                <MapPin className="w-4 h-4 text-neutral-700" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-editorial text-xl sm:text-2xl text-black font-normal">
                  C/ Rosalía de Castro, 15, local
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  Barrio del Actur · 50018 Zaragoza, Aragón (España)
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black hover:text-neutral-600 underline underline-offset-4"
                >
                  <span>Ver en Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                  <Car className="w-3 h-3 text-neutral-400" />
                  <span>Fácil Aparcamiento</span>
                </span>
              </div>
            </div>

            {/* Direct Channels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone & WhatsApp Card */}
              <div className="p-6 bg-white border border-neutral-200 rounded-none space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    Teléfono & WhatsApp
                  </span>
                  <Phone className="w-3.5 h-3.5 text-black" />
                </div>
                <div>
                  <a
                    href="https://wa.me/34687707029"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-base font-semibold text-black hover:underline tracking-tight block"
                  >
                    +34 687 707 029
                  </a>
                  <span className="text-[10px] font-mono text-neutral-400 block mt-1">
                    Atención directa con Carlota
                  </span>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-6 bg-white border border-neutral-200 rounded-none space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    Email de Contacto
                  </span>
                  <Mail className="w-3.5 h-3.5 text-black" />
                </div>
                <div>
                  <a
                    href="mailto:info@carlotalagunas.com"
                    className="font-mono text-xs sm:text-sm font-semibold text-black hover:underline break-all block"
                  >
                    info@carlotalagunas.com
                  </a>
                  <span className="text-[10px] font-mono text-neutral-400 block mt-1">
                    Respuesta en 24-48 horas
                  </span>
                </div>
              </div>
            </div>

            {/* Appointment Notice */}
            <div className="p-6 bg-neutral-50/70 border border-neutral-200 rounded-none space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-black" />
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-800 font-semibold">
                  Horarios y Política de Intimidad
                </span>
              </div>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Atención telefónica de lunes a viernes (10:00 a 14:00 y 16:00 a 19:30). Las visitas al estudio se realizan <strong>estrictamente bajo cita previa</strong> para asegurar la calma, concentración e intimidad de cada sesión en curso.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-neutral-800 transition-colors rounded-none shadow-xs cursor-pointer"
              >
                <span>Consultar Disponibilidad</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://wa.me/34687707029?text=Hola%20Carlota,%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20para%20una%20sesi%C3%B3n%20en%20Zaragoza."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-neutral-300 hover:border-black text-black text-xs font-mono uppercase tracking-wider rounded-none transition-colors cursor-pointer bg-white"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Directo</span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Map Display */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:h-full min-h-[380px] rounded-none overflow-hidden bg-neutral-900 border border-neutral-200 shadow-md">
              <iframe
                title="Ubicación Carlota Lagunas Fotografía en Zaragoza"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d23844.265485381125!2d-0.889848!3d41.66582700000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5914cb9caf2981%3A0x416e070d5ef0825e!2sCarlota%20Lagunas%20Fotografia!5e0!3m2!1ses!2ses!4v1790013846364!5m2!1ses!2ses"
                className="w-full h-full border-0 grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              
              {/* Studio Corner Badge */}
              <div className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-sm border border-neutral-200 rounded-none shadow-md text-xs font-mono">
                <div className="font-semibold text-black tracking-wide">Carlota Lagunas Fotografía</div>
                <div className="text-neutral-500 text-[10px]">Barrio del Actur · Zaragoza</div>
              </div>

              {/* Verified Pin Badge */}
              <div className="absolute bottom-4 right-4 p-2.5 bg-black text-white text-[10px] font-mono uppercase tracking-widest rounded-none shadow-md flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Estudio Climatizado 28°C</span>
              </div>
            </div>

            {/* Public Transport & Access Banner */}
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-none flex items-center justify-between gap-4 text-center sm:text-left">
              <span className="text-[11px] font-mono text-neutral-600 uppercase tracking-wider">
                Tranvía parada Rosalía de Castro / Legaz Lacambra (Línea 1)
              </span>
              <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline uppercase">
                Zaragoza Capital
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
