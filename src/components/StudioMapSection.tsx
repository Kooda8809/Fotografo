import React, { useState, useEffect, useRef } from 'react';
import { Navigation, ArrowUpRight } from 'lucide-react';

export const StudioMapSection: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Carlota+Lagunas+Fotografia+Zaragoza&destination_place_id=ChIJgZyvymkUWQ0RXo7wXg0HbkE';

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-lenis-prevent="true"
      aria-label="Mapa de localización Carlota Lagunas Fotografía"
      className="relative w-full border-t border-neutral-200 bg-neutral-100 p-0 m-0 leading-none overflow-hidden group"
    >
      {/* Full-bleed infinite horizontal map */}
      <div className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[360px] overflow-hidden">
        {isInView ? (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d23844.265485381125!2d-0.889848!3d41.66582700000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5914cb9caf2981%3A0x416e070d5ef0825e!2sCarlota%20Lagunas%20Fotografia!5e0!3m2!1ses!2ses!4v1790013846364!5m2!1ses!2ses"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Mapa de localización Carlota Lagunas Fotografía en Zaragoza"
            className="w-full h-full border-0 block filter grayscale contrast-[1.12] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-neutral-200/80" />
        )}

        {/* Floating Atelier Badge (Top Left) */}
        <div className="absolute top-4 left-4 sm:left-8 p-2.5 sm:p-3 bg-white/95 backdrop-blur-md border border-neutral-200 rounded-none shadow-md text-xs font-mono pointer-events-none hidden sm:block select-none">
          <div className="font-semibold text-black tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-none bg-black inline-block" />
            <span>Carlota Lagunas Fotografía</span>
          </div>
          <div className="text-neutral-500 text-[10px] mt-0.5">
            C/ Rosalía de Castro, 15 · Actur, Zaragoza
          </div>
        </div>

        {/* Quick GPS Directions CTA (Top Right) */}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 sm:right-8 inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-neutral-800 text-white text-[11px] font-mono uppercase tracking-wider rounded-none shadow-md transition-colors cursor-pointer border border-black select-none z-10"
        >
          <Navigation className="w-3 h-3" />
          <span>Cómo Llegar</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>

        {/* Floating Status Indicator (Bottom Right) */}
        <div className="absolute bottom-4 right-4 sm:right-8 px-3 py-1.5 bg-black/85 backdrop-blur-sm text-white text-[10px] font-mono uppercase tracking-widest rounded-none pointer-events-none select-none hidden md:block">
          <span>Atención con Cita Previa</span>
        </div>
      </div>
    </section>
  );
};
