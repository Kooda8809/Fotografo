import React from 'react';
import { MapPin, Navigation, ArrowUpRight, Car, TramFront } from 'lucide-react';

export const StudioMapSection: React.FC = () => {
  const directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Carlota+Lagunas+Fotografia+Zaragoza&destination_place_id=ChIJgZyvymkUWQ0RXo7wXg0HbkE';

  return (
    <section
      aria-label="Ubicación del estudio Carlota Lagunas en Zaragoza"
      className="w-full bg-white border-t border-neutral-200 pt-16 sm:pt-20 pb-0"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-black shrink-0" />
              <span>Zaragoza · Barrio del Actur</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-black font-normal tracking-tight leading-[0.98]">
              Visita Nuestro Estudio
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              C/ Rosalía de Castro, 15, local · 50018 Zaragoza, Aragón · Estudio a pie de calle climatizado y adaptado para recién nacidos y familias.
            </p>
          </div>

          {/* Quick Access Badges & Directions CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
            <div className="hidden sm:flex flex-col items-start sm:items-end text-[11px] font-mono text-neutral-500 space-y-0.5 pr-2">
              <span className="flex items-center gap-1.5">
                <TramFront className="w-3.5 h-3.5 text-neutral-600" />
                <span>Tranvía: Rosalía de Castro / Legaz</span>
              </span>
              <span className="flex items-center gap-1.5 text-neutral-400">
                <Car className="w-3 h-3 text-neutral-400" />
                <span>Fácil aparcamiento en la zona</span>
              </span>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-none transition-colors shadow-xs cursor-pointer border border-black"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Cómo Llegar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Map Frame adapted to Visual Identity */}
        <div className="relative mt-8 mb-16 sm:mb-20 overflow-hidden rounded-none border border-neutral-200 bg-neutral-100 shadow-sm group">
          <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d23844.265485381125!2d-0.889848!3d41.66582700000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5914cb9caf2981%3A0x416e070d5ef0825e!2sCarlota%20Lagunas%20Fotografia!5e0!3m2!1ses!2ses!4v1790013846364!5m2!1ses!2ses"
              width="1200"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Mapa de localización Carlota Lagunas Fotografía en Zaragoza"
              className="w-full h-full border-0 filter grayscale contrast-[1.15] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
            />
          </div>

          {/* Floating Editorial Badge (Top-Left) */}
          <div className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-md border border-neutral-200 rounded-none shadow-md text-xs font-mono pointer-events-none hidden sm:block">
            <div className="font-semibold text-black tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-none bg-emerald-500 inline-block animate-pulse" />
              <span>Carlota Lagunas Fotografía</span>
            </div>
            <div className="text-neutral-500 text-[10px] mt-0.5">
              C/ Rosalía de Castro, 15 · Actur, Zaragoza
            </div>
          </div>

          {/* Floating Schedule Notice (Bottom-Right) */}
          <div className="absolute bottom-4 right-4 px-3 py-2 bg-black text-white text-[10px] font-mono uppercase tracking-widest rounded-none shadow-md pointer-events-none flex items-center gap-2">
            <span>Atención con Cita Previa</span>
          </div>
        </div>

      </div>
    </section>
  );
};
