import React, { useState, useMemo } from 'react';
import { CategoryType, PhotoItem } from '../../types';
import { portfolioPhotos } from '../../data/portfolio';
import { Eye, MapPin, ArrowUpRight } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200">
          <div className="space-y-4 max-w-2xl">
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl text-black font-normal tracking-tight">
              Galería
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              Fotografía infantil, newborn, embarazo y familia en Zaragoza. Una cuidada selección de instantes naturales, tiernos y atemporales creados en nuestro estudio del Actur o en exteriores aragoneses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal('Sesión Fotográfica')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-black text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-full hover:bg-neutral-800 transition-colors shadow-md cursor-pointer"
            >
              <span>Consultar Disponibilidad</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="py-8 overflow-x-auto no-scrollbar" role="tablist" aria-label="Categorías del portfolio">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-xs tracking-wider uppercase transition-all duration-200 rounded-full font-medium cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-sm font-semibold'
                      : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200 border border-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Grid matching Existing Design System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 pt-4">
          {filteredPhotos.map((photo, index) => {
            const colSpan =
              index % 5 === 0
                ? 'lg:col-span-8'
                : index % 5 === 1
                ? 'lg:col-span-4'
                : index % 5 === 2
                ? 'lg:col-span-5'
                : index % 5 === 3
                ? 'lg:col-span-7'
                : 'lg:col-span-12';

            return (
              <article
                key={photo.id}
                className={`${colSpan} group cursor-pointer relative overflow-hidden bg-neutral-900 border border-neutral-200 rounded-sm shadow-xs hover:shadow-xl transition-shadow duration-300`}
                onClick={() => onPhotoClick(filteredPhotos, index)}
              >
                <div className={`relative w-full ${photo.aspectRatio} overflow-hidden`}>
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Gradient & Hover Information Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 sm:p-8 text-white">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider">
                        {photo.category}
                      </span>
                      <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-neutral-300" />
                        <span>{photo.location} · {photo.year || '2025'}</span>
                      </div>

                      <h3 className="font-editorial text-xl sm:text-2xl font-normal leading-snug">
                        {photo.title}
                      </h3>

                      <p className="text-xs text-neutral-300 font-light line-clamp-2 max-w-xl">
                        {photo.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-20 p-8 sm:p-12 rounded-sm bg-neutral-50 border border-neutral-200 text-center space-y-4">
          <h2 className="font-editorial text-2xl sm:text-3xl text-black font-normal">
            ¿Deseas inmortalizar esta etapa tan bonita de tu familia?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xl mx-auto">
            Las sesiones de recién nacido y comuniones tienen plazas mensuales limitadas. Reserva con antelación para asegurar tu fecha en agenda.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenQuoteModal('Reserva de Sesión')}
              className="px-8 py-3.5 bg-black text-white text-xs uppercase tracking-wider font-semibold rounded-full hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
            >
              Consultar Disponibilidad
            </button>
            <button
              onClick={() => onNavigate('contacto')}
              className="px-8 py-3.5 border border-neutral-300 hover:border-black text-black text-xs uppercase tracking-wider font-semibold rounded-full transition-colors cursor-pointer"
            >
              Contactar con Carlota
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
