import React from 'react';
import { Sparkles, Clock, Eye, Gift } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      tag: 'FASE 01 · ASESORÍA',
      title: 'Reserva & Asesoramiento',
      icon: <Sparkles className="w-4 h-4 text-black" />,
      desc: 'Hablamos sobre tu fecha prevista o la etapa que deseas capturar. Te guiamos con nuestra guía exclusiva sobre estilismo, paletas de color y recomendaciones para preparar la sesión con serenidad.'
    },
    {
      num: '02',
      tag: 'FASE 02 · LA EXPERIENCIA',
      title: 'Sesión Sin Prisas',
      icon: <Clock className="w-4 h-4 text-black" />,
      desc: 'En nuestro estudio climatizado de Actur o con la luz dorada de exteriores aragoneses. Respetamos los ritmos de tomas, pausas y descanso del bebé para que viváis una experiencia íntima y relajada.'
    },
    {
      num: '03',
      tag: 'FASE 03 · SELECCIÓN',
      title: 'Galería Privada Online',
      icon: <Eye className="w-4 h-4 text-black" />,
      desc: 'Preparamos una galería digital protegida en alta definición para que podáis revivir la sesión desde el sofá de casa y elegir con calma absoluta vuestras tomas preferidas.'
    },
    {
      num: '04',
      tag: 'FASE 04 · EL LEGADO',
      title: 'Entrega en Madera & Lino',
      icon: <Gift className="w-4 h-4 text-black" />,
      desc: 'Edición artística cuidada toma a toma. Entrega digital en máxima resolución acompañada de cajas artesanales de madera noble grabadas y álbumes en lino diseñados para perdurar generaciones.'
    }
  ];

  return (
    <section
      id="proceso"
      className="py-24 sm:py-32 bg-white text-black border-t border-neutral-200"
      aria-label="Cómo trabajamos vuestro recuerdo fotográfico"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-neutral-200">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-black font-normal tracking-tight leading-[0.95]">
              Cómo Trabajamos Vuestro Recuerdo
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md font-light leading-relaxed">
            Un método transparente, respetuoso y cuidado al milímetro para que vuestra única tarea sea disfrutar y sentiros como en casa.
          </p>
        </div>

        {/* 4-Column Architectural Grid with Fine Hairline Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-neutral-200 divide-y md:divide-y-0 md:divide-x divide-neutral-200 bg-white shadow-xs mt-12 rounded-none">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="group p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:bg-neutral-50/60 transition-colors duration-300 rounded-none relative"
            >
              {/* Top Meta: Numeral and Phase */}
              <div className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-neutral-100 pb-4">
                  <span className="font-editorial text-4xl sm:text-5xl font-light text-neutral-300 group-hover:text-black transition-colors duration-300 select-none">
                    {s.num}
                  </span>
                  <div className="p-2 bg-neutral-100 text-black rounded-none group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    {s.icon}
                  </div>
                </div>

                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-400 block font-medium">
                  {s.tag}
                </span>

                <h3 className="font-editorial text-xl sm:text-2xl text-black font-normal leading-snug group-hover:translate-x-0.5 transition-transform duration-300">
                  {s.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                <span>Paso {idx + 1} de 4</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black font-semibold">
                  Garantía Carlota
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Assurance Editorial Quote Banner */}
        <div className="mt-12 p-6 sm:p-8 border border-neutral-200 bg-neutral-50/70 rounded-none flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1 max-w-2xl">
            <p className="font-editorial text-base sm:text-lg text-black font-normal italic">
              "Cada bebé marca su propio compás. Nunca cronometramos sesiones: respetamos tomas, siestas y abrazos para que el recuerdo fluya con auténtica calma."
            </p>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
              Carlota Lagunas · Especialista en Seguridad Postural Neonatal
            </span>
          </div>

          <div className="shrink-0">
            <a
              href="https://wa.me/34687707029?text=Hola%20Carlota,%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20detalles%20sobre%20el%20proceso%20de%20sesi%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-neutral-800 transition-colors shadow-sm rounded-none cursor-pointer"
            >
              <span>Resolver Dudas por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
