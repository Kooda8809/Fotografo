import React, { useState, useEffect, useRef, useCallback } from 'react';
import { servicesList } from '../data/services';
import { ServiceItem } from '../types';
import { ArrowUpRight, Calendar } from 'lucide-react';

interface ServicesSectionProps {
  onOpenQuoteModal: (serviceTitle: string) => void;
  onNavigate?: (sectionId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenQuoteModal,
  onNavigate
}) => {
  const [continuousProgress, setContinuousProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isClickingRef = useRef(false);

  // Monitor scroll position within section to calculate smooth continuous progress
  useEffect(() => {
    const handleScroll = () => {
      if (isClickingRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Distance scrolled from top of section
      const scrolled = -rect.top;
      const rawProgress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      // Continuous float index from 0 to (servicesList.length - 1)
      const currentFloatIndex = rawProgress * (servicesList.length - 1);
      setContinuousProgress(currentFloatIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smoothly scroll to a specific service step when clicked
  const handleSelectService = useCallback((index: number) => {
    if (!sectionRef.current) return;

    setContinuousProgress(index);
    isClickingRef.current = true;

    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;

    const targetScroll =
      scrollTop + rect.top + (index / (servicesList.length - 1)) * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isClickingRef.current = false;
    }, 600);
  }, []);

  const activeIndex = Math.min(
    Math.max(Math.round(continuousProgress), 0),
    servicesList.length - 1
  );
  const activeService = servicesList[activeIndex] || servicesList[0];

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative bg-white text-black border-t border-neutral-200"
      style={{
        // Height allows ample scroll room for smooth orbital transitions
        minHeight: `${servicesList.length * 60}vh`
      }}
      aria-label="Sesiones y especialidades fotográficas en Zaragoza"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-10 sm:py-14 px-6 sm:px-12 lg:px-20 overflow-hidden select-none">
        
        {/* Minimal Section Title at Top Left */}
        <div className="max-w-xl space-y-1 shrink-0 z-20">
          <h2 className="font-editorial text-2xl sm:text-4xl text-black font-normal tracking-tight">
            Sesiones que Cuentan Vuestra Historia
          </h2>
          <p className="text-xs text-neutral-400 font-light">
            Especialidades de estudio en Zaragoza. Desliza para explorar la colección.
          </p>
        </div>

        {/* Center Stage: Circular Orbital Text List (Left) + Widely Spaced Orbital Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto max-w-6xl mx-auto w-full relative">
          
          {/* Subtle Ambient Circular Orbit Guidelines */}
          <div className="hidden lg:block absolute right-[12%] top-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-dashed border-neutral-200/60 pointer-events-none z-0" />
          <div className="hidden lg:block absolute right-[18%] top-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-neutral-100 pointer-events-none z-0" />

          {/* LEFT COLUMN: Circular Orbital Text Wheel */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start z-20 h-[380px] sm:h-[440px] relative">
            {/* Curved text track */}
            <div className="relative w-full h-[280px] sm:h-[320px] flex items-center overflow-visible">
              {servicesList.map((service: ServiceItem, idx: number) => {
                const diff = idx - continuousProgress;
                const absDiff = Math.abs(diff);
                const isExactActive = idx === activeIndex;

                // Render visible text items in orbit range
                if (absDiff > 3.2) return null;

                // Circular Orbital Path for Text
                const textAngle = diff * 0.32;
                // Curving along the circular orbit
                const translateX = (1 - Math.cos(textAngle)) * 75;
                const translateY = diff * 72;
                // Rotational tangent along the circular wheel
                const rotate = textAngle * (180 / Math.PI) * 0.16;

                const scale = isExactActive ? 1.08 : Math.max(0.96 - absDiff * 0.08, 0.78);
                const opacity = isExactActive ? 1 : Math.max(0.48 - absDiff * 0.12, 0.12);
                const zIndex = isExactActive ? 30 : Math.round(20 - absDiff * 2);

                return (
                  <div
                    key={service.id}
                    className="absolute left-0 transition-[opacity] duration-200 ease-out"
                    style={{
                      top: '50%',
                      transform: `translate3d(${translateX}px, calc(-50% + ${translateY}px), 0) rotate(${rotate}deg) scale(${scale})`,
                      transformOrigin: 'left center',
                      opacity,
                      zIndex,
                      willChange: 'transform, opacity'
                    }}
                  >
                    <button
                      onClick={() => handleSelectService(idx)}
                      className={`text-left transition-all duration-200 cursor-pointer flex items-center gap-3 whitespace-nowrap ${
                        isExactActive
                          ? 'font-editorial text-2xl sm:text-3xl lg:text-4xl text-black font-semibold'
                          : 'font-editorial text-lg sm:text-xl lg:text-2xl text-neutral-400 hover:text-neutral-700 font-normal'
                      }`}
                    >
                      <span>{service.shortTitle || service.title}</span>
                      {isExactActive && (
                        <span className="w-1.5 h-1.5 rounded-none bg-black shrink-0" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons anchored below the active orbit */}
            <div className="pt-6 flex flex-wrap items-center gap-3 z-30">
              {onNavigate && (
                <button
                  onClick={() => onNavigate(activeService.slug)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-none border border-neutral-300 hover:border-black text-black text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer bg-white"
                >
                  <span>Detalles</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={() => onOpenQuoteModal(activeService.title)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-none bg-black hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-xs cursor-pointer border border-black"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Consultar Cita</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Widely Separated Circular Orbital Parallax Windows */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center lg:justify-end overflow-visible">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] h-full flex items-center justify-center">
              {servicesList.map((service: ServiceItem, idx: number) => {
                const diff = idx - continuousProgress;
                const absDiff = Math.abs(diff);

                // Only render active and direct neighbors with generous spacing (no crowded stack)
                if (absDiff > 1.6) return null;

                // Circular Orbital Path Mathematics with expanded vertical & horizontal separation
                const angle = diff * 0.48; // radian sweep
                const radius = 380; // wide orbital curve radius
                
                // Ample spacing so neighboring images do not crowd or overlap tightly
                const translateX = radius * (1 - Math.cos(angle)) * 0.95;
                const translateY = diff * 320; // Generous 320px vertical separation
                
                // Rotational tilt following the circular trajectory
                const rotate = -angle * (180 / Math.PI) * 0.24;

                const isCurrent = absDiff < 0.5;
                const scale = Math.max(1.03 - absDiff * 0.16, 0.78);
                const opacity = Math.max(1 - absDiff * 0.5, 0.2);
                const zIndex = Math.round(50 - absDiff * 15);

                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelectService(idx)}
                    className={`absolute aspect-square w-56 sm:w-64 lg:w-72 rounded-none overflow-hidden cursor-pointer transition-shadow duration-300 ease-out ${
                      isCurrent
                        ? 'border border-neutral-200/90 shadow-2xl shadow-neutral-950/25 ring-1 ring-black/5'
                        : 'border border-neutral-200/60 shadow-lg shadow-neutral-900/10 hover:opacity-90'
                    }`}
                    style={{
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
                      opacity,
                      zIndex,
                      willChange: 'transform, opacity'
                    }}
                  >
                    {/* High-definition photo */}
                    <img
                      src={service.heroImage}
                      alt={service.title}
                      className="w-full h-full object-cover filter contrast-[1.04] brightness-98 transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
