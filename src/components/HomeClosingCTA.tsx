import React from 'react';
import { ArrowUpRight, MessageCircle, Calendar, Heart, ShieldCheck, MapPin } from 'lucide-react';

interface HomeClosingCTAProps {
  onOpenQuoteModal: () => void;
  onNavigate: (route: string) => void;
}

export const HomeClosingCTA: React.FC<HomeClosingCTAProps> = ({
  onOpenQuoteModal,
  onNavigate
}) => {
  const whatsappUrl =
    'https://wa.me/34687707029?text=Hola%20Carlota,%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20para%20una%20sesi%C3%B3n%20fotogr%C3%A1fica%20en%20Zaragoza.';

  return (
    <section
      id="reserva-cta"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#111111] text-white overflow-hidden border-t border-neutral-800"
      aria-label="Reserva de sesión fotográfica con Carlota Lagunas"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-neutral-800/40 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-10 sm:space-y-12">
        
        {/* Main Heading & Editorial Copy */}
        <div className="space-y-5 sm:space-y-6 max-w-3xl mx-auto">
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.15]">
            Conserva para siempre los momentos más puros de tu familia
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            En nuestro estudio en Zaragoza cuidamos cada detalle: luz cálida, ritmo adaptado a las necesidades de tu bebé y la tranquilidad de trabajar con cita previa exclusiva.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2">
          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-black text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] rounded-none hover:bg-neutral-200 transition-all duration-300 shadow-xs cursor-pointer border border-white"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Consultar Disponibilidad</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-none border border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 hover:border-neutral-500 text-white text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Hablar por WhatsApp</span>
          </a>
        </div>

        {/* Secondary Navigation Link */}
        <div className="pt-2">
          <button
            onClick={() => onNavigate('portfolio')}
            className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white underline underline-offset-8 transition-colors cursor-pointer"
          >
            Explorar la galería completa de trabajos
          </button>
        </div>

        {/* Value Highlights Grid */}
        <div className="pt-10 sm:pt-14 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-left">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-none bg-neutral-900 border border-neutral-800 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-neutral-300" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-white tracking-wide">
                Seguridad Neonatal
              </div>
              <div className="text-[12px] text-neutral-400 font-light leading-relaxed">
                Formación especializada y estudio climatizado adaptado al confort del recién nacido.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-none bg-neutral-900 border border-neutral-800 shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-neutral-300" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-white tracking-wide">
                Estudio en el Actur
              </div>
              <div className="text-[12px] text-neutral-400 font-light leading-relaxed">
                C/ Rosalía de Castro, 15 (Zaragoza). Acceso cómodo y fácil aparcamiento.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-none bg-neutral-900 border border-neutral-800 shrink-0 mt-0.5">
              <Heart className="w-4 h-4 text-neutral-300" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-white tracking-wide">
                Plazas Mensuales Limitadas
              </div>
              <div className="text-[12px] text-neutral-400 font-light leading-relaxed">
                Agenda reducida para dedicar todo el tiempo y cariño que cada familia merece.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
