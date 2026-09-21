import React from 'react';
import { PRICING_EMBARAZO, PRICING_NEWBORN, CAJA_MARCO_ADDON, PRICING_DISCLAIMER } from '../../data/pricing';
import { Check, Sparkles, Heart, ArrowRight, ShieldCheck, Gift } from 'lucide-react';

interface PricingPageProps {
  onOpenQuoteModal: () => void;
  onNavigateContact: () => void;
  onNavigateGift?: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onOpenQuoteModal,
  onNavigateContact,
  onNavigateGift
}) => {
  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
        
        {/* Header Section */}
        <div className="border-b border-neutral-200 pb-12 space-y-4 max-w-3xl">
          <h1 className="font-editorial text-4xl sm:text-6xl text-black font-normal tracking-tight">
            Precios y Tarifas
          </h1>
          <p className="text-base text-neutral-600 font-light leading-relaxed">
            Invertir en fotografía infantil y familiar es regalar a tus hijos su recuerdo más valioso cuando crezcan. Paquetes completos, sin sorpresas y con acabados artesanales en lino y madera.
          </p>
        </div>

        {/* Sección: Fotografía de Embarazo */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-100 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">01 / DULCE ESPERA</span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-black font-normal">
                Sesiones de Embarazo
              </h2>
            </div>
            <p className="text-xs text-neutral-500 font-light max-w-md">
              Recomendadas entre las semanas 28 y 32 de gestación. En nuestro estudio de Zaragoza o al aire libre al atardecer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {PRICING_EMBARAZO.map((pack) => (
              <div
                key={pack.id}
                className={`relative flex flex-col justify-between p-8 rounded-sm border transition-all duration-300 ${
                  pack.highlight
                    ? 'border-black bg-neutral-50 shadow-md ring-1 ring-black'
                    : 'border-neutral-200 bg-white hover:border-neutral-400'
                }`}
              >
                {pack.highlight && (
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-black text-white text-[10px] font-mono uppercase tracking-widest rounded-full">
                    Más Elegido
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl text-black">{pack.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-light text-black tracking-tight font-sans">
                        {pack.price}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-neutral-200/80">
                    {pack.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700 font-light leading-relaxed">
                        <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={onOpenQuoteModal}
                    className={`w-full py-3.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      pack.highlight
                        ? 'bg-black text-white hover:bg-neutral-800'
                        : 'bg-neutral-100 text-black hover:bg-neutral-200'
                    }`}
                  >
                    <span>Reservar Fecha</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección: Fotografía Newborn (Recién Nacidos) */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-100 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">02 / PRIMEROS DÍAS</span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-black font-normal">
                Sesiones Newborn (Recién Nacido)
              </h2>
            </div>
            <p className="text-xs text-neutral-500 font-light max-w-md">
              Realizadas preferentemente entre el día 7 y 14 de vida. Sesión pausada respetando tomas, sueño y temperatura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {PRICING_NEWBORN.map((pack) => (
              <div
                key={pack.id}
                className={`relative flex flex-col justify-between p-8 rounded-sm border transition-all duration-300 ${
                  pack.highlight
                    ? 'border-black bg-neutral-50 shadow-md ring-1 ring-black'
                    : 'border-neutral-200 bg-white hover:border-neutral-400'
                }`}
              >
                {pack.highlight && (
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-black text-white text-[10px] font-mono uppercase tracking-widest rounded-full">
                    Recomendado Familias
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-editorial text-2xl text-black">{pack.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-light text-black tracking-tight font-sans">
                        {pack.price}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-neutral-200/80">
                    {pack.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700 font-light leading-relaxed">
                        <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={onOpenQuoteModal}
                    className={`w-full py-3.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      pack.highlight
                        ? 'bg-black text-white hover:bg-neutral-800'
                        : 'bg-neutral-100 text-black hover:bg-neutral-200'
                    }`}
                  >
                    <span>Reservar Fecha</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Caja Marco Addon Banner */}
        <div className="p-8 sm:p-10 rounded-sm bg-neutral-50 border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-600">
              <Sparkles className="w-4 h-4 text-black" />
              <span>Complemento Exclusivo</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl text-black">
              {CAJA_MARCO_ADDON.name} — {CAJA_MARCO_ADDON.price}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              {CAJA_MARCO_ADDON.description}
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={onNavigateContact}
              className="py-3 px-6 bg-white border border-neutral-300 text-black text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-neutral-100 transition-colors shadow-xs cursor-pointer"
            >
              Consultar detalles
            </button>
          </div>
        </div>

        {/* Disclaimer y Transparencia */}
        <div className="border-t border-neutral-200 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-500 font-light">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-black shrink-0" />
            <span>{PRICING_DISCLAIMER}</span>
          </div>
          {onNavigateGift && (
            <button
              onClick={onNavigateGift}
              className="inline-flex items-center gap-1.5 text-black hover:underline font-mono uppercase text-[11px]"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>¿Buscas una tarjeta regalo? Ver opciones</span>
            </button>
          )}
        </div>

        {/* Banner otras sesiones */}
        <div className="p-8 sm:p-12 rounded-sm bg-black text-white flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              SMASH CAKE · INFANTIL · FAMILIA · COMUNIONES · FINE ART
            </span>
            <h3 className="font-editorial text-2xl sm:text-4xl font-normal">
              ¿Deseas información para otra sesión?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Disponemos de dossiers detallados para sesiones de primer cumpleaños, comuniones en exteriores y retratos Fine Art. Escríbenos y te enviaremos la guía completa.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onNavigateContact}
              className="py-3.5 px-8 bg-white text-black text-xs font-semibold uppercase tracking-[0.16em] rounded-full hover:bg-neutral-200 transition-colors shadow-md cursor-pointer"
            >
              Contactar con Carlota
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
