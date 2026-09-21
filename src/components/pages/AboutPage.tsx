import React from 'react';
import { ArrowUpRight, MapPin, Heart, ShieldCheck, Sparkles, Smile, Clock } from 'lucide-react';

interface AboutPageProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuoteModal, onNavigate }) => {
  const pillars = [
    {
      icon: <Heart className="w-5 h-5 text-neutral-800" />,
      title: 'Paciencia y Ternura Infinita',
      desc: 'Cada peque tiene su propio ritmo. Nos adaptamos a sus pausas, tomas y momentos de juego sin prisa ni imposiciones.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-neutral-800" />,
      title: 'Seguridad y Bienestar Neonatal',
      desc: 'Formación continua y certificada en seguridad postural de recién nacidos, higiene rigurosa y estudio climatizado a 28°C.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-neutral-800" />,
      title: 'Materiales Nobles y Sostenibles',
      desc: 'Atrezzo confeccionado a mano, tejidos orgánicos hipoalergénicos, maderas naturales y álbumes encuadernados en lino.'
    },
    {
      icon: <Smile className="w-5 h-5 text-neutral-800" />,
      title: 'Experiencia Serena y Emotiva',
      desc: 'Un espacio íntimo en el Actur pensado para que las familias desconecten del ruido diario y disfruten de un momento mágico.'
    }
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
        
        {/* Editorial Profile Header */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-b border-neutral-200 pb-20">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-none bg-neutral-100 shadow-xl border border-neutral-200 group">
              <img
                src="/images/real/carlota-perfil.webp"
                alt="Carlota Lagunas - Fotógrafa Infantil y Familiar en Zaragoza"
                className="w-full h-full object-cover filter contrast-[1.04] brightness-98 group-hover:scale-105 transition-transform duration-700 ease-out"
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

          {/* Bio & Professional Statement Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h1 className="font-editorial text-4xl sm:text-6xl text-black font-normal tracking-tight">
                Carlota Lagunas
              </h1>
              <p className="text-sm sm:text-base font-mono uppercase tracking-wider text-neutral-500">
                Fotografía Infantil y Familiar · Zaragoza
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-neutral-700 font-light leading-relaxed max-w-2xl">
              <p>
                Soy Carlota, apasionada de la luz natural, los detalles sutiles y la magia irrepetible de los primeros años de vida. Desde mi estudio en el Barrio del Actur en Zaragoza, ayudo a las familias a detener el tiempo y convertir instantes fugaces en un legado visual eterno.
              </p>
              <p>
                La fotografía de recién nacidos y niños requiere mucho más que una cámara técnica: exige una infinita delicadeza, empatía y un compromiso inquebrantable con la seguridad del bebé. Por eso, me he formado extensamente con los mejores referentes nacionales en fisiología y seguridad postural neonatal.
              </p>
              <p>
                Creo en los recuerdos auténticos, aquellos que no dependen de modas pasajeras. Mis sesiones huyen de artificios para centrarse en los abrazos de verdad, las risas espontáneas y los gestos de ternura que definen a cada familia aragonesa.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenQuoteModal('Sesión Infantil / Familiar')}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-black text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-none hover:bg-neutral-800 transition-colors shadow-md cursor-pointer border border-black"
              >
                <span>Consultar Disponibilidad</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center gap-2 px-7 py-4 border border-neutral-300 hover:border-black text-black text-xs font-mono uppercase tracking-wider rounded-none transition-colors cursor-pointer bg-white"
              >
                <span>Ver Galería</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pillars of Method & Quality */}
        <div className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-editorial text-3xl sm:text-4xl text-black font-normal">
              Por qué confiar en nuestro estudio
            </h2>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Los cuatro pilares que hacen de cada sesión una experiencia inolvidable en Zaragoza:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 bg-neutral-50/80 border border-neutral-200 rounded-none space-y-4 hover:border-black transition-colors shadow-xs"
              >
                <div className="p-3 w-fit rounded-none bg-white border border-neutral-200 shadow-2xs">
                  {item.icon}
                </div>
                <h3 className="font-editorial text-xl text-black font-normal">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Studio Location Badge */}
        <div className="p-8 sm:p-12 rounded-none bg-neutral-50 border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
              <MapPin className="w-4 h-4 text-black" />
              <span>Estudio en Zaragoza · Barrio del Actur</span>
            </div>
            <h3 className="font-editorial text-2xl text-black font-normal">
              C/ Rosalía de Castro, 15, local, 50018 Zaragoza
            </h3>
            <p className="text-xs text-neutral-600 font-light">
              Estudio acogedor a pie de calle. Atendemos a familias de Zaragoza capital, Utebo, Cuarte de Huerva, Zuera, La Puebla de Alfindén y alrededores.
            </p>
          </div>

          <a
            href="https://wa.me/34687707029?text=Hola%20Carlota,%20me%20gustar%C3%ADa%20consultar%20tu%20disponibilidad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-black text-white text-xs font-mono uppercase tracking-wider rounded-none hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap border border-black"
          >
            <span>WhatsApp Directo (687 707 029)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
