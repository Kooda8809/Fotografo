import React from 'react';
import { ArrowUpRight, CheckCircle2, Heart } from 'lucide-react';

interface PricingNoticeProps {
  onOpenQuoteModal: () => void;
  onNavigatePricing?: () => void;
}

export const PricingNotice: React.FC<PricingNoticeProps> = ({ onOpenQuoteModal, onNavigatePricing }) => {
  return (
    <section
      id="tarifas"
      className="py-20 sm:py-24 bg-white text-black border-t border-neutral-200"
      aria-label="Tarifas transparentes y packs para sesiones infantiles y familiares"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="p-8 sm:p-12 lg:p-16 bg-neutral-50/80 border border-neutral-200 rounded-sm relative overflow-hidden shadow-sm">
          <div className="max-w-3xl space-y-6">

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-black font-normal leading-tight">
              Packs completos para conservar sus primeros recuerdos
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              Disponemos de paquetes transparentes para sesiones de embarazo (desde 190 €) y recién nacidos (desde 190 €), con entrega digital en alta resolución, cajas de madera natural grabadas y álbumes en lino artesanal. Todos los precios incluyen IVA.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                <span>IVA incluido en todos los packs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                <span>Atrezzo y vestuario del estudio</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                <span>Cajas de madera y papel Fine Art</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              {onNavigatePricing && (
                <button
                  onClick={onNavigatePricing}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] hover:bg-neutral-800 transition-colors rounded-full shadow-md cursor-pointer"
                >
                  <span>Ver Tarifas Detalladas</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-300 hover:border-black text-black text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] hover:bg-neutral-100 transition-colors rounded-full shadow-sm cursor-pointer"
              >
                <span>Consultar Disponibilidad</span>
              </button>

              <a
                href="https://wa.me/34687707029?text=Hola%20Carlota,%20me%20gustar%C3%ADa%20consultar%20tarifas%20y%20fechas%20para%20una%20sesi%C3%B3n%20en%20Zaragoza"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 border border-neutral-300 hover:border-black text-black text-xs font-mono uppercase tracking-wider rounded-full transition-colors cursor-pointer"
              >
                <span>WhatsApp (687 707 029)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
