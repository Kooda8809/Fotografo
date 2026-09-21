import React from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonios"
      className="py-24 sm:py-32 bg-neutral-50/60 text-black border-t border-neutral-200"
      aria-label="Opiniones de familias y clientes de Carlota Lagunas"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-neutral-200">
          <div className="space-y-3">
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-black font-normal tracking-tight">
              Familias Felices en Zaragoza
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md font-light leading-relaxed">
            La mayor recompensa a nuestra dedicación es la emoción sincera de los papás al recibir los recuerdos de sus pequeños.
          </p>
        </div>

        {/* Testimonials 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-8 bg-white border border-neutral-200 rounded-sm flex flex-col justify-between space-y-6 shadow-xs hover:border-black transition-colors"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-neutral-300 stroke-[1.2]" />

                <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 space-y-1">
                <h3 className="font-editorial text-base text-black font-semibold">
                  {t.name}
                </h3>
                {t.sessionType && (
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    {t.sessionType} · Zaragoza
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
