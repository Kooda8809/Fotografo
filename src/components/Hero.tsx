import React, { useState, useEffect } from 'react';
import { portfolioPhotos } from '../data/portfolio';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onScrollToPortfolio: () => void;
  onOpenQuoteModal: () => void;
  onPhotoClick?: (photos: typeof portfolioPhotos, index: number) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToPortfolio,
  onOpenQuoteModal,
  onPhotoClick
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / 260, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rowPhotos = portfolioPhotos.slice(0, 6);
  const isScrolled = scrollProgress > 0.25;

  return (
    <section
      id="hero"
      className="relative min-h-[140vh] w-full bg-white text-black select-none"
      aria-label="Presentación Carlota Lagunas y Galería"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-6 sm:px-10 lg:px-16 pt-8 sm:pt-12 pb-0">
        <div className="relative z-30 flex items-center justify-between w-full h-12">
          <div />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-all duration-300 ease-out"
          style={{
            transform: `translate3d(${
              scrollProgress * -38
            }vw, ${scrollProgress * -38}vh, 0) scale(${1 - scrollProgress * 0.48})`,
            transformOrigin: 'center center'
          }}
        >
          <div className="flex flex-col items-center select-none">
            <BrandLogo
              variant="icon"
              className="h-12 sm:h-16 md:h-20 w-auto mb-2 opacity-90 transition-transform duration-300"
            />
            <h1
              className="font-serif font-normal tracking-tight text-black text-center whitespace-nowrap transition-all duration-300"
              style={{
                fontSize: 'clamp(2.8rem, 10.5vw, 9rem)',
                lineHeight: 0.95
              }}
            >
              Carlota Lagunas
            </h1>
          </div>
        </div>

        <div
          className={`absolute top-[60%] left-1/2 -translate-x-1/2 z-20 text-center transition-opacity duration-300 pointer-events-auto max-w-xl px-4 ${
            scrollProgress > 0.1 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-500 font-medium mb-3">
            Fotografía infantil y familiar en Zaragoza
          </p>
          <p className="text-xs text-neutral-600 font-light mb-4 hidden sm:block">
            Creamos recuerdos naturales, delicados y eternos de los primeros días, el embarazo y la infancia de tus hijos.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onScrollToPortfolio}
              className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-md cursor-pointer"
            >
              Ver Galería
            </button>
            <button
              onClick={onOpenQuoteModal}
              className="px-5 py-2.5 rounded-full bg-white border border-neutral-300 text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-50 transition-colors shadow-xs cursor-pointer"
            >
              Consultar Disponibilidad
            </button>
          </div>
        </div>

        <div
          className="relative z-10 w-full transition-all duration-500 ease-out"
          style={{
            transform: `translate3d(0, ${-(scrollProgress * 60)}px, 0)`
          }}
        >
          <div className="flex items-end gap-3 sm:gap-4 lg:gap-6 overflow-x-auto no-scrollbar pb-0 pt-8">
            {rowPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => onPhotoClick ? onPhotoClick(portfolioPhotos, idx) : onScrollToPortfolio()}
                className={`group shrink-0 cursor-pointer overflow-hidden rounded-sm transition-all duration-500 relative bg-neutral-100 ${
                  idx === 0
                    ? 'w-[38vw] sm:w-[26vw] max-w-[360px] h-[32vh] sm:h-[38vh]'
                    : idx === 1
                    ? 'w-[42vw] sm:w-[30vw] max-w-[420px] h-[36vh] sm:h-[42vh]'
                    : idx === 2
                    ? 'w-[36vw] sm:w-[25vw] max-w-[340px] h-[30vh] sm:h-[36vh]'
                    : 'w-[38vw] sm:w-[27vw] max-w-[380px] h-[34vh] sm:h-[40vh]'
                }`}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                  <span className="text-xs font-semibold line-clamp-1">{photo.title}</span>
                  <span className="text-[10px] font-mono text-neutral-300">{photo.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
