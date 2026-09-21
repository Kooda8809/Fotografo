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
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max(scrollY / 400, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Distribute photos tightly across 3 columns matching the continuous stream pattern
  const { col1, col2, col3 } = useMemo(() => {
    const c1: PhotoItem[] = [];
    const c2: PhotoItem[] = [];
    const c3: PhotoItem[] = [];

    portfolioPhotos.forEach((photo, idx) => {
      if (idx % 3 === 0) c1.push(photo);
      else if (idx % 3 === 1) c2.push(photo);
      else c3.push(photo);
    });

    return { col1: c1, col2: c2, col3: c3 };
  }, []);

  return (
    <div id="hero" className="relative w-full bg-white text-black min-h-screen select-none overflow-hidden">
      
      {/* 1. HERO TYPOGRAPHY LAYER (z-0: BEHIND IMAGES, fully visible in upper Hero, translates to top-left on scroll) */}
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

      {/* 2. FOREGROUND CONTINUOUS PHOTO GALLERY (z-10: IN FRONT OF LETTERS) */}
      <div className="relative z-10 w-full pt-[48vh] sm:pt-[52vh] md:pt-[54vh]">
        
        {/* Quick Hero Floating CTAs before the stream */}
        <div className="max-w-4xl mx-auto px-6 mb-8 sm:mb-12 flex flex-col items-center text-center space-y-4">
          <p className="sm:hidden text-xs text-neutral-600 font-light leading-relaxed">
            Fotografía infantil y familiar en Zaragoza. Recuerdos naturales y eternos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 sm:px-8 py-3 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-neutral-800 transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Consultar Disponibilidad</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('portfolio')}
              className="px-6 sm:px-8 py-3 rounded-full bg-white border border-neutral-300 text-black text-xs font-semibold uppercase tracking-[0.16em] hover:bg-neutral-100 hover:border-black transition-all shadow-xs cursor-pointer"
            >
              <span>Ver Galería</span>
            </button>
          </div>
        </div>

        <ContainerScrollAnimation className="w-full overflow-hidden" spacerClass="h-[35vh]">
          <ContainerScrollTranslate className="min-h-screen relative">
            <ContainerScrollInsetX className="h-full relative" insetRange={[24, 0]}>
              <ContainerScrollScale scaleRange={[1.08, 1]} className="w-full px-3 sm:px-6 lg:px-8">
                
                {/* 3 Columns tightly packed with staggered non-straight top offsets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 items-start w-full max-w-7xl mx-auto">
                  
                  {/* Column 1: Intermediate height offset */}
                  <ContainerScrollTranslate
                    yRange={['0%', '-14%']}
                    className="flex flex-col gap-2.5 sm:gap-3 pt-6 sm:pt-8 md:pt-10"
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

                  {/* Column 2: Highest, cutting slightly into the baseline */}
                  <ContainerScrollTranslate
                    yRange={['0%', '16%']}
                    className="flex flex-col gap-2.5 sm:gap-3 pt-0 sm:pt-1 md:pt-2"
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

                  {/* Column 3: Asymmetrical lower offset */}
                  <ContainerScrollTranslate
                    yRange={['0%', '-14%']}
                    className="hidden md:flex flex-col gap-2.5 sm:gap-3 pt-10 sm:pt-14 md:pt-16"
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

                </div>

              </ContainerScrollScale>
            </ContainerScrollInsetX>
          </ContainerScrollTranslate>
        </ContainerScrollAnimation>

        {/* 3. GRADIENT FADE-OUT & DUAL CTA BUTTONS */}
        <div className="relative -mt-32 sm:-mt-44 md:-mt-52 pt-36 pb-20 z-20 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-white/80 to-white text-center px-6">
          <p className="text-xs sm:text-sm text-neutral-500 font-light mb-6 max-w-md">
            Sesiones cuidadas, sin prisas y con una sensibilidad única en el Barrio del Actur, Zaragoza.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-black text-white text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
            >
              <span>Consultar Disponibilidad</span>
              <div className="p-1 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('portfolio')}
              className="inline-flex items-center gap-2 px-8 sm:px-9 py-4 rounded-full bg-white border border-neutral-300 hover:border-black text-black text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-neutral-50 transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span>Ver Galería Completa</span>
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
      className="group relative cursor-pointer overflow-hidden rounded-[2px] bg-neutral-900 shadow-sm hover:shadow-2xl transition-all duration-300"
    >
      <img
        src={photo.imageUrl}
        alt={photo.title}
        loading="lazy"
        className="aspect-[4/2.65] inline-block align-middle h-auto max-h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Sleek editorial hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white pointer-events-none">
        <div className="flex justify-end">
          <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white">
            <Maximize2 className="w-3.5 h-3.5" />
          </span>
        </div>

        <div>
          <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[9px] font-mono uppercase tracking-wider mb-1">
            {photo.category}
          </span>
          <h4 className="font-sans font-bold text-sm leading-tight mb-0.5">
            {photo.title}
          </h4>
          <div className="flex items-center gap-1 text-[10px] text-neutral-300">
            <MapPin className="w-3 h-3" />
            <span>{photo.location} · {photo.year || '2025'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
