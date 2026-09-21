import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, MessageSquare } from 'lucide-react';

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
      aria-label="Ubicación y datos de contacto de Carlota Lagunas Fotografía en Zaragoza"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Info Side */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <h2 className="font-editorial text-3xl sm:text-5xl text-black font-normal tracking-tight">
                Estudio en el Actur, Zaragoza
              </h2>
              <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-lg">
                Un entorno luminoso, cálido y pensado exclusivamente para el bienestar de bebés, futuras mamás y familias. Fácil aparcamiento y excelente comunicación en tranvía.
              </p>
            </div>

            {/* Structured Contact Details */}
            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4 p-4 rounded-sm bg-neutral-50 border border-neutral-200 shadow-xs">
                <MapPin className="w-5 h-5 text-neutral-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Dirección del Estudio
                  </div>
                  <div className="text-black font-medium">
                    C/ Rosalía de Castro, 15, local
                  </div>
                  <div className="text-xs text-neutral-600">
                    Barrio del Actur · 50018 Zaragoza, Aragón
                  </div>
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-sm bg-neutral-50 border border-neutral-200 space-y-1 shadow-xs">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Phone className="w-4 h-4 text-black" />
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      Teléfono & WhatsApp
                    </span>
                  </div>
                  <div>
                    <a
                      href="https://wa.me/34687707029"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:underline font-mono text-xs font-semibold"
                    >
                      +34 687 707 029
                    </a>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    L-V: 10:00 - 14:00 y 16:00 - 19:30
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-neutral-50 border border-neutral-200 space-y-1 shadow-xs">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Mail className="w-4 h-4 text-black" />
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      Correo Electrónico
                    </span>
                  </div>
                  <div>
                    <a
                      href="mailto:info@carlotalagunas.com"
                      className="text-black hover:underline font-mono text-xs font-semibold break-all"
                    >
                      info@carlotalagunas.com
                    </a>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono">
                    Respuesta en 24-48 horas
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-neutral-50 border border-neutral-200 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-neutral-700">
                  <Clock className="w-4 h-4 text-black" />
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Área Operativa & Cita Previa
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  Estudio en Zaragoza capital (Actur) con visitas concertadas bajo cita previa para preservar la intimidad. Atendemos a familias de Zaragoza, Utebo, Cuarte de Huerva, Zuera, La Puebla de Alfindén, Villanueva de Gállego y toda la provincia.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-neutral-800 transition-colors rounded-full shadow-md cursor-pointer"
              >
                <span>Consultar Disponibilidad</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://wa.me/34687707029?text=Hola%20Carlota,%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20para%20una%20sesi%C3%B3n%20en%20Zaragoza."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-neutral-300 hover:border-black text-black text-xs font-mono uppercase tracking-wider rounded-full transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp (687 707 029)</span>
              </a>
            </div>
          </div>

          {/* Editorial Map Display */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md">
              <iframe
                title="Ubicación Carlota Lagunas Fotografía en Zaragoza"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2980.528345787688!2d-0.890693523403278!3d41.666191471266014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5914c62b662df9%3A0x1c8b3df9bbddf25!2sC.%20de%20Rosal%C3%ADa%20de%20Castro%2C%2015%2C%2050018%20Zaragoza!5e0!3m2!1ses!2ses!4v1710970000000!5m2!1ses!2ses"
                className="w-full h-full border-0 grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-sm border border-neutral-200 rounded-sm shadow-md text-xs font-mono">
                <div className="font-semibold text-black">Carlota Lagunas Fotografía</div>
                <div className="text-neutral-500 text-[10px]">Actur · Zaragoza</div>
              </div>
            </div>

            <div className="text-center">
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
                Tranvía parada Rosalía de Castro / Legaz Lacambra · Fácil aparcamiento
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
