import React, { useState, useMemo } from 'react';
import { CategoryType, PhotoItem } from '../../types';
import { portfolioPhotos } from '../../data/portfolio';
import { Maximize2, MapPin, ArrowUpRight } from 'lucide-react';

interface PortfolioPageProps {
  onPhotoClick: (photos: PhotoItem[], index: number) => void;
  onOpenQuoteModal: (serviceName?: string) => void;
  onNavigate: (sectionId: string) => void;
}

const CATEGORIES: CategoryType[] = [
  'Todos',
  'Newborn',
  'Embarazo',
  'Bebés',
  'Infantil',
  'Familia',
  'Smash Cake',
  'Comuniones',
  'Fine Art'
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onPhotoClick,
  onOpenQuoteModal,
  onNavigate
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Todos');

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'Todos') return portfolioPhotos;
    return portfolioPhotos.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-white text-black min-h-screen">
      <div className="max-w-[1850px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-200">
          <div className="space-y-4 max-w-3xl">
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl text-black font-normal tracking-tight leading-[0.95]">
              Galería Completa
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl">
              Fotografía infantil, newborn, embarazo y familia en Zaragoza. Instantes auténticos, sensibles y atemporales creados en nuestro estudio del Actur y en exteriores aragoneses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal('Sesión Fotográfica')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-[0.18em] rounded-none hover:bg-neutral-800 transition-colors shadow-md cursor-pointer border border-black"
            >
              <span>Consultar Disponibilidad</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="py-6 overflow-x-auto no-scrollbar" role="tablist" aria-label="Categorías del portfolio">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-xs tracking-wider uppercase transition-all duration-200 rounded-none font-medium cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-sm font-semibold border border-black'
                      : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200 border border-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rectilinear 5-Column Gallery matching Homepage Gallery Identity */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 sm:gap-2.5 md:gap-3 pt-2">
          {filteredPhotos.map((photo) => {
            const globalIdx = filteredPhotos.findIndex((p) => p.id === photo.id);
            return (
              <div
                key={photo.id}
                onClick={() => onPhotoClick(filteredPhotos, globalIdx)}
                className="group relative cursor-pointer overflow-hidden rounded-none bg-neutral-900 shadow-xs hover:shadow-2xl transition-all duration-300 break-inside-avoid mb-2 sm:mb-2.5 md:mb-3"
              >
                <img
                  className="w-full h-auto block object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105"
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                />

                {/* Sleek Rectilinear Editorial Hover Overlay (Matching Home Gallery) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-4 flex flex-col justify-between text-white pointer-events-none rounded-none">
                  <div className="flex justify-end">
                    <span className="p-1 rounded-none bg-white/20 backdrop-blur-sm text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-2 py-0.5 rounded-none bg-white/20 backdrop-blur-sm text-[9px] font-mono uppercase tracking-wider mb-1 text-white">
                      {photo.category}
                    </span>
                    <p className="font-editorial text-sm sm:text-base text-white font-normal line-clamp-1 leading-snug">
                      {photo.title}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-neutral-300 font-sans mt-0.5">
                      <MapPin className="w-3 h-3 text-neutral-300" />
                      <span>{photo.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-none bg-neutral-50 border border-neutral-200 text-center space-y-4">
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-black font-normal">
            ¿Deseas inmortalizar esta etapa tan bonita de tu familia?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xl mx-auto leading-relaxed">
            Las sesiones de recién nacido y comuniones tienen plazas mensuales limitadas. Reserva con antelación para asegurar tu fecha en agenda.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuoteModal('Reserva de Sesión')}
              className="px-8 py-3.5 bg-black text-white text-xs uppercase tracking-widest font-semibold rounded-none hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer border border-black"
            >
              Consultar Disponibilidad
            </button>
            <button
              onClick={() => onNavigate('contacto')}
              className="px-8 py-3.5 border border-neutral-300 hover:border-black text-black text-xs uppercase tracking-widest font-semibold rounded-none transition-colors cursor-pointer bg-white"
            >
              Contactar con Carlota
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
