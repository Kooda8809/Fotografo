import React from 'react';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';

interface AboutADPProps {
  onOpenQuoteModal: () => void;
  onNavigate?: (route: string) => void;
}

export const AboutADP: React.FC<AboutADPProps> = ({ onOpenQuoteModal, onNavigate }) => {
  return (
    <section
      id="sobre-adp"
      className="relative py-24 sm:py-32 lg:py-36 bg-white text-black overflow-hidden border-t border-neutral-200"
      aria-label="Perfil profesional de Carlota Lagunas"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        

        {/* Main Grid: Portrait on Left, Bio on Right */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* Portrait Column (Left) */}
          <div className="lg:col-span-5 relative z-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-neutral-100 shadow-xl border border-neutral-200 group">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85"
                alt="Carlota Lagunas - Fotografía Infantil y Familiar en Zaragoza"
                loading="lazy"
                className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-98 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-white">
                <span>CARLOTA LAGUNAS</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-300" />
                  ZARAGOZA · ACTUR
                </span>
              </div>
            </div>
          </div>

          {/* Typography & Editorial Bio Column (Right) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            
            {/* NAME HEADER */}
            <div className="relative z-10 lg:-ml-20 xl:-ml-28 pointer-events-none select-none">
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-sans tracking-tight flex flex-col">
                <span className="font-light font-editorial text-neutral-900 drop-shadow-sm">
                  Carlota
                </span>
                <span className="font-black text-black">
                  Lagunas
                </span>
              </h2>
            </div>

            {/* Circular CTA Button & Bio Text Block */}
            <div className="flex flex-col sm:flex-row items-start gap-6 pt-2">
              <button
                onClick={() => onNavigate ? onNavigate('sobre-mi') : onOpenQuoteModal()}
                className="group shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-neutral-300 hover:border-black hover:bg-black flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none shadow-sm"
                aria-label="Conocer a Carlota Lagunas"
              >
                <ArrowRight className="w-5 h-5 text-black group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
              </button>

              <div className="space-y-4 text-sm sm:text-base text-neutral-700 font-light leading-relaxed max-w-xl">
                <p>
                  Especializada en capturar con ternura, naturalidad y elegancia los momentos más puros e irrepetibles de la vida: la dulce espera del embarazo, los primeros días del recién nacido y el crecimiento feliz de tus hijos en Zaragoza.
                </p>
                <p className="text-neutral-500 text-xs sm:text-sm">
                  Desde nuestro estudio climatizado y adaptado en el Barrio del Actur, cuidamos la seguridad neonatal y trabajamos a su propio ritmo para que vuestra única preocupación sea disfrutar del momento en familia.
                </p>
              </div>
            </div>

            {/* Bottom Actions & Availability Pill */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-neutral-200">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors shadow-md cursor-pointer"
              >
                <span>Consultar Disponibilidad</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('sobre-mi')}
                  className="text-xs font-mono uppercase tracking-wider text-black hover:underline underline-offset-4 cursor-pointer"
                >
                  Leer más sobre mí
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
