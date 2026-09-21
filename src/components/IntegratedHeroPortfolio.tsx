import React, { useState, useEffect, useMemo } from 'react';
import { portfolioPhotos } from '../data/portfolio';
import { PhotoItem } from '../types';
import {
  ContainerScrollAnimation,
  ContainerScrollTranslate,
  ContainerScrollInsetX,
  ContainerScrollScale
} from './ui/scroll-trigger-animations';
import { Maximize2, MapPin, ArrowUpRight } from 'lucide-react';

interface IntegratedHeroPortfolioProps {
  onPhotoClick: (photos: PhotoItem[], index: number) => void;
  onOpenQuoteModal: () => void;
  onNavigate: (sectionId: string) => void;
}

export const IntegratedHeroPortfolio: React.FC<IntegratedHeroPortfolioProps> = ({
  onPhotoClick,
  onOpenQuoteModal,
  onNavigate
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track global scroll for background typography scaling and translation to the left
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          const scrollY = window.scrollY;
          const progress = Math.min(Math.max(scrollY / 450, 0), 1);
          setScrollProgress((prev) => (Math.abs(progress - prev) < 0.01 ? prev : progress));
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 5 full-bleed columns spanning edge-to-edge (20 photos = 4 photos per column)
  // Each column has the same count to guarantee a straight, level bottom baseline.
  const { col1, col2, col3, col4, col5 } = useMemo(() => {
    const c1: PhotoItem[] = [];
    const c2: PhotoItem[] = [];
    const c3: PhotoItem[] = [];
    const c4: PhotoItem[] = [];
    const c5: PhotoItem[] = [];

    const pool = portfolioPhotos.slice(0, 20);
    pool.forEach((photo, idx) => {
      const mod = idx % 5;
      if (mod === 0) c1.push(photo);
      else if (mod === 1) c2.push(photo);
      else if (mod === 2) c3.push(photo);
      else if (mod === 3) c4.push(photo);
      else c5.push(photo);
    });

    return { col1: c1, col2: c2, col3: c3, col4: c4, col5: c5 };
  }, []);

  return (
    <div id="hero" className="relative w-full bg-white text-black min-h-screen select-none overflow-hidden">
      
      {/* 1. HERO TYPOGRAPHY LAYER (z-0: BEHIND IMAGES, translates to top-left on scroll matching "The Studio" reference) */}
      <div className="fixed inset-x-0 top-0 h-[65vh] pointer-events-none z-0 overflow-hidden flex flex-col items-center justify-center pt-8 sm:pt-12 px-6">
        <div
          className="transition-transform duration-100 ease-out flex flex-col items-center"
          style={{
            transform: `translate3d(${-scrollProgress * 36}vw, ${-scrollProgress * 28}vh, 0) scale(${
              1 - scrollProgress * 0.45
            })`,
            transformOrigin: 'center center',
            opacity: Math.max(1 - scrollProgress * 1.3, 0)
          }}
        >
          <h1
            className="font-serif font-normal tracking-tight text-black text-center whitespace-nowrap select-none"
            style={{
              fontSize: 'clamp(3rem, 11vw, 10rem)',
              lineHeight: 0.88
            }}
          >
            Carlota Lagunas
          </h1>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm font-sans tracking-wide text-neutral-600 max-w-xl text-center font-light leading-relaxed hidden sm:block">
            Creamos recuerdos naturales, delicados y eternos de los primeros días, el embarazo y la infancia de tus hijos en nuestro estudio de Zaragoza.
          </p>
        </div>
      </div>

      {/* 2. FOREGROUND CONTINUOUS PHOTO GALLERY (z-10: IN FRONT OF LETTERS)
          - Invades the bottom of the hero title with staggered, non-aligned tops matching reference.
          - Edge-to-edge full width (filling the lateral whitespace as an infinite wall).
          - Rectilinear photo windows (rounded-none, no rounded corners).
      */}
      <div className="relative z-10 w-full pt-[44vh] sm:pt-[48vh] md:pt-[50vh]">
        
        {/* Quick Hero Floating CTAs before the stream */}
        <div className="max-w-4xl mx-auto px-6 mb-8 sm:mb-12 flex flex-col items-center text-center space-y-4">
          <p className="sm:hidden text-xs text-neutral-600 font-light leading-relaxed">
            Fotografía infantil y familiar en Zaragoza. Recuerdos naturales y eternos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 sm:px-8 py-3 rounded-none bg-black text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-neutral-800 transition-all shadow-md cursor-pointer flex items-center gap-2 border border-black"
            >
              <span>Consultar Disponibilidad</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('portfolio')}
              className="px-6 sm:px-8 py-3 rounded-none bg-white border border-neutral-300 text-black text-xs font-semibold uppercase tracking-[0.16em] hover:bg-neutral-100 hover:border-black transition-all shadow-xs cursor-pointer"
            >
              <span>Ver Galería</span>
            </button>
          </div>
        </div>

        {/* Scroll-Triggered Parallax Animation */}
        <ContainerScrollAnimation className="w-full overflow-hidden" spacerClass="h-[25vh]">
          <ContainerScrollTranslate className="min-h-screen relative">
            <ContainerScrollInsetX className="h-full relative" insetRange={[16, 0]}>
              <ContainerScrollScale scaleRange={[1.06, 1]} className="w-full px-1 sm:px-2 md:px-3">
                
                {/* 5 Full-Bleed Columns: Staggered tops invading the Hero, unaligned between them */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 items-start w-full">
                  
                  {/* Column 1: Lower top offset, moderate negative parallax */}
                  <ContainerScrollTranslate
                    yRange={['0%', '-10%']}
                    className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 pt-12 sm:pt-16 md:pt-20"
                  >
                    {col1.map((photo, index) => (
                      <AnimatedPhotoItem
                        key={photo.id}
                        photo={photo}
                        onClick={() => {
                          const originalIndex = portfolioPhotos.findIndex((p) => p.id === photo.id);
                          onPhotoClick(portfolioPhotos, originalIndex >= 0 ? originalIndex : index);
                        }}
                      />
                    ))}
                  </ContainerScrollTranslate>

                  {/* Column 2: Highest top, aggressively invading the bottom of "Carlota" */}
                  <ContainerScrollTranslate
                    yRange={['0%', '14%']}
                    className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 pt-0 sm:pt-2 md:pt-3"
                  >
                    {col2.map((photo, index) => (
                      <AnimatedPhotoItem
                        key={photo.id}
                        photo={photo}
                        onClick={() => {
                          const originalIndex = portfolioPhotos.findIndex((p) => p.id === photo.id);
                          onPhotoClick(portfolioPhotos, originalIndex >= 0 ? originalIndex : index);
                        }}
                      />
                    ))}
                  </ContainerScrollTranslate>

                  {/* Column 3: Lower top offset, creating breathing room under the center letters */}
                  <ContainerScrollTranslate
                    yRange={['0%', '-8%']}
                    className="hidden sm:flex flex-col gap-2 sm:gap-2.5 md:gap-3 pt-16 sm:pt-22 md:pt-28"
                  >
                    {col3.map((photo, index) => (
                      <AnimatedPhotoItem
                        key={photo.id}
                        photo={photo}
                        onClick={() => {
                          const originalIndex = portfolioPhotos.findIndex((p) => p.id === photo.id);
                          onPhotoClick(portfolioPhotos, originalIndex >= 0 ? originalIndex : index);
                        }}
                      />
                    ))}
                  </ContainerScrollTranslate>

                  {/* Column 4: High top, invading into the bottom of "Lagunas" */}
                  <ContainerScrollTranslate
                    yRange={['0%', '12%']}
                    className="hidden md:flex flex-col gap-2 sm:gap-2.5 md:gap-3 pt-2 sm:pt-4 md:pt-6"
                  >
                    {col4.map((photo, index) => (
                      <AnimatedPhotoItem
                        key={photo.id}
                        photo={photo}
                        onClick={() => {
                          const originalIndex = portfolioPhotos.findIndex((p) => p.id === photo.id);
                          onPhotoClick(portfolioPhotos, originalIndex >= 0 ? originalIndex : index);
                        }}
                      />
                    ))}
                  </ContainerScrollTranslate>

                  {/* Column 5: Intermediate height offset on far right edge */}
                  <ContainerScrollTranslate
                    yRange={['0%', '-10%']}
                    className="hidden lg:flex flex-col gap-2 sm:gap-2.5 md:gap-3 pt-10 sm:pt-14 md:pt-18"
                  >
                    {col5.map((photo, index) => (
                      <AnimatedPhotoItem
                        key={photo.id}
                        photo={photo}
                        onClick={() => {
                          const originalIndex = portfolioPhotos.findIndex((p) => p.id === photo.id);
                          onPhotoClick(portfolioPhotos, originalIndex >= 0 ? originalIndex : index);
                        }}
                      />
                    ))}
                  </ContainerScrollTranslate>

                </div>

              </ContainerScrollScale>
            </ContainerScrollInsetX>
          </ContainerScrollTranslate>
        </ContainerScrollAnimation>

        {/* 3. GRADIENT FADE-OUT & DUAL CTA BUTTONS
            Straight, horizontal level finish that smoothly dissolves all columns into white.
        */}
        <div className="relative -mt-36 sm:-mt-48 md:-mt-56 pt-44 pb-20 z-20 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-white/85 to-white text-center px-6">
          <p className="text-xs sm:text-sm text-neutral-600 font-light mb-6 max-w-md">
            Sesiones cuidadas, sin prisas y con una sensibilidad única en el Barrio del Actur, Zaragoza.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-none bg-black text-white text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer border border-black"
            >
              <span>Consultar Disponibilidad</span>
              <div className="p-1 rounded-none bg-white/20 group-hover:bg-white/30 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-2 px-8 sm:px-9 py-4 rounded-none bg-white border border-neutral-300 hover:border-black text-black text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-neutral-50 transition-all duration-300 shadow-2xs cursor-pointer"
            >
              <span>Ver Galería Completa ({portfolioPhotos.length} Fotos)</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

interface AnimatedPhotoItemProps {
  photo: PhotoItem;
  onClick: () => void;
}

const AnimatedPhotoItem: React.FC<AnimatedPhotoItemProps> = ({ photo, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-none bg-neutral-900 shadow-sm hover:shadow-2xl transition-all duration-300"
    >
      <img
        src={photo.imageUrl}
        alt={photo.title}
        width={400}
        height={300}
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] sm:aspect-[4/3.2] inline-block align-middle h-auto max-h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out rounded-none"
      />

      {/* Sleek rectilineal editorial hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-4 flex flex-col justify-between text-white pointer-events-none rounded-none">
        <div className="flex justify-end">
          <span className="p-1 rounded-none bg-white/20 backdrop-blur-sm text-white">
            <Maximize2 className="w-3.5 h-3.5" />
          </span>
        </div>

        <div>
          <span className="inline-block px-2 py-0.5 rounded-none bg-white/20 backdrop-blur-sm text-[9px] font-mono uppercase tracking-wider mb-1">
            {photo.category}
          </span>
          <h2 className="font-serif font-normal text-sm leading-tight mb-0.5 text-white line-clamp-1">
            {photo.title}
          </h2>
          <div className="flex items-center gap-1 text-[10px] text-neutral-300">
            <MapPin className="w-3 h-3 text-neutral-400" />
            <span>{photo.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
