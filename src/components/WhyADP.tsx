import React from 'react';
import { Award, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const WhyADP: React.FC = () => {
  const pillars = [
    {
      icon: <Award className="w-5 h-5 text-neutral-800" />,
      tag: 'Especialización',
      title: 'Experiencia y Especialización',
      description:
        'Años de dedicación exclusiva a la fotografía infantil, recién nacidos y familias en Zaragoza. Conocimiento profundo de la iluminación, la dirección artística y la conexión emocional.'
    },
    {
      icon: <Heart className="w-5 h-5 text-neutral-800" />,
      tag: 'Sin Prisas',
      title: 'Trato Cercano y Paciencia Infinita',
      description:
        'Cada niño y cada bebé tienen su propio ritmo. Respetamos sus pausas para comer, dormir o jugar sin forzar poses ni establecer tiempos rígidos en el estudio.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-neutral-800" />,
      tag: 'Seguridad',
      title: 'Máxima Seguridad e Higiene',
      description:
        'Estudio en Actur climatizado a 28°C para bebés, con estrictas medidas de desinfección e higiene textil y formación certificada en seguridad postural newborn.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-neutral-800" />,
      tag: 'Legado Noble',
      title: 'Recuerdos que Perduran',
      description:
        'Entregamos no solo archivos digitales en alta resolución, sino álbumes encuadernados a mano en lino y cajas de madera artesanales diseñadas para durar generaciones.'
    }
  ];

  return (
    <section
      id="por-que-adp"
      className="py-24 sm:py-32 bg-white text-black border-t border-neutral-200"
      aria-label="Por qué elegir nuestro estudio en Zaragoza"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-black font-normal tracking-tight">
            Por Qué Elegir Nuestro Estudio
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
            Una mirada sensible, rigurosa y entregada para convertir instantes fugaces en el legado más emotivo de tu familia en Zaragoza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-neutral-50/80 border border-neutral-200 rounded-sm flex flex-col justify-between space-y-6 hover:border-black transition-colors shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-full bg-white border border-neutral-200 shadow-xs">
                    {item.icon}
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-editorial text-xl text-black font-normal">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/80 flex items-center gap-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                <span>Carlota Lagunas · Actur, Zaragoza</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
