import React from 'react';
import { Award, Heart, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyADP: React.FC = () => {
  const pillars = [
    {
      index: '01',
      icon: <Award className="w-4 h-4 text-white" />,
      tag: 'ESPECIALIZACIÓN',
      title: 'Dedicación y Técnica Exclusiva',
      description:
        'Años de vocación exclusiva hacia la fotografía infantil, recién nacidos y maternidad en Zaragoza. Dominio sensible de la luz natural, la composición pictórica y la conexión genuina con los más pequeños.'
    },
    {
      index: '02',
      icon: <Heart className="w-4 h-4 text-white" />,
      tag: 'FILOSOFÍA SLOW',
      title: 'Paciencia y Respeto a su Ritmo',
      description:
        'Cada bebé y cada familia son únicos. Jamás cronometramos una sesión ni forzamos una postura: nos adaptamos con infinita calma a las tomas de pecho, los descansos, el juego y las risas espontáneas.'
    },
    {
      index: '03',
      icon: <ShieldCheck className="w-4 h-4 text-white" />,
      tag: 'SEGURIDAD & CONFORT',
      title: 'Estudio Climatizado a 28°C',
      description:
        'Espacio íntimo en el Actur diseñado para el bienestar neonatal: temperatura constante a 28°C, higiene textil de grado hospitalario y formación continua en fisiología y seguridad postural del bebé.'
    },
    {
      index: '04',
      icon: <Sparkles className="w-4 h-4 text-white" />,
      tag: 'LEGADO ARTESANAL',
      title: 'Recuerdos en Lino y Madera',
      description:
        'No concebimos un reportaje que termine en una pantalla. Editamos cada toma a mano y entregamos álbumes de lino puro cosidos artesanalmente y cajas de madera noble grabadas con el nombre de tu hijo.'
    }
  ];

  return (
    <section
      id="por-que-adp"
      className="py-24 sm:py-32 bg-neutral-50/60 text-black border-t border-neutral-200"
      aria-label="Por qué elegir nuestro estudio en Zaragoza"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-neutral-200">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-sans font-medium">
              Filosofía & Valores · Carlota Lagunas
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-black font-normal tracking-tight leading-[0.95]">
              Por Qué Elegir Nuestro Estudio
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md font-light leading-relaxed">
            Una mirada sensible, rigurosa y entregada para convertir instantes fugaces en el legado más emotivo y duradero de vuestra familia.
          </p>
        </div>

        {/* 4 Architectural Pillars Grid with Rectilinear Geometry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-neutral-200 divide-y md:divide-y-0 md:divide-x divide-neutral-200 bg-white shadow-xs mt-12 rounded-none">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="group p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:bg-neutral-50/70 transition-colors duration-300 rounded-none relative"
            >
              <div className="space-y-6">
                {/* Rectilinear Icon & Meta Index */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <div className="w-10 h-10 bg-black text-white rounded-none flex items-center justify-center shadow-xs">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 font-medium">
                    {item.index} / {item.tag}
                  </span>
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl text-black font-normal leading-snug group-hover:translate-x-0.5 transition-transform duration-300">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Micro Feature Stamp */}
              <div className="pt-6 border-t border-neutral-100 flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>Calidad Garantizada</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Editorial Strip */}
        <div className="mt-12 py-5 px-6 sm:px-8 border border-neutral-200 bg-white rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-none shrink-0" />
            <span className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-700">
              Estudio en C/ Rosalía de Castro 15, Actur (Zaragoza) · Exclusividad con Cita Previa
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Agenda Abierta para Bebés & Comuniones 2025
          </span>
        </div>
      </div>
    </section>
  );
};
