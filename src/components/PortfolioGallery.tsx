import React, { useState, useMemo } from 'react';
import { CategoryType, PhotoItem } from '../types';
import { portfolioPhotos } from '../data/portfolio';
import { Eye, MapPin } from 'lucide-react';

interface PortfolioGalleryProps {
  onPhotoClick: (photos: PhotoItem[], index: number) => void;
  initialCategory?: CategoryType;
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

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  onPhotoClick,
  initialCategory = 'Todos'
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(initialCategory);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'Todos') return portfolioPhotos;
    return portfolioPhotos.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="portfolio"
      className="py-24 sm:py-32 bg-[#0f0f10] text-white border-t border-white/5"
      aria-label="Galería de fotografía infantil y familiar en Zaragoza"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3">
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              Recuerdos Vivos
            </h2>
          </div>

          <p className="text-sm text-neutral-400 max-w-md font-light leading-relaxed">
            Una selección de momentos íntimos, tiernos y atemporales: recién nacidos, maternidad, primer cumpleaños y familias en Zaragoza.
          </p>
        </div>

        {/* Minimalist Filter Navigation */}
        <div className="py-8 overflow-x-auto no-scrollbar" role="tablist" aria-label="Filtros de galería">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs sm:text-[13px] tracking-wider uppercase transition-all duration-200 rounded-none font-medium cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-semibold'
                      : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Asymmetric Grid */}
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
                className={`${colSpan} group cursor-pointer relative overflow-hidden bg-neutral-900 border border-white/5 rounded-none`}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-8">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                      <div className="flex items-center justify-between text-xs tracking-widest uppercase font-mono text-neutral-400">
                        <span>{photo.category}</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-400" />
                          <span>{photo.location}</span>
                        </div>
                      </div>

                      <h3 className="font-editorial text-xl sm:text-2xl text-white font-normal leading-snug">
                        {photo.title}
                      </h3>

                      <div className="pt-2 flex items-center gap-2 text-xs text-neutral-300 font-sans">
                        <Eye className="w-3.5 h-3.5" />
                        <span className="tracking-wider uppercase">Ampliar fotografía</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Gallery Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-xs tracking-widest text-neutral-500 uppercase">
            Mostrando {filteredPhotos.length} recuerdos en Zaragoza · Haz clic en cualquier foto para abrir el visor en alta resolución
          </p>
        </div>
      </div>
    </section>
  );
};
